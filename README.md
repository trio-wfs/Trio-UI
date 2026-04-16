# TRIO WFS Design System

Shared component library and design token reference for all TRIO WFS products.
Built on React + MUI v5, visually aligned with the AHTG Figma design system.

**Figma source of truth:** `PjAYuPDr8IA1ccwiAjFkSD`
**Design system website:** `python3 -m http.server 8080` from this directory → http://localhost:8080

---

## Installing in a project

**Step 1** — Add the design system as a local dependency in your project's `package.json`:

```json
"dependencies": {
  "@trio-wfs/ui": "file:../ahtg-design-system"
}
```

> The path `../ahtg-design-system` assumes both repos sit in the same parent folder. Adjust if yours are elsewhere.

**Step 2** — Install peer dependencies (React + MUI — skip any you already have):

```bash
npm install @mui/material @mui/icons-material @emotion/react @emotion/styled react react-dom
```

**Step 3** — Run `npm install` in your project. Done.

MUI v5 + Emotion is the required stack. MUI X DataGrid is **not used** — all tables use AG Grid.

---

## Using Components

Import from the package name — same as any npm package:

```tsx
import { Button, TextField, Select, MetricCard, tokens } from '@trio-wfs/ui'
```

---

## Wiring the MUI Theme

Components use design tokens internally, but you should also apply the token palette to your MUI theme so base MUI components (Typography, etc.) stay consistent:

```tsx
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { tokens } from './path/to/ahtg-design-system/design-tokens/tokens'

const theme = createTheme({
  palette: {
    primary: { main: tokens.colors.primary.main },
    error:   { main: tokens.colors.error.main },
    success: { main: tokens.colors.success.main },
    warning: { main: tokens.colors.warning.main },
  },
  typography: {
    fontFamily: tokens.typography.fontFamily,
  },
  shape: {
    borderRadius: tokens.borderRadius.default,
  },
})

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      {/* your app */}
    </ThemeProvider>
  )
}
```

---

## Data Injection

Components are **presentational** — they display what you pass in. You own the data fetching, state management, and API calls. Components do not fetch anything themselves.

### Controlled inputs (TextField, Select, Autocomplete, SearchBar)

Pass `value` and `onChange` just like a standard MUI input:

```tsx
const [name, setName] = useState('')

<TextField
  labelText="Worker Name"
  value={name}
  onChange={(e) => setName(e.target.value)}
/>
```

### Select with API data

Map your API response to `{ value, label }` pairs:

```tsx
const [agencies, setAgencies] = useState([])
const [selected, setSelected] = useState('')

// After your API call:
// setAgencies(response.data)

const options = agencies.map(a => ({ value: a.id, label: a.name }))

<Select
  label="Agency"
  options={options}
  value={selected}
  onChange={(e) => setSelected(e.target.value)}
/>
```

### MetricCard with live data

Shape your API data into the `metrics` array:

```tsx
// API response: { filled: 42, pending: 18, open: 7 }

<MetricCard
  label="Shift Status"
  metrics={[
    { value: shiftsData.filled,  label: 'Filled',  color: 'success' },
    { value: shiftsData.pending, label: 'Pending', color: 'warning' },
    { value: shiftsData.open,    label: 'Open',    color: 'error'   },
  ]}
  footer="bar"
/>
```

### Checkbox, Switch, RadioGroup

Same pattern — pass `checked`/`value` and an `onChange` handler:

```tsx
<Switch
  checked={worker.active}
  onChange={(e) => updateWorker({ active: e.target.checked })}
  label="Active"
/>
```

TypeScript interfaces for every component are in `Component.types.ts` alongside each component file. These show exactly what shape the data needs to be.

---

## Component Reference

All 23 components have a live showcase page in the design system website.

| Component | Use for |
|-----------|---------|
| `Alert` | Inline notifications — success, warning, error, info |
| `Autocomplete` | Text input with filtered suggestions |
| `Badge` | Status count or indicator dot |
| `Breadcrumb` | Page hierarchy navigation |
| `Button` | Primary actions — contained, outlined, text variants |
| `ButtonGroup` | Clustered related actions |
| `ButtonIcon` | Icon-only button with optional badge |
| `Checkbox` | Binary selection with label |
| `Chip` | Removable filter tag or status label |
| `Menu` | Dropdown context menu |
| `MetricCard` | KPI / data summary card with multiple metric layouts |
| `Modal` | Dialog overlay — 900px large, 500px small |
| `NavigationVertical` | Left sidebar nav with sub-items |
| `PageHeaderToolbar` | Page-level action bar |
| `RadioGroup` | Mutually exclusive option set |
| `SearchBar` | Search input with type and size variants |
| `Select` | Dropdown select with options array |
| `SplitButton` | Button with dropdown action menu |
| `Switch` | Toggle with label placement options |
| `Tabs` | Tab navigation |
| `TextField` | Text input — single-line and multi-line |
| `ToggleButton` | Multi-state button group |
| `Tooltip` | Hover help text with position variants |

---

## Design Rules

These rules are non-negotiable. Components are built to enforce them — do not override.

**Spacing** — 8px grid: `4 / 8 / 12 / 16 / 24 / 32 / 40px` only. No arbitrary values.

**Colors**

| Role | Value |
|------|-------|
| Primary action (Save/Update) | `#2196F3` |
| Page background | `#F5F5F5` |
| Surface / card | `#FFFFFF` |
| Text primary | `#212121` |
| Text secondary | `#757575` |
| Border | `#E0E0E0` |
| Success | `#388e3c` |
| Warning | `#E17109` |
| Error | `#DB4537` |

**Typography** — Roboto only. Maximum heading size: H5 (24px / 500 weight).

**Border radius** — `4px` standard, `999px` pill. No other values.

**Layout** — Desktop-first. 12-column grid, 16px gutters. Modals: 900px / 500px. Drawers: 400px.

Full token reference: `design-tokens/tokens.ts`

For page-level composition rules (layer order, elevation, header variants, color hierarchy): `PAGE_ARCHITECTURE.md`

---

## Design System Website

Every component has a showcase page with variants, states, do/don't examples, and Figma-extracted specs.

```bash
python3 -m http.server 8080
```

Open http://localhost:8080 — navigate from the sidebar.

---

## Adding a New Component

1. Check `figma-component-manifest.json` for the component's Figma node ID
2. Pull specs via Figma MCP: `get_design_context` with the node ID
3. Create `components/ComponentName/` with:
   - `ComponentName.tsx` — React/MUI implementation
   - `ComponentName.types.ts` — TypeScript interfaces
   - `component-name-showcase.html` — design system website page
   - `ComponentName.figma.tsx` — Code Connect mapping
4. Export from `components/index.ts`
5. Add to `design-system-nav.js`
6. Publish Code Connect: `npm run figma:publish`

See `COMPONENT_TEMPLATE.md` for the full showcase page structure and canonical section order.
