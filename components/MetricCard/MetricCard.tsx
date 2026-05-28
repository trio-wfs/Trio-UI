/**
 * MetricCard Component
 *
 * SOURCE OF TRUTH: Figma component "Metric_Card" (node: 3787:29023)
 * Design System: AHTG / TRIO Desktop SaaS
 *
 * EXTRACTED VALUES (from Figma instances — NOT assumed):
 *
 * Card:
 *   width: flexible (min 170px, fills container), height: 150px (FIXED, never changes)
 *   background: #FFFFFF, border: 1px solid #E0E0E0, border-radius: 4px
 *   padding: 16px top / 16px right / 8px bottom / 16px left
 *   gap between label row and metrics: 8px
 *
 * Label Row (24px height):
 *   icon: 16x16px, color: #757575
 *   text: 14px / 500 / 24px line-height / #757575
 *   help_outline icon: 16x16px, #757575
 *
 * Metric Value Typography:
 *   1–2 columns or grouped-main:  34px / 500 / 41px line-height
 *   3 columns:                    24px / 500 / 28px line-height
 *   4-list or grouped-sub-value:  16px / 500 / 24px line-height
 *
 * Metric Sub-label Typography:    12px / 400 / 18px line-height / #757575
 * Caption (list style):           12px / 400 / 18px line-height / #757575
 * Secondary label chip:           11px / 500 / 16px line-height / #757575
 *
 * Progress Bar:
 *   height: 10px, background: #EEEEEE
 *   segments: proportional to metric values, colors match metric colors
 *
 * Icon Footer:
 *   equal-width slots, one 16x16 Material icon per metric, color: #757575
 *
 * Divider (between columns):
 *   1px solid #E0E0E0, height: 24px (vertically centered in 60px column)
 *
 * Color Rules:
 *   info (default): [0]=#37636B  [1]=#4B9AB0  [2]=#5BBFDE  [3]=#6FD3ED
 *   error:    500=#DB4537  700=#BB3430  900=#A0241E  (start 500, ascend)
 *   warning:  500=#EB8B0C  700=#E17109  900=#E65100
 *   success:  500=#4CAF50  700=#388E3C  900=#1B5E20
 */

import React from 'react';
import { Tooltip as MuiTooltip } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutlineOutlined';
import TrendingUpIcon from '@mui/icons-material/TrendingUpOutlined';
import TrendingDownIcon from '@mui/icons-material/TrendingDownOutlined';
import RemoveIcon from '@mui/icons-material/RemoveOutlined';
import WarningAmberIcon from '@mui/icons-material/WarningAmberOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircleOutlined';
import ErrorIcon from '@mui/icons-material/ErrorOutlineOutlined';
import ScheduleIcon from '@mui/icons-material/ScheduleOutlined';
// Filled variants — used by IconsFooter only. Filled glyphs read as "status
// badges" tinted in the metric's resolved color; the outlined variants above
// stay reserved for the label row's lighter category/help affordances.
import HelpFilledIcon from '@mui/icons-material/Help';
import TrendingUpFilledIcon from '@mui/icons-material/TrendingUp';
import TrendingDownFilledIcon from '@mui/icons-material/TrendingDown';
import RemoveFilledIcon from '@mui/icons-material/Remove';
import WarningFilledIcon from '@mui/icons-material/Warning';
import CheckCircleFilledIcon from '@mui/icons-material/CheckCircle';
import ErrorFilledIcon from '@mui/icons-material/Error';
import ScheduleFilledIcon from '@mui/icons-material/Schedule';
import {
  type MetricCardProps,
  type MetricItem,
  type SemanticColor,
  METRIC_CARD_COLORS,
  defaultMetricCardProps,
} from './MetricCard.types';
import { tokens } from '../../design-tokens/tokens';

// ─── Color Resolution ────────────────────────────────────────────────────────

/**
 * Tracks how many times each semantic color has been used,
 * so we can walk up the semantic tone scale per-metric.
 */
