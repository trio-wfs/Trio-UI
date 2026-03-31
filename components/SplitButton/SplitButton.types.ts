/**
 * SplitButton Component Types
 *
 * SOURCE OF TRUTH: Figma node 5428:4183 (file: PjAYuPDr8IA1ccwiAjFkSD)
 * DO NOT add properties not in Figma. DO NOT modify variant options unless Figma changes.
 *
 * Structure: two joined segments — a label button (left) and a dropdown arrow (right).
 * The arrow opens a Menu. Only `sm` size and `contained` variant exist in Figma.
 */

import { ReactNode } from 'react';
import { MenuItem } from '../Menu/Menu.types';

export type SplitButtonColor = 'primary' | 'secondary';

export interface SplitButtonProps {
  /** Main button label */
  label: string;

  /** Color variant */
  color?: SplitButtonColor;

  /** Whether the dropdown menu is open */
  open?: boolean;

  /** Called when the main label button is clicked */
  onClick?: () => void;

  /** Called when the dropdown arrow is clicked */
  onMenuToggle?: (open: boolean) => void;

  /** Menu items shown in the dropdown */
  menuItems?: MenuItem[];

  /** Anchor element for the dropdown — pass the arrow button ref */
  anchorEl?: HTMLElement | null;

  /** Optional icon to show left of the label */
  startIcon?: ReactNode;

  /** Disabled state */
  disabled?: boolean;
}

export const defaultSplitButtonProps: Partial<SplitButtonProps> = {
  color: 'primary',
  open: false,
  disabled: false,
};
