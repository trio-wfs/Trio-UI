import React from 'react';

export interface AlertProps {
  /** Alert variant type */
  variant?: 'standard' | 'contained' | 'outline';
  /** Alert severity/color theme */
  severity?: 'success' | 'error' | 'warning' | 'info' | 'default';
  /** Alert title (optional) */
  title?: string;
  /** Alert description/message */
  children: React.ReactNode;
  /** Show close button */
  onClose?: () => void;
  /** Custom action button (uses Button sm variant) */
  action?: React.ReactNode;
  /** Custom icon (overrides default severity icon) */
  icon?: React.ReactNode;
  /** Hide default icon */
  hideIcon?: boolean;
  /** Additional CSS class */
  className?: string;
  /** Additional inline styles */
  style?: React.CSSProperties;
}

/**
 * AHTG Alert Component
 *
 * Alerts display brief messages for users without interrupting their workflow.
 * Supports multiple severity levels, variants, and optional title/description structure.
 * Follows Material Design principles and AHTG design system tokens.
 *
 * Design Specs (from Figma node 2063-3499):
 * - Icon: 24px Material Icons
 * - Close icon: 16px (ghost button icon)
 * - Padding: 16px all around
 * - Border radius: 4px
 * - Gap (icon-content): 16px
 * - Gap (title-description): 4px
 * - Gap (actions): 20px
 * - Title typography: Body2 (14px, medium 500, line-height 24px)
 * - Description typography: Caption (12px, regular 400, line-height 18px)
 * - Action button: Uses Button sm variant
 *
 * @example
 * // Basic success alert
 * <Alert severity="success">Operation completed successfully</Alert>
 *
 * @example
 * // Error alert with title
 * <Alert severity="error" title="Error">
 *   Failed to save changes. Please try again.
 * </Alert>
 *
 * @example
 * // Alert with close button (uses ghost button icon)
 * <Alert 
 *   severity="warning" 
 *   onClose={() => console.log('Alert closed')}
 * >
 *   This action cannot be undone
 * </Alert>
 *
 * @example
 * // Outlined info alert with action
 * <Alert 
 *   severity="info" 
 *   variant="outline"
 *   action={<Button size="sm">Learn More</Button>}
 * >
 *   New features are now available
 * </Alert>
 */
