import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

/**
 * Chip Component - Atomic UI Component
 * 
 * Chips help people enter information, make selections, filter content, or trigger actions
 * 
 * Figma Node: 1512-8352
 * 
 * @param {ChipProps} props - Component properties
 * @returns {JSX.Element} Chip component
 */

export type ChipSize = 'sm' | 'md';
export type ChipColor = 'default' | 'primary' | 'error' | 'info' | 'warning' | 'success';
export type ChipVariant = 'contained' | 'outline';
export type ChipState = 'default' | 'hover' | 'focus' | 'disabled';

export interface ChipProps {
  /** Label text displayed in the chip */
  label: string;
  /** Size variant - sm (24px) or md (32px) */
  size?: ChipSize;
  /** Color variant - matches design system semantic colors */
  color?: ChipColor;
  /** Visual variant - contained or outline */
  variant?: ChipVariant;
  /** Disabled state */
  disabled?: boolean;
  /** Show left icon (check) */
  iconLeft?: boolean;
  /** Show right icon (close/delete) */
  iconRight?: boolean;
  /** Click handler for delete button */
  onDelete?: () => void;
  /** Click handler for chip */
  onClick?: () => void;
  /** Additional CSS class */
  className?: string;
}

// Color mappings from palette.json - design tokens ONLY
const colorMap = {
  default: {
    contained: {
      background: '#F5F5F5', // secondary/100
      text: '#616161', // secondary/700
      border: '#E0E0E0', // secondary/300
    },
    outline: {
      background: 'transparent',
      text: '#616161', // secondary/700
      border: '#E0E0E0', // secondary/300
    },
  },
  primary: {
    contained: {
      background: '#2196F3', // primary/500
      text: '#FFFFFF', // base.white
      border: '#2196F3',
    },
    outline: {
      background: 'transparent',
      text: '#2196F3', // primary/500
      border: '#2196F3',
    },
  },
  error: {
    contained: {
      background: '#DB4537', // error/500
      text: '#FFFFFF', // base.white
      border: '#DB4537',
    },
    outline: {
      background: 'transparent',
      text: '#DB4537', // error/500
      border: '#DB4537',
    },
  },
  info: {
    contained: {
      background: '#5BBFDE', // info/500
      text: '#FFFFFF', // base.white
      border: '#5BBFDE',
    },
    outline: {
      background: 'transparent',
      text: '#5BBFDE', // info/500
      border: '#5BBFDE',
    },
  },
  warning: {
    contained: {
      background: '#E17109', // warning/700
      text: '#FFFFFF', // base.white
      border: '#E17109',
    },
    outline: {
      background: 'transparent',
      text: '#E17109', // warning/700
      border: '#E17109',
    },
  },
  success: {
    contained: {
      background: '#4CAF50', // success/500
      text: '#FFFFFF', // base.white
      border: '#4CAF50',
    },
    outline: {
      background: 'transparent',
      text: '#4CAF50', // success/500
      border: '#4CAF50',
    },
  },
};

// Hover/focus state colors (alpha overlays from palette.json)
const stateOverlays = {
  primary: 'rgba(33, 150, 243, 0.08)', // primary hover state
  error: 'rgba(219, 69, 55, 0.08)', // error hover state
  info: 'rgba(91, 191, 222, 0.08)', // info hover state
  warning: 'rgba(225, 113, 9, 0.08)', // warning hover state
  success: 'rgba(76, 175, 80, 0.08)', // success hover state
  default: 'rgba(0, 0, 0, 0.04)', // action/hover
};

const ChipWrapper = styled(Box, {
  shouldForwardProp: (prop) =>
    !['size', 'chipColor', 'variant', 'disabled', 'clickable'].includes(prop as string),
})<{
  size: ChipSize;
  chipColor: ChipColor;
  variant: ChipVariant;
  disabled: boolean;
  clickable: boolean;
}>(({ size, chipColor, variant, disabled, clickable }) => {
  const colors = colorMap[chipColor][variant];
  const height = size === 'sm' ? 24 : 32;

  return {
    display: 'inline-flex',
    alignItems: 'center',
    height: `${height}px`,
    padding: 0,
    position: 'relative',
    cursor: clickable && !disabled ? 'pointer' : 'default',
    userSelect: 'none',
  };
});

