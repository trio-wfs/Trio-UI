/**
 * Tooltip Component Types
 * SOURCE OF TRUTH: Figma node 490:88  (file: PjAYuPDr8IA1ccwiAjFkSD)
 * DO NOT add properties not in Figma. DO NOT modify variant options unless Figma changes.
 */

import React from 'react';

/**
 * Arrow direction / placement of the tooltip relative to its trigger.
 *
 * `'none'` is a special value that **suppresses the tooltip entirely** — the
 * children are rendered without any MUI Tooltip wrapper. Useful when a
 * tooltip needs to be conditionally hidden without unmounting the trigger.
 * (API note: this conflates placement with visibility; future refactor
 * could split into separate `position` + `disabled` props. Kept for
 * backward compat with current Figma model.)
 */
export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right' | 'none';

export interface TooltipProps {
  /** Tooltip text content */
  title: string;
  /** Placement of the tooltip and arrow direction */
  position?: TooltipPosition;
  /** The element that triggers the tooltip */
  children: React.ReactElement;
}

export const defaultTooltipProps: Partial<TooltipProps> = {
  position: 'top',
};
