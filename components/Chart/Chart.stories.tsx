import type { Meta, StoryObj } from '@storybook/react';
import { Chart } from './Chart';
import { trioChartPalette } from '../../design-tokens/agChartsTheme';
import { tokens } from '../../design-tokens/tokens';

// ─── Sample Data ──────────────────────────────────────────────────────────────

const fillRateData = [
  { department: 'ICU', filled: 24, open: 6 },
  { department: 'ED', filled: 31, open: 9 },
  { department: 'Med/Surg', filled: 42, open: 14 },
  { department: 'L&D', filled: 18, open: 2 },
  { department: 'OR', filled: 21, open: 5 },
];

const weeklyTrend = [
  { week: 'W1', submissions: 120 },
  { week: 'W2', submissions: 145 },
  { week: 'W3', submissions: 162 },
  { week: 'W4', submissions: 138 },
  { week: 'W5', submissions: 175 },
  { week: 'W6', submissions: 188 },
  { week: 'W7', submissions: 201 },
  { week: 'W8', submissions: 192 },
];

const pieData = [
  { status: 'Filled', count: 136 },
  { status: 'Open', count: 36 },
  { status: 'Cancelled', count: 12 },
  { status: 'Pending', count: 24 },
  { status: 'On Hold', count: 8 },
];

// 10 series to show all palette colors
const paletteData = [
  { month: 'Jan', s1: 42, s2: 38, s3: 31, s4: 27, s5: 22, s6: 19, s7: 14, s8: 11, s9: 35, s10: 29 },
  { month: 'Feb', s1: 45, s2: 41, s3: 34, s4: 29, s5: 25, s6: 21, s7: 17, s8: 13, s9: 37, s10: 32 },
  { month: 'Mar', s1: 48, s2: 44, s3: 37, s4: 32, s5: 28, s6: 23, s7: 19, s8: 15, s9: 40, s10: 34 },
  { month: 'Apr', s1: 51, s2: 46, s3: 39, s4: 34, s5: 30, s6: 26, s7: 21, s8: 18, s9: 42, s10: 37 },
];

const areaData = [
  { month: 'Jan', actual: 82, target: 90 },
  { month: 'Feb', actual: 85, target: 90 },
  { month: 'Mar', actual: 78, target: 90 },
  { month: 'Apr', actual: 91, target: 90 },
  { month: 'May', actual: 88, target: 90 },
  { month: 'Jun', actual: 94, target: 90 },
];

const multiLineData = [
  { week: 'W1', agency1: 45, agency2: 32, agency3: 28, agency4: 18 },
  { week: 'W2', agency1: 52, agency2: 38, agency3: 31, agency4: 22 },
  { week: 'W3', agency1: 48, agency2: 42, agency3: 35, agency4: 25 },
  { week: 'W4', agency1: 61, agency2: 45, agency3: 29, agency4: 30 },
  { week: 'W5', agency1: 55, agency2: 48, agency3: 38, agency4: 27 },
  { week: 'W6', agency1: 67, agency2: 51, agency3: 42, agency4: 33 },
];

// ─── Palette Names (for swatch story) ─────────────────────────────────────────

const paletteNames = [
  'Deep teal-blue',
  'Medium blue-violet',
  'Purple',
  'Orchid',
  'Magenta-pink',
  'Hot pink',
  'Coral red',
  'Orange',
  'Sky blue',
  'Emerald green',
];

// ─── Enterprise Data ──────────────────────────────────────────────────────────

// Range Bar — Hiring Pipeline (from Agency Scorecard)
const hiringPipelineData = [
  { stage: 'Orders', start: 0, end: 740 },
  { stage: 'Submissions', start: 0, end: 496 },
  { stage: 'Interviews', start: 0, end: 193 },
  { stage: 'Offers', start: 0, end: 164 },
  { stage: 'Placements', start: 0, end: 114 },
];

// Waterfall — Agency Score Breakdown
const waterfallData = [
  { category: 'Participation', value: 5.2 },
  { category: 'Fulfillment', value: 3.8 },
  { category: 'Placement', value: 4.1 },
  { category: 'Readiness', value: -1.2 },
  { category: 'Retention', value: 2.6 },
  { category: 'Cancellations', value: -0.8 },
  { category: 'Quality', value: 3.1 },
];

// Radar — Agency Performance Dimensions
const radarData = [
  { dimension: 'Participation', agency: 72, peer: 58 },
  { dimension: 'Placement', agency: 65, peer: 55 },
  { dimension: 'Readiness', agency: 84, peer: 78 },
  { dimension: 'Retention', agency: 89, peer: 84 },
  { dimension: 'Quality', agency: 78, peer: 64 },
  { dimension: 'Speed', agency: 70, peer: 62 },
];

