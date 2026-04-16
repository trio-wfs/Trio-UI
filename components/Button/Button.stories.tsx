import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const iconEl = (name: string) => (
  <span className="material-icons-outlined" style={{ fontSize: 20 }}>{name}</span>
);

const iconOptions = ['(none)', 'add', 'save', 'edit', 'delete', 'search', 'check', 'close', 'download', 'upload', 'arrow_back', 'arrow_forward', 'refresh', 'filter_list', 'more_vert'];

const iconMapping: Record<string, React.ReactNode> = {
  '(none)': undefined,
  ...Object.fromEntries(iconOptions.slice(1).map((n) => [n, iconEl(n)])),
};

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['contained', 'outlined', 'text'] },
    color: { control: 'select', options: ['primary', 'secondary', 'success', 'warning', 'error', 'info'] },
    size: { control: 'select', options: ['medium', 'small'] },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    children: { control: 'text' },
    startIcon: {
      control: 'select',
      options: iconOptions,
      mapping: iconMapping,
      description: 'Material icon shown before label',
    },
    endIcon: {
      control: 'select',
      options: iconOptions,
      mapping: iconMapping,
      description: 'Material icon shown after label',
    },
  },
  args: {
    children: 'Button',
    variant: 'contained',
    color: 'primary',
    size: 'medium',
    disabled: false,
    loading: false,
    startIcon: '(none)' as any,
    endIcon: '(none)' as any,
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: { variant: 'contained', color: 'primary', children: 'Save' },
};

export const Secondary: Story = {
  args: { variant: 'contained', color: 'secondary', children: 'Edit' },
};

export const Outlined: Story = {
  args: { variant: 'outlined', color: 'primary', children: 'Cancel' },
};

export const TextButton: Story = {
  args: { variant: 'text', color: 'primary', children: 'Learn more' },
};

export const Small: Story = {
  args: { variant: 'contained', color: 'primary', size: 'small', children: 'Small' },
};

export const WithStartIcon: Story = {
  args: { variant: 'contained', color: 'primary', children: 'Add Order', startIcon: iconEl('add') },
};

export const WithEndIcon: Story = {
  args: { variant: 'outlined', color: 'primary', children: 'Export', endIcon: iconEl('download') },
};

export const WithBothIcons: Story = {
  args: {
    variant: 'contained',
    color: 'primary',
    children: 'Next',
    startIcon: iconEl('arrow_back'),
    endIcon: iconEl('arrow_forward'),
  },
};

export const Disabled: Story = {
  args: { variant: 'contained', color: 'primary', disabled: true, children: 'Disabled' },
};

export const Loading: Story = {
  args: { variant: 'contained', color: 'primary', loading: true, children: 'Saving…' },
};

export const AllColors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      {(['primary', 'secondary', 'success', 'warning', 'error', 'info'] as const).map((color) => (
        <Button key={color} variant="contained" color={color}>{color}</Button>
      ))}
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <Button variant="contained" color="primary">Contained</Button>
      <Button variant="outlined" color="primary">Outlined</Button>
      <Button variant="text" color="primary">Text</Button>
    </div>
  ),
};
