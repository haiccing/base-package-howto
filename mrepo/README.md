# mrepo/

A how-to's boot: the list of the packages it is made of, its service and its hooks.

- **Its packages** (`packages/.layer.json`): the boot mrepo's, the
  service protocol, and this package last, the runner; every package in
  the install's store documented beyond it (`documents: store`), each
  how-to's page with its steps.
- **A service**, commissioned into service by its deploy: what a
  how-to's lines deploy and make (`boot`, `crud`) behind its door.
- **Its main, the scene**: what the steps make and deploy; `howto/reset`
  empties it.

## Runtime config

- `boot`: `haicc`, `haici`, `help`, `howto`, `info`, `runtime` and
  `service` activated, each time its runtime starts.
- `commission`: its service initialised and started, at its deploy (and
  again at a restart, idempotent).
- `initialise`: its info built, from its packages and the store's.
- `start`, `stop`: `boot` and `crud` activated, deactivated: the
  commands a how-to's lines are made of.
- `shutdown`: its info's build removed.
