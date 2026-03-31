/**
 * Tooltip Component
 *
 * SOURCE OF TRUTH: Figma node 490:88 (file: PjAYuPDr8IA1ccwiAjFkSD)
 *
 * Hover tooltip with:
 *   - Black (#000) background, white text
 *   - 14px / Medium (500) typography
 *   - Directional arrow pointer
 *   - 4px 8px padding, 4px border radius
 *   - position: top | bottom | left | right | none
 *     "none" disables the tooltip entirely
 */

import React from 'react';
import { Tooltip as MuiTooltip, tooltipClasses } from '@mui/material';
import { styled } from '@mui/material/styles';
import { TooltipProps, defaultTooltipProps } from './Tooltip.types';
import { tokens } from '../../design-tokens/tokens';

const StyledTooltip = styled(
  ({ className, ...props }: React.ComponentProps<typeof MuiTooltip>) => (
    <MuiTooltip {...props} classes={{ popper: className }} />
  )
)({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: tokens.colors.base.black,
    color: tokens.colors.base.white,
    fontFamily: tokens.typography.fontFamily,
    fontSize: tokens.typography.fontSize.sm,  // 14px
    fontWeight: tokens.typography.fontWeight.medium, // 500
    lineHeight: `${tokens.typography.body2.lineHeight}px`,
    padding: `${tokens.spacing.xs}px ${tokens.spacing.sm}px`, // 4px 8px
    borderRadius: tokens.borderRadius.default,
    boxShadow: tokens.shadows.md,
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: tokens.colors.base.black,
  },
});

export const Tooltip: React.FC<TooltipProps> = ({
  title,
  position = defaultTooltipProps.position!,
  children,
}) => {
  if (position === 'none') {
    return <>{children}</>;
  }

  return (
    <StyledTooltip title={title} placement={position} arrow>
      {children}
    </StyledTooltip>
  );
};

Tooltip.displayName = 'Tooltip';
export default Tooltip;