type SemanticUsageCounts = Record<SemanticColor, number>;

function resolveMetricColor(
  metric: MetricItem,
  positionInInfoScale: number,
  semanticCounts: SemanticUsageCounts
): string {
  const color = metric.color ?? 'info';

  if (color === 'info') {
    return METRIC_CARD_COLORS.info[Math.min(positionInInfoScale, 3)];
  }

  // Semantic colors: 500 → 700 → 900 (index 0, 1, 2)
  const semanticScale = METRIC_CARD_COLORS[color];
  const idx = Math.min(semanticCounts[color], semanticScale.length - 1);
  semanticCounts[color] += 1;
  return semanticScale[idx];
}

/**
 * Build resolved color for each metric, respecting per-metric overrides.
 */
function resolveColors(metrics: MetricItem[]): string[] {
  const semanticCounts: SemanticUsageCounts = {
    info: 0,
    error: 0,
    warning: 0,
    success: 0,
  };
  let infoPos = 0;

  return metrics.map((m) => {
    const color = m.color ?? 'info';
    const resolved = resolveMetricColor(m, infoPos, semanticCounts);
    if (color === 'info') infoPos += 1;
    return resolved;
  });
}

// ─── Icon Mapping ───────────────────────────────────────────────────────────

/** Maps Material icon string names to MUI icon components */
const ICON_MAP: Record<string, React.ComponentType<{ style?: React.CSSProperties; 'aria-hidden'?: boolean; 'aria-label'?: string }>> = {
  schedule: ScheduleIcon,
  help_outline: HelpOutlineIcon,
  trending_up: TrendingUpIcon,
  trending_down: TrendingDownIcon,
  remove: RemoveIcon,
  warning_amber: WarningAmberIcon,
  check_circle: CheckCircleIcon,
  error: ErrorIcon,
};

// Filled icon map — same keys as ICON_MAP, but filled glyph variants. Used by
// IconsFooter to render status badges that take the metric's resolved color.
const FILLED_ICON_MAP: Record<string, React.ComponentType<{ style?: React.CSSProperties; 'aria-hidden'?: boolean; 'aria-label'?: string }>> = {
  schedule: ScheduleFilledIcon,
  help_outline: HelpFilledIcon,
  trending_up: TrendingUpFilledIcon,
  trending_down: TrendingDownFilledIcon,
  remove: RemoveFilledIcon,
  warning_amber: WarningFilledIcon,
  check_circle: CheckCircleFilledIcon,
  error: ErrorFilledIcon,
};

function renderIcon(
  name: string,
  style: React.CSSProperties,
  ariaProps?: { 'aria-hidden'?: boolean; 'aria-label'?: string },
) {
  const IconComponent = ICON_MAP[name];
  if (IconComponent) {
    return <IconComponent style={style} {...ariaProps} />;
  }
  // Fallback for unmapped icons — use MUI SvgIcon convention
  return <ScheduleIcon style={style} {...ariaProps} />;
}

function renderFilledIcon(
  name: string,
  style: React.CSSProperties,
  ariaProps?: { 'aria-hidden'?: boolean; 'aria-label'?: string },
) {
  const IconComponent = FILLED_ICON_MAP[name];
  if (IconComponent) {
    return <IconComponent style={style} {...ariaProps} />;
  }
  return <ScheduleFilledIcon style={style} {...ariaProps} />;
}

// ─── Sub-components ──────────────────────────────────────────────────────────

interface LabelRowProps {
  label: string;
  labelIcon?: string;
  showHelpIcon?: boolean;
  helpContent?: React.ReactNode;
}

