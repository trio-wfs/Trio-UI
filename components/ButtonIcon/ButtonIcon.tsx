/**
 * ButtonIcon Component
 *
 * SOURCE OF TRUTH: Figma node 4819:14042 (file: PjAYuPDr8IA1ccwiAjFkSD)
 *
 * Icon-only button. Use when the action can be fully communicated by iconography alone.
 * Wraps MUI IconButton. Badge overlay uses MUI Badge.
 */

import React from 'react';
import { IconButton } from '@mui/material';
import { Badge } from '@mui/material';
import { type ButtonIconProps, defaultButtonIconProps } from './ButtonIcon.types';
import { tokens } from '../../design-tokens/tokens';

export const ButtonIcon = React.forwardRef<HTMLButtonElement, ButtonIconProps>(({
  variant = defaultButtonIconProps.variant,
  color = defaultButtonIconProps.color,
  size = defaultButtonIconProps.size,
  icon,
  badge = defaultButtonIconProps.badge,
  badgeCount,
  disabled,
  onClick,
  'aria-label': ariaLabel,
}, ref) => {
  // Sizing per Figma node 4819:14042 — all dimensions sourced from tokens.controls:
  //   medium (any variant): tokens.controls.height.medium (38px) with 24px icon
  //   contained small:      tokens.controls.height.small (32px) with 16px icon — matches form-row controls
  //   ghost small:          tokens.controls.ghostHeight (24px) with 16px icon — compact toolbar/grid affordance
  const sizeStyles =
    size === 'medium'
      ? {
          width: tokens.controls.height.medium,
          height: tokens.controls.height.medium,
          '& .MuiSvgIcon-root': { fontSize: 24 },
        }
      : variant === 'contained'
      ? {
          width: tokens.controls.height.small,
          height: tokens.controls.height.small,
          '& .MuiSvgIcon-root': { fontSize: 16 },
        }
      : {
          width: tokens.controls.ghostHeight,
          height: tokens.controls.ghostHeight,
          '& .MuiSvgIcon-root': { fontSize: 16 },
        };

  const getColorStyles = () => {
    if (variant === 'contained') {
      if (color === 'primary') {
        return {
          backgroundColor: tokens.colors.primary.main,
          color: tokens.colors.primary.contrastText,
          borderRadius: `${tokens.borderRadius.default}px`,
          '&:hover': { backgroundColor: tokens.colors.primary.dark },
          '&:active': { backgroundColor: tokens.colors.primary.dark },
          '&.Mui-disabled': {
            backgroundColor: tokens.colors.action.disabledBackground,
            color: tokens.colors.text.disabled,
          },
        };
      }
      // secondary
      return {
        backgroundColor: tokens.colors.secondary.main,
        color: tokens.colors.secondary.contrastText,
        border: `1px solid ${tokens.colors.components.border.default}`,
        borderRadius: `${tokens.borderRadius.default}px`,
        '&:hover': { backgroundColor: tokens.colors.components.border.default },
        '&:active': { backgroundColor: tokens.colors.components.border.default },
        '&.Mui-disabled': {
          backgroundColor: tokens.colors.action.disabledBackground,
          color: tokens.colors.text.disabled,
        },
      };
    }

    // ghost
    const iconColor =
      color === 'primary'
        ? tokens.colors.primary.main
        : color === 'default'
        ? tokens.colors.components.icon.default
        : tokens.colors.secondary.contrastText;
    return {
      backgroundColor: 'transparent',
      color: iconColor,
      borderRadius: `${tokens.borderRadius.full}px`,
      '&:hover': { backgroundColor: tokens.colors.action.hover },
      '&:active': { backgroundColor: tokens.colors.action.selected },
      '&.Mui-disabled': { color: tokens.colors.text.disabled },
    };
  };

  const button = (
    <IconButton
      ref={ref}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
      sx={{
        padding: 0,
        ...sizeStyles,
        ...getColorStyles(),
      }}
    >
      {icon}
    </IconButton>
  );

  if (!badge) return button;

  // Badge typography/sizing now inherits from the global MuiBadge theme override.
  return (
    <Badge
      badgeContent={badgeCount}
      color="error"
      variant={badgeCount !== undefined ? 'standard' : 'dot'}
    >
      {button}
    </Badge>
  );
});

ButtonIcon.displayName = 'ButtonIcon';
export default ButtonIcon;
