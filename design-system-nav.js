/**
 * TRIO WFS Design System — Shared Navigation
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
    { label: 'Alert',         icon: 'notification_important', href: 'components/Alert/alert-showcase.html' },
    { label: 'Autocomplete',  icon: 'search',                 href: 'components/Autocomplete/autocomplete-showcase.html' },
    { label: 'Badge',         icon: 'fiber_manual_record',    href: 'components/Badge/badge-showcase.html' },
    { label: 'Breadcrumb',    icon: 'more_horiz',             href: 'components/Breadcrumb/breadcrumb-showcase.html' },
    { label: 'Button',        icon: 'smart_button',           href: 'components/Button/button-showcase.html' },
    { label: 'Button Group',  icon: 'view_week',              href: 'components/ButtonGroup/button-group-showcase.html' },
    { label: 'Button Icon',   icon: 'crop_square',            href: 'components/ButtonIcon/button-icon-showcase.html' },
    { label: 'Checkbox',      icon: 'check_box',              href: 'components/Checkbox/checkbox-showcase.html' },
    { label: 'Chip',          icon: 'label',                  href: 'components/Chip/chip-showcase.html' },
    { label: 'Menu',          icon: 'menu',                   href: 'components/Menu/menu-showcase.html' },
    { label: 'Nav Vertical',  icon: 'view_sidebar',           href: 'components/NavigationVertical/navigation-vertical-showcase.html' },
    { label: 'Page Header',   icon: 'web_asset',              href: 'components/PageHeaderToolbar/page-header-toolbar-showcase.html' },
    { label: 'Metric Card',   icon: 'dashboard',              href: 'components/MetricCard/metric-card-showcase.html' },
    { label: 'Modal',         icon: 'web_asset',              href: 'components/Modal/modal-showcase.html' },
    { label: 'Radio',         icon: 'radio_button_checked',   href: 'components/RadioGroup/radio-group-showcase.html' },
    { label: 'Search Bar',    icon: 'search',                 href: 'components/SearchBar/search-bar-showcase.html' },
    { label: 'Select',        icon: 'arrow_drop_down_circle', href: 'components/Select/select-showcase.html' },
    { label: 'Split Button',  icon: 'call_split',             href: 'components/SplitButton/split-button-showcase.html' },
    { label: 'Switch',        icon: 'toggle_on',              href: 'components/Switch/switch-showcase.html' },
    { label: 'Tabs',          icon: 'tab',                    href: 'components/Tabs/tabs-showcase.html' },
    { label: 'Text Field',    icon: 'text_fields',            href: 'components/TextField/text-field-showcase.html' },
    { label: 'Toggle Button', icon: 'view_week',              href: 'components/ToggleButton/toggle-button-showcase.html' },
    { label: 'Tooltip',       icon: 'chat_bubble_outline',    href: 'components/Tooltip/tooltip-showcase.html' },
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
      <h1>TRIO WFS Design System</h1>
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
