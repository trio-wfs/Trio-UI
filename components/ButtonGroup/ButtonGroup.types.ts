/**
 * ButtonGroup Component Types
 *
 * SOURCE OF TRUTH: Figma component "buttonGroup" (node: 2172:9605)
 *
 * Variant types are DIRECTLY MAPPED from Figma componentPropertyDefinitions.
 * DO NOT add new variants that don't exist in Figma.
 *
 * The `children` composition mode is React-only — it lets the group host any
 * mix of Button / ButtonIcon nodes when the simple `buttons: string[]` API
 * isn't enough (e.g. icon trios per PAGE_ARCHITECTURE §4).
 */

import type React from 'react';


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
   * Button labels (array of strings).
   * Simple text-button mode — each label renders as a Button inside the group.
   * Maps to button-3 through button-8 visibility in Figma. Maximum 6 buttons.
   *
   * Ignored when `children` is provided.
   */
  buttons?: string[];

  /**
   * Composition mode — when provided, the group renders these nodes directly
   * instead of mapping the `buttons` array. Use for icon trios and any case
   * where the simple `buttons` array isn't expressive enough.
   *
   * Each child should be a Button or ButtonIcon. The group strips child borders
   * and inserts 1px dividers between siblings — Button-on-Button, ButtonIcon-on-
   * ButtonIcon, or any mix.
   *
   * Example (icon trio for a grid toolbar):
   *   <ButtonGroup variant="outline">
   *     <ButtonIcon icon={<FilterListIcon />} aria-label="Filter" />
   *     <ButtonIcon icon={<ViewColumnIcon />} aria-label="Columns" />
   *     <ButtonIcon icon={<MoreHorizIcon />} aria-label="More" />
   *   </ButtonGroup>
   */
  children?: React.ReactNode;

  /**
   * Click handlers for each button
   */
  onButtonClick?: ((index: number) => void)[];

  /**
   * Disable specific buttons
   */
  disabledButtons?: boolean[];

  /**
   * Index of the currently active/selected button.
   * Active button gets action.selected background.
   */
  activeIndex?: number;

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
