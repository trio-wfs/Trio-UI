/**
 * Select Component
 *
 * SOURCE OF TRUTH: Figma component "Select" (node: 2433:8481)
 * Design System: AHTG Desktop SaaS
 *
 * Theme migration (2026-04-15):
 * - InputLabel typography/layout now inherited from MuiFormLabel + MuiInputLabel theme.
 * - FormHelperText typography now inherited from MuiFormHelperText theme.
 * - Trigger styling is intentionally kept inline — Select uses a custom <div>
 *   (not MuiOutlinedInput) because the dropdown uses our Menu component, and
 *   the visual state (default/focus/error/disabled) is driven by the `state` prop.
 *
 * EXTRACTED VALUES FROM FIGMA:
 * - Input height: 38px medium / 32px small (uses TextField single-line instance)
 * - Width: 256px default
 * - Sizes: medium (default), small
 * - Uses custom Menu component (not system dropdown)
 */

import React, { useState, useRef, useId } from 'react';
import { FormControl, InputLabel, FormHelperText } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { type SelectProps, defaultSelectProps } from './Select.types';
import { tokens } from '../../design-tokens/tokens';
import { Menu } from '../Menu/Menu';
import type { MenuItem } from '../Menu/Menu.types';

export const Select = React.forwardRef<HTMLDivElement, SelectProps>(({
  state = defaultSelectProps.state,
  size = defaultSelectProps.size,
  options = defaultSelectProps.options,
  value,
  onChange,
  label,
  helperText,
  placeholder = defaultSelectProps.placeholder,
  disabled = defaultSelectProps.disabled,
  error = defaultSelectProps.error,
  name,
  id,
  required,
  className,
  ...ariaProps
}, ref) => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);

  // Stable IDs for label↔trigger ARIA linkage. Allow consumer to override via `id`.
  const generatedId = useId();
  const labelId = `${generatedId}-label`;
  const triggerId = id ?? `${generatedId}-trigger`;
  const listboxId = `${generatedId}-listbox`;

  const isDisabled = disabled || state === 'disabled';
  const hasError = error || state === 'error';
  const isFocused = state === 'focus' || open;
  const isSmall = size === 'small';

  // Keyboard support — open the dropdown via Enter / Space / ArrowDown / ArrowUp.
  // Once open, MUI Menu handles arrow-key navigation, Enter to select, Escape to close.
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (isDisabled) return;
    if (event.key === 'Enter' || event.key === ' ' || event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      setOpen(true);
    } else if (event.key === 'Escape' && open) {
      event.preventDefault();
      setOpen(false);
    }
  };

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
    onChange?.(optionValue);
    setOpen(false);
  };

  // Convert options to Menu items
  const menuItems: MenuItem[] = options?.map((option) => ({
    id: option.value,
    label: option.label,
    state: option.value === value ? 'selected' : option.disabled ? 'disabled' : 'default',
    disabled: option.disabled,
    selected: option.value === value,
    leftContent: option.leftContent,
    rightContent: option.rightContent,
    onClick: () => handleMenuItemClick(option.value),
  })) || [];

  return (
    <FormControl
      ref={ref}
      fullWidth
      error={hasError}
      disabled={isDisabled}
      required={required}
      className={className}
    >
      {label && (
        <InputLabel id={labelId} shrink>{label}</InputLabel>
      )}
      {name && <input type="hidden" name={name} value={value ?? ''} />}
      <div
        ref={anchorRef}
        id={triggerId}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listboxId : undefined}
        aria-labelledby={label ? labelId : undefined}
        aria-disabled={isDisabled || undefined}
        aria-invalid={hasError || undefined}
        aria-required={required || undefined}
        tabIndex={isDisabled ? -1 : 0}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        style={{
          fontFamily: tokens.typography.fontFamily,
          height: isSmall ? `${tokens.controls.height.small}px` : `${tokens.controls.height.medium}px`,
          backgroundColor: isDisabled
            ? tokens.colors.action.disabledBackground
            : 'transparent',
          borderRadius: `${tokens.borderRadius.default}px`,
          fontSize: `${isSmall ? tokens.typography.fontSize.xs : tokens.typography.fontSize.sm}px`,
          display: 'flex',
          alignItems: 'center',
          padding: isSmall ? `0 ${tokens.spacing.sm}px` : `0 ${tokens.spacing.md}px`,
          border: `${isFocused ? 2 : 1}px solid ${
            isDisabled
              ? tokens.colors.components.input.disabledBorder
              : hasError
              ? tokens.colors.error.main
              : isFocused
              ? tokens.colors.components.border.focus
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
        <ArrowDropDownIcon
          sx={{
            fontSize: isSmall ? 16 : 18,
            ml: `${tokens.spacing.sm}px`,
            color: isDisabled ? tokens.colors.text.disabled : tokens.colors.text.secondary,
            transition: 'transform 0.2s',
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        />
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

      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
});

Select.displayName = 'Select';

export default Select;
