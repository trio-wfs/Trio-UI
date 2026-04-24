import React from 'react';
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

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof Chart> = {
  title: 'Components/Chart',
  component: Chart,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Wraps AG Charts with the TRIO design system theme. 10-color data viz palette, Roboto typography, and token-based styling applied automatically.',
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
          {trioChartPalette.strokes.map((stroke, i) => (
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

// ─── Full Palette Bar Chart (all 10 colors) ──────────────────────────────────

export const FullPaletteBar: Story = {
  render: () => (
    <Chart
      style={{ width: '100%', height: '100%' }}
      options={{
        data: paletteData,
        title: { text: 'All 10 palette colors — stacked bar' },
        series: [
          { type: 'bar', xKey: 'month', yKey: 's1', yName: 'Deep Teal-Blue', stacked: true },
          { type: 'bar', xKey: 'month', yKey: 's2', yName: 'Blue-Violet', stacked: true },
          { type: 'bar', xKey: 'month', yKey: 's3', yName: 'Purple', stacked: true },
          { type: 'bar', xKey: 'month', yKey: 's4', yName: 'Orchid', stacked: true },
          { type: 'bar', xKey: 'month', yKey: 's5', yName: 'Magenta-Pink', stacked: true },
          { type: 'bar', xKey: 'month', yKey: 's6', yName: 'Hot Pink', stacked: true },
          { type: 'bar', xKey: 'month', yKey: 's7', yName: 'Coral Red', stacked: true },
          { type: 'bar', xKey: 'month', yKey: 's8', yName: 'Orange', stacked: true },
          { type: 'bar', xKey: 'month', yKey: 's9', yName: 'Sky Blue', stacked: true },
          { type: 'bar', xKey: 'month', yKey: 's10', yName: 'Emerald Green', stacked: true },
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
          { type: 'bar', xKey: 'department', yKey: 'filled', yName: 'Filled' },
          { type: 'bar', xKey: 'department', yKey: 'open', yName: 'Open' },
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
          { type: 'bar', xKey: 'department', yKey: 'filled', yName: 'Filled', stacked: true },
          { type: 'bar', xKey: 'department', yKey: 'open', yName: 'Open', stacked: true },
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
        series: [{ type: 'line', xKey: 'week', yKey: 'submissions', yName: 'Submissions' }],
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
          { type: 'line', xKey: 'week', yKey: 'agency1', yName: 'Agency A' },
          { type: 'line', xKey: 'week', yKey: 'agency2', yName: 'Agency B' },
          { type: 'line', xKey: 'week', yKey: 'agency3', yName: 'Agency C' },
          { type: 'line', xKey: 'week', yKey: 'agency4', yName: 'Agency D' },
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
          { type: 'area', xKey: 'month', yKey: 'actual', yName: 'Actual %' },
          { type: 'area', xKey: 'month', yKey: 'target', yName: 'Target %' },
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
          { type: 'bar', xKey: 'department', yKey: 'filled', yName: 'Filled', direction: 'horizontal' },
          { type: 'bar', xKey: 'department', yKey: 'open', yName: 'Open', direction: 'horizontal' },
        ],
      }}
    />
  ),
};
