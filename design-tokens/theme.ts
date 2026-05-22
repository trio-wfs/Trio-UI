/**
 * TRIO WFS MUI Theme
 *
 * Single source of truth for the MUI theme — consumed by Storybook,
 * apps, and all design system components.
 *
 * All values are derived from tokens.ts. Do not hardcode.
 *
 * Component-level overrides (styleOverrides) are added per component
 * as they are migrated. Dynamic prop-dependent styling stays in the
 * component's own sx prop.
 *
 * See COMPONENT_COVERAGE.md for migration status.
 */

import { createTheme } from '@mui/material/styles';
import type { ThemeOptions } from '@mui/material/styles';
import { tokens } from './tokens';

export const themeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: tokens.colors.primary.main,
      light: tokens.colors.primary.light,
      dark: tokens.colors.primary.dark,
      contrastText: tokens.colors.primary.contrastText,
    },
    secondary: {
      main: tokens.colors.secondary.dark,
      contrastText: tokens.colors.text.inverse,
    },
    error: {
      main: tokens.colors.error.main,
      light: tokens.colors.error.light,
      dark: tokens.colors.error.dark,
      contrastText: tokens.colors.error.contrastText,
    },
    warning: {
      main: tokens.colors.warning.main,
      light: tokens.colors.warning.light,
      dark: tokens.colors.warning.dark,
      contrastText: tokens.colors.warning.contrastText,
    },
    info: {
      main: tokens.colors.info.main,
      light: tokens.colors.info.light,
      dark: tokens.colors.info.dark,
      contrastText: tokens.colors.info.contrastText,
    },
    success: {
      main: tokens.colors.success.main,
      light: tokens.colors.success.light,
      dark: tokens.colors.success.dark,
      contrastText: tokens.colors.success.contrastText,
    },
    text: {
      primary: tokens.colors.text.primary,
      secondary: tokens.colors.text.secondary,
      disabled: tokens.colors.text.disabled,
    },
    background: {
      default: tokens.colors.background.default,
      paper: tokens.colors.background.paper,
    },
    action: {
      active: tokens.colors.action.active,
      hover: tokens.colors.action.hover,
      selected: tokens.colors.action.selected,
      focus: tokens.colors.action.focus,
      disabled: tokens.colors.action.disabled,
      disabledBackground: tokens.colors.action.disabledBackground,
    },
    divider: tokens.colors.components.divider,
  },

  typography: {
    fontFamily: tokens.typography.fontFamily,
    fontWeightLight: tokens.typography.fontWeight.light,
    fontWeightRegular: tokens.typography.fontWeight.regular,
    fontWeightMedium: tokens.typography.fontWeight.medium,
    fontWeightBold: tokens.typography.fontWeight.bold,
    h1: {
      fontSize: `${tokens.typography.h1.fontSize}px`,
      fontWeight: tokens.typography.h1.fontWeight,
      lineHeight: `${tokens.typography.h1.lineHeight}px`,
      letterSpacing: tokens.typography.h1.letterSpacing,
    },
    h2: {
      fontSize: `${tokens.typography.h2.fontSize}px`,
      fontWeight: tokens.typography.h2.fontWeight,
      lineHeight: `${tokens.typography.h2.lineHeight}px`,
      letterSpacing: tokens.typography.h2.letterSpacing,
    },
    h3: {
      fontSize: `${tokens.typography.h3.fontSize}px`,
      fontWeight: tokens.typography.h3.fontWeight,
      lineHeight: `${tokens.typography.h3.lineHeight}px`,
      letterSpacing: tokens.typography.h3.letterSpacing,
    },
    h4: {
      fontSize: `${tokens.typography.h4.fontSize}px`,
      fontWeight: tokens.typography.h4.fontWeight,
      lineHeight: `${tokens.typography.h4.lineHeight}px`,
      letterSpacing: tokens.typography.h4.letterSpacing,
    },
    h5: {
      fontSize: `${tokens.typography.h5.fontSize}px`,
      fontWeight: tokens.typography.h5.fontWeight,
      lineHeight: `${tokens.typography.h5.lineHeight}px`,
      letterSpacing: tokens.typography.h5.letterSpacing,
    },
    h6: {
      fontSize: `${tokens.typography.h6.fontSize}px`,
      fontWeight: tokens.typography.h6.fontWeight,
      lineHeight: `${tokens.typography.h6.lineHeight}px`,
      letterSpacing: tokens.typography.h6.letterSpacing,
    },
    body1: {
      fontSize: `${tokens.typography.body1.fontSize}px`,
      fontWeight: tokens.typography.body1.fontWeight,
      lineHeight: `${tokens.typography.body1.lineHeight}px`,
      letterSpacing: tokens.typography.body1.letterSpacing,
    },
    body2: {
      fontSize: `${tokens.typography.body2.fontSize}px`,
      fontWeight: tokens.typography.body2.fontWeight,
      lineHeight: `${tokens.typography.body2.lineHeight}px`,
      letterSpacing: tokens.typography.body2.letterSpacing,
    },
    caption: {
      fontSize: `${tokens.typography.caption.fontSize}px`,
      fontWeight: tokens.typography.caption.fontWeight,
      lineHeight: `${tokens.typography.caption.lineHeight}px`,
      letterSpacing: tokens.typography.caption.letterSpacing,
    },
    overline: {
      fontSize: `${tokens.typography.overline.fontSize}px`,
      fontWeight: tokens.typography.overline.fontWeight,
      lineHeight: `${tokens.typography.overline.lineHeight}px`,
      letterSpacing: tokens.typography.overline.letterSpacing,
      textTransform: 'uppercase',
    },
    button: {
      fontSize: `${tokens.typography.button.md.fontSize}px`,
      fontWeight: tokens.typography.button.md.fontWeight,
      lineHeight: `${tokens.typography.button.md.lineHeight}px`,
      letterSpacing: tokens.typography.button.md.letterSpacing,
      textTransform: 'none',
    },
  },

  // MUI spacing uses 8px as base — matches our tokens.spacing.sm.
  // Components can call theme.spacing(2) for 16px, or use tokens directly.
  spacing: tokens.spacing.sm,

  shape: {
    borderRadius: tokens.borderRadius.default,
  },

  zIndex: {
    drawer: tokens.zIndex.drawer,
    modal: tokens.zIndex.modal,
    snackbar: tokens.zIndex.snackbar,
    tooltip: tokens.zIndex.tooltip,
  },

  // Component-level overrides — populated as components are migrated.
  // See COMPONENT_COVERAGE.md for which components are migrated and which
  // still rely on in-component sx for static styles.
  components: {
    // MuiButton — migrated 2026-04-15
    // Static base styles, size padding, and size typography live here.
    // Color × variant logic stays in components/Button/Button.tsx because
    // it depends on prop combinations (6 colors × 3 variants = 18 states).
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          fontFamily: tokens.typography.fontFamily,
          textTransform: 'none',
          borderRadius: `${tokens.borderRadius.default}px`,
          boxShadow: 'none',
        },
        // Icons in buttons — always 16x16
        startIcon: {
          '& > *:nth-of-type(1)': { fontSize: 16 },
        },
        endIcon: {
          '& > *:nth-of-type(1)': { fontSize: 16 },
        },
        sizeMedium: {
          minHeight: `${tokens.controls.height.medium}px`,
          padding: `${tokens.spacing.sm}px ${tokens.spacing.md}px`,
          fontSize: `${tokens.typography.button.md.fontSize}px`,
          fontWeight: tokens.typography.button.md.fontWeight,
          lineHeight: '20px',
        },
        sizeSmall: {
          minHeight: `${tokens.controls.height.small}px`,
          padding: `${tokens.spacing.xs}px ${tokens.spacing.sm}px`,
          fontSize: `${tokens.typography.button.sm.fontSize}px`,
          fontWeight: tokens.typography.button.sm.fontWeight,
          lineHeight: '20px',
        },
      },
    },

    // MuiTextField — migrated 2026-04-15
    // Static input chrome, label, helper text, and disabled/error states live here.
    // Dynamic prop-driven styling (`state` prop for error/focus coloring,
    // `inputFill` prop for background, multi-line height) stays in
    // components/TextField/TextField.tsx.
    //
    // Note: these overrides use descendant selectors under MuiTextField.root,
    // so they only apply when something explicitly renders a MuiTextField.
    // Autocomplete/Select that internally render MuiTextField will inherit
    // these base styles — desirable for visual consistency.
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
      },
      styleOverrides: {
        root: {
          fontFamily: tokens.typography.fontFamily,
          width: '100%',
          '& .MuiOutlinedInput-root': {
            padding: `${tokens.spacing.xs}px ${tokens.spacing.sm}px`,
            backgroundColor: 'transparent',
            borderRadius: `${tokens.borderRadius.default}px`,
            fontFamily: tokens.typography.fontFamily,
            fontSize: `${tokens.typography.fontSize.sm}px`,
            '& fieldset': {
              borderColor: tokens.colors.components.input.enabledBorder,
              borderWidth: '1px',
            },
            '&:hover fieldset': {
              borderColor: tokens.colors.components.input.hoverBorder,
            },
            '&.Mui-focused fieldset': {
              borderColor: tokens.colors.components.border.focus,
              borderWidth: '2px',
            },
            '&.Mui-error fieldset': {
              borderColor: tokens.colors.error.main,
            },
            '&.Mui-disabled': {
              backgroundColor: tokens.colors.action.disabledBackground,
              '& fieldset': {
                borderColor: tokens.colors.components.input.disabledBorder,
              },
            },
          },
          // Single-line uses minHeight so multi-select inputs (e.g. Autocomplete)
          // can grow with chips. Multi-line is fixed height per Figma spec.
          // Size-aware: small (32) and medium (38) selectors are explicit so the
          // rule reaches raw MUI TextFields (e.g. those rendered by MUI Autocomplete
          // internally), not just the Trio TextField wrapper. Without these, the
          // medium minHeight would override Autocomplete's small height: 32px.
          '& .MuiOutlinedInput-root:not(.MuiInputBase-multiline).MuiInputBase-sizeSmall': {
            minHeight: `${tokens.controls.height.small}px`,
          },
          '& .MuiOutlinedInput-root:not(.MuiInputBase-multiline):not(.MuiInputBase-sizeSmall)': {
            minHeight: `${tokens.controls.height.medium}px`,
          },
          '& .MuiOutlinedInput-root.MuiInputBase-multiline': {
            height: '90px',
          },
          '& .MuiOutlinedInput-input': {
            color: tokens.colors.text.primary,
            fontSize: `${tokens.typography.fontSize.sm}px`,
            fontWeight: tokens.typography.fontWeight.regular,
            lineHeight: '20px',
            padding: 0,
            '&::placeholder': {
              color: tokens.colors.text.disabled,
              opacity: 1,
            },
            '&.Mui-disabled': {
              color: tokens.colors.text.disabled,
              WebkitTextFillColor: tokens.colors.text.disabled,
            },
          },
          // InputLabel and FormHelperText styles are now handled by the
          // global MuiInputLabel and MuiFormHelperText overrides below.
        },
      },
    },

    // MuiInputLabel — migrated 2026-04-15
    // "Label above input" layout (position: relative, transform: none) for
    // TRIO form controls. Typography/color is inherited from MuiFormLabel
    // because InputLabel extends FormLabel. This override only adds the
    // layout bits that InputLabel's own defaults would otherwise force.
    MuiInputLabel: {
      styleOverrides: {
        root: {
          position: 'relative',
          transform: 'none',
          marginBottom: `${tokens.spacing.xs}px`,
        },
      },
    },

    // MuiFormHelperText — migrated 2026-04-15
    // Global helper text typography. Error color via MUI's .Mui-error class.
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          fontFamily: tokens.typography.fontFamily,
          fontSize: `${tokens.typography.fontSize.xs}px`,
          color: tokens.colors.text.secondary,
          marginLeft: 0,
          marginTop: `${tokens.spacing.xs}px`,
          '&.Mui-error': {
            color: tokens.colors.error.main,
          },
        },
      },
    },

    // MuiFormControlLabel — migrated 2026-04-15
    // Shared label typography for Checkbox, Radio, Switch, etc.
    // Disabled label color handled via MUI's .Mui-disabled class on root.
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          fontFamily: tokens.typography.fontFamily,
          '& .MuiFormControlLabel-label': {
            fontSize: `${tokens.typography.fontSize.sm}px`,
            fontWeight: tokens.typography.fontWeight.regular,
            color: tokens.colors.text.primary,
          },
          '&.Mui-disabled .MuiFormControlLabel-label': {
            color: tokens.colors.text.disabled,
          },
        },
      },
    },

    // MuiFormLabel — migrated 2026-04-15
    // Group label used in RadioGroup (as <legend>) and any <FormLabel> usage.
    // Note: MuiInputLabel extends FormLabel, but the TextField override above
    // uses more specific descendant selectors under MuiTextField so it wins.
    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontSize: `${tokens.typography.fontSize.xs}px`,
          fontWeight: tokens.typography.fontWeight.regular,
          color: tokens.colors.text.primary,
          marginBottom: `${tokens.spacing.sm}px`,
          '&.Mui-focused': {
            color: tokens.colors.text.primary,
          },
          '&.Mui-error': {
            color: tokens.colors.error.main,
          },
          '&.Mui-disabled': {
            color: tokens.colors.text.disabled,
          },
        },
      },
    },

    // MuiCheckbox — migrated 2026-04-15
    // Hitbox (38x38), icon size (16px), hover bg. MUI's native color="primary|error"
    // prop handles checked/disabled colors via the palette — no override needed.
    MuiCheckbox: {
      styleOverrides: {
        root: {
          width: '38px',
          height: '38px',
          padding: `${tokens.spacing.sm}px`,
          '& .MuiSvgIcon-root': {
            fontSize: '16px',
          },
        },
      },
    },

    // MuiRadio — migrated 2026-04-15
    // Matches Checkbox hitbox/sizing. Native color prop handles state coloring.
    MuiRadio: {
      styleOverrides: {
        root: {
          width: '38px',
          height: '38px',
          padding: `${tokens.spacing.sm}px`,
          '& .MuiSvgIcon-root': {
            fontSize: '16px',
          },
        },
      },
    },

    // MuiAutocomplete — migrated 2026-04-15
    // Popup indicator, clear indicator, paper, and option styling for
    // the dropdown surface. The input itself uses MuiTextField overrides
    // (Autocomplete internally renders a MuiTextField via renderInput).
    //
    // inputRoot override (added v9 migration): MUI v9 ships Autocomplete-specific
    // padding (9px on the OutlinedInput root + 7.5px on the inner input) under
    // `& .MuiOutlinedInput-root` — this selector wins over our MuiTextField
    // override and pushes the field to ~53px tall. Resetting to our 4/8px spacing
    // so the field renders at the canonical 38px medium / 32px small.
    MuiAutocomplete: {
      styleOverrides: {
        inputRoot: {
          padding: `${tokens.spacing.xs}px ${tokens.spacing.sm}px`,
        },
        input: {
          padding: '0 !important',
        },
        popupIndicator: {
          padding: `${tokens.spacing.xs}px`,
        },
        clearIndicator: {
          color: tokens.colors.text.secondary,
        },
        paper: {
          borderRadius: `${tokens.borderRadius.default}px`,
          boxShadow: tokens.shadows.md,
          fontFamily: tokens.typography.fontFamily,
        },
        listbox: {
          fontSize: `${tokens.typography.fontSize.sm}px`,
          fontFamily: tokens.typography.fontFamily,
        },
        option: {
          fontFamily: tokens.typography.fontFamily,
          fontSize: `${tokens.typography.fontSize.sm}px`,
          padding: `${tokens.spacing.sm}px ${tokens.spacing.md}px`,
          '&.Mui-focused': {
            backgroundColor: tokens.colors.action.hover,
          },
          '&[aria-selected="true"]': {
            backgroundColor: tokens.colors.primary.light,
          },
        },
      },
    },

    // MuiAlert — migrated 2026-04-15
    // Root chrome (padding, radius, icon/message layout) + the 12 variant × severity
    // color combinations via the MUI v9 `variants` API. MUI's default standard
    // variant uses alpha(main, 0.12) which produces washed-out backgrounds; we
    // replace with the token light shades for better contrast.
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: `${tokens.borderRadius.default}px`,
          padding: `${tokens.spacing.md}px`,
          fontFamily: tokens.typography.fontFamily,
          '& .MuiAlert-icon': { fontSize: 24 },
          '& .MuiAlert-message': { gap: `${tokens.spacing.sm}px` },
        },
      },
      variants: [
        // Standard = soft tinted background
        {
          props: { variant: 'standard', severity: 'info' },
          style: {
            backgroundColor: tokens.colors.primary.light,
            color: tokens.colors.primary.main,
            '& .MuiAlert-icon': { color: tokens.colors.primary.main },
          },
        },
        {
          props: { variant: 'standard', severity: 'success' },
          style: {
            backgroundColor: tokens.colors.success.light,
            color: tokens.colors.success.main,
            '& .MuiAlert-icon': { color: tokens.colors.success.main },
          },
        },
        {
          props: { variant: 'standard', severity: 'warning' },
          style: {
            backgroundColor: tokens.colors.warning.light,
            color: tokens.colors.warning.main,
            '& .MuiAlert-icon': { color: tokens.colors.warning.main },
          },
        },
        {
          props: { variant: 'standard', severity: 'error' },
          style: {
            backgroundColor: tokens.colors.error.light,
            color: tokens.colors.error.main,
            '& .MuiAlert-icon': { color: tokens.colors.error.main },
          },
        },
        // Filled = solid main with contrast text
        {
          props: { variant: 'filled', severity: 'info' },
          style: {
            backgroundColor: tokens.colors.primary.main,
            color: tokens.colors.primary.contrastText,
            '& .MuiAlert-icon': { color: tokens.colors.primary.contrastText },
          },
        },
        {
          props: { variant: 'filled', severity: 'success' },
          style: {
            backgroundColor: tokens.colors.success.main,
            color: tokens.colors.success.contrastText,
            '& .MuiAlert-icon': { color: tokens.colors.success.contrastText },
          },
        },
        {
          props: { variant: 'filled', severity: 'warning' },
          style: {
            backgroundColor: tokens.colors.warning.main,
            color: tokens.colors.warning.contrastText,
            '& .MuiAlert-icon': { color: tokens.colors.warning.contrastText },
          },
        },
        {
          props: { variant: 'filled', severity: 'error' },
          style: {
            backgroundColor: tokens.colors.error.main,
            color: tokens.colors.error.contrastText,
            '& .MuiAlert-icon': { color: tokens.colors.error.contrastText },
          },
        },
        // Outlined = transparent bg with colored border + main text
        {
          props: { variant: 'outlined', severity: 'info' },
          style: {
            backgroundColor: 'transparent',
            color: tokens.colors.primary.main,
            borderColor: tokens.colors.primary.main,
            '& .MuiAlert-icon': { color: tokens.colors.primary.main },
          },
        },
        {
          props: { variant: 'outlined', severity: 'success' },
          style: {
            backgroundColor: 'transparent',
            color: tokens.colors.success.main,
            borderColor: tokens.colors.success.main,
            '& .MuiAlert-icon': { color: tokens.colors.success.main },
          },
        },
        {
          props: { variant: 'outlined', severity: 'warning' },
          style: {
            backgroundColor: 'transparent',
            color: tokens.colors.warning.main,
            borderColor: tokens.colors.warning.main,
            '& .MuiAlert-icon': { color: tokens.colors.warning.main },
          },
        },
        {
          props: { variant: 'outlined', severity: 'error' },
          style: {
            backgroundColor: 'transparent',
            color: tokens.colors.error.main,
            borderColor: tokens.colors.error.main,
            '& .MuiAlert-icon': { color: tokens.colors.error.main },
          },
        },
      ],
    },

    // MuiAlertTitle — migrated 2026-04-15
    MuiAlertTitle: {
      styleOverrides: {
        root: {
          fontSize: `${tokens.typography.fontSize.sm}px`,
          fontWeight: tokens.typography.fontWeight.medium,
          lineHeight: '24px',
          margin: 0,
        },
      },
    },

    // MuiTooltip — migrated 2026-04-15
    // Black-bg / white-text tooltip with arrow, per Figma node 490:88.
    // arrow: true is the default because TRIO tooltips always show an arrow;
    // pass arrow={false} at the call site if ever needed.
    MuiTooltip: {
      defaultProps: {
        arrow: true,
      },
      styleOverrides: {
        tooltip: {
          backgroundColor: tokens.colors.base.black,
          color: tokens.colors.base.white,
          fontFamily: tokens.typography.fontFamily,
          fontSize: `${tokens.typography.fontSize.sm}px`,
          fontWeight: tokens.typography.fontWeight.medium,
          lineHeight: `${tokens.typography.body2.lineHeight}px`,
          padding: `${tokens.spacing.xs}px ${tokens.spacing.sm}px`,
          borderRadius: `${tokens.borderRadius.default}px`,
          boxShadow: tokens.shadows.md,
        },
        arrow: {
          color: tokens.colors.base.black,
        },
      },
    },

    // MuiButtonGroup — migrated 2026-04-15
    // ButtonGroup has slightly taller buttons than standalone Button per Figma
    // (sm=32px, md=38px vs. standalone 28/36). Size is applied via variants.
    // MUI's native ButtonGroup handles adjacent border-radius sharing by default,
    // so no need to override those.
    MuiButtonGroup: {
      styleOverrides: {
        root: {
          fontFamily: tokens.typography.fontFamily,
          '& .MuiButton-root': {
            textTransform: 'none',
          },
        },
      },
      variants: [
        {
          props: { size: 'small' },
          style: {
            '& .MuiButton-root': {
              height: 32,
              fontSize: `${tokens.typography.fontSize.sm}px`,
              fontWeight: tokens.typography.fontWeight.medium,
              textTransform: 'none',
            },
          },
        },
        {
          props: { size: 'medium' },
          style: {
            '& .MuiButton-root': {
              height: 38,
              fontSize: `${tokens.typography.fontSize.sm}px`,
              fontWeight: tokens.typography.fontWeight.medium,
              textTransform: 'none',
            },
          },
        },
      ],
    },

    // MuiTabs / MuiTab — migrated 2026-04-15
    // Indicator renders at the TOP of the tab (not bottom) per Figma spec.
    // Border-bottom + paper bg are on MuiTabs.root so consumers don't need
    // a wrapping Box.
    MuiTabs: {
      styleOverrides: {
        root: {
          minHeight: 40,
          borderBottom: `1px solid ${tokens.colors.components.divider}`,
        },
        // Hide the default indicator — we draw it manually on the selected tab
        indicator: {
          display: 'none',
        },
        scrollButtons: {
          color: tokens.colors.text.secondary,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          minHeight: 40,
          padding: `0 ${tokens.spacing.md}px`,
          fontFamily: tokens.typography.fontFamily,
          fontSize: `${tokens.typography.body2.fontSize}px`,
          fontWeight: tokens.typography.fontWeight.regular,
          lineHeight: `${tokens.typography.body2.lineHeight}px`,
          textTransform: 'none',
          color: tokens.colors.text.secondary,
          // Card-tab: selected tab overlaps the bottom HR by 1px
          marginBottom: -1,
          borderBottom: '1px solid transparent',
          position: 'relative',
          '&.Mui-selected': {
            color: tokens.colors.text.primary,
            backgroundColor: tokens.colors.background.paper,
            borderLeft: `1px solid ${tokens.colors.components.divider}`,
            borderRight: `1px solid ${tokens.colors.components.divider}`,
            borderBottom: `1px solid ${tokens.colors.background.paper}`,
            borderTopLeftRadius: `${tokens.borderRadius.default}px`,
            borderTopRightRadius: `${tokens.borderRadius.default}px`,
            // Blue indicator at top — 3px tall with 2px corner radius
            // (Figma node 3868:51829 spec is 2px; Jesse uplifted to 3px for
            //  better visual weight against the 14px tab labels)
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 3,
              backgroundColor: tokens.colors.primary.main,
              borderTopLeftRadius: 2,
              borderTopRightRadius: 2,
            },
          },
          '&.Mui-disabled': {
            color: tokens.colors.text.disabled,
            opacity: 1,
          },
        },
      },
    },

    // MuiMenu / MuiMenuItem / MuiListSubheader — migrated 2026-04-15
    // Dropdown surface, items, and group headers. Applies to our custom Menu
    // wrapper AND anywhere MUI opens a Menu (e.g. Select's default dropdown,
    // though our Select uses the custom Menu component for consistency).
    MuiMenu: {
      styleOverrides: {
        paper: {
          fontFamily: tokens.typography.fontFamily,
          minWidth: '254px',
          boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08), 0px 1px 4px rgba(0, 0, 0, 0.06)',
          borderRadius: `${tokens.borderRadius.default}px`,
        },
        list: {
          padding: `${tokens.spacing.sm}px 0`,
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontFamily: tokens.typography.fontFamily,
          minHeight: '37px',
          padding: `${tokens.spacing.sm}px ${tokens.spacing.md}px`,
          fontSize: `${tokens.typography.fontSize.sm}px`,
          fontWeight: tokens.typography.fontWeight.regular,
          color: tokens.colors.text.primary,
          gap: `${tokens.spacing.md}px`,
          '&:hover': {
            backgroundColor: tokens.colors.action.hover,
          },
          '&.Mui-selected': {
            backgroundColor: tokens.colors.primary.selected,
            '&:hover': {
              backgroundColor: tokens.colors.primary.selected,
            },
          },
          '&.Mui-disabled': {
            color: tokens.colors.text.disabled,
            opacity: 1,
          },
        },
      },
    },
    MuiListSubheader: {
      styleOverrides: {
        root: {
          fontFamily: tokens.typography.fontFamily,
          fontSize: `${tokens.typography.fontSize.xs}px`,
          fontWeight: tokens.typography.fontWeight.medium,
          color: tokens.colors.text.secondary,
          lineHeight: '37px',
          padding: `0 ${tokens.spacing.md}px`,
          backgroundColor: 'transparent',
        },
      },
    },

    // MuiChip — migrated 2026-04-15
    // Static chrome (pill, padding, typography, hover overlay, label/icon sizing).
    // Color × variant × disabled matrix stays in components/Chip/Chip.tsx because
    // our chip variant naming ("contained"/"outline") and default color mapping
    // diverge from MUI's native filled/outlined + palette defaults.
    //
    // MUI's size prop is reused: size="medium" = 32px, size="small" = 24px —
    // exact match to Figma md/sm. Component maps md → medium, sm → small.
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: `${tokens.borderRadius.full}px`,
          padding: `0 ${tokens.spacing.xs}px`,
          fontFamily: tokens.typography.fontFamily,
          fontSize: `${tokens.typography.button.sm.fontSize}px`,
          fontWeight: tokens.typography.button.sm.fontWeight,
          lineHeight: `${tokens.typography.button.sm.lineHeight}px`,
          letterSpacing: 0,
          textTransform: 'none',
          boxShadow: 'none',
          // Hover is handled per-color in Chip.tsx (semantic tints)
          '&:hover': {
            boxShadow: 'none',
          },
          '&.Mui-disabled': {
            opacity: 1,
            pointerEvents: 'none',
          },
        },
        label: {
          padding: `0 ${tokens.spacing.sm}px`,
          fontSize: 'inherit',
          fontWeight: 'inherit',
          lineHeight: 'inherit',
          letterSpacing: 'inherit',
        },
        icon: {
          width: 16,
          height: 16,
          fontSize: 16,
          margin: 0,
          color: 'inherit',
          flexShrink: 0,
        },
        deleteIcon: {
          width: 16,
          height: 16,
          fontSize: 16,
          margin: `0 ${tokens.spacing.xs}px 0 0`,
          color: 'inherit',
          flexShrink: 0,
          '&:hover': {
            color: 'inherit',
          },
        },
      },
    },

    // MuiBadge — migrated 2026-04-15
    // Badge color is handled natively by MUI via the `color` prop + theme palette —
    // no custom colorMap needed. These overrides only tune the sizing and shape
    // to match Figma (16px pill for standard, 8px dot, 11px/500 typography).
    MuiBadge: {
      styleOverrides: {
        badge: {
          fontFamily: tokens.typography.fontFamily,
          fontSize: `${tokens.typography.fontSize.xxs}px`,
          fontWeight: tokens.typography.fontWeight.medium,
          lineHeight: '16px',
          letterSpacing: 0,
          borderRadius: `${tokens.borderRadius.full}px`,
          height: '16px',
          minWidth: '16px',
          padding: `0 ${tokens.spacing.xs}px`,
        },
        dot: {
          height: '8px',
          minWidth: '8px',
          padding: 0,
          borderRadius: `${tokens.borderRadius.full}px`,
        },
      },
    },

    // MuiSwitch — migrated 2026-04-15
    // Figma track: 28x16px, thumb: 12px, 2px padding, pill radius.
    // Off: white bg + rgba(0,0,0,0.3) border. On: primary blue bg.
    // Disabled off: rgba(0,0,0,0.08) bg, no border.
    MuiSwitch: {
      styleOverrides: {
        root: {
          width: 28,
          height: 16,
          padding: 0,
          overflow: 'visible',
          display: 'inline-flex',
        },
        switchBase: {
          padding: 2,
          color: tokens.colors.action.active,
          '&.Mui-checked': {
            transform: 'translateX(12px)',
            color: tokens.colors.base.white,
            '& + .MuiSwitch-track': {
              backgroundColor: tokens.colors.primary.main,
              opacity: 1,
              border: `1px solid ${tokens.colors.primary.main}`,
            },
            '&.Mui-disabled + .MuiSwitch-track': {
              backgroundColor: 'rgba(0, 0, 0, 0.08)',
              opacity: 1,
              border: 'none',
            },
          },
          '&.Mui-disabled': {
            '& .MuiSwitch-thumb': {
              color: tokens.colors.text.disabled,
            },
            '& + .MuiSwitch-track': {
              backgroundColor: 'rgba(0, 0, 0, 0.08)',
              opacity: 1,
              border: 'none',
            },
          },
        },
        thumb: {
          boxSizing: 'border-box',
          width: 12,
          height: 12,
          boxShadow: 'none',
        },
        track: {
          borderRadius: 999,
          backgroundColor: tokens.colors.base.white,
          border: '1px solid rgba(0, 0, 0, 0.3)',
          opacity: 1,
          transition: 'background-color 300ms, border 300ms',
        },
      },
    },
  },
};

export const trioTheme = createTheme(themeOptions);

export default trioTheme;
