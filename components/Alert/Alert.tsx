/**
 * Alert Component
 *
 * SOURCE OF TRUTH: Figma component "Alert" (node: 2063:3499)
 * File: PjAYuPDr8IA1ccwiAjFkSD
 *
 * EXTRACTED VALUES:
 * Padding: 16px | Border radius: 4px | Icon: 24px | Close icon: 16px
 * Gap between sections: 20px | Inner gap: 16px
 * Title: 14px/500/24px | Description/Action: 12px/400/18px
 *
 * Variant → MUI mapping:
 *   standard  → MUI 'standard'
 *   contained → MUI 'filled'
 *   outline   → MUI 'outlined'
 *
 * Severity → MUI mapping:
 *   default   → MUI 'info' with primary color overrides
 *   error     → MUI 'error'
 *   warning   → MUI 'warning'
 *   success   → MUI 'success'
 */

import React from 'react';
import MuiAlert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { tokens } from '../../design-tokens/tokens';
import {
  AlertProps,
  AlertVariant,
  AlertSeverity,
  defaultAlertProps,
} from './Alert.types';

// ─── Token Maps ───────────────────────────────────────────────────────────────

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

// Per-severity sx overrides to match Figma exactly
// "default" severity uses primary colors, not MUI's info colors
function getSeveritySx(variant: AlertVariant, severity: AlertSeverity) {
  if (severity !== 'default') return {};

  if (variant === 'standard') {
    return {
      backgroundColor: tokens.colors.primary.light,       // #E3F2FD
      color: tokens.colors.primary.dark,                   // #1976D2
      '& .MuiAlert-icon': { color: tokens.colors.primary.dark },
    };
  }
  if (variant === 'contained') {
    return {
      backgroundColor: tokens.colors.primary.main,        // #2196F3
      color: tokens.colors.primary.contrastText,           // #FFFFFF
      '& .MuiAlert-icon': { color: tokens.colors.primary.contrastText },
    };
  }
  if (variant === 'outline') {
    return {
      backgroundColor: 'transparent',
      color: tokens.colors.primary.main,                   // #2196F3
      borderColor: tokens.colors.primary.main,
      '& .MuiAlert-icon': { color: tokens.colors.primary.main },
    };
  }
  return {};
}

// ─── Component ────────────────────────────────────────────────────────────────

export const Alert: React.FC<AlertProps> = ({
  variant = defaultAlertProps.variant,
  severity = defaultAlertProps.severity,
  title = defaultAlertProps.title,
  description = defaultAlertProps.description,
  actionBtn = defaultAlertProps.actionBtn,
  close = defaultAlertProps.close,
  titleText = defaultAlertProps.titleText,
  descriptionText = defaultAlertProps.descriptionText,
  actionLabel = defaultAlertProps.actionLabel,
  onClose,
  onAction,
  children,
  className,
}) => {
  const muiVariant = variantToMui[variant!];
  const muiSeverity = severityToMui[severity!];
  const severitySx = getSeveritySx(variant!, severity!);

  return (
    <MuiAlert
      className={className}
      variant={muiVariant}
      severity={muiSeverity}
      action={
        actionBtn || close ? (
          <React.Fragment>
            {actionBtn && (
              <Button
                size="small"
                onClick={onAction}
                sx={{
                  fontSize: tokens.typography.fontSize.xs,    // 12px
                  fontWeight: tokens.typography.fontWeight.regular,
                  lineHeight: '18px',
                  textTransform: 'none',
                  color: 'inherit',
                  minWidth: 'unset',
                  px: `${tokens.spacing.sm}px`,
                }}
              >
                {actionLabel}
              </Button>
            )}
            {close && (
              <IconButton
                size="small"
                onClick={onClose}
                sx={{
                  color: 'inherit',
                  p: `${tokens.spacing.xs}px`,
                  '& .MuiSvgIcon-root': { fontSize: 16 },
                }}
                aria-label="Close alert"
              >
                <CloseIcon />
              </IconButton>
            )}
          </React.Fragment>
        ) : undefined
      }
      sx={{
        borderRadius: `${tokens.borderRadius.default}px`,    // 4px
        padding: `${tokens.spacing.md}px`,                   // 16px
        fontFamily: tokens.typography.fontFamily,
        '& .MuiAlert-icon': { fontSize: 24 },
        '& .MuiAlert-message': { gap: `${tokens.spacing.sm}px` },
        ...severitySx,
      }}
    >
      {title && (
        <AlertTitle
          sx={{
            fontSize: tokens.typography.fontSize.sm,         // 14px
            fontWeight: tokens.typography.fontWeight.medium, // 500
            lineHeight: '24px',
            margin: 0,
          }}
        >
          {titleText}
        </AlertTitle>
      )}
      {description && (
        <span
          style={{
            fontSize: tokens.typography.fontSize.xs,         // 12px
            fontWeight: tokens.typography.fontWeight.regular, // 400
            lineHeight: '18px',
          }}
        >
          {children ?? descriptionText}
        </span>
      )}
    </MuiAlert>
  );
};

Alert.displayName = 'Alert';
export default Alert;
