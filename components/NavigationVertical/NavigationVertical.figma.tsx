import figma from '@figma/code-connect'
import { NavigationVertical } from './NavigationVertical'
import DashboardIcon from '@mui/icons-material/Dashboard'

figma.connect(NavigationVertical, 'https://www.figma.com/design/PjAYuPDr8IA1ccwiAjFkSD?node-id=4795-1339', {
  props: {
    settings: figma.boolean('settings'),
    subSection: figma.boolean('subSection'),
  },
  example: ({ settings, subSection }) => (
    <NavigationVertical
      items={[
        {
          id: 'dashboard',
          label: 'Dashboard',
          icon: <DashboardIcon />,
          expandable: subSection,
          subItems: subSection
            ? [{ id: 'overview', label: 'Overview' }, { id: 'details', label: 'Details' }]
            : [],
        },
        { id: 'orders', label: 'Orders', icon: <DashboardIcon /> },
        { id: 'workers', label: 'Workers', icon: <DashboardIcon /> },
      ]}
      activeId="dashboard"
      settings={settings}
      settingsItems={[
        { id: 'program', label: 'Program Details' },
        { id: 'users', label: 'Users & Roles' },
      ]}
      onNavigate={() => {}}
    />
  ),
})
