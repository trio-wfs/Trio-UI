/**
 * TRIO WFS — AG Charts Theme
 *
 * Maps TRIO design tokens to AG Charts' theming API.
 * Import `trioAgChartsTheme` and pass it as the `theme` option on any chart.
 * The `Chart` wrapper component applies this automatically.
 *
 * Palette: 10-color extended data viz palette (approved April 2026)
 * Typography: Roboto — matches MUI and the rest of the TRIO design system
 * Icons: Material-style SVGs injected via overrides (see MATERIAL_ICON_SVG below)
 */

import { tokens } from './tokens';

// ─── Extended Data Viz Palette ────────────────────────────────────────────────
// 10 colours approved for TRIO WFS data visualisation.
// Order matters — colour 1 is the first series, 2 is second, etc.

const PALETTE_FILLS = [
  '#005F8A', // 1 — Deep teal-blue
  '#5677C1', // 2 — Medium blue-violet
  '#7462AE', // 3 — Purple
  '#A95CAB', // 4 — Orchid
  '#D65498', // 5 — Magenta-pink
  '#F65479', // 6 — Hot pink
  '#FF6552', // 7 — Coral red
  '#FF8321', // 8 — Orange
  '#2491B3', // 9 — Sky blue
  '#17C76F', // 10 — Emerald green
];

// Strokes: darkened versions of fills for bar/area outlines
const PALETTE_STROKES = [
  '#004A6E', // 1
  '#3D5DA8', // 2
  '#5B4A96', // 3
  '#8D4490', // 4
  '#B93A7D', // 5
  '#D93A5F', // 6
  '#E04A38', // 7
  '#E06B00', // 8
  '#1A7594', // 9
  '#0FAA59', // 10
];

// ─── Material Icons SVG Helpers ───────────────────────────────────────────────
// AG Charts allows toolbar/menu icon overrides via SVG strings.
// These match the Material Icons v4 paths used throughout TRIO WFS.
// Usage: pass via `overrides.common.toolbar` (enterprise) or `params.icons` (community).

function materialSvg(path: string): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="${path}"/></svg>`;
}

export const MATERIAL_ICON_SVG = {
  download: materialSvg('M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z'),
  zoomIn:   materialSvg('M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14zm.5-7H9v2H7v1h2v2h1v-2h2V9h-2z'),
  zoomOut:  materialSvg('M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14zM7 9h5v1H7z'),
  refresh:  materialSvg('M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z'),
  pan:      materialSvg('M13 6v5h5V6h-5zm-2 0H6v5h5V6zm2 12h5v-5h-5v5zm-2 0v-5H6v5h5z'),
  settings: materialSvg('M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z'),
};

// ─── Theme Object ─────────────────────────────────────────────────────────────

export const trioAgChartsTheme = {
  baseTheme: 'ag-default',

  palette: {
    fills:   PALETTE_FILLS,
    strokes: PALETTE_STROKES,
  },

  params: {
    // Surfaces
    backgroundColor: tokens.colors.background.paper,       // #FFFFFF
    foregroundColor: tokens.colors.text.primary,           // #212121

    // Brand accent (used for hover highlights, focus rings in chart UI)
    accentColor: tokens.colors.primary.main,               // #2196F3

    // Typography — Roboto throughout, matching MUI
    fontFamily: tokens.typography.fontFamily,              // 'Roboto, sans-serif'
    fontSize:   tokens.typography.fontSize.sm,             // 14

    // Tooltip
    tooltipBackgroundColor: tokens.colors.background.paper,
    tooltipTextColor:       tokens.colors.text.primary,
    tooltipBorderColor:     tokens.colors.components.border.default,

    // Axes & grid
    axisGridLineColor: tokens.colors.components.border.default, // #E0E0E0
    axisLineColor:     tokens.colors.components.border.default,
    axisLabelColor:    tokens.colors.text.secondary,            // rgba(0,0,0,0.6)
  },

  overrides: {
    common: {
      // Chart titles
      title: {
        fontFamily: tokens.typography.fontFamily,
        fontSize:   tokens.typography.fontSize.md,           // 16
        fontWeight: `${tokens.typography.fontWeight.medium}`,
        color:      tokens.colors.text.primary,
      },
      subtitle: {
        fontFamily: tokens.typography.fontFamily,
        fontSize:   tokens.typography.fontSize.sm,           // 14
        color:      tokens.colors.text.secondary,
      },

      // Legend — small filled circle marker, no line
      legend: {
        item: {
          marker: {
            shape: 'circle',
            size: 8,
            strokeWidth: 0,
          },
          line: {
            length: 0,
            strokeWidth: 0,
          },
          label: {
            fontFamily: tokens.typography.fontFamily,
            fontSize:   tokens.typography.fontSize.xs,       // 12
            color:      tokens.colors.text.secondary,
          },
        },
      },

      // Area series — gradient fill: opaque at the line, fades to transparent at the axis.
      // fill.type = 'gradient' with rotation 90 = top-to-bottom.
      // colorStops without explicit colors inherit the series palette color automatically.
      area: {
        series: {
          fill: {
            type: 'gradient',
            colorStops: [{ stop: 0 }, { stop: 1 }],
            rotation: 180,
          },
          fillOpacity: 0.6,
        },
      },

      // Bar series — 4px radius (shape.borderRadius token)
      // Applied globally so all bar charts get it without per-chart config
      bar: {
        series: {
          cornerRadius: tokens.borderRadius.default, // 4
        },
      },

      // Axes — category (string) and number
      axes: {
        category: {
          label: {
            fontFamily: tokens.typography.fontFamily,
            fontSize:   tokens.typography.fontSize.xs,
            color:      tokens.colors.text.secondary,
          },
          line:     { stroke: tokens.colors.components.border.default },
          gridLine: { stroke: tokens.colors.components.border.default },
        },
        number: {
          label: {
            fontFamily: tokens.typography.fontFamily,
            fontSize:   tokens.typography.fontSize.xs,
            color:      tokens.colors.text.secondary,
          },
          line:     { stroke: tokens.colors.components.border.default },
          gridLine: { stroke: tokens.colors.components.border.default },
        },
        time: {
          label: {
            fontFamily: tokens.typography.fontFamily,
            fontSize:   tokens.typography.fontSize.xs,
            color:      tokens.colors.text.secondary,
          },
          line:     { stroke: tokens.colors.components.border.default },
          gridLine: { stroke: tokens.colors.components.border.default },
        },
      },
    },
  },
} as const;

// ─── Exports ──────────────────────────────────────────────────────────────────

/** The ordered fills array — use when building custom series options outside <Chart /> */
export const trioChartPalette = {
  fills:   PALETTE_FILLS,
  strokes: PALETTE_STROKES,
};

export type TrioAgChartsTheme = typeof trioAgChartsTheme;
