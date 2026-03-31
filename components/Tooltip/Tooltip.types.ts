/**
 * Tooltip Component Types
 * SOURCE OF TRUTH: Figma node 490:88  (file: PjAYuPDr8IA1ccwiAjFkSD)
 * DO NOT add properties not in Figma. DO NOT modify variant options unless Figma changes.
 */

import React from 'react';

/** Arrow direction / placement of the tooltip relative to its trigger */
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
