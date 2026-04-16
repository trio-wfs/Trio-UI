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
import { AlertProps, defaultAlertProps } from './Alert.types';

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

export const Alert: React.FC<AlertProps> = ({
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
}) => {
  const hasAction = Boolean(actionLabel || close);

  return (
    <MuiAlert
      className={className}
      variant={variantToMui[variant!]}
      severity={severityToMui[severity!]}
      action={
        hasAction ? (
          <>
            {actionLabel && (
              <Button
                size="small"
                onClick={onAction}
                sx={{ color: 'inherit', minWidth: 'unset' }}
              >
                {actionLabel}
              </Button>
            )}
            {close && (
              <IconButton
                size="small"
                onClick={onClose}
                sx={{ color: 'inherit', '& .MuiSvgIcon-root': { fontSize: 16 } }}
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
};

Alert.displayName = 'Alert';
export default Alert;
