import figma from '@figma/code-connect'
import { ButtonGroup } from './ButtonGroup'

figma.connect(ButtonGroup, 'https://www.figma.com/design/PjAYuPDr8IA1ccwiAjFkSD?node-id=2172-9605', {
  props: {
    variant: figma.enum('variant', {
      contained: 'contained',
      outline: 'outline',
    }),
    size: figma.enum('size', {
      small: 'small',
      medium: 'medium',
    }),
    color: figma.enum('color', {
      primary: 'primary',
      secondary: 'secondary',
    }),
    orientation: figma.enum('orientation', {
      horizontal: 'horizontal',
      vertical: 'vertical',
    }),
  },
  example: ({ variant, size, color, orientation }) => (
    <ButtonGroup
      variant={variant}
      size={size}
      color={color}
      orientation={orientation}
      buttons={['Button 1', 'Button 2', 'Button 3']}
    />
  ),
})
