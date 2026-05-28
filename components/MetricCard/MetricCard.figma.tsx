import figma from '@figma/code-connect'
import { MetricCard } from './MetricCard'

/**
 * MetricCard Code Connect mapping
 *
 * Maps Figma component properties to React props:
 * - `label` (Figma TEXT)        → label
 * - `style` (Figma VARIANT)     → footer ('bar' | 'icons' | 'labels' | list-as-none)
 * - `Show Help Icon` (BOOLEAN)  → showHelpIcon (deprecated — prefer `helpContent` in code)
 *
 * NOT mapped (Figma model gap — write directly in code):
 * - `state` (1/2/3/4/grouped)   — controlled by `metrics.length` + `layout`
 * - `icon` (Figma INSTANCE_SWAP) — controlled by `labelIcon` (Material icon name string)
 * - `metrics` array              — Figma has no array representation
 * - `helpContent` (ReactNode)    — write inline; the (?) icon renders automatically when set
 * - `excludePrimaryFromBar`      — opt-in flag for the "total + breakdown" pattern;
 *                                  set when metrics[0] is the sum of the rest, so the
 *                                  bar segments only the breakdown (not the total)
 * - `MetricItem.onClick`         — per-value click handler; pass on a metric to make it
 *                                  a focusable button with pointer cursor (filter trigger)
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
        { label: 'Approved', value: 84 },
        { label: 'Pending', value: 23, color: 'warning' },
        { label: 'Rejected', value: 11, color: 'error' },
      ]}
    />
  ),
})

// ── Patterns the basic example doesn't cover (for engineers reading source) ─
//
// Total + breakdown — primary is the sum, bar segments only the breakdown:
//   <MetricCard
//     label="Privileges" layout="grouped" footer="bar" excludePrimaryFromBar
//     metrics={[
//       { label: 'Total',       value: 14 },
//       { label: 'Active',      value: 7 },
//       { label: 'In Progress', value: 7 },
//     ]}
//   />
//
// Tappable per-value — each metric with onClick becomes a focusable button:
//   <MetricCard
//     label="Privileges" layout="grouped" excludePrimaryFromBar
//     metrics={[
//       { label: 'Total',       value: 14 },                                      // not clickable
//       { label: 'Active',      value: 7, onClick: () => setFilter('active') },
//       { label: 'In Progress', value: 7, onClick: () => setFilter('in-progress') },
//     ]}
//   />
//
// Rich tooltip via helpContent (preferred over showHelpIcon):
//   <MetricCard
//     label="Coverage Risk"
//     helpContent={<><strong>Expiring</strong> — 14 within 45 days. <strong>Single-Facility</strong> — 8 providers…</>}
//     metrics={[…]} footer="icons"
//   />
