import React, { useState, forwardRef, InputHTMLAttributes } from 'react';
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { SxProps, Theme } from '@mui/material';

// Exact design token color mappings from Figma design-tokens/palette.json
const COLOR_TOKENS = {
  primary: {
    main: '#2196F3',
    light: '#E3F2FD',
    dark: '#1976D2',
  },
  text: {
    primary: '#212121',
    secondary: '#757575',
    disabled: '#9E9E9E',
    error: '#DB4537',
  },
  components: {
    input: {
      enabledBorder: '#9E9E9E',
      hoverBorder: '#616161',
      disabledBorder: '#E0E0E0',
    },
    icon: {
      default: '#424242',
      disabled: '#9E9E9E',
    },
    border: {
      focus: '#64B5F6',
      focusShadow: 'rgba(66, 165, 245, 0.18)',
    },
  },
  action: {
    disabledBackground: '#EEEEEE',
  },
  background: {
    paper: '#FFFFFF',
  },
  error: {
    main: '#DB4537',
    light: '#FBEAED',
  },
};

// Exact size configurations following AHTG 8px grid system
const SIZES = {
  sm: {
    height: '32px',
    padding: '6px 12px',
    fontSize: '0.8125rem', // 13px
    iconSize: '18px',
    gap: '8px',
  },
  md: {
    height: '40px',
    padding: '8px 16px',
    fontSize: '0.875rem', // 14px
    iconSize: '20px',
    gap: '8px',
  },
};

export type SearchInputSize = 'md' | 'sm';
export type SearchInputVariant = 'outlined' | 'filled';
export type SearchInputState = 'default' | 'focused' | 'disabled' | 'error';

export interface SearchInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /**
   * The size of the input component
   * @default 'md'
   */
  size?: SearchInputSize;

  /**
   * The visual variant of the input
   * @default 'outlined'
   */
  variant?: SearchInputVariant;

  /**
   * The current state of the input
   * @default 'default'
   */
  state?: SearchInputState;

  /**
   * If true, the input will display an error state
   * @default false
   */
  error?: boolean;

  /**
   * The placeholder text
   */
  placeholder?: string;

  /**
   * The value of the input element
   */
  value?: string;

  /**
   * Callback fired when the value is changed
   */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;

  /**
   * Callback fired when the input is focused
   */
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;

  /**
   * Callback fired when the input loses focus
   */
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;

  /**
   * If true, the input will be disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * MUI sx prop for custom styling
   */
  sx?: SxProps<Theme>;

  /**
   * If true, hides the search icon
   * @default false
   */
  hideIcon?: boolean;

  /**
   * ARIA label for accessibility
   */
  'aria-label'?: string;
}

interface StyledInputWrapperProps {
  $size: SearchInputSize;
  $variant: SearchInputVariant;
  $state: SearchInputState;
  $error: boolean;
}

const StyledInputWrapper = styled('div')<StyledInputWrapperProps>(({
  theme,
  $size,
  $variant,
  $state,
  $error,
}) => {
  const sizeConfig = SIZES[$size];
  const isDisabled = $state === 'disabled';
  const isFocused = $state === 'focused';
  const hasError = $error || $state === 'error';

  // Base styles
  const baseStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: sizeConfig.gap,
    height: sizeConfig.height,
    padding: sizeConfig.padding,
    borderRadius: '4px',
    fontFamily: 'Roboto, sans-serif',
    fontSize: sizeConfig.fontSize,
    transition: 'all 150ms cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative' as const,
  };

  // Variant-specific styles
  if ($variant === 'outlined') {
    const getBorderColor = () => {
      if (isDisabled) return COLOR_TOKENS.components.input.disabledBorder;
      if (hasError) return COLOR_TOKENS.error.main;
      if (isFocused) return COLOR_TOKENS.primary.main;
      return COLOR_TOKENS.components.input.enabledBorder;
    };

    return {
      ...baseStyles,
      backgroundColor: isDisabled ? COLOR_TOKENS.action.disabledBackground : COLOR_TOKENS.background.paper,
      border: `1px solid ${getBorderColor()}`,
      boxShadow: isFocused && !hasError ? `0 0 0 3px ${COLOR_TOKENS.components.border.focusShadow}` : 'none',
      '&:hover:not(:focus-within)': !isDisabled && !hasError ? {
        borderColor: COLOR_TOKENS.components.input.hoverBorder,
      } : {},
      '&:focus-within': !isDisabled ? {
        borderColor: hasError ? COLOR_TOKENS.error.main : COLOR_TOKENS.primary.main,
        boxShadow: hasError 
          ? `0 0 0 3px rgba(219, 69, 55, 0.18)` 
          : `0 0 0 3px ${COLOR_TOKENS.components.border.focusShadow}`,
        outline: 'none',
      } : {},
    };
  }

  // Filled variant
  return {
    ...baseStyles,
    backgroundColor: isDisabled 
      ? COLOR_TOKENS.action.disabledBackground 
      : hasError 
        ? COLOR_TOKENS.error.light 
        : COLOR_TOKENS.primary.light,
    border: 'none',
    borderBottom: `2px solid ${
      isDisabled 
        ? COLOR_TOKENS.components.input.disabledBorder 
        : hasError 
          ? COLOR_TOKENS.error.main 
          : isFocused 
            ? COLOR_TOKENS.primary.main 
            : COLOR_TOKENS.components.input.enabledBorder
    }`,
    borderRadius: '4px 4px 0 0',
    '&:hover:not(:focus-within)': !isDisabled ? {
      backgroundColor: hasError ? COLOR_TOKENS.error.light : COLOR_TOKENS.primary.light,
      borderBottomColor: hasError 
        ? COLOR_TOKENS.error.main 
        : COLOR_TOKENS.components.input.hoverBorder,
    } : {},
    '&:focus-within': !isDisabled ? {
      borderBottomColor: hasError ? COLOR_TOKENS.error.main : COLOR_TOKENS.primary.main,
      backgroundColor: hasError ? COLOR_TOKENS.error.light : COLOR_TOKENS.primary.light,
      outline: 'none',
    } : {},
  };
});

