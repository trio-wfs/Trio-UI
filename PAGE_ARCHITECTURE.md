# TRIO WFS Page Architecture Rules

Rules for how pages are assembled from components. Read alongside `design-tokens/tokens.ts` and the component library.

> **For engineers:** These rules are non-negotiable. Components are built to enforce them — do not override.
> **For Claude:** Read this before producing any UI output for TRIO WFS projects.

---

## 1. Page Anatomy — Layer Order

Every TRIO page is built from 3 background layers, top to bottom:

```
┌─────────────────────────────────────────────────┐
│  background.default (#F5F5F5)  ← page canvas    │
│  ┌───────────────────────────────────────────┐  │
│  │  Page Header Component                    │  │
│  └───────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────┐  │
│  │  background.secondary (#FAFAFA)            │  │
│  │  ← content wrapper, 16px padding all sides│  │
│  │  ┌─────────────┐  ┌─────────────────────┐ │  │
│  │  │ background  │  │ background.paper    │ │  │
│  │  │ .paper      │  │ (#FFFFFF)           │ │  │
│  │  │ (#FFFFFF)   │  │  ┌───────────────┐  │ │  │
│  │  │             │  │  │ background    │  │ │  │
│  │  │             │  │  │ .paper        │  │ │  │
│  │  └─────────────┘  │  └───────────────┘  │ │  │
│  │                   └─────────────────────┘ │  │
│  └───────────────────────────────────────────┘  │
└─────────────────────────────────────────────────┘
```

### Rules

- **`background.default` (`#F5F5F5`)** — page canvas only. Nothing else uses this value.
- **`background.secondary` (`#FAFAFA`)** — the single content wrapper that fills the page below the header. Always 16px padding on all sides. Groups all page components.
- **`background.paper` (`#FFFFFF`)** — all cards, panels, containers, and components. Paper can nest inside paper (e.g. a card inside a panel, both paper). No exceptions.
- **Border stroke** — all paper containers use `border: 1px solid` `components.border.default` (`#E0E0E0`). No elevation.

---

## 2. Elevation & Shadows

Drop shadows are **only** used on floating/overlay elements:

- Modals
- Menus
- Popovers
- Breadcrumb dropdowns

**Never** use drop shadows on:

- Cards
- Panels
- Containers
- Any paper surface that is part of the page layout

Token to use when shadows are appropriate: `tokens.shadows.sm`

---

## 3. Navigation Header

The NavigationHeader sits fixed at the very top of every page. It is always present and always the same — no variants.

- 16px padding-bottom separating it from the page content below
- **Exception:** Digital Workers and future AI layouts omit the NavigationHeader entirely

---

## 4. PageHeaderToolbar

The toolbar below the NavigationHeader. Three variants, each for a different page context.

### Variants

