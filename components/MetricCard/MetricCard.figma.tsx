import figma from '@figma/code-connect'
import { MetricCard } from './MetricCard'

/**
 * MetricCard Code Connect mapping
 *
 * Maps Figma component properties to React props:
 * - `label` (Figma TEXT)        → label
 * - `style` (Figma VARIANT)     → footer ('bar' | 'icons' | 'labels' | list-as-fallback)
 * - `Show Help Icon` (BOOLEAN)  → showHelpIcon
 *
 * NOT mapped (Figma model gap):
 * - `state` (1/2/3/4/grouped)   — controlled in code by `metrics.length` + `layout`
 * - `icon` (Figma INSTANCE_SWAP) — controlled in code by `labelIcon` (Material icon name string)
 * - `metrics` array              — Figma has no array representation; engineer always writes this
 */
figma.connect(MetricCard, 'https://www.figma.com/design/PjAYuPDr8IA1ccwiAjFkSD?node-id=3787-29023', {
  props: {
    label: figma.string('label'),
    showHelpIcon: figma.boolean('Show Help Icon'),
    footer: figma.enum('style', {
      bar: 'bar',
      icons: 'icons',
      labels: 'labels',
      // Figma's `list` is conceptually a 4-metric vertical layout, not a footer style.
      // Code achieves this via metrics.length=4 with layout='auto'. Map to 'none' here
      // (no footer) — the engineer pairs this with a 4-item metrics array.
      list: 'none',
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
