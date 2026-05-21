import type React from 'react';
import type { SxProps, Theme } from '@mui/material';
import type { PaperLevel, PaperPadding } from '../Paper/Paper.types';

/**
 * Card Component Types
 *
 * SOURCE OF TRUTH: Figma component "Card" (node: 7826:4)
 * Live Figma data via MCP — fileKey: PjAYuPDr8IA1ccwiAjFkSD
 * Extracted: 2026-05-20
 *
 * Card is a composed surface — wraps Paper internally and adds header /
 * body / footer slots with consistent spacing. No Figma variants —
 * "states" are content presence handled by React props.
 *
 * Use Card when a layout needs predictable section structure.
 * Use Paper directly when you want full layout control.
 */

export interface CardProps {
  /** Top slot — title, meta, actions. Renders only when provided. */
  header?: React.ReactNode;

  /** Body content (main slot). */
  children: React.ReactNode;

  /** Bottom slot — action row, links, meta. Renders only when provided. */
  footer?: React.ReactNode;

  /** Surface level — passed through to Paper (default 'paper'). */
  level?: PaperLevel;

  /** Padding applied around each section (default 'md' = 16px). */
  padding?: PaperPadding;

  /** When true (default), renders a 1px border around the card. */
  bordered?: boolean;

  /** When true, adds 1px divider lines between header/body and body/footer. */
  divided?: boolean;

  // Standard React Props
  className?: string;
  sx?: SxProps<Theme>;
  role?: string;
  'aria-label'?: string;
}

export const defaultCardProps: Partial<CardProps> = {
  level: 'paper',
  padding: 'md',
  bordered: true,
  divided: false,
};
