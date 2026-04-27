/**
 * DatePicker Component Types
 *
 * SOURCE OF TRUTH: Figma component "Date Picker" (node: 2784:5964)
 *
 * Thin wrapper around MUI X DatePicker / DateTimePicker,
 * themed to match TRIO WFS design tokens.
 * Figma variants (Date, Time and Date, Date Picker with Chips)
 * map to MUI's DatePicker and DateTimePicker.
 */

import { Dayjs } from 'dayjs';

/**
 * Picker type from Figma variants
 * - date: Standard date picker (maps to MUI DatePicker)
 * - dateTime: Date + time picker (maps to MUI DateTimePicker)
 */
export type DatePickerType = 'date' | 'dateTime';

export interface DatePickerProps {
  // ========================================
  // VARIANT Properties (from Figma)
  // ========================================

  /**
   * Picker type — date only or date + time
   * @default 'date'
   */
  type?: DatePickerType;

  // ========================================
  // React Props
  // ========================================

  /**
   * Selected value
   */
  value?: Dayjs | null;

  /**
   * Change handler
   */
  onChange?: (value: Dayjs | null) => void;

  /**
   * Label text for the input field
   */
  label?: string;

  /**
   * Helper text below the input
   */
  helperText?: string;

  /**
   * Placeholder text
   */
  placeholder?: string;

  /**
   * Disabled state
   */
  disabled?: boolean;

  /**
   * Error state
   */
  error?: boolean;

  /**
   * Minimum selectable date
   */
  minDate?: Dayjs;

  /**
   * Maximum selectable date
   */
  maxDate?: Dayjs;

  /**
   * Whether the field is required
   */
  required?: boolean;

  /**
   * Input size — matches TRIO TextField sizes
   * medium = 38px height (default, matches Button medium)
   * small = 30px height (matches Button small)
   * @default 'medium'
   */
  size?: 'small' | 'medium';

  /**
   * HTML name attribute
   */
  name?: string;

  /**
   * HTML id attribute
   */
  id?: string;

  /**
   * Custom class name
   */
  className?: string;

  /**
   * ARIA label for accessibility
   */
  'aria-label'?: string;
}

export const defaultDatePickerProps: Partial<DatePickerProps> = {
  type: 'date',
  disabled: false,
  error: false,
  size: 'medium',
};
