/**
 * Badge Component
 *
 * SOURCE OF TRUTH: Figma component "Badge" (node: 2028:6368)
 *
 * Theme migration (2026-04-15):
 * - All sizing (standard 16px pill, dot 8px) and typography (11px/500/16px)
 *   live in theme at components.MuiBadge.styleOverrides.
 * - Color is handled natively by MUI's `color` prop + theme palette —
 *   the old custom colorMap is gone. Our palette already has the right
 *   primary/secondary/error/success/warning/info entries.
 */

import React from 'react';
import MuiBadge from '@mui/material/Badge';
import { BadgeProps, defaultBadgeProps } from './Badge.types';

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(({
  color = defaultBadgeProps.color,
  type = defaultBadgeProps.type,
  badgeContent = defaultBadgeProps.badgeContent,
  children,
  className,
}, ref) => {
  const isDot = type === 'dot';

  return (
    <MuiBadge
      ref={ref}
      className={className}
      color={color}
      variant={isDot ? 'dot' : 'standard'}
      badgeContent={isDot ? undefined : badgeContent}
    >
      {children}
    </MuiBadge>
  );
});

Badge.displayName = 'Badge';
export default Badge;
