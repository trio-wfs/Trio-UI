/**
 * Menu Component Types
 *
 * SOURCE OF TRUTH: Figma component "menu" (node: 4505:3795)
 * Cache: ~/.openclaw/shared-data/figma-specs/menu.json
 *
 * These types are DIRECTLY MAPPED from Figma componentPropertyDefinitions.
 * DO NOT add properties that don't exist in Figma.
 * DO NOT modify variant options unless Figma is updated.
 */

import { ReactNode } from 'react';

/**
 * Menu variant types from Figma
 */
export type MenuState = 'single' | 'multi' | 'grouped';
export type MenuItemState = 'default' | 'disabled' | 'selected' | 'title';

/**
 * Menu item configuration
 */
export interface MenuItem {
  /**
   * Unique identifier for the menu item
   */
  id: string;

  /**
   * Label text
   */
  label: string;

  /**
   * Item state
   * @default 'default'
   */
  state?: MenuItemState;

  /**
   * Icon or content on the left
   */
  leftContent?: ReactNode;

  /**
   * Icon or content on the right
   */
  rightContent?: ReactNode;

  /**
   * Show divider below this item
   * @default false
   */
  divider?: boolean;

  /**
   * Click handler
   */
  onClick?: () => void;

  /**
   * Disabled state (convenience prop)
   */
  disabled?: boolean;

  /**
   * Selected state (convenience prop)
   */
  selected?: boolean;
}

export interface MenuProps {
  // ========================================
  // VARIANT Properties (from Figma)
  // ========================================

  /**
   * Menu state variant
   * @default 'single'
   */
  state?: MenuState;

  /**
   * Show scroll indicator
   * @default false
   */
  scroll?: boolean;

  // ========================================
  // React Props (not from Figma)
  // ========================================

  /**
   * Menu items to display
   */
  items: MenuItem[];

  /**
   * Custom class name
   */
  className?: string;

  /**
   * Menu width (min 254px from Figma)
   */
  width?: number | string;

  /**
   * Maximum height before scrolling
   */
  maxHeight?: number | string;

  /**
   * ARIA label for accessibility
   */
  'aria-label'?: string;
}

export const defaultMenuProps: Partial<MenuProps> = {
  state: 'single',
  scroll: false,
  items: [],
};
