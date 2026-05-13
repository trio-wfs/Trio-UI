/**
 * DatePicker Component
 *
 * SOURCE OF TRUTH: Figma component "Date Picker" (node: 2784:5964)
 * Design System: AHTG Desktop SaaS
 *
 * Wraps MUI X DatePicker / DateTimePicker with TRIO WFS theme overrides.
 * Calendar popup styled to match Figma:
 * - 36px day cells, 4px border-radius container
 * - Selected: filled #2196F3 circle, white text
 * - Today: outlined #2196F3 circle, blue text
 * - Shadow: 0px 8px 16px rgba(0,0,0,0.15)
 *
 * EXTRACTED VALUES FROM FIGMA:
 * - Calendar width: 320px (date) / 497px (dateTime)
 * - Day cell size: 36px
 * - Day-of-week headers: 12px, disabled text color
 * - Month header: 16px Roboto Regular
 * - Footer buttons: Cancel/Apply, ghost style, 14px #2196F3
 */

import React from 'react';
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateTimePicker as MuiDateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import CalendarMonthOutlined from '@mui/icons-material/CalendarMonthOutlined';
import { type DatePickerProps, defaultDatePickerProps } from './DatePicker.types';
import { tokens } from '../../design-tokens/tokens';

// Shared slot props for theming the calendar popup to match Figma
const calendarSlotProps = {
  desktopPaper: {
    sx: {
      borderRadius: `${tokens.borderRadius.default}px`,
      boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.15)',
      '& .MuiPickersCalendarHeader-root': {
        pl: `${tokens.spacing.lg}px`,
        pr: `${tokens.spacing.md}px`,
        pt: `${tokens.spacing.md}px`,
        pb: `${tokens.spacing.sm}px`,
      },
      '& .MuiPickersCalendarHeader-label': {
        fontFamily: tokens.typography.fontFamily,
        fontSize: `${tokens.typography.fontSize.md}px`,
        fontWeight: tokens.typography.fontWeight.regular,
        color: tokens.colors.text.primary,
      },
      '& .MuiDayCalendar-weekDayLabel': {
        fontFamily: tokens.typography.fontFamily,
        fontSize: `${tokens.typography.fontSize.xs}px`,
        fontWeight: tokens.typography.fontWeight.regular,
        color: tokens.colors.text.disabled,
        width: 36,
        height: 40,
      },
      '& .MuiPickersDay-root': {
        fontFamily: tokens.typography.fontFamily,
        fontSize: `${tokens.typography.fontSize.sm}px`,
        fontWeight: tokens.typography.fontWeight.regular,
        width: 36,
        height: 36,
        color: tokens.colors.text.primary,
        '&:hover': {
          backgroundColor: 'rgba(33, 150, 243, 0.08)',
        },
        '&.Mui-selected': {
          backgroundColor: tokens.colors.primary.main,
          color: tokens.colors.primary.contrastText,
          fontWeight: tokens.typography.fontWeight.medium,
          '&:hover': {
            backgroundColor: tokens.colors.primary.dark,
          },
          '&:focus': {
            backgroundColor: tokens.colors.primary.main,
          },
        },
        '&.MuiPickersDay-today': {
          border: `1px solid ${tokens.colors.primary.dark}`,
          backgroundColor: 'transparent',
          color: tokens.colors.primary.dark,
          fontWeight: tokens.typography.fontWeight.medium,
          '&.Mui-selected': {
            backgroundColor: tokens.colors.primary.main,
            color: tokens.colors.primary.contrastText,
            border: 'none',
          },
        },
        '&.Mui-disabled': {
          color: '#9E9E9E',
        },
      },
      '& .MuiPickersDay-dayOutsideMonth': {
        color: '#9E9E9E',
      },
      '& .MuiPickersArrowSwitcher-button': {
        color: tokens.colors.components.icon.default,
      },
      '& .MuiDialogActions-root': {
        borderTop: `1px solid ${tokens.colors.components.border.default}`,
        px: `${tokens.spacing.md}px`,
        py: `${tokens.spacing.sm}px`,
        '& .MuiButton-root': {
          fontFamily: tokens.typography.fontFamily,
          fontSize: `${tokens.typography.fontSize.sm}px`,
          fontWeight: tokens.typography.fontWeight.regular,
          color: tokens.colors.primary.main,
          textTransform: 'none',
        },
      },
      // Time picker panel styling
      '& .MuiMultiSectionDigitalClock-root': {
        borderLeft: `1px solid ${tokens.colors.components.border.default}`,
        backgroundColor: tokens.colors.background.secondary,
        // Remove vertical divider lines between time columns
        '& .MuiMultiSectionDigitalClockSection-root': {
          '&::after': {
            display: 'none',
          },
          borderRight: 'none',
        },
        // Remove any list dividers
        '& .MuiList-root': {
          borderRight: 'none',
        },
      },
      '& .MuiMultiSectionDigitalClockSection-item': {
        fontFamily: tokens.typography.fontFamily,
        fontSize: `${tokens.typography.fontSize.sm}px`,
        color: tokens.colors.text.primary,
        // Circle selection states matching Figma day cells
        width: 36,
        minWidth: 36,
        height: 36,
        borderRadius: '999px',
        margin: '0 auto',
        padding: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '&:hover': {
          backgroundColor: 'rgba(33, 150, 243, 0.08)',
        },
        '&.Mui-selected': {
          backgroundColor: tokens.colors.primary.selected,
          color: tokens.colors.text.primary,
          fontWeight: tokens.typography.fontWeight.medium,
          '&:hover': {
            backgroundColor: 'rgba(33, 150, 243, 0.16)',
          },
          '&:focus': {
            backgroundColor: tokens.colors.primary.selected,
          },
        },
      },
    },
  },
  // TextField styling is applied per-instance to match TRIO TextField sizes

};

