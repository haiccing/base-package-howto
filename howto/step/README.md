# step

A how-to a step at a time, each step's answers seen, its report read, its scene thrown away.

Where `howto/run` goes through every step at once (a demo, the
validation), `howto/step` runs one, the next, and answers with what
each line answered: what a reader of the page would see typing it. The
first step throws the scene away and prepares it; the report reads the
run back from the request log.

## Steps

The script, [steps.haicc](steps.haicc): each line as typed after `haicc`, what it answers under it; run with `howto/run`, shown here at info extraction.

## Notes

- **Where it stands** is read from the request log, nothing kept beside
  it: after a reset, a run or another how-to's first step, stepping
  starts at the first step again.
- **The scene is one**: the mrepo the runner is in; a how-to's boot
  runs one how-to at a time.
