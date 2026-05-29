/**
 * Disclosure Component Types
 *
 * Animated height-transition wrapper — TRIO's official primitive for
 * accordion-style reveal/hide patterns. Wraps MUI's Collapse with
 * TRIO timing defaults so consumers don't have to opt out of MUI
 * directly (which would violate CONSUMPTION_RULES.md).
 *
 * Note: Disclosure is intentionally a primitive, not an opinionated
 * accordion. It does NOT render a header / toggle button — the consumer
 * supplies whatever trigger makes sense (a button, a chip, a row click).
 * The consumer also owns the open/closed state.
 *
 *   const [open, setOpen] = useState(false);
 *   return (
 *     <>
 *       <Button onClick={() => setOpen(o => !o)}>Toggle</Button>
 *       <Disclosure open={open}>
 *         <Box sx={{ p: 2 }}>Hidden content…</Box>
 *       </Disclosure>
 *     </>
 *   );
 */

import type React from 'react';

export interface DisclosureProps {
  /**
   * Whether the disclosure is open. Drives the height transition.
   * Controlled — caller owns the state.
   */
  open: boolean;

  /**
   * Content to reveal/hide. Layout is preserved while collapsed; only the
   * height animates. Apply your own padding/margins on the children, not
   * on Disclosure itself.
   */
  children: React.ReactNode;

  /**
   * When true, content is removed from the DOM while closed. Default false
   * — content stays mounted so reopen is instant and form state survives.
   * Set true for very heavy children (e.g. data-fetching tables) where the
   * memory cost outweighs the reopen latency.
   * @default false
   */
  unmountOnExit?: boolean;

  /**
   * Transition duration in ms. Default 200ms — matches TRIO's other chrome
   * animations (page-header divider fade, tooltip enter/exit). Pass a
   * larger number for content that benefits from a slower reveal.
   * @default 200
   */
  timeout?: number;

  /**
   * Optional `aria-labelledby` — set to the id of the disclosure's trigger
   * button so assistive tech connects the expanded content to its toggle.
   * Required for accessibility when the disclosure is toggled by a button
   * elsewhere on the page.
   */
  'aria-labelledby'?: string;

  /**
   * Optional `id` so the trigger button can reference this region via
   * `aria-controls`. Recommended for accessibility.
   */
  id?: string;
}

export const defaultDisclosureProps: Partial<DisclosureProps> = {
  unmountOnExit: false,
  timeout: 200,
};
