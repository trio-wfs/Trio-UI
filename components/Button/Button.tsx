/**
 * Button Component
 *
 * SOURCE OF TRUTH: Figma component "button" (node: 978:5063)
 * Design System: AHTG Desktop SaaS
 *
 * CRITICAL RULES:
 * - All colors from tokens.ts (NO hardcoded hex values)
 * - All spacing from tokens.ts (8px system, 4px exception within component)
 * - All typography from tokens.ts
 * - Desktop-only (no responsive/mobile)
 * - Material Icons only
 */

import React from 'react';
import { Button as MuiButton } from '@mui/material';
import { ButtonProps, defaultButtonProps } from './Button.types';
import { tokens } from '../../design-tokens/tokens';

export const Button: React.FC<ButtonProps> = ({
  size = defaultButtonProps.size,
  color = defaultButtonProps.color,
  state = defaultButtonProps.state,
  variant = defaultButtonProps.variant,
  startIcon = defaultButtonProps.startIcon,
  endIcon = defaultButtonProps.endIcon,
  label = defaultButtonProps.label,
  children,
  onClick,
  disabled,
  type = defaultButtonProps.type,
  className,
  ...ariaProps
}) => {
  // Map Figma state to disabled prop
  const isDisabled = disabled || state === 'disabled';
  const isLoading = state === 'loading';

  // Map Figma color to token colors
  const getColorStyles = () => {
    const colorToken = tokens.colors[color as keyof typeof tokens.colors];

    if (variant === 'contained') {
      return {
        backgroundColor: colorToken.main,
        color: colorToken.contrastText,
        '&:hover': {
          backgroundColor: colorToken.dark,
        },
        '&:active': {
          backgroundColor: colorToken.dark,
        },
        '&:disabled': {
          backgroundColor: tokens.colors.action.disabledBackground,
          color: tokens.colors.text.disabled,
        },
      };
    }

    if (variant === 'outlined') {
      return {
        backgroundColor: 'transparent',
        color: colorToken.main,
        border: `1px solid ${colorToken.main}`,
        '&:hover': {
          backgroundColor: colorToken.light,
          border: `1px solid ${colorToken.main}`,
        },
        '&:active': {
          backgroundColor: colorToken.light,
        },
        '&:disabled': {
          border: `1px solid ${tokens.colors.components.input.disabledBorder}`,
          color: tokens.colors.text.disabled,
        },
      };
    }

    // text variant
    return {
      backgroundColor: 'transparent',
      color: colorToken.main,
      '&:hover': {
        backgroundColor: tokens.colors.action.hover,
      },
      '&:active': {
        backgroundColor: tokens.colors.action.selected,
      },
      '&:disabled': {
        color: tokens.colors.text.disabled,
      },
    };
  };

  // Map Figma size to dimensions and typography
  const getSizeStyles = () => {
    if (size === 'sm') {
      return {
        height: 32,
        padding: `${tokens.spacing.xs}px ${tokens.spacing.md}px`,
        fontSize: tokens.typography.button.sm.fontSize,
        fontWeight: tokens.typography.button.sm.fontWeight,
        lineHeight: `${tokens.typography.button.sm.lineHeight}px`,
      };
    }

    // md (default)
    return {
      height: 38,
      padding: `${tokens.spacing.sm}px ${tokens.spacing.lg}px`,
      fontSize: tokens.typography.button.md.fontSize,
      fontWeight: tokens.typography.button.md.fontWeight,
      lineHeight: `${tokens.typography.button.md.lineHeight}px`,
    };
  };

  return (
    <MuiButton
      onClick={onClick}
      disabled={isDisabled}
      type={type}
      className={className}
      {...ariaProps}
      sx={{
        // Base styles
        fontFamily: tokens.typography.fontFamily,
        textTransform: 'none',
        borderRadius: `${tokens.borderRadius.default}px`,
        boxShadow: 'none',

        // Size styles
        ...getSizeStyles(),

        // Color/variant styles
        ...getColorStyles(),

        // Loading state
        ...(isLoading && {
          cursor: 'wait',
          opacity: 0.7,
        }),

        // Remove MUI default styles
        '&:hover': {
          boxShadow: 'none',
        },
        '&:active': {
          boxShadow: 'none',
        },
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
