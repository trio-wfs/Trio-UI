/**
 * SplitButton Component
 *
 * SOURCE OF TRUTH: Figma node 5428:4183 (file: PjAYuPDr8IA1ccwiAjFkSD)
 *
 * Two joined segments:
 *   - Left: label button — triggers the primary action
 *   - Right: arrow_drop_down icon button — opens a Menu dropdown
 *
 * Only sm/contained exists in Figma. color: primary | secondary.
 */

import React, { useRef } from 'react';
import { Box, IconButton, Popover, Typography } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { SplitButtonProps, defaultSplitButtonProps } from './SplitButton.types';
import { Menu } from '../Menu/Menu';
import { tokens } from '../../design-tokens/tokens';

export const SplitButton = React.forwardRef<HTMLDivElement, SplitButtonProps>(({
  label,
  color = defaultSplitButtonProps.color!,
  open = defaultSplitButtonProps.open!,
  onClick,
  onMenuToggle,
  menuItems = [],
  anchorEl,
  startIcon,
  disabled = defaultSplitButtonProps.disabled!,
}, ref) => {
  const arrowRef = useRef<HTMLButtonElement>(null);

  const isPrimary = color === 'primary';

  // ── Shared token values ──────────────────────────────────────
  const height = 32; // button/sm from Figma
  const fontSize = tokens.typography.button.sm.fontSize;
  const fontWeight = tokens.typography.button.sm.fontWeight;

  // ── Color scheme ─────────────────────────────────────────────
  const bg = isPrimary ? tokens.colors.primary.main : tokens.colors.secondary.main;
  const bgHover = isPrimary ? tokens.colors.primary.dark : tokens.colors.action.hover;
  const textColor = isPrimary ? tokens.colors.base.white : tokens.colors.secondary.dark;
  const borderColor = isPrimary ? 'transparent' : tokens.colors.secondary.outline;
  const dividerColor = isPrimary
    ? 'rgba(255,255,255,0.3)'
    : tokens.colors.secondary.outline;

  const sharedButtonSx = {
    height,
    backgroundColor: disabled ? tokens.colors.action.disabledBackground : bg,
    color: disabled ? tokens.colors.text.disabled : textColor,
    fontFamily: tokens.typography.fontFamily,
    fontSize,
    fontWeight,
    textTransform: 'none' as const,
    borderRadius: 0,
    border: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'background-color 200ms',
    '&:hover': {
      backgroundColor: disabled ? undefined : bgHover,
    },
  };

  return (
    <>
      {/* ── Wrapper ───────────────────────────────────────────── */}
      <Box
        ref={ref}
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          borderRadius: `${tokens.borderRadius.default}px`,
          border: `1px solid ${borderColor}`,
          overflow: 'hidden',
          opacity: disabled ? 0.6 : 1,
        }}
      >
        {/* ── Label segment ─────────────────────────────────── */}
        <Box
          component="button"
          onClick={disabled ? undefined : onClick}
          disabled={disabled}
          sx={{
            ...sharedButtonSx,
            display: 'flex',
            alignItems: 'center',
            gap: `${tokens.spacing.xs}px`,
            padding: `0 ${tokens.spacing.md}px`,
          }}
        >
          {startIcon && (
            <Box sx={{ display: 'flex', alignItems: 'center', fontSize: 16 }}>
              {startIcon}
            </Box>
          )}
          <Typography
            component="span"
            sx={{
              fontFamily: tokens.typography.fontFamily,
              fontSize,
              fontWeight,
              color: 'inherit',
              lineHeight: 1,
            }}
          >
            {label}
          </Typography>
        </Box>

        {/* ── Divider ───────────────────────────────────────── */}
        <Box
          sx={{
            width: '1px',
            alignSelf: 'stretch',
            backgroundColor: dividerColor,
            flexShrink: 0,
          }}
        />

        {/* ── Arrow segment ─────────────────────────────────── */}
        <IconButton
          ref={arrowRef}
          disabled={disabled}
          onClick={disabled ? undefined : () => onMenuToggle?.(!open)}
          aria-label="Open menu"
          aria-expanded={open}
          sx={{
            ...sharedButtonSx,
            width: 32,
            padding: 0,
            borderRadius: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ArrowDropDownIcon
            sx={{
              fontSize: 18,
              color: 'inherit',
              transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 200ms',
            }}
          />
        </IconButton>
      </Box>

      {/* ── Dropdown menu ─────────────────────────────────────── */}
      {menuItems.length > 0 && (
        <Popover
          open={open && !disabled}
          anchorEl={anchorEl ?? arrowRef.current}
          onClose={() => onMenuToggle?.(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          disablePortal={false}
          sx={{ mt: `${tokens.spacing.xs}px` }}
        >
          <Menu
            items={menuItems}
            state="single"
          />
        </Popover>
      )}
    </>
  );
});

SplitButton.displayName = 'SplitButton';
export default SplitButton;
