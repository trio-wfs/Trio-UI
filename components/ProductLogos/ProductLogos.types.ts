/**
 * ProductLogos Component Types
 *
 * SOURCE OF TRUTH: Figma component "ProductLogos" (node: 3868:51906)
 * File: PjAYuPDr8IA1ccwiAjFkSD
 *
 * These types are DIRECTLY MAPPED from Figma componentPropertyDefinitions.
 * DO NOT add properties that don't exist in Figma.
 * DO NOT modify variant options unless Figma is updated.
 */

/**
 * LogoType
 * Figma property: "logoType"
 *
 * - white:    Full logo with white lettering — for use on dark/colored backgrounds
 * - dark:     Full logo with dark lettering — for use on light/white backgrounds
 * - logoOnly: Hexagon icon only, no wordmark
 */
export type LogoType = 'white' | 'dark' | 'logoOnly';

export interface ProductLogosProps {
  /** Which logo asset to render. Default: 'dark' */
  logoType?: LogoType;

  /**
   * Width in pixels.
   * Defaults: 183 for 'white' and 'dark' (full logos), 57 for 'logoOnly'.
   * Height scales proportionally unless explicitly set.
   */
  width?: number;

  /**
   * Height in pixels.
   * When omitted the component derives height from the asset's natural aspect ratio.
   */
  height?: number;

  /** Additional class name forwarded to the wrapping Box */
  className?: string;

  /** Alt text for the image. Default: 'TRIO' */
  alt?: string;
}

export const defaultProductLogosProps: Partial<ProductLogosProps> = {
  logoType: 'dark',
  alt: 'TRIO',
};

/** Natural dimensions of each logo asset (width × height in px) */
export const LOGO_DIMENSIONS: Record<LogoType, { width: number; height: number }> = {
  white: { width: 183, height: 59 },
  dark: { width: 183, height: 59 },
  logoOnly: { width: 57, height: 59 },
};
