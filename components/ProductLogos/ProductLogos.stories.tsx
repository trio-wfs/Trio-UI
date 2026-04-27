import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Box } from '@mui/material';
import { ProductLogos } from './ProductLogos';
import { tokens } from '../../design-tokens/tokens';

const meta: Meta<typeof ProductLogos> = {
  title: 'Components/ProductLogos',
  component: ProductLogos,
  tags: ['autodocs'],
  argTypes: {
    logoType: {
      control: 'select',
      options: ['dark', 'white', 'logoOnly'],
      description: 'Logo variant — determines which SVG asset is rendered',
    },
    width: {
      control: { type: 'number', min: 24, max: 600, step: 1 },
      description: 'Rendered width in px (height derives from aspect ratio when omitted)',
    },
    height: {
      control: { type: 'number', min: 24, max: 300, step: 1 },
      description: 'Rendered height in px (width derives from aspect ratio when omitted)',
    },
    alt: {
      control: 'text',
      description: 'Alt text for the image element',
    },
  },
  args: {
    logoType: 'dark',
    alt: 'TRIO',
  },
};

export default meta;
type Story = StoryObj<typeof ProductLogos>;

// -------------------------------------------------------------------
// DarkLettering — full logo on a light background (the default case)
// -------------------------------------------------------------------
export const DarkLettering: Story = {
  name: 'Dark Lettering',
  args: {
    logoType: 'dark',
  },
  decorators: [
    (Story) => (
      <Box sx={{ p: 3, backgroundColor: tokens.colors.background?.default ?? '#FFFFFF', display: 'inline-flex' }}>
        <Story />
      </Box>
    ),
  ],
};

// -------------------------------------------------------------------
// WhiteLettering — full logo on a dark background
// -------------------------------------------------------------------
export const WhiteLettering: Story = {
  name: 'White Lettering',
  args: {
    logoType: 'white',
  },
  decorators: [
    (Story) => (
      <Box sx={{ p: 3, backgroundColor: tokens.colors.text?.primary ?? '#212121', display: 'inline-flex', borderRadius: '4px' }}>
        <Story />
      </Box>
    ),
  ],
};

// -------------------------------------------------------------------
// LogoOnly — hexagon icon, no wordmark
// -------------------------------------------------------------------
export const LogoOnly: Story = {
  name: 'Logo Only',
  args: {
    logoType: 'logoOnly',
  },
  decorators: [
    (Story) => (
      <Box sx={{ p: 3, backgroundColor: '#FFFFFF', display: 'inline-flex' }}>
        <Story />
      </Box>
    ),
  ],
};

// -------------------------------------------------------------------
// CustomSize — explicit width override
// -------------------------------------------------------------------
export const CustomSize: Story = {
  name: 'Custom Size',
  args: {
    logoType: 'dark',
    width: 120,
  },
  decorators: [
    (Story) => (
      <Box sx={{ p: 3, backgroundColor: '#FFFFFF', display: 'inline-flex' }}>
        <Story />
      </Box>
    ),
  ],
};

// -------------------------------------------------------------------
// AllVariants — all three logos side by side for quick comparison
// -------------------------------------------------------------------
export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
      {/* Dark on white */}
      <Box
        sx={{
          p: 3,
          backgroundColor: '#FFFFFF',
          border: `1px solid ${tokens.colors.components?.border?.default ?? '#E0E0E0'}`,
          borderRadius: '4px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <ProductLogos logoType="dark" />
        <Box
          component="span"
          sx={{
            fontFamily: tokens.typography.fontFamily,
            fontSize: '12px',
            color: tokens.colors.text?.secondary ?? '#757575',
          }}
        >
          dark
        </Box>
      </Box>

      {/* White on dark */}
      <Box
        sx={{
          p: 3,
          backgroundColor: tokens.colors.text?.primary ?? '#212121',
          borderRadius: '4px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <ProductLogos logoType="white" />
        <Box
          component="span"
          sx={{
            fontFamily: tokens.typography.fontFamily,
            fontSize: '12px',
            color: '#FFFFFF',
          }}
        >
          white
        </Box>
      </Box>

      {/* Logo only on white */}
      <Box
        sx={{
          p: 3,
          backgroundColor: '#FFFFFF',
          border: `1px solid ${tokens.colors.components?.border?.default ?? '#E0E0E0'}`,
          borderRadius: '4px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <ProductLogos logoType="logoOnly" />
        <Box
          component="span"
          sx={{
            fontFamily: tokens.typography.fontFamily,
            fontSize: '12px',
            color: tokens.colors.text?.secondary ?? '#757575',
          }}
        >
          logoOnly
        </Box>
      </Box>
    </Box>
  ),
};
