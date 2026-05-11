import figma from '@figma/code-connect'
import { Autocomplete } from './Autocomplete'

figma.connect(Autocomplete, 'https://www.figma.com/design/PjAYuPDr8IA1ccwiAjFkSD?node-id=2381-6441', {
  props: {
    state: figma.enum('state', {
      default: 'default',
      focus: 'default',
      error: 'error',
    }),
    size: figma.enum('size', {
      small: 'small',
      medium: 'medium',
    }),
    disabled: figma.boolean('disabled'),
  },
  example: ({ state, size, disabled }) => (
    <Autocomplete
      state={state}
      size={size}
      disabled={disabled}
      label="Label"
      placeholder="Search..."
      options={[]}
    />
  ),
})
