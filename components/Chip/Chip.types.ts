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
 * Options: md (default), sm
 *
 * Extracted dimensions:
 *   md: height 32px
 *   sm: height 24px
 */
export type ChipSize = 'md' | 'sm';

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

  // Boolean Properties (from Figma)
  iconLeft?: boolean;   // check icon — left side
  iconRight?: boolean;  // cancel/X icon — right side, triggers onDelete

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
  size: 'md',
  color: 'default',
  variant: 'contained',
  disabled: false,
  iconLeft: true,
  iconRight: true,
  label: 'Label',
};
