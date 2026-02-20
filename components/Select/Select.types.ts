/**
 * Select Component Types
 *
 * SOURCE OF TRUTH: Figma component "Select" (node: 2433:8481)
 * Cache: ~/.openclaw/shared-data/figma-specs/select.json
 *
 * These types are DIRECTLY MAPPED from Figma componentPropertyDefinitions.
 * DO NOT add properties that don't exist in Figma.
 * DO NOT modify variant options unless Figma is updated.
 */

import { ReactNode } from 'react';

/**
 * Select variant types from Figma
 */
export type SelectState = 'default' | 'focus' | 'disabled' | 'error' | 'selected';
export type SelectType = 'closed' | 'open';

export interface SelectOption {
  value: string;
  label: string;
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
   * Change handler
   */
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;

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
