import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    color: { control: 'select', options: ['primary', 'error'] },
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    label: { control: 'text' },
  },
  args: {
    color: 'primary',
    disabled: false,
    indeterminate: false,
    label: 'Checkbox label',
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {};

export const Checked: Story = {
  args: { checked: true },
};

export const Indeterminate: Story = {
  args: { indeterminate: true, label: 'Indeterminate' },
};

export const Error: Story = {
  args: { color: 'error', checked: true, label: 'Required field' },
};

export const Disabled: Story = {
  args: { disabled: true, label: 'Disabled' },
};

export const DisabledChecked: Story = {
  args: { disabled: true, checked: true, label: 'Disabled checked' },
};

export const NoLabel: Story = {
  args: { label: undefined },
};

export const Interactive: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <Checkbox
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
        label={checked ? 'Toggle me off' : 'Toggle me on'}
      />
    );
  },
};

export const Matrix: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 4 }}>
      <Checkbox label="Unchecked" />
      <Checkbox label="Checked" checked />
      <Checkbox label="Indeterminate" indeterminate />
      <Checkbox label="Disabled" disabled />
      <Checkbox label="Disabled checked" disabled checked />
      <Checkbox label="Error" color="error" checked />
    </div>
  ),
};
