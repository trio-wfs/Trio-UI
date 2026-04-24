/**
 * SearchBar Component
 *
 * SOURCE OF TRUTH: Figma node 492:653 (file: PjAYuPDr8IA1ccwiAjFkSD)
 *
 * Input + action button segment pattern. The support button shows
 * a text label and an icon — making it reusable as a search,
 * download, filter, or prompt trigger.
 *
 * Uses TRIO TextField for the input portion.
 * Sizes match TextField: Small = 30px, Medium = 38px.
 *
 * Text position within the support button:
 *   Left button:  text | icon  (text before icon)
 *   Right button: icon | text  (icon after text)
 */

import React from 'react';
import { Box, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { TextField } from '../TextField/TextField';
import { SearchBarProps, defaultSearchBarProps } from './SearchBar.types';
import { tokens } from '../../design-tokens/tokens';

const SIZE_MAP = {
  Small: {
    height: 30,
    fontSize: tokens.typography.fontSize.xs,    // 12px
    lineHeight: '12px',
    iconSize: 16,
    py: '4px',
    tfSize: 'small' as const,
  },
  Medium: {
    height: 38,
    fontSize: tokens.typography.fontSize.sm,    // 14px
    lineHeight: '14px',
    iconSize: 20,
    py: '6px',
    tfSize: 'medium' as const,
  },
};

export const SearchBar = React.forwardRef<HTMLDivElement, SearchBarProps>(({
  size = defaultSearchBarProps.size!,
  type = defaultSearchBarProps.type!,
  value = '',
  placeholder = defaultSearchBarProps.placeholder!,
  onChange,
  onSearch,
  disabled = false,
  supportCopy = defaultSearchBarProps.supportCopy,
  showIcon = defaultSearchBarProps.showIcon!,
  icon,
  name,
  id,
}, ref) => {
  const s = SIZE_MAP[size];
  const iconElement = icon || <SearchIcon sx={{ fontSize: s.iconSize }} />;

  // Support button — text position depends on which side it's on
  // Left button:  text | icon
  // Right button: icon | text
  const SupportButton: React.FC = () => (
    <Box
      component="button"
      onClick={disabled ? undefined : onSearch}
      disabled={disabled}
      aria-label={supportCopy || 'Search'}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '4px',
        height: s.height,
        px: `${tokens.spacing.sm}px`,
        py: s.py,
        backgroundColor: tokens.colors.secondary.main,
        border: `1px solid ${tokens.colors.components.input.enabledBorder}`,
        // Remove shared border between button and input
        ...(type === 'Left' && { borderRight: 'none' }),
        ...(type === 'Right' && { borderLeft: 'none' }),
        borderRadius: 0,
        color: disabled ? tokens.colors.text.disabled : tokens.colors.components.icon.default,
        cursor: disabled ? 'not-allowed' : 'pointer',
        flexShrink: 0,
        '&:hover': {
          backgroundColor: disabled ? undefined : tokens.colors.action.selected,
        },
      }}
    >
      {/* Left button: text first, then icon */}
      {type === 'Left' && supportCopy && (
        <Typography
          sx={{
            fontFamily: tokens.typography.fontFamily,
            fontSize: s.fontSize,
            fontWeight: tokens.typography.fontWeight.regular,
            lineHeight: s.lineHeight,
            color: disabled ? tokens.colors.text.disabled : tokens.colors.text.primary,
            whiteSpace: 'nowrap',
          }}
        >
          {supportCopy}
        </Typography>
      )}
      {showIcon && iconElement}
      {/* Right button: icon first, then text */}
      {type === 'Right' && supportCopy && (
        <Typography
          sx={{
            fontFamily: tokens.typography.fontFamily,
            fontSize: s.fontSize,
            fontWeight: tokens.typography.fontWeight.regular,
            lineHeight: s.lineHeight,
            color: disabled ? tokens.colors.text.disabled : tokens.colors.text.primary,
            whiteSpace: 'nowrap',
          }}
        >
          {supportCopy}
        </Typography>
      )}
    </Box>
  );

  return (
    <Box
      ref={ref}
      id={id}
      sx={{
        display: 'inline-flex',
        alignItems: 'stretch',
        borderRadius: `${tokens.borderRadius.default}px`,
        overflow: 'hidden',
        opacity: disabled ? 0.6 : 1,
      }}
    >
      {type === 'Left' && <SupportButton />}

      {/* TRIO TextField — strip its radius so it sits flush in the assembly */}
      <Box onKeyDown={(e: React.KeyboardEvent) => e.key === 'Enter' && onSearch?.()} sx={{
        '& .MuiOutlinedInput-root': {
          borderRadius: 0,
          height: s.height,
          minHeight: s.height,
        },
        '& .MuiOutlinedInput-root fieldset': {
          borderRadius: 0,
        },
        '& .MuiOutlinedInput-root.Mui-focused fieldset': {
          boxShadow: `0 0 0 3px ${tokens.colors.components.border.focusShadow}`,
        },
        minWidth: 180,
      }}>
        <TextField
          size={s.tfSize}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          disabled={disabled}
          name={name}
        />
      </Box>

      {type === 'Right' && <SupportButton />}
    </Box>
  );
});

SearchBar.displayName = 'SearchBar';
export default SearchBar;
