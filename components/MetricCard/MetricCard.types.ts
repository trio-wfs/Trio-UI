/**
 * MetricCard Component Types
 *
 * SOURCE OF TRUTH: Figma component "Metric_Card" (node: 3787:29023)
 *
 * These types are DIRECTLY MAPPED from Figma componentPropertyDefinitions.
 * DO NOT add properties that don't exist in Figma.
 * DO NOT modify variant options unless Figma is updated.
 *
 * Figma componentPropertyDefinitions:
 *   - state: VARIANT → '1' | '2' | '3' | '4' | 'grouped' | 'groupe'
 *     (derived from metrics.length and layout prop in the React API)
 *   - style: VARIANT → 'bar' | 'custom' | 'icon' | 'list'
 *     (mapped to footer prop in the React API)
 *   - Show help_outline: BOOLEAN → showHelpIcon
 *   - label: TEXT → label
 *   - icon: INSTANCE_SWAP → labelIcon (Material icon name)
 */

import { tokens } from '../../design-tokens/tokens';

/**
 * SemanticColor
 * Used for per-metric color overrides.
 * 'info' is the default primary data viz color (info/900 → info/700 → info/500 → info/300 by position).
 * Semantic colors start at 500 and progress 500 → 700 → 900 opposite to primary.
 */
export type SemanticColor = 'info' | 'error' | 'warning' | 'success';

/**
 * MetricItem
 * A single data point displayed in the card.
 */
export interface MetricItem {
  /** Sub-label displayed beneath the value (e.g. "Container 1") */
  label: string;

  /** Numeric or string value displayed prominently */
  value: string | number;

  /**
   * Per-metric semantic color override.
   * Defaults to 'info' which uses the positional info tone scale (900/700/500/300).
   * Semantic colors (error/warning/success) start at 500 and go 500 → 700 → 900.
   */
  color?: SemanticColor;

  /**
   * Material icon name for use in the 'icons' footer style.
   * Example: 'warning_amber', 'check_circle', 'error'
   */
  icon?: string;

  /**
   * Secondary label text for use in the 'labels' footer style.
   * Example: "Entries", "Timecards"
   */
  secondaryLabel?: string;
}

/**
 * MetricCardLayout
 * Controls how the metric value area is arranged.
 *
 * - 'auto': Equal-width columns for 1–3 metrics. Switches to vertical list for 4+ metrics.
 * - 'grouped': First metric is displayed large on the left; remaining metrics are stacked
 *              as smaller caption/value pairs on the right. (Figma: state=groupe)
 */
export type MetricCardLayout = 'auto' | 'grouped';

/**
 * MetricCardFooter
 * Controls what is shown in the bottom area of the card beneath the metric values.
 *
 * - 'bar':    Proportional segmented progress bar. Segment widths are proportional to
 *             metric values. Colors match metric colors.
 * - 'icons':  Equal-width slots, each showing a Material icon per metric.
 * - 'labels': Secondary caption text chips below each metric column.
 * - 'none':   No footer. Metric values fill the available space.
 *
 * Figma style variants: bar → 'bar', icon → 'icons', list → list layout (auto), custom → 'labels'
 */
export type MetricCardFooter = 'bar' | 'icons' | 'labels' | 'none';

/**
 * MetricCardProps
 *
 * Mapped from Figma componentPropertyDefinitions:
 * - VARIANT types → layout + footer props
 * - BOOLEAN types → showHelpIcon
 * - TEXT types → label
 * - INSTANCE_SWAP → labelIcon
 */
export interface MetricCardProps {
  /** Card header label text. Figma default: "Label " */
  label: string;

  /**
   * Material icon name shown to the left of the label.
   * Figma default: 'schedule'
   */
  labelIcon?: string;

  /**
   * Show the help_outline icon at the right of the label row.
   * Figma default: false
   */
  showHelpIcon?: boolean;

  /**
   * Array of 1–4 metric data items.
   * - 1 metric: single full-width column, large value (34px)
   * - 2 metrics: two equal columns, large value (34px)
   * - 3 metrics: three equal columns, medium value (24px)
   * - 4 metrics: forced vertical list layout, small value (16px)
   */
  metrics: MetricItem[];

  /**
   * Layout mode for the metric value area.
   * Defaults to 'auto'.
   */
  layout?: MetricCardLayout;

  /**
   * Footer display style.
   * Defaults to 'bar'.
   */
  footer?: MetricCardFooter;

  className?: string;
  style?: React.CSSProperties;
}

/**
 * Default props — match Figma defaults
 */
export const defaultMetricCardProps: Partial<MetricCardProps> = {
  labelIcon: 'schedule',
  showHelpIcon: false,
  layout: 'auto',
  footer: 'bar',
};

/**
 * EXTRACTED COLOR TOKENS (from charts.tokens.json + material.tokens.json)
 *
 * Primary data viz colors (info tone scale):
 *   Position 0 (1st metric): info/900 = #37636B
 *   Position 1 (2nd metric): info/700 = #4B9AB0
 *   Position 2 (3rd metric): info/500 = #5BBFDE
 *   Position 3 (4th metric): info/300 = #6FD3ED
 *
 * Semantic urgency colors (500 → 700 → 900):
 *   error:   500=#DB4537  700=#BB3430  900=#A0241E
 *   warning: 500=#EB8B0C  700=#E17109  900=#E65100
 *   success: 500=#4CAF50  700=#388E3C  900=#1B5E20
 *
 * Progress bar background: #EEEEEE (secondary/200)
 * Card border:             #E0E0E0 (secondary/300)
 * Card background:         #FFFFFF
 * Label / metric-label:    #757575 (secondary/600)
 */
export const METRIC_CARD_COLORS = {
  // Semantic chart colors — shared tokens from tokens.colors.charts
  info: tokens.colors.charts.info,
  error: tokens.colors.charts.error,
  warning: tokens.colors.charts.warning,
  success: tokens.colors.charts.success,
  progressBg: '#EEEEEE',
  border: tokens.colors.components.border.default,
  cardBg: tokens.colors.background.paper,
  labelText: tokens.colors.text.secondary,
} as const;
