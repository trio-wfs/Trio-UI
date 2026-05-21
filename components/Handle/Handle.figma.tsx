import figma from '@figma/code-connect';
import { Handle } from './Handle';

figma.connect(Handle, 'https://www.figma.com/design/PjAYuPDr8IA1ccwiAjFkSD?node-id=5460-2553', {
  props: {
    state: figma.enum('state', {
      Default: 'default', // Figma value is 'Default' (capital D); code state type is lowercase. Bridge here.
      hover: 'hover',
      drag: 'drag',
    }),
  },
  example: ({ state }) => (
    <Handle state={state} />
  ),
});