// Treemap — Submissions by Department & Specialty
const treemapData = [
  {
    name: 'All Departments',
    children: [
      {
        name: 'ICU',
        children: [
          { name: 'RN', size: 86 },
          { name: 'CNA', size: 42 },
          { name: 'RT', size: 28 },
        ],
      },
      {
        name: 'ED',
        children: [
          { name: 'RN', size: 112 },
          { name: 'LPN', size: 34 },
          { name: 'Paramedic', size: 21 },
        ],
      },
      {
        name: 'Med/Surg',
        children: [
          { name: 'RN', size: 94 },
          { name: 'CNA', size: 67 },
          { name: 'LPN', size: 45 },
        ],
      },
      {
        name: 'L&D',
        children: [
          { name: 'RN', size: 48 },
          { name: 'CNM', size: 18 },
        ],
      },
      {
        name: 'OR',
        children: [
          { name: 'RN', size: 52 },
          { name: 'Surg Tech', size: 31 },
        ],
      },
    ],
  },
];

// Sunburst — Order Status Hierarchy
const sunburstData = [
  {
    name: 'All Orders',
    children: [
      {
        name: 'Filled',
        children: [
          { name: 'Extended', size: 42 },
          { name: 'Completed', size: 74 },
          { name: 'In Progress', size: 20 },
        ],
      },
      {
        name: 'Open',
        children: [
          { name: 'Submitted', size: 18 },
          { name: 'Interviewing', size: 12 },
          { name: 'No Submissions', size: 6 },
        ],
      },
      {
        name: 'Cancelled',
        children: [
          { name: 'Pre-Start', size: 8 },
          { name: 'Post-Start', size: 4 },
        ],
      },
    ],
  },
];

// Box Plot — Time-to-Fill Distribution by Department
const boxPlotData = [
  { department: 'ICU', min: 8, q1: 14, median: 19, q3: 26, max: 42 },
  { department: 'ED', min: 5, q1: 10, median: 15, q3: 22, max: 38 },
  { department: 'Med/Surg', min: 3, q1: 8, median: 12, q3: 18, max: 28 },
  { department: 'L&D', min: 12, q1: 18, median: 24, q3: 32, max: 48 },
  { department: 'OR', min: 10, q1: 16, median: 22, q3: 30, max: 45 },
];

// Heatmap — Shift Coverage by Day/Hour
const heatmapData: { day: string; shift: string; coverage: number }[] = [];
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const shifts = ['Day (7a-3p)', 'Eve (3p-11p)', 'Night (11p-7a)'];
const coverageValues = [
  [95, 88, 72], [92, 85, 68], [94, 90, 75],
  [91, 82, 65], [89, 78, 62], [78, 70, 55], [75, 65, 50],
];
days.forEach((day, di) => {
  shifts.forEach((shift, si) => {
    heatmapData.push({ day, shift, coverage: coverageValues[di][si] });
  });
});

// Range Area — Agency vs Peer Band
const rangeAreaData = [
  { period: 'Q1 25', agency: 68, peerLow: 52, peerHigh: 72 },
  { period: 'Q2 25', agency: 70, peerLow: 54, peerHigh: 74 },
  { period: 'Q3 25', agency: 71, peerLow: 53, peerHigh: 73 },
  { period: 'Q4 25', agency: 72, peerLow: 55, peerHigh: 75 },
  { period: 'Q1 26', agency: 72.4, peerLow: 54, peerHigh: 74 },
];

// ─── Gradient Fill Helper ─────────────────────────────────────────────────────

