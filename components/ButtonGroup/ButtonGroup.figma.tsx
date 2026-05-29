import figma from '@figma/code-connect'
import { ButtonGroup } from './ButtonGroup'

// Color is omitted intentionally — Figma pairs it with variant (contained →
// secondary, outline → primary), and the component derives it from variant
// at runtime to keep the discriminated union in ButtonGroupProps honest.
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
    orientation: figma.enum('orientation', {
      horizontal: 'horizontal',
      vertical: 'vertical',
    }),
  },
  example: ({ variant, size, orientation }) =>
    variant === 'outline' ? (
      <ButtonGroup
        variant="outline"
        size={size}
        orientation={orientation}
        buttons={['Button 1', 'Button 2', 'Button 3']}
      />
    ) : (
      <ButtonGroup
        variant="contained"
        size={size}
        orientation={orientation}
        buttons={['Button 1', 'Button 2', 'Button 3']}
      />
    ),
})
