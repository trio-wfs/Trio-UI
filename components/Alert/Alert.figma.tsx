import figma from '@figma/code-connect'
import { Alert } from './Alert'

figma.connect(Alert, 'https://www.figma.com/design/PjAYuPDr8IA1ccwiAjFkSD?node-id=2063-3499', {
  props: {
    variant: figma.enum('variant', {
      standard: 'standard',
      contained: 'contained',
      outline: 'outline',
    }),
    severity: figma.enum('severity', {
      default: 'default',
      error: 'error',
      warning: 'warning',
      success: 'success',
    }),
    title: figma.boolean('title'),
    description: figma.boolean('description'),
    actionBtn: figma.boolean('action-btn'),
    close: figma.boolean('close'),
  },
  example: ({ variant, severity, title, description, actionBtn, close }) => (
    <Alert
      variant={variant}
      severity={severity}
      title={title}
      description={description}
      actionBtn={actionBtn}
      close={close}
      titleText="Title"
      descriptionText="Description text providing additional context."
      actionLabel="Action Label"
    />
  ),
})
