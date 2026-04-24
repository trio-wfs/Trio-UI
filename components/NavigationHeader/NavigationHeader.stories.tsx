import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { NavigationHeader } from './NavigationHeader';

const defaultNavItems = [
  { id: 'dashboards', label: 'Dashboards', hasDropdown: true },
  { id: 'nursing', label: 'Nursing/Allied', hasDropdown: true },
  { id: 'locums', label: 'Locums', hasDropdown: true },
  { id: 'perdiem', label: 'Per Diem', hasDropdown: true },
  { id: 'irm', label: 'IRM', hasDropdown: true },
  { id: 'clients', label: 'Clients' },
  { id: 'agencies', label: 'Agencies' },
  { id: 'billing', label: 'Billing', hasDropdown: true },
  { id: 'reports', label: 'Reports' },
  { id: 'admin', label: 'Administration', hasDropdown: true },
];

const defaultUser = { name: 'Jesse Szygiel', initials: 'JS' };

const meta: Meta<typeof NavigationHeader> = {
  title: 'Components/NavigationHeader',
  component: NavigationHeader,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    activeItemId: {
      control: 'select',
      options: defaultNavItems.map((i) => i.id),
    },
    badgeText: { control: 'text' },
    searchPlaceholder: { control: 'text' },
  },
  args: {
    navItems: defaultNavItems,
    activeItemId: 'perdiem',
    user: defaultUser,
    badgeText: 'TRIO WIP',
    searchPlaceholder: 'Search Trio',
  },
};

export default meta;
type Story = StoryObj<typeof NavigationHeader>;

export const Default: Story = {};

export const NoBadge: Story = {
  args: {
    badgeText: '',
  },
};

export const DifferentActiveItem: Story = {
  args: {
    activeItemId: 'nursing',
  },
};
