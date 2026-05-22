/**
 * Autocomplete Component
 *
 * SOURCE OF TRUTH: Figma component "Autocomplete" (node: 2381:6441)
 * Design System: AHTG Desktop SaaS
 *
 * Theme migration (2026-04-15):
 * - Input chrome (border, padding, sizing, input/label/helper typography)
 *   inherited from MuiTextField theme — Autocomplete internally renders
 *   a MuiTextField via renderInput.
 * - Popup indicator, clear indicator, dropdown paper, and option styling
 *   live in theme at components.MuiAutocomplete.styleOverrides.
 * - Remaining in-component sx covers two Autocomplete-specific needs:
 *   1. Multi-select chip container: force nowrap + overflow hidden so the
 *      input stays on one line (overflow handled by limitTags).
 *   2. Chip styles inside the input (24px height, pill shape, outlined).
 *      These are input-scoped chip styles, not standalone Chip component.
 */

import React from 'react';
import { Autocomplete as MuiAutocomplete, TextField, Chip, type SxProps, type Theme } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { type AutocompleteProps, type AutocompleteOption, defaultAutocompleteProps } from './Autocomplete.types';
import { tokens } from '../../design-tokens/tokens';

const inputChipSx = {
  '& .MuiOutlinedInput-root': {
    flexWrap: 'nowrap',
    overflow: 'hidden',
    '& .MuiChip-root': {
      height: '24px',
      fontSize: `${tokens.typography.caption.fontSize}px`,
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
};

export const Autocomplete = React.forwardRef<HTMLDivElement, AutocompleteProps>(({
  type = defaultAutocompleteProps.type,
  state = defaultAutocompleteProps.state,
  size = defaultAutocompleteProps.size,
  options = defaultAutocompleteProps.options,
  value,
  onChange,
  label,
  placeholder = defaultAutocompleteProps.placeholder,
  helperText,
  errorText,
  disabled = defaultAutocompleteProps.disabled,
  required = defaultAutocompleteProps.required,
  limitTags = 5,
  id,
  name,
  className,
  ...ariaProps
}, ref) => {
  const isMulti = type === 'multi';
  const isError = state === 'error';
  const isSmall = size === 'small';
  const displayedHelperText = isError ? errorText : helperText;

  const popupIcon = (
    <ArrowDropDownIcon sx={{ fontSize: isSmall ? 18 : 20, color: tokens.colors.text.secondary }} />
  );

  const smallSx: SxProps<Theme> = isSmall ? {
    '& .MuiOutlinedInput-root': {
      height: `${tokens.controls.height.small}px`,
      padding: `${tokens.spacing.xs}px ${tokens.spacing.sm}px`,
      fontSize: `${tokens.typography.fontSize.xs}px`,
    },
    '& .MuiOutlinedInput-input': {
      fontSize: `${tokens.typography.fontSize.xs}px`,
      padding: '0 !important',
    },
    '& .MuiAutocomplete-endAdornment': {
      right: `${tokens.spacing.xs}px`,
    },
  } : {};

  if (isMulti) {
    return (
      <MuiAutocomplete<AutocompleteOption, true, false, false>
        ref={ref}
        id={id}
        multiple
        limitTags={limitTags}
        options={options || []}
        value={(value as AutocompleteOption[]) || []}
        onChange={(_, newValue) => onChange?.(newValue)}
        disabled={disabled}
        getOptionLabel={(option) => option.label}
        isOptionEqualToValue={(option, val) => option.value === val.value}
        className={className}
        // @ts-expect-error — renderTags exists at runtime but removed from MUI v9 types
        renderTags={(tagValue: AutocompleteOption[], getTagProps: any) =>
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
            variant="outlined"
            size={isSmall ? 'small' : 'medium'}
            label={label}
            placeholder={placeholder}
            required={required}
            error={isError}
            helperText={displayedHelperText}
            slotProps={{
              ...params.slotProps,
              inputLabel: { ...params.slotProps.inputLabel, shrink: true },
              input: { ...params.slotProps.input, notched: false },
            }}
            sx={{ ...inputChipSx, ...smallSx }}
            {...ariaProps}
          />
        )}
        popupIcon={popupIcon}
      />
    );
  }

  return (
    <MuiAutocomplete
      ref={ref}
      id={id}
      options={options || []}
      value={(value as AutocompleteOption) || null}
      onChange={(_, newValue) => onChange?.(newValue)}
      disabled={disabled}
      getOptionLabel={(option) => option.label}
      isOptionEqualToValue={(option, val) => option.value === val.value}
      className={className}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          size={isSmall ? 'small' : 'medium'}
          label={label}
          placeholder={placeholder}
          required={required}
          name={name}
          error={isError}
          helperText={displayedHelperText}
          slotProps={{
            ...params.slotProps,
            inputLabel: { ...params.slotProps.inputLabel, shrink: true },
            input: { ...params.slotProps.input, notched: false },
          }}
          sx={smallSx}
          {...ariaProps}
        />
      )}
      popupIcon={popupIcon}
    />
  );
});

Autocomplete.displayName = 'Autocomplete';
export default Autocomplete;
