/**
 * Checkbox Component Types
 *
 * SOURCE OF TRUTH: Figma component "Checkbox" (node: 2425:7975)
 *
 * These types are DIRECTLY MAPPED from Figma componentPropertyDefinitions.
 * DO NOT add properties that don't exist in Figma.
 * DO NOT modify variant options unless Figma is updated.
 */


/**
 * Checkbox variant types from Figma
 */
export type CheckboxColor = 'primary' | 'error';

export interface CheckboxProps {
  // ========================================
  // VARIANT Properties (from Figma)
  // ========================================

  /**
   * Color scheme
   * @default 'primary'
   */
  color?: CheckboxColor;

  /**
   * Checked state
   * @default 'false'
   */
  checked?: boolean;

  /**
   * Disabled state
   * @default false
   */
  disabled?: boolean;

  /**
   * Indeterminate state (partially checked)
   * @default false
   */
  indeterminate?: boolean;

  // ========================================
  // React Props (not from Figma)
  // ========================================

  /**
   * Change handler
   */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;

  /**
   * Label text
   */
  label?: string;

  /**
   * Custom class name
   */
  className?: string;

  /**
   * Input name attribute
   */
  name?: string;

  /**
   * Input value attribute
   */
  value?: string;

  /**
   * ARIA label for accessibility
   */
  'aria-label'?: string;
}

export const defaultCheckboxProps: Partial<CheckboxProps> = {
  color: 'primary',
  disabled: false,
  indeterminate: false,
};
