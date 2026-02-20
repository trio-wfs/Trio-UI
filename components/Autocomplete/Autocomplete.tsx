/**
 * Autocomplete Component
 *
 * SOURCE OF TRUTH: Figma component "Autocomplete" (node: 2381:6441)
 * Cache: ~/.openclaw/shared-data/figma-specs/autocomplete.json
 * Design System: AHTG Desktop SaaS
 *
 * EXTRACTED VALUES FROM FIGMA:
 * - Input container height: 36px
 * - Input padding: 4px top/bottom, 8px left/right (paddingTop/Bottom: 4, paddingLeft/Right: 8)
 * - Border radius: 4px (tokens.borderRadius.default)
 * - Default border: #9E9E9E (tokens.colors.components.input.enabledBorder)
 * - Focus border:  #64B5F6 (tokens.colors.components.border.focus)
 * - Error border:  #DB4537 (tokens.colors.error.main)
 * - Disabled border: #E0E0E0 (tokens.colors.components.input.disabledBorder)
 * - Disabled fill: rgba(0,0,0,0.07) (tokens.colors.action.disabled)
 * - Label typography: 12px Regular (tokens.typography.caption)
 * - Input typography: 14px Regular (tokens.typography.body2)
 *
 * CRITICAL RULES:
 * - All colors from tokens.ts (NO hardcoded hex values)
 * - All spacing from tokens.ts (8px system)
 * - All typography from tokens.ts
 * - Desktop-only (no responsive/mobile)
 * - Material Icons only
 */

import React, { useState, useRef, useEffect } from 'react';
import { Autocomplete as MuiAutocomplete, TextField, Chip } from '@mui/material';
import { AutocompleteProps, AutocompleteOption, defaultAutocompleteProps } from './Autocomplete.types';
import { tokens } from '../../design-tokens/tokens';

