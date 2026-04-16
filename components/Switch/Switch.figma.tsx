import figma from '@figma/code-connect'
import { Switch } from './Switch'

figma.connect(Switch, 'https://www.figma.com/design/PjAYuPDr8IA1ccwiAjFkSD?node-id=2433-9802', {
  props: {
    state: figma.enum('state', {
      on: 'on',
      off: 'off',
    }),
  },
  example: ({ state }) => (
    <Switch
      state={state}
      labelPlacement="right"
      label="Label"
    />
  ),
})
