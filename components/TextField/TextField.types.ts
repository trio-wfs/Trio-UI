/**
 * TextField Component Types
 *
 * SOURCE OF TRUTH: Figma component "text-field"
 * Cache: ~/.openclaw/shared-data/figma-specs/text-field.json
 *
 * These types are DIRECTLY MAPPED from Figma componentPropertyDefinitions.
 * DO NOT add properties that don't exist in Figma.
 * DO NOT modify variant options unless Figma is updated.
 */

import { ReactNode } from 'react';

/**
 * TextField type variants from Figma
 */
export type TextFieldType = 'single-line' | 'multi-line';

/**
 * TextField state variants from Figma
 */
export type TextFieldState = 'default' | 'error' | 'focus';

/**
 * TextField disabled variants from Figma
 */
export type TextFieldDisabled = 'no' | 'yes';

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
   * @default 'no'
   */
  disabled?: TextFieldDisabled;

  // ========================================
  // BOOLEAN Properties (from Figma)
  // ========================================

  /**
   * Show label above input
   * @default true
   */
  label?: boolean;

  /**
   * Show helper text below input
   * @default false
   */
  helpText?: boolean;

  /**
   * Show icon on right side
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
  adormentInput?: boolean;

  // ========================================
  // TEXT Properties (from Figma)
  // ========================================

  /**
   * Placeholder text
   * @default 'Placeholder'
   */
  placeholderLabel?: string;

  /**
   * Input content
   * @default '|'
   */
  inputContent?: string;

  // ========================================
  // Standard React Props
  // ========================================

  /**
   * Input value (controlled)
   */
  value?: string;

  /**
   * Change handler
   */
  onChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;

  /**
   * Label text content
   */
  labelText?: string;

  /**
   * Helper text content
   */
  helperText?: string;

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
  disabled: 'no',
  label: true,
  helpText: false,
  iconRight: false,
  iconSupport: false,
  inputFill: false,
  chipContent: false,
  adormentInput: false,
  placeholderLabel: 'Placeholder',
  inputContent: '|',
};
