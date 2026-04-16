import React from 'react';
import type { Preview } from '@storybook/react-vite';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { trioTheme } from '../design-tokens/theme';

const preview: Preview = {
  decorators: [
    (Story) => (
      <ThemeProvider theme={trioTheme}>
        <CssBaseline />
        <Story />
      </ThemeProvider>
    ),
  ],
  parameters: {
    layout: 'padded',
    backgrounds: {
      default: 'page',
      values: [
        { name: 'page', value: '#F5F5F5' },
        { name: 'paper', value: '#FFFFFF' },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: { test: 'todo' },
  },
};

export default preview;
