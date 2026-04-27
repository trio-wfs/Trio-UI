import React, { useRef, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { PopOver } from './PopOver';

// ---------------------------------------------------------------------------
// Demo wrapper — manages anchor + open state so every story is interactive
// ---------------------------------------------------------------------------

const PopOverDemo: React.FC<
  React.ComponentProps<typeof PopOver> & { triggerLabel?: string }
> = ({ triggerLabel = 'Open popover', ...props }) => {
  const anchorRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        ref={anchorRef}
        variant="outlined"
        onClick={() => setOpen(true)}
      >
        {triggerLabel}
      </Button>
      <PopOver
        {...props}
        anchorEl={anchorRef.current}
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
};

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

const meta: Meta<typeof PopOver> = {
  title: 'Components/PopOver',
  component: PopOver,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'PopOver is anchored to a trigger element and presents contextual content in a floating panel. ' +
          'Supports an optional header with a title and action link, scrollable content, and accepts any React children.',
      },
    },
  },
  argTypes: {
    title: { control: 'text' },
    actionLabel: { control: 'text' },
    width: { control: 'number' },
    maxHeight: { control: 'number' },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: 40, fontFamily: 'Roboto, sans-serif' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof PopOver>;

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

const loremShort =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.';

const loremLong = Array(6).fill(loremShort).join('\n\n');

export const Default: Story = {
  render: (args) => (
    <PopOverDemo {...args} triggerLabel="Open popover">
      <Typography variant="body2">{loremShort}</Typography>
    </PopOverDemo>
  ),
  args: {},
};

export const WithHeader: Story = {
  render: (args) => (
    <PopOverDemo {...args} triggerLabel="Open with header">
      <Typography variant="body2">{loremShort}</Typography>
    </PopOverDemo>
  ),
  args: {
    title: 'Credential Details',
  },
};

export const WithHeaderAndAction: Story = {
  render: (args) => (
    <PopOverDemo {...args} triggerLabel="Open with action">
      <Typography variant="body2">{loremShort}</Typography>
    </PopOverDemo>
  ),
  args: {
    title: 'Vendor Submissions',
    actionLabel: 'View all',
    onAction: () => alert('View all clicked'),
  },
};

export const ScrollableContent: Story = {
  render: (args) => (
    <PopOverDemo {...args} triggerLabel="Open scrollable">
      <Typography variant="body2" style={{ whiteSpace: 'pre-line' }}>
        {loremLong}
      </Typography>
    </PopOverDemo>
  ),
  args: {
    title: 'Notes',
    actionLabel: 'Edit',
    onAction: () => alert('Edit clicked'),
    maxHeight: 200,
  },
};

export const CustomWidth: Story = {
  render: (args) => (
    <PopOverDemo {...args} triggerLabel="Open narrow popover">
      <Typography variant="body2">
        This popover uses a custom width of 300px instead of the 450px default.
      </Typography>
    </PopOverDemo>
  ),
  args: {
    title: 'Quick Info',
    width: 300,
  },
};

export const WithComponents: Story = {
  render: (args) => (
    <PopOverDemo {...args} triggerLabel="Open with components">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <Typography
          variant="body2"
          sx={{ color: 'rgba(0,0,0,0.6)', marginBottom: '4px' }}
        >
          Active credentials for this worker placement:
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          <Chip label="RN License" color="success" size="small" />
          <Chip label="BLS Certified" color="success" size="small" />
          <Chip label="ACLS" color="success" size="small" />
          <Chip label="TB Test" color="warning" size="small" />
          <Chip label="Background Check" color="default" size="small" />
        </Box>
        <Box sx={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
          <Button variant="contained" size="small">
            Approve placement
          </Button>
          <Button variant="outlined" size="small">
            Request documents
          </Button>
        </Box>
      </Box>
    </PopOverDemo>
  ),
  args: {
    title: 'Credentialing Summary',
    actionLabel: 'Full profile',
    onAction: () => alert('Full profile clicked'),
  },
};
