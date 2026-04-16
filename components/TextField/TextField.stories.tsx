import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TextField } from './TextField';

const meta: Meta<typeof TextField> = {
  title: 'Components/TextField',
  component: TextField,
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'select', options: ['single-line', 'multi-line'] },
    state: { control: 'select', options: ['default', 'error', 'focus'] },
    disabled: { control: 'boolean' },
    inputFill: { control: 'boolean' },
    label: { control: 'text' },
    placeholder: { control: 'text' },
    helperText: { control: 'text' },
    value: { control: 'text' },
  },
  args: {
    type: 'single-line',
    state: 'default',
    disabled: false,
    inputFill: false,
    label: 'Facility name',
    placeholder: 'Enter facility name',
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
type Story = StoryObj<typeof TextField>;

export const Default: Story = {};

export const WithValue: Story = {
  args: { value: 'Mercy Regional Hospital' },
};

export const Focused: Story = {
  args: { state: 'focus', value: 'Focus state preview' },
};

export const Error: Story = {
  args: {
    state: 'error',
    value: 'Invalid value',
    helperText: 'This field is required',
  },
};

export const Disabled: Story = {
  args: { disabled: true, value: 'Read-only' },
};

export const WithHelperText: Story = {
  args: {
    helperText: 'Enter the facility display name',
  },
};

export const InputFill: Story = {
  args: { inputFill: true, value: 'Alternate background' },
};

export const MultiLine: Story = {
  args: {
    type: 'multi-line',
    label: 'Notes',
    placeholder: 'Add any additional notes…',
    value: '',
  },
};

export const NoLabel: Story = {
  args: { label: undefined, placeholder: 'Search…' },
};

export const Interactive: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <TextField
        label="Controlled input"
        placeholder="Type here"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        helperText={value ? `${value.length} chars` : 'Start typing…'}
      />
    );
  },
};
