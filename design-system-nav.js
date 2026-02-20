/**
 * AHTG Design System — Shared Navigation
 *
 * Single source of truth for sidebar nav.
 * All pages include this script and call renderNav().
 *
 * To add a new component: add one entry to COMPONENTS below.
 */

const DS_NAV = {
  foundation: [
    { label: 'Overview',    icon: 'home',        href: 'design-system-overview.html' },
    { label: 'Colors',      icon: 'palette',      href: 'design-tokens-colors.html' },
    { label: 'Typography',  icon: 'text_fields',  href: 'design-tokens-typography.html' },
    { label: 'Spacing',     icon: 'space_bar',    href: 'design-tokens-spacing.html' },
  ],
  components: [
    { label: 'Button',        icon: 'smart_button',           href: 'components/Button/button-showcase.html' },
    { label: 'Button Group',  icon: 'view_week',              href: 'components/ButtonGroup/button-group-showcase.html' },
    { label: 'Text Field',    icon: 'text_fields',            href: 'components/TextField/text-field-showcase.html' },
    { label: 'Autocomplete',  icon: 'search',                 href: 'components/Autocomplete/autocomplete-showcase.html' },
    { label: 'Checkbox',      icon: 'check_box',              href: 'components/Checkbox/checkbox-showcase.html' },
    { label: 'Radio',         icon: 'radio_button_checked',   href: 'components/RadioGroup/radio-group-showcase.html' },
    { label: 'Switch',        icon: 'toggle_on',              href: 'components/Switch/switch-showcase.html' },
    { label: 'Select',        icon: 'arrow_drop_down_circle', href: 'components/Select/select-showcase.html' },
    { label: 'Menu',          icon: 'menu',                   href: 'components/Menu/menu-showcase.html' },
    { label: 'Chip',          icon: 'label',                  href: 'components/Chip/chip-showcase.html' },
    { label: 'Metric Card',   icon: 'dashboard',              href: 'components/MetricCard/metric-card-showcase.html' },
  ],
};

function renderNav(currentHref) {
  // Detect depth from current page path relative to shared-data root
  const path = window.location.pathname;
  const isComponent = path.includes('/components/');
  // Components are 2 levels deep: components/Name/file.html → root = ../../
  // Foundation pages are 1 level deep: file.html → root = ./
  const root = isComponent ? '../../' : './';

  const activeHref = currentHref || path.split('/').pop();

  function makeLink(item) {
    const fullHref = root + item.href;
    const itemFile = item.href.split('/').pop();
    const isActive = path.endsWith(itemFile) || (currentHref && currentHref === item.href);
    return `<a href="${fullHref}" class="nav-item${isActive ? ' active' : ''}">
      <span class="material-icons">${item.icon}</span>${item.label}
    </a>`;
  }

  const html = `
    <div class="sidebar-header">
      <h1>AHTG Design System</h1>
      <p>Desktop SaaS Components</p>
    </div>
    <nav>
      <div class="nav-section">
        <div class="nav-section-title">Getting Started</div>
        ${DS_NAV.foundation.map(makeLink).join('\n        ')}
      </div>
      <div class="nav-section">
        <div class="nav-section-title">Components</div>
        ${DS_NAV.components.map(makeLink).join('\n        ')}
      </div>
    </nav>
  `;

  const sidebar = document.querySelector('.sidebar') || document.querySelector('aside');
  if (sidebar) sidebar.innerHTML = html;
}

// Auto-render on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => renderNav());
