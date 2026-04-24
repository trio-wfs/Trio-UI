/**
 * TRIO WFS Design System — Shared Navigation
 *
 * Single source of truth for sidebar nav.
 * All pages include this script and renderNav() is called automatically.
 *
 * To add a component: add an entry to the appropriate section below.
 */

const DS_NAV = {
  foundation: [
    { label: 'Overview',    icon: 'home',        href: 'design-system-overview.html' },
    { label: 'Changelog',   icon: 'update',       href: 'changelog.html' },
    { label: 'Colors',      icon: 'palette',      href: 'design-tokens-colors.html' },
    { label: 'Typography',  icon: 'text_fields',  href: 'design-tokens-typography.html' },
    { label: 'Spacing',     icon: 'space_bar',    href: 'design-tokens-spacing.html' },
  ],

  // MUI-based components — built on Material UI primitives
  mui: [
    { label: 'Alert',         icon: 'notification_important', href: 'components/Alert/alert-showcase.html' },
    { label: 'Autocomplete',  icon: 'search',                 href: 'components/Autocomplete/autocomplete-showcase.html' },
    { label: 'Badge',         icon: 'fiber_manual_record',    href: 'components/Badge/badge-showcase.html' },
    { label: 'Breadcrumb',    icon: 'more_horiz',             href: 'components/Breadcrumb/breadcrumb-showcase.html' },
    { label: 'Button',        icon: 'smart_button',           href: 'components/Button/button-showcase.html' },
    { label: 'Button Group',  icon: 'view_week',              href: 'components/ButtonGroup/button-group-showcase.html' },
    { label: 'Button Icon',   icon: 'crop_square',            href: 'components/ButtonIcon/button-icon-showcase.html' },
    { label: 'Checkbox',      icon: 'check_box',              href: 'components/Checkbox/checkbox-showcase.html' },
    { label: 'Chip',               icon: 'label',                  href: 'components/Chip/chip-showcase.html' },
    { label: 'ContentContainer',  icon: 'crop_free',              href: 'components/ContentContainer/content-container-showcase.html' },
    { label: 'Menu',              icon: 'menu',                   href: 'components/Menu/menu-showcase.html' },
    { label: 'Modal',         icon: 'web_asset',              href: 'components/Modal/modal-showcase.html' },
    { label: 'Radio',         icon: 'radio_button_checked',   href: 'components/RadioGroup/radio-group-showcase.html' },
    { label: 'Select',        icon: 'arrow_drop_down_circle', href: 'components/Select/select-showcase.html' },
    { label: 'Switch',        icon: 'toggle_on',              href: 'components/Switch/switch-showcase.html' },
    { label: 'Tabs',          icon: 'tab',                    href: 'components/Tabs/tabs-showcase.html' },
    { label: 'Text Field',    icon: 'text_fields',            href: 'components/TextField/text-field-showcase.html' },
    { label: 'Toggle Button', icon: 'view_week',              href: 'components/ToggleButton/toggle-button-showcase.html' },
    { label: 'Tooltip',       icon: 'chat_bubble_outline',    href: 'components/Tooltip/tooltip-showcase.html' },
  ],

  // Custom TRIO components — built specifically for TRIO WFS
  custom: [
    { label: 'Footer',         icon: 'horizontal_rule', href: 'components/Footer/footer-showcase.html' },
    { label: 'Metric Card',   icon: 'dashboard',    href: 'components/MetricCard/metric-card-showcase.html' },
    { label: 'Nav Header',    icon: 'web',          href: 'components/NavigationHeader/navigation-header-showcase.html' },
    { label: 'Nav Vertical',  icon: 'view_sidebar', href: 'components/NavigationVertical/navigation-vertical-showcase.html' },
    { label: 'Page Header',   icon: 'web_asset',    href: 'components/PageHeaderToolbar/page-header-toolbar-showcase.html' },
    { label: 'Search Bar',    icon: 'search',       href: 'components/SearchBar/search-bar-showcase.html' },
    { label: 'Split Button',  icon: 'call_split',   href: 'components/SplitButton/split-button-showcase.html' },
    { label: 'Stepper',       icon: 'linear_scale', href: 'components/Stepper/stepper-showcase.html' },
  ],

  // Data Visualization — AG Charts components themed to TRIO design tokens
  dataviz: [
    { label: 'Chart',  icon: 'bar_chart', href: 'components/Chart/chart-showcase.html' },
  ],

  // Page Templates — assembled layouts for common TRIO screens
  templates: [
    { label: 'Page Templates', icon: 'view_quilt', href: 'page-templates.html' },
  ],
};

function renderNav(currentHref) {
  const path = window.location.pathname;
  const isComponent = path.includes('/components/');
  const root = isComponent ? '../../' : './';

  function makeLink(item) {
    const fullHref = root + item.href;
    const itemFile = item.href.split('/').pop();
    const isActive = path.endsWith(itemFile) || (currentHref && currentHref === item.href);
    return `<a href="${fullHref}" class="nav-item${isActive ? ' active' : ''}">
      <span class="material-icons-outlined">${item.icon}</span>${item.label}
    </a>`;
  }

  const templatesSection = `
    <div class="nav-section">
      <div class="nav-section-title">Page Templates</div>
      <div class="nav-item nav-item-empty">Coming soon</div>
    </div>`;

  const html = `
    <div class="sidebar-header">
      <div class="sidebar-brand">
        <img src="${root}assets/trio-icon.svg" alt="TRIO" class="sidebar-logo" />
        <div class="sidebar-brand-text">
          <h1>TRIO<span class="brand-separator">/</span><span class="brand-ui">UI</span></h1>
          <p>Design System</p>
        </div>
      </div>
    </div>
    <nav>
      <div class="nav-section">
        <div class="nav-section-title">Foundation</div>
        ${DS_NAV.foundation.map(makeLink).join('\n        ')}
      </div>
      <div class="nav-section">
        <div class="nav-section-title">MUI Components</div>
        ${DS_NAV.mui.map(makeLink).join('\n        ')}
      </div>
      <div class="nav-section">
        <div class="nav-section-title">Custom Components</div>
        ${DS_NAV.custom.map(makeLink).join('\n        ')}
      </div>
      <div class="nav-section">
        <div class="nav-section-title">Data Visualization</div>
        ${DS_NAV.dataviz.map(makeLink).join('\n        ')}
      </div>
      ${DS_NAV.templates.length > 0
        ? `<div class="nav-section">
            <div class="nav-section-title">Page Templates</div>
            ${DS_NAV.templates.map(makeLink).join('\n        ')}
          </div>`
        : templatesSection
      }
    </nav>
    <div class="sidebar-footer">
      <a href="${root}design-tokens/trio-tokens.css" download="trio-tokens.css" class="sidebar-download">
        <span class="material-icons-outlined">download</span>
        Download Tokens
      </a>
    </div>
  `;

  const sidebar = document.querySelector('.sidebar') || document.querySelector('aside');
  if (sidebar) sidebar.innerHTML = html;
}

// Auto-render on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => renderNav());
