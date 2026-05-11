/**
 * ModalDemo — showcase-only wrapper.
 *
 * The real <Modal> needs interactive open/close state which can't be expressed
 * as static JSON props. This wrapper bundles a trigger Button with a real Modal
 * so showcase pages stay honest (they render the actual design system component,
 * not a hand-coded HTML stand-in).
 *
 * Usage in showcase HTML:
 *   <div data-trio-component="ModalDemo" data-trio-props='{
 *     "triggerLabel": "Delete account",
 *     "triggerColor": "error",
 *     "variant": "destructive",
 *     "title": "Delete account",
 *     "eyebrowText": "This action cannot be undone",
 *     "size": "sm",
 *     "bodyText": "All your data will be permanently removed.",
 *     "confirmLabel": "Delete",
 *     "cancelLabel": "Cancel"
 *   }'></div>
 */

import React, { useState } from 'react';
import { Typography } from '@mui/material';
import { Button } from '../components/Button/Button';
import { Modal } from '../components/Modal/Modal';
import type { ModalProps } from '../components/Modal/Modal.types';
import type { ButtonProps } from '../components/Button/Button.types';

interface ModalDemoProps extends Omit<ModalProps, 'open' | 'onClose' | 'onConfirm' | 'children'> {
  /** Text on the trigger button that opens the modal */
  triggerLabel: string;
  /** Color of the trigger button — defaults to 'primary' */
  triggerColor?: ButtonProps['color'];
  /** Variant of the trigger button — defaults to 'contained' */
  triggerVariant?: ButtonProps['variant'];
  /** Body content (plain text — rendered as a Typography paragraph) */
  bodyText?: string;
}

export const ModalDemo: React.FC<ModalDemoProps> = ({
  triggerLabel,
  triggerColor = 'primary',
  triggerVariant = 'contained',
  bodyText,
  ...modalProps
}) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        variant={triggerVariant}
        color={triggerColor}
        size="medium"
        label={triggerLabel}
        onClick={() => setOpen(true)}
      />
      <Modal
        {...modalProps}
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={() => setOpen(false)}
      >
        {bodyText && <Typography variant="body2">{bodyText}</Typography>}
      </Modal>
    </>
  );
};

export default ModalDemo;
