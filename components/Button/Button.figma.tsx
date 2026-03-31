import figma from '@figma/code-connect'
import { Button } from './Button'

figma.connect(Button, 'https://www.figma.com/design/PjAYuPDr8IA1ccwiAjFkSD?node-id=978-5063', {
  props: {
    variant: figma.enum('variant', {
      contained: 'contained',
      outlined: 'outlined',
      text: 'text',
    }),
    size: figma.enum('size', {
      md: 'md',
      sm: 'sm',
    }),
    color: figma.enum('color', {
      primary: 'primary',
      secondary: 'secondary',
      success: 'success',
      warning: 'warning',
      error: 'error',
      info: 'info',
    }),
    disabled: figma.enum('state', {
      disabled: true,
      default: false,
      hover: false,
      active: false,
      loading: false,
    }),
    label: figma.string('label'),
  },
  example: ({ variant, size, color, disabled, label }) => (
    <Button variant={variant} size={size} color={color} disabled={disabled}>
      {label}
    </Button>
  ),
})
