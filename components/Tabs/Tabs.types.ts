/**
 * Tabs Component Types
 * SOURCE OF TRUTH: Figma node 3868:51864  (file: PjAYuPDr8IA1ccwiAjFkSD)
 * DO NOT add properties not in Figma. DO NOT modify variant options unless Figma changes.
 */

import React from 'react';

/** Controls scroll behavior of the tab bar */
export type TabsVariant = 'Tab Group' | 'Right Scroll' | 'Left and Right Scroll' | 'Left Scroll';

/** A single tab item */
export interface TabItem {
  label: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  disabled?: boolean;
}

/** Surface the tab bar sits on — controls selected tab bg + bottom border blend */
export type TabsSurface = 'paper' | 'secondary';

export interface TabsProps {
  /** Tab items to render (maps to tab1–tab8 boolean slots in Figma) */
  tabs: TabItem[];
  /** Index of the currently active tab */
  activeIndex?: number;
  /** Called when a tab is clicked */
  onChange?: (index: number) => void;
  /** Scroll variant from Figma */
  variant?: TabsVariant;
  /** Surface color the tabs sit on. Selected tab matches this so the bottom border blends. */
  surface?: TabsSurface;
}

export const defaultTabsProps: Partial<TabsProps> = {
  activeIndex: 0,
  variant: 'Tab Group',
  surface: 'paper',
};
