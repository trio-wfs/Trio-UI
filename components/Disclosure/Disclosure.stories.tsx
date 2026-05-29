import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Disclosure } from './Disclosure';
import { Button } from '../Button/Button';
import { Box } from '@mui/material';

const meta: Meta<typeof Disclosure> = {
  title: 'Components/Disclosure',
  component: Disclosure,
  tags: ['autodocs'],
  argTypes: {
    open: { control: 'boolean' },
    unmountOnExit: { control: 'boolean' },
    timeout: { control: { type: 'number', min: 50, max: 1000, step: 50 } },
  },
  args: {
    open: true,
    unmountOnExit: false,
    timeout: 200,
  },
};

export default meta;
type Story = StoryObj<typeof Disclosure>;

export const Static: Story = {
  args: {
    children: (
      <Box sx={{ p: 2, bgcolor: 'background.secondary', border: '1px solid', borderColor: 'secondary.outline', borderRadius: 1 }}>
        This content is revealed when `open` is true.
      </Box>
    ),
  },
};

export const Interactive: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Button
          variant="outlined"
          color="primary"
          size="small"
          label={open ? 'Hide details' : 'Show details'}
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="disclosure-1"
        />
        <Disclosure open={open} id="disclosure-1">
          <Box sx={{ p: 2, bgcolor: 'background.secondary', border: '1px solid', borderColor: 'secondary.outline', borderRadius: 1 }}>
            Hidden details — animates from height 0 to natural height on toggle.
            The default 200ms timing matches TRIO's chrome animations.
          </Box>
        </Disclosure>
      </Box>
    );
  },
};
