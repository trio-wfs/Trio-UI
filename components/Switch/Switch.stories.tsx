import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from './Switch';

const meta: Meta<typeof Switch> = {
  title: 'Components/Switch',
  component: Switch,
  tags: ['autodocs'],
  argTypes: {
    state: { control: 'select', options: ['off', 'on'] },
    labelPlacement: { control: 'select', options: ['left', 'right', 'top'] },
    disabled: { control: 'boolean' },
    checked: { control: 'boolean' },
    label: { control: 'text' },
  },
  args: {
    labelPlacement: 'right',
    disabled: false,
    label: 'Enable notifications',
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {};

export const On: Story = {
  args: { checked: true },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const DisabledOn: Story = {
  args: { disabled: true, checked: true },
};

export const LabelLeft: Story = {
  args: { labelPlacement: 'left' },
};

export const LabelTop: Story = {
  args: { labelPlacement: 'top' },
};

export const NoLabel: Story = {
  args: { label: undefined },
};

export const Interactive: Story = {
  render: () => {
    const [on, setOn] = useState(false);
    return (
      <Switch
        checked={on}
        onChange={(e) => setOn(e.target.checked)}
        label={on ? 'On' : 'Off'}
      />
    );
  },
};

export const Matrix: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 8 }}>
      <Switch label="Off" />
      <Switch label="On" checked />
      <Switch label="Disabled off" disabled />
      <Switch label="Disabled on" disabled checked />
    </div>
  ),
};
