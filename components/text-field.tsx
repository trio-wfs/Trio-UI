import React, { useState } from 'react';
import {
  TextField as MuiTextField,
  Box,
  FormHelperText,
  InputAdornment,
} from '@mui/material';

export type TextFieldType = 'single-line' | 'multi-line';
export type TextFieldState = 'default' | 'error' | 'focus';
export type TextFieldDisabled = 'no' | 'yes';

export interface TextFieldProps {
  // VARIANT properties (from Figma spec)
  type?: TextFieldType;
  state?: TextFieldState;
  disabled?: TextFieldDisabled;

  // BOOLEAN properties (from Figma spec)
  label?: boolean;
  helpText?: boolean;
  iconRight?: boolean;
  iconSupport?: boolean;
  inputFill?: boolean;
  chipContent?: boolean;
  adormentInput?: boolean;

  // TEXT properties (from Figma spec)
  placeholderLabel?: string;
  inputContent?: string;

  // Additional helpers for actual usage
  onChange?: (value: string) => void;
  value?: string;
  labelText?: string;
  helperText?: string;
  rightIcon?: React.ReactNode;
  supportIcon?: React.ReactNode;
}

export const TextField: React.FC<TextFieldProps> = ({
  type = 'single-line',
  state = 'default',
  disabled = 'no',
  label = true,
  helpText = false,
  iconRight = false,
  iconSupport = false,
  inputFill = false,
  chipContent = false,
  adormentInput = false,
  placeholderLabel = 'Placeholder',
  inputContent = '',
  onChange,
  value,
  labelText = 'Label',
  helperText = 'Help text',
  rightIcon = null,
  supportIcon = null,
}) => {
  const [internalValue, setInternalValue] = useState(inputContent);
  const isDisabled = disabled === 'yes';
  const hasError = state === 'error';
  const isFocused = state === 'focus';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setInternalValue(newValue);
    if (onChange) onChange(newValue);
  };

  // Border colors extracted from Figma
  const borderColorMap: Record<TextFieldState, string> = {
    default: '#9E9E9E', // Gray
    error: '#DB4537',   // Red
    focus: '#64B5F6',   // Light blue
  };

  const borderColor = borderColorMap[state];

  // Extracted dimensions from Figma
  const height = type === 'single-line' ? '36px' : '90px';
  const padding = '4px 8px'; // top/bottom=4px, left/right=8px

  // Styling following AHTG design system
  const textFieldSx = {
    width: '100%',
    '& .MuiOutlinedInput-root': {
      height,
      padding,
      backgroundColor: inputFill ? '#FAFAFA' : '#FFFFFF',
      borderRadius: '4px',
      fontFamily: "'Roboto', sans-serif",
      fontSize: '14px',
      transition: 'border-color 0.2s',
      '& fieldset': {
        borderColor,
        borderWidth: '1px',
      },
      '&:hover fieldset': {
        borderColor: isFocused ? borderColor : '#757575',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#64B5F6',
        borderWidth: '2px',
      },
      '&.Mui-disabled': {
        backgroundColor: '#EEEEEE',
        '& fieldset': {
          borderColor: '#E0E0E0',
        },
        '& input': {
          color: '#9E9E9E',
        },
      },
    },
    '& .MuiOutlinedInput-input': {
      color: '#212121',
      fontSize: '14px',
      fontWeight: 400,
      lineHeight: '20px',
      '&::placeholder': {
        color: '#9E9E9E',
        opacity: 1,
      },
    },
    '& .MuiFormLabel-root': {
      fontSize: '12px',
      fontWeight: 500,
      color: '#212121',
      marginBottom: '8px',
      transform: 'none',
      position: 'relative',
      '&.Mui-focused': {
        color: '#2196F3',
      },
      '&.Mui-error': {
        color: '#DB4537',
      },
    },
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {/* Label */}
      {label && (
        <label
          style={{
            fontSize: '12px',
            fontWeight: 500,
            color: '#212121',
            fontFamily: "'Roboto', sans-serif",
          }}
        >
          {labelText}
        </label>
      )}

      {/* Text Field */}
      <MuiTextField
        multiline={type === 'multi-line'}
        rows={type === 'multi-line' ? 4 : 1}
        placeholder={placeholderLabel}
        value={value !== undefined ? value : internalValue}
        onChange={handleChange}
        disabled={isDisabled}
        error={hasError}
        variant="outlined"
        size="small"
        sx={textFieldSx}
        InputProps={{
          startAdornment: adormentInput ? (
            <InputAdornment position="start">
              {supportIcon || <span style={{ fontSize: '18px' }}>📎</span>}
            </InputAdornment>
          ) : undefined,
          endAdornment: iconRight ? (
            <InputAdornment position="end">
              {rightIcon || <span style={{ fontSize: '18px' }}>✓</span>}
            </InputAdornment>
          ) : undefined,
        }}
      />

      {/* Help Text */}
      {helpText && (
        <FormHelperText
          sx={{
            fontSize: '12px',
            color: hasError ? '#DB4537' : '#757575',
            margin: '0px',
            fontFamily: "'Roboto', sans-serif",
          }}
        >
          {helperText}
        </FormHelperText>
      )}

      {/* Chip Content (if enabled) */}
      {chipContent && (
        <Box
          sx={{
            display: 'inline-flex',
            gap: '4px',
            flexWrap: 'wrap',
            padding: '8px 0px',
          }}
        >
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              padding: '4px 8px',
              backgroundColor: '#E3F2FD',
              borderRadius: '4px',
              fontSize: '12px',
              color: '#2196F3',
              fontFamily: "'Roboto', sans-serif",
            }}
          >
            Chip
            <button
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '16px',
                padding: '0px',
                color: '#2196F3',
              }}
            >
              ✕
            </button>
          </span>
        </Box>
      )}
    </Box>
  );
};

export default TextField;
