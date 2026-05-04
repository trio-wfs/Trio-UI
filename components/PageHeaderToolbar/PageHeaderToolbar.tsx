/**
 * PageHeaderToolbar Component
 *
 * SOURCE OF TRUTH: Figma node 3859:2813 (file: PjAYuPDr8IA1ccwiAjFkSD)
 *
 * The top-of-page toolbar. Contains the page title, optional eyebrow text,
 * chip tags, status indicator, right-side actions, and an optional Breadcrumb
 * strip below. Three variants control the overall structure.
 *
 * Theme migration (2026-04-15):
 * - Inline Typography sx replaced with `variant="h6|body2|caption"` —
 *   Figma specs already match theme variants exactly.
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Box, Typography } from '@mui/material';
import { PageHeaderToolbarProps, defaultPageHeaderToolbarProps } from './PageHeaderToolbar.types';
import { tokens } from '../../design-tokens/tokens';

export const PageHeaderToolbar = React.forwardRef<HTMLDivElement, PageHeaderToolbarProps>(({
  variant = defaultPageHeaderToolbarProps.variant,
  pageTitleText,
  titleIcons,
  eyebrowText,
  chipItems,
  indicatorLabel,
  singleButtonContent,
  buttonGroupContent,
  inputTextFieldContent,
  breadcrumbContent,
  scrollContainerRef,
}, ref) => {
  const isFull = variant === 'full';
  const isNewCanvas = variant === 'NewCanvas';
  const isDefault = variant === 'default';
  const showBreadcrumb = (isFull || isNewCanvas) && !!breadcrumbContent;
  const withBorder = isDefault || isFull;

  // NewCanvas: fade in a bottom divider when the page scrolls
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = useCallback(() => {
    const target = scrollContainerRef?.current;
    const scrollTop = target ? target.scrollTop : window.scrollY;
    setIsScrolled(scrollTop > 0);
  }, [scrollContainerRef]);

  useEffect(() => {
    if (!isNewCanvas) return;
    const target = scrollContainerRef?.current ?? window;
    target.addEventListener('scroll', handleScroll as EventListener, { passive: true });
    handleScroll();
    return () => target.removeEventListener('scroll', handleScroll as EventListener);
  }, [isNewCanvas, handleScroll, scrollContainerRef]);

  return (
    <Box
      ref={ref}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        borderRadius: `${tokens.borderRadius.default}px`,
        ...(withBorder && {
          backgroundColor: tokens.colors.background.paper,
          border: `1px solid ${tokens.colors.components.border.default}`,
        }),
      }}
    >
      {/* ── Top bar ─────────────────────────────────────────── */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          minHeight: 56,
          borderBottom: showBreadcrumb
            ? `1px solid ${tokens.colors.components.border.default}`
            : 'none',
        }}
      >
        {/* Status indicator */}
        {indicatorLabel && (
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
            <Typography variant="caption" sx={{ color: tokens.colors.base.white, letterSpacing: '0.5px' }}>
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
          <Box sx={{ display: 'flex', flex: 1, flexDirection: 'column', gap: `${tokens.spacing.xs}px`, minWidth: 0 }}>
            {/* Title row */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px', flexWrap: 'wrap' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Typography variant="h6" sx={{ whiteSpace: 'nowrap' }}>
                  {pageTitleText}
                </Typography>
                {titleIcons && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    {titleIcons}
                  </Box>
                )}
              </Box>

              {/* Chips (full variant only) */}
              {isFull && chipItems && (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: `${tokens.spacing.sm}px` }}>
                  {chipItems}
                </Box>
              )}
            </Box>

            {/* Eyebrow text */}
            {eyebrowText && (
              <Typography variant="caption" sx={{ color: tokens.colors.text.secondary, whiteSpace: 'nowrap' }}>
                {eyebrowText}
              </Typography>
            )}
          </Box>

          {/* Right-side actions */}
          {inputTextFieldContent}
          {singleButtonContent}
          {buttonGroupContent}
        </Box>
      </Box>

      {/* ── Breadcrumb strip ────────────────────────────────── */}
      {showBreadcrumb && breadcrumbContent && <Box>{breadcrumbContent}</Box>}

      {/* ── Scroll divider (NewCanvas only) ───────────────── */}
      {isNewCanvas && (
        <Box
          sx={{
            height: '1px',
            backgroundColor: tokens.colors.components.divider,
            opacity: isScrolled ? 1 : 0,
            transition: 'opacity 200ms ease',
          }}
        />
      )}
    </Box>
  );
});

PageHeaderToolbar.displayName = 'PageHeaderToolbar';
export default PageHeaderToolbar;
