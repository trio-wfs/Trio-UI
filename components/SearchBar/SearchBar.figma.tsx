import figma from '@figma/code-connect'
import { SearchBar } from './SearchBar'

figma.connect(SearchBar, 'https://www.figma.com/design/PjAYuPDr8IA1ccwiAjFkSD?node-id=492-653', {
  props: {
    size: figma.enum('size', {
      small: 'small',
      medium: 'medium',
    }),
    type: figma.enum('type', {
      left: 'left',
      right: 'right',
    }),
  },
  example: ({ size, type }) => (
    <SearchBar
      size={size}
      type={type}
      placeholder="Search..."
      onChange={() => {}}
      onSearch={() => {}}
    />
  ),
})
