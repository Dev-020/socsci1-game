# Changelog rules

`CHANGELOG.md` in the project root follows
[Keep a Changelog 1.1.0](https://keepachangelog.com/en/1.1.0/). Version numbers follow
[versioning.md](versioning.md).

This file is project-owned. It began as the warehouse's `convention/changelog` 0.1.2, which covers
warehouse items only, and was detached and rewritten for this game.

## Format

```markdown
## [Unreleased]

## [0.4.0] - 2026-11-05
### Added
- Something new that players can see.
```

- Newest version first, directly under `[Unreleased]`.
- Dates are `YYYY-MM-DD`.
- `[Unreleased]` is always present, even when empty. Work in progress collects there until release.
- Only list categories that have entries.

## Categories

| Category | Use for |
|---|---|
| **Added** | New features |
| **Changed** | Changes to existing behaviour or balance |
| **Removed** | Things that are gone |
| **Fixed** | Bug fixes |

## What to write

Write for your groupmates, not for programmers. Say what changed in the game.

| Good | Bad |
|---|---|
| The Train now costs ₱12 for students. | Updated `costDiscount`. |
| Return takes you back to the start of the turn. | Added undo state handling. |

If a change makes old seeds or simulation results incomparable, say so in its entry.
