/**
 * Alert Component
 *
 * SOURCE OF TRUTH: Figma component "Alert" (node: 2063:3499)
 *
 * Theme migration (2026-04-15):
 * - Root chrome (padding, radius, icon/message layout) + the 12-combo
 *   color matrix (variant × severity) live in theme at components.MuiAlert.
 * - AlertTitle typography lives in theme at components.MuiAlertTitle.
 * - Description is now a Typography variant="caption" — our theme's caption
 *   is 12/400/18px which matches the Figma description spec exactly, so we
 *   don't need inline styles.
 *
 * This component is now a thin wrapper: it maps our Figma variant/severity
 * names to MUI equivalents and renders the action/close slot.
 */

import React from 'react';
import MuiAlert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import { type AlertProps, defaultAlertProps } from './Alert.types';

const severityToMui = {
  default: 'info',
  error: 'error',
  warning: 'warning',
  success: 'success',
} as const;

const variantToMui = {
  standard: 'standard',
  contained: 'filled',
  outline: 'outlined',
} as const;

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(({
  variant = defaultAlertProps.variant,
  severity = defaultAlertProps.severity,
  title,
  description,
  actionLabel,
  close = defaultAlertProps.close,
  onClose,
  onAction,
  children,
  className,
}, ref) => {
  const hasAction = Boolean(actionLabel || close);
  const muiSeverity = severityToMui[severity!];
  const actionColor = muiSeverity === 'info' ? 'info' : muiSeverity;

  return (
    <MuiAlert
      ref={ref}
      className={className}
      variant={variantToMui[variant!]}
      severity={muiSeverity}
      action={
        hasAction ? (
          <>
            {actionLabel && (
              <Button
                variant="text"
                size="small"
                color={actionColor}
                onClick={onAction}
                sx={{ minWidth: 'unset' }}
              >
                {actionLabel}
              </Button>
            )}
            {close && (
              <IconButton
                size="small"
                color={actionColor}
                onClick={onClose}
                sx={{ '& .MuiSvgIcon-root': { fontSize: 16 } }}
                aria-label="Close alert"
              >
                <CloseIcon />
              </IconButton>
            )}
          </>
        ) : undefined
      }
    >
      {title && <AlertTitle>{title}</AlertTitle>}
      {(description || children) && (
        <Typography variant="caption" component="div">
          {children ?? description}
        </Typography>
      )}
    </MuiAlert>
  );
});

Alert.displayName = 'Alert';
export default Alert;