export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      variant = 'standard',
      severity = 'default',
      title,
      children,
      onClose,
      action,
      icon,
      hideIcon = false,
      className = '',
      style,
    },
    ref
  ) => {
    // Design tokens from Figma (exact specifications from node 2063-3499)
    const tokens = {
      colors: {
        // Standard variant - light backgrounds with colored text
        // Uses palette.json semantic colors: main, light, dark, contrast-text
        success: {
          background: '#E8F5E9', // success.light
          text: '#388E3C',       // success.dark (for standard/outline variants)
          border: '#4CAF50',     // success.main
          icon: '#388E3C',       // success.dark
          onBackground: '#FFFFFF', // success.contrast-text (for contained variant)
        },
        error: {
          background: '#FBEAED', // error.light
          text: '#BB3430',       // error.dark (for standard/outline variants)
          border: '#DB4537',     // error.main
          icon: '#BB3430',       // error.dark
          onBackground: '#FFFFFF', // error.contrast-text (for contained variant)
        },
        warning: {
          background: '#FCF1E0', // warning.light
          text: '#DA6207',       // warning.dark (for standard/outline variants)
          border: '#E17109',     // warning.main
          icon: '#DA6207',       // warning.dark
          onBackground: '#FFFFFF', // warning.contrast-text (for contained variant)
        },
        default: {
          background: '#E3F2FD', // primary.light
          text: '#1976D2',       // primary.dark (for standard/outline variants)
          border: '#2196F3',     // primary.main
          icon: '#1976D2',       // primary.dark
          onBackground: '#FFFFFF', // primary.contrast-text (for contained variant)
        },
        info: {
          background: '#E4F7FD', // info.light
          text: '#4B9AB0',       // info.dark (for standard/outline variants)
          border: '#5BBFDE',     // info.main
          icon: '#4B9AB0',       // info.dark
          onBackground: '#FFFFFF', // info.contrast-text (for contained variant)
        },
      },
      spacing: {
        xs: '4px',   // gap between title and description
        md: '16px',  // padding and gap between icon/content
        actions: '20px', // gap in actions area
      },
      typography: {
        title: {
          fontSize: '14px',      // --typography/style/body2/size
          lineHeight: '24px',    // --typography/style/body1/line-height
          fontWeight: 500,       // --typography/weight/medium
          letterSpacing: '0px',  // --none
          fontFamily: 'Roboto, sans-serif', // --typography/family/body
        },
        description: {
          fontSize: '12px',      // --typography/style/caption/size
          lineHeight: '18px',    // --typography/style/caption/line-height
          fontWeight: 400,       // --typography/weight/regular
          letterSpacing: '0px',  // --none
          fontFamily: 'Roboto, sans-serif',
        },
        action: {
          fontSize: '12px',      // Button sm / caption size
          lineHeight: '18px',
          fontWeight: 400,
          letterSpacing: '0px',
          fontFamily: 'Roboto, sans-serif',
        },
      },
      borderRadius: '4px',     // --radius/base/md
      iconSize: '24px',        // Material Icons standard size
      closeIconSize: '16px',   // Ghost button icon size
    };

    const colorTheme = tokens.colors[severity];

    // Get default icon based on severity (exact Material Icons from Figma)
    const getDefaultIcon = () => {
      const iconProps = {
        width: tokens.iconSize,
        height: tokens.iconSize,
        viewBox: '0 0 24 24',
        fill: 'currentColor',
      };

      switch (severity) {
        case 'success':
          // check_circle_outline (node 2402:30531)
          return (
            <svg {...iconProps} xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4.59-12.42L10 14.17l-2.59-2.58L6 13l4 4 8-8z"/>
            </svg>
          );
        case 'error':
          // error_outline (node 2402:40130)
          return (
            <svg {...iconProps} xmlns="http://www.w3.org/2000/svg">
              <path d="M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
            </svg>
          );
        case 'warning':
          // warning_amber (node 2402:40192)
          return (
            <svg {...iconProps} xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z"/>
            </svg>
          );
        case 'info':
        case 'default':
        default:
          // info (node 2402:33038)
          return (
            <svg {...iconProps} xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
            </svg>
          );
      }
    };

    // Close icon (Material Icons: close, 16px) - ghost button icon style
    const closeIcon = (
      <svg
        width={tokens.closeIconSize}
        height={tokens.closeIconSize}
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
      </svg>
    );

    // Variant-specific styles
    let variantStyles: React.CSSProperties = {};
    let iconColor = colorTheme.icon;
    let textColor = colorTheme.text;

    switch (variant) {
      case 'contained':
        variantStyles = {
          backgroundColor: colorTheme.border, // Use border color as main background
          color: colorTheme.onBackground,
          border: 'none',
        };
        iconColor = colorTheme.onBackground;
        textColor = colorTheme.onBackground;
        break;
      case 'outline':
        variantStyles = {
          backgroundColor: 'transparent',
          color: colorTheme.text,
          border: `1px solid ${colorTheme.border}`,
        };
        iconColor = colorTheme.icon;
        textColor = colorTheme.text;
        break;
      case 'standard':
      default:
        variantStyles = {
          backgroundColor: colorTheme.background,
          color: colorTheme.text,
          border: 'none',
        };
        iconColor = colorTheme.icon;
        textColor = colorTheme.text;
        break;
    }

    // Base container styles (exact specs from Figma)
    const containerStyles: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center', // Changed to center for proper vertical alignment
      gap: tokens.spacing.md, // 16px between icon and content
      padding: tokens.spacing.md, // 16px all around
      borderRadius: tokens.borderRadius, // 4px
      fontFamily: tokens.typography.title.fontFamily,
      boxSizing: 'border-box',
      ...variantStyles,
      ...style,
    };

    // Icon container styles
    const iconContainerStyles: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      width: tokens.iconSize,
      height: tokens.iconSize,
      color: iconColor,
    };

    // Content wrapper (includes title/description AND actions area)
    const contentWrapperStyles: React.CSSProperties = {
      display: 'flex',
      alignItems: 'flex-start',
      gap: tokens.spacing.actions, // 20px between content and actions
      flex: 1,
      minWidth: 0,
      overflow: 'hidden', // From Figma spec
    };

    // Content container styles (title + description)
    const contentStyles: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      gap: tokens.spacing.xs, // 4px between title and description
      flex: 1,
      minWidth: 0,
      justifyContent: 'center', // Center vertically
    };

    // Title styles (exact typography from Figma)
    const titleStyles: React.CSSProperties = {
      fontSize: tokens.typography.title.fontSize,
      lineHeight: tokens.typography.title.lineHeight,
      fontWeight: tokens.typography.title.fontWeight,
      letterSpacing: tokens.typography.title.letterSpacing,
      fontFamily: tokens.typography.title.fontFamily,
      color: textColor,
      margin: 0,
    };

    // Body/description styles (caption typography from Figma)
    const bodyStyles: React.CSSProperties = {
      fontSize: tokens.typography.description.fontSize,
      lineHeight: tokens.typography.description.lineHeight,
      fontWeight: tokens.typography.description.fontWeight,
      letterSpacing: tokens.typography.description.letterSpacing,
      fontFamily: tokens.typography.description.fontFamily,
      color: textColor,
      margin: 0,
    };

    // Actions container styles
    const actionsStyles: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      gap: tokens.spacing.actions, // 20px between action and close button
      flexShrink: 0,
      fontSize: tokens.typography.action.fontSize,
      lineHeight: tokens.typography.action.lineHeight,
      fontWeight: tokens.typography.action.fontWeight,
      color: textColor,
    };

    // Close button styles (ghost button icon)
    const closeButtonStyles: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: tokens.closeIconSize,
      height: tokens.closeIconSize,
      background: 'none',
      border: 'none',
      padding: 0,
      cursor: 'pointer',
      color: textColor,
      opacity: 0.7,
      transition: 'opacity 0.2s ease-in-out',
      borderRadius: '2px',
      flexShrink: 0,
    };

    const closeButtonClass = `ahtg-alert-close-${variant}-${severity}`;

    return (
      <>
        <style>{`
          .${closeButtonClass}:hover {
            opacity: 1;
          }
          .${closeButtonClass}:focus {
            outline: 2px solid ${iconColor};
            outline-offset: 2px;
          }
          .${closeButtonClass}:active {
            opacity: 0.8;
          }
        `}</style>
        <div
          ref={ref}
          role="alert"
          className={`ahtg-alert ahtg-alert-${variant}-${severity} ${className}`}
          style={containerStyles}
        >
          {!hideIcon && (
            <div style={iconContainerStyles}>
              {icon || getDefaultIcon()}
            </div>
          )}
          
          <div style={contentWrapperStyles}>
            <div style={contentStyles}>
              {title && <div style={titleStyles}>{title}</div>}
              <div style={bodyStyles}>{children}</div>
            </div>

            {(action || onClose) && (
              <div style={actionsStyles}>
                {action && <div>{action}</div>}
                {onClose && (
                  <button
                    type="button"
                    className={closeButtonClass}
                    onClick={onClose}
                    style={closeButtonStyles}
                    aria-label="Close alert"
                    title="Close"
                  >
                    {closeIcon}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </>
    );
  }
);

Alert.displayName = 'Alert';

export default Alert;
