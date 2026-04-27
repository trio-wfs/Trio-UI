import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DatePicker } from './DatePicker';
import dayjs, { Dayjs } from 'dayjs';

const meta: Meta<typeof DatePicker> = {
  title: 'Components/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'select', options: ['date', 'dateTime'] },
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
    required: { control: 'boolean' },
    size: { control: 'select', options: ['small', 'medium'] },
    label: { control: 'text' },
    placeholder: { control: 'text' },
    helperText: { control: 'text' },
  },
  args: {
    type: 'date',
    disabled: false,
    error: false,
    label: 'Date',
    size: 'medium',
  },
  decorators: [
    (Story) => (
      <div style={{ width: 280 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {};

export const WithValue: Story = {
  args: { value: dayjs('2024-01-12') },
};

export const DateTime: Story = {
  args: {
    type: 'dateTime',
    label: 'Shift Start',
    value: dayjs('2024-01-12T08:00'),
  },
};

export const Error: Story = {
  args: {
    error: true,
    helperText: 'Date is required',
    label: 'Start Date',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: dayjs('2024-01-12'),
    label: 'Locked Date',
  },
};

export const WithMinMax: Story = {
  args: {
    label: 'Shift Date',
    helperText: 'Jan 1 - Jan 31, 2024',
    minDate: dayjs('2024-01-01'),
    maxDate: dayjs('2024-01-31'),
  },
};

export const SmallSize: Story = {
  args: {
    size: 'small',
    label: 'Date',
  },
};

export const NoLabel: Story = {
  args: {
    label: undefined,
    placeholder: 'MM/DD/YYYY',
  },
};

export const Interactive: Story = {
  render: () => {
    const [value, setValue] = useState<Dayjs | null>(null);
    return (
      <DatePicker
        label="Assignment Date"
        value={value}
        onChange={setValue}
        helperText={value ? `Selected: ${value.format('MM/DD/YYYY')}` : 'Pick a date'}
      />
    );
  },
};

export const InteractiveDateTime: Story = {
  render: () => {
    const [value, setValue] = useState<Dayjs | null>(dayjs('2024-01-12T08:00'));
    return (
      <DatePicker
        type="dateTime"
        label="Shift Start Time"
        value={value}
        onChange={setValue}
        helperText={value ? value.format('MM/DD/YYYY hh:mm A') : 'Pick date and time'}
      />
    );
  },
};
