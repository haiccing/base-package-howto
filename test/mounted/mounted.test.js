// The package's protocol as it is mounted: its protocol.js, what a runtime
// loads through the dispatcher's /protocol entry (imported here directly:
// this test is itself run by the dispatcher), its config value by value,
// and each action run on a minimal execution: an mrepo's folder with a
// package's bundle in it, its inbox a function that answers each command,
// its request log what it answered. No mrepo is built. Every action the
// config names must be run here: the last test fails when one was left
// out.
import test from '../../modules/node_modules/brittle/index.js'
import Bundle from '../../modules/node_modules/bare-bundle/index.js'
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from '../../modules/node_modules/bare-fs/index.js'
import { join } from '../../modules/node_modules/bare-path/index.js'
import { tmpdir } from '../../modules/node_modules/bare-os/index.js'
import * as mounted from '../../protocol.js'

const KEY = 'haiccing/base-package-demo/demo'
const SCRIPT = '# step: made\n. crud/create swarms\n# expect: "created"\n# step: read\n. crud/read swarms\n# expect: "children":[]\n'
// An execution as an action sees it: the runtime's view (its folder, its
// own inbox: submit gives a request its offset, answer its completed
// form), its request log (request/done, flat here: no structure declared,
// a record a file by its offset's name); waiting runs the job at once.
function execution () {
  const dir = mkdtempSync(join(tmpdir(), 'howto-mounted-'))
  mkdirSync(join(dir, 'packages', 'haiccing'), { recursive: true })
  const b = new Bundle()
  b.write('/howto/demo/steps.haicc', SCRIPT)
  writeFileSync(join(dir, 'packages', 'haiccing', 'base-package-demo.bundle'), b.toBuffer())
  const done = new Map()
  const answered = new Map()
  let clock = 1764000000000
  const keep = (offset, form) => done.set(`/request/done/${String(offset).padStart(13, '0')}.json`, Buffer.from(JSON.stringify({ offset, value: { offset, value: form } })))
  const submit = async core => {
    const offset = clock++
    const c = core.value.join(' ')
    const form = { command: core.value, output: c === 'crud/read .' || c === 'crud/read swarms' ? [{ children: [] }] : { outcome: 'created' } }
    keep(offset, form)
    answered.set(offset, form)
    return offset
  }
  return {
    dir,
    keep: form => keep(clock++, form),
    runtime: { dir, uri: 'local/howtos', submit, answer: async o => answered.get(o) ?? null, protocols: mounted.protocols },
    wait: job => job(),
    put: () => { throw new Error('written') },
    remove: () => { throw new Error('written') },
    select: async p => (p === '/request/done/*' ? [...done.keys()].map(k => [k, { type: 'blob' }]) : []),
    read: async p => { if (!done.has(p)) throw new Error(`not a file: ${p}`); return done.get(p) },
    find: async p => done.get(p) ?? null,
    log: function (level, event, data = {}) { (this.entries ??= []).push({ level, event, ...data }) }
  }
}
const ran = new Set()
// an action that wrote into the execution's log as it ran: every one must
const logged = new Set()
const act = async (name, exec, args) => {
  ran.add(name)
  const before = exec.entries?.length ?? 0
  try {
    const output = await mounted.actions.howto[name](exec, { protocol: 'howto', action: name, uri: ['main', '.'], args })
    exec.keep({ protocol: 'howto', action: name, args, output })
    return output
  } finally { if ((exec.entries?.length ?? 0) > before) logged.add(name) }
}

test('loaded as a runtime loads it: one protocol, howto, its config and its actions', (t) => {
  t.alike(Object.keys(mounted.protocols), ['howto'], 'the package provides the howto protocol, and no other')
  t.alike(Object.keys(mounted.actions), ['howto'])
  t.alike(Object.keys(mounted.actions.howto).sort(), Object.keys(mounted.protocols.howto.actions).sort(), 'a function for every action configured, and no other')
})

test('its config, value by value', (t) => {
  const cfg = mounted.protocols.howto
  t.is(cfg.package, 'haiccing/base-package-howto', 'the package that brings it')
  t.ok(cfg.description, 'its description')
  t.alike(Object.keys(cfg).sort(), ['actions', 'default', 'description', 'package'], 'nothing else: not behind a state')
  t.is(cfg.default, 'run', 'its default action: howto alone is howto/run')
  t.alike(Object.keys(cfg.actions), ['run', 'step', 'report', 'reset'])
  for (const a of Object.keys(cfg.actions)) {
    t.alike(cfg.actions[a].uris, ['.'], `${a}: at the mrepo itself, the scene`)
    t.ok(cfg.actions[a].description, `${a}: its description`)
    t.absent('states' in cfg.actions[a] || 'target' in cfg.actions[a], `${a}: no states, no target`)
  }
  t.alike(cfg.actions.run.args, ['howto'], 'run: the how-to, by its key')
  t.alike(cfg.actions.step.args, ['howto'], 'step: the how-to')
  t.alike(cfg.actions.report.args, ['howto', 'format?'], 'report: the how-to, its format optional')
  t.alike(cfg.actions.reset.args, ['howto?'], 'reset: the how-to optional, the scene is one')
})

test('run, step, report, reset: each on a minimal execution, nothing written by the action itself', async (t) => {
  const exec = execution()
  try {
    const r = await act('run', exec, [KEY])
    t.alike([r.howto, r.passed, r.steps, r.ran], [KEY, true, 2, 2], 'run: through, passed')
    const s = await act('step', exec, [KEY])
    t.alike([s.step, s.of, s.ok, s.next], [1, 2, true, 2], 'step: after a run, the first again')
    const p = await act('report', exec, [KEY, 'md'])
    t.ok(p.markdown.includes(`# ${KEY}`), 'report: the steps done since, as a page')
    const x = await act('reset', exec, [])
    t.is(x.reset, true, 'reset: the scene thrown away')
    await t.exception(mounted.actions.howto.run(exec, { args: ['nope'] }), /not a how-to: nope/, 'a key that is none: refused')
  } finally { rmSync(exec.dir, { recursive: true, force: true }) }
})

test('nothing forgotten: every action configured run here, each writing into the request\'s log', (t) => {
  t.alike([...ran].sort(), Object.keys(mounted.protocols.howto.actions).sort(), 'every action run')
  t.alike([...logged].sort(), Object.keys(mounted.protocols.howto.actions).sort(), 'each one logged as it ran')
})
