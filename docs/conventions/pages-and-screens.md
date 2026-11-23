# Pages and screens

Definitions and guidelines for organizing HTML pages and in-page screens across the Commuter Game.

---

## 1. Definitions

### Page
A **page** is its own HTML document with its own entry module (`src/<page>.ts`) and a single clear purpose.
- Moving between pages loads a new document in the browser.
- Every page has its own shareable URL (e.g. `index.html`, `changelog.html`).
- Each page manages its own layout, lifecycle, and styles.

### Screen
A **screen** is a single state within a page, swapped in place without a page reload and driven by that page's internal state machine.
- Moving between screens replaces or transitions DOM elements within the page.
- A page with only one screen needs no screen machinery or state router.

---

## 2. When to make a new page or a new screen

| Decision | When to use | Examples |
|---|---|---|
| **New Page** | Content is not part of an existing page's user flow, needs an independent URL, or requires a fundamentally different layout (such as a vertically scrolling document instead of a fixed 16:9 arcade stage). | `changelog.html`, future standalone docs or about pages. |
| **New Screen** | Content is a step or state within a single continuous flow and shares the same container layout. | Title, character select, turn choices, moving vehicle animation, result, and ending screens inside `index.html`. |

---

## 3. URLs and History

- **Game screens (`index.html`):** The game's screens remain URL-less (no hash changes or pushState), because a commuter run cannot be entered halfway through without valid turn state.
- **Content pages that later gain screens:** Multi-screen content or documentation pages should use the URL hash (e.g. `page.html#section`), ensuring individual sections can be deep-linked and the browser's Back/Forward buttons work naturally.

---

## 4. Code and style sharing

**Pages share a look, not code:**
- **Design tokens and fonts:** Shared `@font-face` declarations, typography tokens, and core color palettes live in `base.css`. Every page loads `base.css` before its page-specific stylesheet.
- **Utilities and helpers:** Keep code duplication low without over-abstracting prematurely. A helper like `el()` is kept local to each page's module until extraction into a shared utility is clearly cleaner and necessary.

---

## 5. Current project inventory

1. **`index.html` (The Game):**
   - **Entry module:** `src/ui.ts` (routes between `src/ui-stage.ts` and `src/ui-plain.ts`).
   - **Screens:** `title`, `select`, `turn`, `moving`, `result`, and `ending`.
   - **Layout:** Fixed 16:9 arcade console cabinet (or plain wireframe view when `?ui=plain`).

2. **`changelog.html` (Changelog):**
   - **Entry module:** `src/changelog.ts`.
   - **Screens:** Single-screen scrolling document.
   - **Layout:** Responsive vertical scrolling document displaying version history fetched directly from `CHANGELOG.md`.
