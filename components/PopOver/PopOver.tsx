/**
 * PopOver Component
 *
 * SOURCE OF TRUTH: Figma component "PopOver" (node: 3868:50794)
 * Design System: AHTG Desktop SaaS
 *
 * EXTRACTED VALUES FROM FIGMA:
 * - Width: 450px (default)
 * - Background: #FFFFFF (paper)
 * - Border radius: 4px
 * - Shadow: 0px 8px 16px rgba(0,0,0,0.15)
 * - Border: 1px solid #E0E0E0
 * - Padding: 16px vertical, 24px horizontal
 * - Max height: 425px, overflow scroll
 * - Header: title 16px Roboto Medium #212121, action link 12px #2196F3
 * - Divider below header: #E0E0E0
 * - Scrollbar: 4px wide, #E0E0E0, 4px radius
 */

import React from 'react';
import { Popover, Divider, Typography, Box } from '@mui/material';
import { type PopOverProps, defaultPopOverProps } from './PopOver.types';
import { tokens } from '../../design-tokens/tokens';

export const PopOver = React.forwardRef<HTMLDivElement, PopOverProps>(({
  anchorEl,
  open,
  onClose,
  title,
  actionLabel,
  onAction,
  children,
  width = defaultPopOverProps.width,
  maxHeight = defaultPopOverProps.maxHeight,
  className,
}, ref) => {
  const hasHeader = Boolean(title);

  return (
    <Popover
      ref={ref}
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      className={className}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      slotProps={{
        paper: {
          sx: {
            width: `${width}px`,
            backgroundColor: tokens.colors.background.paper,
            borderRadius: `${tokens.borderRadius.default}px`,
            boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.15)',
            border: `1px solid ${tokens.colors.components.border.default}`,
            overflow: 'hidden',
          },
        },
      }}
    >
      {/* Header */}
      {hasHeader && (
        <>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingX: `${tokens.spacing.lg}px`,
              paddingY: `${tokens.spacing.md}px`,
            }}
          >
            <Typography
              sx={{
                fontFamily: tokens.typography.fontFamily,
                fontSize: `${tokens.typography.fontSize.md}px`,
                fontWeight: tokens.typography.fontWeight.medium,
                color: tokens.colors.text.primary,
                lineHeight: 1,
              }}
            >
              {title}
            </Typography>

            {actionLabel && (
              <Typography
                component="button"
                onClick={onAction}
                sx={{
                  fontFamily: tokens.typography.fontFamily,
                  fontSize: `${tokens.typography.fontSize.xs}px`,
                  fontWeight: tokens.typography.fontWeight.regular,
                  color: tokens.colors.primary.main,
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  lineHeight: 1,
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                  '&:focus-visible': {
                    outline: `2px solid ${tokens.colors.components.border.focus}`,
                    outlineOffset: '2px',
                    borderRadius: `${tokens.borderRadius.sm}px`,
                  },
                }}
              >
                {actionLabel}
              </Typography>
            )}
          </Box>

          <Divider sx={{ borderColor: tokens.colors.components.divider }} />
        </>
      )}

      {/* Scrollable Content Area */}
      <Box
        sx={{
          maxHeight: `${maxHeight}px`,
          overflowY: 'auto',
          paddingX: `${tokens.spacing.lg}px`,
          paddingY: `${tokens.spacing.md}px`,
          // Custom scrollbar styling
          '&::-webkit-scrollbar': {
            width: '4px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'transparent',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: tokens.colors.components.border.default,
            borderRadius: '4px',
          },
          // Firefox
          scrollbarWidth: 'thin',
          scrollbarColor: `${tokens.colors.components.border.default} transparent`,
        }}
      >
        {children}
      </Box>
    </Popover>
  );
});

PopOver.displayName = 'PopOver';

export default PopOver;
