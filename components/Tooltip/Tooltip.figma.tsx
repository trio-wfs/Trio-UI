import figma from '@figma/code-connect'
import { Tooltip } from './Tooltip'
import { Button } from '../Button/Button'

figma.connect(Tooltip, 'https://www.figma.com/design/PjAYuPDr8IA1ccwiAjFkSD?node-id=490-88', {
  props: {
    position: figma.enum('position', {
      top: 'top',
      bottom: 'bottom',
      left: 'left',
      right: 'right',
      none: 'none',
    }),
  },
  example: ({ position }) => (
    <Tooltip title="Tooltip text" position={position}>
      <Button label="Hover me" />
    </Tooltip>
  ),
})
