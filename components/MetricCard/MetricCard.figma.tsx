import figma from '@figma/code-connect'
import { MetricCard } from './MetricCard'

figma.connect(MetricCard, 'https://www.figma.com/design/PjAYuPDr8IA1ccwiAjFkSD?node-id=3787-29023', {
  props: {},
  example: () => (
    <MetricCard
      label="Metric Label"
      footer="bar"
      metrics={[
        { label: 'Metric 1', value: 42 },
        { label: 'Metric 2', value: 18 },
      ]}
    />
  ),
})
