/**
 * Tooltip Component
 *
 * SOURCE OF TRUTH: Figma node 490:88 (file: PjAYuPDr8IA1ccwiAjFkSD)
 *
 * Theme migration (2026-04-15):
 * - The styled() factory is gone. All tooltip/arrow styling lives in theme
 *   at components.MuiTooltip, and arrow is a defaultProp (always on for TRIO).
 * - This component is now just a thin wrapper that maps our `position` prop
 *   to MUI's `placement` and supports position="none" (no tooltip).
 */

import React from 'react';
import { Tooltip as MuiTooltip } from '@mui/material';
import { TooltipProps, defaultTooltipProps } from './Tooltip.types';

export const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(({
  title,
  position = defaultTooltipProps.position!,
  children,
}, ref) => {
  if (position === 'none') {
    return <>{children}</>;
  }

  return (
    <MuiTooltip ref={ref} title={title} placement={position}>
      {children}
    </MuiTooltip>
  );
});

Tooltip.displayName = 'Tooltip';
export default Tooltip;
