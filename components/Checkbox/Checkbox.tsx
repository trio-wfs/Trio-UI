/**
 * Checkbox Component
 *
 * SOURCE OF TRUTH: Figma component "Checkbox" (node: 2425:7975)
 * Design System: AHTG Desktop SaaS
 *
 * EXTRACTED VALUES FROM FIGMA:
 * - Hitbox size: 38x38px (from .absoluteBoundingBox)
 * - Checkbox box: 16x16px (from .children[0].absoluteBoundingBox)
 * - Colors: primary (#2196F3), error (#DB4537) (from variantOptions)
 * - States: checked (true/false), indeterminate (true/false), disabled (true/false)
 * - Hover state exists (on/off from variantOptions)
 *
 * CRITICAL RULES:
 * - All colors from tokens.ts (NO hardcoded hex values)
 * - All spacing from tokens.ts (8px system)
 * - All typography from tokens.ts
 * - Desktop-only (no responsive/mobile)
 * - Material Icons only
 */

import React from 'react';
import { Checkbox as MuiCheckbox, FormControlLabel } from '@mui/material';
import { CheckboxProps, defaultCheckboxProps } from './Checkbox.types';
import { tokens } from '../../design-tokens/tokens';

export const Checkbox: React.FC<CheckboxProps> = ({
  color = defaultCheckboxProps.color,
  checked = defaultCheckboxProps.checked,
  disabled = defaultCheckboxProps.disabled,
  indeterminate = defaultCheckboxProps.indeterminate,
  onChange,
  label,
  className,
  name,
  value,
  ...ariaProps
}) => {
  // Map Figma color to MUI color
  const muiColor = color === 'error' ? 'error' : 'primary';

  const checkboxElement = (
    <MuiCheckbox
      checked={checked}
      disabled={disabled}
      indeterminate={indeterminate}
      onChange={onChange}
      color={muiColor}
      name={name}
      value={value}
      {...ariaProps}
      sx={{
        fontFamily: tokens.typography.fontFamily,
        // Extracted hitbox size from Figma
        width: '38px',
        height: '38px',
        padding: `${tokens.spacing.sm}px`, // 8px padding
        '& .MuiSvgIcon-root': {
          // Extracted checkbox box size from Figma
          fontSize: '16px',
        },
        '&:hover': {
          backgroundColor: disabled ? 'transparent' : 'rgba(0, 0, 0, 0.04)',
        },
        '&.Mui-checked': {
          color: color === 'error'
            ? tokens.colors.error.main
            : tokens.colors.primary.main,
        },
        '&.Mui-disabled': {
          color: tokens.colors.action.disabled,
        },
      }}
    />
  );

  // If label provided, wrap in FormControlLabel
  if (label) {
    return (
      <FormControlLabel
        control={checkboxElement}
        label={label}
        disabled={disabled}
        className={className}
        sx={{
          fontFamily: tokens.typography.fontFamily,
          '& .MuiFormControlLabel-label': {
            fontSize: `${tokens.typography.fontSize.sm}px`,
            fontWeight: tokens.typography.fontWeight.regular,
            color: disabled
              ? tokens.colors.text.disabled
              : tokens.colors.text.primary,
          },
        }}
      />
    );
  }

  return checkboxElement;
};

Checkbox.displayName = 'Checkbox';

export default Checkbox;
