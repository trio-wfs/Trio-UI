/**
 * RadioGroup Component
 *
 * SOURCE OF TRUTH: Figma component "Radio-Group" (node: 5382:7056)
 * Design System: AHTG Desktop SaaS
 *
 * Theme migration (2026-04-15):
 * - Radio hitbox/icon/hover live in theme at components.MuiRadio.
 * - Legend typography lives in theme at components.MuiFormLabel.
 * - Option label typography lives in theme at components.MuiFormControlLabel.
 * - MUI's native color="primary|error|default" handles checked/disabled colors.
 */

import React from 'react';
import { RadioGroup as MuiRadioGroup, Radio, FormControlLabel, FormControl, FormLabel } from '@mui/material';
import { type RadioGroupProps, defaultRadioGroupProps } from './RadioGroup.types';

export const RadioGroup = React.forwardRef<HTMLFieldSetElement, RadioGroupProps>(({
  color = defaultRadioGroupProps.color,
  options = defaultRadioGroupProps.options,
  value,
  onChange,
  label,
  disabled = defaultRadioGroupProps.disabled,
  error = defaultRadioGroupProps.error,
  className,
  id,
  required,
  name,
  ...ariaProps
}, ref) => {
  const muiColor = color === 'error' ? 'error' : color === 'primary' ? 'primary' : 'default';

  return (
    <FormControl
      ref={ref}
      component="fieldset"
      error={error}
      disabled={disabled}
      required={required}
      className={className}
      id={id}
    >
      {label && <FormLabel component="legend">{label}</FormLabel>}
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
              />
            }
            label={option.label}
            disabled={disabled || option.disabled}
          />
        ))}
      </MuiRadioGroup>
    </FormControl>
  );
});

RadioGroup.displayName = 'RadioGroup';

export default RadioGroup;
