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
      medium: 'medium',
      small: 'small',
    }),
    color: figma.enum('color', {
      primary: 'primary',
      secondary: 'secondary',
      success: 'success',
      warning: 'warning',
      error: 'error',
      info: 'info',
    }),
    disabled: figma.enum('disabled?', { yes: true, no: false }),
    loading: figma.enum('loading?', { yes: true, no: false }),
    label: figma.string('label'),
  },
  example: ({ variant, size, color, disabled, loading, label }) => (
    <Button variant={variant} size={size} color={color} disabled={disabled} loading={loading}>
      {label}
    </Button>
  ),
})
