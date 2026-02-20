/**
 * ButtonGroup Component
 *
 * SOURCE OF TRUTH: Figma component "buttonGroup" (node: 2172:9605)
 * Design System: AHTG Desktop SaaS
 *
 * EXTRACTED VALUES FROM FIGMA:
 * - Small height: 32px (from .absoluteBoundingBox.height, size=sm variant)
 * - Medium height: 38px (from .absoluteBoundingBox.height, size=md variant)
 * - Button gap: 0px (buttons share borders, -1px overlap)
 * - Variants: contained, outline (from variantOptions)
 * - Colors: secondary, primary (from variantOptions)
 * - Orientation: horizontal, vertical (from variantOptions)
 *
 * CRITICAL RULES:
 * - All colors from tokens.ts (NO hardcoded hex values)
 * - All spacing from tokens.ts (8px system)
 * - All typography from tokens.ts
 * - Desktop-only (no responsive/mobile)
 * - Material Icons only
 */

import React from 'react';
import { ButtonGroup as MuiButtonGroup, Button } from '@mui/material';
import { ButtonGroupProps, defaultButtonGroupProps } from './ButtonGroup.types';
import { tokens } from '../../design-tokens/tokens';

export const ButtonGroup: React.FC<ButtonGroupProps> = ({
  variant = defaultButtonGroupProps.variant,
  size = defaultButtonGroupProps.size,
  color = defaultButtonGroupProps.color,
  orientation = defaultButtonGroupProps.orientation,
  buttons = defaultButtonGroupProps.buttons,
  onButtonClick = [],
  disabledButtons = [],
  className,
  fullWidth = defaultButtonGroupProps.fullWidth,
  disableElevation = defaultButtonGroupProps.disableElevation,
}) => {
  // Limit to 6 buttons as per Figma spec (button-3 through button-8)
  const displayButtons = (buttons || []).slice(0, 6);

  // Map Figma size to MUI size
  const muiSize = size === 'sm' ? 'small' : 'medium';

  // Map Figma variant to MUI variant
  const muiVariant = variant === 'outline' ? 'outlined' : 'contained';

  // Get exact height from Figma extraction
  const getHeight = () => {
    return size === 'sm' ? 32 : 38;  // Actual Figma values
  };

  return (
    <MuiButtonGroup
      variant={muiVariant}
      size={muiSize}
      color={color}
      orientation={orientation}
      disableElevation={disableElevation}
      fullWidth={fullWidth}
      className={className}
      sx={{
        fontFamily: tokens.typography.fontFamily,
        '& .MuiButton-root': {
          height: `${getHeight()}px`,
          fontFamily: tokens.typography.fontFamily,
          fontSize: `${tokens.typography.fontSize.sm}px`,
          fontWeight: tokens.typography.fontWeight.medium,
          textTransform: 'none',
          borderRadius: `${tokens.borderRadius.default}px`,
          // First button keeps left radius, last keeps right radius
          '&:not(:first-of-type)': {
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
          },
          '&:not(:last-of-type)': {
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
          },
        },
        // Horizontal specific (default)
        '& .MuiButton-root:not(:first-of-type)': orientation === 'horizontal' ? {
          marginLeft: '-1px', // Share border
        } : {},
        // Vertical specific
        '& .MuiButton-root:not(:first-of-type)': orientation === 'vertical' ? {
          marginTop: '-1px', // Share border
        } : {},
      }}
    >
      {displayButtons.map((label, index) => (
        <Button
          key={`button-${index}`}
          onClick={() => onButtonClick[index]?.(index)}
          disabled={disabledButtons[index] || false}
        >
          {label}
        </Button>
      ))}
    </MuiButtonGroup>
  );
};

ButtonGroup.displayName = 'ButtonGroup';

export default ButtonGroup;
