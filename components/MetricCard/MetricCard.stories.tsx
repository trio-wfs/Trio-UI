import type { Meta, StoryObj } from '@storybook/react';
import { MetricCard } from './MetricCard';

const meta: Meta<typeof MetricCard> = {
  title: 'Components/MetricCard',
  component: MetricCard,
  tags: ['autodocs'],
  argTypes: {
    footer: { control: 'select', options: ['bar', 'icons', 'labels', 'none'] },
    layout: { control: 'select', options: ['auto', 'grouped'] },
    showHelpIcon: { control: 'boolean' },
    label: { control: 'text' },
  },
  args: {
    label: 'Open Orders',
    footer: 'bar',
    layout: 'auto',
    showHelpIcon: false,
    metrics: [
      { label: 'Filled', value: 84 },
      { label: 'Unfilled', value: 32 },
      { label: 'Pending', value: 12 },
    ],
  },
};

export default meta;
type Story = StoryObj<typeof MetricCard>;

export const Default: Story = {};

export const SingleMetric: Story = {
  args: {
    label: 'Fill Rate',
    metrics: [{ label: 'This week', value: '73%' }],
    footer: 'none',
  },
};

export const TwoMetrics: Story = {
  args: {
    label: 'Submissions',
    metrics: [
      { label: 'Approved', value: 48, color: 'success' },
      { label: 'Rejected', value: 9, color: 'error' },
    ],
  },
};

export const FourMetrics: Story = {
  args: {
    label: 'Weekly Orders',
    metrics: [
      { label: 'Mon', value: 12 },
      { label: 'Tue', value: 18 },
      { label: 'Wed', value: 9 },
      { label: 'Thu', value: 21 },
    ],
    footer: 'bar',
  },
};

export const Grouped: Story = {
  args: {
    label: 'Agency Performance',
    layout: 'grouped',
    metrics: [
      { label: 'Total placements', value: 142 },
      { label: 'Fill rate', value: '68%' },
      { label: 'On-time', value: '91%' },
    ],
  },
};

export const WithIcons: Story = {
  args: {
    label: 'Compliance Status',
    footer: 'icons',
    metrics: [
      { label: 'Licensed', value: 94, icon: 'check_circle' },
      { label: 'Expiring', value: 7, icon: 'warning_amber', color: 'warning' },
      { label: 'Expired', value: 2, icon: 'error', color: 'error' },
    ],
  },
};
