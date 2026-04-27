/**
 * NumberField Component
 *
 * SOURCE OF TRUTH: Figma component "number-field" node 5464:5759
 * Design System: AHTG Desktop SaaS
 *
 * Layout: [ − ] | [ numeric input ] | [ + ]
 * − and + are square icon buttons separated from the input by 1px divider borders.
 * The input displays a centered numeric value; direct keyboard entry is supported.
 *
 * Size mapping:
 *   medium — 38px total height, 14px font
 *   small  — 32px total height, 12px font
 */

import React, { useCallback, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import RemoveOutlined from '@mui/icons-material/RemoveOutlined';
import AddOutlined from '@mui/icons-material/AddOutlined';
import { tokens } from '../../design-tokens/tokens';
import { NumberFieldProps, defaultNumberFieldProps } from './NumberField.types';

// ─── dimension constants ────────────────────────────────────────────────────

const HEIGHTS: Record<'medium' | 'small', number> = {
  medium: 38,
  small: 32,
};

const FONT_SIZES: Record<'medium' | 'small', number> = {
  medium: tokens.typography.fontSize.sm,  // 14px
  small: tokens.typography.fontSize.xs,   // 12px
};

// ─── component ──────────────────────────────────────────────────────────────

export const NumberField = React.forwardRef<HTMLDivElement, NumberFieldProps>(({
  size = defaultNumberFieldProps.size!,
  disabled = defaultNumberFieldProps.disabled!,
  value,
  onChange,
  min,
  max,
  step = defaultNumberFieldProps.step!,
  label,
  helperText,
  error = defaultNumberFieldProps.error!,
  name,
  id,
  required,
  className,
  'aria-label': ariaLabel,
}, ref) => {
  // ── internal state ──────────────────────────────────────────────────────
  // We keep an internal string so the user can type freely;
  // we only call onChange when a valid committed number results.
  const [internalValue, setInternalValue] = useState<number>(value ?? 0);
  const [inputText, setInputText] = useState<string>(String(value ?? 0));

  // Sync if controlled value changes externally
  useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value);
      setInputText(String(value));
    }
  }, [value]);

  const height = HEIGHTS[size];
  const fontSize = FONT_SIZES[size];
  const iconSize = size === 'small' ? 16 : 18;

  // ── helpers ─────────────────────────────────────────────────────────────

  const clamp = useCallback((n: number): number => {
    let result = n;
    if (min !== undefined) result = Math.max(min, result);
    if (max !== undefined) result = Math.min(max, result);
    return result;
  }, [min, max]);

  const commit = useCallback((n: number) => {
    const clamped = clamp(n);
    setInternalValue(clamped);
    setInputText(String(clamped));
    onChange?.(clamped);
  }, [clamp, onChange]);

  // ── button handlers ─────────────────────────────────────────────────────

  const handleDecrement = () => commit(internalValue - step);
  const handleIncrement = () => commit(internalValue + step);

  // ── input handlers ──────────────────────────────────────────────────────

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleInputBlur = () => {
    const parsed = parseFloat(inputText);
    if (!isNaN(parsed)) {
      commit(parsed);
    } else {
      // Revert to last valid value
      setInputText(String(internalValue));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      (e.target as HTMLInputElement).blur();
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      commit(internalValue + step);
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      commit(internalValue - step);
    }
  };

  // ── boundary checks for button disabled state ────────────────────────────
  const decrementDisabled = disabled || (min !== undefined && internalValue <= min);
  const incrementDisabled = disabled || (max !== undefined && internalValue >= max);

  // ── shared button sx ────────────────────────────────────────────────────
  const buttonSx = (isDisabled: boolean) => ({
    width: height,
    height: height,
    borderRadius: 0,
    flexShrink: 0,
    color: isDisabled
      ? tokens.colors.components.icon.disabled
      : tokens.colors.components.icon.default,
    '&:hover': {
      backgroundColor: isDisabled ? 'transparent' : tokens.colors.action.hover,
    },
    '&.Mui-disabled': {
      color: tokens.colors.components.icon.disabled,
    },
  });

  // ── disabled wrapper styles ──────────────────────────────────────────────
  const wrapperBg = disabled
    ? tokens.colors.action.disabledBackground
    : tokens.colors.background.paper;

  const borderColor = error
    ? tokens.colors.error.main
    : tokens.colors.components.border.default;

  return (
    <Box
      ref={ref}
      className={className}
      sx={{ display: 'inline-flex', flexDirection: 'column', gap: `${tokens.spacing.xs}px` }}
    >
      {/* Label */}
      {label && (
        <FormLabel
          htmlFor={id}
          required={required}
          error={error}
          disabled={disabled}
          sx={{
            fontFamily: tokens.typography.fontFamily,
            fontSize: `${tokens.typography.fontSize.xs}px`,
            fontWeight: tokens.typography.fontWeight.regular,
            color: disabled
              ? tokens.colors.text.disabled
              : error
              ? tokens.colors.error.main
              : tokens.colors.text.secondary,
            mb: 0,
          }}
        >
          {label}
        </FormLabel>
      )}

      {/* Control row */}
      <Box
        aria-label={ariaLabel}
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          height: `${height}px`,
          border: `1px solid ${borderColor}`,
          borderRadius: `${tokens.borderRadius.default}px`,
          overflow: 'hidden',
          backgroundColor: wrapperBg,
          // Error focus-within outline
          ...(error && {
            '&:focus-within': {
              outline: `2px solid ${tokens.colors.error.main}`,
              outlineOffset: '-1px',
            },
          }),
          ...(!error && {
            '&:focus-within': {
              borderColor: tokens.colors.components.border.focus,
              boxShadow: `0 0 0 2px ${tokens.colors.components.border.focusShadow}`,
            },
          }),
        }}
      >
        {/* Decrement button */}
        <IconButton
          aria-label="Decrease value"
          onClick={handleDecrement}
          disabled={decrementDisabled}
          disableRipple={false}
          size="small"
          tabIndex={disabled ? -1 : 0}
          sx={buttonSx(decrementDisabled)}
        >
          <RemoveOutlined sx={{ fontSize: iconSize }} />
        </IconButton>

        {/* Divider — left */}
        <Box
          sx={{
            width: '1px',
            height: '100%',
            backgroundColor: tokens.colors.components.border.default,
            flexShrink: 0,
          }}
        />

        {/* Numeric input */}
        <Box
          component="input"
          type="number"
          id={id}
          name={name}
          required={required}
          disabled={disabled}
          value={inputText}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onKeyDown={handleKeyDown}
          aria-label={ariaLabel ?? label}
          sx={{
            flex: 1,
            minWidth: 0,
            height: '100%',
            border: 'none',
            outline: 'none',
            backgroundColor: 'transparent',
            textAlign: 'center',
            fontFamily: tokens.typography.fontFamily,
            fontSize: `${fontSize}px`,
            fontWeight: tokens.typography.fontWeight.regular,
            color: disabled
              ? tokens.colors.text.disabled
              : tokens.colors.text.primary,
            // Remove native number spinners
            '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
              WebkitAppearance: 'none',
              margin: 0,
            },
            '&[type=number]': {
              MozAppearance: 'textfield',
            },
            cursor: disabled ? 'not-allowed' : 'text',
            padding: `0 ${tokens.spacing.xs}px`,
          }}
        />

        {/* Divider — right */}
        <Box
          sx={{
            width: '1px',
            height: '100%',
            backgroundColor: tokens.colors.components.border.default,
            flexShrink: 0,
          }}
        />

        {/* Increment button */}
        <IconButton
          aria-label="Increase value"
          onClick={handleIncrement}
          disabled={incrementDisabled}
          disableRipple={false}
          size="small"
          tabIndex={disabled ? -1 : 0}
          sx={buttonSx(incrementDisabled)}
        >
          <AddOutlined sx={{ fontSize: iconSize }} />
        </IconButton>
      </Box>

      {/* Helper / error text */}
      {helperText && (
        <FormHelperText
          error={error}
          disabled={disabled}
          sx={{
            fontFamily: tokens.typography.fontFamily,
            fontSize: `${tokens.typography.fontSize.xs}px`,
            margin: 0,
          }}
        >
          {helperText}
        </FormHelperText>
      )}
    </Box>
  );
});

NumberField.displayName = 'NumberField';

export default NumberField;
