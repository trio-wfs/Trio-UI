/**
 * Breadcrumb Component Types
 * SOURCE OF TRUTH: Figma node 494:3560 (file: PjAYuPDr8IA1ccwiAjFkSD)
 * DO NOT add properties not in Figma. DO NOT modify variant options unless Figma changes.
 */

import React from 'react';

/** 'breadcrumb' uses / divider; 'Links' uses | divider */
export type BreadcrumbState = 'breadcrumb' | 'Links';

export interface BreadcrumbLink {
  label: string;
  href?: string;
  /** Marks this as the current/active item — renders with blue bottom underline */
  selected?: boolean;
}

export interface BreadcrumbProps {
  /** Controls divider style: breadcrumb = /, Links = | */
  state?: BreadcrumbState;
  /** Ordered list of path items. Mark the last/current item selected. */
  links: BreadcrumbLink[];
  /** Shows a record count indicator on the right side */
  showNumberIndicator?: boolean;
  /** The count to display. Accepts number or string (e.g. "1,234"). Defaults to "###". */
  recordCount?: number | string;
  /** Right-side slot — typically a ToggleButton */
  actions?: React.ReactNode;
}

export const defaultBreadcrumbProps: Partial<BreadcrumbProps> = {
  state: 'breadcrumb',
  showNumberIndicator: true,
};
