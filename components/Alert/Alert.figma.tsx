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
    title: figma.boolean('title', { true: 'Title', false: undefined }),
    description: figma.boolean('description', { true: 'Description text providing additional context.', false: undefined }),
    actionLabel: figma.boolean('action-btn', { true: 'Action Label', false: undefined }),
    close: figma.boolean('close'),
  },
  example: ({ variant, severity, title, description, actionLabel, close }) => (
    <Alert
      variant={variant}
      severity={severity}
      title={title}
      description={description}
      actionLabel={actionLabel}
      close={close}
    />
  ),
})
