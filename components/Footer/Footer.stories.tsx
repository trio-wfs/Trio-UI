import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Footer } from './Footer';

const meta: Meta<typeof Footer> = {
  title: 'Components/Footer',
  component: Footer,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    copyrightText: { control: 'text' },
  },
  args: {
    copyrightText: '\u00A9 2017-2025 American Health Technology Group, LLC: Trio/Insight 25.4.0.0',
    links: [
      { label: 'Terms of Use', href: '#' },
      { label: 'Privacy Policy', href: '#' },
    ],
  },
};

export default meta;
type Story = StoryObj<typeof Footer>;

export const Default: Story = {};

export const CustomLinks: Story = {
  args: {
    links: [
      { label: 'Terms of Use', href: '#' },
      { label: 'Privacy Policy', href: '#' },
      { label: 'Accessibility', href: '#' },
    ],
  },
};
