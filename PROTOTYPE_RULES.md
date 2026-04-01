# TRIO WFS Prototype Rules
> Read this file before building any prototype, screen, or component layout for TRIO WFS.
> These rules apply to ALL TRIO projects unless explicitly noted as an exception.
> Source: Jesse Szygiel, Lead UX Designer, AHTG

---

## 1. Page Anatomy — Layer Order

Every TRIO page is built from layers in this order:

```
┌──────────────────────────────────────────────────────────┐
│  Top Navigation (sticky, full browser width)             │  ← node 3868:49596
├──────────────────────────────────────────────────────────┤
│  background.default (#F5F5F5) — page canvas              │
│  ┌────────────────────────────────────────────────────┐  │
│  │  HeaderToolbar component (node 3859:2813)          │  │
│  └────────────────────────────────────────────────────┘  │
│  ┌────────────────────────────────────────────────────┐  │
│  │  background.secondary (#FAFAFA) — content wrapper  │  │
│  │  16px padding all sides                            │  │
│  │  ┌──────────────────┐  ┌──────────────────────┐   │  │
│  │  │ background.paper │  │ background.paper     │   │  │
│  │  │ (#FFFFFF)        │  │ (#FFFFFF)            │   │  │
│  │  │                  │  │  ┌────────────────┐  │   │  │
│  │  │                  │  │  │ background     │  │   │  │
│  │  │                  │  │  │ .paper         │  │   │  │
│  │  └──────────────────┘  │  └────────────────┘  │   │  │
│  │                         └──────────────────────┘   │  │
│  └────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────┘
```

### Background Token Rules

| Token | Value | Used for |
|-------|-------|---------|
| `background.default` | `#F5F5F5` | Page canvas AND container banners (see Section 1b) |
| `background.secondary` | `#FAFAFA` | Content wrapper below HeaderToolbar — 16px padding, groups all page components |
| `background.paper` | `#FFFFFF` | All cards, panels, containers, components. Paper nests inside paper freely. |

- All paper containers: `border: 1px solid #E0E0E0`. No drop shadows.
- Selected/focused cards: border changes to `components.border.focus (#64B5F6)`

