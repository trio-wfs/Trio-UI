# TRIO WFS Design System
> Read by Claude Code at the start of every session in this project.

## What This Is
The shared component library and design token reference for all TRIO WFS products.
Built as a static HTML reference site + React/TypeScript component implementations.
Source of truth for all UI decisions across the TRIO WFS platform.

**Project path:** `/Users/jesses/Projects/Trio/Trio-UI`
**Localhost:** `python3 -m http.server 8080` from project root → http://localhost:8080

---

## Figma
- **Design system file ID:** `PjAYuPDr8IA1ccwiAjFkSD`
- **MCP:** Use `mcp__figma__get_design_context` with a node ID to pull component specs
- Never use hardcoded values — always extract from Figma via MCP before building
- If a spec is missing or unclear, report it and skip — do not guess

Figma REST API scripts have been removed. The Figma MCP replaces them entirely.
All component specs are pulled live via Figma MCP — no offline cache needed.

---

## Component Status

**35 components live** (have TSX + types):
Alert, Autocomplete, Badge, Breadcrumb, Button, ButtonGroup, ButtonIcon, Checkbox, Chip, Chart, ContentContainer, DatePicker, Footer, Handle, Menu, MetricCard, Modal, NavigationHeader, NavigationVertical, NumberField, PageHeaderToolbar, PopOver, ProductLogos, RadioGroup, SearchBar, Select, Slider, SplitButton, Stepper, Switch, Tabs, TextField, ToggleButton, Tooltip

**29 showcase pages live.** Token pages: Colors, Typography, Spacing.

**Remaining:** ~75+ components per `figma-component-manifest.json`

---

## Project Structure

```
/components          # One folder per component
  /Button
    Button.tsx               # React/TypeScript implementation
    Button.types.ts          # TypeScript interfaces from Figma
    button-showcase.html     # Design system website page
    README.md                # Optional notes

/design-tokens       # Source token files
  tokens.ts          # MUI theme overrides
  colors.json, typography.json, spacing.json, etc.

/figma-specs         # Legacy cached specs (stale — MCP is the source of truth)
/figma-cache         # Legacy cached Figma data

/briefs              # Design briefs for upcoming work
/design-reviews      # Past compliance reviews
/concepts            # Exploratory work, not production
/output              # Vite playground for testing React components
/templates           # Page/component templates

# Root-level website files
design-system-overview.html     # Entry point
design-system-nav.js            # Shared navigation (single source of truth)
design-system-shell.css         # Shared layout, tokens, and component styles
design-tokens-colors.html
design-tokens-typography.html
design-tokens-spacing.html
figma-component-manifest.json   # Full component list with Figma node IDs
COMPONENT_TEMPLATE.md           # Mandatory structure for new components
```

---

## Showcase Page Rules

Every component showcase MUST:
- Link `../../design-system-shell.css` and `../../design-system-nav.js`
- Use `<aside class="sidebar">` + `<main class="main-content">` layout
- Follow the canonical section order (see COMPONENT_TEMPLATE.md)
- Use design token CSS variables — never hardcoded hex/px values
- Be added to `design-system-nav.js` when complete

**Canonical section order:**
1. Overview (what it is, when to use)
2. Variants
3. Sizes (if applicable)
4. States (default, hover, focus, disabled, error)
5. Best Practices (do/don't)
6. Color Semantics (if applicable)
7. Technical Specifications (extracted Figma values)

---

## Tech Stack
- React + TypeScript (components)
- MUI v5 — `sx` prop or `styled()` for all styling
- `theme.palette`, `theme.spacing`, `theme.typography` — no hardcoded values
- `@mui/icons-material` only — no other icon libraries
- AG Grid for all data tables

---

## Design Rules
- 8px spacing grid: `xs:4, sm:8, mid:12, md:16, lg:24, xl:32, xxl:40`
- Modals: 900px large / 500px small
- Drawer: 400px standard
- 12-column grid, 16px gutters
- Roboto font only, max H5 for page headers
- Primary blue (#2196F3) = Save/Update actions only
- Desktop-first — no responsive/mobile considerations

**Before producing any UI output, read `PAGE_ARCHITECTURE.md`** — it defines page layer order, elevation rules, header variants, background hierarchy, and color usage. These rules apply to all TRIO WFS projects.

---

## Behavior Rules
- Always check `figma-component-manifest.json` for node IDs before pulling from Figma
- Always read existing components before building new ones — reuse patterns
- Only touch files relevant to the current task
- No unsolicited refactors
- Update `design-system-nav.js` when adding a new component page
