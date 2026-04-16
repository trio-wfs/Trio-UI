import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from './Alert';

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['standard', 'contained', 'outline'] },
    severity: { control: 'select', options: ['default', 'error', 'warning', 'success'] },
    title: { control: 'text' },
    description: { control: 'text' },
    actionLabel: { control: 'text' },
    close: { control: 'boolean' },
  },
  args: {
    variant: 'standard',
    severity: 'default',
    title: 'Shift published',
    description: 'Your shift is now visible to all credentialed vendors.',
    close: true,
  },
  decorators: [
    (Story) => (
      <div style={{ width: 480 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Default: Story = {};

export const Success: Story = {
  args: { severity: 'success', title: 'Shift filled', description: 'Sarah Chen, RN accepted the assignment.' },
};

export const Warning: Story = {
  args: { severity: 'warning', title: 'Credentials expiring', description: '3 workers have licenses expiring in the next 30 days.' },
};

export const Error: Story = {
  args: { severity: 'error', title: 'Submission failed', description: 'Please fix the errors below and try again.' },
};

export const Filled: Story = {
  args: { variant: 'contained', severity: 'success' },
};

export const Outlined: Story = {
  args: { variant: 'outline', severity: 'warning' },
};

export const WithAction: Story = {
  args: {
    severity: 'warning',
    title: 'Unsaved changes',
    description: 'You have unsaved changes to this order.',
    actionLabel: 'Save now',
  },
};

export const TitleOnly: Story = {
  args: { title: 'Order submitted successfully', description: undefined },
};

export const DescriptionOnly: Story = {
  args: { title: undefined, description: 'This order is currently being reviewed.' },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 12 }}>
      {(['standard', 'contained', 'outline'] as const).flatMap((variant) =>
        (['default', 'success', 'warning', 'error'] as const).map((severity) => (
          <Alert
            key={`${variant}-${severity}`}
            variant={variant}
            severity={severity}
            title={`${variant} / ${severity}`}
            description="Figma-derived token colors should match the design system spec."
          />
        ))
      )}
    </div>
  ),
};
