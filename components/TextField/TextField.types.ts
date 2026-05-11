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
 * TextField size variants from Figma
 * medium = 38px height (matches Button medium)
 * small = 30px height (matches Button small), uses caption (12px) typography
 */
export type TextFieldSize = 'medium' | 'small';

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
   * Size of the text field — aligns with Button sizes for toolbar use
   * @default 'medium'
   */
  size?: TextFieldSize;

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

  /**
   * Fill input background with `background.secondary`
   * @default false
   */
  inputFill?: boolean;

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
   * HTML name attribute
   */
  name?: string;

  /**
   * HTML id attribute
   */
  id?: string;

  /**
   * Whether the field is required
   */
  required?: boolean;

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
  size: 'medium',
  state: 'default',
  disabled: false,
  inputFill: false,
  placeholder: 'Placeholder',
};
