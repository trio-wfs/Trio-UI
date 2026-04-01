import figma from '@figma/code-connect'
import { Stepper } from './Stepper'

figma.connect(Stepper, 'https://www.figma.com/design/PjAYuPDr8IA1ccwiAjFkSD?node-id=7448-1953', {
  props: {
    activeStep: figma.enum('Wizard', {
      '1': 0,
      '2': 1,
      '3': 2,
      '4': 3,
      '5': 4,
    }),
  },
  example: ({ activeStep }) => (
    <Stepper
      steps={['Worker Details', 'API Key', 'Policies', 'Test Worker', 'Agent Settings']}
      activeStep={activeStep}
    />
  ),
})
