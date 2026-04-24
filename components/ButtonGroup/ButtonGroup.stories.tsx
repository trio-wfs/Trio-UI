import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ButtonGroup } from './ButtonGroup';

const meta: Meta<typeof ButtonGroup> = {
  title: 'Components/ButtonGroup',
  component: ButtonGroup,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['contained', 'outline'] },
    size: { control: 'select', options: ['small', 'medium'] },
    color: { control: 'select', options: ['primary', 'secondary'] },
    orientation: { control: 'select', options: ['horizontal', 'vertical'] },
    fullWidth: { control: 'boolean' },
  },
  args: {
    variant: 'contained',
    size: 'small',
    color: 'secondary',
    orientation: 'horizontal',
    buttons: ['Day', 'Week', 'Month'],
    fullWidth: false,
  },
};

export default meta;
type Story = StoryObj<typeof ButtonGroup>;

export const Default: Story = {};

export const ContainedMedium: Story = {
  args: { variant: 'contained', size: 'medium', color: 'secondary', buttons: ['Active', 'Pending', 'Archived'] },
};

export const OutlinePrimary: Story = {
  args: { variant: 'outline', size: 'small', color: 'primary', buttons: ['Day', 'Week', 'Month'] },
};

export const OutlinePrimaryMedium: Story = {
  args: { variant: 'outline', size: 'medium', color: 'primary', buttons: ['Day', 'Week', 'Month'] },
};

export const Vertical: Story = {
  args: { orientation: 'vertical', buttons: ['Option A', 'Option B', 'Option C'] },
};

export const VerticalOutline: Story = {
  args: { orientation: 'vertical', variant: 'outline', color: 'primary', buttons: ['Option A', 'Option B', 'Option C'] },
};

export const Interactive: Story = {
  render: () => {
    const labels = ['Day', 'Week', 'Month', 'Year'];
    const [active, setActive] = useState(0);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <ButtonGroup
          variant="contained"
          size="small"
          color="secondary"
          buttons={labels}
          onButtonClick={labels.map((_, i) => () => setActive(i))}
        />
        <div style={{ fontFamily: 'Roboto', fontSize: 14, color: '#212121' }}>
          Selected: <strong>{labels[active]}</strong>
        </div>
      </div>
    );
  },
};

export const Matrix: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <div style={{ fontFamily: 'Roboto', fontSize: 12, color: 'rgba(0,0,0,0.6)', marginBottom: 8 }}>CONTAINED / SECONDARY / SM</div>
        <ButtonGroup variant="contained" size="small" color="secondary" buttons={['Button', 'Button', 'Button']} />
      </div>
      <div>
        <div style={{ fontFamily: 'Roboto', fontSize: 12, color: 'rgba(0,0,0,0.6)', marginBottom: 8 }}>CONTAINED / SECONDARY / MD</div>
        <ButtonGroup variant="contained" size="medium" color="secondary" buttons={['Button', 'Button', 'Button']} />
      </div>
      <div>
        <div style={{ fontFamily: 'Roboto', fontSize: 12, color: 'rgba(0,0,0,0.6)', marginBottom: 8 }}>OUTLINE / PRIMARY / SM</div>
        <ButtonGroup variant="outline" size="small" color="primary" buttons={['Button', 'Button', 'Button']} />
      </div>
      <div>
        <div style={{ fontFamily: 'Roboto', fontSize: 12, color: 'rgba(0,0,0,0.6)', marginBottom: 8 }}>OUTLINE / PRIMARY / MD</div>
        <ButtonGroup variant="outline" size="medium" color="primary" buttons={['Button', 'Button', 'Button']} />
      </div>
    </div>
  ),
};
