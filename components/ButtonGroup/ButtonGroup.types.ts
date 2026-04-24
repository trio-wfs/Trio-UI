/**
 * ButtonGroup Component Types
 *
 * SOURCE OF TRUTH: Figma component "buttonGroup" (node: 2172:9605)
 *
 * These types are DIRECTLY MAPPED from Figma componentPropertyDefinitions.
 * DO NOT add properties that don't exist in Figma.
 * DO NOT modify variant options unless Figma is updated.
 */

import { ReactNode } from 'react';

/**
 * ButtonGroup variant types from Figma
 */
export type ButtonGroupVariant = 'contained' | 'outline';
export type ButtonGroupSize = 'small' | 'medium';
export type ButtonGroupColor = 'secondary' | 'primary';
export type ButtonGroupOrientation = 'horizontal' | 'vertical';

export interface ButtonGroupProps {
  // ========================================
  // VARIANT Properties (from Figma)
  // ========================================

  /**
   * Button variant style
   * @default 'contained'
   */
  variant?: ButtonGroupVariant;

  /**
   * Size of buttons in the group
   * @default 'small'
   */
  size?: ButtonGroupSize;

  /**
   * Color scheme
   * @default 'secondary'
   */
  color?: ButtonGroupColor;

  /**
   * Layout orientation
   * @default 'horizontal'
   */
  orientation?: ButtonGroupOrientation;

  // ========================================
  // BOOLEAN Properties (from Figma)
  // ========================================
  // button-3 through button-8 control visibility
  // In React, handled via buttons array prop

  // ========================================
  // React Props (not from Figma)
  // ========================================

  /**
   * Button labels (array of strings)
   * Maps to button-3 through button-8 visibility in Figma
   * Maximum 6 buttons supported
   */
  buttons?: string[];

  /**
   * Click handlers for each button
   */
  onButtonClick?: ((index: number) => void)[];

  /**
   * Disable specific buttons
   */
  disabledButtons?: boolean[];

  /**
   * Custom class name
   */
  className?: string;

  /**
   * Full width (horizontal only)
   */
  fullWidth?: boolean;

  /**
   * Disable elevation for contained variant
   */
  disableElevation?: boolean;
}

export const defaultButtonGroupProps: Partial<ButtonGroupProps> = {
  variant: 'contained',
  size: 'small',
  color: 'secondary',
  orientation: 'horizontal',
  buttons: ['Button 1', 'Button 2', 'Button 3'],
  fullWidth: false,
  disableElevation: true,
};
