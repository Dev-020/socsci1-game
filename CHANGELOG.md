# Changelog

All notable changes to the game. The format follows
[Keep a Changelog 1.1.0](https://keepachangelog.com/en/1.1.0/), and versions follow
[Semantic Versioning 2.0.0](https://semver.org).

## [Unreleased]

## [0.4.0] - 2026-11-01
### Added
- A new game screen with a console frame, scene and bottom panel, plus title and character select screens. Options can't be chosen on it yet in this version.
- Pictures from the group can be added by filename. Until then, each one shows as a labelled box.
- A link such as `?ui=plain` shows the original plain screens, and it works alongside `?seed=`.
### Changed
- The main link now opens the new game screen.

## [0.3.0] - 2026-11-01
### Added
- The game version now shows on the character select screen.
### Changed
- Runs are now counted in turns instead of segments.
- The Clear Traffic Flow event now says "along this stretch".

## [0.2.0] - 2026-11-01
### Added
- A link such as `?seed=123` plays that exact run.
- The seed now shows on the journey and ending screens.
- `SEED` setting for fixing the seed of every run.
### Changed
- Random rolls now come from a seeded `fixedSin` formula, with one fixed roll per turn and purpose.
- The original Python game moved into `python/`.

## [0.1.0] - 2026-11-01
### Added
- First web version of the game, ported from Python to HTML, CSS and TypeScript.
### Fixed
- The game no longer crashes when Walk is the only option left, a bug in the Python version.
