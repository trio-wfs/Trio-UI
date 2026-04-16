/**
 * TextField Component Types
 *
 * SOURCE OF TRUTH: Figma component "text-field"
 *
 * These types are DIRECTLY MAPPED from Figma componentPropertyDefinitions.
 * DO NOT add properties that don't exist in Figma.
 * DO NOT modify variant options unless Figma is updated.
 */

/**
 * TextField type variants from Figma
 */
export type TextFieldType = 'single-line' | 'multi-line';

/**
 * TextField state variants from Figma
 */
export type TextFieldState = 'default' | 'error' | 'focus';

export interface TextFieldProps {
  // ========================================
  // VARIANT Properties (from Figma)
  // ========================================

  /**
   * Type of text field
   * @default 'single-line'
   */
  type?: TextFieldType;

  /**
   * Visual state of the field
   * @default 'default'
   */
  state?: TextFieldState;

  /**
   * Whether the field is disabled
   * @default false
   */
  disabled?: boolean;

  // ========================================
  // BOOLEAN Properties (from Figma)
  // ========================================

  /**
   * Show helper text below input
   * @default false
   */
  iconRight?: boolean;

  /**
   * Show support icon
   * @default false
   */
  iconSupport?: boolean;

  /**
   * Fill input background
   * @default false
   */
  inputFill?: boolean;

  /**
   * Show chip content
   * @default false
   */
  chipContent?: boolean;

  /**
   * Show input adornment
   * @default false
   */
  adornmentInput?: boolean;

  // ========================================
  // TEXT / React Props
  // ========================================

  /**
   * Label text — renders above the input in segmented style
   */
  label?: string;

  /**
   * Placeholder text
   * @default 'Placeholder'
   */
  placeholder?: string;

  /**
   * Helper or error text below the input
   */
  helperText?: string;

  /**
   * Input value (controlled)
   */
  value?: string;

  /**
   * Change handler
   */
  onChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;

  /**
   * Custom class name
   */
  className?: string;

  /**
   * ARIA label for accessibility
   */
  'aria-label'?: string;
}

export const defaultTextFieldProps: Partial<TextFieldProps> = {
  type: 'single-line',
  state: 'default',
  disabled: false,
  iconRight: false,
  iconSupport: false,
  inputFill: false,
  chipContent: false,
  adornmentInput: false,
  placeholder: 'Placeholder',
};
