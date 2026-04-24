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
  /** MUI icon element — 20px, outlined variant only */
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

/** Figma variant: state */
export type NavigationState = 'open' | 'closed';

export interface NavigationVerticalProps {
  /** Primary nav items */
  items: NavItem[];
  /** Figma variant: state — open (full width) or closed (icon rail) */
  state?: NavigationState;
  /** Currently active item id */
  activeId?: string;
  /** Currently active sub-item id */
  activeSubId?: string;
  /** Called when a nav item or sub-item is clicked */
  onNavigate?: (itemId: string, subItemId?: string) => void;
  /** Figma variant: settings — show settings section */
  settings?: boolean;
  /** Settings section items */
  settingsItems?: NavSettingsItem[];
  /** Active settings item id */
  activeSettingsId?: string;
  /** Figma variant: subSection — show the secondary slide-out panel */
  subSection?: boolean;
  /** Called when the collapse/expand toggle is clicked */
  onToggleState?: () => void;
  /** Title shown to the left of the hamburger toggle (open state only, subtitle2) */
  title?: string;
  /** Subtitle shown below the title (open state only, body2 secondary) */
  subtitle?: string;
  /** Show dropdown chevron next to the title */
  titleDropdown?: boolean;
  /** Called when the title area is clicked (e.g. program selector) */
  onTitleClick?: () => void;
}

export const defaultNavigationVerticalProps: Partial<NavigationVerticalProps> = {
  state: 'open',
  settings: false,
  subSection: false,
  items: [],
  settingsItems: [],
};
