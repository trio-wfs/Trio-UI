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
import { ButtonGroup as MuiButtonGroup } from '@mui/material';
import { Button } from '../Button/Button';
import { ButtonGroupProps, defaultButtonGroupProps } from './ButtonGroup.types';
import { tokens } from '../../design-tokens/tokens';

export const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(({
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
}, ref) => {
  const displayButtons = (buttons || []).slice(0, 6);
  const muiSize = size === 'sm' ? 'small' : 'medium';
  const muiVariant = variant === 'outline' ? 'outlined' : 'contained';
  const isHorizontal = orientation !== 'vertical';

  // Determine border color based on variant + color combo
  const borderColor = color === 'secondary'
    ? tokens.colors.secondary.outline
    : tokens.colors.primary.main;

  // Divider property depends on orientation
  const dividerProp = isHorizontal ? 'borderRight' : 'borderBottom';

  return (
    <MuiButtonGroup
      ref={ref}
      variant={muiVariant}
      size={muiSize}
      color={color}
      orientation={orientation}
      disableElevation
      fullWidth={fullWidth}
      className={className}
      sx={{
        boxShadow: 'none',
        // Single outer border on the group
        border: `1px solid ${borderColor}`,
        borderRadius: `${tokens.borderRadius.default}px`,
        // Strip borders from child buttons — the group outer border handles edges
        '& .MuiButton-root': {
          border: 'none !important',
          boxShadow: 'none !important',
        },
        // Add dividers between buttons (more specific to override the above)
        '& .MuiButton-root + .MuiButton-root': {
          [isHorizontal ? 'borderLeft' : 'borderTop']: `1px solid ${borderColor} !important`,
        },
      }}
    >
      {displayButtons.map((label, index) => (
        <Button
          key={`button-${index}`}
          variant={muiVariant}
          size={muiSize}
          color={color}
          label={label}
          onClick={() => onButtonClick[index]?.(index)}
          disabled={disabledButtons[index] || false}
        />
      ))}
    </MuiButtonGroup>
  );
});

ButtonGroup.displayName = 'ButtonGroup';

export default ButtonGroup;
