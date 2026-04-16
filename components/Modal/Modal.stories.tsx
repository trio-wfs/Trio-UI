import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Button from '@mui/material/Button';
import { Modal } from './Modal';

const ModalDemo: React.FC<React.ComponentProps<typeof Modal> & { triggerLabel?: string }> = ({
  triggerLabel = 'Open modal',
  ...props
}) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>{triggerLabel}</Button>
      <Modal
        {...props}
        open={open}
        onClose={() => {
          props.onClose?.();
          setOpen(false);
        }}
        onConfirm={() => {
          props.onConfirm?.();
          setOpen(false);
        }}
      />
    </>
  );
};

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'lg'] },
    variant: { control: 'select', options: ['default', 'destructive'] },
    title: { control: 'text' },
    eyebrowText: { control: 'text' },
    confirmLabel: { control: 'text' },
    cancelLabel: { control: 'text' },
    hideFooter: { control: 'boolean' },
    confirmDisabled: { control: 'boolean' },
  },
  args: {
    size: 'sm',
    variant: 'default',
    title: 'Confirm action',
    eyebrowText: 'Shift #4820',
    confirmLabel: 'Confirm',
    cancelLabel: 'Cancel',
    hideFooter: false,
    confirmDisabled: false,
    children: (
      <div style={{ fontFamily: 'Roboto' }}>
        Are you sure you want to proceed with this action? This will notify all assigned vendors.
      </div>
    ),
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  render: (args) => <ModalDemo {...args} />,
};

export const Large: Story = {
  render: (args) => <ModalDemo {...args} triggerLabel="Open large modal" />,
  args: { size: 'lg', title: 'Create new order', eyebrowText: 'Step 1 of 3' },
};

export const Destructive: Story = {
  render: (args) => <ModalDemo {...args} triggerLabel="Delete" />,
  args: {
    variant: 'destructive',
    title: 'Delete order?',
    eyebrowText: 'This cannot be undone',
    confirmLabel: 'Delete',
    children: (
      <div style={{ fontFamily: 'Roboto' }}>
        Order #4820 and all associated data (submissions, credentials, timesheets) will be permanently removed.
      </div>
    ),
  },
};

export const NoFooter: Story = {
  render: (args) => <ModalDemo {...args} triggerLabel="Open info modal" />,
  args: {
    hideFooter: true,
    title: 'System notice',
    eyebrowText: undefined,
    children: (
      <div style={{ fontFamily: 'Roboto' }}>
        Scheduled maintenance is planned for Sunday at 2am EST. The platform will be unavailable for ~30 minutes.
      </div>
    ),
  },
};

export const DisabledConfirm: Story = {
  render: (args) => <ModalDemo {...args} />,
  args: {
    confirmDisabled: true,
    title: 'Form incomplete',
    eyebrowText: 'Fill required fields first',
    confirmLabel: 'Save',
  },
};
