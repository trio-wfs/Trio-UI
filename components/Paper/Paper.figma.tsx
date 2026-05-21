import figma from '@figma/code-connect'
import { Paper } from './Paper'

figma.connect(Paper, 'https://www.figma.com/design/PjAYuPDr8IA1ccwiAjFkSD?node-id=7824-2', {
  props: {
    level: figma.enum('level', {
      default: 'default',
      secondary: 'secondary',
      subtle: 'subtle',
      paper: 'paper',
      accent: 'accent',
    }),
  },
  example: ({ level }) => (
    <Paper level={level}>
      {/* content */}
    </Paper>
  ),
})
