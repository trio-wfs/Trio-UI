import figma from '@figma/code-connect'
import { RadioGroup } from './RadioGroup'

figma.connect(RadioGroup, 'https://www.figma.com/design/PjAYuPDr8IA1ccwiAjFkSD?node-id=5382-7056', {
  props: {
    color: figma.enum('color', {
      primary: 'primary',
      default: 'default',
      error: 'error',
    }),
    disabled: figma.boolean('disabled'),
  },
  example: ({ color, disabled }) => (
    <RadioGroup
      color={color}
      disabled={disabled}
      label="Group Label"
      options={[
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
        { value: 'option3', label: 'Option 3' },
      ]}
    />
  ),
})
