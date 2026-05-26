/**
 * TRIO WFS — AG Grid Theme
 *
 * Canonical AG Grid theme built from TRIO design tokens and the §10 Grid Page
 * Patterns spec in PAGE_ARCHITECTURE.md. Import `trioAgGridTheme` and pass it
 * as the `theme` option on any `<AgGridReact>` — every TRIO grid renders with:
 *
 *   - Paper background (#FFFFFF) — header bg, body bg
 *   - 40px column headers, 42px data rows (PA §10)
 *   - Zebra stripes via `background.secondary` (#FAFAFA) on odd rows
 *   - No wrapper border — the surrounding PHT / ContentContainer owns the border
 *   - Roboto type, body2-medium headers, body2 cells
 *   - Vertical column dividers via the `TRIO_AG_GRID_CSS` override string below
 *     (themeQuartz can't express per-cell border-right; that's CSS-only)
 *   - Sort indicators in `components.icon.default` (#424242) — *never* primary
 *     blue (PA §5: primary blue is reserved for Save/Update actions)
 *
 * Usage:
 *   import { trioAgGridTheme, TRIO_AG_GRID_CSS } from '@trio-wfs/ui';
 *   // Once per app (any global stylesheet):
 *   // <style>{TRIO_AG_GRID_CSS}</style>
 *
 *   <AgGridReact theme={trioAgGridTheme} ... />
 *
 * Why the CSS string?  themeQuartz handles ~90% of the spec via params. The
 * remaining bits (vertical column dividers, sort-icon color override) need
 * actual CSS selectors. Shipping them here means every consumer gets the
 * canonical look without hand-rolling.
 */

import { themeQuartz } from 'ag-grid-community';
import { tokens } from './tokens';

// ─── Theme params ─────────────────────────────────────────────────────────────
// Every value sourced from `tokens.ts` or PAGE_ARCHITECTURE.md §10.

export const trioAgGridTheme = themeQuartz.withParams({
  // Typography — Roboto, body2 sizing matches the rest of TRIO
  fontFamily: tokens.typography.fontFamily,
  fontSize: tokens.typography.fontSize.sm,                          // 14
  headerFontSize: tokens.typography.fontSize.sm,                    // 14
  headerFontWeight: tokens.typography.fontWeight.medium,            // 500

  // Surfaces — paper everywhere; PA §10 explicitly says "not #F5F5F5"
  backgroundColor: tokens.colors.background.paper,                  // #FFFFFF
  foregroundColor: tokens.colors.text.primary,                      // #212121
  headerBackgroundColor: tokens.colors.background.paper,            // #FFFFFF
  headerTextColor: tokens.colors.text.primary,                      // #212121

  // Borders — TRIO default border color, no wrapper (consumer container owns it)
  borderColor: tokens.colors.components.border.default,             // #E0E0E0
  rowBorder: true,
  headerColumnResizeHandleColor: tokens.colors.components.border.default,
  wrapperBorder: false,
  wrapperBorderRadius: 0,
  borderRadius: 0,

  // Selection / focus accent — matches Save/Update primary blue
  accentColor: tokens.colors.primary.main,                          // #2196F3

  // Zebra stripes — secondary background tier
  oddRowBackgroundColor: tokens.colors.background.secondary,        // #FAFAFA

  // Heights — PA §10: column headers 40px, data rows 42px.
  // Floating filter height (38px) is set via CSS below — themeQuartz in v35
  // doesn't expose it as a param.
  headerHeight: 40,
  rowHeight: 42,
});

// ─── CSS overrides ────────────────────────────────────────────────────────────
// themeQuartz can't express two pieces of the spec via params, so they live
// here as a CSS string. Inject once per app:
//
//   <style>{TRIO_AG_GRID_CSS}</style>
//
// or import into your global stylesheet pipeline.

export const TRIO_AG_GRID_CSS = `
/* ============================================================
   TRIO AG Grid — CSS overrides not expressible via themeQuartz params
   Sourced from PAGE_ARCHITECTURE.md §10 Grid Page Patterns
   ============================================================ */

/* Vertical column dividers — every header, filter, and body cell gets a
   right border in the standard #E0E0E0. The last cell in each row drops
   its right border so the outer frame stays clean. */
.ag-header-cell,
.ag-header-group-cell,
.ag-cell {
  border-right: 1px solid ${tokens.colors.components.border.default};
}
.ag-header-cell:last-of-type,
.ag-header-group-cell:last-of-type,
.ag-cell:last-of-type {
  border-right: none;
}

/* Sort indicator color — PA §10: components.icon.default (#424242), NEVER
   primary blue. Primary blue is reserved for Save/Update actions (PA §5). */
.ag-header-cell-sorted-asc .ag-sort-ascending-icon,
.ag-header-cell-sorted-desc .ag-sort-descending-icon {
  color: ${tokens.colors.components.icon.default} !important;
}
.ag-sort-indicator-icon {
  color: ${tokens.colors.text.disabled};
}

/* Filter row — paper background (matches header for one continuous band) and
   38px height per PA §10. themeQuartz v35 doesn't expose floatingFilterHeight
   as a param, so we set it here. */
.ag-floating-filter {
  background-color: ${tokens.colors.background.paper};
  height: 38px;
}
`;

export type TrioAgGridTheme = typeof trioAgGridTheme;
