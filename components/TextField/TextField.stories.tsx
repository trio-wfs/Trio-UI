import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TextField } from './TextField';

const meta: Meta<typeof TextField> = {
  title: 'Components/TextField',
  component: TextField,
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'select', options: ['single-line', 'multi-line'] },
    size: { control: 'select', options: ['medium', 'small'] },
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
    size: 'medium',
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

export const Small: Story = {
  args: { size: 'small' },
};

export const SmallWithValue: Story = {
  args: { size: 'small', value: 'Mercy Regional Hospital' },
};

export const SmallError: Story = {
  args: {
    size: 'small',
    state: 'error',
    value: 'Invalid value',
    helperText: 'This field is required',
  },
};

export const SmallDisabled: Story = {
  args: { size: 'small', disabled: true, value: 'Read-only' },
};

export const SmallMultiLine: Story = {
  args: {
    size: 'small',
    type: 'multi-line',
    label: 'Notes',
    placeholder: 'Add any additional notes…',
  },
};

export const NoLabel: Story = {
  args: { label: undefined, placeholder: 'Search…' },
};

export const SizeComparison: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'flex-end' }}>
      <TextField size="medium" label="Medium" placeholder="38px height" />
      <TextField size="small" label="Small" placeholder="30px height" />
    </div>
  ),
  decorators: [(Story) => <div style={{ width: 600 }}><Story /></div>],
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
