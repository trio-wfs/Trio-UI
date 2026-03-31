import figma from '@figma/code-connect'
import { Autocomplete } from './Autocomplete'

figma.connect(Autocomplete, 'https://www.figma.com/design/PjAYuPDr8IA1ccwiAjFkSD?node-id=2381-6441', {
  props: {
    type: figma.enum('type', {
      single: 'single',
      multi: 'multi',
    }),
    state: figma.enum('state', {
      default: 'default',
      focus: 'focus',
      error: 'error',
    }),
    disabled: figma.enum('disabled', {
      yes: true,
      no: false,
    }),
  },
  example: ({ type, state, disabled }) => (
    <Autocomplete
      type={type}
      state={state}
      disabled={disabled}
      label="Label"
      placeholder="Search..."
      options={[]}
    />
  ),
})
