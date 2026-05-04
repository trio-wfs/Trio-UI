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
      selected: '#2196F31F', // primary/states/selected — nav item, list item selected bg
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
      main: '#388e3c',   // Figma: color/semantic/feedback/success/background/default
      light: '#E8F5E9',
      dark: '#2e7d32',   // Figma: pressed state
      contrastText: '#FFFFFF',
    },
    info: {
      main: '#54afca',
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
      primary: '#212121',                  // Figma: color/semantic/text/primary
      secondary: 'rgba(0, 0, 0, 0.6)',    // Figma: color/semantic/text/secondary (#00000099)
      disabled: 'rgba(0, 0, 0, 0.4)',     // Figma: text/disabled (#00000066)
      inverse: '#FFFFFF',
    },

    // Background Colors
    // Layer order: default (page canvas) → secondary (content wrapper) → paper (components)
    background: {
      default: '#F5F5F5',    // Page canvas — entire browser background
      secondary: '#FAFAFA',  // Content wrapper below header — 16px padding, groups all page components
      paper: '#FFFFFF',      // All cards, panels, containers — no elevation, border stroke only
      accent: '#E4F7FD',
    },

    // Action/State Colors
    action: {
      active: 'rgba(0, 0, 0, 0.32)',
      hover: 'rgba(0, 0, 0, 0.04)',
      selected: 'rgba(0, 0, 0, 0.08)',
      focus: 'rgba(0, 0, 0, 0.12)',
      disabled: 'rgba(0, 0, 0, 0.12)',
      disabledBackground: 'rgba(0, 0, 0, 0.12)',
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

    // Data Visualization Colors
    // Complementary to the primary blue palette — used in metric bars, stepper indicators
    dataViz: {
      teal: '#37636b',
    },

    // Semantic Chart Colors (from Figma Variables: color/info, color/error, etc.)
    // Used for simple charts (1–3 value bars, metric card bars).
    // Info: darkest first (900→700→500→300). Semantic: lightest first (500→700→900).
    // Complex charts (donut, 4+ series) use the AG Charts palette instead.
    charts: {
      info: ['#37636B', '#4B9AB0', '#5BBFDE', '#6FD3ED'] as const,   // 900→700→500→300 (metric card / simple bar order)
      error: ['#DB4537', '#BB3430', '#A0241E'] as const,              // 500→700→900
      warning: ['#EB8B0C', '#E17109', '#E65100'] as const,            // 500→700→900
      success: ['#4CAF50', '#388E3C', '#1B5E20'] as const,            // 500→700→900
    },

    // Brand Colors
    // Application-level brand surfaces — not for general component use
    brand: {
      headerStrip: '#607D8B', // Figma: materials/brand/trio/neutralaccent — top navigation bar
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
        fontSize: 14,
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
  // Shadows — only use for modals, menus, popovers, breadcrumbs. Never on cards or paper containers.
  shadows: {
    none: 'none',
    sm: '0px 2px 4px rgba(0, 0, 0, 0.075)',  // Figma: Shadows/01. Small
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
