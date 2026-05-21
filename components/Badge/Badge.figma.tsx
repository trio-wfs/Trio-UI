import figma from '@figma/code-connect'
import { Badge } from './Badge'

figma.connect(Badge, 'https://www.figma.com/design/PjAYuPDr8IA1ccwiAjFkSD?node-id=2028-6368', {
  props: {
    color: figma.enum('color', {
      primary: 'primary',
      secondary: 'secondary',
      error: 'error',
      success: 'success',
      warning: 'warning',
      info: 'info',
    }),
    type: figma.enum('type', {
      default: 'default',
      dot: 'dot',
    }),
  },
  example: ({ color, type }) => (
    <Badge color={color} type={type} badgeContent={4}>
      {/* anchor element */}
    </Badge>
  ),
})
