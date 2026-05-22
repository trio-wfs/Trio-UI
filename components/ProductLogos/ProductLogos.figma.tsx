import figma from '@figma/code-connect'
import { ProductLogos } from './ProductLogos'

figma.connect(ProductLogos, 'https://www.figma.com/design/PjAYuPDr8IA1ccwiAjFkSD?node-id=3868-51906', {
  props: {
    logoType: figma.enum('logoType', {
      white: 'white',
      dark: 'dark',
      logoOnly: 'logoOnly',
    }),
  },
  example: ({ logoType }) => (
    <ProductLogos logoType={logoType} />
  ),
})
