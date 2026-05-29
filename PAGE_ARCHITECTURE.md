# TRIO WFS Page Architecture Rules

Rules for how pages are assembled from components. Read alongside `design-tokens/tokens.ts` and the component library.

> **Canonical source.** This file is the authoritative source for layout, color usage, component defaults, page composition, tabs, grids, forms, alerts, and content surfaces. Other docs (`README.md`, both `CLAUDE.md` files, `COMPONENT_TEMPLATE.md`, `DIGITAL_JESSE.md`) point here instead of restating these rules. If a rule appears to be duplicated elsewhere, this file wins.
>
> Token values are owned by `design-tokens/tokens.ts`, not this file. This file references token *roles* and *usage*, not literal hex values where avoidable.
>
> **For engineers:** These rules are non-negotiable. Components are built to enforce them — do not override.
> **For Claude:** Read this before producing any UI output for TRIO WFS projects.

---

## 1. Page Anatomy — Layer Order

Every TRIO page is built from 3 background layers, top to bottom:

```
┌─────────────────────────────────────────────────┐
│  background.default (#F5F5F5)  ← page canvas    │
│  ← 16px padding on all sides of the canvas      │
│  ┌───────────────────────────────────────────┐  │
│  │  PageHeaderToolbar (paper, bordered)      │  │
│  └───────────────────────────────────────────┘  │
│  ← 16px gap                                     │
│  ┌───────────────────────────────────────────┐  │
│  │  background.secondary (#FAFAFA) wrapper    │  │
│  │  + 1px #E0E0E0 border + 4px radius         │  │
│  │  ← 16px internal padding around tab content│  │
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

- **`background.default` (`#F5F5F5`)** — page canvas only. Nothing else uses this value. The canvas has **16px padding on all four sides** — the PHT and content wrapper both sit within this padded area, never running to the browser edge. (The future full-width PHT variant is the only exception — see §4.)
  - **Exception — NavigationVertical edge.** When `NavigationVertical` is the immediate left neighbor of the content wrapper, the canvas's **left padding is 0**. The rail's right-edge internal padding (16px from the selected item to the rail edge) already provides the canonical inset; doubling them yields a 32px gap that reads as wrong even though every individual value is "correct." Same logic applies if a vertical rail is added on the right.
- **`background.secondary` (`#FAFAFA`)** — the single content wrapper that fills the page below the PHT. Has the **same paper border treatment** as other containers: `1px solid #E0E0E0` + 4px radius. Tabs sit flush at the top of this wrapper (see §11); tab content gets 16px padding inside it.
- **`background.paper` (`#FFFFFF`)** — all cards, panels, containers, and components. Paper can nest inside paper (e.g. a card inside a panel, both paper). No exceptions.
- **Border stroke** — every container surface (paper *and* the `#FAFAFA` wrapper) uses `border: 1px solid` `components.border.default` (`#E0E0E0`). No elevation.

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
- **Detail pages** (candidate, job, facility) use the Tabs component **at the content wrapper level** for section navigation — never header tabs. See §11.
- Never invent a new header layout — always use a variant of PageHeaderToolbar
- If a page has no actions, remove the button group entirely rather than disabling buttons

### Page placement — inset 16px from canvas edges

The PHT sits inside the page canvas's 16px padding (see §1). It does **not** run to the browser edge — `#F5F5F5` shows as a 16px gutter on the top, left, and right. Below it is a 16px gap to the content wrapper.

Internal padding inside the PHT itself is 16px on all sides of the main row.

**Future:** a full-width PHT variant is planned for Digital Workers / AI layouts. That variant *will* run edge-to-edge with no canvas padding around it. It is not yet shipped — until then, treat all PHT use as inset.

### Actions — slot composition

The right side of the PHT has three explicit slots: `inputTextFieldContent`, `buttonGroupContent`, and `singleButtonContent`. Use them for what they're named for; do not pour loose buttons into the actions area.

| Slot | Component | Use for |
|------|-----------|---------|
| `inputTextFieldContent` | `TextField` or `SearchBar` | Search / filter input scoped to the page |
| `buttonGroupContent` | `ButtonGroup` (one or more) | Connected secondary actions — icon trios (filter / columns / more), or labeled clusters (Export / Print) |
| `singleButtonContent` | `Button` | The single primary action for the page (e.g. "+ New Worker", "Save Changes") |

