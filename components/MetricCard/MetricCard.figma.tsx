import figma from '@figma/code-connect'
import { MetricCard } from './MetricCard'

figma.connect(MetricCard, 'https://www.figma.com/design/PjAYuPDr8IA1ccwiAjFkSD?node-id=3787-29023', {
  props: {
    label: figma.string('label'),
    showHelpIcon: figma.boolean('Show help_outline'),
    footer: figma.enum('style', {
      bar: 'bar',
      icon: 'icons',
      list: 'none',
      custom: 'labels',
    }),
  },
  example: ({ label, showHelpIcon, footer }) => (
    <MetricCard
      label={label}
      showHelpIcon={showHelpIcon}
      footer={footer}
      metrics={[
        { label: 'Metric 1', value: 42 },
        { label: 'Metric 2', value: 18 },
      ]}
    />
  ),
})
