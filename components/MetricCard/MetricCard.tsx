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
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import RemoveIcon from '@mui/icons-material/Remove';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import ScheduleIcon from '@mui/icons-material/Schedule';
import {
  MetricCardProps,
  MetricItem,
  SemanticColor,
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

// ─── Sub-components ──────────────────────────────────────────────────────────

interface LabelRowProps {
  label: string;
  labelIcon?: string;
  showHelpIcon?: boolean;
}

const LabelRow: React.FC<LabelRowProps> = ({ label, labelIcon, showHelpIcon }) => (
  <div style={styles.labelRow}>
    <div style={styles.labelLeft}>
      {labelIcon && renderIcon(labelIcon, styles.labelIcon, { 'aria-hidden': true })}
      <span style={styles.labelText}>{label}</span>
    </div>
    {showHelpIcon && (
      <HelpOutlineIcon style={styles.labelIcon} aria-label="More information" />
    )}
  </div>
);

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
}) => (
  <div style={styles.metricColumn}>
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
  </div>
);

// Columnar layout: 1, 2, or 3 equal-width columns
interface ColumnarAreaProps {
  metrics: MetricItem[];
  colors: string[];
}

const ColumnarArea: React.FC<ColumnarAreaProps> = ({ metrics, colors }) => {
  // Font sizes per column count (extracted from Figma)
  const valueFontSize = metrics.length === 3 ? 24 : 34;
  const valueLineHeight = metrics.length === 3 ? 28 : 41;

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
    {metrics.map((metric, i) => (
      <div key={i} style={styles.listRow}>
        <span style={styles.listCaption} title={String(metric.label)}>
          {metric.label}
        </span>
        <span
          style={{
            ...styles.listValue,
            color: colors[i],
          }}
        >
          {metric.value}
        </span>
      </div>
    ))}
  </div>
);

// Grouped layout: 1 large left + remaining stacked on right
interface GroupedAreaProps {
  metrics: MetricItem[];
  colors: string[];
}

