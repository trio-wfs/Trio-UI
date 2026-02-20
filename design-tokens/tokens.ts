/**
 * AHTG Design System Tokens
 * Source of Truth: Exported from Figma Variables
 *
 * DO NOT modify these values directly.
 * All changes must come from Figma and be re-exported.
 */

export const tokens = {
  /**
   * Color Palette
   * Source: Token.tokens.json
   */
  colors: {
    // Primary (Blue) - Save/Update actions only
    primary: {
      main: '#2196F3',
      light: '#E3F2FD',
      dark: '#1976D2',
      contrastText: '#FFFFFF',
    },

    // Secondary - Edit actions
    secondary: {
      main: '#F5F5F5',
      dark: '#616161',
      outline: '#E0E0E0',
      contrastText: '#616161',
    },

    // Semantic Colors (urgency indicators)
    success: {
      main: '#4CAF50',
      light: '#E8F5E9',
      dark: '#388E3C',
      contrastText: '#FFFFFF',
    },
    info: {
      main: '#5BBFDE',
      light: '#E4F7FD',
      dark: '#4B9AB0',
      contrastText: '#FFFFFF',
    },
    warning: {
      main: '#E17109',
      light: '#FCF1E0',
      dark: '#DA6207',
      contrastText: '#FFFFFF',
    },
    error: {
      main: '#DB4537',
      light: '#FBEAED',
      dark: '#BB3430',
      contrastText: '#FFFFFF',
    },

    // Text Colors
    text: {
      primary: '#212121',
      secondary: '#757575',
      disabled: '#9E9E9E',
      inverse: '#FFFFFF',
    },

    // Background Colors
    background: {
      default: '#F5F5F5',  // Canvas/Page background
      paper: '#FFFFFF',    // Foreground containers and modals
      secondary: '#FAFAFA',
      accent: '#E4F7FD',
    },

    // Action/State Colors
    action: {
      active: 'rgba(0, 0, 0, 0.32)',
      hover: 'rgba(0, 0, 0, 0.04)',
      selected: 'rgba(0, 0, 0, 0.08)',
      focus: 'rgba(0, 0, 0, 0.12)',
      disabled: 'rgba(0, 0, 0, 0.07)',
      disabledBackground: '#EEEEEE',
    },

    // Component-Specific Colors
    components: {
      icon: {
        default: '#424242',
        disabled: '#9E9E9E',
        inverse: '#FFFFFF',
      },
      border: {
        default: '#E0E0E0',
        focus: '#64B5F6',
        focusShadow: 'rgba(66, 165, 245, 0.18)',
      },
      input: {
        enabledBorder: '#9E9E9E',
        hoverBorder: '#616161',
        disabledBorder: '#E0E0E0',
      },
      backdrop: {
        fill: 'rgba(0, 0, 0, 0.5)',
      },
      divider: '#E0E0E0',
    },

    // Base Colors
    base: {
      black: '#000000',
      white: '#FFFFFF',
    },
  },

  /**
   * Typography
   * Source: typography.json
   * Font Family: Roboto (all variants)
   */
  typography: {
    fontFamily: 'Roboto, sans-serif',

    // Font Sizes
    fontSize: {
      xxs: 11,  // badges, overline
      xs: 12,   // labels, captions
      sm: 14,   // general descriptive text
      md: 16,   // primary content, large buttons
      lg: 18,   // emphasis content
      xl: 20,   // larger emphasis
      xxl: 24,  // headlines (H5 max for AHTG)
    },

    // Font Weights
    fontWeight: {
      light: 300,
      regular: 400,
      medium: 500,
      bold: 700,
    },

    // Heading Styles (H1-H6)
    // NOTE: AHTG max headline is H5
    h1: {
      fontSize: 96,
      fontWeight: 300,
      lineHeight: 115,
      letterSpacing: 0,
    },
    h2: {
      fontSize: 60,
      fontWeight: 400,
      lineHeight: 72,
      letterSpacing: 0,
    },
    h3: {
      fontSize: 48,
      fontWeight: 500,
      lineHeight: 58,
      letterSpacing: 0,
    },
    h4: {
      fontSize: 34,
      fontWeight: 500,
      lineHeight: 41,
      letterSpacing: 0,
    },
    h5: {
      fontSize: 24,  // Max headline for AHTG
      fontWeight: 500,
      lineHeight: 28,
      letterSpacing: 0,
    },
    h6: {
      fontSize: 20,
      fontWeight: 500,
      lineHeight: 24,
      letterSpacing: 0,
    },

    // Body Styles
    body1: {
      fontSize: 16,
      fontWeight: 400,
      lineHeight: 24,
      letterSpacing: 0,
    },
    body2: {
      fontSize: 14,
      fontWeight: 400,
      lineHeight: 21,
      letterSpacing: 0,
    },

    // Utility Styles
    caption: {
      fontSize: 12,
      fontWeight: 400,
      lineHeight: 18,
      letterSpacing: 0,
    },
    overline: {
      fontSize: 11,
      fontWeight: 500,
      lineHeight: 16,
      letterSpacing: 0,
    },

    // Button Typography
    button: {
      sm: {
        fontSize: 12,
        fontWeight: 400,
        lineHeight: 12,
        letterSpacing: 0,
      },
      md: {
        fontSize: 12,
        fontWeight: 400,
        lineHeight: 14,
        letterSpacing: 0,
      },
      lg: {
        fontSize: 16,
        fontWeight: 400,
        lineHeight: 16,
        letterSpacing: 0,
      },
    },
  },

  /**
   * Spacing System
   * Source: spacing.json
   * AHTG uses 8px increment system
   * Exception: xs (4px) allowed for related content within components only
   */
  spacing: {
    none: 0,
    xs: 4,    // Exception: related content within components only
    sm: 8,    // Base unit
    mid: 12,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 40,
  },

  /**
   * Layout System
   * AHTG Desktop SaaS Standards
   */
  layout: {
    grid: {
      columns: 12,
      gutter: 16,
      margin: 16,
    },
    modal: {
      widthLarge: 900,
      widthSmall: 500,
      padding: 40,
    },
  },

  /**
   * Border Radius / Shape
   * Source: shape.json
   */
  borderRadius: {
    none: 0,
    sm: 2,
    default: 4,  // Standard border radius
    full: 999,   // Fully rounded (pills, circles)
  },

  /**
   * Shadows / Elevation
   */
  shadows: {
    none: 'none',
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
  },

  /**
   * Z-Index Scale
   */
  zIndex: {
    drawer: 1200,
    modal: 1300,
    snackbar: 1400,
    tooltip: 1500,
  },
} as const;

// Type export for TypeScript consumers
export type Tokens = typeof tokens;
