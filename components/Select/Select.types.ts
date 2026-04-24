/**
 * Select Component Types
 *
 * SOURCE OF TRUTH: Figma component "Select" (node: 2433:8481)
 *
 * These types are DIRECTLY MAPPED from Figma componentPropertyDefinitions.
 * DO NOT add properties that don't exist in Figma.
 * DO NOT modify variant options unless Figma is updated.
 */

/**
 * Select variant types from Figma
 */
export type SelectState = 'default' | 'focus' | 'disabled' | 'error' | 'selected';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  // ========================================
  // VARIANT Properties (from Figma)
  // ========================================

  /**
   * Visual state of the select
   * @default 'default'
   */
  state?: SelectState;

  // ========================================
  // React Props (not from Figma)
  // ========================================

  /**
   * Select options
   */
  options?: SelectOption[];

  /**
   * Selected value
   */
  value?: string;

  /**
   * Change handler — receives the selected value string
   */
  onChange?: (value: string) => void;

  /**
   * Label text
   */
  label?: string;

  /**
   * Helper text
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
   * Custom class name
   */
  className?: string;

  /**
   * ARIA label for accessibility
   */
  'aria-label'?: string;
}

export const defaultSelectProps: Partial<SelectProps> = {
  state: 'default',
  disabled: false,
  error: false,
  placeholder: 'Select an option',
  options: [],
};
