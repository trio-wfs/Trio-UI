/**
 * Button Component Types
 *
 * SOURCE OF TRUTH: Figma component "button" (node: 978:5063)
 * Cache: ~/.openclaw/shared-data/figma-specs/button.json
 *
 * These types are DIRECTLY MAPPED from Figma componentPropertyDefinitions.
 * DO NOT add properties that don't exist in Figma.
 * DO NOT modify variant options unless Figma is updated.
 */

import React, { ReactNode } from 'react';

/**
 * Button Size
 * Figma property: "size"
 * Options: md (default), sm
 */
export type ButtonSize = 'md' | 'sm';

/**
 * Button Color
 * Figma property: "color"
 * Options: success, primary (default), info, warning, error, secondary
 *
 * AHTG Semantics:
 * - primary: Save/Update actions (blue)
 * - secondary: Edit actions (gray)
 * - success/warning/error/info: Urgency indicators (use sparingly)
 */
export type ButtonColor =
  | 'success'
  | 'primary'
  | 'info'
  | 'warning'
  | 'error'
  | 'secondary';

/**
 * Button State
 * Figma property: "state"
 * Options: active, disabled, hover, default, loading
 *
 * Note: Most states are handled internally via CSS pseudo-classes
 * Exposed here for explicit state control
 */
export type ButtonState =
  | 'active'
  | 'disabled'
  | 'hover'
  | 'default'
  | 'loading';

/**
 * Button Variant
 * Figma property: "variant"
 * Options: contained (default), outlined, text
 */
export type ButtonVariant = 'contained' | 'outlined' | 'text';

/**
 * Button Props
 *
 * Mapped from Figma componentPropertyDefinitions:
 * - VARIANT types → union types
 * - BOOLEAN types → boolean
 * - TEXT types → string
 */
export interface ButtonProps {
  // Variant Properties (from Figma)
  size?: ButtonSize;
  color?: ButtonColor;
  state?: ButtonState;
  variant?: ButtonVariant;

  // Icon Properties — pass any MUI icon element, or omit for no icon
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;

  // Text Properties (from Figma)
  label?: string;

  // Standard React Props
  children?: ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;

  // Accessibility
  'aria-label'?: string;
  'aria-describedby'?: string;
}

/**
 * Default Props
 * Match Figma defaults
 */
export const defaultButtonProps: Partial<ButtonProps> = {
  size: 'md',
  color: 'primary',
  state: 'default',
  variant: 'contained',
  startIcon: undefined,
  endIcon: undefined,
  label: 'Button',
  type: 'button',
};
