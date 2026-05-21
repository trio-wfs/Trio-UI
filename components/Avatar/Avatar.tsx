/**
 * Avatar Component
 *
 * SOURCE OF TRUTH: Figma component "Avatar" (node: 7814:2)
 * Design System: TRIO WFS Desktop SaaS
 *
 * Identity primitive for user/agency post authors. The anonymized variant
 * powers cross-agency privacy in shared threads (Job Q&A Board).
 *
 * Non-interactive — no hover / focus / disabled states by design.
 */

import React from 'react';
import { Box } from '@mui/material';
import { tokens } from '../../design-tokens/tokens';
import { type AvatarProps } from './Avatar.types';

// Figma-extracted geometry. Avatar diameter is a component-specific dimension,
// not a spacing token — kept local rather than over-tokenizing.
const SIZE_PX = {
  small: 24,
  medium: 32,
} as const;

const COLOR_BG = {
  staff: tokens.colors.brand.headerStrip,             // #607D8B — TRIO slate (Staff anchor)
  primary: tokens.colors.primary.main,                 // #2196F3
  info: tokens.colors.info.main,                       // #54AFCA
  success: tokens.colors.success.main,                 // #388E3C
  warning: tokens.colors.warning.main,                 // #E17109
  error: tokens.colors.error.main,                     // #DB4537
  dataviz: tokens.colors.dataViz.teal,                 // #37636B (dark teal from Charts)
  anonymized: tokens.colors.components.icon.disabled,  // #9E9E9E — matches Figma grey/500
} as const;

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(({
  size = 'medium',
  color = 'staff',
  initials = 'JS',
  className,
  sx: sxOverride,
  ...ariaProps
}, ref) => {
  const dim = SIZE_PX[size];
  const bg = COLOR_BG[color];
  // small → 11px (overline); medium → 14px (subtitle2)
  const fontSize =
    size === 'small'
      ? tokens.typography.fontSize.xxs
      : tokens.typography.fontSize.sm;

  return (
    <Box
      ref={ref}
      role="img"
      aria-label={ariaProps['aria-label'] ?? `Avatar: ${initials}`}
      className={className}
      sx={[
        {
          width: dim,
          height: dim,
          borderRadius: '50%',
          backgroundColor: bg,
          color: tokens.colors.base.white,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: tokens.typography.fontFamily,
          fontWeight: tokens.typography.fontWeight.medium,
          fontSize: `${fontSize}px`,
          lineHeight: 1,
          userSelect: 'none',
          flexShrink: 0,
        },
        ...(Array.isArray(sxOverride) ? sxOverride : sxOverride ? [sxOverride] : []),
      ]}
    >
      {initials}
    </Box>
  );
});

Avatar.displayName = 'Avatar';

export default Avatar;
