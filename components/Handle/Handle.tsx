/**
 * Handle Component
 *
 * SOURCE OF TRUTH: Figma node 5460:2553 (file: PjAYuPDr8IA1ccwiAjFkSD)
 *
 * Drag handle used for reorderable lists and rows.
 * Hover and drag states are CSS-driven via :hover and :active pseudo-selectors.
 * The `state` prop is for showcase/Storybook only.
 */

import React from 'react';
import { Box } from '@mui/material';
import { HandleProps, defaultHandleProps } from './Handle.types';
import { tokens } from '../../design-tokens/tokens';

// Shared active/hover background
const HANDLE_HOVER_BG = 'rgba(33, 150, 243, 0.05)';

// Forced-state sx overrides for showcase use
const forcedStateStyles = {
  default: {},
  hover: {
    width: 24,
    height: 24,
    backgroundColor: HANDLE_HOVER_BG,
    '& .handle-icon': {
      color: tokens.colors.primary.main,
      fontSize: 16,
    },
  },
  drag: {
    width: 32,
    height: 32,
    backgroundColor: HANDLE_HOVER_BG,
    boxShadow: tokens.shadows.sm,
    '& .handle-icon': {
      color: tokens.colors.primary.main,
      fontSize: 16,
    },
  },
};

export const Handle = React.forwardRef<HTMLDivElement, HandleProps>(
  (
    {
      state = defaultHandleProps.state,
      disabled = defaultHandleProps.disabled,
      className,
      onDragStart,
      onDragEnd,
    },
    ref
  ) => {
    return (
      <Box
        ref={ref}
        className={className}
        draggable={!disabled}
        onDragStart={disabled ? undefined : onDragStart}
        onDragEnd={disabled ? undefined : onDragEnd}
        aria-disabled={disabled}
        role="button"
        aria-label="Drag to reorder"
        sx={{
          // Base — default state
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 24,
          height: 24,
          borderRadius: `${tokens.borderRadius.default}px`,
          backgroundColor: 'transparent',
          cursor: disabled ? 'not-allowed' : 'grab',
          flexShrink: 0,
          transition: 'width 150ms ease, height 150ms ease, background-color 150ms ease, box-shadow 150ms ease',
          userSelect: 'none',

          '& .handle-icon': {
            fontFamily: '"Material Icons"',
            fontStyle: 'normal',
            fontSize: 16,
            lineHeight: 1,
            color: disabled
              ? tokens.colors.components.icon.disabled
              : tokens.colors.components.icon.default,
            transition: 'color 150ms ease, font-size 150ms ease',
            pointerEvents: 'none',
            userSelect: 'none',
          },

          // CSS-driven hover state (only when not disabled)
          ...(!disabled && {
            '&:hover': {
              backgroundColor: HANDLE_HOVER_BG,
              '& .handle-icon': {
                color: tokens.colors.primary.main,
              },
            },

            // CSS-driven drag/active state
            '&:active': {
              width: 32,
              height: 32,
              backgroundColor: HANDLE_HOVER_BG,
              boxShadow: tokens.shadows.sm,
              cursor: 'grabbing',
              '& .handle-icon': {
                color: tokens.colors.primary.main,
              },
            },
          }),

          // Forced state override (showcase/Storybook only)
          ...(state && state !== 'default' ? forcedStateStyles[state] : {}),
        }}
      >
        <span className="handle-icon material-icons">drag_indicator</span>
      </Box>
    );
  }
);

Handle.displayName = 'Handle';
export default Handle;
