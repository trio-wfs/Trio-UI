import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select';

const departmentOptions = [
  { value: 'icu', label: 'ICU' },
  { value: 'ed', label: 'Emergency Department' },
  { value: 'med-surg', label: 'Med/Surg' },
  { value: 'l-and-d', label: 'Labor & Delivery' },
  { value: 'or', label: 'Operating Room' },
];

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {
    state: { control: 'select', options: ['default', 'focus', 'disabled', 'error', 'selected'] },
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
    label: { control: 'text' },
    placeholder: { control: 'text' },
    helperText: { control: 'text' },
  },
  args: {
    state: 'default',
    disabled: false,
    error: false,
    label: 'Department',
    placeholder: 'Select a department',
    options: departmentOptions,
  },
  decorators: [
    (Story) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {};

export const WithValue: Story = {
  args: { value: 'icu' },
};

export const Focused: Story = {
  args: { state: 'focus' },
};

export const Error: Story = {
  args: {
    error: true,
    helperText: 'Please select a department',
  },
};

export const Disabled: Story = {
  args: { disabled: true, value: 'icu' },
};

export const WithHelperText: Story = {
  args: { helperText: 'Primary department for this shift' },
};

export const NoLabel: Story = {
  args: { label: undefined },
};

export const Interactive: Story = {
  render: () => {
    const [value, setValue] = useState<string | undefined>(undefined);
    return (
      <Select
        label="Department"
        options={departmentOptions}
        value={value}
        onChange={setValue}
        helperText={value ? `Selected: ${value}` : 'Nothing selected yet'}
      />
    );
  },
};