const GroupedArea: React.FC<GroupedAreaProps> = ({ metrics, colors }) => {
  const [primary, ...secondary] = metrics;

  return (
    <div style={styles.metricRow}>
      {/* Left: large primary metric */}
      <div style={styles.groupedPrimaryColumn}>
        <span
          style={{
            ...styles.metricValue,
            fontSize: 34,
            lineHeight: '41px',
            color: colors[0],
          }}
        >
          {primary.value}
        </span>
        <span style={styles.metricLabel} title={String(primary.label)}>
          {primary.label}
        </span>
      </div>

      <ColumnDivider />

      {/* Right: stacked secondary metrics */}
      <div style={styles.groupedSecondaryColumn}>
        {secondary.map((metric, i) => (
          <div key={i} style={styles.groupedSubRow}>
            <span style={styles.listCaption} title={String(metric.label)}>
              {metric.label}
            </span>
            <span
              style={{
                ...styles.listValue,
                color: colors[i + 1],
              }}
            >
              {metric.value}
            </span>
          </div>
        ))}
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
}

const IconsFooter: React.FC<IconsFooterProps> = ({ metrics }) => (
  <div style={styles.iconsFooter}>
    {metrics.map((metric, i) => (
      <div key={i} style={styles.iconSegment}>
        {renderIcon(metric.icon ?? 'warning_amber', styles.footerIcon, { 'aria-label': metric.label })}
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
  metrics,
  layout = defaultMetricCardProps.layout,
  footer = defaultMetricCardProps.footer,
  className,
  style: customStyle,
}, ref) => {
  const colors = resolveColors(metrics);
  const isListLayout = layout === 'auto' && metrics.length >= 4;
  const isGroupedLayout = layout === 'grouped';

  return (
    <div
      ref={ref}
      className={className}
      style={{ ...styles.card, ...customStyle }}
      role="region"
      aria-label={label}
    >
      {/* Label Row */}
      <LabelRow
        label={label}
        labelIcon={labelIcon}
        showHelpIcon={showHelpIcon}
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

        {/* Footer — not shown for list layout */}
        {!isListLayout && footer === 'bar' && (
          <BarFooter metrics={metrics} colors={colors} />
        )}
        {!isListLayout && footer === 'icons' && (
          <IconsFooter metrics={metrics} />
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
// All values extracted directly from Figma instances.

const styles = {
  // Card container
  // Extracted: width=flexible, height=150px, padding=16/16/8/16, cornerRadius=4, border=#E0E0E0
  card: {
    display: 'flex',
    flexDirection: 'column' as const,
    width: '100%',
    minWidth: 170,
    minHeight: 150,
    backgroundColor: METRIC_CARD_COLORS.cardBg,
    border: `1px solid ${METRIC_CARD_COLORS.border}`,
    borderRadius: 4,
    padding: '16px 16px 8px 16px',
    gap: 8,
    boxSizing: 'border-box' as const,
    overflow: 'hidden',
    fontFamily: tokens.typography.fontFamily,
  },

  // Label row — 24px height, flex row
  labelRow: {
    display: 'flex',
    flexDirection: 'row' as const,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexShrink: 0,
    height: 24,
  },

  labelLeft: {
    display: 'flex',
    flexDirection: 'row' as const,
    alignItems: 'center',
    gap: 4,
    minWidth: 0,
    overflow: 'hidden',
  },

  // Extracted: 16x16, #757575
  labelIcon: {
    fontSize: 16,
    color: METRIC_CARD_COLORS.labelText,
    flexShrink: 0,
  },

  // Extracted: 14px/500/24px lh, #757575
  labelText: {
    fontSize: 14,
    fontWeight: 500,
    lineHeight: '24px',
    color: METRIC_CARD_COLORS.labelText,
    whiteSpace: 'nowrap' as const,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },

  // Metrics container — fills remaining height (126px - 24px label - 8px gap = 94px)
  metricsContainer: {
    display: 'flex',
    flexDirection: 'column' as const,
    flex: 1,
    gap: 8,
    minHeight: 0,
  },

  // Metric row — horizontal flex, fills available width
  metricRow: {
    display: 'flex',
    flexDirection: 'row' as const,
    alignItems: 'flex-start',
    flex: 1,
    minHeight: 0,
    gap: 0,
  },

  // Single metric column — fills equal width
  metricColumn: {
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
    minWidth: 0,
    gap: 8,
    overflow: 'hidden',
  },

  // Extracted: fs=34/500/41px for 1-2 cols; override at call site for 3 cols (24/500/28px)
  metricValue: {
    fontWeight: 500,
    letterSpacing: 0,
    whiteSpace: 'nowrap' as const,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    textAlign: 'center' as const,
  } as React.CSSProperties,

  // Extracted: 12px/400/18px lh, #757575
  metricLabel: {
    fontSize: 12,
    fontWeight: 400,
    lineHeight: '18px',
    color: METRIC_CARD_COLORS.labelText,
    whiteSpace: 'nowrap' as const,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    textAlign: 'center' as const,
  },

  // Divider between columns: 1px wide, 24px tall, #E0E0E0, centered
  dividerWrapper: {
    display: 'flex',
    alignItems: 'flex-start',
    paddingTop: 8,
    flexShrink: 0,
    width: 1,
    alignSelf: 'stretch',
    paddingLeft: 4,
    paddingRight: 4,
  },

  divider: {
    width: 1,
    height: 24,
    backgroundColor: METRIC_CARD_COLORS.border,
  },

  // List layout area — vertical rows
  listArea: {
    display: 'flex',
    flexDirection: 'column' as const,
    flex: 1,
    gap: 0,
    justifyContent: 'space-between',
    minHeight: 0,
  },

  // Extracted from state=4, style=list: caption left, value right, 24px height
  listRow: {
    display: 'flex',
    flexDirection: 'row' as const,
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 24,
    overflow: 'hidden',
  },

  // Extracted: 12px/400/18px, #757575
  listCaption: {
    fontSize: 12,
    fontWeight: 400,
    lineHeight: '18px',
    color: METRIC_CARD_COLORS.labelText,
    flex: 1,
    whiteSpace: 'nowrap' as const,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    paddingRight: 4,
  },

  // Extracted: 16px/500/24px, color resolved per metric
  listValue: {
    fontSize: 16,
    fontWeight: 500,
    lineHeight: '24px',
    flexShrink: 0,
  } as React.CSSProperties,

  // Grouped layout: left column takes ~half width
  groupedPrimaryColumn: {
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
    minWidth: 0,
    gap: 8,
    overflow: 'hidden',
  },

  // Grouped layout: right stacked column
  groupedSecondaryColumn: {
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'space-around',
    flex: 1,
    minWidth: 0,
    gap: 0,
    overflow: 'hidden',
    paddingLeft: 8,
  },

  // Extracted from state=groupe: caption+value row, 24px height
  groupedSubRow: {
    display: 'flex',
    flexDirection: 'row' as const,
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 24,
    overflow: 'hidden',
  },

  // ── Footer styles ──

  // Bar footer wrapper — 18px height container, 10px bar inside
  barFooter: {
    flexShrink: 0,
    height: 18,
    display: 'flex',
    alignItems: 'center',
  },

  // Extracted: 10px height, background #EEEEEE, full width, flex row for segments
  progressTrack: {
    display: 'flex',
    flexDirection: 'row' as const,
    width: '100%',
    height: 10,
    backgroundColor: METRIC_CARD_COLORS.progressBg,
    overflow: 'hidden',
    borderRadius: 999,
  },

  // Icons footer — 18px, equal slots
  iconsFooter: {
    display: 'flex',
    flexDirection: 'row' as const,
    flexShrink: 0,
    height: 18,
    alignItems: 'center',
  },

  iconSegment: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },

  // Extracted: 16x16, #757575
  footerIcon: {
    fontSize: 16,
    color: METRIC_CARD_COLORS.labelText,
  },

  // Labels footer — 18px, proportional chips
  labelsFooter: {
    display: 'flex',
    flexDirection: 'row' as const,
    flexShrink: 0,
    height: 18,
    alignItems: 'center',
    gap: 4,
    overflow: 'hidden',
  },

  labelChip: {
    flex: 1,
    backgroundColor: METRIC_CARD_COLORS.cardBg,
    overflow: 'hidden',
    minWidth: 0,
  },

  // Extracted: 11px/500/16px lh, #757575
  labelChipText: {
    fontSize: 11,
    fontWeight: 500,
    lineHeight: '16px',
    color: METRIC_CARD_COLORS.labelText,
    whiteSpace: 'nowrap' as const,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: 'block',
    textAlign: 'center' as const,
  },
};

export default MetricCard;
