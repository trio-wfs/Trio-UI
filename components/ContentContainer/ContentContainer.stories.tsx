import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ContentContainer } from './ContentContainer';
import { Box, Typography, IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const meta: Meta<typeof ContentContainer> = {
  title: 'Components/ContentContainer',
  component: ContentContainer,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    padding: { control: 'number' },
    flush: { control: 'boolean' },
  },
  args: {
    padding: 16,
    flush: false,
  },
  decorators: [
    (Story) => (
      <div style={{ width: 500, background: '#FAFAFA', padding: 16 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ContentContainer>;

export const Default: Story = {
  args: {
    children: (
      <Typography variant="body2">Basic content container with default 16px padding.</Typography>
    ),
  },
};

export const WithTitle: Story = {
  args: {
    title: 'Submission Details',
    children: (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Typography variant="body2">Facility: Emergency Room</Typography>
        <Typography variant="body2">City: Oklahoma City</Typography>
        <Typography variant="body2">Profession: Physician</Typography>
      </Box>
    ),
  },
};

export const WithTitleActions: Story = {
  args: {
    title: 'Additional Facility Information',
    titleActions: (
      <IconButton size="small">
        <MoreVertIcon fontSize="small" />
      </IconButton>
    ),
    children: (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Typography variant="body2">Sunset Grove Medical Hospital</Typography>
        <Typography variant="body2">12345 Academy Drive, Philadelphia PA 19403</Typography>
      </Box>
    ),
  },
};

export const NoPadding: Story = {
  args: {
    title: 'Tasks',
    padding: 0,
    children: (
      <Box sx={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          AG Grid fills edge-to-edge here
        </Typography>
      </Box>
    ),
  },
};

export const Flush: Story = {
  args: {
    flush: true,
    children: (
      <Typography variant="body2">No border radius — stacks flush against siblings.</Typography>
    ),
  },
};

export const Nested: Story = {
  render: () => (
    <ContentContainer title="About Prospect">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="body2">Selling points and general information here.</Typography>
        <ContentContainer title="Certifications">
          <Typography variant="body2">Board Certified, ACLS</Typography>
        </ContentContainer>
        <ContentContainer title="Program Participation">
          <Typography variant="body2">Stage: Recruit — Status: New</Typography>
        </ContentContainer>
      </Box>
    </ContentContainer>
  ),
};
