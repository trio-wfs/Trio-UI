import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Button variant type */
  variant?: 'contained' | 'outlined' | 'text';
  /** Button color theme */
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
  /** Button size */
  size?: 'sm' | 'md';
  /** Loading state - shows spinner */
  loading?: boolean;
  /** Full width button */
  fullWidth?: boolean;
  /** Button children/label */
  children: React.ReactNode;
}

/**
 * AHTG Button Component
 *
 * A comprehensive button component supporting multiple variants, colors, sizes, and states.
 * Follows Material Design principles and AHTG design system tokens.
 *
 * @example
 * // Primary contained button (default)
 * <Button>Confirm</Button>
 *
 * @example
 * // Secondary outlined button
 * <Button variant="outlined" color="secondary">Cancel</Button>
 *
 * @example
 * // Small error text button
 * <Button variant="text" color="error" size="sm">Delete</Button>
 *
 * @example
 * // Loading state
 * <Button loading disabled>Processing...</Button>
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'contained',
      color = 'primary',
      size = 'md',
      loading = false,
      fullWidth = false,
      disabled = false,
      className = '',
      children,
      style,
      ...props
    },
    ref
  ) => {
    // Design tokens from Figma
    const tokens = {
      colors: {
        primary: {
          main: '#2196f3',
          dark: '#1976d2',
          contrastText: '#ffffff',
          hover: '#2196f314',
          selected: '#2196f31f',
        },
        secondary: {
          main: '#f5f5f5',
          dark: '#616161',
          outline: '#e0e0e0',
          contrastText: '#616161',
        },
        success: {
          main: '#4caf50',
          dark: '#388e3c',
          contrastText: '#ffffff',
          hover: '#4caf5014',
          active: '#4caf501f',
        },
        error: {
          main: '#db4537',
          dark: '#bb3430',
          contrastText: '#ffffff',
          hover: '#db453714',
          active: '#db45371f',
        },
        warning: {
          main: '#e17109',
          dark: '#da6207',
          contrastText: '#ffffff',
          hover: '#eb8b0c14',
          active: '#eb8b0c1f',
        },
        info: {
          main: '#5bbfde',
          dark: '#4b9ab0',
          contrastText: '#ffffff',
          hover: '#5bbfde14',
          active: '#5bbfde1f',
        },
        action: {
          hover: '#0000000a',
          selected: '#00000014',
          disabledBackground: '#eeeeee',
        },
        text: {
          disabled: '#9e9e9e',
        },
        components: {
          border: '#9e9e9e',
          disabledBorder: '#e0e0e0',
        },
      },
      typography: {
        md: {
          fontSize: '14px',
          lineHeight: '14px',
          fontWeight: 400,
          letterSpacing: '0',
        },
        sm: {
          fontSize: '12px',
          lineHeight: '12px',
          fontWeight: 400,
          letterSpacing: '0',
        },
      },
      spacing: {
        sm: '8px',
        md: '16px',
      },
      borderRadius: '4px',
      maxHeight: {
        sm: '32px',
        md: '38px',
      },
    };

    const colorTheme = tokens.colors[color];
    const typography = tokens.typography[size];
    const height = tokens.maxHeight[size];
    const padding = size === 'sm' ? '8px 16px' : '12px 20px';

    // Base styles
    const baseStyles: React.CSSProperties = {
      fontFamily: 'Roboto, sans-serif',
      fontSize: typography.fontSize,
      lineHeight: typography.lineHeight,
      fontWeight: typography.fontWeight,
      letterSpacing: typography.letterSpacing,
      height,
      padding,
      borderRadius: tokens.borderRadius,
      border: 'none',
      cursor: disabled || loading ? 'default' : 'pointer',
      transition: 'all 0.2s ease-in-out',
      textTransform: 'uppercase',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      width: fullWidth ? '100%' : 'auto',
      position: 'relative',
      outline: 'none',
      ...style,
    };

    // Variant-specific styles
    let variantStyles: React.CSSProperties = {};

    if (disabled) {
      // Disabled state
      if (variant === 'contained') {
        variantStyles = {
          backgroundColor: tokens.colors.action.disabledBackground,
          color: tokens.colors.text.disabled,
        };
      } else if (variant === 'outlined') {
        variantStyles = {
          backgroundColor: 'transparent',
          color: tokens.colors.text.disabled,
          border: `1px solid ${tokens.colors.components.disabledBorder}`,
        };
      } else {
        // text variant
        variantStyles = {
          backgroundColor: 'transparent',
          color: tokens.colors.text.disabled,
        };
      }
    } else {
      switch (variant) {
        case 'contained':
          variantStyles = {
            backgroundColor: colorTheme.main,
            color: colorTheme.contrastText,
          };
          break;
        case 'outlined':
          variantStyles = {
            backgroundColor: 'transparent',
            color: colorTheme.main,
            border: `1px solid ${color === 'secondary' ? tokens.colors.secondary.outline : colorTheme.main}`,
          };
          break;
        case 'text':
          variantStyles = {
            backgroundColor: 'transparent',
            color: colorTheme.main,
          };
          break;
      }
    }

    // Hover/active styles via CSS classes
    const getHoverActiveStyles = () => {
      if (disabled || loading) return '';

      let hoverBg = '';
      let activeBg = '';

      switch (variant) {
        case 'contained':
          hoverBg = colorTheme.dark;
          activeBg = colorTheme.dark;
          break;
        case 'outlined':
          hoverBg = colorTheme.hover || tokens.colors.action.hover;
          activeBg = colorTheme.active || colorTheme.selected || tokens.colors.action.selected;
          break;
        case 'text':
          hoverBg = colorTheme.hover || tokens.colors.action.hover;
          activeBg = colorTheme.active || colorTheme.selected || tokens.colors.action.selected;
          break;
      }

      return `
        .ahtg-button-${variant}-${color}:hover:not(:disabled) {
          ${variant === 'contained' ? `background-color: ${hoverBg};` : `background-color: ${hoverBg};`}
        }
        .ahtg-button-${variant}-${color}:active:not(:disabled) {
          ${variant === 'contained' ? `background-color: ${activeBg};` : `background-color: ${activeBg};`}
        }
      `;
    };

    const buttonClass = `ahtg-button ahtg-button-${variant}-${color} ${className}`;

    return (
      <>
        <style>{getHoverActiveStyles()}</style>
        <button
          ref={ref}
          className={buttonClass}
          disabled={disabled || loading}
          style={{ ...baseStyles, ...variantStyles }}
          {...props}
        >
          {loading && (
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                animation: 'spin 1s linear infinite',
              }}
            >
              <circle
                cx="8"
                cy="8"
                r="6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="30 10"
              />
            </svg>
          )}
          {children}
        </button>
        <style>{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      </>
    );
  }
);

Button.displayName = 'Button';

export default Button;
