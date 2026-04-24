/**
 * SearchBar Component Types
 * SOURCE OF TRUTH: Figma node 492:653 (file: PjAYuPDr8IA1ccwiAjFkSD)
 *
 * Primary search input with an accompanied CTA segment.
 * The support button displays text + icon and doubles as
 * a search, download, filter, or prompt trigger.
 */

import React from 'react';

/** Small = 30px, Medium = 38px (matches TextField sizes) */
export type SearchBarSize = 'Small' | 'Medium';

/**
 * Which side has the support button
 * Left  = support button on the left of the input
 * Right = support button on the right of the input
 */
export type SearchBarType = 'Left' | 'Right';

export interface SearchBarProps {
  /** Size preset — Small: 30px, Medium: 38px */
  size?: SearchBarSize;

  /** Support button placement */
  type?: SearchBarType;

  /** Input value (controlled) */
  value?: string;

  /** Placeholder text for the input */
  placeholder?: string;

  /** Called when the input value changes */
  onChange?: (value: string) => void;

  /** Called when the support button is clicked or Enter is pressed */
  onSearch?: () => void;

  /** Disabled state */
  disabled?: boolean;

  /** Text label inside the support button (e.g. "Search", "Download", "Go"). Off by default — icon only. */
  supportCopy?: string;

  /** Show icon inside the support button @default true */
  showIcon?: boolean;

  /** Custom icon — defaults to SearchIcon */
  icon?: React.ReactNode;
}

export const defaultSearchBarProps: Partial<SearchBarProps> = {
  size: 'Medium',
  type: 'Left',
  placeholder: 'Placeholder',
  showIcon: true,
};
