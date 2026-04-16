/**
 * ButtonGroup Component
 *
 * SOURCE OF TRUTH: Figma component "buttonGroup" (node: 2172:9605)
 * Design System: AHTG Desktop SaaS
 *
 * Theme migration (2026-04-15):
 * - Font, size-specific heights (sm=32, md=38) live in theme at MuiButtonGroup.
 * - MUI's native ButtonGroup already handles adjacent border-radius sharing,
 *   so the explicit overrides were redundant — removed.
 * - Component only maps Figma size/variant names to MUI equivalents.
 */

import React from 'react';
import { ButtonGroup as MuiButtonGroup, Button } from '@mui/material';
import { ButtonGroupProps, defaultButtonGroupProps } from './ButtonGroup.types';

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
  const displayButtons = (buttons || []).slice(0, 6);
  const muiSize = size === 'sm' ? 'small' : 'medium';
  const muiVariant = variant === 'outline' ? 'outlined' : 'contained';

  return (
    <MuiButtonGroup
      variant={muiVariant}
      size={muiSize}
      color={color}
      orientation={orientation}
      disableElevation={disableElevation}
      fullWidth={fullWidth}
      className={className}
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
