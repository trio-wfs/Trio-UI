/**
 * Disclosure Component
 *
 * Animated height-transition wrapper. Thin TRIO-flavored layer over MUI's
 * Collapse — provides the TRIO timing default (200ms) and a stable API
 * surface so consumers don't reach for raw MUI (per CONSUMPTION_RULES.md).
 *
 * Use for: accordion items, thread replies, expand/collapse panels, any
 * "reveal on toggle" UI that needs a smooth height animation.
 *
 * NOT for: opinionated accordion patterns with built-in headers — compose
 * your own trigger (Button, Chip, row click) and pair it with Disclosure.
 */

import React from 'react';
import { Collapse } from '@mui/material';
import { type DisclosureProps, defaultDisclosureProps } from './Disclosure.types';

export const Disclosure = React.forwardRef<HTMLDivElement, DisclosureProps>(({
  open,
  children,
  unmountOnExit = defaultDisclosureProps.unmountOnExit,
  timeout = defaultDisclosureProps.timeout,
  'aria-labelledby': ariaLabelledBy,
  id,
}, ref) => {
  return (
    <Collapse
      ref={ref}
      in={open}
      timeout={timeout}
      unmountOnExit={unmountOnExit}
      aria-labelledby={ariaLabelledBy}
      id={id}
      role="region"
    >
      {children}
    </Collapse>
  );
});

Disclosure.displayName = 'Disclosure';
export default Disclosure;
