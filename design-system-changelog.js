/**
 * TRIO WFS Design System — Changelog Data
 *
 * Single source of truth for all changelog entries.
 * Used by design-system-overview.html (recent 5) and changelog.html (full list).
 *
 * To add an entry: prepend to the DS_CHANGELOG array below.
 * Format: { date: 'YYYY-MM-DD', text: 'Description', type: 'Type' }
 * Types: Components, Tokens, Guidelines, Branding, Infrastructure, Architecture
 */

const DS_CHANGELOG = [
  { date: '2026-04-27', text: 'All 28 showcase pages now render live React components via ThemeProvider mount system', type: 'Infrastructure' },
  { date: '2026-04-27', text: '6 new components: DatePicker, PopOver, NumberField, Slider, ProductLogos, Handle', type: 'Components' },
  { date: '2026-04-27', text: 'DatePicker — MUI X wrapper with dayjs, TRIO-themed calendar popup, CalendarMonthOutlined icon', type: 'Components' },
  { date: '2026-04-27', text: 'PopOver — MUI Popover wrapper with header, action link, scrollable content area', type: 'Components' },
  { date: '2026-04-27', text: 'NumberField — numeric stepper input with +/- buttons, medium/small sizes', type: 'Components' },
  { date: '2026-04-27', text: 'Slider — MUI Slider themed to TRIO tokens (primary blue track, 4px height)', type: 'Components' },
  { date: '2026-04-27', text: 'ProductLogos — TRIO logo renderer with dark/white/icon-only variants', type: 'Components' },
  { date: '2026-04-27', text: 'Handle — drag grip component with hover/active CSS states', type: 'Components' },
  { date: '2026-04-27', text: 'New deps: @mui/x-date-pickers, dayjs', type: 'Infrastructure' },
  { date: '2026-04-27', text: 'Showcase mount system expanded — 10+ new icons, nested icon resolution for ToggleButton', type: 'Infrastructure' },
  { date: '2026-04-27', text: 'Component count: 35 (up from 29)', type: 'Components' },
  { date: '2026-04-20', text: 'Digital Jesse — design philosophy, brand voice, and pattern rules document created', type: 'Guidelines' },
  { date: '2026-04-20', text: 'Chip usage rules formalized — filled vs outlined, semantic variants, filter patterns', type: 'Guidelines' },
  { date: '2026-04-20', text: 'AG Grid standards locked — 42px rows, zebra stripe, both borders, infinite scroll', type: 'Guidelines' },
  { date: '2026-04-20', text: 'Typography hierarchy documented — H6 through Overline with color rules', type: 'Guidelines' },
  { date: '2026-04-16', text: 'All 24 showcase pages migrated to unified template', type: 'Components' },
  { date: '2026-04-16', text: 'TRIO/UI branding — icon lockup, animated nebula hero, nav download button', type: 'Branding' },
  { date: '2026-04-16', text: 'Developer CSS tokens (trio-tokens.css) — ~95 custom properties', type: 'Tokens' },
  { date: '2026-04-16', text: 'GitHub Pages auto-deploy live', type: 'Infrastructure' },
  { date: '2026-04-15', text: 'Central theme.ts — 25 MUI component overrides, consumed by Storybook and apps', type: 'Tokens' },
  { date: '2026-04-15', text: 'All 24 components now have Storybook stories', type: 'Components' },
  { date: '2026-04-14', text: 'Adopted central MUI theme architecture — single theme.ts replaces per-component overrides', type: 'Architecture' },
  { date: '2026-04-07', text: 'PAGE_ARCHITECTURE.md — page layer order, elevation rules, header variants', type: 'Guidelines' },
  { date: '2026-04-01', text: 'Stepper component added', type: 'Components' },
  { date: '2026-04-01', text: 'Button and Chip icon props changed from boolean to ReactNode', type: 'Components' },
  { date: '2026-04-01', text: 'Design tokens corrected — success.main, text.secondary, shadows.sm, dataViz.teal added', type: 'Tokens' },
  { date: '2026-03-20', text: 'Figma MCP replaces REST API scripts — all component specs pulled via MCP', type: 'Infrastructure' },
];

const DS_CHANGELOG_TYPE_COLORS = {
  'Components':     { bg: '#E3F2FD', text: '#1976D2' },
  'Tokens':         { bg: '#E8F5E9', text: '#388E3C' },
  'Guidelines':     { bg: '#FCF1E0', text: '#E17109' },
  'Branding':       { bg: '#F3E5F5', text: '#7B1FA2' },
  'Infrastructure': { bg: '#FAFAFA', text: '#616161' },
  'Architecture':   { bg: '#E4F7FD', text: '#4B9AB0' },
};

/**
 * Render changelog entries into a <tbody> element.
 * @param {string} tbodyId - ID of the target tbody
 * @param {number} [limit] - Max entries to show (omit for all)
 */
function renderChangelog(tbodyId, limit) {
  const tbody = document.getElementById(tbodyId);
  if (!tbody) return;

  const entries = limit ? DS_CHANGELOG.slice(0, limit) : DS_CHANGELOG;

  tbody.innerHTML = entries.map((entry, i) => {
    const colors = DS_CHANGELOG_TYPE_COLORS[entry.type] || DS_CHANGELOG_TYPE_COLORS['Infrastructure'];
    const stripe = i % 2 === 1 ? 'background: #FAFAFA;' : '';
    return `<tr style="border-bottom: 1px solid var(--color-secondary-outline); ${stripe}">
      <td style="padding: 8px 16px; color: var(--color-text-secondary); font-size: 12px; white-space: nowrap;">${entry.date}</td>
      <td style="padding: 8px 16px; color: var(--color-text-primary);">${entry.text}</td>
      <td style="padding: 8px 16px;">
        <span style="font-size: 11px; padding: 2px 8px; border-radius: 999px; background: ${colors.bg}; color: ${colors.text}; font-weight: 500; white-space: nowrap;">${entry.type}</span>
      </td>
    </tr>`;
  }).join('');
}
