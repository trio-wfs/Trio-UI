/**
 * Autocomplete Component Types
 *
 * SOURCE OF TRUTH: Figma component "Autocomplete" (node: 2381:6441)
 *
 * These types are DIRECTLY MAPPED from Figma componentPropertyDefinitions.
 * DO NOT add properties that don't exist in Figma.
 * DO NOT modify variant options unless Figma is updated.
 */

/**
 * Autocomplete State
 * Figma property: "state"
 * Options: default, focus, error
 */
export type AutocompleteState = 'default' | 'focus' | 'error';

/**
 * Autocomplete Menu
 * Figma property: "menu"
 * Options: open, closed
 */
export type AutocompleteMenu = 'open' | 'closed';

/**
 * Autocomplete Type
 * Figma property: "type"
 * Options: single, multi
 */
export type AutocompleteType = 'single' | 'multi';

/**
 * Autocomplete Size
 * medium = 36px height (default)
 * small = 28px height, 12px font — matches Select small
 */
export type AutocompleteSize = 'medium' | 'small';

/**
 * Autocomplete Selected
 * Figma property: "selected"
 * Options: true, false → boolean
 */

/**
 * Autocomplete Disabled
 * Figma property: "disabled"
 * Options: yes, no → boolean
 */

export interface AutocompleteOption {
  value: string;
  label: string;
}

export interface AutocompleteProps {
  // Variant properties (from Figma)
  type?: AutocompleteType;
  state?: AutocompleteState;

  /**
   * Size variant — matches TextField/Select sizing
   * @default 'medium'
   */
  size?: AutocompleteSize;

  // Options
  options?: AutocompleteOption[];
  value?: AutocompleteOption | AutocompleteOption[] | null;
  onChange?: (value: AutocompleteOption | AutocompleteOption[] | null) => void;

  // Text properties
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorText?: string;

  // Boolean properties (from Figma)
  disabled?: boolean;
  required?: boolean;

  // Multi-select: max chips shown before "+N more" truncation (default: 5)
  limitTags?: number;

  // Standard React props
  /**
   * HTML id attribute
   */
  id?: string;

  /**
   * HTML name attribute
   */
  name?: string;

  className?: string;
  'aria-label'?: string;
}

export const defaultAutocompleteProps: Partial<AutocompleteProps> = {
  type: 'single',
  state: 'default',
  size: 'medium',
  disabled: false,
  required: false,
  placeholder: 'Search...',
  options: [],
};
