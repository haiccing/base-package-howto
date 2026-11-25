# test/mounted/

The package's own test: its protocol as it is mounted, without an mrepo.

The package's `protocol.js` is what a runtime loads. It is loaded here
and checked: what it provides, its config, and its actions run on a
minimal execution: an mrepo's folder with a package's bundle holding a
how-to's script, its inbox a function that answers each command.

## What it checks

- **What it provides**: one protocol, `howto`, with a function for every
  action configured and no other.
- **Its config, value by value**: the package that brings it; `run`,
  its default action; every action at the mrepo itself, `.`, no state,
  no target; their arguments.
- **`run`, `step`, `report`, `reset`**: a how-to run through and
  passed, its first step again after the run, the steps since as a
  page, the scene thrown away; a key that is none refused; nothing
  written by an action itself.
- **Nothing forgotten**: the last test fails when the config names an
  action that was not run here, or one that wrote nothing into the
  request's log as it ran.

## Not here

A how-to run in a running mrepo, each line through its inbox: the
`haicc` command's end to end test, `base-linux-haicc`'s `test/howtos.sh`.
