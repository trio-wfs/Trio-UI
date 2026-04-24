import React from 'react';
import type { Preview } from '@storybook/react-vite';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { trioTheme } from '../design-tokens/theme';
import { ModuleRegistry } from 'ag-charts-community';
import { AllCommunityModule } from 'ag-charts-community';

ModuleRegistry.registerModules([AllCommunityModule]);

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