Multiple `ButtonGroup`s can sit in the actions area when actions cluster naturally — typically one icon-only group for grid controls and one labeled group for data actions, plus the primary `Button` on the far right.

**Don't:**
- Drop loose `Button` or `IconButton` instances next to each other in the actions area. Group them via `ButtonGroup` so they share one outer border and internal dividers, matching the segmented chrome the rest of the system uses.
- Put primary actions inside a `ButtonGroup` of secondary actions. The primary action is its own `Button` in `singleButtonContent`.

### Variant choice for grid pages

Standalone grid pages (§10) use the **`full` variant** of PHT — the `breadcrumbContent` slot is filled with the **Breadcrumb component in `state="Links"`**, which renders the grid view switcher (`All | Active | Pending | …`). Don't use the `default` variant on grid pages; you'd lose the slot the view switcher needs to live in.

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
- **Stepper specifically:** active step circle fill, completed checkmark icon, and connectors between completed steps all use teal. The current `Stepper.tsx` implementation uses primary blue — that is a known drift to be aligned to this rule, not the rule to follow.

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
- Desktop-first — 1440px viewport target. Layout primitives stack below 1200px (`lg`) per Section 7. This is a graceful floor, not mobile support.

### Full-width pages (Digital Workers, future AI layouts)

- No outer 16px padding — content stretches to the browser edge
- Header still present but frameless
- Same paper/border rules apply inside

---

## 7. Responsive Floor — Below `lg` (1200px)

