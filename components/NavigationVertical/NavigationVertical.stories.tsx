import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { NavigationVertical } from './NavigationVertical';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import PersonSearchOutlinedIcon from '@mui/icons-material/PersonSearchOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';
import ChecklistOutlinedIcon from '@mui/icons-material/ChecklistOutlined';
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import ScheduleOutlinedIcon from '@mui/icons-material/ScheduleOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import FolderCopyOutlinedIcon from '@mui/icons-material/FolderCopyOutlined';

const items = [
  { id: 'dashboard', label: 'Dashboard', icon: <DashboardOutlinedIcon /> },
  { id: 'recruiting', label: 'Recruiting', icon: <PersonSearchOutlinedIcon /> },
  {
    id: 'membership',
    label: 'Membership',
    icon: <GroupsOutlinedIcon />,
    expandable: true,
    subItems: [
      { id: 'resources', label: 'Resources' },
      { id: 'resource-pools', label: 'Resource Pools' },
    ],
  },
  { id: 'segment-activity', label: '(Segment) Activity', icon: <AssignmentIndOutlinedIcon /> },
  { id: 'tasks', label: 'Tasks', icon: <ChecklistOutlinedIcon /> },
  { id: 'jobs', label: 'Jobs', icon: <BusinessCenterOutlinedIcon /> },
  { id: 'submissions', label: 'Submissions', icon: <AssignmentTurnedInOutlinedIcon /> },
  {
    id: 'shifts',
    label: 'Shifts',
    icon: <ScheduleOutlinedIcon />,
    expandable: true,
    subItems: [
      { id: 'grid-view', label: 'Grid View' },
      { id: 'calendar-view', label: 'Calendar View' },
    ],
  },
  {
    id: 'billing',
    label: 'Billing',
    icon: <MonetizationOnOutlinedIcon />,
    expandable: true,
    subItems: [
      { id: 'time-collection', label: 'Time Collection' },
      { id: 'timecards', label: 'Timecards' },
    ],
  },
  { id: 'reports', label: 'Reports', icon: <FolderCopyOutlinedIcon /> },
];

const settingsItems = [
  { id: 'program-details', label: 'Program Details' },
  { id: 'provider-confirmation', label: 'Provider Confirmation' },
  { id: 'task-automations', label: 'Task Automations' },
];

// Shared header props matching Figma spec
const headerProps = {
  title: 'Locums Program',
  subtitle: 'Sunset Grove Medical Hospital',
  titleDropdown: true,
};