export const Autocomplete: React.FC<AutocompleteProps> = ({
  type = defaultAutocompleteProps.type,
  state = defaultAutocompleteProps.state,
  options = defaultAutocompleteProps.options,
  value,
  onChange,
  label,
  placeholder = defaultAutocompleteProps.placeholder,
  helperText,
  errorText,
  disabled = defaultAutocompleteProps.disabled,
  required = defaultAutocompleteProps.required,
  className,
  ...ariaProps
}) => {
  const isMulti = type === 'multi';
  const isError = state === 'error';
  const isDisabled = disabled;

  const getBorderColor = (focused: boolean) => {
    if (isError) return tokens.colors.error.main;
    if (focused) return tokens.colors.components.border.focus;
    return tokens.colors.components.input.enabledBorder;
  };

  const displayedHelperText = isError ? errorText : helperText;

  const sharedSx = {
    fontFamily: tokens.typography.fontFamily,
    '& .MuiOutlinedInput-root': {
      fontFamily: tokens.typography.fontFamily,
      fontSize: tokens.typography.body2.fontSize,
      fontWeight: tokens.typography.fontWeight.regular,
      lineHeight: `${tokens.typography.body2.lineHeight}px`,
      borderRadius: `${tokens.borderRadius.default}px`,
      // Extracted: height 36px, padding 4px top/bottom, 8px left/right
      minHeight: '36px',
      padding: `${tokens.spacing.xs}px ${tokens.spacing.sm}px`,
      backgroundColor: isDisabled ? tokens.colors.action.disabled : 'transparent',
      '& input': {
        padding: 0,
        fontSize: tokens.typography.body2.fontSize,
        fontFamily: tokens.typography.fontFamily,
        color: isDisabled ? tokens.colors.text.disabled : tokens.colors.text.primary,
      },
      '& fieldset': {
        borderColor: isError
          ? tokens.colors.error.main
          : tokens.colors.components.input.enabledBorder,
        borderRadius: `${tokens.borderRadius.default}px`,
      },
      '&:hover fieldset': {
        borderColor: isError
          ? tokens.colors.error.main
          : tokens.colors.components.input.hoverBorder,
      },
      '&.Mui-focused fieldset': {
        borderColor: getBorderColor(true),
        borderWidth: '1px',
      },
      '&.Mui-disabled': {
        backgroundColor: tokens.colors.action.disabled,
        '& fieldset': {
          borderColor: tokens.colors.components.input.disabledBorder,
        },
      },
      // Chip styles for multi-select
      '& .MuiChip-root': {
        height: '24px',
        fontSize: tokens.typography.caption.fontSize,
        fontFamily: tokens.typography.fontFamily,
        backgroundColor: tokens.colors.background.secondary,
        border: `1px solid ${tokens.colors.components.border.default}`,
        borderRadius: `${tokens.borderRadius.full}px`,
        '& .MuiChip-deleteIcon': {
          fontSize: '14px',
          color: tokens.colors.text.secondary,
          '&:hover': { color: tokens.colors.text.primary },
        },
      },
    },
    '& .MuiInputLabel-root': {
      fontFamily: tokens.typography.fontFamily,
      fontSize: tokens.typography.caption.fontSize,
      fontWeight: tokens.typography.fontWeight.regular,
      color: tokens.colors.text.secondary,
      transform: 'none',
      position: 'relative',
      marginBottom: `${tokens.spacing.xs}px`,
      '&.Mui-focused': { color: tokens.colors.text.secondary },
      '&.Mui-error': { color: tokens.colors.error.main },
    },
    '& .MuiFormHelperText-root': {
      fontFamily: tokens.typography.fontFamily,
      fontSize: tokens.typography.caption.fontSize,
      marginTop: `${tokens.spacing.xs}px`,
      marginLeft: 0,
      color: isError ? tokens.colors.error.main : tokens.colors.text.secondary,
    },
  };

  if (isMulti) {
    return (
      <MuiAutocomplete
        multiple
        options={options || []}
        value={(value as AutocompleteOption[]) || []}
        onChange={(_, newValue) => onChange?.(newValue)}
        disabled={isDisabled}
        getOptionLabel={(option) => option.label}
        isOptionEqualToValue={(option, val) => option.value === val.value}
        className={className}
        renderTags={(tagValue, getTagProps) =>
          tagValue.map((option, index) => (
            <Chip
              label={option.label}
              {...getTagProps({ index })}
              key={option.value}
            />
          ))
        }
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            placeholder={placeholder}
            required={required}
            error={isError}
            helperText={displayedHelperText}
            InputLabelProps={{ shrink: true }}
            sx={sharedSx}
            {...ariaProps}
          />
        )}
        popupIcon={
          <span className="material-icons" style={{ fontSize: 20, color: tokens.colors.text.secondary }}>
            arrow_drop_down
          </span>
        }
        sx={{
          '& .MuiAutocomplete-popupIndicator': { padding: `${tokens.spacing.xs}px` },
          '& .MuiAutocomplete-clearIndicator': { color: tokens.colors.text.secondary },
          '& .MuiAutocomplete-paper': {
            borderRadius: `${tokens.borderRadius.default}px`,
            boxShadow: tokens.shadows.md,
            fontFamily: tokens.typography.fontFamily,
          },
          '& .MuiAutocomplete-option': {
            fontFamily: tokens.typography.fontFamily,
            fontSize: tokens.typography.body2.fontSize,
            padding: `${tokens.spacing.sm}px ${tokens.spacing.md}px`,
            '&.Mui-focused': { backgroundColor: tokens.colors.action.hover },
            '&[aria-selected="true"]': { backgroundColor: tokens.colors.primary.light },
          },
        }}
      />
    );
  }

  return (
    <MuiAutocomplete
      options={options || []}
      value={(value as AutocompleteOption) || null}
      onChange={(_, newValue) => onChange?.(newValue)}
      disabled={isDisabled}
      getOptionLabel={(option) => option.label}
      isOptionEqualToValue={(option, val) => option.value === val.value}
      className={className}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          placeholder={placeholder}
          required={required}
          error={isError}
          helperText={displayedHelperText}
          InputLabelProps={{ shrink: true }}
          sx={sharedSx}
          {...ariaProps}
        />
      )}
      popupIcon={
        <span className="material-icons" style={{ fontSize: 20, color: tokens.colors.text.secondary }}>
          arrow_drop_down
        </span>
      }
      sx={{
        '& .MuiAutocomplete-popupIndicator': { padding: `${tokens.spacing.xs}px` },
        '& .MuiAutocomplete-clearIndicator': { color: tokens.colors.text.secondary },
        '& .MuiAutocomplete-paper': {
          borderRadius: `${tokens.borderRadius.default}px`,
          boxShadow: tokens.shadows.md,
          fontFamily: tokens.typography.fontFamily,
        },
        '& .MuiAutocomplete-option': {
          fontFamily: tokens.typography.fontFamily,
          fontSize: tokens.typography.body2.fontSize,
          padding: `${tokens.spacing.sm}px ${tokens.spacing.md}px`,
          '&.Mui-focused': { backgroundColor: tokens.colors.action.hover },
          '&[aria-selected="true"]': { backgroundColor: tokens.colors.primary.light },
        },
      }}
    />
  );
};

Autocomplete.displayName = 'Autocomplete';
export default Autocomplete;
