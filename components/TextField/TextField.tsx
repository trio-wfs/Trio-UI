/**
 * TextField Component
 *
 * SOURCE OF TRUTH: Figma component "text-field"
 * Design System: AHTG Desktop SaaS
 *
 * EXTRACTED VALUES FROM FIGMA:
 * - Single-line height: 36px (from .absoluteBoundingBox.height)
 * - Multi-line height: 90px (from .absoluteBoundingBox.height)
 * - Padding: 8px left/right, 4px top/bottom (from .children[0].padding*)
 * - Border colors:
 *   - default: #9E9E9E (from .strokes[0].color)
 *   - error: #DB4537 (from .strokes[0].color)
 *   - focus: #64B5F6 (from .strokes[0].color)
 * - Background: Transparent (from .fills[0])
 *
 * CRITICAL RULES:
 * - All colors from tokens.ts (NO hardcoded hex values)
 * - All spacing from tokens.ts (8px system, 4px exception within component)
 * - All typography from tokens.ts
 * - Desktop-only (no responsive/mobile)
 * - Material Icons only
 */

import React from 'react';
import { TextField as MuiTextField } from '@mui/material';
import { TextFieldProps, defaultTextFieldProps } from './TextField.types';
import { tokens } from '../../design-tokens/tokens';

export const TextField: React.FC<TextFieldProps> = ({
  type = defaultTextFieldProps.type,
  state = defaultTextFieldProps.state,
  disabled = defaultTextFieldProps.disabled,
  label = defaultTextFieldProps.label,
  helpText = defaultTextFieldProps.helpText,
  iconRight = defaultTextFieldProps.iconRight,
  iconSupport = defaultTextFieldProps.iconSupport,
  inputFill = defaultTextFieldProps.inputFill,
  chipContent = defaultTextFieldProps.chipContent,
  adormentInput = defaultTextFieldProps.adormentInput,
  placeholderLabel = defaultTextFieldProps.placeholderLabel,
  inputContent = defaultTextFieldProps.inputContent,
  value,
  onChange,
  labelText = 'Label',
  helperText: helperTextProp = 'Helper text',
  className,
  ...ariaProps
}) => {
  const isDisabled = disabled === 'yes';
  const hasError = state === 'error';
  const isFocused = state === 'focus';

  // Map Figma state to border colors (extracted from Figma)
  const getBorderColor = () => {
    switch (state) {
      case 'error':
        return tokens.colors.error.main;  // #DB4537
      case 'focus':
        return tokens.colors.border.focus;  // #64B5F6
      default:
        return tokens.colors.components.input.enabledBorder;  // #9E9E9E
    }
  };

  // Extracted dimensions from Figma
  const getHeight = () => {
    return type === 'single-line' ? 36 : 90;  // Actual Figma values
  };

  return (
    <MuiTextField
      multiline={type === 'multi-line'}
      rows={type === 'multi-line' ? 4 : undefined}
      placeholder={placeholderLabel}
      value={value || inputContent}
      onChange={onChange}
      disabled={isDisabled}
      error={hasError}
      label={label ? labelText : undefined}
      helperText={helpText ? helperTextProp : undefined}
      variant="outlined"
      className={className}
      {...ariaProps}
      sx={{
        fontFamily: tokens.typography.fontFamily,
        width: '100%',
        '& .MuiOutlinedInput-root': {
          height: getHeight(),
          padding: '4px 8px',  // Actual Figma padding: top/bottom=4px, left/right=8px
          backgroundColor: inputFill
            ? tokens.colors.background.secondary
            : tokens.colors.background.paper,
          borderRadius: `${tokens.borderRadius.default}px`,
          fontFamily: tokens.typography.fontFamily,
          fontSize: `${tokens.typography.fontSize.sm}px`,
          '& fieldset': {
            borderColor: getBorderColor(),
            borderWidth: '1px',
          },
          '&:hover fieldset': {
            borderColor: isFocused
              ? getBorderColor()
              : tokens.colors.components.input.hoverBorder,
          },
          '&.Mui-focused fieldset': {
            borderColor: tokens.colors.border.focus,
            borderWidth: '2px',
          },
          '&.Mui-disabled': {
            backgroundColor: tokens.colors.action.disabledBackground,
            '& fieldset': {
              borderColor: tokens.colors.components.input.disabledBorder,
            },
          },
        },
        '& .MuiOutlinedInput-input': {
          color: tokens.colors.text.primary,
          fontSize: `${tokens.typography.fontSize.sm}px`,
          fontWeight: tokens.typography.fontWeight.regular,
          lineHeight: '20px',
          padding: 0,
          '&::placeholder': {
            color: tokens.colors.text.disabled,
            opacity: 1,
          },
          '&.Mui-disabled': {
            color: tokens.colors.text.disabled,
            WebkitTextFillColor: tokens.colors.text.disabled,
          },
        },
        '& .MuiInputLabel-root': {
          fontSize: `${tokens.typography.fontSize.xs}px`,
          fontWeight: tokens.typography.fontWeight.medium,
          color: tokens.colors.text.primary,
          transform: 'none',
          position: 'relative',
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
        },
        '& .MuiFormHelperText-root': {
          fontSize: `${tokens.typography.fontSize.xs}px`,
          color: hasError ? tokens.colors.error.main : tokens.colors.text.secondary,
          marginLeft: 0,
          marginTop: `${tokens.spacing.xs}px`,
          fontFamily: tokens.typography.fontFamily,
        },
      }}
    />
  );
};

TextField.displayName = 'TextField';

export default TextField;
