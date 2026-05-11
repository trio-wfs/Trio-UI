import figma from '@figma/code-connect'
import { SplitButton } from './SplitButton'

figma.connect(SplitButton, 'https://www.figma.com/design/PjAYuPDr8IA1ccwiAjFkSD?node-id=5428-4183', {
  props: {
    color: figma.enum('color', {
      primary: 'primary',
      secondary: 'secondary',
    }),
    variant: figma.enum('variant', {
      contained: 'contained',
      outline: 'outline',
    }),
    open: figma.boolean('open'),
    label: figma.string('label'),
  },
  example: ({ color, variant, open, label }) => (
    <SplitButton
      label={label}
      color={color}
      variant={variant}
      open={open}
      menuItems={[
        { id: '1', label: 'Option 1' },
        { id: '2', label: 'Option 2' },
        { id: '3', label: 'Option 3' },
      ]}
      onMenuToggle={() => {}}
      onClick={() => {}}
    />
  ),
})
