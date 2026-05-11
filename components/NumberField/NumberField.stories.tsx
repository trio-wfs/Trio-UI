import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { NumberField } from './NumberField';

const meta: Meta<typeof NumberField> = {
  title: 'Components/NumberField',
  component: NumberField,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['medium', 'small'] },
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
    value: { control: 'number' },
    min: { control: 'number' },
    max: { control: 'number' },
    step: { control: 'number' },
    label: { control: 'text' },
    helperText: { control: 'text' },
  },
  args: {
    size: 'medium',
    disabled: false,
    error: false,
    step: 1,
  },
  decorators: [
    (Story) => (
      <div style={{ padding: 24 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof NumberField>;

export const Default: Story = {};

export const WithValue: Story = {
  args: { value: 5 },
};

export const Small: Story = {
  args: { size: 'small', value: 3 },
};

export const Disabled: Story = {
  args: { disabled: true, value: 4 },
};

export const WithMinMax: Story = {
  args: {
    value: 5,
    min: 0,
    max: 10,
    helperText: 'Value must be between 0 and 10',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Hours per shift',
    value: 8,
    helperText: 'Standard shift length',
  },
};

export const Error: Story = {
  args: {
    label: 'Quantity',
    value: 0,
    error: true,
    helperText: 'Value must be greater than 0',
  },
};

export const Interactive: Story = {
  render: () => {
    const [value, setValue] = useState(0);
    return (
      <NumberField
        label="Workers needed"
        value={value}
        onChange={setValue}
        min={0}
        max={20}
        step={1}
        helperText={`Current value: ${value}`}
      />
    );
  },
};

export const SizeComparison: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'flex-end' }}>
      <NumberField size="medium" label="Medium" value={3} />
      <NumberField size="small" label="Small" value={3} />
    </div>
  ),
};
