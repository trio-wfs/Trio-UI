import figma from '@figma/code-connect'
import { Select } from './Select'

figma.connect(Select, 'https://www.figma.com/design/PjAYuPDr8IA1ccwiAjFkSD?node-id=2433-8481', {
  props: {
    state: figma.enum('state', {
      default: 'default',
      focus: 'focus',
      disabled: 'disabled',
      error: 'error',
      selected: 'selected',
    }),
    size: figma.enum('size', {
      medium: 'medium',
      small: 'small',
    }),
  },
  example: ({ state, size }) => (
    <Select
      state={state}
      size={size}
      label="Label"
      placeholder="Select an option"
      options={[
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
      ]}
    />
  ),
})
