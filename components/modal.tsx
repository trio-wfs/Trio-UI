import React from 'react';
import { styled } from '@mui/material/styles';
import MuiDialog, { DialogProps as MuiDialogProps } from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

/**
 * Modal Component System
 * Based on Figma components:
 * - Modal Header: Document / Modal / Modal / Modal Header (ID: 2385:10564)
 * - Modal Tool Bar: Document / Modal / Modal / Modal Tool Bar (ID: 2385:10589)
 * 
 * Design tokens used:
 * - Colors: background.paper (#FFFFFF), text.primary (#212121), components.border.default (#E0E0E0)
 * - Typography: h6 (20px, medium weight), body2 (14px)
 * - Spacing: lg (24px), md (16px), sm (8px)
 * - Backdrop: components.backdrop.fill (rgba(0,0,0,0.5))
 */

export interface ModalAction {
  /** Button label */
  label: string;
  /** Click handler */
  onClick: () => void;
  /** Button variant */
  variant?: 'text' | 'outlined' | 'contained';
  /** Button color */
  color?: 'primary' | 'secondary' | 'error' | 'success';
  /** Disabled state */
  disabled?: boolean;
  /** Loading state */
  loading?: boolean;
}

export interface ModalProps extends Omit<MuiDialogProps, 'onClose'> {
  /** Modal open state */
  open: boolean;
  /** Close handler */
  onClose?: () => void;
  /** Modal title */
  title?: string;
  /** Modal content */
  children: React.ReactNode;
  /** Primary action button */
  primaryAction?: ModalAction;
  /** Secondary action button */
  secondaryAction?: ModalAction;
  /** Additional toolbar actions */
  toolbarActions?: ModalAction[];
  /** Show close button in header */
  showCloseButton?: boolean;
  /** Modal size */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Full width */
  fullWidth?: boolean;
  /** Disable backdrop click to close */
  disableBackdropClick?: boolean;
  /** Disable escape key to close */
  disableEscapeKeyDown?: boolean;
}

const StyledDialog = styled(MuiDialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: '8px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)',
  },
  '& .MuiBackdrop-root': {
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // components.backdrop.fill
  },
}));

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '24px', // lg
  borderBottom: '1px solid #E0E0E0', // components.border.default
  fontSize: '20px', // h6
  fontWeight: 500, // medium
  color: '#212121', // text.primary
  backgroundColor: '#FFFFFF', // background.paper
}));

const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  padding: '24px', // lg
  backgroundColor: '#FFFFFF', // background.paper
  color: '#212121', // text.primary
  fontSize: '14px', // body2
  '&:first-of-type': {
    paddingTop: '24px', // lg
  },
}));

const ModalToolbar = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '8px', // sm
  padding: '16px 24px', // md lg
  borderBottom: '1px solid #E0E0E0', // components.border.default
  backgroundColor: '#FAFAFA', // background.secondary
}));

const StyledDialogActions = styled(DialogActions)(({ theme }) => ({
  padding: '16px 24px', // md lg
  borderTop: '1px solid #E0E0E0', // components.border.default
  gap: '8px', // sm
  backgroundColor: '#FFFFFF', // background.paper
}));

const StyledButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  fontSize: '14px', // body2
  fontWeight: 400, // regular
  padding: '8px 16px', // sm md
  minHeight: '36px',
}));

const CloseButton = styled(IconButton)(({ theme }) => ({
  color: '#757575', // text.secondary
  marginRight: '-8px',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.04)', // action.hover
    color: '#212121', // text.primary
  },
}));

/**
 * Modal dialog component with header and optional toolbar
 * 
 * Figma Variants:
 * - Dialog Header: Modal (default)
 * - Property 2: Modal Header (default)
 * - Property 3: Large (900) - size variant
 * - Tool Bar: Large (900) - size variant
 * - Secondary Primary: boolean toggle for toolbar actions
 * 
 * @example
 * ```tsx
 * <Modal
 *   open={isOpen}
 *   onClose={handleClose}
 *   title="Edit Patient"
 *   size="lg"
 *   primaryAction={{
 *     label: 'Save',
 *     onClick: handleSave,
 *     variant: 'contained',
 *     color: 'primary'
 *   }}
 *   secondaryAction={{
 *     label: 'Cancel',
 *     onClick: handleClose,
 *     variant: 'outlined'
 *   }}
 * >
 *   <PatientForm />
 * </Modal>
 * ```
 */
export const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  title,
  children,
  primaryAction,
  secondaryAction,
  toolbarActions,
  showCloseButton = true,
  size = 'md',
  fullWidth = true,
  disableBackdropClick = false,
  disableEscapeKeyDown = false,
  ...props
}) => {
  const handleClose = (event: {}, reason: 'backdropClick' | 'escapeKeyDown') => {
    if (disableBackdropClick && reason === 'backdropClick') {
      return;
    }
    if (disableEscapeKeyDown && reason === 'escapeKeyDown') {
      return;
    }
    onClose?.();
  };

  const maxWidthMap = {
    sm: 'sm',
    md: 'md',
    lg: 'lg',
    xl: 'xl',
  } as const;

  const hasActions = primaryAction || secondaryAction;

  return (
    <StyledDialog
      open={open}
      onClose={handleClose}
      maxWidth={maxWidthMap[size]}
      fullWidth={fullWidth}
      {...props}
    >
      {/* Modal Header */}
      {title && (
        <StyledDialogTitle>
          <span>{title}</span>
          {showCloseButton && (
            <CloseButton
              aria-label="close"
              onClick={onClose}
              size="small"
            >
              <CloseIcon />
            </CloseButton>
          )}
        </StyledDialogTitle>
      )}

      {/* Modal Toolbar (if toolbar actions provided) */}
      {toolbarActions && toolbarActions.length > 0 && (
        <ModalToolbar>
          {toolbarActions.map((action, index) => (
            <StyledButton
              key={index}
              variant={action.variant || 'outlined'}
              color={action.color || 'secondary'}
              onClick={action.onClick}
              disabled={action.disabled}
              size="small"
            >
              {action.label}
            </StyledButton>
          ))}
        </ModalToolbar>
      )}

      {/* Modal Content */}
      <StyledDialogContent dividers={false}>
        {children}
      </StyledDialogContent>

      {/* Modal Actions */}
      {hasActions && (
        <StyledDialogActions>
          {secondaryAction && (
            <StyledButton
              variant={secondaryAction.variant || 'outlined'}
              color={secondaryAction.color || 'secondary'}
              onClick={secondaryAction.onClick}
              disabled={secondaryAction.disabled}
            >
              {secondaryAction.label}
            </StyledButton>
          )}
          {primaryAction && (
            <StyledButton
              variant={primaryAction.variant || 'contained'}
              color={primaryAction.color || 'primary'}
              onClick={primaryAction.onClick}
              disabled={primaryAction.disabled}
            >
              {primaryAction.label}
            </StyledButton>
          )}
        </StyledDialogActions>
      )}
    </StyledDialog>
  );
};

export default Modal;
