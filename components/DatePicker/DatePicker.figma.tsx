import figma from '@figma/code-connect'
import { DatePicker } from './DatePicker'

figma.connect(DatePicker, 'https://www.figma.com/design/PjAYuPDr8IA1ccwiAjFkSD?node-id=2784-5964', {
  props: {
    type: figma.enum('Type', {
      'Date': 'date',
      'Time and Date': 'dateTime',
      'Date Picker with Chips (custom': 'date',
    }),
  },
  example: ({ type }) => (
    <DatePicker
      type={type}
      label="Date"
    />
  ),
})
