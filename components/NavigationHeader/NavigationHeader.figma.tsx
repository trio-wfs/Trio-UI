import figma from '@figma/code-connect';
import { NavigationHeader } from './NavigationHeader';

figma.connect(NavigationHeader, 'https://www.figma.com/design/PjAYuPDr8IA1ccwiAjFkSD?node-id=3868-49596', {
  props: {},
  example: () => (
    <NavigationHeader
      navItems={[
        { id: 'dashboards', label: 'Dashboards', hasDropdown: true },
        { id: 'nursing', label: 'Nursing/Allied', hasDropdown: true },
        { id: 'locums', label: 'Locums', hasDropdown: true },
        { id: 'perdiem', label: 'Per Diem', hasDropdown: true },
        { id: 'irm', label: 'IRM', hasDropdown: true },
        { id: 'clients', label: 'Clients' },
        { id: 'agencies', label: 'Agencies' },
        { id: 'billing', label: 'Billing', hasDropdown: true },
        { id: 'reports', label: 'Reports' },
        { id: 'admin', label: 'Administration', hasDropdown: true },
      ]}
      activeItemId="perdiem"
      user={{ name: 'Jesse Szygiel', initials: 'JS' }}
      badgeText="TRIO WIP"
      onNavItemClick={(id) => console.log(id)}
    />
  ),
});