TRIO is desktop-first. The intended viewport is 1440px. Below ~1200px (MUI's `lg` breakpoint), the experience is **degraded, not designed** — the goal is graceful stacking instead of squishing, so a user on a narrower window sees something readable, not broken.

This is not mobile support. Tables and dense workflows still require desktop, and the navigation components are TBD (see below). The responsive floor only ensures layout primitives don't visually collapse.

### Fluid widths, snap arrangement

**Width is fluid; arrangement is discrete.**

Containers grow and shrink with the browser within a breakpoint range. A 4-up `MetricCard` row at 1440px is the same 4-up row at 1280px — each card just gets proportionally narrower. The *arrangement* (4-up vs 2-up vs stacked, row vs column, multi-column vs single-column) only changes when the browser crosses a defined breakpoint, where it snaps cleanly to the new layout.

So desktop sizes from 1200 to 1920+ all see the same arrangement, just with fluid widths. The "snap" happens when the browser crosses *below* a primitive's defined breakpoint — never gradually in between.

This avoids two failure modes: rigid containers that leave dead margins on wide monitors, and squished half-wrapped middle states that come from also reflowing arrangement fluidly.

### The breakpoints

- **Default floor:** `lg` (1200px). Most layout primitives stack below this.
- **Some primitives stack later** at `md` (900px) — see the table below.
- **Above each primitive's defined breakpoint:** normal desktop layout — rows, multi-column grids, side-by-side cards.
- Use only MUI's standard breakpoints (`xs:0, sm:600, md:900, lg:1200, xl:1536`). Never invent custom pixel values.

### What stacks, and when

Each primitive has a defined breakpoint at which it snaps to stacked:

| Primitive | Stacks at | Behavior |
|-----------|-----------|----------|
| `PageHeaderToolbar` | `lg` (1200) | Title row and action row stack vertically; chips/eyebrow stay inline with the title |
| Filter bars | `lg` (1200) | Filter inputs/chips wrap, then stack |
| `MetricCard` rows | `md` / `sm` | 4-up at `lg` → 2-up at `md` → 1-up at `sm` |
| Two-column form sections | `md` (900) | Collapse to single column |
| Detail page rails (Section 12) | `md` (900) | Left/center/right collapse to a single stacked column |

### What does NOT stack

These remain desktop-only and are out of scope for the responsive floor:

- **AG Grid tables** — horizontal scroll is the fallback. If a grid is unusable below `lg`, the page should display a "best viewed on desktop" notice rather than re-architect the grid.
- **Modals** — already width-constrained (500/900px); stay centered.
- **The page shell itself** — the 12-column grid wrapper does not change.

### Navigation — needs definition

Both `NavigationHeader` and `NavigationVertical` need responsive behavior defined together — their treatments are paired (e.g. collapsed rail + slim header, drawer pattern). Until we work this through:

- `NavigationHeader` retains its full layout at all widths (no overflow menu yet).
- `NavigationVertical` retains its desktop layout at all widths (no collapse / drawer behavior yet).

This section will be updated once the navigation responsive behavior is settled.

### Implementation

Stacking behavior is baked into the layout primitives — consumers should not have to write `sx` overrides at every call site. A page using `<PageHeaderToolbar>` should get correct stacking automatically.

When a one-off `sx` override is genuinely needed, follow this shape:

```tsx
sx={{
  display: 'flex',
  flexDirection: { xs: 'column', lg: 'row' },
  gap: { xs: 2, lg: 3 },
}}
```

`xs` is the lowest-breakpoint default; `lg` is where the desktop layout kicks in. Nothing in between needs a value.

---

## 8. Typography Rules

- **Font:** Roboto only — no Inter, no system-ui
- **Max headline:** H5 (24px) for page headers
- **Page titles:** H5 or H6 depending on header mode
- **Body copy:** body1 (16px) for primary content, body2 (14px) for dense/secondary content
- **No uppercase text** in UI — avoid `textTransform: uppercase` except for overline labels where explicitly called for in Figma
- **No font weights above 500 (Medium)** — 700 is not used in TRIO UI

### How to use typography in code

Typography is a **token + theme system**, not a wrapper component:

- **Tokens:** `tokens.typography.h4`, `tokens.typography.caption`, etc. The full variant catalog is documented and rendered at `design-tokens-typography.html`.
- **In components:** use MUI's `<Typography variant="h4">` from `@mui/material`. The Trio theme (`design-tokens/theme.ts`) wires every MUI typography variant to the matching token, so `<Typography>` renders Trio-compliantly inside `<ThemeProvider theme={trioTheme}>`.
- **There is no Trio `Typography` wrapper component** — and one is not needed. The theme does the work. Importing `Typography` from `@trio-wfs/ui` will not work because it isn't exported. This is intentional, not a gap.
- **Never** hand-style text elements (`<h1 style={{fontSize: 34}}>...`) — they bypass the theme entirely and reinvent token values that already exist.

---

## 9. Component Defaults

- **Border radius:** 4px standard, 999px pill (chips, badges, step circles)
- **Spacing:** 4/8/12/16/24/32/40px only — no arbitrary values
- **Modals:** 900px large, 500px small
- **Drawer:** 400px standard width (legacy — panels on the 12-column grid are the future direction, see Section 16)
- **Icons:** `@mui/icons-material` Outlined only — no other icon libraries
- **Icon size:** 16x16 in buttons and tabs — always. No exceptions.
- **Data tables:** **AG Grid** — always, no exceptions. Never MUI X DataGrid, never hand-rolled `<table>` markup. See §10 for grid layout rules (column dividers, paper-bg headers, horizontal scroll).
- **PageHeaderToolbar:** title-to-eyebrow gap is 4px (`spacing.xs`)
- **Footer:** sticky, 16px horizontal padding, 16px vertical padding on copy, `#E0E0E0` top border (standard component border, not input border)
- **NavigationVertical:** never has a background color — always transparent

### Control Heights

Every form-row interactive control renders at the standard sizes. The canonical source is `tokens.controls.height` — components read from it; no hardcoded `32` or `38` values anywhere.

| Size | Height | Token |
|------|--------|-------|
| `small` | 32px | `tokens.controls.height.small` |
| `medium` | 38px | `tokens.controls.height.medium` |

**Applies to:** Button, Select, TextField, Autocomplete, NumberField, DatePicker, SearchBar, ButtonIcon (contained variant), ToggleButton (medium).

**Exception — compact icon-only controls (24px):** `ButtonIcon` ghost variant small and `ToggleButton` small slots use **`tokens.controls.ghostHeight` (24px)**. These affordances live in dense toolbars, grid filter rows, and breadcrumb actions where a 32px control would dominate the surrounding density. This is a Figma-sanctioned exception, not a drift — confirmed against component node 4819:14042 (ButtonIcon) and 6950:485 (ToggleButton).

When adding a new interactive control, pull its height from `tokens.controls.height` so the rule is enforced structurally. Hardcoded values are drift waiting to happen.

### ContentContainer — the standard paper surface

Every paper section on a page is a `ContentContainer`. Hand-rolled paper cards (white box + border + arbitrary header) are not allowed — use `ContentContainer` so the title strip stays consistent across the system.

| Property | Value |
|----------|-------|
| Background | `background.paper` (`#FFFFFF`) |
| Border | 1px solid `#E0E0E0` |
| Radius | 4px (or 0 when `flush`) |
| Title strip background | `background.default` (`#F5F5F5`) — **persistent** across all containers |
| Title strip height | 48px |
| Title strip padding | 16px left, 8px right |
| Title text | Subtitle2 — 14px / 500 / 16.8px line-height, `text.primary` |
| Title actions slot | Right-aligned: chips, icon buttons, small text buttons |
| Body padding | 16px default (configurable per use) |
| Bottom border under title | 1px solid `#E0E0E0` |

Containers can nest — a list of bordered KV rows inside a container body, or a smaller container inside a larger one. The title strip is required at the top level of each container.

**Containers vs. components:** standalone components like `Alert`, `MetricCard`, and `Stepper` already have their own structure and do **not** get wrapped in a ContentContainer or given a title strip. The rule applies to grouping cards/sections (Profile, Compliance, Profession & specialty, Bill rates, etc.).

---

## 10. Grid Page Patterns

**Always use AG Grid for data tables in React.** Hand-rolled `<table>` markup or MUI X DataGrid are not allowed. Static HTML prototypes mirror AG Grid's structure (column headers, filter row, zebra-striped data rows) so engineers can drop in `AgGridReact` when implementing.

**Always use the canonical theme.** Import `trioAgGridTheme` and `TRIO_AG_GRID_CSS` from `@trio-wfs/ui` and pass the theme to `<AgGridReact>`. Never re-skin AG Grid with raw CSS or a different theme — the canonical theme already encodes every rule in this section.

#### Typography — 14px default

All grid text is **14px** (`tokens.typography.fontSize.sm`, equivalent to MUI `body2`) unless explicitly overridden for a specific column or cell renderer. This applies to:

- **Column headers** — 14px / 500 / 21px line-height (body2 medium), `text.primary`
- **Data cells** — 14px / 400 / 21px line-height (body2), `text.primary`
- **Floating filter inputs** — 14px

Never shrink grid text below 14px to fit more columns — use horizontal scroll instead (see "Horizontal scroll behavior" below). Larger sizes (16px / body1) are reserved for cell renderers that need emphasis (e.g. a primary-name column) and must be called out per-column, not applied globally.

Two distinct patterns for data grids:

### Standalone grid page

The PageHeaderToolbar connects directly to the AG Grid — no content wrapper between them, no gap. They share one continuous border. The PHT is the **`full` variant**, with the `breadcrumbContent` slot occupied by the **Breadcrumb component in `state="Links"`** (pipe dividers) — this is the grid view switcher.

```
┌──────────────────────────────────────┐
│  PageHeaderToolbar (full variant)    │  ← top row: title, chips, actions
│  Title            [search] [⋯] [+]   │
├──────────────────────────────────────┤  ← shared border, no gap
│  All | Active | Pending | Inactive   │  ← Breadcrumb in state="Links" (40px, #FAFAFA)
├──────────────────────────────────────┤  ← shared border
│  Col 1 │ Col 2 │ Col 3 │ ...    →   │  ← Column headers (40px, paper bg, body2)
│  [___] │ [___] │ [   ] │ ...        │  ← Filter inputs (disabled if not searchable)
│  data  │ data  │ data  │ ...        │  ← Data rows (42px, zebra stripe)
└──────────────────────────────────────┘
```

#### Structure & borders

- Header's bottom border IS the grid's top border. The whole assembly shares one outer `1px solid #E0E0E0`.
- **Vertical column dividers** run through every row: `border-right: 1px solid #E0E0E0` on every header `th`, every filter cell, and every data `td`. The last cell in each row drops its right border so the outer frame stays clean.
- Reference: Figma node `5650:4810`

#### Grid view switching — Breadcrumb-Links, not Tabs

The `Active | Pending | Inactive` switcher is the **Breadcrumb component**, rendered with `state="Links"`:

- Same 40px height, same `background.secondary` (#FAFAFA), same caption (12px) text as a normal breadcrumb.
- Pipe `|` dividers (in `border.default` color) instead of slashes — that's the only visual difference from a regular breadcrumb.
- Non-selected items: primary-blue link text. Hover underlines.
- Selected item: `text.primary` color with a 2px primary-blue bottom border indicator on the item itself (matches the breadcrumb selected pattern).
- Optional inline count after each label, in `text.secondary`. Selected item flips its count to primary blue.

This is the **third tab pattern** referenced in §11C — distinct from the Tabs component, which is *not* used for grid view switching.

#### Column headers — paper bg, 40px tall

- Background: `background.paper` (#FFFFFF) — not `#F5F5F5`.
- Height: **40px**, matching the breadcrumb-Links strip directly above. Visually, the 40 → 40 rhythm reads as one continuous header band.
- Text: body2 medium — 14px / 500 / 21px line-height, `text.primary` (see Typography rule above).
- Sort indicator icons: 16px Material Outlined; **`unfold_more`** for unsorted columns in `text.disabled`, **`arrow_upward` / `arrow_downward`** for the active sort. The active sort icon uses **`components.icon.default` (#424242)** — *never* primary blue. (Primary blue is reserved for Save/Update actions, see §5.)
- `position: sticky; top: 0` so the header stays put under vertical scroll.

#### Horizontal scroll behavior

Grids must support a wide column count gracefully. **Always allow horizontal scroll inside the grid container** — never compress columns to fit:

- The `.ag-grid` container is `overflow: auto` (horizontal + vertical).
- The table is `width: max-content; min-width: 100%` — grows with content, never narrower than the container.
- Each cell is `white-space: nowrap` — content can't wrap and force odd row heights; it pushes into the horizontal scroll instead.
- Per-column widths are pinned via `<colgroup>` (or `colDef.width` in AG Grid). Default columns are sized for legibility, not "fit the viewport."
- The PHT, breadcrumb-Links strip, and outer border stay fixed; only the grid body scrolls.

When the column set grows beyond what fits, no layout breaks — the user scrolls. AG Grid's column pinning and the column-picker icon button (in the PHT's `buttonGroupContent` slot) handle the overflow ergonomics.

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

The same column-divider, paper-header, and horizontal-scroll rules apply inside the ContentContainer.

---

## 11. Tab Rules

There are **three** distinct uses for the Tabs component. Pick the right one.

### A. Detail page section tabs — content wrapper level (most detail pages)

The primary section navigation on detail pages (Worker, Order, Facility, etc.). Tabs sit **flush at the top of the `#FAFAFA` content wrapper**, span its full width, and switching a tab swaps the **entire content below**, including the left and right rails. Each tab is its own page-shaped layout.

```
┌────────────────────────────────────────────┐  ← #FAFAFA wrapper, 1px #E0E0E0 border
│ Overview · Credentials · Assignments · …   │  ← tabs flush at top, surface="secondary"
├────────────────────────────────────────────┤
│   16px padding                             │
│   ┌────────┐ ┌──────────────┐ ┌────────┐   │
│   │ left   │ │   center     │ │ right  │   │  ← per-tab content (rails included)
│   │ rail   │ │   column     │ │ rail   │   │
│   └────────┘ └──────────────┘ └────────┘   │
└────────────────────────────────────────────┘
```

- **Surface:** `surface="secondary"` — the active tab's background blends with the `#FAFAFA` wrapper.
- **What swaps:** everything below the tab strip. Rails are **per tab**, not persistent.
- **Identity / page subject:** lives in the PageHeaderToolbar (title, chips, eyebrow), *not* repeated on every tab.

### B. In-container tabs — inside a paper container

Used inside a single `ContentContainer` to switch between views of the same data set (e.g. "Active / Completed / Cancelled" on a list inside a card).

- **Surface:** `surface="paper"` — the active tab's background blends with the white container.
- **What swaps:** only the content inside that container.

### C. Header tabs — grid view switching only (list pages)

The view switcher inside a PageHeaderToolbar that flips between AG Grid views (`All / Active / Pending / Inactive`, etc.). Toolbar and grid share one continuous border (see §10, "Standalone grid page").

**This is *not* the Tabs component.** It is rendered with the **Breadcrumb component in `state="Links"`** — the same chrome as a normal breadcrumb, just with `|` pipe dividers instead of `/` slashes. It lives in the `breadcrumbContent` slot of the PHT (full variant).

| | Tabs (patterns A & B) | Breadcrumb-Links (pattern C) |
|---|----------------------|------------------------------|
| Component | `Tabs` (MUI Tabs) | `Breadcrumb` with `state="Links"` |
| Visual | Card tabs — rounded top corners, L/R strokes, top primary-blue indicator | Text links separated by `\|`, with a 2px primary-blue bottom border on the selected item |
| Surface | `secondary` (on #FAFAFA wrapper) or `paper` (inside container) | Always `#FAFAFA` (matches breadcrumb chrome) |
| Live where | Top of content wrapper, or top of paper container | `breadcrumbContent` slot of PHT |
| Switches | Whole tab panel, including rails | The grid view (data set the user sees) |
| Counts | No | Optional inline `<count>` after each label |

**Never use header tabs (Tabs component) for detail page section nav** — that's pattern A. **Never use Tabs for grid view switching** — that's pattern C, which is Breadcrumb-Links.

### Common rules (all three patterns)

- Tabs sit **flush** on their surface — no padding around the tabs themselves
- Content below tabs gets 16px padding
- Tabs with left icons are standard — use MUI outlined icons at 16px
- The selected tab's bottom border matches the surface color (hides the HR line) and gets a 2px primary-blue indicator at the **top**, not the bottom
- The selected tab has rounded top corners (4px) plus 1px `#E0E0E0` left and right strokes — it reads as a card-tab attached to the content below
- **Overflow:** when tabs exceed available width, use the built-in scroll arrow variant. Never wrap tabs to a second line, never truncate labels, never hide tabs in a dropdown.

---

## 12. Detail Page Pattern

Most detail pages (candidate, job, facility) use **wrapper-level section tabs** (§11, pattern A) and a **multi-column layout within each tab**:

```
NavigationHeader
  PageHeaderToolbar (subject identity: title, chips, eyebrow, actions)
  Content wrapper (#FAFAFA, bordered)
    Tabs: Overview · Credentials · Assignments · Timecards · Documents · Notes
    Per-tab content (each tab is its own layout):
      Left rail (col-span 3) · Center column (col-span 6) · Right rail (col-span 3)
```

- **Subject identity belongs in the PHT**, not a repeated card on every tab. Title, status chips, eyebrow ID, and primary actions live there.
- **Tabs swap the entire layout below** — different tabs can use different rail compositions, single column, two column, etc. Adapt per tab content.
- **Common per-tab rail roles:**
  - **Left rail** — supplemental identity, contact, compliance, tags. Quick-reference data about the subject.
  - **Center column** — the dense content for that tab (assignment history table, credentials list, timecard grid, etc.).
  - **Right rail** — contextual info that supports the center content (active assignment, bill rates, account team, recent activity).

This is a common pattern, not mandatory. Some tabs are single-column, some use two. Adapt to the use case.

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

## 13. Form Layout

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

## 14. Data Display & Formatting

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

## 15. Edit, Delete & Alert Patterns

### Edit & delete affordances

- **Pencil icon** — standard edit trigger. Used on grid rows and inline edit actions.
- **Trashcan icon** — standard remove/delete trigger.
- **Grid row editing** — always opens a modal. Do not inline-edit within the grid.
- **Detail page editing** — typically via modal. Default to modal unless Jesse says otherwise.

### Callout / alert containers

When content needs semantic emphasis (critical requirements, compliance warnings, important instructions), wrap it in a container with a **full border using the info color** (`info.main`). Not a left-accent-only treatment — full border around the container.

Use sparingly — for content the user must not miss, not general highlighting.

### Alert color cohesion

When using the `Alert` component (or any alert-style callout), every colored element inside the alert uses the **same semantic color** — the one matching the alert's severity. Border, icon, title, description, and action buttons all share that single color.

| Severity | Single color used everywhere |
|----------|------------------------------|
| Info | `info.main` (`#54AFCA`) |
| Success | `success.main` (`#388E3C`) |
| Warning | `warning.main` (`#E17109`) |
| Error | `error.main` (`#DB4537`) |

**Do not** mix the semantic color (border + icon) with `text.primary` / `text.secondary` for the title and description. The alert reads as a single semantic block.

The exception is the `contained`/filled variant where the background carries the color and text is `contrastText` (white) — that's still a single coordinated color choice, just inverted.

---

## 16. Content Surfaces — Modal, Panel, Inline

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

#### CTA labels — verb-noun pattern

Primary action buttons in modals (and any page-level primary action) follow a verb-noun pattern that names the consequence. Most Save/Update operations in TRIO live in modals, so this rule shows up here first, but it applies anywhere a primary action exists.

| Pattern | When to use | Examples |
|---------|-------------|----------|
| **Create [Noun]** | The modal commits a *new* entity | Create User · Create Shift Template · Create Fee Schedule |
| **Update [Noun]** | The modal commits *changes* to an existing entity | Update Worker Profile · Update Bill Rate · Update Assignment |
| **Delete [Noun]** | Destructive — uses `error.main` color | Delete Account · Delete Assignment |
| **Approve [Noun]** / **Reject [Noun]** | Review decisions | Approve Submission · Reject Timecard |
| **Send [Noun]** | Transmit actions | Send Invitation · Send Reminder |
| **Assign [Noun]** | Pairings | Assign Worker · Assign Agency |

Cancel always stays "Cancel" — paired with the verb-noun confirm action.

**Never use:** Save · Submit · OK · Confirm. They hide what the action commits.

**Evaluation checklist** — use when reviewing a prototype:

- [ ] Primary button is verb-noun, not "Save" / "Submit" / "OK"
- [ ] "Create X" if the flow produces a new record
- [ ] "Update X" if the flow modifies an existing record
- [ ] The noun is specific enough that the user knows what's about to commit

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

## 17. Still Needs Definition

- [x] ~~Page Header — full spec of each variant and when to use each~~ (Sections 3–4)
- [x] ~~Frameless header — exact spec~~ (NewCanvas variant, Section 4)
- [x] ~~Modal behavior rules~~ (Section 12)
- [ ] Full-width layout — exact spec for Digital Workers / AI pages. Trimmed-down header exists in DW designs but is placement-only. Full requirements TBD — will be spec'd collaboratively with Jesse when ready.
- [ ] Panel pattern defaults — standard column splits, animation behavior, when panel vs modal

---

*Last updated: 2026-05-29 — §10 Typography subsection added: AG Grid text is 14px (body2) by default for headers, cells, and floating filters; larger sizes must be called out per-column. Canonical theme requirement (`trioAgGridTheme` from `@trio-wfs/ui`) made explicit. Previous update 2026-05-26 — NavigationVertical edge exception added to §1 (canvas left-padding is 0 when the vertical rail is the immediate left neighbor; the rail's right-edge padding already supplies the 16px inset). Previous update 2026-05-07 — content-wrapper border treatment (§1), PHT 16px canvas inset (§4), PHT actions slot composition (§4), PHT full-variant requirement for grid pages (§4), Stepper teal alignment note (§5), AG Grid mandate (§9), ContentContainer persistent title strip spec (§9), Standalone grid page rebuild — Breadcrumb-Links view switcher, paper-bg 40px column headers, vertical column dividers throughout, horizontal scroll behavior, sort indicator color (§10), three-pattern Tabs taxonomy clarified — pattern C is Breadcrumb-Links not Tabs (§11), wrapper-level tabs in Detail Page Pattern (§12), Alert color cohesion rule (§15).*
*Source: Jesse Szygiel (Lead UX Designer, AHTG)*