const meta: Meta<typeof NavigationVertical> = {
  title: 'Components/NavigationVertical',
  component: NavigationVertical,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ height: 700, display: 'flex', background: '#F5F5F5' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof NavigationVertical>;

/** Open state — full sidebar with title header, icons + labels */
export const Open: Story = {
  render: () => {
    const [state, setState] = useState<'open' | 'closed'>('open');
    const [activeId, setActiveId] = useState('dashboard');
    const [activeSubId, setActiveSubId] = useState<string | undefined>();
    return (
      <NavigationVertical
        {...headerProps}
        items={items}
        state={state}
        activeId={activeId}
        activeSubId={activeSubId}
        onNavigate={(id, subId) => { setActiveId(id); setActiveSubId(subId); }}
        onToggleState={() => setState(s => s === 'open' ? 'closed' : 'open')}
      />
    );
  },
};

/** Collapsed state — icon rail with tooltips, no title */
export const Collapsed: Story = {
  render: () => {
    const [state, setState] = useState<'open' | 'closed'>('closed');
    const [activeId, setActiveId] = useState('dashboard');
    return (
      <NavigationVertical
        {...headerProps}
        items={items}
        state={state}
        activeId={activeId}
        onNavigate={(id) => setActiveId(id)}
        onToggleState={() => setState(s => s === 'open' ? 'closed' : 'open')}
      />
    );
  },
};

/** With expanded sub-items (inline, no secondary panel) */
export const WithSubItems: Story = {
  render: () => {
    const [state, setState] = useState<'open' | 'closed'>('open');
    const [activeId, setActiveId] = useState('shifts');
    const [activeSubId, setActiveSubId] = useState<string | undefined>('grid-view');
    return (
      <NavigationVertical
        {...headerProps}
        items={items}
        state={state}
        activeId={activeId}
        activeSubId={activeSubId}
        onNavigate={(id, subId) => { setActiveId(id); setActiveSubId(subId); }}
        onToggleState={() => setState(s => s === 'open' ? 'closed' : 'open')}
      />
    );
  },
};

/** Sub-section mode — secondary panel slides out for sub-items */
export const SubSectionPanel: Story = {
  render: () => {
    const [state, setState] = useState<'open' | 'closed'>('open');
    const [activeId, setActiveId] = useState('membership');
    const [activeSubId, setActiveSubId] = useState<string | undefined>('resources');
    return (
      <NavigationVertical
        {...headerProps}
        items={items}
        state={state}
        activeId={activeId}
        activeSubId={activeSubId}
        subSection
        onNavigate={(id, subId) => { setActiveId(id); setActiveSubId(subId); }}
        onToggleState={() => setState(s => s === 'open' ? 'closed' : 'open')}
      />
    );
  },
};

/** With settings section (inline) */
export const WithSettings: Story = {
  render: () => {
    const [state, setState] = useState<'open' | 'closed'>('open');
    const [activeId, setActiveId] = useState('dashboard');
    const [activeSubId, setActiveSubId] = useState<string | undefined>();
    const [activeSettingsId, setActiveSettingsId] = useState<string | undefined>();
    return (
      <NavigationVertical
        {...headerProps}
        items={items}
        state={state}
        activeId={activeId}
        activeSubId={activeSubId}
        settings
        settingsItems={settingsItems}
        activeSettingsId={activeSettingsId}
        onNavigate={(id, subId) => {
          if (settingsItems.find(s => s.id === id)) {
            setActiveSettingsId(id);
          } else {
            setActiveId(id);
            setActiveSubId(subId);
            setActiveSettingsId(undefined);
          }
        }}
        onToggleState={() => setState(s => s === 'open' ? 'closed' : 'open')}
      />
    );
  },
};

/** Collapsed with settings gear icon */
export const CollapsedWithSettings: Story = {
  render: () => {
    const [state, setState] = useState<'open' | 'closed'>('closed');
    const [activeId, setActiveId] = useState('dashboard');
    const [activeSettingsId, setActiveSettingsId] = useState<string | undefined>();
    return (
      <NavigationVertical
        {...headerProps}
        items={items}
        state={state}
        activeId={activeId}
        settings
        settingsItems={settingsItems}
        activeSettingsId={activeSettingsId}
        onNavigate={(id) => {
          if (settingsItems.find(s => s.id === id)) {
            setActiveSettingsId(id);
          } else {
            setActiveId(id);
            setActiveSettingsId(undefined);
          }
        }}
        onToggleState={() => setState(s => s === 'open' ? 'closed' : 'open')}
      />
    );
  },
};

/** Settings with sub-section secondary panel */
export const SettingsSubSection: Story = {
  render: () => {
    const [state, setState] = useState<'open' | 'closed'>('open');
    const [activeId, setActiveId] = useState('dashboard');
    const [activeSettingsId, setActiveSettingsId] = useState<string | undefined>('program-details');
    return (
      <NavigationVertical
        {...headerProps}
        items={items}
        state={state}
        activeId={activeId}
        settings
        subSection
        settingsItems={settingsItems}
        activeSettingsId={activeSettingsId}
        onNavigate={(id, subId) => {
          if (settingsItems.find(s => s.id === id)) {
            setActiveSettingsId(id);
          } else {
            setActiveId(id);
            setActiveSettingsId(undefined);
          }
        }}
        onToggleState={() => setState(s => s === 'open' ? 'closed' : 'open')}
      />
    );
  },
};
