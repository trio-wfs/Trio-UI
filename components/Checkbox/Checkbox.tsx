/**
 * Checkbox Component
 *
 * SOURCE OF TRUTH: Figma component "Checkbox" (node: 2425:7975)
 * Design System: AHTG Desktop SaaS
 *
 * Theme migration (2026-04-15):
 * - Hitbox (38x38), icon size (16px), hover background live in theme at
 *   components.MuiCheckbox.styleOverrides.root.
 * - Label typography lives in theme at components.MuiFormControlLabel.
 * - MUI's native color="primary|error" prop handles checked/disabled colors
 *   via the palette — no component-level override needed.
 * - This component is now a thin wrapper that maps Figma color -> MUI color
 *   and optionally wraps the checkbox in a FormControlLabel.
 */

import React from 'react';
import { Checkbox as MuiCheckbox, FormControlLabel } from '@mui/material';
import { type CheckboxProps, defaultCheckboxProps } from './Checkbox.types';

export const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>(({
  color = defaultCheckboxProps.color,
  checked = defaultCheckboxProps.checked,
  disabled = defaultCheckboxProps.disabled,
  indeterminate = defaultCheckboxProps.indeterminate,
  onChange,
  label,
  className,
  id,
  required,
  name,
  value,
  ...ariaProps
}, ref) => {
  const muiColor = color === 'error' ? 'error' : 'primary';

  const checkedProps = checked !== undefined ? { checked } : {};

  const checkboxElement = (
    <MuiCheckbox
      {...checkedProps}
      disabled={disabled}
      indeterminate={indeterminate}
      onChange={onChange}
      color={muiColor}
      name={name}
      id={id}
      required={required}
      value={value}
      ref={ref}
      className={label ? undefined : className}
      {...ariaProps}
    />
  );

  if (label) {
    return (
      <FormControlLabel
        control={checkboxElement}
        label={label}
        disabled={disabled}
        className={className}
      />
    );
  }

  return checkboxElement;
});

Checkbox.displayName = 'Checkbox';

export default Checkbox;
