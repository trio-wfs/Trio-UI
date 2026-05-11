import { useRef, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Button from '@mui/material/Button';
import { Menu } from './Menu';
import type { MenuItem } from './Menu.types';

const icon = (name: string) => (
  <span className="material-icons-outlined" style={{ fontSize: 18 }}>{name}</span>
);

const basicItems: MenuItem[] = [
  { id: '1', label: 'Edit' },
  { id: '2', label: 'Duplicate' },
  { id: '3', label: 'Archive' },
  { id: '4', label: 'Delete', divider: true },
];

const withIcons: MenuItem[] = [
  { id: '1', label: 'Edit', leftContent: icon('edit') },
  { id: '2', label: 'Share', leftContent: icon('share'), rightContent: icon('open_in_new') },
  { id: '3', label: 'Archive', leftContent: icon('archive') },
  { id: '4', label: 'Delete', leftContent: icon('delete') },
];

const withStates: MenuItem[] = [
  { id: '1', label: 'Selected item', selected: true },
  { id: '2', label: 'Default item' },
  { id: '3', label: 'Disabled item', disabled: true },
  { id: '4', label: 'Another item' },
];

const grouped: MenuItem[] = [
  { id: 'h1', label: 'ACTIONS', state: 'title' },
  { id: '1', label: 'Edit' },
  { id: '2', label: 'Duplicate' },
  { id: 'h2', label: 'DANGER', state: 'title' },
  { id: '3', label: 'Archive' },
  { id: '4', label: 'Delete' },
];

const MenuDemo: React.FC<{ items: MenuItem[]; title?: string }> = ({ items, title = 'Open menu' }) => {
  const anchorRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button ref={anchorRef} variant="outlined" onClick={() => setOpen(true)}>
        {title}
      </Button>
      <Menu
        anchorEl={anchorRef.current}
        open={open}
        onClose={() => setOpen(false)}
        items={items.map((i) => ({
          ...i,
          onClick: () => {
            i.onClick?.();
            setOpen(false);
          },
        }))}
      />
    </>
  );
};

const meta: Meta<typeof Menu> = {
  title: 'Components/Menu',
  component: Menu,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Menu is anchored to a trigger element. Stories use a demo wrapper with a Button trigger.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: 24 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Menu>;

export const Basic: Story = {
  render: () => <MenuDemo items={basicItems} title="Actions" />,
};

export const WithIcons: Story = {
  render: () => <MenuDemo items={withIcons} title="With icons" />,
};

export const ItemStates: Story = {
  render: () => <MenuDemo items={withStates} title="Item states" />,
};

export const Grouped: Story = {
  render: () => <MenuDemo items={grouped} title="Grouped" />,
};
