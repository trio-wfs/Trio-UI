import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { PageHeaderToolbar } from './PageHeaderToolbar';
import { Button } from '../Button/Button';
import { Chip } from '../Chip/Chip';

const meta: Meta<typeof PageHeaderToolbar> = {
  title: 'Components/PageHeaderToolbar',
  component: PageHeaderToolbar,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['default', 'full', 'NewCanvas'] },
    pageTitleText: { control: 'text' },
    eyebrowText: { control: 'text' },
    indicatorLabel: { control: 'text' },
  },
  args: {
    variant: 'default',
    pageTitleText: 'Order details',
    eyebrowText: undefined,
  },
  decorators: [
    (Story) => (
      <div style={{ width: 1040, background: '#F5F5F5', padding: 16 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof PageHeaderToolbar>;

export const Default: Story = {
  args: {
    pageTitleText: 'Active orders',
    singleButtonContent: <Button variant="contained" color="primary">New order</Button>,
  },
};

export const WithEyebrow: Story = {
  args: {
    pageTitleText: 'Order #4820 — Mercy Regional ICU',
    eyebrowText: '3 submissions · 2 credentialed · filled 4 of 6',
    singleButtonContent: <Button variant="contained" color="primary">Edit order</Button>,
  },
};

export const Full: Story = {
  args: {
    variant: 'full',
    pageTitleText: 'Order #4820',
    eyebrowText: 'Mercy Regional · ICU · Night shift',
    chipItems: (
      <>
        <Chip label="Urgent" color="error" size="sm" />
        <Chip label="Filled 4/6" color="success" size="sm" variant="outline" />
        <Chip label="On hold" color="warning" size="sm" variant="outline" />
      </>
    ),
    singleButtonContent: <Button variant="contained" color="primary">Save changes</Button>,
  },
};

export const WithIndicator: Story = {
  args: {
    pageTitleText: 'Mercy Regional Hospital',
    eyebrowText: 'ICU · Level 1 Trauma',
    indicatorLabel: 'LIVE',
    singleButtonContent: <Button variant="outlined" color="primary">Export</Button>,
  },
};
