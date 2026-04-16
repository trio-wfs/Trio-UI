/**
 * Switch Component
 *
 * SOURCE OF TRUTH: Figma component "Switch" (node: 2433:9802)
 * Design System: AHTG Desktop SaaS
 *
 * Theme migration (2026-04-15):
 * - Track (28x16), thumb (12px), checked state, and transitions live in theme
 *   at components.MuiSwitch.styleOverrides.root.
 * - Label typography lives in theme at components.MuiFormControlLabel.
 * - Label margin reset (marginLeft/marginRight: 0) kept here because Switch
 *   intentionally differs from Checkbox/Radio on label spacing.
 */

import React from 'react';
import { Switch as MuiSwitch, FormControlLabel } from '@mui/material';
import { SwitchProps, defaultSwitchProps } from './Switch.types';

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
  const isDisabled = Boolean(disabled);
  const isChecked = checked !== undefined ? checked : state === 'on';
  const muiLabelPlacement = labelPlacement === 'left' ? 'start' : labelPlacement === 'top' ? 'top' : 'end';

  const switchElement = (
    <MuiSwitch
      checked={isChecked}
      onChange={onChange}
      disabled={isDisabled}
      name={name}
      value={value}
      {...ariaProps}
    />
  );

  if (label) {
    return (
      <FormControlLabel
        control={switchElement}
        label={label}
        labelPlacement={muiLabelPlacement}
        disabled={isDisabled}
        className={className}
        sx={{ marginLeft: 0, marginRight: 0 }}
      />
    );
  }

  return switchElement;
};

Switch.displayName = 'Switch';

export default Switch;
