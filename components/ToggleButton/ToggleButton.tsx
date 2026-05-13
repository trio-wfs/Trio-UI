/**
 * ToggleButton Component
 *
 * SOURCE OF TRUTH: Figma node 6950:485 (file: PjAYuPDr8IA1ccwiAjFkSD)
 *
 * A grouped strip of icon buttons sharing a single blue border. Used in toolbars
 * and breadcrumb bars as compact view/action toggles. Accepts 3–8 button slots.
 * Wraps ButtonIcon internally; the shared border and dividers are managed here.
 */

import React from 'react';
import { Box, IconButton } from '@mui/material';
import { type ToggleButtonProps, defaultToggleButtonProps } from './ToggleButton.types';
import { tokens } from '../../design-tokens/tokens';

export const ToggleButton = React.forwardRef<HTMLDivElement, ToggleButtonProps>(({
  size = defaultToggleButtonProps.size,
  buttons,
}, ref) => {
  // Slot sizes per Figma node 6950:485:
  //   small: tokens.controls.ghostHeight (24) — compact toolbar slot
  //   medium: tokens.controls.height.medium (38) — matches form-row controls
  const slotSize = size === 'small' ? tokens.controls.ghostHeight : tokens.controls.height.medium;
  const iconSize = size === 'small' ? 16 : 24;

  return (
    <Box
      ref={ref}
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        border: `1px solid ${tokens.colors.primary.main}`,
        borderRadius: `${tokens.borderRadius.default}px`,
        overflow: 'hidden',
      }}
    >
      {buttons.map((btn, i) => (
        <IconButton
          key={i}
          onClick={btn.onClick}
          aria-label={btn['aria-label']}
          sx={{
            width: slotSize,
            height: slotSize,
            padding: 0,
            borderRadius: 0,
            color: tokens.colors.primary.main,
            backgroundColor: btn.active
              ? tokens.colors.primary.light
              : 'transparent',
            borderRight:
              i < buttons.length - 1
                ? `1px solid ${tokens.colors.primary.main}`
                : 'none',
            '& .MuiSvgIcon-root': { fontSize: iconSize },
            '&:hover': {
              backgroundColor: tokens.colors.primary.light,
            },
            '&:active': {
              backgroundColor: tokens.colors.primary.light,
            },
          }}
        >
          {btn.icon}
        </IconButton>
      ))}
    </Box>
  );
});

ToggleButton.displayName = 'ToggleButton';
export default ToggleButton;
