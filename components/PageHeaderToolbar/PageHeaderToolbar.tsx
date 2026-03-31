/**
 * PageHeaderToolbar Component
 *
 * SOURCE OF TRUTH: Figma node 3859:2813 (file: PjAYuPDr8IA1ccwiAjFkSD)
 *
 * The top-of-page toolbar. Contains the page title, optional eyebrow text,
 * chip tags, status indicator, right-side actions, and an optional Breadcrumb
 * strip below. Three variants control the overall structure.
 *
 * Action areas (buttons, chips, breadcrumb) accept ReactNode slots so each
 * consuming page can compose in the correct configured instances.
 */

import React from 'react';
import { Box, Typography } from '@mui/material';
import { PageHeaderToolbarProps, defaultPageHeaderToolbarProps } from './PageHeaderToolbar.types';
import { tokens } from '../../design-tokens/tokens';

export const PageHeaderToolbar: React.FC<PageHeaderToolbarProps> = ({
  variant = defaultPageHeaderToolbarProps.variant,
  pageTitleText,
  showIcons = false,
  titleIcons,
  showEyebrow = defaultPageHeaderToolbarProps.showEyebrow,
  eyebrowText,
  chips = defaultPageHeaderToolbarProps.chips,
  chipItems,
  indicator = defaultPageHeaderToolbarProps.indicator,
  indicatorLabel = 'OPEN',
  singleButton = defaultPageHeaderToolbarProps.singleButton,
  singleButtonContent,
  buttonGroup = defaultPageHeaderToolbarProps.buttonGroup,
  buttonGroupContent,
  inputTextField = false,
  inputTextFieldContent,
  breadcrumb = defaultPageHeaderToolbarProps.breadcrumb,
  breadcrumbContent,
}) => {
  const isFull = variant === 'full';
  const isNewCanvas = variant === 'NewCanvas';
  const isDefault = variant === 'default';
  const showBreadcrumb = (isFull || isNewCanvas) && breadcrumb;

  const wrapperSx = {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    borderRadius: `${tokens.borderRadius.default}px`,
    ...(isDefault && {
      backgroundColor: tokens.colors.background.paper,
      border: `1px solid ${tokens.colors.components.border.default}`,
    }),
    ...((isFull) && {
      backgroundColor: tokens.colors.background.paper,
      border: `1px solid ${tokens.colors.components.border.default}`,
    }),
  };

  return (
    <Box sx={wrapperSx}>
      {/* ── Top bar ─────────────────────────────────────────── */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          minHeight: 68,
          borderBottom: showBreadcrumb
            ? `1px solid ${tokens.colors.components.border.default}`
            : 'none',
        }}
      >
        {/* Status indicator */}
        {indicator && (
          <Box
            sx={{
              display: 'flex',
              alignSelf: 'stretch',
              alignItems: 'center',
              justifyContent: 'center',
              width: 80,
              backgroundColor: tokens.colors.primary.main,
              flexShrink: 0,
            }}
          >
            <Typography
              sx={{
                fontSize: tokens.typography.fontSize.xs,
                fontWeight: tokens.typography.fontWeight.regular,
                color: tokens.colors.base.white,
                fontFamily: tokens.typography.fontFamily,
                letterSpacing: '0.5px',
              }}
            >
              {indicatorLabel}
            </Typography>
          </Box>
        )}

        {/* Main content row */}
        <Box
          sx={{
            display: 'flex',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: `${tokens.spacing.md}px`,
            p: `${tokens.spacing.md}px`,
          }}
        >
          {/* Title + chips + eyebrow */}
          <Box
            sx={{
              display: 'flex',
              flex: 1,
              flexDirection: 'column',
              gap: `${tokens.spacing.sm}px`,
              minWidth: 0,
            }}
          >
            {/* Title row */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px', flexWrap: 'wrap' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Typography
                  sx={{
                    fontSize: tokens.typography.fontSize.xl,
                    fontWeight: tokens.typography.fontWeight.medium,
                    color: tokens.colors.text.primary,
                    fontFamily: tokens.typography.fontFamily,
                    lineHeight: `${tokens.typography.h6.lineHeight}px`,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {pageTitleText}
                </Typography>
                {showIcons && titleIcons && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    {titleIcons}
                  </Box>
                )}
              </Box>

              {/* Chips (full variant only) */}
              {isFull && chips && chipItems && (
                <Box
                  sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    gap: `${tokens.spacing.sm}px`,
                  }}
                >
                  {chipItems}
                </Box>
              )}
            </Box>

            {/* Eyebrow text */}
            {showEyebrow && eyebrowText && (
              <Typography
                sx={{
                  fontSize: tokens.typography.fontSize.xs,
                  fontWeight: tokens.typography.fontWeight.regular,
                  color: tokens.colors.text.secondary,
                  fontFamily: tokens.typography.fontFamily,
                  lineHeight: `${tokens.typography.caption.lineHeight}px`,
                  whiteSpace: 'nowrap',
                }}
              >
                {eyebrowText}
              </Typography>
            )}
          </Box>

          {/* Right-side actions */}
          {inputTextField && inputTextFieldContent && inputTextFieldContent}
          {singleButton && singleButtonContent && singleButtonContent}
          {buttonGroup && buttonGroupContent && buttonGroupContent}
        </Box>
      </Box>

      {/* ── Breadcrumb strip ────────────────────────────────── */}
      {showBreadcrumb && breadcrumbContent && (
        <Box>{breadcrumbContent}</Box>
      )}
    </Box>
  );
};

PageHeaderToolbar.displayName = 'PageHeaderToolbar';
export default PageHeaderToolbar;
