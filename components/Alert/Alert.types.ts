/**
 * Alert Component Types
 *
 * SOURCE OF TRUTH: Figma component "Alert" (node: 2063:3499)
 * File: PjAYuPDr8IA1ccwiAjFkSD
 *
 * Types mapped directly from Figma componentPropertyDefinitions.
 * DO NOT add properties not in Figma.
 * DO NOT modify variant options unless Figma is updated.
 */

import { ReactNode } from 'react';

/**
 * Alert Variant
 * Figma property: "variant"
 * Options: standard, contained, outline
 */
export type AlertVariant = 'standard' | 'contained' | 'outline';

/**
 * Alert Severity
 * Figma property: "severity"
 * Options: default, error, warning, success
 *
 * AHTG Semantics:
 * - default: informational / primary blue
 * - error: destructive, blocking
 * - warning: caution, non-blocking
 * - success: positive confirmation
 */
export type AlertSeverity = 'default' | 'error' | 'warning' | 'success';

export interface AlertProps {
  // VARIANT properties (from Figma)
  variant?: AlertVariant;
  severity?: AlertSeverity;

  // Content — rendered when provided
  title?: string;
  description?: string;
  actionLabel?: string;

  // Close button toggle
  close?: boolean;

  // Event handlers
  onClose?: () => void;
  onAction?: () => void;

  // Standard React props
  children?: ReactNode;
  className?: string;
  'aria-label'?: string;
}

export const defaultAlertProps: Partial<AlertProps> = {
  variant: 'standard',
  severity: 'default',
  close: false,
};
