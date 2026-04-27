import figma from '@figma/code-connect'
import { Slider } from './Slider'

figma.connect(Slider, 'https://www.figma.com/design/PjAYuPDr8IA1ccwiAjFkSD?node-id=2060-6895', {
  props: {},
  example: () => (
    <Slider
      min={0}
      max={100}
      value={40}
      valueLabelDisplay="auto"
    />
  ),
})
