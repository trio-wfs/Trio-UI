import figma from '@figma/code-connect'
import { Checkbox } from './Checkbox'

figma.connect(Checkbox, 'https://www.figma.com/design/PjAYuPDr8IA1ccwiAjFkSD?node-id=2425-7975', {
  props: {
    color: figma.enum('color', {
      primary: 'primary',
      error: 'error',
    }),
    checked: figma.boolean('checked'),
    disabled: figma.boolean('disabled'),
    indeterminate: figma.boolean('indeterminate'),
  },
  example: ({ color, checked, disabled, indeterminate }) => (
    <Checkbox
      color={color}
      checked={checked}
      disabled={disabled}
      indeterminate={indeterminate}
      label="Label"
    />
  ),
})