const LabelRow: React.FC<LabelRowProps> = ({ label, labelIcon, showHelpIcon, helpContent }) => {
  // Design system rule: the supporting labelIcon and the (?) help icon are
  // mutually exclusive — only one may appear in the label row to keep the
  // 24px-tall band scannable. When both are passed, the (?) wins because
  // it is functional (anchors a tooltip) while labelIcon is decorative.
  const renderHelpIcon = !!helpContent || showHelpIcon;
  const renderLabelIcon = !!labelIcon && !renderHelpIcon;

  if (process.env.NODE_ENV !== 'production' && labelIcon && renderHelpIcon) {
    console.warn(
      '[MetricCard] `labelIcon` and the help icon (`helpContent` / `showHelpIcon`) ' +
      'cannot be displayed together. The help icon wins; `labelIcon` is suppressed. ' +
      `Card label: "${label}"`,
    );
  }

  const icon = renderHelpIcon ? (
    <HelpOutlineIcon style={styles.labelIcon} aria-label="More information" />
  ) : null;

  return (
    <div style={styles.labelRow}>
      <div style={styles.labelLeft}>
        {renderLabelIcon && renderIcon(labelIcon!, styles.labelIcon, { 'aria-hidden': true })}
        <span style={styles.labelText}>{label}</span>
      </div>
      {helpContent ? (
        <MuiTooltip title={helpContent} arrow placement="top">
          {/* Span wrapper so SVG icon doesn't need to forward refs to Tooltip */}
          <span style={{ display: 'inline-flex', cursor: 'help' }}>{icon}</span>
        </MuiTooltip>
      ) : (
        icon
      )}
    </div>
  );
};

// Vertical divider between metric columns
const ColumnDivider: React.FC = () => (
  <div style={styles.dividerWrapper} aria-hidden="true">
    <div style={styles.divider} />
  </div>
);

// ─── Metric Value Area ───────────────────────────────────────────────────────

interface MetricColumnProps {
  metric: MetricItem;
  color: string;
  valueFontSize: number;
  valueLineHeight: number;
}

const MetricColumn: React.FC<MetricColumnProps> = ({
  metric,
  color,
  valueFontSize,
  valueLineHeight,
}) => {
  const inner = (
    <>
      <span
        style={{
          ...styles.metricValue,
          fontSize: valueFontSize,
          lineHeight: `${valueLineHeight}px`,
          color,
        }}
      >
        {metric.value}
      </span>
      <span style={styles.metricLabel} title={String(metric.label)}>
        {metric.label}
      </span>
    </>
  );

  if (metric.onClick) {
    return (
      <button
        type="button"
        onClick={metric.onClick}
        style={{ ...styles.metricColumn, ...styles.metricButton }}
      >
        {inner}
      </button>
    );
  }

  return <div style={styles.metricColumn}>{inner}</div>;
};

// Columnar layout: 1, 2, or 3 equal-width columns
interface ColumnarAreaProps {
  metrics: MetricItem[];
  colors: string[];
}

const ColumnarArea: React.FC<ColumnarAreaProps> = ({ metrics, colors }) => {
  // 3 columns: h5 typography (24/500/28). 1-2 columns: h4 typography (34/500/41).
  const valueFontSize = metrics.length === 3
    ? tokens.typography.h5.fontSize
    : tokens.typography.h4.fontSize;
  const valueLineHeight = metrics.length === 3
    ? tokens.typography.h5.lineHeight
    : tokens.typography.h4.lineHeight;

  return (
    <div style={styles.metricRow}>
      {metrics.map((metric, i) => (
        <React.Fragment key={i}>
          {i > 0 && <ColumnDivider />}
          <MetricColumn
            metric={metric}
            color={colors[i]}
            valueFontSize={valueFontSize}
            valueLineHeight={valueLineHeight}
          />
        </React.Fragment>
      ))}
    </div>
  );
};

// List layout: vertical rows of caption + value (4+ metrics)
interface ListAreaProps {
  metrics: MetricItem[];
  colors: string[];
}

const ListArea: React.FC<ListAreaProps> = ({ metrics, colors }) => (
  <div style={styles.listArea}>
    {metrics.map((metric, i) => {
      const inner = (
        <>
          <span style={styles.listCaption} title={String(metric.label)}>
            {metric.label}
          </span>
          <span style={{ ...styles.listValue, color: colors[i] }}>
            {metric.value}
          </span>
        </>
      );

      if (metric.onClick) {
        return (
          <button
            key={i}
            type="button"
            onClick={metric.onClick}
            style={{ ...styles.listRow, ...styles.metricButton, width: '100%' }}
          >
            {inner}
          </button>
        );
      }

      return (
        <div key={i} style={styles.listRow}>
          {inner}
        </div>
      );
    })}
  </div>
);

