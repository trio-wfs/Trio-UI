/**
 * Paper Component
 *
 * SOURCE OF TRUTH: Figma component "Paper" (node: 7824:2)
 * Design System: TRIO WFS Desktop SaaS
 *
 * Static surface primitive. Five layered tiers, border-stroke only — no shadows
 * at rest. Hover-shadow behavior lives on interactive wrappers, not on Paper.
 *
 * The `subtle` tier is a transparent 2% black overlay that composes with its
 * parent surface — sits 1 step "down" from whatever it's nested inside.
 */

import React from 'react';
import { Box } from '@mui/material';
import { tokens } from '../../design-tokens/tokens';
import { type PaperProps } from './Paper.types';

const LEVEL_BG = {
  default: tokens.colors.background.default,     // #F5F5F5
  secondary: tokens.colors.background.secondary, // #FAFAFA
  subtle: tokens.colors.background.subtle,       // rgba(255, 255, 255, 0.5) — 50% white overlay
  paper: tokens.colors.background.paper,         // #FFFFFF
  accent: tokens.colors.background.accent,       // #E4F7FD
} as const;

const PADDING_PX = {
  none: 0,
  sm: tokens.spacing.sm,   // 8
  md: tokens.spacing.md,   // 16
  lg: tokens.spacing.lg,   // 24
} as const;

export const Paper = React.forwardRef<HTMLDivElement, PaperProps>(({
  level = 'paper',
  padding = 'md',
  bordered = true,
  children,
  className,
  sx: sxOverride,
  role,
  ...ariaProps
}, ref) => {
  return (
    <Box
      ref={ref}
      role={role}
      className={className}
      {...ariaProps}
      sx={[
        {
          backgroundColor: LEVEL_BG[level],
          padding: `${PADDING_PX[padding]}px`,
          borderRadius: `${tokens.borderRadius.default}px`,
          border: bordered
            ? `1px solid ${tokens.colors.components.border.default}`
            : 'none',
          // No box-shadow at rest — interactive wrappers add hover shadows
          boxShadow: 'none',
        },
        ...(Array.isArray(sxOverride) ? sxOverride : sxOverride ? [sxOverride] : []),
      ]}
    >
      {children}
    </Box>
  );
});

Paper.displayName = 'Paper';

export default Paper;
