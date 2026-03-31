/**
 * NavigationVertical Component Types
 * SOURCE OF TRUTH: Figma node 4795:1339  (file: PjAYuPDr8IA1ccwiAjFkSD)
 * DO NOT add properties not in Figma. DO NOT modify variant options unless Figma changes.
 */

import React from 'react';

/** A sub-item shown when a nav item is expanded */
export interface NavSubItem {
  id: string;
  label: string;
}

/** A primary navigation item */
export interface NavItem {
  id: string;
  label: string;
  /** MUI icon element — 20px, rendered on the left */
  icon?: React.ReactNode;
  /** Whether this item supports expanding to show sub-items */
  expandable?: boolean;
  subItems?: NavSubItem[];
}

/** A settings-section item — no icon, left-border selected style */
export interface NavSettingsItem {
  id: string;
  label: string;
}

export interface NavigationVerticalProps {
  /** Primary nav items */
  items: NavItem[];
  /** Currently active item id */
  activeId?: string;
  /** Currently active sub-item id */
  activeSubId?: string;
  /** Called when a nav item or sub-item is clicked */
  onNavigate?: (itemId: string, subItemId?: string) => void;
  /** Show the settings section at the bottom */
  settings?: boolean;
  /** Settings section items */
  settingsItems?: NavSettingsItem[];
  /** Active settings item id */
  activeSettingsId?: string;
}

export const defaultNavigationVerticalProps: Partial<NavigationVerticalProps> = {
  settings: false,
  items: [],
  settingsItems: [],
};
