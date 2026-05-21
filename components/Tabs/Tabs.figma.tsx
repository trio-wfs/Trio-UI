import figma from '@figma/code-connect'
import { Tabs } from './Tabs'

figma.connect(Tabs, 'https://www.figma.com/design/PjAYuPDr8IA1ccwiAjFkSD?node-id=3868-51864', {
  props: {
    variant: figma.enum('variant', {
      'Tab Group': 'Tab Group',
      'Right Scroll': 'Right Scroll',
      'Left and Right Scroll': 'Left and Right Scroll',
      'Left Scroll': 'Left Scroll',
    }),
  },
  example: ({ variant }) => (
    <Tabs
      variant={variant}
      activeIndex={0}
      tabs={[
        { label: 'Tab 1' },
        { label: 'Tab 2' },
        { label: 'Tab 3' },
      ]}
      onChange={() => {}}
    />
  ),
})
