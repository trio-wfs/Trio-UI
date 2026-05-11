/**
 * PageHeaderToolbar Component Types
 * SOURCE OF TRUTH: Figma node 3859:2813 (file: PjAYuPDr8IA1ccwiAjFkSD)
 * DO NOT add properties not in Figma. DO NOT modify variant options unless Figma changes.
 */

import React, { type RefObject } from 'react';

/** default = title + buttons only; full = title + chips + eyebrow + breadcrumb; NewCanvas = full without outer border */
export type PageHeaderToolbarVariant = 'default' | 'full' | 'NewCanvas';

export interface PageHeaderToolbarProps {
  variant?: PageHeaderToolbarVariant;

  // ── Title area ──────────────────────────────────────────────
  pageTitleText: string;
  /** Small icons rendered inline next to the title — shown when provided */
  titleIcons?: React.ReactNode;

  // ── Eyebrow (support text below title) — shown when provided ─
  eyebrowText?: string;

  // ── Chip tags (full variant only) — shown when provided ──────
  chipItems?: React.ReactNode;

  // ── Status indicator (left color bar) — shown when provided ──
  indicatorLabel?: string;

  // ── Right-side actions — each shown when provided ────────────
  singleButtonContent?: React.ReactNode;
  buttonGroupContent?: React.ReactNode;
  inputTextFieldContent?: React.ReactNode;

  // ── Breadcrumb strip (full / NewCanvas only) — shown when provided ─
  breadcrumbContent?: React.ReactNode;

  // ── Scroll container (NewCanvas only) — ref to the scrollable parent ─
  /** Ref to the scrollable container for the NewCanvas scroll divider. Defaults to window. */
  scrollContainerRef?: RefObject<HTMLElement | null>;
}

export const defaultPageHeaderToolbarProps: Partial<PageHeaderToolbarProps> = {
  variant: 'full',
};
