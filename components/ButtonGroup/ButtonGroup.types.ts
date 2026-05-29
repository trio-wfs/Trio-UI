/**
 * ButtonGroup Component Types
 *
 * SOURCE OF TRUTH: Figma component "buttonGroup" (node: 2172:9605)
 *
 * Architecture: ButtonGroup is a composition wrapper, not a new variant.
 * In Figma, each grouped button is a Button master instance — its props
 * (variant, size, color, startIcon, endIcon, label) are individually
 * editable. The React API mirrors that: typography and behavior come
 * from Button; the group only provides shared outer chrome.
 *
 * Variant ↔ color coupling: Figma's design system pairs them — `contained`
 * always with `secondary`, `outline` always with `primary`. The
 * discriminated union below makes the invalid combinations
 * (`contained + primary`, `outline + secondary`) TypeScript errors at the
 * call site instead of allowing visually undesigned combos through.
 */

import type React from 'react';


/**
 * ButtonGroup variant types from Figma (independent values shown for
 * referencing; the valid combinations are constrained by the discriminated
 * `ButtonGroupSurface` union below).
 */
export type ButtonGroupVariant = 'contained' | 'outline';
export type ButtonGroupColor = 'secondary' | 'primary';
export type ButtonGroupSize = 'small' | 'medium';
export type ButtonGroupOrientation = 'horizontal' | 'vertical';

/**
 * Button entry inside a ButtonGroup. A plain string is shorthand for a
 * label-only button. Pass an object to add startIcon / endIcon — the icons
 * flow through to the inner Button instance, matching the Figma model
 * where every grouped button retains full Button functionality.
 */
export type ButtonGroupButton =
  | string
  | {
      label: string;
      startIcon?: React.ReactNode;
      endIcon?: React.ReactNode;
    };

/**
 * Variant ↔ color coupling per Figma:
 * - `contained` pairs with `secondary` (neutral grouped actions)
 * - `outline` pairs with `primary` (action-emphasis grouped actions)
 *
 * Other combinations (`contained + primary`, `outline + secondary`) are
 * not in the design system and become TypeScript errors at the call site.
 */
type ButtonGroupSurface =
  | { variant?: 'contained'; color?: 'secondary' }
  | { variant: 'outline'; color?: 'primary' };

interface BaseButtonGroupProps {
  /**
   * Size of buttons in the group.
   * @default 'small'
   */
  size?: ButtonGroupSize;

  /**
   * Layout orientation.
   * @default 'horizontal'
   */
  orientation?: ButtonGroupOrientation;

  /**
   * Button entries. Each entry can be a plain label string or an object
   * with `label` + optional `startIcon` / `endIcon`. The object form lets
   * a grouped button carry icons exactly like a standalone Button.
   *
   * Maximum 6 entries (matches Figma's button-3 through button-8
   * visibility limit). Ignored when `children` is provided.
   */
  buttons?: ButtonGroupButton[];

  /**
   * Composition mode — when provided, the group renders these nodes
   * directly instead of mapping `buttons`. Use for cases the `buttons`
   * array can't express (e.g. mixing Button and ButtonIcon).
   *
   * Each child should be a Button or ButtonIcon. The group strips child
   * borders and inserts 1px dividers between siblings.
   */
  children?: React.ReactNode;

  /**
   * Click handlers for each entry (parallel to `buttons`).
   */
  onButtonClick?: ((index: number) => void)[];

  /**
   * Disable specific buttons (parallel to `buttons`).
   */
  disabledButtons?: boolean[];

  /**
   * Index of the currently active/selected button. The active button gets
   * `action.selected` background + medium font weight to differentiate
   * it from inactive (regular weight) siblings.
   */
  activeIndex?: number;

  /**
   * Custom class name.
   */
  className?: string;

  /**
   * Full width (horizontal only).
   */
  fullWidth?: boolean;

  /**
   * Disable elevation for contained variant.
   */
  disableElevation?: boolean;
}

export type ButtonGroupProps = BaseButtonGroupProps & ButtonGroupSurface;

export const defaultButtonGroupProps: BaseButtonGroupProps & { variant: 'contained'; color: 'secondary' } = {
  variant: 'contained',
  color: 'secondary',
  size: 'small',
  orientation: 'horizontal',
  buttons: ['Button 1', 'Button 2', 'Button 3'],
  fullWidth: false,
  disableElevation: true,
};
