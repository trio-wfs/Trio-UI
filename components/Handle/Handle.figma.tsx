import figma from '@figma/code-connect';
import { Handle } from './Handle';

figma.connect(Handle, 'https://www.figma.com/design/PjAYuPDr8IA1ccwiAjFkSD?node-id=5460-2553', {
  props: {
    state: figma.enum('state', {
      default: 'default',
      hover: 'hover',
      drag: 'drag',
    }),
  },
  example: ({ state }) => (
    <Handle state={state} />
  ),
});