| Variant | Background | Border | Breadcrumb | When to use |
|---------|-----------|--------|------------|-------------|
| **`full`** (default) | Paper (#FFFFFF) | 1px solid #E0E0E0 | Yes | Most existing TRIO pages — title, breadcrumb, actions, optional chips/eyebrow |
| **`default`** | Paper (#FFFFFF) | 1px solid #E0E0E0 | No | Pages that don't need breadcrumb navigation |
| **`NewCanvas`** | Transparent | None | Optional | Modern/minimal direction — sits flush on a secondary-background "canvas". Used on Programs page. Has scroll-triggered bottom divider. |

### Elements (all optional, shown when provided)

- **Breadcrumb row** — top of toolbar (`full` and `NewCanvas` only). Can be swapped for sub-section tabs.
- **Page title** — always present
- **Eyebrow text** — small caption below the title
- **Chip tags** — inline status indicators (`full` only)
- **Title icons** — small icons next to the title
- **Action buttons / button groups** — right-aligned
- **Status indicator** — left color bar

### Floating vs Attached

The toolbar either **floats** (16px gap to content) or **attaches** (no gap, shared border with content below). The choice depends on whether the toolbar controls the content directly.

**Floating (16px gap):**
- Toolbar is a standalone bar with title and actions
- Content below is independent — cards, panels, forms
- This is the default behavior

**Attached (no gap):**
- Toolbar's breadcrumb row is swapped for sub-section tabs
- Those tabs control which AG Grid view is shown below
- The toolbar and grid share one continuous border — they're one visual unit
- The tabs need a direct visual relationship to the content they switch

### Key rules

- **Header tabs are only for grid switching** — tabbing between AG Grid views on list pages
- **Detail pages** (candidate, job, facility) use the Tabs component inside the content area for section navigation — never header tabs
- Never invent a new header layout — always use a variant of PageHeaderToolbar
- If a page has no actions, remove the button group entirely rather than disabling buttons

---

## 5. Color Usage Rules

### Background hierarchy (see Section 1)

- Never use `background.default` (`#F5F5F5`) for a card or container — that's the page canvas only
- Never use `background.secondary` (`#FAFAFA`) for a card — that's the content wrapper only

### Primary blue (`#2196F3`)

- Save and Update actions only
- Not for navigation, not for status indicators, not for decorative use

### Data viz / accent teal (`#37636b` — `tokens.colors.dataViz.teal`)

- Metric card bars, stepper indicators, charts
- Complements the primary blue palette without competing with it
- Not for buttons, not for status chips

### Semantic colors — use only for status and feedback

| Color | Token | Value | Use for |
|-------|-------|-------|---------|
| Success | `success.main` | `#388e3c` | Positive outcomes, active/filled status |
| Warning | `warning.main` | `#E17109` | Caution, approaching a limit |
| Error | `error.main` | `#DB4537` | Failures, destructive actions, rejections |
| Info | `info.main` | `#54afca` | Informational, neutral callouts |

Never use semantic colors for decorative purposes or general UI chrome.

### What never gets a color

- Page backgrounds (always default/secondary/paper)
- Borders (always `#E0E0E0`)
- Dividers (always `#E0E0E0`)

---

## 6. Layout Rules

### Standard pages

- 16px padding inside the `background.secondary` content wrapper
- 12-column grid, 16px gutters
- Desktop-first — 1440px viewport target, no responsive/mobile considerations

### Full-width pages (Digital Workers, future AI layouts)

- No outer 16px padding — content stretches to the browser edge
- Header still present but frameless
- Same paper/border rules apply inside

---

## 7. Typography Rules

- **Font:** Roboto only — no Inter, no system-ui
- **Max headline:** H5 (24px) for page headers
- **Page titles:** H5 or H6 depending on header mode
- **Body copy:** body1 (16px) for primary content, body2 (14px) for dense/secondary content
- **No uppercase text** in UI — avoid `textTransform: uppercase` except for overline labels where explicitly called for in Figma
- **No font weights above 500 (Medium)** — 700 is not used in TRIO UI

---

## 8. Component Defaults

- **Border radius:** 4px standard, 999px pill (chips, badges, step circles)
- **Spacing:** 4/8/12/16/24/32/40px only — no arbitrary values
- **Modals:** 900px large, 500px small
- **Drawer:** 400px standard width (legacy — panels on the 12-column grid are the future direction, see Section 15)
- **Icons:** `@mui/icons-material` Outlined only — no other icon libraries
- **Icon size:** 16x16 in buttons and tabs — always. No exceptions.
- **Data tables:** AG Grid only — never MUI X DataGrid
- **PageHeaderToolbar:** title-to-eyebrow gap is 4px (`spacing.xs`)
- **Footer:** sticky, 16px horizontal padding, 16px vertical padding on copy, `#E0E0E0` top border (standard component border, not input border)
- **NavigationVertical:** never has a background color — always transparent

---

## 9. Grid Page Patterns

Two distinct patterns for data grids:

### Standalone grid page

The PageHeaderToolbar connects directly to the AG Grid — no content wrapper between them, no gap. They share one continuous border.

```
┌──────────────────────────────────────┐
│  PageHeaderToolbar (default variant) │  ← border on all sides
│  Title            [Create Task]      │
├──────────────────────────────────────┤  ← shared border, no gap
│  Active | Completed | Cancelled      │  ← filter tabs
├──────────────────────────────────────┤
│  Col 1  │  Col 2  │  Col 3  │ ...   │  ← AG Grid column headers
│  [____] │  [____] │  [    ] │ ...   │  ← filter inputs (disabled if not searchable)
│  data   │  data   │  data   │ ...   │  ← data rows (42px, zebra stripe)
└──────────────────────────────────────┘
```

- Header's bottom border IS the grid's top border
- Filter tabs sit between header and column headers
- The whole assembly is one visual unit with shared `border: 1px solid #E0E0E0`
- Reference: Figma node `5650:4810`

### Grid inside a tab

When a grid appears inside a tabbed section, the tab content area has 16px padding around it. The grid is wrapped in a ContentContainer.

```
┌──────────────────────────────────────┐
│  PageHeaderToolbar                   │
├──────────────────────────────────────┤
│ Tabs: Details | Tasks | Documents    │  ← flush to wrapper edge
│  ┌────────────────────────────────┐  │
│  │  16px padding                  │  │  ← content area inside tab
│  │  ┌──────────────────────────┐  │  │
│  │  │ ContentContainer (grid)  │  │  │
│  │  └──────────────────────────┘  │  │
│  └────────────────────────────────┘  │
└──────────────────────────────────────┘
```

---

## 10. Tab Rules

- Tabs sit **flush** on the content wrapper — no padding around them
- Content below tabs gets 16px padding
- Tabs with left icons are standard — use MUI outlined icons at 18px
- The selected tab's bottom border matches the surface color (hides the HR line)
- `surface="secondary"` when tabs sit on the `#FAFAFA` wrapper
- `surface="paper"` when tabs sit on a `#FFFFFF` container
- **Overflow:** When tabs exceed available width, use the built-in scroll arrow variant. Never wrap tabs to a second line, never truncate labels, never hide tabs in a dropdown.

---

## 11. Detail Page Pattern

Most detail pages (candidate, job, facility) use a multi-column layout within the #FAFAFA content wrapper:

- **Left rail** — Identity/summary card. Key-value pairs stacked vertically in a paper container. Content varies by entity.
- **Center column** — Main content. Descriptions, grouped data sections, nested containers. This is where the content density lives.
- **Right rail** — Contextual info. Relationship teams, shift details, background checks, bill rates. Quick-reference data that supports the center content.

This is a common pattern, not mandatory. Some pages are single-column, some use two columns. Adapt to the use case.

### Center column — grouping content

Within the center column, related data groups into bordered paper containers:
- A container might hold certification + license info together
- Another container holds profession/specialty/experience as a row group
- Sub-groups within a container use internal borders (#E0E0E0) to separate rows — not nested cards

The container signals "these fields are connected."

### Key-value pair display

The standard read-only data pattern across detail pages:
- **Label:** Caption (12px), text.secondary — left-aligned
- **Value:** Body2 (14px), text.primary — right-aligned
- Rows separated by horizontal border (#E0E0E0)
- Same pattern everywhere — detail cards, info panels, summary rails

---

## 12. Form Layout

| Property | Token | Value |
|----------|-------|-------|
| Vertical gap between fields | spacing.lg | 24px |
| Horizontal gap between columns | spacing.md | 16px |
| Section divider margin | spacing.sm | 8px top/bottom |
| Section title margin-bottom | spacing.sm | 8px |

### Rules

- Form fields stack vertically with **24px (spacing.lg)** gap — mandatory, not 16px
- Two-column form grids: `grid-template-columns: 1fr 1fr; gap: 24px 16px`
- Full-width fields (textareas, notes) span both columns
- Checkboxes and radio groups: **8px (spacing.sm)** between options within the group
- Form sections separated by 1px divider (`#E0E0E0`) with 8px margin above and below
- Section titles use Subtitle2 (14px, Medium 500)
- Most forms live in **modals**, not on their own page. If too complex for 900px, break into steps — don't make the modal bigger.

---

## 13. Data Display & Formatting

### Data formats

| Data type | Format | Example |
|-----------|--------|---------|
| Dates | MM/DD/YYYY | 04/02/2024 |
| Currency | $X,XXX.XX | $800.00 |
| Phone | (XXX) XXX-XXXX | (215) 555-1212 |
| Links / clickable text | Primary blue (#2196F3) | Email addresses, IDs that navigate, any text that triggers an action |

### Long text truncation

Truncate and show a **"Show More" link** styled in primary blue. The number of visible lines depends on context — no fixed line count. Use judgment based on container size.

### Loading states

- **Spinners only.** No skeleton loading screens.
- If loading takes more than 2 seconds, pair the spinner with a text label ("Loading credentials...")

### Empty states

- **AG Grid:** "No rows to display" centered. No icons, no illustrations, no action buttons.
- **Cards / pages:** Explain why it's empty and suggest an action. No sad illustrations.

---

## 14. Edit, Delete & Alert Patterns

### Edit & delete affordances

- **Pencil icon** — standard edit trigger. Used on grid rows and inline edit actions.
- **Trashcan icon** — standard remove/delete trigger.
- **Grid row editing** — always opens a modal. Do not inline-edit within the grid.
- **Detail page editing** — typically via modal. Default to modal unless Jesse says otherwise.

### Callout / alert containers

When content needs semantic emphasis (critical requirements, compliance warnings, important instructions), wrap it in a container with a **full border using the info color** (`info.main`). Not a left-accent-only treatment — full border around the container.

Use sparingly — for content the user must not miss, not general highlighting.

---

## 15. Content Surfaces — Modal, Panel, Inline

Three ways to show secondary content. The choice depends on whether the user is completing an action, referencing information, or optionally digging deeper.

### Modal (current standard)

The default for most existing TRIO workflows. Used for:

- **Completing actions** — create, edit, save, configure
- **Reviewing snapshots** — previously saved data in a focused view
- **Destructive confirmations** — delete, remove, deactivate

Modals interrupt the workflow — the user must complete or dismiss before continuing. This is intentional for actions that change data.

| Size | Width | When to use |
|------|-------|-------------|
| Large | 900px | Complex forms, multi-step flows, data-heavy content |
| Small | 500px | Confirmations, simple single-action dialogs |

If a form is too complex for 900px, break it into steps — don't make the modal bigger.

### Panel (newer direction)

Side panels that let the user reference detail information without losing context of the main page. Reduces friction compared to modals because the main view stays visible and interactive.

- Panels are **layout-driven**, not a fixed-width component — they use the 12-column grid (e.g. panel takes 4 columns, main content takes 8)
- No rigid size or position rules yet — the split depends on the content
- Panels are for **referencing and reviewing**, not for completing multi-field forms
- Digital Workers is the primary testing ground for this pattern

This pattern is still being developed. As we learn what works, specific defaults will be defined here.

### Inline expansion

For secondary content the user might want to dig into but doesn't need by default.

- Content expands in-place — no overlay, no interruption
- Used when the expanded content is subordinate to the primary content around it
- Collapse/expand is the user's choice — don't auto-expand

### Future direction

The long-term direction is moving away from modals toward more responsive, contextual experiences — content comes to the user in-context (panels, inline) rather than interrupting with modal overlays. Digital Workers demonstrates this approach. Until those patterns are proven and adopted, **modals remain the default for all existing TRIO projects**.

---

## 16. Still Needs Definition

- [x] ~~Page Header — full spec of each variant and when to use each~~ (Sections 3–4)
- [x] ~~Frameless header — exact spec~~ (NewCanvas variant, Section 4)
- [x] ~~Modal behavior rules~~ (Section 11)
- [ ] Full-width layout — exact spec for Digital Workers / AI pages. Trimmed-down header exists in DW designs but is placement-only. Full requirements TBD — will be spec'd collaboratively with Jesse when ready.
- [ ] Panel pattern defaults — standard column splits, animation behavior, when panel vs modal

---

*Last updated: 2026-05-04*
*Source: Jesse Szygiel (Lead UX Designer, AHTG)*
