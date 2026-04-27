import figma from '@figma/code-connect'
import { NumberField } from './NumberField'

figma.connect(NumberField, 'https://www.figma.com/design/PjAYuPDr8IA1ccwiAjFkSD?node-id=5464-5759', {
  props: {
    size: figma.enum('size', {
      medium: 'medium',
      small: 'small',
    }),
  },
  example: ({ size }) => (
    <NumberField
      size={size}
      value={0}
      step={1}
    />
  ),
})
