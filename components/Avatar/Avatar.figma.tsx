import figma from '@figma/code-connect'
import { Avatar } from './Avatar'

figma.connect(Avatar, 'https://www.figma.com/design/PjAYuPDr8IA1ccwiAjFkSD?node-id=7814-2', {
  props: {
    size: figma.enum('size', {
      small: 'small',
      medium: 'medium',
    }),
    color: figma.enum('color', {
      staff: 'staff',
      primary: 'primary',
      info: 'info',
      success: 'success',
      warning: 'warning',
      error: 'error',
      dataviz: 'dataviz',
      anonymized: 'anonymized',
    }),
    initials: figma.string('initials'),
  },
  example: ({ size, color, initials }) => (
    <Avatar size={size} color={color} initials={initials} />
  ),
})
