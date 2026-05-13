/**
 * Select Component Types
 *
 * SOURCE OF TRUTH: Figma component "Select" (node: 2433:8481)
 *
 * These types are DIRECTLY MAPPED from Figma componentPropertyDefinitions.
 * DO NOT add properties that don't exist in Figma.
 * DO NOT modify variant options unless Figma is updated.
 */

import type { ReactNode } from 'react';

/**
 * Select variant types from Figma
 */
export type SelectState = 'default' | 'focus' | 'disabled' | 'error' | 'selected';
export type SelectSize = 'medium' | 'small';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
  /**
   * Leading slot content (icon, avatar, status dot).
   * Pass-through to the underlying Menu item's `leftContent` slot,
   * which is Figma-sanctioned (see Menu `multi` variant, node 4505:3795).
   */
  leftContent?: ReactNode;
  /**
   * Trailing slot content (icon, badge, shortcut hint).
   * Pass-through to the underlying Menu item's `rightContent` slot.
   */
  rightContent?: ReactNode;
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

  /**
   * Size variant
   * @default 'medium'
   */
  size?: SelectSize;

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

export const defaultSelectProps: Partial<SelectProps> = {
  state: 'default',
  size: 'medium',
  disabled: false,
  error: false,
  placeholder: 'Select an option',
  options: [],
};
