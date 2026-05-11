import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Chip } from './Chip';

const icon = (name: string) => (
  <span className="material-icons-outlined" style={{ fontSize: 16 }}>{name}</span>
);

const meta: Meta<typeof Chip> = {
  title: 'Components/Chip',
  component: Chip,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['small', 'medium'] },
    color: { control: 'select', options: ['default', 'primary', 'error', 'info', 'warning', 'success'] },
    variant: { control: 'select', options: ['contained', 'outline'] },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
  },
  args: {
    size: 'medium',
    color: 'default',
    variant: 'contained',
    disabled: false,
    label: 'Label',
  },
};

export default meta;
type Story = StoryObj<typeof Chip>;

export const Default: Story = {};

export const Primary: Story = {
  args: { color: 'primary' },
};

export const Outlined: Story = {
  args: { variant: 'outline', color: 'primary' },
};

export const Small: Story = {
  args: { size: 'small' },
};

export const WithLeadingIcon: Story = {
  args: { color: 'success', iconLeft: icon('check'), label: 'Verified' },
};

export const Deletable: Story = {
  args: { color: 'primary', iconRight: icon('close'), label: 'Remove me' },
};

/**
 * Wires the X icon to `onDelete`. Click the X on any chip to remove it from
 * the list. This is the canonical chip-as-filter / chip-as-tag pattern.
 */
export const InteractiveDeletable: Story = {
  render: () => {
    const [items, setItems] = useState([
      { id: 'icu', label: 'ICU' },
      { id: 'er', label: 'Emergency Dept' },
      { id: 'orth', label: 'Orthopedics' },
      { id: 'peds', label: 'Pediatrics' },
    ]);
    return (
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', maxWidth: 480 }}>
        {items.length === 0 && (
          <span style={{ fontSize: 13, color: '#9E9E9E' }}>
            All chips deleted — refresh the story to reset.
          </span>
        )}
        {items.map((item) => (
          <Chip
            key={item.id}
            color="primary"
            variant="outline"
            label={item.label}
            iconRight={icon('close')}
            onDelete={() => setItems((prev) => prev.filter((c) => c.id !== item.id))}
          />
        ))}
      </div>
    );
  },
};

export const Disabled: Story = {
  args: { disabled: true, label: 'Disabled' },
};

export const AllColorsContained: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      {(['default', 'primary', 'error', 'info', 'warning', 'success'] as const).map((color) => (
        <Chip key={color} color={color} label={color} />
      ))}
    </div>
  ),
};

export const AllColorsOutline: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      {(['default', 'primary', 'error', 'info', 'warning', 'success'] as const).map((color) => (
        <Chip key={color} color={color} variant="outline" label={color} />
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <Chip color="primary" size="medium" label="Medium (32px)" />
      <Chip color="primary" size="small" label="Small (24px)" />
    </div>
  ),
};
