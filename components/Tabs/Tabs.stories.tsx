import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Tabs } from './Tabs';

const icon = (name: string) => (
  <span className="material-icons-outlined" style={{ fontSize: 18 }}>{name}</span>
);

const defaultTabs = [
  { label: 'All orders' },
  { label: 'Open' },
  { label: 'Filled' },
  { label: 'Cancelled' },
];

const withIcons = [
  { label: 'Dashboard', leftIcon: icon('dashboard') },
  { label: 'Shifts', leftIcon: icon('event_available') },
  { label: 'Credentials', leftIcon: icon('verified_user') },
  { label: 'Billing', leftIcon: icon('receipt_long'), disabled: true },
];

const manyTabs = Array.from({ length: 12 }, (_, i) => ({ label: `Tab ${i + 1}` }));

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['Tab Group', 'Right Scroll', 'Left Scroll', 'Left and Right Scroll'],
    },
    activeIndex: { control: { type: 'number', min: 0 } },
  },
  args: {
    tabs: defaultTabs,
    activeIndex: 0,
    variant: 'Tab Group',
  },
  decorators: [
    (Story) => (
      <div style={{ width: 640 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {};

export const WithIcons: Story = {
  args: { tabs: withIcons },
};

export const WithDisabled: Story = {
  args: {
    tabs: [
      { label: 'Active' },
      { label: 'Disabled', disabled: true },
      { label: 'Another' },
    ],
  },
};

export const Scrollable: Story = {
  args: { tabs: manyTabs, variant: 'Left and Right Scroll' },
};

export const Interactive: Story = {
  render: () => {
    const [active, setActive] = useState(0);
    return (
      <div>
        <Tabs tabs={defaultTabs} activeIndex={active} onChange={setActive} />
        <div style={{ padding: 24, fontFamily: 'Roboto', color: '#212121' }}>
          Content for <strong>{defaultTabs[active].label}</strong>
        </div>
      </div>
    );
  },
};
