/**
 * Breadcrumb Component
 *
 * SOURCE OF TRUTH: Figma node 494:3560 (file: PjAYuPDr8IA1ccwiAjFkSD)
 *
 * Navigation path strip. Two states: 'breadcrumb' (/ divider) and 'Links' (| divider).
 * Right side supports an optional record count and an actions slot (typically ToggleButton).
 */

import React from 'react';
import { Box, Typography } from '@mui/material';
import { BreadcrumbProps, defaultBreadcrumbProps } from './Breadcrumb.types';
import { tokens } from '../../design-tokens/tokens';

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  state = defaultBreadcrumbProps.state,
  links,
  showNumberIndicator = defaultBreadcrumbProps.showNumberIndicator,
  recordCount,
  actions,
}) => {
  const divider = state === 'Links' ? '|' : '/';

  return (
    <Box
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
              /* Selected item — dark text with blue bottom underline */
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  height: 40,
                  borderBottom: `2px solid ${tokens.colors.primary.main}`,
                }}
              >
                <Typography
                  sx={{
                    fontSize: tokens.typography.fontSize.xs,
                    fontWeight: tokens.typography.fontWeight.regular,
                    color: tokens.colors.text.primary,
                    fontFamily: tokens.typography.fontFamily,
                    whiteSpace: 'nowrap',
                    lineHeight: `${tokens.typography.caption.lineHeight}px`,
                  }}
                >
                  {link.label}
                </Typography>
              </Box>
            ) : (
              /* Default link — blue, clickable */
              <Typography
                component={link.href ? 'a' : 'span'}
                href={link.href}
                sx={{
                  fontSize: tokens.typography.fontSize.xs,
                  fontWeight: tokens.typography.fontWeight.regular,
                  color: tokens.colors.primary.main,
                  fontFamily: tokens.typography.fontFamily,
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                  lineHeight: `${tokens.typography.caption.lineHeight}px`,
                  cursor: link.href ? 'pointer' : 'default',
                  '&:hover': link.href ? { textDecoration: 'underline' } : {},
                }}
              >
                {link.label}
              </Typography>
            )}

            {/* Divider — shown after every item except the last */}
            {i < links.length - 1 && (
              <Typography
                sx={{
                  fontSize: tokens.typography.fontSize.md,
                  color: tokens.colors.text.secondary,
                  fontFamily: tokens.typography.fontFamily,
                  lineHeight: `${tokens.typography.body1.lineHeight}px`,
                  flexShrink: 0,
                }}
              >
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
            <Typography
              sx={{
                fontSize: tokens.typography.fontSize.xs,
                fontWeight: tokens.typography.fontWeight.regular,
                color: tokens.colors.text.secondary,
                fontFamily: tokens.typography.fontFamily,
                whiteSpace: 'nowrap',
              }}
            >
              {recordCount !== undefined ? recordCount : '###'}
            </Typography>
          )}
          {actions}
        </Box>
      )}
    </Box>
  );
};

Breadcrumb.displayName = 'Breadcrumb';
export default Breadcrumb;
