import type { SxProps, Theme } from '@mui/material';

/**
 * Avatar Component Types
 *
 * SOURCE OF TRUTH: Figma component "Avatar" (node: 7814:2)
 * Live Figma data via MCP — fileKey: PjAYuPDr8IA1ccwiAjFkSD
 * Extracted: 2026-05-20
 *
 * Types mapped directly from Figma componentPropertyDefinitions.
 * DO NOT add properties that don't exist in Figma.
 * DO NOT modify variant options unless Figma is updated.
 */

/**
 * Avatar Size
 * Figma property: "size"
 * Options: small (24px), medium (32px)
 */
export type AvatarSize = 'small' | 'medium';

/**
 * Avatar Color
 * Figma property: "color"
 *
 * TRIO Semantics:
 * - staff: slate (#607D8B) — TRIO Staff/RM identity, visual anchor across threads
 * - primary / info / success / warning / error: identifier colors for agency authors
 *   (typically name-hashed in code from the available palette)
 * - dataviz: dark teal (#37636B) — additional identifier color from the Charts palette
 * - anonymized: gray (#9E9E9E) — used for other agencies in cross-agency views
 *   (Q&A Board privacy mode — three anonymized agencies look identical by design)
 */
export type AvatarColor =
  | 'staff'
  | 'primary'
  | 'info'
  | 'success'
  | 'warning'
  | 'error'
  | 'dataviz'
  | 'anonymized';

/**
 * Avatar Props
 *
 * Mapped from Figma componentPropertyDefinitions:
 * - VARIANT types → union types
 * - TEXT types → string
 */
export interface AvatarProps {
  // Variant Properties (from Figma)
  size?: AvatarSize;
  color?: AvatarColor;

  // Text Properties (from Figma)
  /** 1–2 character initials rendered in the center of the avatar */
  initials?: string;

  // Standard React Props
  className?: string;
  sx?: SxProps<Theme>;
  'aria-label'?: string;
}

/**
 * Default Props
 * Match Figma defaults
 */
export const defaultAvatarProps: Partial<AvatarProps> = {
  size: 'medium',
  color: 'staff',
  initials: 'JS',
};
