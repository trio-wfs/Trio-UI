# Component Coverage

Tracks how each design system component sources its styles after the theme migration (started 2026-04-15).

## Status legend

| Status | Meaning |
|--------|---------|
| **Pure MUI** | Uses MUI defaults as-is. Theme palette/typography/shape is enough. No component-specific overrides needed. |
| **Theme override** | Static styles live in `design-tokens/theme.ts` under `components.MuiX.styleOverrides`. Component file contains only dynamic prop-dependent logic (or nothing at all). |
| **Dynamic sx** | Component still uses in-file `sx` for styles that could move to the theme but haven't been migrated yet. Target for future migration. |
| **Missing Figma spec** | Component exists in code but the Figma source is stale, incomplete, or missing. Needs an MCP re-pull before migration. |

## 27 live components

| Component | Status | Notes |
|-----------|--------|-------|
| **Alert** | **Theme override** | Migrated 2026-04-15. Root chrome + 12 variant × severity color combos in theme via MUI v9 `variants` API (MUI's native `standardInfo`/etc. class overrides were removed in v9). AlertTitle typography in MuiAlertTitle theme. Description is now `<Typography variant="caption">` — no inline styles. |
| **Autocomplete** | **Theme override** | Migrated 2026-04-15. Input chrome inherits from MuiTextField theme (Autocomplete internally renders a MuiTextField). Popup/paper/option styling in MuiAutocomplete theme. Kept in-component: chip-inside-input styling (24px pill) and flexWrap:nowrap for single-line layout. Upgraded deprecated `InputLabelProps`/`InputProps` → `slotProps` for MUI v9. |
| Avatar | Custom (token-based) | Added 2026-05-20. Hand-built circle with token-driven background (8 colors) and font (Roboto Medium 11/14). Non-interactive — no MUI Avatar theme applies. Composes `@mui/material/Box`. |
| **Badge** | **Theme override** | Migrated 2026-04-15. All sizing/typography in theme. Custom colorMap eliminated — MUI's native `color` prop uses our palette automatically. Component is now ~15 lines. |
| **Breadcrumb** | **Theme override** | Migrated 2026-04-15. All inline `<Typography sx>` replaced with `variant="caption"` / `variant="body1"` — Figma specs match theme variants exactly. |
| **Button** | **Theme override** | Migrated 2026-04-15. Static base + size overrides in theme. Color × variant logic (6 × 3 = 18 combos) stays in `Button.tsx` as dynamic sx — moving it to the theme would spread logic without shortening it. |
| **ButtonGroup** | **Theme override** | Migrated 2026-04-15. Size-specific button heights (sm=32, md=38) in MuiButtonGroup theme variants. Removed redundant borderRadius sharing overrides — MUI handles adjacent border-radius natively. |
| **ButtonIcon** | **Dynamic sx (minor cleanup)** | 2026-04-15: Redundant Badge sx removed (now inherited from MuiBadge theme). Color × variant × size matrix stays in component — our sizes (24/36px) intentionally differ from MUI IconButton defaults (34/40px) so we can't globally override. |
| Card | Custom (composes Paper) | Added 2026-05-20. Composes Paper with header/body/footer slots and consistent spacing. No Figma variant axes — slot presence drives behavior via React props. |
| **Checkbox** | **Theme override** | Migrated 2026-04-15. Hitbox/icon size in MuiCheckbox theme; label typography in shared MuiFormControlLabel. MUI's native `color` prop handles checked/disabled state — redundant `.Mui-checked` overrides removed. |
| **Chip** | **Theme override** | Migrated 2026-04-15. Pill/padding/typography/hover overlay/label/icon sizing in theme. MUI's native `size` prop (medium=32px, small=24px) matches Figma exactly. Color × variant × disabled matrix stays in component because our variant naming ("contained"/"outline") and default color mapping diverge from MUI defaults. |
| Chart | Custom (AG Charts) | Wrapper around AG Charts with `trioAgChartsTheme` applied automatically from `design-tokens/agChartsTheme.ts`. Not an MUI component — theme doesn't apply. Stories added 2026-04-15. Figma component still needed before Code Connect can publish. |
| **Menu** | **Theme override** | Migrated 2026-04-15. MuiMenu.paper (min-width 254px, shadow, radius), MuiMenu.list padding, MuiMenuItem (37px height, hover/selected/disabled states), and MuiListSubheader all in theme. Migrated deprecated `PaperProps`/`MenuListProps` → MUI v9 `slotProps` API (fixed a pre-existing TS error). Because Select uses our custom `<Menu>` component, Select's dropdown inherits all these updates automatically. |
| MetricCard | Custom | Hand-built with raw `<div>` + inline `style` objects (not MUI). All styling is a static `styles` object in the file. No MUI theme applies. Intentional — MetricCard's grid/list/grouped layouts aren't MUI primitives. |
| **Modal** | **Theme override (composite)** | Simplified 2026-04-15. Hand-styled `Box component="button"` footer buttons replaced with real `<Button>` components (cancel=text/primary, confirm=contained/primary-or-error) — inherit the full Button theme. Title/eyebrow Typography now use `variant="h6"` and `variant="body2"`. Header/body/footer layout structure stays inline because it's Modal-specific (primary-blue header bar, fixed padding). |
| NavigationVertical | Custom | Intentionally not migrated. Nav has TWO distinct item patterns (primary items with icon+selected-bg vs. settings items with left-border indicator) that can't both be MUI's default. The dynamic sx here is fundamentally nav-state logic, not duplicated tokens. Stories added 2026-04-15. |
| **PageHeaderToolbar** | **Theme override (composite)** | Simplified 2026-04-15. All inline Typography sx replaced with `variant="h6"` / `variant="body2"` / `variant="caption"` — Figma specs happen to match theme variants exactly. Layout Box structure kept inline (header-specific). |
| Paper | Custom (token-based) | Added 2026-05-20. Foundation surface primitive — 5 level tiers (default/secondary/subtle/paper/accent) via tokens, border-only, no shadow at rest. Composes `@mui/material/Box`. Base for Card. |
| **RadioGroup** | **Theme override** | Migrated 2026-04-15. Radio sizing in MuiRadio theme; legend via shared MuiFormLabel; option labels via shared MuiFormControlLabel. |
| **SearchBar** | **Theme override** | Migrated 2026-04-15. Dropped the `fieldset` borderColor overrides (enabled/hover/focused/disabled) — all inherited from MuiTextField theme now. Migrated deprecated `InputProps` → MUI v9 `slotProps.input`. Kept: dynamic size→height/fontSize, corner-radius carve-outs when joined with support buttons, and the extra focus box-shadow ring (SearchBar-specific). |
| **Select** | **Theme override** | Migrated 2026-04-15. InputLabel/FormHelperText typography inherited from theme. Trigger `<div>` stays inline-styled (custom non-MUI element, drives visual state from the `state` prop). |
| SplitButton | Custom | Hand-built joined label+arrow visual that doesn't fit MUI Button. The divider, shared border, and dropdown anchoring are SplitButton-specific. Stories added 2026-04-15. |
| **Switch** | **Theme override** | Migrated 2026-04-15. Track/thumb/checked state in MuiSwitch theme. Fixed a pre-existing TS bug (`disabled === 'yes'` comparison on a boolean prop). Figma `disabled` variant still needs to become a Boolean property (manual in Figma). |
| **Tabs** | **Theme override** | Migrated 2026-04-15. MuiTabs root (incl. border-bottom + paper bg that used to require a Box wrapper), indicator (top 0 / 2px primary), and MuiTab styling in theme. |
| **TextField** | **Theme override** | Migrated 2026-04-15. Static chrome, input/label/helper typography, and disabled/error states live in theme. Dynamic sx retained for `state="focus"` (forces focused appearance without real focus) and `inputFill` prop (alternate background). Also upgraded deprecated `InputLabelProps`/`InputProps` → `slotProps` for MUI v9. |
| ToggleButton | Custom | Hand-built IconButton strip with shared blue border + dividers. Visual pattern is ToggleButton-specific — not reusable via global MuiIconButton theme (would clobber Modal close, Alert close, etc.). Stories added 2026-04-15. |
| **Tooltip** | **Theme override** | Migrated 2026-04-15. Deleted the `styled()` factory entirely. All tooltip/arrow styling in theme; `arrow: true` is a defaultProp (TRIO tooltips always show arrow). Component is now ~20 lines. |

## Migration order (suggested)

Work through highest-use / most-duplicated first:

1. ~~Button~~ ✅
2. ~~TextField~~ ✅
3. ~~Checkbox / RadioGroup / Switch~~ ✅
4. ~~Select / Autocomplete~~ ✅
5. ~~Chip / Badge~~ ✅
6. ~~Alert / Tooltip~~ ✅
7. ~~Tabs / Menu~~ ✅
8. ~~Modal / PageHeaderToolbar / NavigationVertical~~ ✅ (NavigationVertical intentionally custom)
9. ~~ButtonGroup / ButtonIcon / SplitButton / ToggleButton / SearchBar / MetricCard / Breadcrumb~~ ✅
10. ~~Chart~~ ✅ (custom AG Charts wrapper — no MUI theme applies)

**Migration complete for all 24 originally-tracked components.** Avatar, Card, and Paper were added 2026-05-20 as token-based primitives (Custom status — no MUI theme override applies).
