import type { Meta, StoryObj } from '@storybook/react';
import { Paper } from './Paper';
import type { PaperLevel, PaperPadding } from './Paper.types';

const ALL_LEVELS: PaperLevel[] = ['default', 'secondary', 'subtle', 'paper', 'accent'];
const ALL_PADDING: PaperPadding[] = ['none', 'sm', 'md', 'lg'];

const meta: Meta<typeof Paper> = {
  title: 'Components/Paper',
  component: Paper,
  tags: ['autodocs'],
  argTypes: {
    level: { control: 'select', options: ALL_LEVELS },
    padding: { control: 'select', options: ALL_PADDING },
    bordered: { control: 'boolean' },
  },
  args: {
    level: 'paper',
    padding: 'md',
    bordered: true,
    children: 'Paper surface — used for cards, panels, and containers.',
  },
  decorators: [
    (Story) => (
      <div style={{ width: 320, background: '#F5F5F5', padding: 16 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Paper>;

export const Default: Story = {};

export const Accent: Story = {
  args: { level: 'accent', children: 'Pinned content — accent surface.' },
};

export const Secondary: Story = {
  args: { level: 'secondary', children: 'Secondary surface — sits below header.' },
};

export const Borderless: Story = {
  args: { bordered: false, children: 'No border. Use when nesting inside a bordered parent.' },
};

/**
 * The layered hierarchy used across TRIO pages. Wrap each level inside the
 * previous to see the surface depth: page canvas → content wrapper → card.
 */
export const AllLevels: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 12 }}>
      {ALL_LEVELS.map((level) => (
        <Paper key={level} level={level}>
          <strong>level=&quot;{level}&quot;</strong> — {labelForLevel(level)}
        </Paper>
      ))}
    </div>
  ),
};

export const PaddingScale: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 12 }}>
      {ALL_PADDING.map((p) => (
        <Paper key={p} padding={p}>
          padding=&quot;{p}&quot;
        </Paper>
      ))}
    </div>
  ),
};

/**
 * Nested surfaces — a paper inside a secondary inside the default canvas.
 * This is the canonical composition for a card sitting in a content area.
 */
export const Nested: Story = {
  render: () => (
    <Paper level="default" padding="lg" bordered={false}>
      <Paper level="secondary" padding="md">
        <Paper level="paper">A card inside a content wrapper inside the page canvas.</Paper>
      </Paper>
    </Paper>
  ),
};

function labelForLevel(level: PaperLevel): string {
  switch (level) {
    case 'default':
      return 'page canvas (#F5F5F5)';
    case 'secondary':
      return 'content wrapper (#FAFAFA)';
    case 'subtle':
      return 'transparent tier — nest sparingly';
    case 'paper':
      return 'cards / panels (#FFFFFF)';
    case 'accent':
      return 'pinned / highlighted (#E4F7FD)';
  }
}
