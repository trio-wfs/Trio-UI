import figma from '@figma/code-connect'
import { Chip } from './Chip'

figma.connect(Chip, 'https://www.figma.com/design/PjAYuPDr8IA1ccwiAjFkSD?node-id=1512-8352', {
  props: {
    size: figma.enum('size', {
      md: 'medium',
      sm: 'small',
    }),
    color: figma.enum('color', {
      default: 'default',
      primary: 'primary',
      error: 'error',
      info: 'info',
      warning: 'warning',
      success: 'success',
    }),
    variant: figma.enum('variant', {
      contained: 'contained',
      outline: 'outline',
    }),
    disabled: figma.boolean('disabled'),
    label: figma.string('label'),
  },
  example: ({ size, color, variant, disabled, label }) => (
    <Chip
      size={size}
      color={color}
      variant={variant}
      disabled={disabled}
      label={label}
    />
  ),
})
