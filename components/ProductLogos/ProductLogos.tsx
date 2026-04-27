/**
 * ProductLogos Component
 *
 * SOURCE OF TRUTH: Figma component "ProductLogos" (node: 3868:51906)
 * Design System: TRIO WFS Desktop
 *
 * Renders a TRIO product logo as an <img> element inside a MUI Box.
 * Three variants are supported via the `logoType` prop:
 *   - 'dark'     → full logo, dark lettering (light backgrounds)
 *   - 'white'    → full logo, white lettering (dark/colored backgrounds)
 *   - 'logoOnly' → hexagon icon only, no wordmark
 *
 * Width defaults to the asset's natural width; height is derived from the
 * asset's natural aspect ratio unless both width and height are provided.
 */

import React from 'react';
import { Box } from '@mui/material';
import {
  ProductLogosProps,
  defaultProductLogosProps,
  LOGO_DIMENSIONS,
  LogoType,
} from './ProductLogos.types';

// SVG asset paths — resolved relative to the project root at runtime.
// Using string imports keeps the component free of bundler assumptions and
// allows the design-system site to reference the files directly via relative URLs.
const LOGO_SRCS: Record<LogoType, string> = {
  dark:     '../../assets/logos/trio-logo-dark.png',
  white:    '../../assets/logos/trio-logo-white.png',
  logoOnly: '../../assets/trio-icon.svg',
};

export const ProductLogos = React.forwardRef<HTMLDivElement, ProductLogosProps>(
  (
    {
      logoType = defaultProductLogosProps.logoType!,
      width,
      height,
      className,
      alt = defaultProductLogosProps.alt,
    },
    ref,
  ) => {
    const natural = LOGO_DIMENSIONS[logoType];

    // Resolve final rendered dimensions.
    // Priority: explicit width/height → natural defaults.
    // If only width is given, derive height from aspect ratio.
    // If only height is given, derive width from aspect ratio.
    const resolvedWidth  = width  ?? (height ? Math.round(height  * (natural.width  / natural.height)) : natural.width);
    const resolvedHeight = height ?? (width  ? Math.round(width   * (natural.height / natural.width))  : natural.height);

    return (
      <Box
        ref={ref}
        component="span"
        display="inline-flex"
        alignItems="center"
        className={className}
        sx={{ lineHeight: 0 }}
      >
        <img
          src={LOGO_SRCS[logoType]}
          alt={alt}
          width={resolvedWidth}
          height={resolvedHeight}
          style={{ display: 'block' }}
          draggable={false}
        />
      </Box>
    );
  },
);

ProductLogos.displayName = 'ProductLogos';

export default ProductLogos;
