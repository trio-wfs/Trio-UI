/**
 * Chip Component
 *
 * SOURCE OF TRUTH: Figma component "Chip" (node: 1512:8352)
 * Design System: AHTG Desktop SaaS
 *
 * Theme migration (2026-04-15):
 * - Static chrome (pill shape, padding, typography, hover ::after overlay,
 *   label/icon sizing, disabled base) lives in theme at components.MuiChip.
 * - Size: MUI's native size prop maps directly (medium=32px, small=24px) —
 *   no height override needed.
 * - Color × variant × disabled matrix stays here because our palette and
 *   variant names don't map 1:1 to MUI defaults (e.g. outline "default"
 *   uses secondary.outline border + text.primary, which MUI doesn't model).
 */

import React from 'react';
import { Chip as MuiChip } from '@mui/material';
import { ChipProps, defaultChipProps } from './Chip.types';
import { tokens } from '../../design-tokens/tokens';

export const Chip: React.FC<ChipProps> = ({
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
}) => {
  const muiVariant = variant === 'outline' ? 'outlined' : 'filled';
  const muiSize = size === 'sm' ? 'small' : 'medium';

  const colorMap: Record<string, { main: string; contrastText: string; outline: string }> = {
    default: {
      main: tokens.colors.secondary.main,
      contrastText: tokens.colors.text.primary,
      outline: tokens.colors.secondary.outline,
    },
    primary: {
      main: tokens.colors.primary.main,
      contrastText: tokens.colors.primary.contrastText,
      outline: tokens.colors.primary.main,
    },
    error: {
      main: tokens.colors.error.main,
      contrastText: tokens.colors.error.contrastText,
      outline: tokens.colors.error.main,
    },
    info: {
      main: tokens.colors.info.main,
      contrastText: tokens.colors.info.contrastText,
      outline: tokens.colors.info.main,
    },
    warning: {
      main: tokens.colors.warning.main,
      contrastText: tokens.colors.warning.contrastText,
      outline: tokens.colors.warning.main,
    },
    success: {
      main: tokens.colors.success.main,
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
      };
    }
    const c = colorMap[color!] || colorMap.default;
    if (variant === 'contained') {
      return {
        backgroundColor: c.main,
        color: c.contrastText,
        border: 'none',
      };
    }
    return {
      backgroundColor: 'transparent',
      color: color === 'default' ? tokens.colors.text.primary : c.main,
      border: `1px solid ${c.outline}`,
    };
  };

  return (
    <MuiChip
      label={label}
      size={muiSize}
      variant={muiVariant}
      icon={iconLeft ? <span>{iconLeft}</span> : undefined}
      deleteIcon={iconRight ? <span>{iconRight}</span> : undefined}
      onDelete={iconRight ? (onDelete ?? (() => {})) : undefined}
      onClick={onClick}
      disabled={disabled}
      className={className}
      {...ariaProps}
      sx={getColorStyles()}
    />
  );
};

Chip.displayName = 'Chip';
export default Chip;
