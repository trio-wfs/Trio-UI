/**
 * ToggleButton Component Types
 * SOURCE OF TRUTH: Figma node 6950:485 (file: PjAYuPDr8IA1ccwiAjFkSD)
 * DO NOT add properties not in Figma. DO NOT modify variant options unless Figma changes.
 */

import React from 'react';

export type ToggleButtonSize = 'sm' | 'md';

export interface ToggleButtonItem {
  /** MUI icon element, e.g. <FilterAltOffIcon /> */
  icon: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  'aria-label'?: string;
  /** Visually marks this slot as the active/selected option */
  active?: boolean;
}

export interface ToggleButtonProps {
  /** sm = 24px slots, md = 36px slots */
  size?: ToggleButtonSize;
  /** 3–8 button definitions. Figma supports button-3 through button-8. */
  buttons: ToggleButtonItem[];
}

export const defaultToggleButtonProps: Partial<ToggleButtonProps> = {
  size: 'sm',
};
