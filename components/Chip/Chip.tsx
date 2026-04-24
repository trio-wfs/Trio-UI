/**
 * Chip Component
 *
 * SOURCE OF TRUTH: Figma component "Chip" (node: 1512:8352)
 * Design System: AHTG Desktop SaaS
 *
 * Theme migration (2026-04-15):
 * - Static chrome (pill shape, padding, typography, label/icon sizing,
 *   disabled base) lives in theme at components.MuiChip.
 * - Color × variant × disabled × hover matrix stays here because our
 *   palette names don't map 1:1 to MUI defaults.
 * - Outline hover uses semantic color tints (e.g. primary → #2196F30D),
 *   not the generic action.hover gray.
 */

import React from 'react';
import { Chip as MuiChip } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import { ChipProps, defaultChipProps } from './Chip.types';
import { tokens } from '../../design-tokens/tokens';

// Semantic hover tints from Figma variables — color @ 5% opacity
const hoverTints: Record<string, string> = {
  default: tokens.colors.action.hover,             // rgba(0,0,0,0.04)
  primary: 'rgba(33, 150, 243, 0.05)',              // #2196F30D
  error: 'rgba(219, 69, 55, 0.05)',                 // #DB45370D
  info: 'rgba(84, 175, 202, 0.05)',                 // #54AFCA0D
  warning: 'rgba(235, 139, 12, 0.05)',              // #EB8B0C0D
  success: 'rgba(56, 142, 60, 0.05)',               // #388E3C0D
};

export const Chip = React.forwardRef<HTMLDivElement, ChipProps>(({
  size = defaultChipProps.size,
  color = defaultChipProps.color,
  variant = defaultChipProps.variant,
  disabled = defaultChipProps.disabled,
  iconLeft = defaultChipProps.iconLeft,
  iconRight = defaultChipProps.iconRight,
  label = defaultChipProps.label,
  onClick,
  onDelete,
  className,
  ...ariaProps
}, ref) => {
  const muiVariant = variant === 'outline' ? 'outlined' : 'filled';
  const muiSize = size!;

  const colorMap: Record<string, { main: string; light: string; contrastText: string; outline: string }> = {
    default: {
      main: tokens.colors.secondary.main,
      light: tokens.colors.secondary.main,
      contrastText: tokens.colors.text.primary,
      outline: tokens.colors.secondary.outline,
    },
    primary: {
      main: tokens.colors.primary.main,
      light: tokens.colors.primary.light,
      contrastText: tokens.colors.primary.contrastText,
      outline: tokens.colors.primary.main,
    },
    error: {
      main: tokens.colors.error.main,
      light: tokens.colors.error.light,
      contrastText: tokens.colors.error.contrastText,
      outline: tokens.colors.error.main,
    },
    info: {
      main: tokens.colors.info.main,
      light: tokens.colors.info.light,
      contrastText: tokens.colors.info.contrastText,
      outline: tokens.colors.info.main,
    },
    warning: {
      main: tokens.colors.warning.main,
      light: tokens.colors.warning.light,
      contrastText: tokens.colors.warning.contrastText,
      outline: tokens.colors.warning.main,
    },
    success: {
      main: tokens.colors.success.main,
      light: tokens.colors.success.light,
      contrastText: tokens.colors.success.contrastText,
      outline: tokens.colors.success.main,
    },
  };

  const getColorStyles = () => {
    if (disabled) {
      return {
        backgroundColor: variant === 'contained' ? tokens.colors.action.disabled : 'transparent',
        color: tokens.colors.text.disabled,
        border: variant === 'outline' ? `1px solid ${tokens.colors.action.disabled}` : 'none',
        '& .MuiChip-deleteIcon': { color: tokens.colors.text.disabled },
      };
    }
    const c = colorMap[color!] || colorMap.default;
    const hoverBg = hoverTints[color!] || hoverTints.default;

    if (variant === 'contained') {
      return {
        backgroundColor: c.main,
        color: c.contrastText,
        border: 'none',
        '&:hover': { backgroundColor: c.main },
        '& .MuiChip-deleteIcon': {
          color: c.contrastText,
          opacity: 0.7,
          '&:hover': { color: c.contrastText, opacity: 1 },
        },
      };
    }
    // Outline variant
    const textColor = color === 'default' ? tokens.colors.text.primary : c.main;
    return {
      backgroundColor: 'transparent',
      color: textColor,
      border: `1px solid ${c.outline}`,
      // Semantic hover tint — not generic gray
      '&:hover': { backgroundColor: hoverBg },
      '& .MuiChip-deleteIcon': {
        color: textColor,
        opacity: 0.7,
        '&:hover': { color: textColor, opacity: 1 },
      },
    };
  };

  // Determine if we show a delete icon
  const hasDelete = Boolean(iconRight || onDelete);

  return (
    <MuiChip
      ref={ref}
      label={label}
      size={muiSize}
      variant={muiVariant}
      icon={iconLeft ? <span>{iconLeft}</span> : undefined}
      deleteIcon={<CancelIcon />}
      onDelete={hasDelete ? (onDelete ?? (() => {})) : undefined}
      onClick={onClick}
      disabled={disabled}
      className={className}
      {...ariaProps}
      sx={{
        ...getColorStyles(),
        // Center icon vertically
        '& .MuiChip-icon': {
          display: 'flex',
          alignItems: 'center',
        },
        '& .MuiChip-deleteIcon': {
          display: 'flex',
          alignItems: 'center',
          fontSize: muiSize === 'small' ? 14 : 16,
          width: muiSize === 'small' ? 14 : 16,
          height: muiSize === 'small' ? 14 : 16,
        },
      }}
    />
  );
});

Chip.displayName = 'Chip';
export default Chip;
