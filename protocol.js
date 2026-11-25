// base-package-howto's protocol: howto, a how-to's steps run where it is
// installed, each an ordinary request, what each answers checked. Linked
// into an mrepo, its config is loaded by the runtime and its actions run.
// The config is the package's; the work is mrepo-base-howto's.
import { run, step, report, reset } from './modules/pear-full-square/mrepo-base-howto/index.js'

// The howto protocol's config: at the mrepo itself (`.`), the scene its
// how-tos run in; a how-to by its key, <org>/<package>/<name>, its
// package placed in the mrepo. run, its default.
export const protocols = {
  howto: {
    package: 'haiccing/base-package-howto',
    description: 'A how-to\'s steps run here, the mrepo its scene: through, or a step at a time, each line an ordinary request and what it answers checked; its report from the request log.',
    default: 'run',
    actions: {
      run: { uris: ['.'], args: ['howto'], description: 'A how-to run through: the scene thrown away and prepared, then every step, each line and its checks, the first that fails ending it; passed or not, and what each line answered.' },
      step: { uris: ['.'], args: ['howto'], description: 'The next step of a how-to, its lines and what each answered, checked; the first throws the scene away and prepares it.' },
      report: { uris: ['.'], args: ['howto', 'format?'], description: 'The last run of a how-to, from the request log: every step, each line, its answer whole, its checks, what it changed, its time; json (the default) or md.' },
      reset: { uris: ['.'], args: ['howto?'], description: 'The scene thrown away: every mrepo its steps deployed torn down, what they made in main removed; stepping starts again at the first step.' }
    }
  }
}

export const actions = {
  howto: { run, step, report, reset }
}
