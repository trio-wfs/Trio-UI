import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from './Avatar';
import type { AvatarColor, AvatarSize } from './Avatar.types';

const ALL_COLORS: AvatarColor[] = [
  'staff',
  'primary',
  'info',
  'success',
  'warning',
  'error',
  'dataviz',
  'anonymized',
];

const ALL_SIZES: AvatarSize[] = ['small', 'medium'];

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ALL_SIZES },
    color: { control: 'select', options: ALL_COLORS },
    initials: { control: 'text' },
  },
  args: {
    size: 'medium',
    color: 'staff',
    initials: 'JS',
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {};

export const Small: Story = {
  args: { size: 'small' },
};

export const Staff: Story = {
  args: { color: 'staff', initials: 'RM' },
};

export const Anonymized: Story = {
  args: { color: 'anonymized', initials: 'A1' },
};

/**
 * Identifier colors used across an agency roster. In TRIO, these are typically
 * name-hashed in code so each author reads as the same color across threads.
 */
export const AllColors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      {ALL_COLORS.map((color, i) => (
        <Avatar
          key={color}
          color={color}
          initials={['JS', 'AB', 'CD', 'EF', 'GH', 'IJ', 'KL', '••'][i]}
          aria-label={color}
        />
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Avatar size="medium" color="primary" initials="JS" />
      <Avatar size="small" color="primary" initials="JS" />
    </div>
  ),
};

/**
 * The Q&A Board privacy pattern: three agencies viewing the same thread see
 * each other as identical anonymized avatars, while their own TRIO Staff
 * counterparts stay color-anchored.
 */
export const QABoardPrivacyPattern: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Avatar color="staff" initials="RM" aria-label="TRIO Staff" />
      <Avatar color="anonymized" initials="A1" aria-label="Agency 1" />
      <Avatar color="anonymized" initials="A2" aria-label="Agency 2" />
      <Avatar color="anonymized" initials="A3" aria-label="Agency 3" />
    </div>
  ),
};
