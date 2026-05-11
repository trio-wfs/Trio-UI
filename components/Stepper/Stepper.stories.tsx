import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Stepper } from './Stepper';
import { Button } from '../Button/Button';
import { Box } from '@mui/material';

const defaultSteps = [
  'Submission',
  'Credentialing',
  'Background Check',
  'Orientation',
  'Placement',
];

const meta: Meta<typeof Stepper> = {
  title: 'Components/Stepper',
  component: Stepper,
  tags: ['autodocs'],
  args: {
    steps: defaultSteps,
    activeStep: 2,
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 800, padding: 16 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Stepper>;

export const Default: Story = {};

export const FirstStep: Story = {
  args: { activeStep: 0 },
};

export const LastStep: Story = {
  args: { activeStep: 4 },
};

export const AllComplete: Story = {
  args: { activeStep: 5 },
};

export const ThreeSteps: Story = {
  args: {
    steps: ['Draft', 'Review', 'Published'],
    activeStep: 1,
  },
};

export const Interactive: Story = {
  render: () => {
    const [step, setStep] = useState(0);
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Stepper steps={defaultSteps} activeStep={step} />
        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
          <Button
            variant="outlined"
            color="secondary"
            size="small"
            disabled={step === 0}
            onClick={() => setStep(s => s - 1)}
          >
            Back
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="small"
            disabled={step > defaultSteps.length - 1}
            onClick={() => setStep(s => s + 1)}
          >
            {step >= defaultSteps.length - 1 ? 'Complete' : 'Next'}
          </Button>
        </Box>
      </Box>
    );
  },
};
