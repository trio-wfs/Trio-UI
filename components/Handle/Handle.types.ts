/**
 * Handle Component Types
 * SOURCE OF TRUTH: Figma node 5460:2553 (file: PjAYuPDr8IA1ccwiAjFkSD)
 * DO NOT add properties not in Figma. DO NOT modify state options unless Figma changes.
 */

import React from 'react';

/** For showcase/Storybook use only — real hover/drag states are CSS-driven. */
export type HandleState = 'default' | 'hover' | 'drag';

export interface HandleProps {
  /**
   * Forced visual state — for showcase and Storybook only.
   * In production, state is driven by CSS :hover and :active pseudo-selectors.
   */
  state?: HandleState;
  disabled?: boolean;
  className?: string;
  onDragStart?: React.DragEventHandler<HTMLDivElement>;
  onDragEnd?: React.DragEventHandler<HTMLDivElement>;
}

export const defaultHandleProps: Partial<HandleProps> = {
  state: 'default',
  disabled: false,
};
