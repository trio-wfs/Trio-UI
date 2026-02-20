/**
 * Select Component
 *
 * SOURCE OF TRUTH: Figma component "Select" (node: 2433:8481)
 * Design System: AHTG Desktop SaaS
 *
 * EXTRACTED VALUES FROM FIGMA:
 * - Input height: 36px (uses TextField single-line instance)
 * - Total height with label: 58px (from .absoluteBoundingBox.height)
 * - Width: 256px default (from .absoluteBoundingBox.width)
 * - States: default, focus, disabled, error, selected (from variantOptions)
 * - Type: open, closed (from variantOptions)
 * - Uses text-field component internally (type: single-line)
 * - Dropdown uses custom Menu component (not system dropdown)
 *
 * CRITICAL RULES:
 * - All colors from tokens.ts (NO hardcoded hex values)
 * - All spacing from tokens.ts (8px system)
 * - All typography from tokens.ts
 * - Desktop-only (no responsive/mobile)
 * - Material Icons only
 */

import React, { useState, useRef } from 'react';
import { FormControl, InputLabel, FormHelperText, InputAdornment } from '@mui/material';
import { SelectProps, defaultSelectProps } from './Select.types';
import { tokens } from '../../design-tokens/tokens';
import { Menu } from '../Menu/Menu';
import { MenuItem } from '../Menu/Menu.types';

export const Select: React.FC<SelectProps> = ({
  state = defaultSelectProps.state,
  options = defaultSelectProps.options,
  value,
  onChange,
  label,
  helperText,
  placeholder = defaultSelectProps.placeholder,
  disabled = defaultSelectProps.disabled,
  error = defaultSelectProps.error,
  className,
  ...ariaProps
}) => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);

  const isDisabled = disabled || state === 'disabled';
  const hasError = error || state === 'error';
  const isFocused = state === 'focus' || open;

  // Find selected option label
  const selectedOption = options?.find((opt) => opt.value === value);
  const displayValue = selectedOption?.label || placeholder || '';

  const handleClick = () => {
    if (!isDisabled) {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleMenuItemClick = (optionValue: string) => {
    if (onChange) {
      // Create synthetic event
      const syntheticEvent = {
        target: { value: optionValue },
      } as React.ChangeEvent<{ value: string }>;
      onChange(syntheticEvent as any);
    }
    setOpen(false);
  };

  // Convert options to Menu items
  const menuItems: MenuItem[] = options?.map((option) => ({
    id: option.value,
    label: option.label,
    state: option.value === value ? 'selected' : option.disabled ? 'disabled' : 'default',
    disabled: option.disabled,
    selected: option.value === value,
    onClick: () => handleMenuItemClick(option.value),
  })) || [];

  return (
    <FormControl
      fullWidth
      error={hasError}
      disabled={isDisabled}
      className={className}
      sx={{
        fontFamily: tokens.typography.fontFamily,
      }}
    >
      {label && (
        <InputLabel
          shrink
          sx={{
            fontSize: `${tokens.typography.fontSize.xs}px`,
            fontWeight: tokens.typography.fontWeight.medium,
            color: hasError
              ? tokens.colors.error.main
              : isFocused
              ? tokens.colors.primary.main
              : tokens.colors.text.primary,
            '&.Mui-disabled': {
              color: tokens.colors.text.disabled,
            },
            position: 'relative',
            transform: 'none',
            marginBottom: `${tokens.spacing.xs}px`,
          }}
        >
          {label}
        </InputLabel>
      )}
      <div
        ref={anchorRef}
        onClick={handleClick}
        style={{
          fontFamily: tokens.typography.fontFamily,
          height: '36px',
          backgroundColor: isDisabled
            ? tokens.colors.action.disabledBackground
            : tokens.colors.background.paper,
          borderRadius: `${tokens.borderRadius.default}px`,
          fontSize: `${tokens.typography.fontSize.sm}px`,
          display: 'flex',
          alignItems: 'center',
          padding: `0 ${tokens.spacing.md}px`,
          border: `${isFocused ? 2 : 1}px solid ${
            hasError
              ? tokens.colors.error.main
              : isFocused
              ? tokens.colors.border.focus
              : tokens.colors.components.input.enabledBorder
          }`,
          cursor: isDisabled ? 'default' : 'pointer',
          color: isDisabled
            ? tokens.colors.text.disabled
            : !value && placeholder
            ? tokens.colors.text.secondary
            : tokens.colors.text.primary,
          userSelect: 'none',
          transition: 'border 0.2s',
        }}
        onMouseEnter={(e) => {
          if (!isDisabled && !isFocused) {
            e.currentTarget.style.borderColor = tokens.colors.components.input.hoverBorder;
          }
        }}
        onMouseLeave={(e) => {
          if (!isDisabled && !isFocused) {
            e.currentTarget.style.borderColor = hasError
              ? tokens.colors.error.main
              : tokens.colors.components.input.enabledBorder;
          }
        }}
        {...ariaProps}
      >
        <span style={{ flex: 1 }}>{displayValue}</span>
        <span
          className="material-icons"
          style={{
            fontSize: '18px',
            marginLeft: `${tokens.spacing.sm}px`,
            color: isDisabled ? tokens.colors.text.disabled : tokens.colors.text.secondary,
            transition: 'transform 0.2s',
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        >
          arrow_drop_down
        </span>
      </div>

      {/* Custom Menu Dropdown */}
      <Menu
        anchorEl={anchorRef.current}
        open={open}
        onClose={handleClose}
        items={menuItems}
        state="single"
        width={anchorRef.current?.offsetWidth}
      />

      {helperText && (
        <FormHelperText
          sx={{
            fontSize: `${tokens.typography.fontSize.xs}px`,
            color: hasError ? tokens.colors.error.main : tokens.colors.text.secondary,
            marginLeft: 0,
            marginTop: `${tokens.spacing.xs}px`,
            fontFamily: tokens.typography.fontFamily,
          }}
        >
          {helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
};

Select.displayName = 'Select';

export default Select;
