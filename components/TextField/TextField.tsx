/**
 * TextField Component
 *
 * SOURCE OF TRUTH: Figma component "text-field"
 * Design System: AHTG Desktop SaaS
 *
 * Theme migration (2026-04-15):
 * - Static chrome (padding, borders, heights, colors, input/label/helper
 *   typography, disabled/error states via MUI class selectors) lives in
 *   design-tokens/theme.ts under components.MuiTextField.styleOverrides.
 * - Remaining dynamic styling here:
 *   - `state="focus"` — force the focused look without real focus (showcase feature)
 *   - `inputFill` prop — swap input background to background.secondary
 */

import React from 'react';
import { TextField as MuiTextField } from '@mui/material';
import { type TextFieldProps, defaultTextFieldProps } from './TextField.types';
import { tokens } from '../../design-tokens/tokens';

export const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(({
  type = defaultTextFieldProps.type,
  size = defaultTextFieldProps.size,
  state = defaultTextFieldProps.state,
  disabled = defaultTextFieldProps.disabled,
  label,
  helperText,
  inputFill = defaultTextFieldProps.inputFill,
  placeholder = defaultTextFieldProps.placeholder,
  value,
  onChange,
  name,
  id,
  required,
  className,
  ...ariaProps
}, ref) => {
  const hasError = state === 'error';
  const isForcedFocus = state === 'focus';
  const isSmall = size === 'small';

  return (
    <MuiTextField
      variant="outlined"
      size={isSmall ? 'small' : 'medium'}
      multiline={type === 'multi-line'}
      rows={type === 'multi-line' ? (isSmall ? 3 : 4) : undefined}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      error={hasError}
      label={label}
      helperText={helperText}
      name={name}
      id={id}
      required={required}
      inputRef={ref}
      slotProps={{
        inputLabel: { shrink: true },
        input: { notched: false },
      }}
      className={className}
      {...ariaProps}
      sx={{
        // Dynamic: size-driven overrides
        ...(isSmall && {
          '& .MuiOutlinedInput-root:not(.MuiInputBase-multiline)': {
            minHeight: `${tokens.controls.height.small}px`,
          },
          '& .MuiOutlinedInput-root': {
            padding: `${tokens.spacing.xs}px ${tokens.spacing.sm}px`,
            fontSize: `${tokens.typography.fontSize.xs}px`,
          },
          '& .MuiOutlinedInput-input': {
            fontSize: `${tokens.typography.fontSize.xs}px`,
            lineHeight: '18px',
          },
        }),
        // Dynamic: force focused appearance without real focus (design showcase).
        ...(isForcedFocus && {
          '& .MuiOutlinedInput-root fieldset': {
            borderColor: tokens.colors.components.border.focus,
            borderWidth: '2px',
          },
          '& .MuiOutlinedInput-root:hover fieldset': {
            borderColor: tokens.colors.components.border.focus,
          },
          '& .MuiInputLabel-root': {
            color: tokens.colors.primary.main,
          },
        }),
        // Dynamic: alternate input fill
        ...(inputFill && {
          '& .MuiOutlinedInput-root': {
            backgroundColor: tokens.colors.background.secondary,
          },
        }),
      }}
    />
  );
});

TextField.displayName = 'TextField';

export default TextField;