interface StyledIconProps {
  $size: SearchInputSize;
  $disabled: boolean;
}

const StyledIcon = styled(SearchIcon)<StyledIconProps>(({ $size, $disabled }) => ({
  fontSize: SIZES[$size].iconSize,
  color: $disabled ? COLOR_TOKENS.components.icon.disabled : COLOR_TOKENS.components.icon.default,
  flexShrink: 0,
}));

interface StyledInputBaseProps {
  $size: SearchInputSize;
  $disabled: boolean;
  $error: boolean;
}

const StyledInputBase = styled(InputBase)<StyledInputBaseProps>(({ $size, $disabled, $error }) => ({
  flex: 1,
  fontSize: SIZES[$size].fontSize,
  fontFamily: 'Roboto, sans-serif',
  color: $disabled 
    ? COLOR_TOKENS.text.disabled 
    : $error 
      ? COLOR_TOKENS.text.error 
      : COLOR_TOKENS.text.primary,
  '& input': {
    padding: 0,
    height: 'auto',
    '&::placeholder': {
      color: COLOR_TOKENS.text.secondary,
      opacity: 1,
    },
    '&:disabled::placeholder': {
      color: COLOR_TOKENS.text.disabled,
    },
  },
}));

/**
 * SearchInput Component
 * 
 * A text input component with a search icon prefix, following the AHTG design system.
 * Supports outlined and filled variants, multiple sizes, and various states.
 * 
 * Design System Compliance:
 * - Uses 8px spacing system
 * - Material Icons (Search icon)
 * - Desktop-only (no responsive)
 * - Roboto typography
 * - Design tokens from palette.json
 * 
 * @example
 * ```tsx
 * <SearchInput
 *   size="md"
 *   variant="outlined"
 *   placeholder="Search physicians..."
 *   value={searchTerm}
 *   onChange={(e) => setSearchTerm(e.target.value)}
 * />
 * ```
 */
export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  (
    {
      size = 'md',
      variant = 'outlined',
      state = 'default',
      error = false,
      placeholder = 'Search...',
      value,
      onChange,
      onFocus,
      onBlur,
      disabled = false,
      className,
      sx,
      hideIcon = false,
      'aria-label': ariaLabel,
      ...rest
    },
    ref
  ) => {
    const [internalFocused, setInternalFocused] = useState(false);

    // Determine the actual state
    const actualState: SearchInputState = disabled 
      ? 'disabled' 
      : error 
        ? 'error' 
        : internalFocused 
          ? 'focused' 
          : state;

    const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
      setInternalFocused(true);
      onFocus?.(event);
    };

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
      setInternalFocused(false);
      onBlur?.(event);
    };

    return (
      <StyledInputWrapper
        $size={size}
        $variant={variant}
        $state={actualState}
        $error={error}
        className={className}
        sx={sx}
      >
        {!hideIcon && (
          <StyledIcon
            $size={size}
            $disabled={disabled}
            aria-hidden="true"
          />
        )}
        <StyledInputBase
          $size={size}
          $disabled={disabled}
          $error={error}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
          placeholder={placeholder}
          inputRef={ref}
          inputProps={{
            'aria-label': ariaLabel || placeholder,
            ...rest,
          }}
        />
      </StyledInputWrapper>
    );
  }
);

SearchInput.displayName = 'SearchInput';

export default SearchInput;
