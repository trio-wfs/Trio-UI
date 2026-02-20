/**
 * Switch Component Types
 *
 * SOURCE OF TRUTH: Figma component "Switch" (node: 2433:9802)
 * Cache: ~/.openclaw/shared-data/figma-specs/switch.json
 *
 * These types are DIRECTLY MAPPED from Figma componentPropertyDefinitions.
 * DO NOT add properties that don't exist in Figma.
 * DO NOT modify variant options unless Figma is updated.
 */

import { ReactNode } from 'react';

/**
 * Switch variant types from Figma
 */
export type SwitchState = 'off' | 'on';
export type SwitchLabelPlacement = 'left' | 'right' | 'top';
export type SwitchDisabled = 'no' | 'yes';

export interface SwitchProps {
  // ========================================
  // VARIANT Properties (from Figma)
  // ========================================

  /**
   * On/off state
   * @default 'off'
   */
  state?: SwitchState;

  /**
   * Label placement
   * @default 'right'
   */
  labelPlacement?: SwitchLabelPlacement;

  /**
   * Disabled state
   * @default 'no'
   */
  disabled?: SwitchDisabled;

  // ========================================
  // React Props (not from Figma)
  // ========================================

  /**
   * Checked state (controlled)
   */
  checked?: boolean;

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

export const defaultSwitchProps: Partial<SwitchProps> = {
  state: 'off',
  labelPlacement: 'right',
  disabled: 'no',
  checked: false,
};
