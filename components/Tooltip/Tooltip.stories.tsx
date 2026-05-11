import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from './Tooltip';
import Button from '@mui/material/Button';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    position: { control: 'select', options: ['top', 'bottom', 'left', 'right', 'none'] },
  },
  args: {
    title: 'Credentials verified',
    position: 'top',
  },
  decorators: [
    (Story) => (
      <div style={{ padding: 80, display: 'flex', justifyContent: 'center' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  render: (args) => (
    <Tooltip {...args}>
      <Button variant="contained">Hover me</Button>
    </Tooltip>
  ),
};

export const Top: Story = {
  args: { position: 'top' },
  render: (args) => (
    <Tooltip {...args}>
      <Button variant="outlined">Top</Button>
    </Tooltip>
  ),
};

export const Bottom: Story = {
  args: { position: 'bottom' },
  render: (args) => (
    <Tooltip {...args}>
      <Button variant="outlined">Bottom</Button>
    </Tooltip>
  ),
};

export const Left: Story = {
  args: { position: 'left' },
  render: (args) => (
    <Tooltip {...args}>
      <Button variant="outlined">Left</Button>
    </Tooltip>
  ),
};

export const Right: Story = {
  args: { position: 'right' },
  render: (args) => (
    <Tooltip {...args}>
      <Button variant="outlined">Right</Button>
    </Tooltip>
  ),
};

export const AllPositions: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 40, gridTemplateColumns: 'repeat(4, auto)', justifyItems: 'center' }}>
      {(['top', 'bottom', 'left', 'right'] as const).map((pos) => (
        <Tooltip key={pos} title={`Tooltip on ${pos}`} position={pos}>
          <Button variant="outlined">{pos}</Button>
        </Tooltip>
      ))}
    </div>
  ),
};
