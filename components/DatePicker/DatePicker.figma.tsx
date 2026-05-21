import figma from '@figma/code-connect'
import { DatePicker } from './DatePicker'

figma.connect(DatePicker, 'https://www.figma.com/design/PjAYuPDr8IA1ccwiAjFkSD?node-id=2784-5964', {
  props: {
    // NOTE: Figma's `withChips` variant has no code equivalent (code's
    // DatePickerType is 'date' | 'dateTime' only). Intentionally not mapped —
    // a Figma withChips instance will resolve to undefined here. If withChips
    // becomes a real code feature, add the mapping + type union value.
    type: figma.enum('type', {
      date: 'date',
      dateTime: 'dateTime',
    }),
  },
  example: ({ type }) => (
    <DatePicker
      type={type}
      label="Date"
    />
  ),
})
