# Changelog

All notable changes to the game. The format follows
[Keep a Changelog 1.1.0](https://keepachangelog.com/en/1.1.0/), and versions follow
[Semantic Versioning 2.0.0](https://semver.org).

## [Unreleased]
### Added
- A changelog page now shows what changed in each version. Open it from the version number on the title screen.

## [0.8.0] - 2026-11-04
### Added
- Each new game now gets its own seed from the moment you pick a character.
### Changed
- Seeds now go from 0 to 999,999. Links with a bigger seed start a new random game instead.
- The weather, ride distances and events on the same turn are now less linked to each other.
- Old seed links now play out differently, and earlier simulation results no longer match exactly.

## [0.7.0] - 2026-11-04
### Added
- Theme contracts and scaffolding for character-specific UI styles, meter modes, and commuter badges.

## [0.6.1] - 2026-11-02
### Changed
- Options now fade out at the edges of the swipe row.
### Fixed
- Long event text now stays inside its box.
- On an iPhone held sideways, Safari's toolbar no longer covers the game, and the orange background reaches the screen edges.

## [0.6.0] - 2026-11-02
### Added
- A vehicle now drives across the scene after each choice, and the bars and flag slide to their new values.
- On a phone held upright, the options become a row you can swipe forever in either direction.

## [0.5.0] - 2026-11-02
### Added
- Full games can now be played on the new screen, with a result screen after each move and an ending popup.
- Events now appear on the result screen.
- Return takes back your last choice, for testing. It may be removed in a later version.

## [0.4.1] - 2026-11-01
### Added
- Pixel fonts for the title and all other text.
### Changed
- The frame and side buttons now have 3D shading.
- Option cards now match the Canva design, with a short name in a pill and the costs below it.
- The speech bubble is now a plain rounded rectangle.
- The scene now shows as a labelled box until the group's backgrounds arrive.
### Fixed
- The energy bar now lines up with the money bar.

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
