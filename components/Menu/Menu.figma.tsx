import figma from '@figma/code-connect'
import { Menu } from './Menu'

figma.connect(Menu, 'https://www.figma.com/design/PjAYuPDr8IA1ccwiAjFkSD?node-id=4505-3795', {
  props: {
    state: figma.enum('state', {
      single: 'single',
      multi: 'multi',
      grouped: 'grouped',
    }),
  },
  example: ({ state }) => (
    <Menu
      state={state}
      items={[
        { id: '1', label: 'Option 1' },
        { id: '2', label: 'Option 2' },
        { id: '3', label: 'Option 3' },
      ]}
    />
  ),
})
