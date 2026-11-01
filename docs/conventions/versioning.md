# Versioning

The game uses [Semantic Versioning 2.0.0](https://semver.org): `MAJOR.MINOR.PATCH`.

This file is project-owned. It began as the warehouse's `convention/versioning` 0.1.1, which covers
warehouse items only, and was detached and rewritten for this game.

## Where the version lives

`VERSION` in `src/data.ts` is the only source. The game displays it.

## Which number to bump

The game is in draft while it is `0.x.y`.

| Bump | When | Example |
|---|---|---|
| **MINOR** `0.4.0` | A new feature, or a change players or the simulations can notice | New screen, `?ui=plain`, changed balance values |
| **PATCH** `0.3.1` | A fix or wording change that adds nothing new | Typo, visual bug, broken link |

**`1.0.0`** is the final version presented to the class. After that, MAJOR is for changes that make
earlier results or seeds incomparable, such as changing the rules or the random roll formula.

## Rules

- A change to rules, balance values or random rolls is at least MINOR, and the simulations must be
  rerun, because the same seed can now produce a different run.
- A released version is never changed. Every later change gets a new number.
- Every release has a `CHANGELOG.md` entry ([changelog.md](changelog.md)) and a git tag `game@<version>`,
  such as `game@0.3.0`.

## Releasing

1. Update `VERSION` in `src/data.ts` and compile.
2. Move everything under `[Unreleased]` in `CHANGELOG.md` into a dated version heading.
3. Commit, then tag the commit `game@<version>`.
