import type { Meta, StoryObj } from '@storybook/react';
import { NavigationHeader } from './NavigationHeader';

const defaultNavItems = [
  {
    id: 'dashboards',
    label: 'Dashboards',
    menuItems: [
      { id: 'overview', label: 'Overview' },
      { id: 'staffing', label: 'Staffing Dashboard' },
      { id: 'compliance', label: 'Compliance Dashboard' },
      { id: 'financials', label: 'Financials', divider: true },
      { id: 'custom', label: 'Custom Reports' },
    ],
  },
  {
    id: 'nursing',
    label: 'Nursing/Allied',
    menuItems: [
      { id: 'orders', label: 'Orders' },
      { id: 'submissions', label: 'Submissions' },
      { id: 'placements', label: 'Placements' },
      { id: 'timekeeping', label: 'Timekeeping' },
    ],
  },
  {
    id: 'locums',
    label: 'Locums',
    menuItems: [
      { id: 'orders', label: 'Orders' },
      { id: 'submissions', label: 'Submissions' },
      { id: 'placements', label: 'Placements' },
    ],
  },
  {
    id: 'perdiem',
    label: 'Per Diem',
    menuItems: [
      { id: 'shifts', label: 'Open Shifts' },
      { id: 'submissions', label: 'Submissions' },
      { id: 'timecards', label: 'Timecards' },
    ],
  },
  {
    id: 'irm',
    label: 'IRM',
    menuItems: [
      { id: 'workers', label: 'Workers' },
      { id: 'credentials', label: 'Credentials' },
    ],
  },
  { id: 'clients', label: 'Clients' },
  { id: 'agencies', label: 'Agencies' },
  {
    id: 'billing',
    label: 'Billing',
    menuItems: [
      { id: 'invoices', label: 'Invoices' },
      { id: 'rates', label: 'Rate Cards' },
      { id: 'adjustments', label: 'Adjustments' },
    ],
  },
  { id: 'reports', label: 'Reports' },
  {
    id: 'admin',
    label: 'Administration',
    menuItems: [
      { id: 'users', label: 'Users' },
      { id: 'roles', label: 'Roles & Permissions' },
      { id: 'config', label: 'Configuration', divider: true },
      { id: 'audit', label: 'Audit Log' },
    ],
  },
];

const defaultUser = { name: 'Jesse Szygiel', initials: 'JS' };

const defaultUserMenuItems = [
  { id: 'profile', label: 'My Profile' },
  { id: 'settings', label: 'Settings', divider: true },
  { id: 'logout', label: 'Log Out' },
];

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
    userMenuItems: defaultUserMenuItems,
    badgeText: 'TRIO WIP',
    searchPlaceholder: 'Search Trio',
    onNavItemClick: (id: string) => console.log('onNavItemClick', id),
    onMenuItemClick: (navId: string, menuId: string) => console.log('onMenuItemClick', navId, menuId),
    onUserMenuItemClick: (id: string) => console.log('onUserMenuItemClick', id),
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

export const WithoutUserMenu: Story = {
  name: 'Without User Menu',
  args: {
    userMenuItems: undefined,
    onUserMenuClick: () => console.log('onUserMenuClick'),
  },
};
