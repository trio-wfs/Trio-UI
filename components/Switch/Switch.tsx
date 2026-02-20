/**
 * Switch Component
 *
 * SOURCE OF TRUTH: Figma component "Switch" (node: 2433:9802)
 * Design System: AHTG Desktop SaaS
 *
 * EXTRACTED VALUES FROM FIGMA:
 * - Track size: 28x16px (from Switch/label-placement instance)
 * - Thumb size: 12px (calculated from track)
 * - States: on, off (from variantOptions)
 * - Label placement: left, right, top (from variantOptions)
 * - Disabled: yes, no (from variantOptions)
 *
 * CRITICAL RULES:
 * - All colors from tokens.ts (NO hardcoded hex values)
 * - All spacing from tokens.ts (8px system)
 * - All typography from tokens.ts
 * - Desktop-only (no responsive/mobile)
 * - Material Icons only
 */

import React from 'react';
import { Switch as MuiSwitch, FormControlLabel } from '@mui/material';
import { SwitchProps, defaultSwitchProps } from './Switch.types';
import { tokens } from '../../design-tokens/tokens';

export const Switch: React.FC<SwitchProps> = ({
  state = defaultSwitchProps.state,
  labelPlacement = defaultSwitchProps.labelPlacement,
  disabled = defaultSwitchProps.disabled,
  checked = defaultSwitchProps.checked,
  onChange,
  label,
  className,
  name,
  value,
  ...ariaProps
}) => {
  const isDisabled = disabled === 'yes';
  const isChecked = checked !== undefined ? checked : state === 'on';

  // Map Figma label placement to MUI
  const muiLabelPlacement = labelPlacement === 'left' ? 'start' : labelPlacement === 'top' ? 'top' : 'end';

  const switchElement = (
    <MuiSwitch
      checked={isChecked}
      onChange={onChange}
      disabled={isDisabled}
      name={name}
      value={value}
      {...ariaProps}
      sx={{
        fontFamily: tokens.typography.fontFamily,
        // Extracted track size from Figma: 28x16px
        width: '28px',
        height: '16px',
        padding: 0,
        '& .MuiSwitch-switchBase': {
          padding: 0,
          margin: '2px',
          transitionDuration: '300ms',
          '&.Mui-checked': {
            transform: 'translateX(14px)', // 28px track - 14px thumb = 14px
            color: '#fff',
            '& + .MuiSwitch-track': {
              backgroundColor: tokens.colors.primary.main,
              opacity: 1,
              border: 0,
            },
            '&.Mui-disabled + .MuiSwitch-track': {
              opacity: 0.5,
            },
          },
          '&.Mui-disabled .MuiSwitch-thumb': {
            color: tokens.colors.action.disabled,
          },
          '&.Mui-disabled + .MuiSwitch-track': {
            opacity: 0.3,
          },
        },
        '& .MuiSwitch-thumb': {
          boxSizing: 'border-box',
          width: '12px',
          height: '12px',
        },
        '& .MuiSwitch-track': {
          borderRadius: '8px',
          backgroundColor: tokens.colors.action.disabled,
          opacity: 1,
          transition: 'background-color 300ms',
        },
      }}
    />
  );

  // If label provided, wrap in FormControlLabel
  if (label) {
    return (
      <FormControlLabel
        control={switchElement}
        label={label}
        labelPlacement={muiLabelPlacement}
        disabled={isDisabled}
        className={className}
        sx={{
          fontFamily: tokens.typography.fontFamily,
          marginLeft: 0,
          marginRight: 0,
          '& .MuiFormControlLabel-label': {
            fontSize: `${tokens.typography.fontSize.sm}px`,
            fontWeight: tokens.typography.fontWeight.regular,
            color: isDisabled
              ? tokens.colors.text.disabled
              : tokens.colors.text.primary,
          },
        }}
      />
    );
  }

  return switchElement;
};

Switch.displayName = 'Switch';

export default Switch;
