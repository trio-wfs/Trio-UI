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
    disabled: figma.enum('state', {
      disabled: true,
      default: false,
      focus: false,
      error: false,
      selected: false,
    }),
    error: figma.enum('state', {
      error: true,
      default: false,
      focus: false,
      disabled: false,
      selected: false,
    }),
  },
  example: ({ state, disabled, error }) => (
    <Select
      state={state}
      disabled={disabled}
      error={error}
      label="Label"
      placeholder="Select an option"
      options={[
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
      ]}
    />
  ),
})
