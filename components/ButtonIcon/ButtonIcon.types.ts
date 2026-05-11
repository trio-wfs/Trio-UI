/**
 * ButtonIcon Component Types
 * SOURCE OF TRUTH: Figma node 4819:14042 (file: PjAYuPDr8IA1ccwiAjFkSD)
 * DO NOT add properties not in Figma. DO NOT modify variant options unless Figma changes.
 */

import React from 'react';

export type ButtonIconVariant = 'contained' | 'ghost';
export type ButtonIconColor = 'primary' | 'secondary' | 'default';
export type ButtonIconSize = 'small' | 'medium';

export interface ButtonIconProps {
  /** Visual style — contained fills with color, ghost is transparent */
  variant?: ButtonIconVariant;
  /** Color palette */
  color?: ButtonIconColor;
  /** small = 24px, medium = 36px */
  size?: ButtonIconSize;
  /** MUI icon element, e.g. <FilterAltOffIcon /> */
  icon: React.ReactNode;
  /** Show badge overlay (red dot or count) */
  badge?: boolean;
  /** Badge number; omit for a dot-only badge */
  badgeCount?: number;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  'aria-label'?: string;
}

export const defaultButtonIconProps: Partial<ButtonIconProps> = {
  variant: 'contained',
  color: 'primary',
  size: 'medium',
  badge: false,
};
