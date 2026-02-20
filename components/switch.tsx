import React from 'react';
import { styled } from '@mui/material/styles';
import MuiSwitch, { SwitchProps as MuiSwitchProps } from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';

/**
 * Switch Component
 * Based on Figma component: Document / Switch / Switch / Switch
 * Component ID: 2433:9802
 * 
 * Design tokens used:
 * - Colors: primary.main (#2196F3), action.disabledBackground (#EEEEEE)
 * - Spacing: sm (8px), xs (4px)
 */

export interface SwitchComponentProps extends Omit<MuiSwitchProps, 'disabled'> {
  /** Label text for the switch */
  label?: string;
  /** Label placement relative to switch */
  labelPlacement?: 'left' | 'right' | 'top';
  /** Disabled state */
  disabled?: boolean;
  /** Checked state (controlled) */
  checked?: boolean;
  /** Default checked state (uncontrolled) */
  defaultChecked?: boolean;
  /** Change handler */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
}

const StyledSwitch = styled(MuiSwitch)(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: '#2196F3', // primary.main
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        backgroundColor: '#EEEEEE', // action.disabledBackground
        opacity: 1,
      },
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      backgroundColor: '#EEEEEE', // action.disabledBackground
      opacity: 1,
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color: '#fff',
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: '#fff', // base.white
    border: '1px solid #9E9E9E', // text.disabled
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));

/**
 * Switch component for toggling boolean states
 * 
 * Variants (from Figma):
 * - state: on, off
 * - label-placement: left, right, top
 * - disabled: yes, no
 * 
 * @example
 * ```tsx
 * <SwitchComponent 
 *   label="Enable notifications"
 *   labelPlacement="right"
 *   checked={enabled}
 *   onChange={(e, checked) => setEnabled(checked)}
 * />
 * ```
 */
export const SwitchComponent: React.FC<SwitchComponentProps> = ({
  label,
  labelPlacement = 'right',
  disabled = false,
  checked,
  defaultChecked,
  onChange,
  ...props
}) => {
  const switchElement = (
    <StyledSwitch
      checked={checked}
      defaultChecked={defaultChecked}
      disabled={disabled}
      onChange={onChange}
      {...props}
    />
  );

  if (!label) {
    return switchElement;
  }

  return (
    <FormGroup>
      <FormControlLabel
        control={switchElement}
        label={label}
        labelPlacement={labelPlacement}
        disabled={disabled}
        sx={{
          margin: 0,
          ...(labelPlacement === 'top' && {
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px', // xs spacing
          }),
        }}
      />
    </FormGroup>
  );
};

export default SwitchComponent;
