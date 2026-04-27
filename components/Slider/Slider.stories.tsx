import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Box, Typography } from '@mui/material';
import { Slider } from './Slider';

const meta: Meta<typeof Slider> = {
  title: 'Components/Slider',
  component: Slider,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['small', 'medium'] },
    disabled: { control: 'boolean' },
    valueLabelDisplay: { control: 'select', options: ['auto', 'on', 'off'] },
    min: { control: 'number' },
    max: { control: 'number' },
    step: { control: 'number' },
    marks: { control: 'boolean' },
  },
  args: {
    size: 'medium',
    disabled: false,
    min: 0,
    max: 100,
    step: 1,
    marks: false,
    valueLabelDisplay: 'off',
  },
  decorators: [
    (Story) => (
      <Box sx={{ width: 320, px: 2, pt: 4 }}>
        <Story />
      </Box>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Slider>;

/** Default uncontrolled slider at 0. */
export const Default: Story = {};

/** Slider with a preset controlled value. */
export const WithValue: Story = {
  args: { value: 40 },
};

/** Range slider — pass two-element array as value. */
export const Range: Story = {
  args: { value: [20, 60] },
};

/** Automatic marks at every step increment. */
export const WithMarks: Story = {
  args: {
    value: 50,
    marks: true,
    step: 10,
  },
};

/** Custom mark labels at specific positions. */
export const CustomMarks: Story = {
  args: {
    value: 50,
    marks: [
      { value: 0, label: '0°C' },
      { value: 25, label: '25°C' },
      { value: 50, label: '50°C' },
      { value: 75, label: '75°C' },
      { value: 100, label: '100°C' },
    ],
  },
};

/** Disabled state — not interactive. */
export const Disabled: Story = {
  args: { value: 30, disabled: true },
};

/** Small size variant — thinner track, smaller thumb. */
export const Small: Story = {
  args: { size: 'small', value: 50 },
};

/** Value label always visible above the thumb. */
export const WithValueLabel: Story = {
  args: { value: 70, valueLabelDisplay: 'on' },
};

/** Value label appears on hover/focus. */
export const ValueLabelAuto: Story = {
  args: { value: 70, valueLabelDisplay: 'auto' },
};

/** Fully interactive — demonstrates controlled state with live readout. */
export const Interactive: Story = {
  render: () => {
    const [value, setValue] = useState<number>(30);
    return (
      <Box sx={{ width: 320, px: 2, pt: 4 }}>
        <Typography variant="body2" sx={{ mb: 1, color: 'text.secondary', fontFamily: 'Roboto, sans-serif' }}>
          Value: {value}
        </Typography>
        <Slider
          value={value}
          onChange={(_e, v) => setValue(v as number)}
          valueLabelDisplay="auto"
        />
      </Box>
    );
  },
};

/** Interactive range slider with live readout. */
export const InteractiveRange: Story = {
  render: () => {
    const [range, setRange] = useState<number[]>([20, 80]);
    return (
      <Box sx={{ width: 320, px: 2, pt: 4 }}>
        <Typography variant="body2" sx={{ mb: 1, color: 'text.secondary', fontFamily: 'Roboto, sans-serif' }}>
          Range: {range[0]} – {range[1]}
        </Typography>
        <Slider
          value={range}
          onChange={(_e, v) => setRange(v as number[])}
          valueLabelDisplay="auto"
        />
      </Box>
    );
  },
};
