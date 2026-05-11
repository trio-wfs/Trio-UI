/**
 * Modal Component Types
 *
 * SOURCE OF TRUTH: AHTG Design System spec
 * Design System: AHTG Desktop SaaS
 *
 * SIZES:
 * - sm: 550px width
 * - lg: 900px width (max 900px, min 550px)
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
 */

import type { ReactNode } from 'react';

/**
 * Modal size
 * sm: 550px | lg: 900px
 */
export type ModalSize = 'sm' | 'lg';

/**
 * Modal variant
 * default: primary confirm button
 * destructive: error-colored confirm button
 */
export type ModalVariant = 'default' | 'destructive';

export interface ModalProps {
  /** Controls visibility */
  open: boolean;

  /** Called when the modal should close (X button, backdrop click, Cancel) */
  onClose: () => void;

  /** Called when the Confirm button is clicked */
  onConfirm?: () => void;

  /** Modal header title */
  title: string;

  /** Optional subtitle line below the title in the header */
  eyebrowText?: string;

  /** Modal body content */
  children: ReactNode;

  /** Width preset — sm: 550px, lg: 900px */
  size?: ModalSize;

  /** Determines confirm button color. destructive uses error (#DB4537) */
  variant?: ModalVariant;

  /** Label for the confirm button */
  confirmLabel?: string;

  /** Label for the cancel button */
  cancelLabel?: string;

  /** Hide footer buttons (for informational modals) */
  hideFooter?: boolean;

  /** Disable the confirm button (e.g. while form is invalid) */
  confirmDisabled?: boolean;

  /** Custom class name applied to the modal paper */
  className?: string;

  /** Accessibility label for the modal */
  'aria-label'?: string;
}

export const defaultModalProps: Partial<ModalProps> = {
  size: 'sm',
  variant: 'default',
  confirmLabel: 'Confirm',
  cancelLabel: 'Cancel',
  hideFooter: false,
  confirmDisabled: false,
};
