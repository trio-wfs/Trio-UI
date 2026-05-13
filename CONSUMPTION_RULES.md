# Consumption Rules — TRIO WFS Design System

> How to use the design system in any TRIO prototype or product.
> If you're building **inside** the design system itself, see [`/Trio-UI/CLAUDE.md`](./CLAUDE.md) instead.

---

## The rule

**All UI components in any TRIO prototype or product must come from `@trio-wfs/ui`.** If a component you need doesn't exist in the design system, **stop and flag** — we'll add it to the DS first.

Raw MUI is permitted only for layout primitives (`Box`, `Stack`, `Typography`, `Divider`) and for icons (`@mui/icons-material`) — see the carve-out below. Everything else with a visual design or interactive behavior comes through `@trio-wfs/ui`.

There are no other exceptions. If you find yourself wanting one, that's a signal the DS needs to grow.

---

## What "raw MUI is permitted" actually means

`Box`, `Stack`, `Typography`, `Divider`, and icons from `@mui/icons-material` are allowed because they carry no TRIO-specific design decisions — they're styling primitives driven by the active MUI theme (`trioTheme`).

But the carve-out is conditional: **every style applied to them must come from tokens.** Never hardcode.

```tsx
// OK — Box with token-driven styling
<Box sx={{ padding: tokens.spacing.md, bgcolor: tokens.colors.background.paper }} />

// NOT OK — Box with hardcoded values
<Box sx={{ padding: '16px', bgcolor: '#FFFFFF' }} />
```

Typography variants flow from the theme automatically, so `<Typography variant="h5">` is correct as-is. Just don't override font sizes or colors with hardcoded values.

These primitives may eventually move into the DS as wrappers. Until they do, raw MUI is acceptable for these four cases.

---

## Mandatory workflow before writing any JSX

1. Pull Figma design context for the target node (`mcp__figma__get_design_context`)
2. For each UI element in the design, find the matching DS component
3. Read the component's `.tsx` file to confirm the prop API — never rely on memory
4. Import DS components from `@trio-wfs/ui`
5. If no DS component matches a component-level need: **STOP. Flag it.** Do not silently fall back to raw MUI.

---

## Forbidden imports

```tsx
import { Button, Chip, Tabs } from '@mui/material'   // WRONG — these are components, use @trio-wfs/ui
import { createTheme } from '@mui/material'          // WRONG — use trioTheme
```

Allowed:

```tsx
import { Button, Chip, Tabs, tokens, trioTheme } from '@trio-wfs/ui'
import { Box, Stack, Typography, Divider } from '@mui/material'   // OK — layout primitives only
import CloseIcon from '@mui/icons-material/Close'                 // OK — icons
```

---

## Token usage

Every color, spacing value, font size, and radius must come from `tokens`. This applies to **both** DS components AND raw MUI primitives.

```tsx
// WRONG — hardcoded values
sx={{ color: '#2196F3', padding: '16px', borderRadius: '4px' }}

// RIGHT — token-sourced
sx={{
  color: tokens.colors.primary.main,
  padding: tokens.spacing.md,
  borderRadius: tokens.borderRadius.default,
}}
```

Source of truth: [`/Trio-UI/design-tokens/tokens.ts`](./design-tokens/tokens.ts). If you don't see a token for the value you need, ask — don't improvise.

---

## Pattern-level decisions

For page layout, color usage, alerts, grids, forms, headers — see [`/Trio-UI/PAGE_ARCHITECTURE.md`](./PAGE_ARCHITECTURE.md). Pick a named pattern from that file. Do not improvise.

---

## If a component doesn't exist in the DS

Three options, in this order:

1. **Look harder.** Re-check `/Trio-UI/components/`. The component might be there under a different name.
2. **Compose existing pieces.** Box + tokens + a DS component can often solve it.
3. **Stop and flag.** If 1 and 2 don't fit, **do not** build a one-off raw MUI component. Tell the user what's missing. The path forward is one of:
   - Build the component in the DS (run `/build-component`)
   - Adjust the design to use existing components
   - Both

Every one-off raw MUI component is a future drift problem: it bypasses the theme, sometimes bypasses tokens, and creates parallel implementations of things the DS will eventually need anyway. Building it in the DS first costs more up front and saves more later.

---

## Enforcement (future)

This rule is currently honor-system. Two mechanical enforcement options for when the team grows:

- **ESLint rule** banning imports of MUI components in consumer projects (allowlist Box, Stack, Typography, Divider only).
- **CI check** scanning for forbidden component imports.

Add when usage justifies it. Not required while Jesse is the sole consumer.

---

## Related canonical docs

- [`/Trio-UI/CLAUDE.md`](./CLAUDE.md) — rules for building **inside** the DS
- [`/Trio-UI/PAGE_ARCHITECTURE.md`](./PAGE_ARCHITECTURE.md) — page patterns, layout, component defaults
- [`/Trio-UI/design-tokens/tokens.ts`](./design-tokens/tokens.ts) — every legal token value
- [`/Trio-UI/DIGITAL_JESSE.md`](./DIGITAL_JESSE.md) — brand voice, design philosophy
