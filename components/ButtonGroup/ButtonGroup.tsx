/**
 * ButtonGroup Component
 *
 * SOURCE OF TRUTH: Figma component "buttonGroup" (node: 2172:9605)
 *
 * ButtonGroup is a composition wrapper: each grouped button is a full
 * Button instance with all its own props (variant, size, color, startIcon,
 * endIcon, label). The group provides shared outer chrome (single outer
 * border, internal dividers, no internal radii) and nothing else.
 *
 * Typography and behavior inherit from MuiButton — small group buttons
 * render as small Button text (12px / 400), medium as medium Button text
 * (14px / 400). Active state differentiates via medium weight (500).
 *
 * Variant ↔ color coupling per Figma: contained pairs with secondary,
 * outline pairs with primary. Color is derived from variant when not
 * explicitly set.
 */

import React from 'react';
import { ButtonGroup as MuiButtonGroup } from '@mui/material';
import { Button } from '../Button/Button';
import { type ButtonGroupProps, defaultButtonGroupProps } from './ButtonGroup.types';
import { tokens } from '../../design-tokens/tokens';

export const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>((props, ref) => {
  const {
    size = defaultButtonGroupProps.size,
    orientation = defaultButtonGroupProps.orientation,
    buttons = defaultButtonGroupProps.buttons,
    children,
    onButtonClick = [],
    disabledButtons = [],
    activeIndex,
    className,
    fullWidth = defaultButtonGroupProps.fullWidth,
    disableElevation = defaultButtonGroupProps.disableElevation,
  } = props;

  // Derive color from variant per Figma's coupling — contained → secondary,
  // outline → primary. The discriminated union in ButtonGroupProps enforces
  // this at the type level; this just supplies the runtime default.
  const variant = props.variant ?? 'contained';
  const color = props.color ?? (variant === 'outline' ? 'primary' : 'secondary');

  const displayButtons = (buttons || []).slice(0, 6);
  const muiSize = size!;
  const muiVariant = variant === 'outline' ? 'outlined' : 'contained';
  const isHorizontal = orientation !== 'vertical';

  const borderColor = color === 'secondary'
    ? tokens.colors.secondary.outline
    : tokens.colors.primary.main;

  // Selectors cover both MUI Button (label-based) and MUI IconButton (icon-only).
  // ButtonIcon wraps IconButton, so this lets composition via children include
  // both label buttons and icon buttons within the same group.
  const innerControlSelector = '& .MuiButton-root, & .MuiIconButton-root';

  return (
    <MuiButtonGroup
      ref={ref}
      variant={muiVariant}
      size={muiSize}
      color={color}
      orientation={orientation}
      disableElevation={disableElevation}
      fullWidth={fullWidth}
      className={className}
      sx={{
        boxShadow: 'none',
        // Single outer border on the group
        border: `1px solid ${borderColor}`,
        borderRadius: `${tokens.borderRadius.default}px`,
        // Strip borders from inner controls — the group outer border handles edges
        [innerControlSelector]: {
          border: 'none !important',
          boxShadow: 'none !important',
          textTransform: 'none !important',
          borderRadius: '0 !important',
        },
        // Divider on every direct child except the first
        '& > *:not(:first-of-type)': {
          [isHorizontal ? 'borderLeft' : 'borderTop']: `1px solid ${borderColor} !important`,
        },
      }}
    >
      {children ?? displayButtons.map((entry, index) => {
        // Normalize string vs object — string is shorthand for { label }.
        const config = typeof entry === 'string' ? { label: entry } : entry;
        const isActive = activeIndex === index;
        return (
          <Button
            key={`button-${index}`}
            variant={muiVariant}
            size={muiSize}
            color={color}
            label={config.label}
            startIcon={config.startIcon}
            endIcon={config.endIcon}
            onClick={() => onButtonClick[index]?.(index)}
            disabled={disabledButtons[index] || false}
            sx={isActive ? {
              backgroundColor: `${tokens.colors.action.selected} !important`,
              fontWeight: `${tokens.typography.fontWeight.medium} !important`,
            } : undefined}
          />
        );
      })}
    </MuiButtonGroup>
  );
});

ButtonGroup.displayName = 'ButtonGroup';

export default ButtonGroup;
