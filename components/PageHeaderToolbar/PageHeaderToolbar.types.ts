/**
 * PageHeaderToolbar Component Types
 * SOURCE OF TRUTH: Figma node 3859:2813 (file: PjAYuPDr8IA1ccwiAjFkSD)
 * DO NOT add properties not in Figma. DO NOT modify variant options unless Figma changes.
 */

import React from 'react';

/** default = title + buttons only; full = title + chips + eyebrow + breadcrumb; NewCanvas = full without outer border */
export type PageHeaderToolbarVariant = 'default' | 'full' | 'NewCanvas';

export interface PageHeaderToolbarProps {
  variant?: PageHeaderToolbarVariant;

  // ── Title area ──────────────────────────────────────────────
  pageTitleText: string;
  /** Small icons rendered inline next to the title */
  showIcons?: boolean;
  titleIcons?: React.ReactNode;

  // ── Eyebrow (support text below title) ──────────────────────
  showEyebrow?: boolean;
  eyebrowText?: string;

  // ── Chip tags (full variant only) ───────────────────────────
  chips?: boolean;
  /** Rendered Chip elements — pass <Chip /> components directly */
  chipItems?: React.ReactNode;

  // ── Status indicator (left color bar) ───────────────────────
  indicator?: boolean;
  indicatorLabel?: string;

  // ── Right-side actions ───────────────────────────────────────
  singleButton?: boolean;
  /** Rendered Button element */
  singleButtonContent?: React.ReactNode;
  buttonGroup?: boolean;
  /** Rendered ButtonGroup element */
  buttonGroupContent?: React.ReactNode;
  inputTextField?: boolean;
  /** Rendered TextField element */
  inputTextFieldContent?: React.ReactNode;

  // ── Breadcrumb strip (full / NewCanvas only) ─────────────────
  breadcrumb?: boolean;
  /** Rendered Breadcrumb element */
  breadcrumbContent?: React.ReactNode;
}

export const defaultPageHeaderToolbarProps: Partial<PageHeaderToolbarProps> = {
  variant: 'full',
  showEyebrow: true,
  chips: true,
  indicator: false,
  singleButton: true,
  buttonGroup: true,
  breadcrumb: true,
};
