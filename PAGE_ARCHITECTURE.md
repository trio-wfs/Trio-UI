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

## 3. Page Header

One component, multiple configurations. The variant used depends on what the page needs.

### Header Modes

| Mode | When to use | Notes |
|------|-------------|-------|
| **Full toolbar** | Pages with actions (save, edit, filter, export) | Breadcrumb, title, button group, optional tab row |
| **Frameless** | Extended pages such as Program Work | No outer frame/border, content extends to edges |
| **AI / Full-width** | Digital Workers and future AI-driven layouts | No 16px outer padding, content stretches full browser width |

### Header Elements (all optional, mix based on page need)

- **Breadcrumb** — on/off
- **Eyebrow text** — small label above the page title
- **Page title** — always present
- **Tags** — inline with title
- **Tab row** — replaces or sits below title row; can be swapped off
- **Button / Button Group** — primary and secondary actions

### Rules

- Never invent a new header layout — always use a configuration of the existing component
- If a page has no actions, remove the button group entirely rather than disabling buttons
- Tab row and breadcrumb are mutually exclusive in most cases — confirm with Jesse if both seem needed

---

## 4. Color Usage Rules

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

## 5. Layout Rules

### Standard pages

- 16px padding inside the `background.secondary` content wrapper
- 12-column grid, 16px gutters
- Desktop-first — 1440px viewport target, no responsive/mobile considerations

### Full-width pages (Digital Workers, future AI layouts)

- No outer 16px padding — content stretches to the browser edge
- Header still present but frameless
- Same paper/border rules apply inside

---

## 6. Typography Rules

- **Font:** Roboto only — no Inter, no system-ui
- **Max headline:** H5 (24px) for page headers
- **Page titles:** H5 or H6 depending on header mode
- **Body copy:** body1 (16px) for primary content, body2 (14px) for dense/secondary content
- **No uppercase text** in UI — avoid `textTransform: uppercase` except for overline labels where explicitly called for in Figma
- **No font weights above 500 (Medium)** — 700 is not used in TRIO UI

---

## 7. Component Defaults

- **Border radius:** 4px standard, 999px pill (chips, badges, step circles)
- **Spacing:** 4/8/12/16/24/32/40px only — no arbitrary values
- **Modals:** 900px large, 500px small
- **Drawer:** 400px standard width
- **Icons:** `@mui/icons-material` only — no other icon libraries
- **Data tables:** AG Grid only — never MUI X DataGrid

---

## 8. Still Needs Definition

These need more specification before they become hard rules:

- [ ] Page Header — full spec of each variant and when to use each
- [ ] Modal behavior rules (when modal vs. drawer vs. inline expansion)
- [ ] Specific tab row usage rules
- [ ] Frameless header — exact spec
- [ ] Full-width layout — exact spec for Digital Workers / AI pages

---

*Last updated: 2026-04-07*
*Source: Jesse Szygiel (Lead UX Designer, AHTG)*
