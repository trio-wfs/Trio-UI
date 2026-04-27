import figma from '@figma/code-connect'
import { PopOver } from './PopOver'

figma.connect(PopOver, 'https://www.figma.com/design/PjAYuPDr8IA1ccwiAjFkSD?node-id=3868-50794', {
  props: {
    style: figma.enum('Style', {
      'With Tabs': 'withTabs',
      'Without Tabs': 'withoutTabs',
    }),
    type: figma.enum('Type', {
      'Generic Use': 'generic',
      'Single Content': 'singleContent',
      'Multi-Content': 'multiContent',
      'No Content': 'noContent',
      'Content': 'content',
    }),
  },
  example: () => (
    <PopOver
      anchorEl={null}
      open={true}
      onClose={() => {}}
      title="Header Title"
    >
      Popover content goes here.
    </PopOver>
  ),
})
