import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ButtonGroup } from './ButtonGroup';

const meta: Meta<typeof ButtonGroup> = {
  title: 'Components/ButtonGroup',
  component: ButtonGroup,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['contained', 'outline'] },
    size: { control: 'select', options: ['sm', 'md'] },
    color: { control: 'select', options: ['primary', 'secondary'] },
    orientation: { control: 'select', options: ['horizontal', 'vertical'] },
    fullWidth: { control: 'boolean' },
  },
  args: {
    variant: 'outline',
    size: 'sm',
    color: 'secondary',
    orientation: 'horizontal',
    buttons: ['Day', 'Week', 'Month'],
    fullWidth: false,
  },
};

export default meta;
type Story = StoryObj<typeof ButtonGroup>;

export const Default: Story = {};

export const Contained: Story = {
  args: { variant: 'contained', color: 'primary', buttons: ['Save', 'Save & Close', 'Cancel'] },
};

export const MediumSize: Story = {
  args: { size: 'md', buttons: ['Active', 'Pending', 'Archived'] },
};

export const Vertical: Story = {
  args: { orientation: 'vertical', buttons: ['Option A', 'Option B', 'Option C'] },
};

export const Interactive: Story = {
  render: () => {
    const labels = ['Day', 'Week', 'Month', 'Year'];
    const [active, setActive] = useState(0);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <ButtonGroup
          variant="outline"
          size="sm"
          buttons={labels}
          onButtonClick={labels.map((_, i) => () => setActive(i))}
          disabledButtons={labels.map((_, i) => i === active)}
        />
        <div style={{ fontFamily: 'Roboto', fontSize: 14, color: '#212121' }}>
          Selected: <strong>{labels[active]}</strong>
        </div>
      </div>
    );
  },
};
