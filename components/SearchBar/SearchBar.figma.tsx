import figma from '@figma/code-connect'
import { SearchBar } from './SearchBar'

figma.connect(SearchBar, 'https://www.figma.com/design/PjAYuPDr8IA1ccwiAjFkSD?node-id=492-653', {
  props: {
    size: figma.enum('Size', {
      Small: 'Small',
      'Medium Default': 'Medium',
      Large: 'Large',
    }),
    type: figma.enum('Type', {
      Left: 'Left',
      Right: 'Right',
      Both: 'Both',
    }),
  },
  example: ({ size, type }) => (
    <SearchBar
      size={size}
      type={type}
      placeholder="Search..."
      onChange={(value) => {}}
      onSearch={() => {}}
    />
  ),
})
