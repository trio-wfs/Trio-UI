import figma from '@figma/code-connect'
import { Card } from './Card'

figma.connect(Card, 'https://www.figma.com/design/PjAYuPDr8IA1ccwiAjFkSD?node-id=7826-4', {
  example: () => (
    <Card
      header={<div>Card title</div>}
      footer={<div>Footer actions</div>}
    >
      Body content
    </Card>
  ),
})
