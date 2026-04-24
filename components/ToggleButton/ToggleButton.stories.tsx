import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ToggleButton } from './ToggleButton';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ViewComfyIcon from '@mui/icons-material/ViewComfy';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';

const meta: Meta<typeof ToggleButton> = {
  title: 'Components/ToggleButton',
  component: ToggleButton,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['small', 'medium'] },
  },
};

export default meta;
type Story = StoryObj<typeof ToggleButton>;

export const Default: Story = {
  render: () => {
    const [active, setActive] = useState(0);
    const options = [
      { icon: <ViewListIcon />, label: 'List' },
      { icon: <ViewModuleIcon />, label: 'Grid' },
      { icon: <ViewComfyIcon />, label: 'Dense' },
    ];
    return (
      <ToggleButton
        size="small"
        buttons={options.map((opt, i) => ({
          icon: opt.icon,
          'aria-label': opt.label,
          active: i === active,
          onClick: () => setActive(i),
        }))}
      />
    );
  },
};

export const MediumSize: Story = {
  render: () => {
    const [active, setActive] = useState(1);
    const options = [
      { icon: <ViewListIcon />, label: 'List' },
      { icon: <ViewModuleIcon />, label: 'Grid' },
      { icon: <ViewComfyIcon />, label: 'Dense' },
    ];
    return (
      <ToggleButton
        size="medium"
        buttons={options.map((opt, i) => ({
          icon: opt.icon,
          'aria-label': opt.label,
          active: i === active,
          onClick: () => setActive(i),
        }))}
      />
    );
  },
};

export const FilterToggle: Story = {
  render: () => {
    const [filtered, setFiltered] = useState(false);
    return (
      <ToggleButton
        size="small"
        buttons={[
          {
            icon: filtered ? <FilterAltIcon /> : <FilterAltOffIcon />,
            'aria-label': filtered ? 'Clear filters' : 'Apply filters',
            active: filtered,
            onClick: () => setFiltered(!filtered),
          },
        ]}
      />
    );
  },
};
