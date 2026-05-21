/**
 * Card Component
 *
 * SOURCE OF TRUTH: Figma component "Card" (node: 7826:4)
 * Design System: TRIO WFS Desktop SaaS
 *
 * Composed surface built on Paper. Adds header / body / footer slots with
 * consistent section spacing. Composition primitive — no variant axes; states
 * are content presence handled by React props.
 */

import React from 'react';
import { Box } from '@mui/material';
import { tokens } from '../../design-tokens/tokens';
import { Paper } from '../Paper/Paper';
import { type CardProps } from './Card.types';

const PADDING_PX = {
  none: 0,
  sm: tokens.spacing.sm,   // 8
  md: tokens.spacing.md,   // 16
  lg: tokens.spacing.lg,   // 24
} as const;

export const Card = React.forwardRef<HTMLDivElement, CardProps>(({
  header,
  children,
  footer,
  level = 'paper',
  padding = 'md',
  bordered = true,
  divided = false,
  className,
  sx: sxOverride,
  role,
  ...ariaProps
}, ref) => {
  const pad = PADDING_PX[padding];
  const dividerLine = `1px solid ${tokens.colors.components.divider}`;

  return (
    <Paper
      ref={ref}
      level={level}
      padding="none"
      bordered={bordered}
      className={className}
      sx={sxOverride}
      role={role}
      {...ariaProps}
    >
      {header && (
        <Box
          sx={{
            padding: `${pad}px`,
            borderBottom: divided ? dividerLine : 'none',
          }}
        >
          {header}
        </Box>
      )}

      <Box
        sx={{
          paddingLeft: `${pad}px`,
          paddingRight: `${pad}px`,
          paddingTop: header ? (divided ? `${pad}px` : 0) : `${pad}px`,
          paddingBottom: footer ? (divided ? `${pad}px` : 0) : `${pad}px`,
          borderBottom: divided && footer ? dividerLine : 'none',
        }}
      >
        {children}
      </Box>

      {footer && (
        <Box
          sx={{
            padding: `${pad}px`,
          }}
        >
          {footer}
        </Box>
      )}
    </Paper>
  );
});

Card.displayName = 'Card';

export default Card;
