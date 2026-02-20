/**
 * RadioGroup Component
 *
 * SOURCE OF TRUTH: Figma component "Radio-Group" (node: 5382:7056)
 * Design System: AHTG Desktop SaaS
 *
 * EXTRACTED VALUES FROM FIGMA:
 * - Hitbox size: 38x38px (from .absoluteBoundingBox)
 * - Radio circle: 16x16px (from .children[0].absoluteBoundingBox)
 * - Colors: primary (#2196F3), error (#DB4537), default (gray) (from variantOptions)
 * - States: checked (true/false), disabled (true/false), hover (on/off)
 *
 * CRITICAL RULES:
 * - All colors from tokens.ts (NO hardcoded hex values)
 * - All spacing from tokens.ts (8px system)
 * - All typography from tokens.ts
 * - Desktop-only (no responsive/mobile)
 * - Material Icons only
 */

import React from 'react';
import { RadioGroup as MuiRadioGroup, Radio, FormControlLabel, FormControl, FormLabel } from '@mui/material';
import { RadioGroupProps, defaultRadioGroupProps } from './RadioGroup.types';
import { tokens } from '../../design-tokens/tokens';

export const RadioGroup: React.FC<RadioGroupProps> = ({
  color = defaultRadioGroupProps.color,
  options = defaultRadioGroupProps.options,
  value,
  onChange,
  label,
  disabled = defaultRadioGroupProps.disabled,
  error = defaultRadioGroupProps.error,
  className,
  name,
  ...ariaProps
}) => {
  // Map Figma color to MUI color
  const muiColor = color === 'error' ? 'error' : color === 'primary' ? 'primary' : 'default';

  return (
    <FormControl
      component="fieldset"
      error={error}
      disabled={disabled}
      className={className}
      sx={{
        fontFamily: tokens.typography.fontFamily,
      }}
    >
      {label && (
        <FormLabel
          component="legend"
          sx={{
            fontSize: `${tokens.typography.fontSize.xs}px`,
            fontWeight: tokens.typography.fontWeight.medium,
            color: tokens.colors.text.primary,
            marginBottom: `${tokens.spacing.sm}px`,
            '&.Mui-focused': {
              color: tokens.colors.primary.main,
            },
            '&.Mui-error': {
              color: tokens.colors.error.main,
            },
            '&.Mui-disabled': {
              color: tokens.colors.text.disabled,
            },
          }}
        >
          {label}
        </FormLabel>
      )}
      <MuiRadioGroup
        name={name}
        value={value}
        onChange={onChange}
        {...ariaProps}
      >
        {options?.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={
              <Radio
                color={muiColor}
                disabled={disabled || option.disabled}
                sx={{
                  fontFamily: tokens.typography.fontFamily,
                  // Extracted hitbox size from Figma
                  width: '38px',
                  height: '38px',
                  padding: `${tokens.spacing.sm}px`, // 8px padding
                  '& .MuiSvgIcon-root': {
                    // Extracted radio circle size from Figma
                    fontSize: '16px',
                  },
                  '&:hover': {
                    backgroundColor: disabled ? 'transparent' : 'rgba(0, 0, 0, 0.04)',
                  },
                  '&.Mui-checked': {
                    color: color === 'error'
                      ? tokens.colors.error.main
                      : color === 'primary'
                      ? tokens.colors.primary.main
                      : tokens.colors.text.secondary,
                  },
                  '&.Mui-disabled': {
                    color: tokens.colors.action.disabled,
                  },
                }}
              />
            }
            label={option.label}
            disabled={disabled || option.disabled}
            sx={{
              fontFamily: tokens.typography.fontFamily,
              '& .MuiFormControlLabel-label': {
                fontSize: `${tokens.typography.fontSize.sm}px`,
                fontWeight: tokens.typography.fontWeight.regular,
                color: (disabled || option.disabled)
                  ? tokens.colors.text.disabled
                  : tokens.colors.text.primary,
              },
            }}
          />
        ))}
      </MuiRadioGroup>
    </FormControl>
  );
};

RadioGroup.displayName = 'RadioGroup';

export default RadioGroup;
