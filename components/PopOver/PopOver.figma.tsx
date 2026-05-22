import figma from '@figma/code-connect'
import { PopOver } from './PopOver'

figma.connect(PopOver, 'https://www.figma.com/design/PjAYuPDr8IA1ccwiAjFkSD?node-id=3868-50794', {
  props: {
    style: figma.enum('style', {
      withTabs: 'withTabs',
      withoutTabs: 'withoutTabs',
    }),
    type: figma.enum('type', {
      generic: 'generic',
      singleContent: 'singleContent',
      multiContent: 'multiContent',
      noContent: 'noContent',
      content: 'content',
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
