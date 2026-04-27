/**
 * Slider Component
 *
 * SOURCE OF TRUTH: Figma component "Slider" (node: 2060:6895)
 * Design System: AHTG Desktop SaaS
 *
 * Wraps MUI Slider with TRIO design tokens:
 * - Track (filled): primary.main #2196F3
 * - Rail (unfilled): background.default #F5F5F5
 * - Track / rail height: 4px, border-radius: 4px
 * - Thumb: circular, primary.main, 20px (medium) / 16px (small)
 * - Hover ripple uses primary.main at 8% opacity
 */

import React from 'react';
import { Slider as MuiSlider } from '@mui/material';
import { SliderProps, defaultSliderProps } from './Slider.types';

export const Slider = React.forwardRef<HTMLSpanElement, SliderProps>(({
  size = defaultSliderProps.size,
  disabled = defaultSliderProps.disabled,
  min = defaultSliderProps.min,
  max = defaultSliderProps.max,
  step = defaultSliderProps.step,
  marks = defaultSliderProps.marks,
  valueLabelDisplay = defaultSliderProps.valueLabelDisplay,
  value,
  onChange,
  className,
  name,
  id,
}, ref) => {
  return (
    <MuiSlider
      ref={ref}
      size={size}
      disabled={disabled}
      min={min}
      max={max}
      step={step}
      marks={marks}
      valueLabelDisplay={valueLabelDisplay}
      value={value}
      onChange={onChange}
      className={className}
      name={name}
      id={id}
      sx={{
        // Track (filled portion)
        '& .MuiSlider-track': {
          height: 4,
          borderRadius: '4px',
          backgroundColor: 'primary.main',
          border: 'none',
        },
        // Rail (unfilled portion)
        '& .MuiSlider-rail': {
          height: 4,
          borderRadius: '4px',
          backgroundColor: '#F5F5F5',
          opacity: 1,
          border: '1px solid #E0E0E0',
        },
        // Thumb
        '& .MuiSlider-thumb': {
          width: size === 'small' ? 16 : 20,
          height: size === 'small' ? 16 : 20,
          backgroundColor: 'primary.main',
          border: '2px solid',
          borderColor: 'primary.main',
          '&:hover': {
            boxShadow: '0 0 0 8px rgba(33, 150, 243, 0.08)',
          },
          '&.Mui-focusVisible': {
            boxShadow: '0 0 0 8px rgba(33, 150, 243, 0.16)',
          },
          '&.Mui-active': {
            boxShadow: '0 0 0 14px rgba(33, 150, 243, 0.16)',
          },
        },
        // Value label
        '& .MuiSlider-valueLabel': {
          backgroundColor: 'primary.main',
          borderRadius: '4px',
          fontSize: 12,
          fontFamily: 'Roboto, sans-serif',
          fontWeight: 400,
          padding: '4px 8px',
        },
        // Mark labels
        '& .MuiSlider-markLabel': {
          fontSize: 12,
          fontFamily: 'Roboto, sans-serif',
          color: 'text.secondary',
        },
        // Mark dots
        '& .MuiSlider-mark': {
          backgroundColor: '#E0E0E0',
          '&.MuiSlider-markActive': {
            backgroundColor: '#FFFFFF',
            opacity: 1,
          },
        },
        // Disabled state
        '&.Mui-disabled': {
          '& .MuiSlider-track': {
            backgroundColor: 'action.disabled',
          },
          '& .MuiSlider-thumb': {
            backgroundColor: 'action.disabled',
            borderColor: 'action.disabled',
          },
        },
      }}
    />
  );
});

Slider.displayName = 'Slider';

export default Slider;
