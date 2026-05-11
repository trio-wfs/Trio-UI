import type { Meta, StoryObj } from '@storybook/react';
import { Box, Typography } from '@mui/material';
import { Handle } from './Handle';
import { tokens } from '../../design-tokens/tokens';

const meta: Meta<typeof Handle> = {
  title: 'Components/Handle',
  component: Handle,
  tags: ['autodocs'],
  argTypes: {
    state: {
      control: 'select',
      options: ['default', 'hover', 'drag'],
      description: 'Forced visual state — for showcase only. Real state is CSS-driven.',
    },
    disabled: { control: 'boolean' },
  },
  args: {
    state: 'default',
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof Handle>;

// ─── Default ────────────────────────────────────────────────────────────────

export const Default: Story = {};

// ─── All States (forced, side-by-side) ──────────────────────────────────────

export const AllStates: Story = {
  render: () => (
    <Box sx={{ display: 'flex', gap: tokens.spacing.xl, alignItems: 'center' }}>
      {(['default', 'hover', 'drag'] as const).map((s) => (
        <Box key={s} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: tokens.spacing.sm }}>
          <Handle state={s} />
          <Typography variant="caption" sx={{ color: tokens.colors.text.secondary, fontFamily: tokens.typography.fontFamily }}>
            {s}
          </Typography>
        </Box>
      ))}
    </Box>
  ),
};

// ─── Disabled ────────────────────────────────────────────────────────────────

export const Disabled: Story = {
  args: { disabled: true },
};

// ─── Interactive — reorderable list context ───────────────────────────────────

const listItems = [
  { id: 1, label: 'Registered Nurse — ICU' },
  { id: 2, label: 'Travel Nurse — ER' },
  { id: 3, label: 'CNA — Step-Down Unit' },
  { id: 4, label: 'LPN — Med-Surg' },
];

export const Interactive: Story = {
  render: () => (
    <Box
      sx={{
        width: 360,
        border: `1px solid ${tokens.colors.components.border.default}`,
        borderRadius: `${tokens.borderRadius.default}px`,
        backgroundColor: tokens.colors.background.paper,
        overflow: 'hidden',
      }}
    >
      {listItems.map((item, index) => (
        <Box
          key={item.id}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: tokens.spacing.sm,
            px: `${tokens.spacing.md}px`,
            py: `${tokens.spacing.sm}px`,
            borderBottom:
              index < listItems.length - 1
                ? `1px solid ${tokens.colors.components.border.default}`
                : 'none',
            '&:hover': {
              backgroundColor: tokens.colors.action.hover,
            },
          }}
        >
          <Handle
            onDragStart={(e) => {
              e.dataTransfer.effectAllowed = 'move';
            }}
          />
          <Typography
            variant="body2"
            sx={{
              color: tokens.colors.text.primary,
              fontFamily: tokens.typography.fontFamily,
            }}
          >
            {item.label}
          </Typography>
        </Box>
      ))}
    </Box>
  ),
};
