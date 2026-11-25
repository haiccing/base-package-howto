# base-package-howto

The howto protocol: a how-to's steps run where it is installed, each line a request, what each answers checked.

A how-to is a page and its script, `steps.haicc`, beside it: its steps,
each line as typed after `haicc`, with what it answers (`# expect:`).
Deployed, this package is a how-to's boot: an mrepo with the boot
mrepo's protocols, a service, and the runner, every package in the
install's store documented in it. A line runs there, at `.`,
through its own inbox: it sees what is below it, nothing above.

## Links

- [run](modules/pear-full-square/mrepo-base-howto/external/run/)
- [step](modules/pear-full-square/mrepo-base-howto/external/step/)
- [report](modules/pear-full-square/mrepo-base-howto/external/report/)
- [reset](modules/pear-full-square/mrepo-base-howto/external/reset/)
- [howto](howto/)
- [mrepo](mrepo/)
- [test](test/)
- [test-reports](test-reports/)
- [modules](modules/)

## Included packages

- [base-package-runtime](../base-package-runtime/)
- [base-package-info](../base-package-info/)
- [base-package-help](../base-package-help/)
- [base-package-haici](../base-package-haici/)
- [base-package-protocol](../base-package-protocol/)
- [base-package-boot](../base-package-boot/)
- [base-package-service](../base-package-service/)
- [base-package-haicc](../base-package-haicc/)
- [base-package-crud](../base-package-crud/)

## Config

The `howto` protocol's, in `protocol.js`; no state. Every action at the
mrepo itself, `.`, the scene; a how-to by its key,
`<org>/<package>/<name>` (`haiccing/base-package-crud/query`).

| action | arguments | what it does |
|---|---|---|
| `run`, the default | the how-to | through: the scene thrown away and prepared, every step, every check |
| `step` | the how-to | the next step, its answers; the first prepares the scene |
| `report` | the how-to, `json` or `md` | its last run, from the request log |
| `reset` | the how-to, optional | the scene thrown away; stepping from the first step again |

## Package

- `protocol.js`: the `howto` protocol, its config and its actions, from
  `mrepo-base-howto`.
- `mrepo/`: a how-to's boot, the list, its service and its hooks.
- `main.js`: the dispatcher, the bundle's main, generated.
