import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SearchBar } from './SearchBar';

const meta: Meta<typeof SearchBar> = {
  title: 'Components/SearchBar',
  component: SearchBar,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['Small', 'Medium', 'Large'] },
    type: { control: 'select', options: ['Left', 'Right', 'Both'] },
    disabled: { control: 'boolean' },
    placeholder: { control: 'text' },
  },
  args: {
    size: 'Medium',
    type: 'Left',
    placeholder: 'Search orders, workers, credentials…',
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof SearchBar>;

export const Default: Story = {};

export const RightButton: Story = {
  args: { type: 'Right' },
};

export const BothButtons: Story = {
  args: { type: 'Both' },
};

export const Small: Story = {
  args: { size: 'Small' },
};

export const Large: Story = {
  args: { size: 'Large' },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const Interactive: Story = {
  render: () => {
    const [value, setValue] = useState('');
    const [lastSearch, setLastSearch] = useState<string | null>(null);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <SearchBar
          value={value}
          onChange={setValue}
          onSearch={() => setLastSearch(value)}
          placeholder="Type and hit Enter or click the icon"
        />
        <div style={{ fontFamily: 'Roboto', fontSize: 14, color: '#212121' }}>
          {lastSearch ? <>Last search: <strong>{lastSearch}</strong></> : 'No search yet'}
        </div>
      </div>
    );
  },
};
