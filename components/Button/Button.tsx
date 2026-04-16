/**
 * Button Component
 *
 * SOURCE OF TRUTH: Figma component "button" (node: 978:5063)
 * Design System: AHTG Desktop SaaS
 *
 * Theme migration (2026-04-15):
 * - Static base styles (fontFamily, textTransform, borderRadius, boxShadow)
 *   live in design-tokens/theme.ts under components.MuiButton.styleOverrides.root.
 * - Size padding and typography live in sizeSmall / sizeMedium overrides.
 * - Color × variant combinations stay here because they are genuinely dynamic
 *   (6 colors × 3 variants = 18 permutations with different hover/active/disabled
 *   targets). MUI's variants API would spread this logic across the theme without
 *   making it shorter.
 */

import React from 'react';
import { Button as MuiButton } from '@mui/material';
import { ButtonProps, defaultButtonProps } from './Button.types';
import { tokens } from '../../design-tokens/tokens';

export const Button: React.FC<ButtonProps> = ({
  size = defaultButtonProps.size,
  color = defaultButtonProps.color,
  variant = defaultButtonProps.variant,
  startIcon = defaultButtonProps.startIcon,
  endIcon = defaultButtonProps.endIcon,
  label = defaultButtonProps.label,
  children,
  onClick,
  disabled = defaultButtonProps.disabled,
  loading = defaultButtonProps.loading,
  type = defaultButtonProps.type,
  className,
  ...ariaProps
}) => {
  const isDisabled = disabled;
  const isLoading = loading;

  // Map Figma color to token colors
  const getColorStyles = () => {
    // Secondary has a unique token structure (no light/dark shades for bg) — handle separately
    if (color === 'secondary') {
      if (variant === 'contained') {
        return {
          backgroundColor: tokens.colors.secondary.main,
          color: tokens.colors.secondary.contrastText,
          border: `1px solid ${tokens.colors.secondary.outline}`,
          '&:hover': { backgroundColor: tokens.colors.components.border.default, border: `1px solid ${tokens.colors.secondary.outline}`, boxShadow: 'none' },
          '&:active': { backgroundColor: tokens.colors.components.border.default, boxShadow: 'none' },
          '&.Mui-disabled': { backgroundColor: tokens.colors.action.disabledBackground, color: tokens.colors.text.disabled, border: 'none' },
        };
      }
      if (variant === 'outlined') {
        return {
          backgroundColor: 'transparent',
          color: tokens.colors.secondary.dark,
          border: `1px solid ${tokens.colors.secondary.outline}`,
          '&:hover': { backgroundColor: tokens.colors.secondary.main, border: `1px solid ${tokens.colors.secondary.outline}`, boxShadow: 'none' },
          '&:active': { backgroundColor: tokens.colors.secondary.main, boxShadow: 'none' },
          '&.Mui-disabled': { border: `1px solid ${tokens.colors.components.input.disabledBorder}`, color: tokens.colors.text.disabled },
        };
      }
      // text
      return {
        backgroundColor: 'transparent',
        color: tokens.colors.secondary.dark,
        '&:hover': { backgroundColor: tokens.colors.secondary.main, boxShadow: 'none' },
        '&:active': { backgroundColor: tokens.colors.secondary.main, boxShadow: 'none' },
        '&.Mui-disabled': { color: tokens.colors.text.disabled },
      };
    }

    const colorToken = tokens.colors[color as keyof typeof tokens.colors] as {
      main: string; dark: string; light: string; contrastText: string;
    };

    if (variant === 'contained') {
      return {
        backgroundColor: colorToken.main,
        color: colorToken.contrastText,
        '&:hover': { backgroundColor: colorToken.dark, boxShadow: 'none' },
        '&:active': { backgroundColor: colorToken.dark, boxShadow: 'none' },
        '&.Mui-disabled': { backgroundColor: tokens.colors.action.disabledBackground, color: tokens.colors.text.disabled },
      };
    }

    if (variant === 'outlined') {
      return {
        backgroundColor: 'transparent',
        color: colorToken.main,
        border: `1px solid ${colorToken.main}`,
        '&:hover': { backgroundColor: colorToken.light, border: `1px solid ${colorToken.main}`, boxShadow: 'none' },
        '&:active': { backgroundColor: colorToken.light, boxShadow: 'none' },
        '&.Mui-disabled': { border: `1px solid ${tokens.colors.components.input.disabledBorder}`, color: tokens.colors.text.disabled },
      };
    }

    // text variant — use color's light tint for hover (not the near-invisible action.hover overlay)
    return {
      backgroundColor: 'transparent',
      color: colorToken.main,
      '&:hover': { backgroundColor: colorToken.light, boxShadow: 'none' },
      '&:active': { backgroundColor: colorToken.light, boxShadow: 'none' },
      '&.Mui-disabled': { color: tokens.colors.text.disabled },
    };
  };

  return (
    <MuiButton
      variant={variant}
      size={size}
      onClick={onClick}
      disabled={isDisabled}
      type={type}
      className={className}
      {...ariaProps}
      sx={{
        ...getColorStyles(),
        ...(isLoading && {
          cursor: 'wait',
          opacity: 0.7,
        }),
      }}
      startIcon={startIcon}
      endIcon={endIcon}
    >
      {children || label}
    </MuiButton>
  );
};

Button.displayName = 'Button';

export default Button;
