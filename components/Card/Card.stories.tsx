import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';
import { Button } from '../Button/Button';
import type { PaperLevel, PaperPadding } from '../Paper/Paper.types';

const ALL_LEVELS: PaperLevel[] = ['default', 'secondary', 'subtle', 'paper', 'accent'];
const ALL_PADDING: PaperPadding[] = ['none', 'sm', 'md', 'lg'];

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    level: { control: 'select', options: ALL_LEVELS },
    padding: { control: 'select', options: ALL_PADDING },
    bordered: { control: 'boolean' },
    divided: { control: 'boolean' },
  },
  args: {
    level: 'paper',
    padding: 'md',
    bordered: true,
    divided: false,
    children: 'Card body — wrap any content in here.',
  },
  decorators: [
    (Story) => (
      <div style={{ width: 420, background: '#F5F5F5', padding: 16 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {};

export const WithHeader: Story = {
  args: {
    header: <strong>Order #4821</strong>,
    children: 'ICU shift — 3 vendors submitted, 1 placement pending review.',
  },
};

export const WithFooter: Story = {
  args: {
    children: 'Review submission details before approving.',
    footer: (
      <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
        <Button variant="text">Cancel</Button>
        <Button>Approve</Button>
      </div>
    ),
  },
};

export const HeaderBodyFooter: Story = {
  args: {
    header: (
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <strong>Shift summary</strong>
        <span style={{ fontSize: 12, color: '#9E9E9E' }}>Updated 2 min ago</span>
      </div>
    ),
    children: (
      <div style={{ display: 'grid', gap: 4, fontSize: 14 }}>
        <div><strong>Unit:</strong> ICU 4-North</div>
        <div><strong>Shift:</strong> Nights, 7p–7a</div>
        <div><strong>Vendors:</strong> 3 submitted</div>
      </div>
    ),
    footer: (
      <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
        <Button variant="text">Close</Button>
        <Button>View details</Button>
      </div>
    ),
  },
};

/**
 * Dividers separate header, body, and footer with 1px lines — useful for
 * dense content blocks where the section boundary is load-bearing.
 */
export const Divided: Story = {
  args: {
    divided: true,
    header: <strong>Credentialing checklist</strong>,
    children: (
      <ul style={{ margin: 0, paddingLeft: 16, fontSize: 14, lineHeight: 1.6 }}>
        <li>License verified</li>
        <li>Background check complete</li>
        <li>References pending</li>
      </ul>
    ),
    footer: <span style={{ fontSize: 12, color: '#9E9E9E' }}>2 of 3 complete</span>,
  },
};

export const Accent: Story = {
  args: {
    level: 'accent',
    header: <strong>Pinned</strong>,
    children: 'This shift is pinned to the top of your worklist.',
  },
};

export const Borderless: Story = {
  args: {
    bordered: false,
    children: 'No border — use when the card sits inside a bordered parent.',
  },
};

export const AllLevels: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 12 }}>
      {ALL_LEVELS.map((level) => (
        <Card key={level} level={level} header={<strong>level=&quot;{level}&quot;</strong>}>
          Card surface at this level.
        </Card>
      ))}
    </div>
  ),
};
