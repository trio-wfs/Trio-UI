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

37 components live in the library, with 33 showcase pages in the design system website.

| Component | Use for |
|-----------|---------|
| `Alert` | Inline notifications — success, warning, error, info |
| `Autocomplete` | Text input with filtered suggestions |
| `Avatar` | Identity primitive — initials + token-driven color |
| `Badge` | Status count or indicator dot |
| `Breadcrumb` | Page hierarchy navigation |
| `Button` | Primary actions — contained, outlined, text variants |
| `ButtonGroup` | Clustered related actions |
| `ButtonIcon` | Icon-only button with optional badge |
| `Card` | Composed surface — header / body / footer slots on Paper |
| `Chart` | Data visualization wrapper (AG Charts) with TRIO theme |
| `Checkbox` | Binary selection with label |
| `Chip` | Removable filter tag or status label |
| `ContentContainer` | Inner page wrapper for grouped content |
| `DatePicker` | Date / date-time input with calendar popup (MUI X) |
| `Footer` | Sticky page footer with copyright and links |
| `Handle` | Drag handle indicator for sortable rows |
| `Menu` | Dropdown context menu |
| `MetricCard` | KPI / data summary card with multiple metric layouts |
| `Modal` | Dialog overlay — 900px large, 500px small |
| `NavigationHeader` | Top brand bar + nav row |
| `NavigationVertical` | Left sidebar nav with sub-items |
| `NumberField` | Numeric input with step controls |
| `PageHeaderToolbar` | Page-level action bar |
| `Paper` | Foundation surface primitive — 5 level tiers, no shadow |
| `PopOver` | Floating panel anchored to a trigger |
| `ProductLogos` | TRIO product brand logos |
| `RadioGroup` | Mutually exclusive option set |
| `SearchBar` | Search input with type and size variants |
| `Select` | Dropdown select with options array |
| `Slider` | Numeric range selection |
| `SplitButton` | Button with dropdown action menu |
| `Stepper` | Multi-step flow progress indicator |
| `Switch` | Toggle with label placement options |
| `Tabs` | Tab navigation |
| `TextField` | Text input — single-line and multi-line |
| `ToggleButton` | Multi-state button group |
| `Tooltip` | Hover help text with position variants |

---

## Design Rules

All design rules — colors, spacing, typography, layout, component composition — live in canonical sources. This README does not restate them, to avoid drift.

| Looking for | Canonical source |
|-------------|------------------|
| Token values (colors, spacing, radius, typography) | `design-tokens/tokens.ts` |
| Page layer order, color usage, component defaults, layout patterns | `PAGE_ARCHITECTURE.md` |
| Brand voice, design philosophy, user persona | `DIGITAL_JESSE.md` |
| How to build a new component (process + structure) | `COMPONENT_TEMPLATE.md` |
| Per-component theme migration status | `COMPONENT_COVERAGE.md` |

Components are built to enforce these rules — do not override.

---

## Design System Website

Every component has a showcase page with variants, states, do/don't examples, and Figma-extracted specs.

```bash
python3 -m http.server 8080
```

Open http://localhost:8080 — navigate from the sidebar.

---

## Adding a New Component

1. Find the component's Figma node ID via MCP — `mcp__figma__get_metadata` with `fileKey: PjAYuPDr8IA1ccwiAjFkSD` to list the design system file's components, or use a known nodeId directly
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
