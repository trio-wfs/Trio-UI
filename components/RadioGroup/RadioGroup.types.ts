/**
 * RadioGroup Component Types
 *
 * SOURCE OF TRUTH: Figma component "Radio-Group" (node: 5382:7056)
 *
 * These types are DIRECTLY MAPPED from Figma componentPropertyDefinitions.
 * DO NOT add properties that don't exist in Figma.
 * DO NOT modify variant options unless Figma is updated.
 */


/**
 * RadioGroup variant types from Figma
 */
export type RadioGroupColor = 'primary' | 'default' | 'error';

export interface RadioOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface RadioGroupProps {
  // ========================================
  // VARIANT Properties (from Figma)
  // ========================================

  /**
   * Color scheme
   * @default 'primary'
   */
  color?: RadioGroupColor;

  // ========================================
  // React Props (not from Figma)
  // ========================================

  /**
   * Radio options
   */
  options?: RadioOption[];

  /**
   * Selected value
   */
  value?: string;

  /**
   * Change handler
   */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;

  /**
   * Group label
   */
  label?: string;

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
   * HTML id attribute
   */
  id?: string;

  /**
   * Whether the radio group is required
   */
  required?: boolean;

  /**
   * Name attribute for radio group
   */
  name?: string;

  /**
   * ARIA label for accessibility
   */
  'aria-label'?: string;
}

export const defaultRadioGroupProps: Partial<RadioGroupProps> = {
  color: 'primary',
  disabled: false,
  error: false,
  options: [],
};
