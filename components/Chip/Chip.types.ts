import React from 'react';

/**
 * Chip Component Types
 *
 * SOURCE OF TRUTH: Figma component "Chip" (node: 1512:8352)
 * Live Figma data via MCP — fileKey: PjAYuPDr8IA1ccwiAjFkSD
 * Extracted: 2026-02-17
 *
 * Types mapped directly from Figma componentPropertyDefinitions.
 * DO NOT add properties that don't exist in Figma.
 * DO NOT modify variant options unless Figma is updated.
 */

/**
 * Chip Size
 * Figma property: "size"
 * Options: medium (default), small
 *
 * Extracted dimensions:
 *   md: height 32px
 *   sm: height 24px
 */
export type ChipSize = 'small' | 'medium';

/**
 * Chip Color
 * Figma property: "color"
 * Options: default, primary, error, info, warning, success
 *
 * AHTG Semantics:
 * - default: neutral gray chip (most common)
 * - primary: blue, use for selected/active states
 * - error/warning/success/info: semantic feedback (use sparingly)
 */
export type ChipColor =
  | 'default'
  | 'primary'
  | 'error'
  | 'info'
  | 'warning'
  | 'success';

/**
 * Chip Variant
 * Figma property: "variant"
 * Options: contained (default), outline
 *
 * - contained: solid background fill
 * - outline: transparent bg with border
 */
export type ChipVariant = 'contained' | 'outline';

/**
 * Chip Props
 *
 * Mapped from Figma componentPropertyDefinitions:
 * - VARIANT types → union types
 * - BOOLEAN types → boolean
 * - TEXT types → string
 */
export interface ChipProps {
  // Variant Properties (from Figma)
  size?: ChipSize;
  color?: ChipColor;
  variant?: ChipVariant;
  disabled?: boolean;

  // Icon Properties
  /**
   * Left icon. Three modes:
   *  - omit → no left icon
   *  - `true` → default check icon (the common chip-as-filter "selected" pattern)
   *  - any icon element → custom icon
   */
  iconLeft?: React.ReactNode;
  /**
   * Right icon. Three modes:
   *  - omit → no right icon
   *  - `true` → default close X (the common chip-as-tag / chip-as-filter pattern)
   *  - any icon element → custom icon
   * When `onDelete` is also provided without `iconRight`, the close X is shown automatically.
   */
  iconRight?: React.ReactNode;

  // Text Properties (from Figma)
  label?: string;

  // Event Handlers
  onClick?: () => void;
  onDelete?: () => void;

  // Standard React Props
  className?: string;
  'aria-label'?: string;
}

/**
 * Default Props
 * Match Figma defaults
 */
export const defaultChipProps: Partial<ChipProps> = {
  size: 'medium',
  color: 'default',
  variant: 'contained',
  disabled: false,
  iconLeft: undefined,
  iconRight: undefined,
  label: 'Label',
};
