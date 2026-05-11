/**
 * Modal Component
 *
 * SOURCE OF TRUTH: AHTG Design System spec (Figma-confirmed)
 *
 * Theme migration (2026-04-15):
 * - Footer buttons now use our design system `<Button>` component instead of
 *   hand-styled `<Box component="button">` — they inherit the MuiButton theme
 *   (padding, radius, color × variant matrix, focus ring, disabled state).
 * - Title/eyebrow Typography now use `variant="h6"` and `variant="body2"`
 *   (our theme maps these to the correct Figma values).
 *
 * SIZES: sm 550px | lg 900px (min 550, max 900)
 * PADDING: Header 40 L/R × 16 T/B | Content 40 L/R × 24 T/B | Footer 40 L/R × 16 T/B
 */

import React from 'react';
import {
  Modal as MuiModal,
  Backdrop,
  Box,
  IconButton,
  Typography,
} from '@mui/material';
import { type ModalProps, defaultModalProps } from './Modal.types';
import { Button } from '../Button/Button';
import { tokens } from '../../design-tokens/tokens';

const WIDTH: Record<'sm' | 'lg', { width: number; minWidth: number }> = {
  sm: { width: 550, minWidth: 550 },
  lg: { width: 900, minWidth: 550 },
};

// Props the panel needs — a subset of ModalProps without portal/open machinery.
type ModalPanelProps = Pick<
  ModalProps,
  | 'onClose'
  | 'onConfirm'
  | 'title'
  | 'eyebrowText'
  | 'children'
  | 'size'
  | 'variant'
  | 'confirmLabel'
  | 'cancelLabel'
  | 'hideFooter'
  | 'confirmDisabled'
  | 'className'
> & {
  /**
   * When true, removes the absolute centering so the panel renders inline at its
   * place in the DOM (useful for showcase previews of an "always open" modal).
   * @default false
   */
  inline?: boolean;
};

/**
 * Inner panel: header + body + footer. The same code path renders both the
 * real Modal (wrapped in MuiModal portal) and showcase preview cards (rendered
 * inline). Keeping a single source of truth avoids showcase drift.
 */
export const ModalPanel = React.forwardRef<HTMLDivElement, ModalPanelProps>(({
  onClose,
  onConfirm,
  title,
  eyebrowText,
  children,
  size = defaultModalProps.size!,
  variant = defaultModalProps.variant!,
  confirmLabel = defaultModalProps.confirmLabel,
  cancelLabel = defaultModalProps.cancelLabel,
  hideFooter = defaultModalProps.hideFooter,
  confirmDisabled = defaultModalProps.confirmDisabled,
  className,
  inline = false,
}, ref) => {
  const isDestructive = variant === 'destructive';

  return (
    <Box
      ref={ref}
      className={className}
      sx={{
        ...(inline
          ? { position: 'relative' as const }
          : {
              position: 'absolute' as const,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }),
        width: WIDTH[size].width,
        minWidth: WIDTH[size].minWidth,
        backgroundColor: tokens.colors.background.paper,
        borderRadius: `${tokens.borderRadius.default}px`,
        boxShadow: tokens.shadows.xl,
        display: 'flex',
        flexDirection: 'column',
        maxHeight: inline ? undefined : '90vh',
        outline: 'none',
      }}
    >
      {/* ── Header ── */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 40px',
          backgroundColor: isDestructive ? tokens.colors.error.main : tokens.colors.primary.main,
          borderRadius: `${tokens.borderRadius.default}px ${tokens.borderRadius.default}px 0 0`,
          flexShrink: 0,
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <Typography variant="h6" sx={{ color: tokens.colors.base.white }}>
            {title}
          </Typography>
          {eyebrowText && (
            <Typography variant="body2" sx={{ color: tokens.colors.base.white, opacity: 0.85 }}>
              {eyebrowText}
            </Typography>
          )}
        </Box>

        <IconButton
          onClick={onClose}
          size="small"
          aria-label="Close modal"
          sx={{
            color: tokens.colors.base.white,
            padding: `${tokens.spacing.xs}px`,
            '&:hover': { backgroundColor: 'rgba(255,255,255,0.12)' },
          }}
        >
          <span className="material-icons" style={{ fontSize: 20 }}>close</span>
        </IconButton>
      </Box>

      {/* ── Body ── */}
      <Box
        sx={{
          padding: '24px 40px',
          overflowY: 'auto',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: `${tokens.spacing.md}px`,
        }}
      >
        {children}
      </Box>

      {/* ── Footer ── */}
      {!hideFooter && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: `${tokens.spacing.lg}px`,
            padding: '16px 40px',
            minHeight: 68,
            borderTop: `1px solid ${tokens.colors.components.divider}`,
            flexShrink: 0,
          }}
        >
          <Button variant="text" color="primary" onClick={onClose}>
            {cancelLabel}
          </Button>
          <Button
            variant="contained"
            color={isDestructive ? 'error' : 'primary'}
            disabled={confirmDisabled}
            onClick={onConfirm}
          >
            {confirmLabel}
          </Button>
        </Box>
      )}
    </Box>
  );
});

ModalPanel.displayName = 'ModalPanel';

export const Modal = React.forwardRef<HTMLDivElement, ModalProps>(({
  open,
  onClose,
  'aria-label': ariaLabel,
  title,
  ...rest
}, ref) => {
  return (
    <MuiModal
      open={open}
      onClose={onClose}
      aria-label={ariaLabel || title}
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          style: { backgroundColor: tokens.colors.components.backdrop.fill },
        },
      }}
    >
      <ModalPanel ref={ref} title={title} onClose={onClose} {...rest} />
    </MuiModal>
  );
});

Modal.displayName = 'Modal';

export default Modal;