### 1b. Container Banners
`background.default` (#F5F5F5) is also used for **container banners** — data containers with a header row that includes a subtitle and optional right-side action area. These sit at the top of page components. The header uses `text.secondary` for the subtitle label.

> **Open question:** This pattern should become its own Figma component — confirm with Jesse before building ad hoc.

---

## 2. Top Navigation

- **Figma node:** `3868:49596`
- Fills the entire browser width
- Sticky — stays fixed at top of viewport while page scrolls
- Present on **all standard TRIO pages**
- **Exception:** New concept designs (Digital Workers, future AI layouts) do not use this nav

---

## 3. HeaderToolbar

**Figma component:** `HeaderToolbar` (node `3859:2813`) — this is the correct name and component. Do not call it "Page Header."

### Variants

| Variant | Background | Padding | When to use |
|---------|-----------|---------|-------------|
| **Full** | `background.default` | 16px all sides | Standard pages with actions |
| **Frameless** | None — sits directly on `background.secondary` | 16px all sides | Extended pages e.g. Program Work |
| **Full-width / AI** | None — stretches full browser width, no outer padding | None | Digital Workers, future AI-driven layouts |

### HeaderToolbar Elements
All optional — use only what the page needs:
- **Breadcrumb** — wayfinding for deep pages
- **Eyebrow text** — small label above the page title
- **Page title** — always present when HeaderToolbar is used
- **Tags** — inline with title
- **Tab row** — see tab rules below
- **Button / Button Group** — primary and secondary actions

### Tab + Breadcrumb Rules
- **Tabs and breadcrumb are mutually exclusive inside HeaderToolbar**
- **Exception:** When AG Grid has its own tab row for grid-level filtering AND the page needs a breadcrumb — in this case the HeaderToolbar shows the breadcrumb and is **not attached directly to the content below**. A **16px gap** separates the HeaderToolbar from the AG Grid's tab row so the two don't stack.

### What not to do
- Never invent a new header layout — always use a HeaderToolbar configuration
- If a page has no actions, remove the button group entirely — don't leave disabled buttons
- Never stack breadcrumb and tabs directly against each other without the 16px gap

---

## 4. Button Usage Rules

Buttons communicate intent. The variant and color signal what kind of action the user is taking.

### Primary Blue — Committing Actions
| Variant | Use for |
|---------|---------|
| **Contained** (`#2196F3` filled) | Save, Update, Submit, Create (completing something) |
| **Outlined** | Deploying a new workflow — e.g. "Create a new Digital Worker" — prominent but not the final commit |
| **Text** | Page direction and navigation — moving somewhere, not doing something |

### Secondary — Utility Actions
| Variant | Use for |
|---------|---------|
| **Secondary Contained** (`#F5F5F5`) | Primary utility: open a modal, trigger a dropdown, edit, prompt — actionable but not committing |

### Semantic Colors
- Used **sparingly** — only for issue states and feedback
- **Info** (`#54afca`) — decorative callouts, informational indicators
- **Success / Warning / Error** — status only, never decorative

### Data Viz
- `tokens.colors.dataViz.teal` (`#37636b`) — metric bars, stepper indicators
- Will expand to a full data viz kit in future — do not extend this color's usage beyond established patterns until then

---

## 5. Elevation & Shadows

Drop shadows are **only** used on floating/overlay elements:
- Modals
- Menus
- Popovers
- Breadcrumb dropdowns

**Never** on cards, panels, containers, or any paper surface in the page layout.

Token: `tokens.shadows.sm` — `0px 2px 4px rgba(0,0,0,0.075)`

---

## 6. Typography Hierarchy

Font: **Roboto only**. No Inter, no system-ui.

| Style | Size | Weight | Used for |
|-------|------|--------|---------|
| H5 | 24px / 500 | Medium | Larger page sections |
| H6 | 20px / 500 | Medium | HeaderToolbar title |
| Subtitle 1 | 16px / 500 | Medium | Container headers |
| Subtitle 2 | 14px / 500 | Medium | Sub-section labels |
| Body 1 | 16px / 400 | Regular | Primary content |
| Body 2 | 14px / 400 | Regular | Dense/secondary content |
| Caption | 12px / 400 | Regular | Labels alongside body copy |
| Overline | 11px / 500 | Medium | Category labels, metadata |

- **Max headline is H6** for standard UI. H5 for large page section breaks.
- H1–H4 exist in the system but are not used in current TRIO UI.
- **No uppercase** except overline where explicitly called for in Figma.
- **Max font weight is 500 (Medium).** 700 (Bold) is not used in TRIO UI.

---

## 7. Spacing Rules

Grid: **8pt base. 12-column. 16px gutters.**

| Value | Token | Use for |
|-------|-------|---------|
| **4px** | `spacing.xs` | Sparingly — icon/text pairing, stacked typography relationships |
| **8px** | `spacing.sm` | Close relationships — chips, related containers, grouped elements |
| **12px** | `spacing.mid` | Inside components (button internal padding) — NOT for page-level spacing |
| **16px** | `spacing.md` | Default page padding and gutters for most page-level elements |
| **24px** | `spacing.lg` | Between form elements — vertical breathing room for legibility |
| **32px** | `spacing.xl` | Separating bodies of content at template level |
| **40px** | `spacing.xxl` | Separating major content sections; left/right modal gutters |

### Spacing judgement
- **Compact content:** Balance spacing, don't over-space. Use 12px inside components, 16px at page level.
- **Spacious content:** Use 24–32px to let things breathe. Depends on available space on the page.
- **40px** is also the left/right padding inside modals — frames the modal content.

---

## 8. Layout & Grid

- **Target viewport:** 1724px (based on US screen resolution data — gs.statcounter.com)
- **Compromise breakpoint:** 1440px — experience degrades below this
- **Desktop-first** — no responsive/mobile considerations
- **Standard pages:** 16px padding inside the `background.secondary` content wrapper
- **Full-width pages** (DW/AI): No outer padding — content stretches to browser edge. Same paper/border rules apply inside.

---

## 9. AG Grid Rules

- All data tables use AG Grid — **never MUI X DataGrid**
- Use the AG Grid component as designed in the TRIO library: **zebra striped**
- Use our styled components — not AG Grid's default styling
- AG Grid can have its own tab row for grid-level filtering (independent of HeaderToolbar tabs)

---

## 10. Modal vs Drawer vs Inline

| Pattern | Use when |
|---------|---------|
| **Modal** | Most TRIO workflows — current standard pattern |
| **Drawer / Panel** | More ambitious, context-heavy flows — used selectively and for future thinking |
| **Inline expansion** | Amount of content is small, doesn't warrant its own workflow, and context doesn't require isolation |

Modal sizes: **900px large / 500px small**. 40px left/right padding inside.

---

## 11. Things Still Needed

- [ ] Container banner — confirm as Figma component, get node ID
- [ ] HeaderToolbar — full visual examples of each variant (Jesse to provide screenshots)
- [ ] Full-width AI layout — visual reference for DW layout (Jesse to provide)
- [ ] Tooltip rules — when to add tooltips to dropdown lists
- [ ] Data viz kit — future expansion of dataViz token set

---

*Last updated: 2026-04-01*
*Source: Jesse Szygiel, Lead UX Designer, AHTG*
