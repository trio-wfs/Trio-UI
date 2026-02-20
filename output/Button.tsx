import React from 'react';
import { Button as MUIButton, ButtonProps as MUIButtonProps } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Custom theme with primary color #2196F3
const theme = createTheme({
  palette: {
    primary: {
      main: '#2196F3',
    },
  },
});

// Define custom size and variant types
type CustomSize = 'sm' | 'md';
type CustomVariant = 'contained' | 'outlined';

interface ButtonProps extends Omit<MUIButtonProps, 'size' | 'variant'> {
  size?: CustomSize;
  variant?: CustomVariant;
  children: React.ReactNode;
}

// Map custom sizes to MUI sizes
const sizeMap: Record<CustomSize, MUIButtonProps['size']> = {
  sm: 'small',
  md: 'medium',
};

const Button: React.FC<ButtonProps> = ({
  size = 'md',
  variant = 'contained',
  children,
  ...props
}) => {
  return (
    <ThemeProvider theme={theme}>
      <MUIButton
        variant={variant}
        size={sizeMap[size]}
        color="primary"
        {...props}
      >
        {children}
      </MUIButton>
    </ThemeProvider>
  );
};

export default Button;
