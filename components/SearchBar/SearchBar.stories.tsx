import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SearchBar } from './SearchBar';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

const meta: Meta<typeof SearchBar> = {
  title: 'Components/SearchBar',
  component: SearchBar,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['small', 'medium'] },
    type: { control: 'select', options: ['left', 'right'] },
    disabled: { control: 'boolean' },
    placeholder: { control: 'text' },
    supportCopy: { control: 'text' },
    showIcon: { control: 'boolean' },
  },
  args: {
    size: 'medium',
    type: 'left',
    placeholder: 'Placeholder',
    disabled: false,
    showIcon: true,
  },
};

export default meta;
type Story = StoryObj<typeof SearchBar>;

// Left button — Medium
export const LeftMedium: Story = {
  name: 'Left — Medium',
};

// Left button — Small
export const LeftSmall: Story = {
  name: 'Left — Small',
  args: { size: 'small' },
};

// Right button — Medium
export const RightMedium: Story = {
  name: 'Right — Medium',
  args: { type: 'right' },
};

// Right button — Small
export const RightSmall: Story = {
  name: 'Right — Small',
  args: { type: 'right', size: 'small' },
};

// Disabled
export const Disabled: Story = {
  args: { disabled: true },
};

// Custom label
export const SearchLabel: Story = {
  name: 'Custom Label — "Search"',
  args: { supportCopy: 'Search', placeholder: 'Search orders, workers…' },
};

// As download trigger
export const DownloadTrigger: Story = {
  name: 'As Download Trigger',
  args: {
    supportCopy: 'Download',
    type: 'right',
    icon: <FileDownloadIcon />,
    placeholder: 'Enter filename…',
  },
};

// Interactive
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
          placeholder="Type and hit Enter or click the button"
          supportCopy="Go"
        />
        <div style={{ fontFamily: 'Roboto', fontSize: 14, color: '#212121' }}>
          {lastSearch ? <>Last search: <strong>{lastSearch}</strong></> : 'No search yet'}
        </div>
      </div>
    );
  },
};
