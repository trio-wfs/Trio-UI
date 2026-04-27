/**
 * NumberField Component Types
 *
 * SOURCE OF TRUTH: Figma component "number-field" node 5464:5759
 *
 * These types are DIRECTLY MAPPED from Figma componentPropertyDefinitions.
 * DO NOT add properties that don't exist in Figma.
 * DO NOT modify variant options unless Figma is updated.
 */

/**
 * NumberField size variants from Figma
 * medium = 38px height (matches Button medium), 14px input font
 * small  = 32px height (matches Button small),  12px input font
 */
export type NumberFieldSize = 'medium' | 'small';

export interface NumberFieldProps {
  // ========================================
  // VARIANT Properties (from Figma)
  // ========================================

  /**
   * Size of the number field
   * @default 'medium'
   */
  size?: NumberFieldSize;

  /**
   * Whether the field is disabled
   * @default false
   */
  disabled?: boolean;

  // ========================================
  // VALUE / BEHAVIOUR Properties
  // ========================================

  /**
   * Controlled numeric value
   */
  value?: number;

  /**
   * Called whenever the value changes via + or − button, or direct input.
   * Receives the new numeric value (already clamped to min/max).
   */
  onChange?: (value: number) => void;

  /**
   * Minimum allowed value (inclusive).
   * The − button is disabled when value <= min.
   */
  min?: number;

  /**
   * Maximum allowed value (inclusive).
   * The + button is disabled when value >= max.
   */
  max?: number;

  /**
   * Amount to increment / decrement on each button press
   * @default 1
   */
  step?: number;

  // ========================================
  // LABEL / HELPER TEXT Properties
  // ========================================

  /**
   * Label rendered above the field
   */
  label?: string;

  /**
   * Helper or error text rendered below the field
   */
  helperText?: string;

  /**
   * Puts the field into an error visual state and styles helperText in error color
   * @default false
   */
  error?: boolean;

  // ========================================
  // HTML / Accessibility Properties
  // ========================================

  /**
   * HTML name attribute forwarded to the hidden <input>
   */
  name?: string;

  /**
   * HTML id attribute forwarded to the hidden <input>
   */
  id?: string;

  /**
   * Whether the field is required
   */
  required?: boolean;

  /**
   * Custom class name applied to the root element
   */
  className?: string;

  /**
   * ARIA label for the whole control (used when no visible label is present)
   */
  'aria-label'?: string;
}

export const defaultNumberFieldProps: Partial<NumberFieldProps> = {
  size: 'medium',
  disabled: false,
  step: 1,
  error: false,
};
