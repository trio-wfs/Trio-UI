/**
 * SearchBar Component Types
 * SOURCE OF TRUTH: Figma node 492:653  (file: PjAYuPDr8IA1ccwiAjFkSD)
 * DO NOT add properties not in Figma. DO NOT modify variant options unless Figma changes.
 */

/** Height/padding size */
export type SearchBarSize = 'Small' | 'Medium' | 'Large';

/**
 * Which side(s) have a support button with a search icon
 * Left  = search button on the left
 * Right = search button on the right
 * Both  = search buttons on both sides
 */
export type SearchBarType = 'Left' | 'Right' | 'Both';

export interface SearchBarProps {
  size?: SearchBarSize;
  type?: SearchBarType;
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  onSearch?: () => void;
  disabled?: boolean;
}

export const defaultSearchBarProps: Partial<SearchBarProps> = {
  size: 'Medium',
  type: 'Left',
  placeholder: 'Search...',
};
