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

**Remaining:** components from the Figma design system not yet built. To see what's available, use Figma MCP: `mcp__figma__get_metadata` with `fileKey: PjAYuPDr8IA1ccwiAjFkSD` (no nodeId) returns the file's top-level component list.

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
React + TypeScript + MUI v5 + AG Grid. See `README.md` for install / theme wiring details and `PAGE_ARCHITECTURE.md` §9 for component defaults.

---

## Design Rules

This project does not restate design rules. They live in canonical sources:

- `PAGE_ARCHITECTURE.md` — page layer order, color usage, layout, component defaults, tab patterns, grid patterns, alert rules, form rules
- `design-tokens/tokens.ts` — every token value (colors, spacing, radius, typography)
- `DIGITAL_JESSE.md` — brand voice, design philosophy, user persona

**Before producing any UI output, read `PAGE_ARCHITECTURE.md` and `design-tokens/tokens.ts`.** Both files together are the rule set — anything you'd otherwise guess at is in one of them.

---

## Behavior Rules
- Use Figma MCP for node IDs: `mcp__figma__get_metadata` with `fileKey: PjAYuPDr8IA1ccwiAjFkSD` returns the file's component list (or search a known component by traversing the metadata). The design system file itself is the source of truth — there is no static manifest.
- Always read existing components before building new ones — reuse patterns
- Only touch files relevant to the current task
- No unsolicited refactors
- Update `design-system-nav.js` when adding a new component page
