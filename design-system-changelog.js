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
  { date: '2026-05-21', text: 'Downloads page — new React Component Library section: GitHub source link to /components, full repo clone, and copy-npm-install command. Tokens section retained below.', type: 'Infrastructure' },
  { date: '2026-05-21', text: 'Engineering Handoff page — new Foundation entry for devs: how to consume @trio-wfs/ui, the four pillars (components, tokens, page architecture, Storybook), install/import code, reference prototypes, and explicit asks of engineering. Component links point to GitHub source, not the showcase site.', type: 'Guidelines' },
  { date: '2026-05-21', text: 'Page Architecture wired into Foundation nav with a back-link in its sidebar — no longer a dead-end reference doc.', type: 'Infrastructure' },
  { date: '2026-05-21', text: 'Prototypes page restructured — split into React Prototypes (built with @trio-wfs/ui) and Figma Prototypes sections, plus a single handoff callout replacing the old How-It-Works wallpaper.', type: 'Infrastructure' },
  { date: '2026-05-21', text: 'Showcase simplification sweep — dead Storybook/Zeplin placeholder links removed from 25 pages, redundant Overview 3-card grid (Purpose/Visual Hierarchy/Accessibility) removed from 23 pages. 932 lines of duplicated copy gone.', type: 'Components' },
  { date: '2026-05-04', text: 'Select — new small size variant (28px height, 12px font, 8px padding). All states supported at both sizes.', type: 'Components' },
  { date: '2026-05-04', text: 'Semantic chart colors added to tokens.ts (charts.info, charts.error, charts.warning, charts.success). Material color strips section added to Colors page. MetricCard now references shared chart tokens.', type: 'Tokens' },
  { date: '2026-05-04', text: 'Select — disabled state fix: border now uses disabledBorder token (#E0E0E0) instead of enabledBorder (#9E9E9E). Background fill + muted border + disabled text all aligned.', type: 'Components' },
  { date: '2026-04-29', text: 'PageHeaderToolbar NewCanvas — scroll-triggered bottom divider fades in on scroll (1px, divider color, 200ms ease). New scrollContainerRef prop for nested scroll containers.', type: 'Components' },
  { date: '2026-04-29', text: 'NavigationVertical — title dropdown selector using Menu component. New props: titleMenuItems, onTitleMenuSelect.', type: 'Components' },
  { date: '2026-04-29', text: 'Menu showcase — new Trigger Patterns section documenting Button, Input Field, and Chip anchor patterns.', type: 'Guidelines' },
  { date: '2026-04-29', text: 'Full design system audit — 20+ factual corrections across 13 component showcase pages (wrong dimensions, missing props, stale tokens).', type: 'Components' },
  { date: '2026-04-29', text: 'Token corrections — success.main #388E3C, success.dark #2E7D32, text.secondary rgba(0,0,0,0.6), Modal small 550px. Updated tokens.ts, design-system.md, CLAUDE.md.', type: 'Tokens' },
  { date: '2026-04-29', text: 'Overview page — tech stack chips replaced with inline SVG logos (React, TypeScript, MUI, AG Grid, AG Charts, Emotion, Storybook, Figma).', type: 'Branding' },
  { date: '2026-04-29', text: 'Showcase mount — 16 nav icons added, items[].icon resolution for NavigationVertical.', type: 'Infrastructure' },
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
 * @param {string} [filterType] - Only show entries of this type (omit for all)
 */
function renderChangelog(tbodyId, limit, filterType) {
  const tbody = document.getElementById(tbodyId);
  if (!tbody) return;

  let entries = filterType
    ? DS_CHANGELOG.filter(e => e.type === filterType)
    : DS_CHANGELOG;
  if (limit) entries = entries.slice(0, limit);

  tbody.innerHTML = entries.map((entry, i) => {
    const colors = DS_CHANGELOG_TYPE_COLORS[entry.type] || DS_CHANGELOG_TYPE_COLORS['Infrastructure'];
    const stripe = i % 2 === 1 ? 'background: #FAFAFA;' : '';
    return `<tr style="border-bottom: 1px solid var(--color-secondary-outline); ${stripe}">
      <td style="padding: 12px 16px; color: var(--color-text-secondary); font-size: 12px; white-space: nowrap;">${entry.date}</td>
      <td style="padding: 12px 16px; color: var(--color-text-primary); line-height: 20px;">${entry.text}</td>
      <td style="padding: 12px 16px;">
        <span style="font-size: 11px; padding: 2px 8px; border-radius: 999px; background: ${colors.bg}; color: ${colors.text}; font-weight: 500; white-space: nowrap;">${entry.type}</span>
      </td>
    </tr>`;
  }).join('');
}

/**
 * Render filter chips for changelog types into a container element.
 * Clicking a chip filters the changelog table; clicking again (or "All") resets.
 * @param {string} containerId - ID of the element to hold filter chips
 * @param {string} tbodyId - ID of the changelog <tbody> to re-render on filter
 */
function renderChangelogFilters(containerId, tbodyId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const types = Object.keys(DS_CHANGELOG_TYPE_COLORS);
  let activeType = null;

  function buildChips() {
    const allActive = activeType === null;
    let html = `<button data-filter="all" style="
      font-family: Roboto, sans-serif; font-size: 12px; font-weight: 500;
      padding: 4px 12px; border-radius: 999px; cursor: pointer; transition: all 0.15s;
      border: 1px solid ${allActive ? 'var(--color-primary-main)' : 'var(--color-secondary-outline)'};
      background: ${allActive ? 'var(--color-primary-main)' : 'var(--color-background-paper)'};
      color: ${allActive ? '#FFFFFF' : 'var(--color-text-secondary)'};
    ">All</button>`;

    types.forEach(type => {
      const colors = DS_CHANGELOG_TYPE_COLORS[type];
      const isActive = activeType === type;
      html += `<button data-filter="${type}" style="
        font-family: Roboto, sans-serif; font-size: 12px; font-weight: 500;
        padding: 4px 12px; border-radius: 999px; cursor: pointer; transition: all 0.15s;
        border: 1px solid ${isActive ? colors.text : 'var(--color-secondary-outline)'};
        background: ${isActive ? colors.bg : 'var(--color-background-paper)'};
        color: ${isActive ? colors.text : 'var(--color-text-secondary)'};
      ">${type}</button>`;
    });

    container.innerHTML = html;
  }

  function handleClick(e) {
    const btn = e.target.closest('[data-filter]');
    if (!btn) return;
    const filter = btn.getAttribute('data-filter');
    activeType = (filter === 'all' || filter === activeType) ? null : filter;
    buildChips();
    renderChangelog(tbodyId, undefined, activeType);
  }

  container.style.display = 'flex';
  container.style.flexWrap = 'wrap';
  container.style.gap = '8px';
  container.style.padding = '16px 16px 0';
  container.addEventListener('click', handleClick);
  buildChips();
}