function areaGradientFill(color: string, topOpacity = '33') {
  return {
    type: 'gradient' as const,
    colorStops: [
      { color: `${color}${topOpacity}`, stop: 0 },
      { color: `${color}00`, stop: 1 },
    ],
    rotation: 180,
  };
}

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof Chart> = {
  title: 'Components/Chart',
  component: Chart,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Wraps AG Charts with the TRIO design system theme. 10-color data viz palette, Roboto typography, and token-based styling applied automatically. Enterprise features (waterfall, treemap, radar, heatmap, range-bar, box plot, sunburst) are included.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 640, height: 400, padding: 16, background: '#fff', borderRadius: 4 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Chart>;

// ─── Color Palette ────────────────────────────────────────────────────────────

export const ColorPalette: Story = {
  decorators: [
    (Story) => (
      <div style={{ padding: 24, background: '#fff', borderRadius: 4 }}>
        <Story />
      </div>
    ),
  ],
  render: () => (
    <div>
      <h3 style={{
        fontFamily: tokens.typography.fontFamily,
        fontSize: 16,
        fontWeight: tokens.typography.fontWeight.medium,
        color: tokens.colors.text.primary,
        margin: '0 0 4px',
      }}>
        Data Visualization Palette
      </h3>
      <p style={{
        fontFamily: tokens.typography.fontFamily,
        fontSize: 12,
        color: tokens.colors.text.secondary,
        margin: '0 0 16px',
      }}>
        10 colors ordered by assignment. Color 1 = first series, 2 = second, etc.
      </p>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {trioChartPalette.fills.map((fill, i) => (
          <div key={fill} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <div style={{
              width: 48,
              height: 48,
              borderRadius: 4,
              backgroundColor: fill,
              border: `1px solid ${trioChartPalette.strokes[i]}`,
            }} />
            <span style={{
              fontFamily: tokens.typography.fontFamily,
              fontSize: 11,
              fontWeight: tokens.typography.fontWeight.medium,
              color: tokens.colors.text.primary,
            }}>
              {i + 1}
            </span>
            <span style={{
              fontFamily: tokens.typography.fontFamily,
              fontSize: 10,
              color: tokens.colors.text.secondary,
              textTransform: 'uppercase',
              letterSpacing: 0.5,
            }}>
              {fill}
            </span>
            <span style={{
              fontFamily: tokens.typography.fontFamily,
              fontSize: 9,
              color: tokens.colors.text.secondary,
            }}>
              {paletteNames[i]}
            </span>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 16, paddingTop: 16, borderTop: `1px solid ${tokens.colors.secondary.outline}` }}>
        <h4 style={{
          fontFamily: tokens.typography.fontFamily,
          fontSize: 12,
          fontWeight: tokens.typography.fontWeight.medium,
          color: tokens.colors.text.secondary,
          textTransform: 'uppercase',
          letterSpacing: 0.5,
          margin: '0 0 8px',
        }}>
          Stroke Colors (outlines)
        </h4>
        <div style={{ display: 'flex', gap: 8 }}>
          {trioChartPalette.strokes.map((stroke) => (
            <div key={stroke} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <div style={{
                width: 48,
                height: 12,
                borderRadius: 4,
                backgroundColor: stroke,
              }} />
              <span style={{ fontFamily: tokens.typography.fontFamily, fontSize: 9, color: tokens.colors.text.secondary }}>
                {stroke}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};

// ─── Design Tokens Reference ──────────────────────────────────────────────────

export const DesignTokens: Story = {
  decorators: [
    (Story) => (
      <div style={{ padding: 24, background: '#fff', borderRadius: 4, maxWidth: 640 }}>
        <Story />
      </div>
    ),
  ],
  render: () => {
    const tokenRows = [
      ['Font Family', tokens.typography.fontFamily, 'typography.fontFamily'],
      ['Title Size', `${tokens.typography.fontSize.md}px`, 'fontSize.md'],
      ['Subtitle Size', `${tokens.typography.fontSize.sm}px`, 'fontSize.sm'],
      ['Label / Legend Size', `${tokens.typography.fontSize.xs}px`, 'fontSize.xs'],
      ['Title Weight', `${tokens.typography.fontWeight.medium}`, 'fontWeight.medium'],
      ['Corner Radius (bars)', `${tokens.borderRadius.default}px`, 'borderRadius.default'],
      ['Background', tokens.colors.background.paper, 'colors.background.paper'],
      ['Text Primary', tokens.colors.text.primary, 'colors.text.primary'],
      ['Text Secondary', String(tokens.colors.text.secondary), 'colors.text.secondary'],
      ['Grid / Axis Lines', tokens.colors.components.border.default, 'colors.components.border.default'],
      ['Accent (hover/focus)', tokens.colors.primary.main, 'colors.primary.main'],
      ['Tooltip BG', tokens.colors.background.paper, 'colors.background.paper'],
      ['Tooltip Border', tokens.colors.components.border.default, 'colors.components.border.default'],
    ];

    return (
      <div>
        <h3 style={{
          fontFamily: tokens.typography.fontFamily,
          fontSize: 16,
          fontWeight: tokens.typography.fontWeight.medium,
          color: tokens.colors.text.primary,
          margin: '0 0 4px',
        }}>
          Chart Design Tokens
        </h3>
        <p style={{
          fontFamily: tokens.typography.fontFamily,
          fontSize: 12,
          color: tokens.colors.text.secondary,
          margin: '0 0 16px',
        }}>
          All values applied automatically by the TRIO AG Charts theme.
        </p>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          fontFamily: tokens.typography.fontFamily,
          fontSize: 14,
        }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${tokens.colors.secondary.outline}` }}>
              {['Property', 'Value', 'Token'].map((h) => (
                <th key={h} style={{
                  textAlign: 'left',
                  padding: '8px 16px',
                  fontSize: 12,
                  fontWeight: tokens.typography.fontWeight.medium,
                  color: tokens.colors.text.secondary,
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tokenRows.map(([prop, value, token]) => (
              <tr key={prop} style={{ borderBottom: `1px solid ${tokens.colors.secondary.outline}` }}>
                <td style={{ padding: '8px 16px', color: tokens.colors.text.primary }}>{prop}</td>
                <td style={{ padding: '8px 16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    {(value as string).startsWith('#') || (value as string).startsWith('rgba') ? (
                      <div style={{
                        width: 16,
                        height: 16,
                        borderRadius: 4,
                        backgroundColor: value as string,
                        border: `1px solid ${tokens.colors.secondary.outline}`,
                        flexShrink: 0,
                      }} />
                    ) : null}
                    <code style={{ fontSize: 12, color: tokens.colors.text.primary }}>{value}</code>
                  </div>
                </td>
                <td style={{ padding: '8px 16px' }}>
                  <code style={{ fontSize: 11, color: tokens.colors.text.secondary }}>{token}</code>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
// COMMUNITY CHARTS
// ═══════════════════════════════════════════════════════════════════════════════

// ─── Full Palette Bar Chart (all 10 colors) ──────────────────────────────────

export const FullPaletteBar: Story = {
  render: () => (
    <Chart
      style={{ width: '100%', height: '100%' }}
      options={{
        data: paletteData,
        title: { text: 'All 10 palette colors — stacked bar' },
        series: [
          { type: 'bar', xKey: 'month', yKey: 's1', yName: 'Deep Teal-Blue', stacked: true, cornerRadius: tokens.borderRadius.default },
          { type: 'bar', xKey: 'month', yKey: 's2', yName: 'Blue-Violet', stacked: true, cornerRadius: tokens.borderRadius.default },
          { type: 'bar', xKey: 'month', yKey: 's3', yName: 'Purple', stacked: true, cornerRadius: tokens.borderRadius.default },
          { type: 'bar', xKey: 'month', yKey: 's4', yName: 'Orchid', stacked: true, cornerRadius: tokens.borderRadius.default },
          { type: 'bar', xKey: 'month', yKey: 's5', yName: 'Magenta-Pink', stacked: true, cornerRadius: tokens.borderRadius.default },
          { type: 'bar', xKey: 'month', yKey: 's6', yName: 'Hot Pink', stacked: true, cornerRadius: tokens.borderRadius.default },
          { type: 'bar', xKey: 'month', yKey: 's7', yName: 'Coral Red', stacked: true, cornerRadius: tokens.borderRadius.default },
          { type: 'bar', xKey: 'month', yKey: 's8', yName: 'Orange', stacked: true, cornerRadius: tokens.borderRadius.default },
          { type: 'bar', xKey: 'month', yKey: 's9', yName: 'Sky Blue', stacked: true, cornerRadius: tokens.borderRadius.default },
          { type: 'bar', xKey: 'month', yKey: 's10', yName: 'Emerald Green', stacked: true, cornerRadius: tokens.borderRadius.default },
        ],
      }}
    />
  ),
};

// ─── Grouped Bar ──────────────────────────────────────────────────────────────

export const GroupedBar: Story = {
  render: () => (
    <Chart
      style={{ width: '100%', height: '100%' }}
      options={{
        data: fillRateData,
        title: { text: 'Fill rate by department' },
        series: [
          { type: 'bar', xKey: 'department', yKey: 'filled', yName: 'Filled', cornerRadius: tokens.borderRadius.default },
          { type: 'bar', xKey: 'department', yKey: 'open', yName: 'Open', cornerRadius: tokens.borderRadius.default },
        ],
      }}
    />
  ),
};

// ─── Stacked Bar ──────────────────────────────────────────────────────────────

export const StackedBar: Story = {
  render: () => (
    <Chart
      style={{ width: '100%', height: '100%' }}
      options={{
        data: fillRateData,
        title: { text: 'Fill rate by department — stacked' },
        series: [
          { type: 'bar', xKey: 'department', yKey: 'filled', yName: 'Filled', stacked: true, cornerRadius: tokens.borderRadius.default },
          { type: 'bar', xKey: 'department', yKey: 'open', yName: 'Open', stacked: true, cornerRadius: tokens.borderRadius.default },
        ],
      }}
    />
  ),
};

// ─── Line Chart ───────────────────────────────────────────────────────────────

export const LineChart: Story = {
  render: () => (
    <Chart
      style={{ width: '100%', height: '100%' }}
      options={{
        data: weeklyTrend,
        title: { text: 'Submissions — last 8 weeks' },
        series: [{
          type: 'area', xKey: 'week', yKey: 'submissions', yName: 'Submissions',
          stroke: trioChartPalette.fills[0], strokeWidth: 2,
          fill: areaGradientFill(trioChartPalette.fills[0]),
          marker: { enabled: true, size: 4, fill: trioChartPalette.fills[0], strokeWidth: 0 },
        }],
      }}
    />
  ),
};

// ─── Multi-Line ───────────────────────────────────────────────────────────────

export const MultiLine: Story = {
  render: () => (
    <Chart
      style={{ width: '100%', height: '100%' }}
      options={{
        data: multiLineData,
        title: { text: 'Agency submissions comparison' },
        series: [
          { type: 'area', xKey: 'week', yKey: 'agency1', yName: 'Agency A', stroke: trioChartPalette.fills[0], strokeWidth: 2, fill: areaGradientFill(trioChartPalette.fills[0], '18'), marker: { enabled: true, size: 4, fill: trioChartPalette.fills[0], strokeWidth: 0 } },
          { type: 'area', xKey: 'week', yKey: 'agency2', yName: 'Agency B', stroke: trioChartPalette.fills[1], strokeWidth: 2, fill: areaGradientFill(trioChartPalette.fills[1], '18'), marker: { enabled: true, size: 4, fill: trioChartPalette.fills[1], strokeWidth: 0 } },
          { type: 'area', xKey: 'week', yKey: 'agency3', yName: 'Agency C', stroke: trioChartPalette.fills[2], strokeWidth: 2, fill: areaGradientFill(trioChartPalette.fills[2], '18'), marker: { enabled: true, size: 4, fill: trioChartPalette.fills[2], strokeWidth: 0 } },
          { type: 'area', xKey: 'week', yKey: 'agency4', yName: 'Agency D', stroke: trioChartPalette.fills[3], strokeWidth: 2, fill: areaGradientFill(trioChartPalette.fills[3], '18'), marker: { enabled: true, size: 4, fill: trioChartPalette.fills[3], strokeWidth: 0 } },
        ],
      }}
    />
  ),
};

// ─── Area Chart ───────────────────────────────────────────────────────────────

export const AreaChart: Story = {
  render: () => (
    <Chart
      style={{ width: '100%', height: '100%' }}
      options={{
        data: areaData,
        title: { text: 'Fill rate vs target' },
        series: [
          { type: 'area', xKey: 'month', yKey: 'actual', yName: 'Actual %', stroke: trioChartPalette.fills[0], strokeWidth: 2, fill: areaGradientFill(trioChartPalette.fills[0]), marker: { enabled: true, size: 4, fill: trioChartPalette.fills[0], strokeWidth: 0 } },
          { type: 'area', xKey: 'month', yKey: 'target', yName: 'Target %', stroke: trioChartPalette.fills[3], strokeWidth: 1.5, lineDash: [4, 3], fill: areaGradientFill(trioChartPalette.fills[3], '14'), marker: { enabled: true, size: 3, fill: trioChartPalette.fills[3], strokeWidth: 0 } },
        ],
      }}
    />
  ),
};

// ─── Pie Chart ────────────────────────────────────────────────────────────────

export const PieChart: Story = {
  render: () => (
    <Chart
      style={{ width: '100%', height: '100%' }}
      options={{
        data: pieData,
        title: { text: 'Order status distribution' },
        series: [{ type: 'pie', angleKey: 'count', legendItemKey: 'status' }],
      }}
    />
  ),
};

// ─── Donut Chart ──────────────────────────────────────────────────────────────

export const DonutChart: Story = {
  render: () => (
    <Chart
      style={{ width: '100%', height: '100%' }}
      options={{
        data: pieData,
        title: { text: 'Order status — donut' },
        series: [{
          type: 'donut',
          angleKey: 'count',
          legendItemKey: 'status',
          innerRadiusRatio: 0.6,
          cornerRadius: tokens.borderRadius.default,
        }],
      }}
    />
  ),
};

// ─── Donut with Center Label ──────────────────────────────────────────────────

export const DonutWithLabel: Story = {
  render: () => {
    const total = pieData.reduce((sum, d) => sum + d.count, 0);
    return (
      <Chart
        style={{ width: '100%', height: '100%' }}
        options={{
          data: pieData,
          title: { text: 'Orders overview' },
          series: [{
            type: 'donut',
            angleKey: 'count',
            legendItemKey: 'status',
            innerRadiusRatio: 0.65,
            cornerRadius: tokens.borderRadius.default,
            innerLabels: [
              {
                text: `${total}`,
                fontFamily: tokens.typography.fontFamily,
                fontSize: 28,
                fontWeight: tokens.typography.fontWeight.medium as unknown as number,
                color: tokens.colors.text.primary,
              },
              {
                text: 'Total Orders',
                fontFamily: tokens.typography.fontFamily,
                fontSize: 12,
                color: tokens.colors.text.secondary as string,
              },
            ],
          }],
        }}
      />
    );
  },
};

// ─── Horizontal Bar ───────────────────────────────────────────────────────────

export const HorizontalBar: Story = {
  render: () => (
    <Chart
      style={{ width: '100%', height: '100%' }}
      options={{
        data: fillRateData,
        title: { text: 'Fill rate by department — horizontal' },
        series: [
          { type: 'bar', xKey: 'department', yKey: 'filled', yName: 'Filled', direction: 'horizontal', cornerRadius: tokens.borderRadius.default },
          { type: 'bar', xKey: 'department', yKey: 'open', yName: 'Open', direction: 'horizontal', cornerRadius: tokens.borderRadius.default },
        ],
      }}
    />
  ),
};

// ═══════════════════════════════════════════════════════════════════════════════
// ENTERPRISE CHARTS
// ═══════════════════════════════════════════════════════════════════════════════

// ─── Range Bar — Hiring Pipeline (from Agency Scorecard) ──────────────────────

export const RangeBarPipeline: Story = {
  name: 'Enterprise / Range Bar — Hiring Pipeline',
  render: () => (
    <Chart
      style={{ width: '100%', height: '100%' }}
      options={{
        title: { text: 'Hiring Pipeline — Submissions to Placements' },
        subtitle: { text: 'Horizontal range bar showing funnel progression' },
        data: hiringPipelineData,
        series: [{
          type: 'range-bar' as any,
          direction: 'horizontal',
          xKey: 'stage',
          yLowKey: 'start',
          yHighKey: 'end',
          cornerRadius: tokens.borderRadius.default,
          strokeWidth: 0,
          label: { enabled: false },
          itemStyler: ({ datum }: { datum: { stage: string } }) => {
            const idx = hiringPipelineData.findIndex(d => d.stage === datum.stage);
            return { fill: trioChartPalette.fills[idx], stroke: trioChartPalette.strokes[idx] };
          },
        }],
        axes: [
          {
            type: 'category', position: 'left',
            label: { fontSize: tokens.typography.fontSize.xs, color: tokens.colors.text.secondary },
            line: { enabled: false }, tick: { enabled: false },
            paddingInner: 0.15,
          },
          {
            type: 'number', position: 'bottom',
            label: { fontSize: tokens.typography.fontSize.xs, color: tokens.colors.text.disabled },
            line: { enabled: false }, tick: { enabled: false },
            gridLine: { enabled: true, style: [{ stroke: `${tokens.colors.components.border.default}60`, lineDash: [4, 3] }] },
          },
        ] as any,
        animation: { enabled: true },
      }}
    />
  ),
};

// ─── Range Bar — Fulfillment Speed Gantt (from Agency Scorecard) ──────────────

export const RangeBarGantt: Story = {
  name: 'Enterprise / Range Bar — Fulfillment Gantt',
  render: () => {
    const phases = [
      { phase: 'Time to Submission', start: 0, end: 3.8 },
      { phase: 'Time to Feedback', start: 3.8, end: 8.3 },
      { phase: 'Time to Placement', start: 8.3, end: 26.3 },
    ];
    return (
      <Chart
        style={{ width: '100%', height: '100%' }}
        options={{
          title: { text: 'Fulfillment Speed — Sequential Phases' },
          subtitle: { text: 'Each phase starts where the previous ended (days)' },
          data: phases,
          series: [{
            type: 'range-bar' as any,
            direction: 'horizontal',
            xKey: 'phase',
            yLowKey: 'start',
            yHighKey: 'end',
            cornerRadius: tokens.borderRadius.default,
            strokeWidth: 0,
            label: { enabled: false },
            itemStyler: ({ datum }: { datum: { phase: string } }) => {
              const idx = phases.findIndex(d => d.phase === datum.phase);
              return { fill: trioChartPalette.fills[idx], stroke: trioChartPalette.strokes[idx] };
            },
          }],
          axes: ([
            {
              type: 'category', position: 'left',
              label: { fontSize: tokens.typography.fontSize.xs, color: tokens.colors.text.secondary },
              line: { enabled: false }, tick: { enabled: false },
              paddingInner: 0.15,
            },
            {
              type: 'number', position: 'bottom', min: 0, max: 30,
              label: {
                fontSize: tokens.typography.fontSize.xs,
                color: tokens.colors.text.disabled,
                formatter: ({ value }: { value: number }) => `${value}d`,
              },
              line: { enabled: false }, tick: { enabled: false },
              gridLine: { enabled: true, style: [{ stroke: `${tokens.colors.components.border.default}60`, lineDash: [4, 3] }] },
              crossLines: [{
                type: 'line' as const,
                value: 27,
                stroke: trioChartPalette.fills[3],
                strokeWidth: 2,
                lineDash: [4, 3],
                label: {
                  text: '27d peer avg',
                  position: 'top' as const,
                  fontSize: tokens.typography.fontSize.xs,
                  color: trioChartPalette.fills[3],
                },
              }],
            },
          ]) as any,
          animation: { enabled: true },
        }}
      />
    );
  },
};

// ─── Waterfall — Score Breakdown ──────────────────────────────────────────────

export const Waterfall: Story = {
  name: 'Enterprise / Waterfall — Score Breakdown',
  render: () => (
    <Chart
      style={{ width: '100%', height: '100%' }}
      options={{
        title: { text: 'Agency Composite Score — Category Breakdown' },
        subtitle: { text: 'Point contribution by scoring dimension' },
        data: waterfallData,
        series: [{
          type: 'waterfall',
          xKey: 'category',
          yKey: 'value',
          item: {
            positive: { fill: trioChartPalette.fills[0], stroke: trioChartPalette.strokes[0] },
            negative: { fill: trioChartPalette.fills[6], stroke: trioChartPalette.strokes[6] },
            subtotal: { fill: trioChartPalette.fills[8], stroke: trioChartPalette.strokes[8] },
          },
          totals: [{ totalType: 'subtotal', index: 7, axisLabel: 'Total' }],
        }] as any,
        axes: [
          {
            type: 'category', position: 'bottom',
            label: { fontSize: tokens.typography.fontSize.xs, color: tokens.colors.text.secondary },
          },
          {
            type: 'number', position: 'left',
            label: {
              fontSize: tokens.typography.fontSize.xs,
              color: tokens.colors.text.disabled,
              formatter: ({ value }: { value: number }) => `${value > 0 ? '+' : ''}${value}`,
            },
          },
        ] as any,
        animation: { enabled: true },
      }}
    />
  ),
};

// ─── Radar — Agency Performance Dimensions ────────────────────────────────────

export const RadarChart: Story = {
  name: 'Enterprise / Radar — Performance Dimensions',
  render: () => (
    <Chart
      style={{ width: '100%', height: '100%' }}
      options={{
        title: { text: 'Agency vs Peer Group — Performance Profile' },
        data: radarData,
        series: [
          {
            type: 'radar-area' as any,
            angleKey: 'dimension',
            radiusKey: 'agency',
            radiusName: 'Agency',
            stroke: trioChartPalette.fills[0],
            strokeWidth: 2,
            fill: `${trioChartPalette.fills[0]}33`,
            marker: { enabled: true, size: 4, fill: trioChartPalette.fills[0], strokeWidth: 0 },
          },
          {
            type: 'radar-area' as any,
            angleKey: 'dimension',
            radiusKey: 'peer',
            radiusName: 'Peer Avg',
            stroke: trioChartPalette.fills[3],
            strokeWidth: 1.5,
            lineDash: [4, 3],
            fill: `${trioChartPalette.fills[3]}1A`,
            marker: { enabled: true, size: 3, fill: trioChartPalette.fills[3], strokeWidth: 0 },
          },
        ],
        axes: [{
          type: 'angle-category',
          label: { fontSize: tokens.typography.fontSize.xs, color: tokens.colors.text.secondary },
        }, {
          type: 'radius-number',
          label: { fontSize: tokens.typography.fontSize.xxs, color: tokens.colors.text.disabled },
        }] as any,
        animation: { enabled: true },
      }}
    />
  ),
};

// ─── Treemap — Submissions by Department ──────────────────────────────────────

export const Treemap: Story = {
  name: 'Enterprise / Treemap — Submissions by Dept & Specialty',
  decorators: [
    (Story) => (
      <div style={{ width: 640, height: 480, padding: 16, background: '#fff', borderRadius: 4 }}>
        <Story />
      </div>
    ),
  ],
  render: () => (
    <Chart
      style={{ width: '100%', height: '100%' }}
      options={{
        title: { text: 'Submissions by Department & Specialty' },
        data: treemapData,
        series: [{
          type: 'treemap' as any,
          childrenKey: 'children',
          sizeKey: 'size',
          labelKey: 'name',
          fills: trioChartPalette.fills,
          strokes: trioChartPalette.strokes,
          tile: { label: { fontSize: tokens.typography.fontSize.xs } },
          group: { label: { fontSize: tokens.typography.fontSize.sm, fontWeight: tokens.typography.fontWeight.medium as any } },
        }],
        animation: { enabled: true },
      }}
    />
  ),
};

// ─── Sunburst — Order Status Hierarchy ────────────────────────────────────────

export const Sunburst: Story = {
  name: 'Enterprise / Sunburst — Order Status Hierarchy',
  decorators: [
    (Story) => (
      <div style={{ width: 500, height: 500, padding: 16, background: '#fff', borderRadius: 4 }}>
        <Story />
      </div>
    ),
  ],
  render: () => (
    <Chart
      style={{ width: '100%', height: '100%' }}
      options={{
        title: { text: 'Order Status Breakdown' },
        data: sunburstData,
        series: [{
          type: 'sunburst' as any,
          childrenKey: 'children',
          sizeKey: 'size',
          labelKey: 'name',
          fills: trioChartPalette.fills,
          strokes: trioChartPalette.strokes,
        }],
        animation: { enabled: true },
      }}
    />
  ),
};

// ─── Box Plot — Time-to-Fill Distribution ─────────────────────────────────────

export const BoxPlot: Story = {
  name: 'Enterprise / Box Plot — Time-to-Fill Distribution',
  render: () => (
    <Chart
      style={{ width: '100%', height: '100%' }}
      options={{
        title: { text: 'Time-to-Fill Distribution by Department' },
        subtitle: { text: 'Days from order open to placement confirmed' },
        data: boxPlotData,
        series: [{
          type: 'box-plot' as any,
          xKey: 'department',
          minKey: 'min',
          q1Key: 'q1',
          medianKey: 'median',
          q3Key: 'q3',
          maxKey: 'max',
          fill: `${trioChartPalette.fills[0]}40`,
          stroke: trioChartPalette.fills[0],
          strokeWidth: 2,
          whisker: { stroke: trioChartPalette.fills[0], strokeWidth: 1.5 },
          cap: { lengthRatio: 0.5 },
        }],
        axes: [
          {
            type: 'category', position: 'bottom',
            label: { fontSize: tokens.typography.fontSize.xs, color: tokens.colors.text.secondary },
          },
          {
            type: 'number', position: 'left',
            label: {
              fontSize: tokens.typography.fontSize.xs,
              color: tokens.colors.text.disabled,
              formatter: ({ value }: { value: number }) => `${value}d`,
            },
          },
        ] as any,
        animation: { enabled: true },
      }}
    />
  ),
};

// ─── Heatmap — Shift Coverage ─────────────────────────────────────────────────

export const Heatmap: Story = {
  name: 'Enterprise / Heatmap — Shift Coverage',
  render: () => (
    <Chart
      style={{ width: '100%', height: '100%' }}
      options={{
        title: { text: 'Shift Coverage — % Filled by Day & Shift' },
        data: heatmapData,
        series: [{
          type: 'heatmap' as any,
          xKey: 'day',
          yKey: 'shift',
          colorKey: 'coverage',
          colorRange: [`${trioChartPalette.fills[6]}40`, trioChartPalette.fills[0]],
          label: {
            enabled: true,
            fontSize: tokens.typography.fontSize.xs,
            color: tokens.colors.text.primary,
            formatter: ({ datum }: { datum: { coverage: number } }) => `${datum.coverage}%`,
          },
        }],
        axes: [
          {
            type: 'category', position: 'bottom',
            label: { fontSize: tokens.typography.fontSize.xs, color: tokens.colors.text.secondary },
          },
          {
            type: 'category', position: 'left',
            label: { fontSize: tokens.typography.fontSize.xs, color: tokens.colors.text.secondary },
          },
        ] as any,
        animation: { enabled: true },
      }}
    />
  ),
};

// ─── Range Area — Agency vs Peer Band ─────────────────────────────────────────

export const RangeArea: Story = {
  name: 'Enterprise / Range Area — Agency vs Peer Band',
  render: () => (
    <Chart
      style={{ width: '100%', height: '100%' }}
      options={{
        title: { text: 'Participation Rate — Agency vs Peer Range' },
        subtitle: { text: 'Shaded band shows 25th–75th percentile of peer group' },
        data: rangeAreaData,
        series: [
          {
            type: 'range-area' as any,
            xKey: 'period',
            yLowKey: 'peerLow',
            yHighKey: 'peerHigh',
            yLowName: 'Peer 25th',
            yHighName: 'Peer 75th',
            yName: 'Peer Range',
            fill: `${trioChartPalette.fills[3]}20`,
            stroke: trioChartPalette.fills[3],
            strokeWidth: 1,
            lineDash: [4, 3],
            strokeOpacity: 0.5,
          },
          {
            type: 'area',
            xKey: 'period',
            yKey: 'agency',
            yName: 'Agency',
            stroke: trioChartPalette.fills[0],
            strokeWidth: 2.5,
            fill: areaGradientFill(trioChartPalette.fills[0]),
            marker: { enabled: true, size: 5, fill: trioChartPalette.fills[0], strokeWidth: 0 },
          },
        ],
        axes: [
          {
            type: 'category', position: 'bottom',
            label: { fontSize: tokens.typography.fontSize.xs, color: tokens.colors.text.secondary },
          },
          {
            type: 'number', position: 'left',
            label: {
              fontSize: tokens.typography.fontSize.xs,
              color: tokens.colors.text.disabled,
              formatter: ({ value }: { value: number }) => `${value}%`,
            },
          },
        ] as any,
        animation: { enabled: true },
      }}
    />
  ),
};

// ─── Area with Gradient Fill — Scorecard Pattern ──────────────────────────────

export const AreaGradientScorecard: Story = {
  name: 'Enterprise / Area Gradient — Agency vs Peer (Scorecard Pattern)',
  render: () => {
    const trendData = [
      { period: 'Q3 25', agency: 68, peer: 57 },
      { period: 'Q4 25', agency: 71, peer: 58 },
      { period: 'Q1 26', agency: 72, peer: 57 },
      { period: 'Q2 26', agency: 72.4, peer: 58.3 },
    ];
    const allValues = trendData.flatMap(d => [d.agency, d.peer]);
    const yMin = Math.floor(Math.min(...allValues) - 5);
    const yMax = Math.ceil(Math.max(...allValues) + 5);

    return (
      <Chart
        style={{ width: '100%', height: '100%' }}
        options={{
          title: { text: 'Participation Rate — Quarterly Trend' },
          data: trendData,
          series: [
            {
              type: 'line',
              xKey: 'period', yKey: 'peer', yName: 'Peer Avg',
              stroke: trioChartPalette.fills[3], strokeWidth: 1.5, lineDash: [4, 3],
              marker: { enabled: true, size: 3, fill: trioChartPalette.fills[3], strokeWidth: 0 },
            },
            {
              type: 'area',
              xKey: 'period', yKey: 'agency', yName: 'Agency',
              stroke: trioChartPalette.fills[0], strokeWidth: 2,
              fill: areaGradientFill(trioChartPalette.fills[0]),
              marker: { enabled: true, size: 4, fill: trioChartPalette.fills[0], strokeWidth: 0 },
            },
          ],
          axes: [
            {
              type: 'category', position: 'bottom',
              label: { fontSize: tokens.typography.fontSize.xs, color: tokens.colors.text.disabled },
              line: { enabled: false }, tick: { enabled: false },
            },
            {
              type: 'number', position: 'left',
              min: yMin, max: yMax,
              label: { fontSize: tokens.typography.fontSize.xs, color: tokens.colors.text.disabled },
              line: { enabled: false }, tick: { enabled: false },
            },
          ] as any,
          legend: { enabled: true },
          animation: { enabled: true },
        }}
      />
    );
  },
};
