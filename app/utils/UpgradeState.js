import {evolve, pipe, map, identity, assoc} from "ramda";

const upgradeAction = pipe(identity);

const upgradeCondition = pipe(identity);

const upgradeLink = pipe(
  identity,
  evolve({
    actions: map(upgradeAction),
    conditions: map(upgradeCondition),
  })
);

const upgradeScene = pipe(
  identity,
  evolve({
    actions: map(upgradeAction),
    links: map(upgradeLink)
  })
)

const upgradeState = pipe(
  identity,
  evolve({
    scenes: map(upgradeScene),
  })
)

export const upgrade = upgradeState
