import type { Meta, StoryObj } from '@storybook/react';
import { Breadcrumb } from './Breadcrumb';

const path = [
  { label: 'Home', href: '#' },
  { label: 'Shifts', href: '#' },
  { label: 'Mercy Regional', href: '#' },
  { label: 'Order #4820', selected: true },
];

const meta: Meta<typeof Breadcrumb> = {
  title: 'Components/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
  argTypes: {
    state: { control: 'select', options: ['breadcrumb', 'Links'] },
    showNumberIndicator: { control: 'boolean' },
    recordCount: { control: 'text' },
  },
  args: {
    state: 'breadcrumb',
    links: path,
    showNumberIndicator: false,
  },
  decorators: [
    (Story) => (
      <div style={{ width: 800 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Breadcrumb>;

export const Default: Story = {};

export const LinksStyle: Story = {
  args: { state: 'Links' },
};

export const WithRecordCount: Story = {
  args: { showNumberIndicator: true, recordCount: '1,247' },
};

export const ShortPath: Story = {
  args: {
    links: [
      { label: 'Dashboard', href: '#' },
      { label: 'Active orders', selected: true },
    ],
  },
};
