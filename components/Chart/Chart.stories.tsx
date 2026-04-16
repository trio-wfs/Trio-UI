import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Chart } from './Chart';

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
];

const meta: Meta<typeof Chart> = {
  title: 'Components/Chart',
  component: Chart,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Wraps AG Charts with the TRIO design system theme applied automatically. Pass AG Chart `options` directly.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 640, height: 400, padding: 16, background: '#fff' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Chart>;

export const BarChart: Story = {
  render: () => (
    <Chart
      style={{ width: '100%', height: '100%' }}
      options={{
        data: fillRateData,
        title: { text: 'Fill rate by department' },
        series: [
          { type: 'bar', xKey: 'department', yKey: 'filled', yName: 'Filled', stacked: true },
          { type: 'bar', xKey: 'department', yKey: 'open', yName: 'Open', stacked: true },
        ],
      }}
    />
  ),
};

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
