/**
 * PopOver Component Types
 *
 * SOURCE OF TRUTH: Figma component "PopOver" (node: 3868:50794)
 * Design System: AHTG Desktop SaaS
 *
 * These types are DIRECTLY MAPPED from Figma componentPropertyDefinitions.
 * DO NOT add properties that don't exist in Figma.
 * DO NOT modify variant options unless Figma is updated.
 */

import React from 'react';

export interface PopOverProps {
  // ========================================
  // POSITIONING (required for MUI Popover)
  // ========================================

  /**
   * The DOM element used to set the position of the popover.
   * Pass the element that triggered the open state.
   */
  anchorEl: HTMLElement | null;

  /**
   * Whether the popover is visible.
   */
  open: boolean;

  /**
   * Callback fired when the popover requests to be closed.
   */
  onClose: () => void;

  // ========================================
  // HEADER (optional)
  // ========================================

  /**
   * Header title text.
   * Renders the header section when provided.
   * Typography: 16px Roboto Medium #212121
   */
  title?: string;

  /**
   * Label for the optional action link in the header.
   * Requires onAction to be functional.
   * Typography: 12px Roboto Regular #2196F3
   */
  actionLabel?: string;

  /**
   * Callback fired when the header action link is clicked.
   */
  onAction?: () => void;

  // ========================================
  // CONTENT
  // ========================================

  /**
   * Content rendered inside the scrollable body area.
   * Accepts any React content — text, components, lists, etc.
   */
  children: React.ReactNode;

  // ========================================
  // LAYOUT OVERRIDES
  // ========================================

  /**
   * Popover width in pixels.
   * @default 450
   */
  width?: number;

  /**
   * Maximum height of the scrollable content area in pixels.
   * @default 425
   */
  maxHeight?: number;

  /**
   * Optional class name passed to the root Popover element.
   */
  className?: string;
}

export const defaultPopOverProps: Partial<PopOverProps> = {
  width: 450,
  maxHeight: 425,
};
