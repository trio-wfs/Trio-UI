import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { RadioGroup } from './RadioGroup';

const shiftOptions = [
  { value: 'day', label: 'Day shift (7a–7p)' },
  { value: 'night', label: 'Night shift (7p–7a)' },
  { value: 'flex', label: 'Flex (per diem)' },
];

const withDisabled = [
  { value: 'a', label: 'Option A' },
  { value: 'b', label: 'Option B' },
  { value: 'c', label: 'Option C (disabled)', disabled: true },
];

const meta: Meta<typeof RadioGroup> = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
  argTypes: {
    color: { control: 'select', options: ['primary', 'default', 'error'] },
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
    label: { control: 'text' },
  },
  args: {
    color: 'primary',
    disabled: false,
    error: false,
    label: 'Shift preference',
    options: shiftOptions,
  },
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {};

export const NoLabel: Story = {
  args: { label: undefined },
};

export const Error: Story = {
  args: { color: 'error', error: true, label: 'Required — please choose one' },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const OneOptionDisabled: Story = {
  args: { label: 'Pick one', options: withDisabled, value: 'a' },
};

export const Interactive: Story = {
  render: () => {
    const [value, setValue] = useState('day');
    return (
      <RadioGroup
        label="Shift preference"
        options={shiftOptions}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    );
  },
};
