import type React from 'react';
import type { SxProps, Theme } from '@mui/material';

/**
 * Paper Component Types
 *
 * SOURCE OF TRUTH: Figma component "Paper" (node: 7824:2)
 * Live Figma data via MCP — fileKey: PjAYuPDr8IA1ccwiAjFkSD
 * Extracted: 2026-05-20
 *
 * Types mapped directly from Figma componentPropertyDefinitions.
 * DO NOT add properties that don't exist in Figma.
 */

/**
 * Paper Level
 * Figma property: "level"
 *
 * Layered surface hierarchy (outermost → innermost):
 * - default:   #F5F5F5 — page canvas
 * - secondary: #FAFAFA — content wrapper below header
 * - subtle:    rgba(0,0,0,0.1) — transparent in-between tier; sits 1 step "down" from its parent for nested containers. Use sparingly — introduce slowly where nested-container delineation is genuinely needed.
 * - paper:     #FFFFFF — cards, panels, containers (most common)
 * - accent:    #E4F7FD — highlighted/accent surfaces (e.g. pinned content)
 */
export type PaperLevel =
  | 'default'
  | 'secondary'
  | 'subtle'
  | 'paper'
  | 'accent';

/**
 * Padding scale (React-only, not a Figma variant).
 * Maps to tokens.spacing values.
 * - none: 0
 * - sm:   8px
 * - md:  16px
 * - lg:  24px
 */
export type PaperPadding = 'none' | 'sm' | 'md' | 'lg';

/**
 * Paper Props
 */
export interface PaperProps {
  /** Surface level — picks the background color from the design system layered hierarchy */
  level?: PaperLevel;

  /** Padding inside the Paper (React-only; not exposed as a Figma variant) */
  padding?: PaperPadding;

  /** When true (default), renders a 1px border at the component border color */
  bordered?: boolean;

  /** Slot for content */
  children?: React.ReactNode;

  // Standard React Props
  className?: string;
  sx?: SxProps<Theme>;
  role?: string;
  'aria-label'?: string;
}

/**
 * Default Props
 * Match Figma defaults
 */
export const defaultPaperProps: Partial<PaperProps> = {
  level: 'paper',
  padding: 'md',
  bordered: true,
};
