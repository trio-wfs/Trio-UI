/**
 * Badge Component Types
 *
 * SOURCE OF TRUTH: Figma component "Badge" (node: 2028:6368)
 * File: PjAYuPDr8IA1ccwiAjFkSD
 *
 * Types mapped directly from Figma componentPropertyDefinitions.
 * DO NOT add properties not in Figma.
 * DO NOT modify variant options unless Figma is updated.
 */

import type { ReactNode } from 'react';

/**
 * Badge Color
 * Figma property: "color"
 * Options: primary, secondary, error, success, warning, info
 *
 * (Fixed 2026-05-21: Figma previously had a typo'd `color6` variant that was
 * supposed to be `info, type=default`. Renamed in Figma; mapping no longer needed.)
 */
export type BadgeColor =
  | 'primary'
  | 'secondary'
  | 'error'
  | 'success'
  | 'warning'
  | 'info';

/**
 * Badge Type
 * Figma property: "type"
 * Options: default (shows count), dot (small indicator only)
 */
export type BadgeType = 'default' | 'dot';

export interface BadgeProps {
  // VARIANT properties (from Figma)
  color?: BadgeColor;
  type?: BadgeType;

  // Badge content (count or label — default type only)
  badgeContent?: ReactNode;

  // The element the badge is anchored to
  children?: ReactNode;

  // Standard React props
  className?: string;
  'aria-label'?: string;
}

export const defaultBadgeProps: Partial<BadgeProps> = {
  color: 'primary',
  type: 'default',
  badgeContent: 1,
};
