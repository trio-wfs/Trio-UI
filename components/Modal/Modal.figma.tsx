// NOTE: Modal does not have a direct node in the Figma component manifest.
// This connection is a best-effort mapping based on the Modal types spec.
// Update node-id when a dedicated Modal component is added to the Figma design system.

import figma from '@figma/code-connect'
import { Modal } from './Modal'

figma.connect(Modal, 'https://www.figma.com/design/PjAYuPDr8IA1ccwiAjFkSD?node-id=2385-10582', {
  props: {},
  example: () => (
    <Modal
      open={true}
      onClose={() => {}}
      title="Modal Title"
      size="sm"
      variant="default"
      confirmLabel="Confirm"
      cancelLabel="Cancel"
    >
      Modal content goes here.
    </Modal>
  ),
})
