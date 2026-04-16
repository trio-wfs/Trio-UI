import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Autocomplete } from './Autocomplete';
import type { AutocompleteOption } from './Autocomplete.types';

const sampleOptions: AutocompleteOption[] = [
  { value: 'rn', label: 'Registered Nurse (RN)' },
  { value: 'lpn', label: 'Licensed Practical Nurse (LPN)' },
  { value: 'cna', label: 'Certified Nursing Assistant (CNA)' },
  { value: 'pt', label: 'Physical Therapist (PT)' },
  { value: 'ot', label: 'Occupational Therapist (OT)' },
  { value: 'rt', label: 'Respiratory Therapist (RT)' },
];

const meta: Meta<typeof Autocomplete> = {
  title: 'Components/Autocomplete',
  component: Autocomplete,
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'select', options: ['single', 'multi'] },
    state: { control: 'select', options: ['default', 'focus', 'error'] },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
    placeholder: { control: 'text' },
    helperText: { control: 'text' },
    errorText: { control: 'text' },
    limitTags: { control: 'number', description: 'Max chips before "+N" truncation' },
  },
  args: {
    type: 'single',
    state: 'default',
    disabled: false,
    label: 'Specialty',
    placeholder: 'Search specialties…',
    options: sampleOptions,
  },
  // Constrain to a realistic field width — not full viewport edge-to-edge
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 480 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Autocomplete>;

export const SingleSelect: Story = {
  render: (args) => {
    const [value, setValue] = useState<AutocompleteOption | null>(null);
    return (
      <Autocomplete
        {...args}
        type="single"
        value={value}
        onChange={(v) => setValue(v as AutocompleteOption | null)}
      />
    );
  },
  args: { label: 'Specialty', placeholder: 'Search specialties…' },
};

export const MultiSelect: Story = {
  render: (args) => {
    const [value, setValue] = useState<AutocompleteOption[]>([]);
    return (
      <Autocomplete
        {...args}
        type="multi"
        value={value}
        onChange={(v) => setValue(v as AutocompleteOption[])}
      />
    );
  },
  args: { label: 'Specialties', placeholder: 'Search specialties…' },
};

// Shows the +N truncation behavior — pre-load more chips than fit
export const MultiSelectOverflow: Story = {
  render: (args) => {
    const [value, setValue] = useState<AutocompleteOption[]>([...sampleOptions]);
    return (
      <Autocomplete
        {...args}
        type="multi"
        value={value}
        onChange={(v) => setValue(v as AutocompleteOption[])}
      />
    );
  },
  args: { label: 'Specialties', placeholder: 'Search specialties…' },
};

export const WithError: Story = {
  args: {
    type: 'single',
    state: 'error',
    label: 'Specialty',
    errorText: 'At least one specialty is required.',
  },
};

export const WithHelperText: Story = {
  args: {
    type: 'single',
    label: 'Specialty',
    helperText: 'Select the clinical specialty for this position.',
  },
};

export const Disabled: Story = {
  args: { type: 'single', label: 'Specialty', disabled: true },
};
