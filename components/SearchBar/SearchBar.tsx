/**
 * SearchBar Component
 *
 * SOURCE OF TRUTH: Figma node 492:653 (file: PjAYuPDr8IA1ccwiAjFkSD)
 *
 * A TextField with optional support button segment(s) containing a search icon.
 *   type = Left  → search button on the left
 *   type = Right → search button on the right
 *   type = Both  → search buttons on both sides
 *
 * Sizes map to MUI TextField sizes:
 *   Small  → small  (height ~32px)
 *   Medium → medium (height ~40px, Figma default)
 *   Large  → medium with extra padding (~48px)
 */

import React from 'react';
import { Box, IconButton, InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { SearchBarProps, defaultSearchBarProps } from './SearchBar.types';
import { tokens } from '../../design-tokens/tokens';

const sizeHeightMap = {
  Small: 32,
  Medium: 40,
  Large: 48,
};

const sizeFontMap = {
  Small: tokens.typography.fontSize.xs,   // 12px
  Medium: tokens.typography.fontSize.sm,  // 14px
  Large: tokens.typography.fontSize.md,   // 16px
};

export const SearchBar: React.FC<SearchBarProps> = ({
  size = defaultSearchBarProps.size!,
  type = defaultSearchBarProps.type!,
  value = '',
  placeholder = defaultSearchBarProps.placeholder!,
  onChange,
  onSearch,
  disabled = false,
}) => {
  const height = sizeHeightMap[size];
  const fontSize = sizeFontMap[size];
  const showLeft = type === 'Left' || type === 'Both';
  const showRight = type === 'Right' || type === 'Both';

  const supportButtonSx = {
    width: height,
    height,
    borderRadius: 0,
    backgroundColor: tokens.colors.secondary.main,
    border: `1px solid ${tokens.colors.components.input.enabledBorder}`,
    color: disabled ? tokens.colors.text.disabled : tokens.colors.components.icon.default,
    '&:hover': {
      backgroundColor: disabled ? undefined : tokens.colors.action.selected,
    },
    flexShrink: 0,
  };

  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'stretch',
        borderRadius: `${tokens.borderRadius.default}px`,
        overflow: 'hidden',
        opacity: disabled ? 0.6 : 1,
      }}
    >
      {/* Left support button */}
      {showLeft && (
        <IconButton
          onClick={disabled ? undefined : onSearch}
          disabled={disabled}
          aria-label="Search"
          sx={{
            ...supportButtonSx,
            borderRight: 'none',
            borderTopLeftRadius: `${tokens.borderRadius.default}px`,
            borderBottomLeftRadius: `${tokens.borderRadius.default}px`,
          }}
        >
          <SearchIcon sx={{ fontSize: size === 'Large' ? 22 : 18 }} />
        </IconButton>
      )}

      {/* Text field */}
      <TextField
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && onSearch?.()}
        variant="outlined"
        size={size === 'Small' ? 'small' : 'medium'}
        InputProps={{
          // When type is Right or Both, show a search icon adornment on the right
          endAdornment: showRight ? (
            <InputAdornment position="end">
              <IconButton
                onClick={disabled ? undefined : onSearch}
                disabled={disabled}
                size="small"
                aria-label="Search"
                edge="end"
                sx={{ color: tokens.colors.components.icon.default }}
              >
                <SearchIcon sx={{ fontSize: size === 'Large' ? 22 : 18 }} />
              </IconButton>
            </InputAdornment>
          ) : undefined,
          sx: {
            height,
            fontSize,
            fontFamily: tokens.typography.fontFamily,
            borderRadius: showLeft || showRight ? 0 : `${tokens.borderRadius.default}px`,
            borderTopLeftRadius: showLeft ? 0 : undefined,
            borderBottomLeftRadius: showLeft ? 0 : undefined,
            borderTopRightRadius: showRight ? 0 : undefined,
            borderBottomRightRadius: showRight ? 0 : undefined,
            backgroundColor: tokens.colors.background.paper,
            '& fieldset': {
              borderColor: tokens.colors.components.input.enabledBorder,
              borderRadius: 'inherit',
            },
            '&:hover fieldset': {
              borderColor: disabled ? undefined : tokens.colors.components.input.hoverBorder,
            },
            '&.Mui-focused fieldset': {
              borderColor: tokens.colors.components.border.focus,
              boxShadow: `0 0 0 3px ${tokens.colors.components.border.focusShadow}`,
            },
            '&.Mui-disabled fieldset': {
              borderColor: tokens.colors.components.input.disabledBorder,
            },
          },
        }}
        sx={{ minWidth: 200 }}
      />

      {/* Right support button — only when type=Right (no endAdornment overlap) */}
      {type === 'Right' && (
        <IconButton
          onClick={disabled ? undefined : onSearch}
          disabled={disabled}
          aria-label="Search"
          sx={{
            ...supportButtonSx,
            borderLeft: 'none',
            borderTopRightRadius: `${tokens.borderRadius.default}px`,
            borderBottomRightRadius: `${tokens.borderRadius.default}px`,
          }}
        >
          <SearchIcon sx={{ fontSize: size === 'Large' ? 22 : 18 }} />
        </IconButton>
      )}
    </Box>
  );
};

SearchBar.displayName = 'SearchBar';
export default SearchBar;
