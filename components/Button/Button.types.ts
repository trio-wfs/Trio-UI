/**
 * Button Component Types
 *
 * SOURCE OF TRUTH: Figma component "button" (node: 978:5063)
 */

import React, { ReactNode } from 'react';
import type { SxProps, Theme } from '@mui/material/styles';

/**
 * Button Size
 * Figma property: "size"
 */
export type ButtonSize = 'medium' | 'small';

/**
 * Button Color
 * Figma property: "color"
 *
 * TRIO Semantics:
 * - primary: Save/Update actions (blue)
 * - secondary: Edit actions (gray)
 * - success/warning/error/info: Urgency indicators (use sparingly)
 */
export type ButtonColor =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info';

/**
 * Button Variant
 * Figma property: "variant"
 */
export type ButtonVariant = 'contained' | 'outlined' | 'text';

export interface ButtonProps {
  // Style
  variant?: ButtonVariant;
  color?: ButtonColor;
  size?: ButtonSize;

  // State — controlled by engineer
  disabled?: boolean;
  loading?: boolean;

  // Icons — pass any MUI icon element
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;

  // Content
  label?: string;
  children?: ReactNode;

  // Events
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';

  // Standard
  sx?: SxProps<Theme>;
  className?: string;
  'aria-label'?: string;
  'aria-describedby'?: string;
}

export const defaultButtonProps: Partial<ButtonProps> = {
  variant: 'contained',
  color: 'primary',
  size: 'medium',
  disabled: false,
  loading: false,
  type: 'button',
};
