/**
 * PageHeaderToolbar Component Types
 * SOURCE OF TRUTH: Figma node 3859:2813 (file: PjAYuPDr8IA1ccwiAjFkSD)
 * DO NOT add properties not in Figma. DO NOT modify variant options unless Figma changes.
 *
 * Naming convention (locked 2026-05-21):
 * - Content slots use short names matching Figma property names (no `Content` suffix).
 *   `buttonGroup`, `chips`, `singleButton`, `inputTextField`, `breadcrumb`, `titleIcons`.
 *   Type is `ReactNode` and the slot renders only when truthy.
 * - `indicator` accepts `string | true` — passing `true` shows the indicator with a
 *   default "Active" label; passing a string customizes the label.
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
  chips?: React.ReactNode;

  // ── Status indicator (left color bar) — `true` shows default "Active" label;
  //    a string customizes the label. Shown when truthy. ──
  indicator?: string | true;

  // ── Right-side actions — each shown when provided ────────────
  singleButton?: React.ReactNode;
  buttonGroup?: React.ReactNode;
  inputTextField?: React.ReactNode;

  // ── Breadcrumb strip (full / NewCanvas only) — shown when provided ─
  breadcrumb?: React.ReactNode;

  // ── Scroll container (NewCanvas only) — ref to the scrollable parent ─
  /** Ref to the scrollable container for the NewCanvas scroll divider. Defaults to window. */
  scrollContainerRef?: RefObject<HTMLElement | null>;
}

export const defaultPageHeaderToolbarProps: Partial<PageHeaderToolbarProps> = {
  variant: 'full',
};
