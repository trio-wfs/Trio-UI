import figma from '@figma/code-connect'
import { ProductLogos } from './ProductLogos'

figma.connect(ProductLogos, 'https://www.figma.com/design/PjAYuPDr8IA1ccwiAjFkSD?node-id=3868-51906', {
  props: {
    logoType: figma.enum('Logo Type', {
      'White Lettering': 'white',
      'Dark Lettering': 'dark',
      'Logo Only': 'logoOnly',
    }),
  },
  example: ({ logoType }) => (
    <ProductLogos logoType={logoType} />
  ),
})
