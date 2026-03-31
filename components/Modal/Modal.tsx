/**
 * Modal Component
 *
 * SOURCE OF TRUTH: AHTG Design System spec (Figma-confirmed)
 * Design System: AHTG Desktop SaaS
 *
 * SIZES:
 * - sm: 500px width
 * - lg: 900px width (max 900px, min 500px)
 *
 * PADDING:
 * - Header: 40px L/R, 16px T/B
 * - Content: 40px L/R, 24px T/B
 * - Footer: 40px L/R, 16px T/B
 *
 * CRITICAL RULES:
 * - All colors from tokens.ts (NO hardcoded hex values)
 * - Scrim: rgba(0,0,0,0.5) via tokens.colors.components.backdrop.fill
 * - Desktop-only (no responsive/mobile)
 * - Material Icons only
 */

import React from 'react';
import {
  Modal as MuiModal,
  Backdrop,
  Box,
  IconButton,
  Typography,
} from '@mui/material';
import { ModalProps, defaultModalProps } from './Modal.types';
import { tokens } from '../../design-tokens/tokens';

const WIDTH: Record<'sm' | 'lg', { width: number; minWidth: number }> = {
  sm: { width: 500, minWidth: 500 },
  lg: { width: 900, minWidth: 500 },
};

export const Modal: React.FC<ModalProps> = ({
  open,
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
  'aria-label': ariaLabel,
}) => {
  const isDestructive = variant === 'destructive';
  const confirmColor = isDestructive
    ? tokens.colors.error.main
    : tokens.colors.primary.main;
  const confirmDark = isDestructive
    ? tokens.colors.error.dark
    : tokens.colors.primary.dark;

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
      {/* Paper */}
      <Box
        className={className}
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: WIDTH[size].width,
          minWidth: WIDTH[size].minWidth,
          backgroundColor: tokens.colors.background.paper,
          borderRadius: `${tokens.borderRadius.default}px`,
          boxShadow: tokens.shadows.xl,
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '90vh',
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
            backgroundColor: tokens.colors.primary.main,
            borderRadius: `${tokens.borderRadius.default}px ${tokens.borderRadius.default}px 0 0`,
            flexShrink: 0,
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <Typography
              sx={{
                fontFamily: tokens.typography.fontFamily,
                fontSize: tokens.typography.h6.fontSize,
                fontWeight: tokens.typography.h6.fontWeight,
                lineHeight: `${tokens.typography.h6.lineHeight}px`,
                color: tokens.colors.base.white,
              }}
            >
              {title}
            </Typography>
            {eyebrowText && (
              <Typography
                sx={{
                  fontFamily: tokens.typography.fontFamily,
                  fontSize: tokens.typography.body2.fontSize,
                  fontWeight: tokens.typography.body2.fontWeight,
                  lineHeight: `${tokens.typography.body2.lineHeight}px`,
                  color: tokens.colors.base.white,
                  opacity: 0.85,
                }}
              >
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
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.12)',
              },
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
            {/* Cancel — text/primary (blue text, no border) */}
            <Box
              component="button"
              onClick={onClose}
              sx={{
                fontFamily: tokens.typography.fontFamily,
                fontSize: tokens.typography.button.md.fontSize,
                fontWeight: tokens.typography.button.md.fontWeight,
                height: 38,
                padding: `${tokens.spacing.sm}px ${tokens.spacing.lg}px`,
                backgroundColor: 'transparent',
                color: tokens.colors.primary.main,
                border: 'none',
                borderRadius: `${tokens.borderRadius.default}px`,
                cursor: 'pointer',
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: tokens.colors.primary.light,
                },
              }}
            >
              {cancelLabel}
            </Box>

            {/* Confirm — primary or destructive contained */}
            <Box
              component="button"
              onClick={onConfirm}
              disabled={confirmDisabled}
              sx={{
                fontFamily: tokens.typography.fontFamily,
                fontSize: tokens.typography.button.md.fontSize,
                fontWeight: tokens.typography.button.md.fontWeight,
                height: 38,
                padding: `${tokens.spacing.sm}px ${tokens.spacing.lg}px`,
                backgroundColor: confirmDisabled
                  ? tokens.colors.action.disabledBackground
                  : confirmColor,
                color: confirmDisabled
                  ? tokens.colors.text.disabled
                  : tokens.colors.base.white,
                border: 'none',
                borderRadius: `${tokens.borderRadius.default}px`,
                cursor: confirmDisabled ? 'not-allowed' : 'pointer',
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: confirmDisabled ? undefined : confirmDark,
                },
              }}
            >
              {confirmLabel}
            </Box>
          </Box>
        )}
      </Box>
    </MuiModal>
  );
};

Modal.displayName = 'Modal';

export default Modal;
