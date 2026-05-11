/**
 * Breadcrumb Component
 *
 * SOURCE OF TRUTH: Figma node 494:3560 (file: PjAYuPDr8IA1ccwiAjFkSD)
 *
 * Navigation path strip. Two states: 'breadcrumb' (/ divider) and 'Links' (| divider).
 * Right side supports an optional record count and an actions slot (typically ToggleButton).
 *
 * Theme migration (2026-04-15):
 * - Inline Typography sx replaced with `variant="caption"` (12/400/18 matches Figma)
 *   for all path items and record count. Divider character uses `variant="body1"`
 *   (16/400) with secondary-text color override.
 */

import React from 'react';
import { Box, Typography } from '@mui/material';
import { type BreadcrumbProps, defaultBreadcrumbProps } from './Breadcrumb.types';
import { tokens } from '../../design-tokens/tokens';

export const Breadcrumb = React.forwardRef<HTMLDivElement, BreadcrumbProps>(({
  state = defaultBreadcrumbProps.state,
  links,
  showNumberIndicator = defaultBreadcrumbProps.showNumberIndicator,
  recordCount,
  actions,
}, ref) => {
  const divider = state === 'Links' ? '|' : '/';

  return (
    <Box
      ref={ref}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 40,
        px: `${tokens.spacing.md}px`,
        backgroundColor: tokens.colors.background.secondary,
        borderRadius: `${tokens.borderRadius.default}px`,
        overflow: 'hidden',
      }}
    >
      {/* Left: path links */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: `${tokens.spacing.sm}px`, overflow: 'hidden' }}>
        {links.map((link, i) => (
          <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: `${tokens.spacing.sm}px`, flexShrink: 0 }}>
            {link.selected ? (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  height: 40,
                  borderBottom: `2px solid ${tokens.colors.primary.main}`,
                }}
              >
                <Typography variant="caption" sx={{ whiteSpace: 'nowrap' }}>
                  {link.label}
                </Typography>
              </Box>
            ) : (
              <Typography
                variant="caption"
                component={link.href ? 'a' : 'span'}
                href={link.href}
                sx={{
                  color: tokens.colors.primary.main,
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                  cursor: link.href ? 'pointer' : 'default',
                  '&:hover': link.href ? { textDecoration: 'underline' } : {},
                }}
              >
                {link.label}
              </Typography>
            )}

            {i < links.length - 1 && (
              <Typography variant="body1" sx={{ color: tokens.colors.components.border.default, flexShrink: 0 }}>
                {divider}
              </Typography>
            )}
          </Box>
        ))}
      </Box>

      {/* Right: optional record count + actions slot */}
      {(showNumberIndicator || actions) && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: `${tokens.spacing.md}px`, flexShrink: 0 }}>
          {showNumberIndicator && (
            <Typography variant="caption" sx={{ color: tokens.colors.text.secondary, whiteSpace: 'nowrap' }}>
              {recordCount !== undefined ? recordCount : '###'}
            </Typography>
          )}
          {actions}
        </Box>
      )}
    </Box>
  );
});

Breadcrumb.displayName = 'Breadcrumb';
export default Breadcrumb;
