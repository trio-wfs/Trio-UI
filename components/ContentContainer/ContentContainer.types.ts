/**
 * ContentContainer Component Types
 *
 * The standard paper surface used throughout TRIO WFS.
 * White background, border, 4px radius — the building block
 * for all page content sections.
 */

import React from 'react';

export interface ContentContainerProps {
  /**
   * Optional section title — renders as Subtitle2 (14px, medium 500)
   */
  title?: string;

  /**
   * Optional actions rendered to the right of the title (icons, menus, etc.)
   */
  titleActions?: React.ReactNode;

  /**
   * Internal padding in px. Defaults to 16 (md).
   * Set to 0 for flush content like AG Grid that fills edge-to-edge.
   * @default 16
   */
  padding?: number;

  /**
   * Remove border radius — use when containers stack flush against each other
   * @default false
   */
  flush?: boolean;

  /**
   * Content
   */
  children: React.ReactNode;

  /**
   * Optional sx overrides
   */
  sx?: Record<string, unknown>;
}

export const defaultContentContainerProps: Partial<ContentContainerProps> = {
  padding: 16,
  flush: false,
};