const ChipContainer = styled(Box, {
  shouldForwardProp: (prop) =>
    !['size', 'chipColor', 'variant', 'disabled'].includes(prop as string),
})<{
  size: ChipSize;
  chipColor: ChipColor;
  variant: ChipVariant;
  disabled: boolean;
}>(({ size, chipColor, variant, disabled }) => {
  const colors = colorMap[chipColor][variant];
  const borderWidth = variant === 'outline' ? '1px' : '0px';

  return {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    padding: '4px',
    borderRadius: '999px',
    backgroundColor: disabled ? '#EEEEEE' : colors.background, // action/disabledBackground
    border: `${borderWidth} solid ${disabled ? '#E0E0E0' : colors.border}`,
    transition: 'background-color 0.2s',
    '&:hover': !disabled && {
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: '999px',
        backgroundColor: stateOverlays[chipColor],
        pointerEvents: 'none',
      },
    },
  };
});

const ChipLabel = styled(Box)<{
  size: ChipSize;
  chipColor: ChipColor;
  variant: ChipVariant;
  disabled: boolean;
}>(({ chipColor, variant, disabled }) => {
  const colors = colorMap[chipColor][variant];

  return {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    paddingLeft: 0,
    paddingRight: 0,
  };
});

const ChipText = styled(Typography)<{
  chipColor: ChipColor;
  variant: ChipVariant;
  disabled: boolean;
}>(({ chipColor, variant, disabled }) => {
  const colors = colorMap[chipColor][variant];

  return {
    fontFamily: 'Roboto, sans-serif',
    fontSize: '12px',
    fontWeight: 400,
    lineHeight: '12px',
    letterSpacing: '0px',
    color: disabled ? '#9E9E9E' : colors.text, // text/disabled
    whiteSpace: 'nowrap',
  };
});

const IconWrapper = styled(Box)<{ size: ChipSize; position: 'left' | 'right' }>(
  ({ size, position }) => {
    // Left icon is always 16px, right icon is 24px for md, 16px for sm
    const iconSize = position === 'left' ? 16 : size === 'md' ? 24 : 16;

    return {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: `${iconSize}px`,
      height: `${iconSize}px`,
      flexShrink: 0,
      '& .MuiSvgIcon-root': {
        fontSize: `${iconSize}px`,
      },
    };
  }
);

export const Chip: React.FC<ChipProps> = ({
  label,
  size = 'md',
  color = 'default',
  variant = 'contained',
  disabled = false,
  iconLeft = false,
  iconRight = false,
  onDelete,
  onClick,
  className,
}) => {
  const colors = colorMap[color][variant];
  const iconColor = disabled ? '#9E9E9E' : colors.text;
  const clickable = !!(onClick || onDelete);

  const handleDelete = (e: React.MouseEvent) => {
    if (disabled) return;
    e.stopPropagation();
    onDelete?.();
  };

  const handleClick = () => {
    if (disabled) return;
    onClick?.();
  };

  return (
    <ChipWrapper
      size={size}
      chipColor={color}
      variant={variant}
      disabled={disabled}
      clickable={clickable}
      onClick={handleClick}
      className={className}
    >
      <ChipContainer size={size} chipColor={color} variant={variant} disabled={disabled}>
        <ChipLabel size={size} chipColor={color} variant={variant} disabled={disabled}>
          {iconLeft && (
            <IconWrapper size={size} position="left">
              <CheckIcon sx={{ color: iconColor }} />
            </IconWrapper>
          )}

          <ChipText chipColor={color} variant={variant} disabled={disabled}>
            {label}
          </ChipText>

          {iconRight && (
            <IconWrapper
              size={size}
              position="right"
              onClick={handleDelete}
              sx={{
                cursor: disabled ? 'default' : 'pointer',
              }}
            >
              <CloseIcon sx={{ color: iconColor }} />
            </IconWrapper>
          )}
        </ChipLabel>
      </ChipContainer>
    </ChipWrapper>
  );
};

export default Chip;
