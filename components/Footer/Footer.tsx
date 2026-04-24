/**
 * Footer Component
 *
 * SOURCE OF TRUTH: Figma node 5662:9435 (file: PjAYuPDr8IA1ccwiAjFkSD)
 *
 * Single-row application footer. Copyright text left, legal links right.
 * Sits at the bottom of every TRIO WFS page.
 */

import React from 'react';
import { Box, Typography, Link } from '@mui/material';
import { FooterProps, defaultFooterProps } from './Footer.types';
import { tokens } from '../../design-tokens/tokens';

export const Footer: React.FC<FooterProps> = ({
  copyrightText = defaultFooterProps.copyrightText,
  links = defaultFooterProps.links!,
}) => {
  return (
    <Box
      component="footer"
      sx={{
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        position: 'sticky',
        bottom: 0,
        zIndex: 1,
        backgroundColor: tokens.colors.background.default,
        borderTop: `1px solid ${tokens.colors.components.border.default}`,
        px: `${tokens.spacing.sm}px`,
        py: `${tokens.spacing.xs}px`,
      }}
    >
      {/* Left — copyright */}
      <Typography
        variant="caption"
        sx={{
          flex: 1,
          color: tokens.colors.text.secondary,
          letterSpacing: '0.4px',
        }}
      >
        {copyrightText}
      </Typography>

      {/* Right — legal links */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
      >
        {links.map((link, index) => (
          <React.Fragment key={link.label}>
            {index > 0 && (
              <Typography
                variant="caption"
                sx={{
                  color: tokens.colors.text.secondary,
                  mx: `${tokens.spacing.xs}px`,
                }}
              >
                |
              </Typography>
            )}
            <Link
              href={link.href}
              onClick={link.onClick}
              underline="none"
              sx={{
                fontFamily: tokens.typography.fontFamily,
                fontSize: `${tokens.typography.fontSize.xs}px`,
                fontWeight: tokens.typography.fontWeight.regular,
                lineHeight: 1.66,
                color: tokens.colors.primary.main,
                cursor: 'pointer',
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              {link.label}
            </Link>
          </React.Fragment>
        ))}
      </Box>
    </Box>
  );
};

Footer.displayName = 'Footer';
export default Footer;
