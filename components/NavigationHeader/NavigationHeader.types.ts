/**
 * NavigationHeader Component Types
 * SOURCE OF TRUTH: Figma node 3868:49596 (file: PjAYuPDr8IA1ccwiAjFkSD)
 * DO NOT add properties not in Figma. DO NOT modify variant options unless Figma changes.
 *
 * Two-row horizontal header: brand bar (top) + nav bar (bottom).
 * Brand bar: TRIO logo, environment badge, search bar, user avatar + name.
 * Nav bar: horizontal nav items with optional dropdown arrows + active indicator.
 */

import type { MouseEvent } from 'react';
import type { MenuItem } from '../Menu/Menu.types';

export interface NavigationHeaderNavItem {
  /** Unique identifier */
  id: string;
  /** Display label — rendered uppercase */
  label: string;
  /** Whether this item has a dropdown menu — inferred from menuItems when present */
  hasDropdown?: boolean;
  /** Dropdown menu items — when provided, hasDropdown is implicitly true */
  menuItems?: MenuItem[];
  /** Click handler — fires for items without menuItems, or in addition to opening the menu */
  onClick?: () => void;
}

export interface NavigationHeaderUser {
  /** User's full display name */
  name: string;
  /** Two-letter initials for avatar */
  initials: string;
  /** Avatar background color (MUI palette color) */
  avatarColor?: string;
}

export interface NavigationHeaderProps {
  /** Navigation items displayed in the bottom bar */
  navItems: NavigationHeaderNavItem[];
  /** ID of the currently active nav item */
  activeItemId?: string;
  /** User info for the right side of the brand bar */
  user: NavigationHeaderUser;
  /** Environment badge text (e.g. "TRIO WIP", "TRIO PROD") — hidden when empty */
  badgeText?: string;
  /** Search bar placeholder text */
  searchPlaceholder?: string;
  /** Logo image source — defaults to TRIO logo */
  logoSrc?: string;
  /** Menu items for the user dropdown */
  userMenuItems?: MenuItem[];
  /** Callback when search is submitted */
  onSearch?: (value: string) => void;
  /** Callback when user dropdown is clicked (still fires even when userMenuItems is provided) */
  onUserMenuClick?: (event: MouseEvent<HTMLElement>) => void;
  /** Callback when a nav item is clicked */
  onNavItemClick?: (itemId: string) => void;
  /** Callback when a dropdown menu item is clicked — receives the nav item ID and menu item ID */
  onMenuItemClick?: (navItemId: string, menuItemId: string) => void;
  /** Callback when a user menu item is clicked */
  onUserMenuItemClick?: (menuItemId: string) => void;
}

export const defaultNavigationHeaderProps: Partial<NavigationHeaderProps> = {
  badgeText: '',
  searchPlaceholder: 'Search Trio',
  navItems: [],
};
