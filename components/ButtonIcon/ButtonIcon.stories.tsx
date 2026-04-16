import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ButtonIcon } from './ButtonIcon';
import NotificationsIcon from '@mui/icons-material/Notifications';
import FilterListIcon from '@mui/icons-material/FilterList';
import SettingsIcon from '@mui/icons-material/Settings';
import CloseIcon from '@mui/icons-material/Close';

const meta: Meta<typeof ButtonIcon> = {
  title: 'Components/ButtonIcon',
  component: ButtonIcon,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['contained', 'ghost'] },
    color: { control: 'select', options: ['primary', 'secondary'] },
    size: { control: 'select', options: ['sm', 'md'] },
    badge: { control: 'boolean' },
    badgeCount: { control: 'number' },
    disabled: { control: 'boolean' },
  },
  args: {
    variant: 'contained',
    color: 'primary',
    size: 'md',
    badge: false,
    icon: <NotificationsIcon />,
    'aria-label': 'Notifications',
  },
};

export default meta;
type Story = StoryObj<typeof ButtonIcon>;

export const Default: Story = {};

export const Ghost: Story = {
  args: { variant: 'ghost', icon: <SettingsIcon />, 'aria-label': 'Settings' },
};

export const Secondary: Story = {
  args: { color: 'secondary', icon: <FilterListIcon />, 'aria-label': 'Filter' },
};

export const Small: Story = {
  args: { size: 'sm', icon: <CloseIcon />, 'aria-label': 'Close' },
};

export const WithDotBadge: Story = {
  args: { badge: true, icon: <NotificationsIcon />, 'aria-label': 'Notifications' },
};

export const WithCountBadge: Story = {
  args: { badge: true, badgeCount: 7, icon: <NotificationsIcon />, 'aria-label': 'Notifications' },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const Matrix: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, auto)', gap: 16, alignItems: 'center' }}>
      {(['contained', 'ghost'] as const).flatMap((variant) =>
        (['primary', 'secondary'] as const).flatMap((color) =>
          (['md', 'sm'] as const).map((size) => (
            <ButtonIcon
              key={`${variant}-${color}-${size}`}
              variant={variant}
              color={color}
              size={size}
              icon={<NotificationsIcon />}
              aria-label={`${variant} ${color} ${size}`}
            />
          ))
        )
      )}
    </div>
  ),
};
