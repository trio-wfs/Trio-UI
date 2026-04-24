import figma from '@figma/code-connect'
import { TextField } from './TextField'

figma.connect(TextField, 'https://www.figma.com/design/PjAYuPDr8IA1ccwiAjFkSD?node-id=975-5453', {
  props: {
    type: figma.enum('type', {
      'single-line': 'single-line',
      'multi-line': 'multi-line',
    }),
    size: figma.enum('size', {
      medium: 'medium',
      small: 'small',
    }),
    state: figma.enum('state', {
      default: 'default',
      error: 'error',
      focus: 'focus',
    }),
    disabled: figma.boolean('disabled'),
  },
  example: ({ type, size, state, disabled }) => (
    <TextField
      type={type}
      size={size}
      state={state}
      disabled={disabled}
      label="Label"
      placeholder="Placeholder"
    />
  ),
})
