import figma from '@figma/code-connect'
import { Chip } from './Chip'

figma.connect(Chip, 'https://www.figma.com/design/PjAYuPDr8IA1ccwiAjFkSD?node-id=1512-8352', {
  props: {
    size: figma.enum('size', {
      medium: 'medium',
      small: 'small',
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
    disabled: figma.enum('disabled', { yes: true, no: false }),
    label: figma.string('label'),
    iconLeft: figma.boolean('iconLeft'),
    iconRight: figma.boolean('iconRight'),
  },
  example: ({ size, color, variant, disabled, label, iconLeft, iconRight }) => (
    <Chip
      size={size}
      color={color}
      variant={variant}
      disabled={disabled}
      label={label}
      iconLeft={iconLeft}
      iconRight={iconRight}
    />
  ),
})
