import figma from '@figma/code-connect'
import { Switch } from './Switch'

figma.connect(Switch, 'https://www.figma.com/design/PjAYuPDr8IA1ccwiAjFkSD?node-id=2433-9802', {
  props: {
    state: figma.enum('state', {
      on: 'on',
      off: 'off',
    }),
    disabled: figma.enum('disabled', {
      yes: 'yes',
      no: 'no',
    }),
  },
  example: ({ state, disabled }) => (
    <Switch
      state={state}
      disabled={disabled}
      labelPlacement="right"
      label="Label"
    />
  ),
})
