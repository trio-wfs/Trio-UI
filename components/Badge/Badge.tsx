/**
 * Badge Component
 *
 * SOURCE OF TRUTH: Figma component "Badge" (node: 2028:6368)
 * File: PjAYuPDr8IA1ccwiAjFkSD
 *
 * EXTRACTED VALUES:
 * Default type: 16px height, 40px border radius (pill), min-width 16px
 * Dot type: 8px diameter, 40px border radius
 * Typography: 11px / 500 / 16px line-height (overline scale)
 */

import React from 'react';
import MuiBadge from '@mui/material/Badge';
import { tokens } from '../../design-tokens/tokens';
import { BadgeProps, BadgeColor, defaultBadgeProps } from './Badge.types';

// ─── Token Maps ───────────────────────────────────────────────────────────────

// Map our color tokens to background/text pairs
const colorMap: Record<BadgeColor, { bg: string; text: string }> = {
  primary:   { bg: tokens.colors.primary.main,        text: tokens.colors.primary.contrastText },
  secondary: { bg: tokens.colors.secondary.main,      text: tokens.colors.secondary.contrastText },
  error:     { bg: tokens.colors.error.main,           text: tokens.colors.error.contrastText },
  success:   { bg: tokens.colors.success.main,         text: tokens.colors.success.contrastText },
  warning:   { bg: tokens.colors.warning.main,         text: tokens.colors.warning.contrastText },
  info:      { bg: tokens.colors.info.main,            text: tokens.colors.info.contrastText },
};

// ─── Component ────────────────────────────────────────────────────────────────

export const Badge: React.FC<BadgeProps> = ({
  color = defaultBadgeProps.color,
  type = defaultBadgeProps.type,
  badgeContent = defaultBadgeProps.badgeContent,
  children,
  className,
}) => {
  const { bg, text } = colorMap[color!];
  const isDot = type === 'dot';

  return (
    <MuiBadge
      className={className}
      variant={isDot ? 'dot' : 'standard'}
      badgeContent={isDot ? undefined : badgeContent}
      sx={{
        '& .MuiBadge-badge': {
          backgroundColor: bg,
          color: text,
          fontFamily: tokens.typography.fontFamily,
          fontSize: tokens.typography.fontSize.xxs,      // 11px
          fontWeight: tokens.typography.fontWeight.medium, // 500
          lineHeight: '16px',
          letterSpacing: 0,
          // Default type: 16px height, pill shape
          // Dot type: 8px diameter
          height: isDot ? 8 : 16,
          minWidth: isDot ? 8 : 16,
          padding: isDot ? 0 : `0 ${tokens.spacing.xs}px`,
          borderRadius: tokens.borderRadius.full,        // 999px — pill
        },
      }}
    >
      {children}
    </MuiBadge>
  );
};

Badge.displayName = 'Badge';
export default Badge;
