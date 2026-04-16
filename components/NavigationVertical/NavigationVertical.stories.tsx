import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { NavigationVertical } from './NavigationVertical';
import DashboardIcon from '@mui/icons-material/Dashboard';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import PeopleIcon from '@mui/icons-material/People';

const items = [
  { id: 'dashboard', label: 'Dashboard', icon: <DashboardIcon /> },
  {
    id: 'shifts',
    label: 'Shifts',
    icon: <EventAvailableIcon />,
    expandable: true,
    subItems: [
      { id: 'open', label: 'Open shifts' },
      { id: 'filled', label: 'Filled' },
      { id: 'cancelled', label: 'Cancelled' },
    ],
  },
  {
    id: 'workers',
    label: 'Workers',
    icon: <PeopleIcon />,
    expandable: true,
    subItems: [
      { id: 'active', label: 'Active' },
      { id: 'onboarding', label: 'Onboarding' },
    ],
  },
  { id: 'credentials', label: 'Credentials', icon: <VerifiedUserIcon /> },
  { id: 'billing', label: 'Billing', icon: <ReceiptLongIcon /> },
];

const settingsItems = [
  { id: 'profile', label: 'Profile' },
  { id: 'notifications', label: 'Notifications' },
  { id: 'integrations', label: 'Integrations' },
];

const meta: Meta<typeof NavigationVertical> = {
  title: 'Components/NavigationVertical',
  component: NavigationVertical,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ height: 600, display: 'flex', background: '#F5F5F5' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof NavigationVertical>;

export const Default: Story = {
  render: () => {
    const [activeId, setActiveId] = useState('dashboard');
    const [activeSubId, setActiveSubId] = useState<string | undefined>();
    return (
      <NavigationVertical
        items={items}
        activeId={activeId}
        activeSubId={activeSubId}
        onNavigate={(id, subId) => {
          setActiveId(id);
          setActiveSubId(subId);
        }}
      />
    );
  },
};

export const WithSettings: Story = {
  render: () => {
    const [activeId, setActiveId] = useState('shifts');
    const [activeSubId, setActiveSubId] = useState<string | undefined>('open');
    const [activeSettingsId, setActiveSettingsId] = useState<string | undefined>();
    return (
      <NavigationVertical
        items={items}
        activeId={activeId}
        activeSubId={activeSubId}
        settings
        settingsItems={settingsItems}
        activeSettingsId={activeSettingsId}
        onNavigate={(id, subId) => {
          if (settingsItems.find((s) => s.id === id)) {
            setActiveSettingsId(id);
          } else {
            setActiveId(id);
            setActiveSubId(subId);
          }
        }}
      />
    );
  },
};