// Grouped layout: 1 large left + remaining stacked on right
interface GroupedAreaProps {
  metrics: MetricItem[];
  colors: string[];
}

const GroupedArea: React.FC<GroupedAreaProps> = ({ metrics, colors }) => {
  const [primary, ...secondary] = metrics;

  const primaryInner = (
    <>
      <span
        style={{
          ...styles.metricValue,
          fontSize: tokens.typography.h4.fontSize,
          lineHeight: `${tokens.typography.h4.lineHeight}px`,
          color: colors[0],
        }}
      >
        {primary.value}
      </span>
      <span style={styles.metricLabel} title={String(primary.label)}>
        {primary.label}
      </span>
    </>
  );

  return (
    <div style={styles.metricRow}>
      {/* Left: large primary metric — h4 typography */}
      {primary.onClick ? (
        <button
          type="button"
          onClick={primary.onClick}
          style={{ ...styles.groupedPrimaryColumn, ...styles.metricButton }}
        >
          {primaryInner}
        </button>
      ) : (
        <div style={styles.groupedPrimaryColumn}>{primaryInner}</div>
      )}

      <ColumnDivider />

      {/* Right: stacked secondary metrics */}
      <div style={styles.groupedSecondaryColumn}>
        {secondary.map((metric, i) => {
          const subInner = (
            <>
              <span style={styles.listCaption} title={String(metric.label)}>
                {metric.label}
              </span>
              <span style={{ ...styles.listValue, color: colors[i + 1] }}>
                {metric.value}
              </span>
            </>
          );

          if (metric.onClick) {
            return (
              <button
                key={i}
                type="button"
                onClick={metric.onClick}
                style={{ ...styles.groupedSubRow, ...styles.metricButton, width: '100%' }}
              >
                {subInner}
              </button>
            );
          }

          return (
            <div key={i} style={styles.groupedSubRow}>
              {subInner}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ─── Footer Variants ─────────────────────────────────────────────────────────

interface BarFooterProps {
  metrics: MetricItem[];
  colors: string[];
}

const BarFooter: React.FC<BarFooterProps> = ({ metrics, colors }) => {
  const total = metrics.reduce((sum, m) => {
    const n = typeof m.value === 'number' ? m.value : parseFloat(String(m.value)) || 0;
    return sum + n;
  }, 0);

  if (total === 0) {
    // No data — render empty bar
    return (
      <div style={styles.barFooter}>
        <div style={styles.progressTrack} role="progressbar" aria-valuenow={0} />
      </div>
    );
  }

  return (
    <div style={styles.barFooter}>
      <div style={styles.progressTrack} role="progressbar" aria-label="Metric distribution">
        {metrics.map((metric, i) => {
          const n = typeof metric.value === 'number'
            ? metric.value
            : parseFloat(String(metric.value)) || 0;
          const pct = (n / total) * 100;
          const isLast = i === metrics.length - 1;
          return (
            <div
              key={i}
              style={{
                height: '100%',
                width: `${pct}%`,
                backgroundColor: colors[i],
                flexShrink: 0,
                boxSizing: 'border-box',
                borderRight: isLast ? 'none' : `1px solid ${tokens.colors.background.paper}`,
              }}
              aria-label={`${metric.label}: ${metric.value}`}
            />
          );
        })}
      </div>
    </div>
  );
};

interface IconsFooterProps {
  metrics: MetricItem[];
  colors: string[];
}

// Filled icons tinted in each metric's resolved color — so the footer icon
// echoes the urgency tone of its metric value (error red, warning orange,
// success green, or the positional info teal when no semantic override is set).
const IconsFooter: React.FC<IconsFooterProps> = ({ metrics, colors }) => (
  <div style={styles.iconsFooter}>
    {metrics.map((metric, i) => (
      <div key={i} style={styles.iconSegment}>
        {renderFilledIcon(
          metric.icon ?? 'warning_amber',
          { ...styles.footerIcon, color: colors[i] },
          { 'aria-label': metric.label },
        )}
      </div>
    ))}
  </div>
);

interface LabelsFooterProps {
  metrics: MetricItem[];
}

const LabelsFooter: React.FC<LabelsFooterProps> = ({ metrics }) => (
  <div style={styles.labelsFooter}>
    {metrics.map((metric, i) => (
      <div key={i} style={styles.labelChip}>
        <span style={styles.labelChipText} title={metric.secondaryLabel ?? metric.label}>
          {metric.secondaryLabel ?? metric.label}
        </span>
      </div>
    ))}
  </div>
);

// ─── Main Component ──────────────────────────────────────────────────────────

export const MetricCard = React.forwardRef<HTMLDivElement, MetricCardProps>(({
  label,
  labelIcon = defaultMetricCardProps.labelIcon,
  showHelpIcon = defaultMetricCardProps.showHelpIcon,
  helpContent,
  metrics,
  layout = defaultMetricCardProps.layout,
  footer = defaultMetricCardProps.footer,
  excludePrimaryFromBar = false,
  className,
  style: customStyle,
  // Forward any DOM-level props injected by wrappers (e.g. MUI Tooltip
  // clones the element and adds onMouseEnter/Leave/Focus/Blur etc.).
  // Without this rest spread, MetricCard silently drops those handlers
  // and the wrapper's behavior breaks.
  ...rest
}, ref) => {
  const colors = resolveColors(metrics);
  const isListLayout = layout === 'auto' && metrics.length >= 4;
  const isGroupedLayout = layout === 'grouped';
  // Cursor-only affordance: when a consumer attaches onClick, show a pointer
  // so the card reads as tappable. Deliberately no hover/pressed/selected
  // visual states — the affordance is the cursor, full stop.
  const isClickable = typeof (rest as { onClick?: unknown }).onClick === 'function';

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...styles.card,
        ...(isClickable ? { cursor: 'pointer' } : null),
        ...customStyle,
      }}
      role="region"
      aria-label={label}
      {...rest}
    >
      {/* Label Row */}
      <LabelRow
        label={label}
        labelIcon={labelIcon}
        showHelpIcon={showHelpIcon}
        helpContent={helpContent}
      />

      {/* Metric Content */}
      <div style={styles.metricsContainer}>
        {isGroupedLayout ? (
          <GroupedArea metrics={metrics} colors={colors} />
        ) : isListLayout ? (
          <ListArea metrics={metrics} colors={colors} />
        ) : (
          <ColumnarArea metrics={metrics} colors={colors} />
        )}

        {/* Footer — not shown for list layout. When excludePrimaryFromBar
            is set, BarFooter sees only metrics[1..n] / colors[1..n] so the
            bar represents the breakdown beneath a "total" primary metric. */}
        {!isListLayout && footer === 'bar' && (
          <BarFooter
            metrics={excludePrimaryFromBar ? metrics.slice(1) : metrics}
            colors={excludePrimaryFromBar ? colors.slice(1) : colors}
          />
        )}
        {!isListLayout && footer === 'icons' && (
          <IconsFooter metrics={metrics} colors={colors} />
        )}
        {!isListLayout && footer === 'labels' && (
          <LabelsFooter metrics={metrics} />
        )}
      </div>
    </div>
  );
});

MetricCard.displayName = 'MetricCard';

// ─── Styles ───────────────────────────────────────────────────────────────────
// Every value sourced from tokens.ts. Figma-specific component sizes (card height,
// footer heights, progress bar height, divider width) remain as numeric literals
// because they don't map to the spacing scale — they are component design constants.

const styles = {
  // Card container — 1px border, default radius, Figma padding 16/16/8/16
  card: {
    display: 'flex',
    flexDirection: 'column' as const,
    width: '100%',
    minWidth: 170,                                       // Figma min width — component-specific
    minHeight: 150,                                      // Figma card height — component-specific
    backgroundColor: METRIC_CARD_COLORS.cardBg,
    border: `1px solid ${METRIC_CARD_COLORS.border}`,
    borderRadius: tokens.borderRadius.default,
    padding: `${tokens.spacing.md}px ${tokens.spacing.md}px ${tokens.spacing.sm}px ${tokens.spacing.md}px`,
    gap: tokens.spacing.sm,
    boxSizing: 'border-box' as const,
    overflow: 'hidden',
    fontFamily: tokens.typography.fontFamily,
  },

  // Label row — 24px (spacing.lg) height
  labelRow: {
    display: 'flex',
    flexDirection: 'row' as const,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexShrink: 0,
    height: tokens.spacing.lg,
  },

  labelLeft: {
    display: 'flex',
    flexDirection: 'row' as const,
    alignItems: 'center',
    gap: tokens.spacing.xs,
    minWidth: 0,
    overflow: 'hidden',
  },

  // 16x16 icon, text.secondary color
  labelIcon: {
    fontSize: tokens.typography.fontSize.md,
    color: METRIC_CARD_COLORS.labelText,
    flexShrink: 0,
  },

  // Label text — custom typography (14/500/24, no clean variant match)
  labelText: {
    fontSize: tokens.typography.fontSize.sm,
    fontWeight: tokens.typography.fontWeight.medium,
    lineHeight: `${tokens.spacing.lg}px`,                // 24
    color: METRIC_CARD_COLORS.labelText,
    whiteSpace: 'nowrap' as const,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },

  // Metrics container — fills remaining height below label row
  metricsContainer: {
    display: 'flex',
    flexDirection: 'column' as const,
    flex: 1,
    gap: tokens.spacing.sm,
    minHeight: 0,
  },

  // Metric row — horizontal flex
  metricRow: {
    display: 'flex',
    flexDirection: 'row' as const,
    alignItems: 'flex-start',
    flex: 1,
    minHeight: 0,
    gap: 0,
  },

  // Single metric column — equal width
  metricColumn: {
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
    minWidth: 0,
    gap: tokens.spacing.sm,
    overflow: 'hidden',
  },

  // Base shape; size/lineHeight set per-layout at call site (h4 / h5 / 16px-list)
  metricValue: {
    fontWeight: tokens.typography.fontWeight.medium,
    letterSpacing: 0,
    whiteSpace: 'nowrap' as const,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    textAlign: 'center' as const,
  } as React.CSSProperties,

  // Caption typography variant (12/400/18)
  metricLabel: {
    fontSize: tokens.typography.caption.fontSize,
    fontWeight: tokens.typography.caption.fontWeight,
    lineHeight: `${tokens.typography.caption.lineHeight}px`,
    color: METRIC_CARD_COLORS.labelText,
    whiteSpace: 'nowrap' as const,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    textAlign: 'center' as const,
  },

  // Divider — 1px wide, 24px tall, centered with 4px gutters
  dividerWrapper: {
    display: 'flex',
    alignItems: 'flex-start',
    paddingTop: tokens.spacing.sm,
    flexShrink: 0,
    width: 1,                                            // 1px — component-specific
    alignSelf: 'stretch',
    paddingLeft: tokens.spacing.xs,
    paddingRight: tokens.spacing.xs,
  },

  divider: {
    width: 1,                                            // 1px — component-specific
    height: tokens.spacing.lg,
    backgroundColor: METRIC_CARD_COLORS.border,
  },

  // List layout — vertical rows
  listArea: {
    display: 'flex',
    flexDirection: 'column' as const,
    flex: 1,
    gap: 0,
    justifyContent: 'space-between',
    minHeight: 0,
  },

  listRow: {
    display: 'flex',
    flexDirection: 'row' as const,
    alignItems: 'center',
    justifyContent: 'space-between',
    height: tokens.spacing.lg,
    overflow: 'hidden',
  },

  // Caption typography variant (12/400/18)
  listCaption: {
    fontSize: tokens.typography.caption.fontSize,
    fontWeight: tokens.typography.caption.fontWeight,
    lineHeight: `${tokens.typography.caption.lineHeight}px`,
    color: METRIC_CARD_COLORS.labelText,
    flex: 1,
    whiteSpace: 'nowrap' as const,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    paddingRight: tokens.spacing.xs,
  },

  // List value — custom typography (16/500/24)
  listValue: {
    fontSize: tokens.typography.fontSize.md,
    fontWeight: tokens.typography.fontWeight.medium,
    lineHeight: `${tokens.spacing.lg}px`,                // 24
    flexShrink: 0,
  } as React.CSSProperties,

  // Grouped layout — primary column (left)
  groupedPrimaryColumn: {
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
    minWidth: 0,
    gap: tokens.spacing.sm,
    overflow: 'hidden',
  },

  // Grouped layout — stacked column (right)
  groupedSecondaryColumn: {
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'space-around',
    flex: 1,
    minWidth: 0,
    gap: 0,
    overflow: 'hidden',
    paddingLeft: tokens.spacing.sm,
  },

  groupedSubRow: {
    display: 'flex',
    flexDirection: 'row' as const,
    alignItems: 'center',
    justifyContent: 'space-between',
    height: tokens.spacing.lg,
    overflow: 'hidden',
  },

  // ── Footer styles ──

  // Footer wrapper — 18px Figma footer height (component-specific, no spacing-token match)
  barFooter: {
    flexShrink: 0,
    height: 18,                                          // Figma footer height — component-specific
    display: 'flex',
    alignItems: 'center',
  },

  // Progress track — fully rounded pill
  progressTrack: {
    display: 'flex',
    flexDirection: 'row' as const,
    width: '100%',
    height: 10,                                          // Figma progress bar height — component-specific
    backgroundColor: METRIC_CARD_COLORS.progressBg,
    overflow: 'hidden',
    borderRadius: tokens.borderRadius.full,
  },

  // Icons footer — equal slots
  iconsFooter: {
    display: 'flex',
    flexDirection: 'row' as const,
    flexShrink: 0,
    height: 18,                                          // Figma footer height — component-specific
    alignItems: 'center',
  },

  iconSegment: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },

  footerIcon: {
    fontSize: tokens.typography.fontSize.md,
    color: METRIC_CARD_COLORS.labelText,
  },

  // Labels footer — proportional chips
  labelsFooter: {
    display: 'flex',
    flexDirection: 'row' as const,
    flexShrink: 0,
    height: 18,                                          // Figma footer height — component-specific
    alignItems: 'center',
    gap: tokens.spacing.xs,
    overflow: 'hidden',
  },

  labelChip: {
    flex: 1,
    backgroundColor: METRIC_CARD_COLORS.cardBg,
    overflow: 'hidden',
    minWidth: 0,
  },

  // Overline typography variant (11/500/16)
  labelChipText: {
    fontSize: tokens.typography.overline.fontSize,
    fontWeight: tokens.typography.overline.fontWeight,
    lineHeight: `${tokens.typography.overline.lineHeight}px`,
    color: METRIC_CARD_COLORS.labelText,
    whiteSpace: 'nowrap' as const,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: 'block',
    textAlign: 'center' as const,
  },

  // Reset applied to <button>-wrapped metric units so they don't inherit
  // browser default chrome (background, border, padding, font sizing).
  // Cursor flips to pointer to signal the value is tappable. No hover /
  // pressed / selected styling on purpose — affordance is cursor only.
  metricButton: {
    background: 'transparent',
    border: 'none',
    padding: 0,
    margin: 0,
    font: 'inherit',
    color: 'inherit',
    cursor: 'pointer',
    textAlign: 'inherit' as const,
  },
};

export default MetricCard;
