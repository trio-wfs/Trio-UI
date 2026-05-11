import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SplitButton } from './SplitButton';
import SaveIcon from '@mui/icons-material/Save';

const menuItems = [
  { id: '1', label: 'Save as draft' },
  { id: '2', label: 'Save and close' },
  { id: '3', label: 'Save and duplicate' },
];

const SplitButtonDemo: React.FC<React.ComponentProps<typeof SplitButton>> = (props) => {
  const [open, setOpen] = useState(false);
  return (
    <SplitButton
      {...props}
      open={open}
      onMenuToggle={setOpen}
      menuItems={(props.menuItems ?? menuItems).map((i) => ({
        ...i,
        onClick: () => setOpen(false),
      }))}
    />
  );
};

const meta: Meta<typeof SplitButton> = {
  title: 'Components/SplitButton',
  component: SplitButton,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    color: { control: 'select', options: ['primary', 'secondary'] },
    variant: { control: 'select', options: ['contained', 'outline'] },
    disabled: { control: 'boolean' },
  },
  args: {
    label: 'Save',
    color: 'primary',
    variant: 'contained',
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof SplitButton>;

export const Primary: Story = {
  render: (args) => <SplitButtonDemo {...args} />,
};

export const Secondary: Story = {
  render: (args) => <SplitButtonDemo {...args} />,
  args: { color: 'secondary' },
};

export const WithStartIcon: Story = {
  render: (args) => <SplitButtonDemo {...args} startIcon={<SaveIcon />} />,
};

export const Disabled: Story = {
  render: (args) => <SplitButtonDemo {...args} />,
  args: { disabled: true },
};

export const Outline: Story = {
  render: (args) => <SplitButtonDemo {...args} />,
  args: { variant: 'outline', label: 'Apply Policy' },
};

export const OutlineSecondary: Story = {
  render: (args) => <SplitButtonDemo {...args} />,
  args: { variant: 'outline', color: 'secondary', label: 'Apply Policy' },
};