/**
 * Build textField slotProps that match TRIO TextField specs exactly.
 * medium = 38px height, 14px font, 6px 12px padding
 * small = 32px height, 12px font, 4px 8px padding
 */
const getTextFieldSlotProps = (size: 'small' | 'medium') => {
  const isSmall = size === 'small';
  // Always use MUI size="small" to avoid MUI's bloated medium padding (16.5px).
  // We control height and font ourselves to match TRIO TextField specs.
  return {
    variant: 'outlined' as const,
    size: 'small' as const,
    slotProps: {
      inputLabel: { shrink: true },
      input: { notched: false },
    },
    sx: {
      '& .MuiOutlinedInput-root.MuiInputBase-root': {
        fontFamily: tokens.typography.fontFamily,
        fontSize: `${isSmall ? tokens.typography.fontSize.xs : tokens.typography.fontSize.sm}px`,
        height: isSmall ? tokens.controls.height.small : tokens.controls.height.medium,
        padding: isSmall
          ? `${tokens.spacing.xs}px ${tokens.spacing.sm}px`
          : `${tokens.spacing.xs + 2}px ${tokens.spacing.mid}px`,
        borderRadius: `${tokens.borderRadius.default}px`,
        '& fieldset': {
          borderColor: tokens.colors.components.input.enabledBorder,
        },
        '&:hover fieldset': {
          borderColor: tokens.colors.components.input.hoverBorder,
        },
        '&.Mui-focused fieldset': {
          borderColor: tokens.colors.primary.main,
          borderWidth: 2,
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
      '& .MuiOutlinedInput-input.MuiInputBase-input': {
        fontSize: `${isSmall ? tokens.typography.fontSize.xs : tokens.typography.fontSize.sm}px`,
        lineHeight: isSmall ? '18px' : '21px',
        color: tokens.colors.text.primary,
        fontWeight: tokens.typography.fontWeight.regular,
        padding: '0 !important',
      },
      '& .MuiInputLabel-root': {
        fontFamily: tokens.typography.fontFamily,
      },
      '& .MuiFormHelperText-root': {
        fontFamily: tokens.typography.fontFamily,
      },
      '& .MuiSvgIcon-root': {
        fontSize: isSmall ? 16 : 18,
        color: tokens.colors.text.secondary,
      },
    },
  };
};

export const DatePicker = React.forwardRef<HTMLInputElement, DatePickerProps>(({
  type = defaultDatePickerProps.type,
  value,
  onChange,
  label,
  helperText,
  placeholder,
  disabled = defaultDatePickerProps.disabled,
  error = defaultDatePickerProps.error,
  minDate,
  maxDate,
  required,
  size = defaultDatePickerProps.size,
  name,
  id,
  className,
  ...ariaProps
}, ref) => {
  const textFieldProps = getTextFieldSlotProps(size!);

  const sharedProps = {
    value: value ?? null,
    onChange: onChange as any,
    label,
    disabled,
    minDate,
    maxDate,
    className,
    slots: {
      openPickerIcon: CalendarMonthOutlined,
    },
    slotProps: {
      ...calendarSlotProps,
      textField: {
        ...textFieldProps,
        helperText,
        placeholder,
        error,
        required,
        name,
        id,
        inputRef: ref,
        ...ariaProps,
      },
    },
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {type === 'dateTime' ? (
        <MuiDateTimePicker {...sharedProps} />
      ) : (
        <MuiDatePicker {...sharedProps} />
      )}
    </LocalizationProvider>
  );
});

DatePicker.displayName = 'DatePicker';

export default DatePicker;
