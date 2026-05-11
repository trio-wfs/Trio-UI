import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';

const anchor = (
  <span
    style={{
      display: 'inline-block',
      width: 40,
      height: 40,
      borderRadius: 4,
      background: '#E0E0E0',
    }}
  />
);

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'error', 'success', 'warning', 'info'],
    },
    type: { control: 'select', options: ['default', 'dot'] },
    badgeContent: { control: 'text' },
  },
  args: {
    color: 'primary',
    type: 'default',
    badgeContent: 4,
    children: anchor,
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {};

export const Dot: Story = {
  args: { type: 'dot' },
};

export const LargeCount: Story = {
  args: { badgeContent: 99 },
};

export const AllColors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
      {(['primary', 'secondary', 'error', 'success', 'warning', 'info'] as const).map((color) => (
        <div key={color} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <Badge color={color} badgeContent={3}>{anchor}</Badge>
          <span style={{ fontSize: 11, fontFamily: 'Roboto', color: '#757575' }}>{color}</span>
        </div>
      ))}
    </div>
  ),
};

export const DotAllColors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
      {(['primary', 'secondary', 'error', 'success', 'warning', 'info'] as const).map((color) => (
        <div key={color} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <Badge color={color} type="dot">{anchor}</Badge>
          <span style={{ fontSize: 11, fontFamily: 'Roboto', color: '#757575' }}>{color}</span>
        </div>
      ))}
    </div>
  ),
};
