import figma from '@figma/code-connect'
import { ButtonIcon } from './ButtonIcon'
import NotificationsIcon from '@mui/icons-material/Notifications'

figma.connect(ButtonIcon, 'https://www.figma.com/design/PjAYuPDr8IA1ccwiAjFkSD?node-id=4819-14042', {
  props: {
    variant: figma.enum('variant', {
      contained: 'contained',
      ghost: 'ghost',
    }),
    color: figma.enum('color', {
      primary: 'primary',
      secondary: 'secondary',
    }),
    size: figma.enum('size', {
      sm: 'small',
      md: 'medium',
    }),
    badge: figma.boolean('badge'),
  },
  example: ({ variant, color, size, badge }) => (
    <ButtonIcon
      variant={variant}
      color={color}
      size={size}
      badge={badge}
      icon={<NotificationsIcon />}
      aria-label="Action"
    />
  ),
})
