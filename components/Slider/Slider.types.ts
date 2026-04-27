/**
 * Slider Component Types
 *
 * SOURCE OF TRUTH: Figma component "Slider" (node: 2060:6895)
 *
 * These types are DIRECTLY MAPPED from Figma componentPropertyDefinitions.
 * DO NOT add properties that don't exist in Figma.
 * DO NOT modify variant options unless Figma is updated.
 */

/**
 * Controls when the value label is shown
 */
export type SliderValueLabelDisplay = 'auto' | 'on' | 'off';

/**
 * Track height / thumb size variant
 */
export type SliderSize = 'small' | 'medium';

export interface SliderProps {
  // ========================================
  // VARIANT Properties (from Figma)
  // ========================================

  /**
   * Size variant — affects track height and thumb dimensions
   * @default 'medium'
   */
  size?: SliderSize;

  /**
   * Disabled state
   * @default false
   */
  disabled?: boolean;

  // ========================================
  // React / Controlled Props
  // ========================================

  /**
   * Current value (controlled). Pass number[] for range slider.
   */
  value?: number | number[];

  /**
   * Change handler
   */
  onChange?: (event: Event, value: number | number[]) => void;

  /**
   * Minimum value
   * @default 0
   */
  min?: number;

  /**
   * Maximum value
   * @default 100
   */
  max?: number;

  /**
   * Step increment
   * @default 1
   */
  step?: number;

  /**
   * Marks along the track. Pass true for automatic marks at each step,
   * or an array of { value, label? } for custom marks.
   * @default false
   */
  marks?: boolean | { value: number; label?: string }[];

  /**
   * When to display the value label bubble
   * @default 'off'
   */
  valueLabelDisplay?: SliderValueLabelDisplay;

  /**
   * Custom class name
   */
  className?: string;

  /**
   * HTML name attribute (forwarded to the underlying input)
   */
  name?: string;

  /**
   * HTML id attribute
   */
  id?: string;
}

export const defaultSliderProps: Partial<SliderProps> = {
  size: 'medium',
  disabled: false,
  min: 0,
  max: 100,
  step: 1,
  marks: false,
  valueLabelDisplay: 'off',
};
