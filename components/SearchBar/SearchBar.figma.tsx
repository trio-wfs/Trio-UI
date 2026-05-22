import figma from '@figma/code-connect'
import { SearchBar } from './SearchBar'

figma.connect(SearchBar, 'https://www.figma.com/design/PjAYuPDr8IA1ccwiAjFkSD?node-id=492-653', {
  props: {
    size: figma.enum('Size', {
      Small: 'small',
      'Medium (Default)': 'medium',
    }),
    type: figma.enum('Type', {
      Left: 'left',
      Right: 'right',
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
