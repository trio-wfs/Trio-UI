/**
 * PopOverDemo — showcase-only wrapper.
 *
 * PopOver is a controlled component (anchorEl + open + onClose). The static
 * showcase mount system can't express interactive open/close through JSON
 * props, so this wrapper bundles a trigger Button with state.
 *
 * Body content is passed as plain text (rendered as a Typography paragraph) or
 * a small list of label/value pairs via `items`.
 *
 * Usage in showcase HTML:
 *   <div data-trio-component="PopOverDemo" data-trio-props='{
 *     "triggerLabel": "View details",
 *     "title": "Worker Notes",
 *     "actionLabel": "View all",
 *     "bodyText": "Reliable. Prefers night shifts. Last placement: 4/12."
 *   }'></div>
 */

import React, { useRef, useState } from 'react';
import { Typography, Stack, Box } from '@mui/material';
import { Button } from '../components/Button/Button';
import { PopOver } from '../components/PopOver/PopOver';
import type { PopOverProps } from '../components/PopOver/PopOver.types';
import type { ButtonProps } from '../components/Button/Button.types';

interface PopOverDemoProps extends Omit<PopOverProps, 'anchorEl' | 'open' | 'onClose' | 'children' | 'onAction'> {
  /** Text on the trigger Button that opens the popover */
  triggerLabel: string;
  /** Variant of the trigger button — defaults to 'outlined' */
  triggerVariant?: ButtonProps['variant'];
  /** Color of the trigger button — defaults to 'primary' */
  triggerColor?: ButtonProps['color'];
  /** Plain-text body — rendered as a body2 Typography paragraph */
  bodyText?: string;
  /** Label/value pairs — rendered as a vertical list */
  items?: Array<{ label: string; value: string }>;
}

export const PopOverDemo: React.FC<PopOverDemoProps> = ({
  triggerLabel,
  triggerVariant = 'outlined',
  triggerColor = 'primary',
  bodyText,
  items,
  ...popoverProps
}) => {
  const anchorRef = useRef<HTMLButtonElement | null>(null);
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        ref={anchorRef as React.Ref<HTMLButtonElement>}
        variant={triggerVariant}
        color={triggerColor}
        size="medium"
        label={triggerLabel}
        onClick={() => setOpen(true)}
      />
      <PopOver
        {...popoverProps}
        anchorEl={anchorRef.current}
        open={open}
        onClose={() => setOpen(false)}
        onAction={() => setOpen(false)}
      >
        {bodyText && <Typography variant="body2">{bodyText}</Typography>}
        {items && (
          <Stack spacing={1}>
            {items.map((item, i) => (
              <Box key={i} sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>{item.label}</Typography>
                <Typography variant="body2">{item.value}</Typography>
              </Box>
            ))}
          </Stack>
        )}
      </PopOver>
    </>
  );
};

export default PopOverDemo;
