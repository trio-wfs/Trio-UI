/**
 * Page Pattern Stories
 *
 * Full-page compositions using real design system components.
 * Engineers visit these to see how NavigationHeader, PageHeaderToolbar,
 * ContentContainer, Tabs, Footer, and content areas compose together.
 *
 * These are NOT isolated component demos — they are complete page layouts
 * that show correct colors, spacing, layer order, and behavior.
 */

import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Box, Typography, Chip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import StickyNote2OutlinedIcon from '@mui/icons-material/StickyNote2Outlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';

import { NavigationHeader } from '../components/NavigationHeader/NavigationHeader';
import { NavigationVertical } from '../components/NavigationVertical/NavigationVertical';
import { PageHeaderToolbar } from '../components/PageHeaderToolbar/PageHeaderToolbar';
import { ContentContainer } from '../components/ContentContainer/ContentContainer';
import { Breadcrumb } from '../components/Breadcrumb/Breadcrumb';
import { Tabs } from '../components/Tabs/Tabs';
import { Footer } from '../components/Footer/Footer';
import { Button } from '../components/Button/Button';
import { ButtonGroup } from '../components/ButtonGroup/ButtonGroup';
import { Modal } from '../components/Modal/Modal';
import { Chip as TrioChip } from '../components/Chip/Chip';
import { Select } from '../components/Select/Select';
import { Checkbox } from '../components/Checkbox/Checkbox';
import { RadioGroup } from '../components/RadioGroup/RadioGroup';
import { Switch } from '../components/Switch/Switch';
import { tokens } from '../design-tokens/tokens';
import { TextField } from '../components/TextField/TextField';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { AgGridReact } from 'ag-grid-react';
import type { IFloatingFilterParams, IHeaderParams } from 'ag-grid-community';
import { AllCommunityModule, ModuleRegistry, themeQuartz } from 'ag-grid-community';

// Register AG Grid modules
ModuleRegistry.registerModules([AllCommunityModule]);

// ── Custom header — sort arrow on hover or when active ───────────────────────
const TrioHeader = (props: IHeaderParams) => {
  const [sortDir, setSortDir] = React.useState<'asc' | 'desc' | null>(null);

  const onSortClicked = () => {
    const next = sortDir === null ? 'asc' : sortDir === 'asc' ? 'desc' : null;
    setSortDir(next);
    props.setSort(next, false);
  };

  return (
    <Box
      onClick={onSortClicked}
      sx={{
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        px: '4px',
        cursor: 'pointer',
        userSelect: 'none',
        '& .sort-icon': {
          opacity: sortDir ? 1 : 0,
          transition: 'opacity 150ms',
        },
        '&:hover .sort-icon': {
          opacity: 1,
        },
      }}
    >
      <Typography
        variant="body2"
        sx={{
          fontWeight: tokens.typography.fontWeight.medium,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          flex: 1,
        }}
      >
        {props.displayName}
      </Typography>
      <Box className="sort-icon" sx={{ display: 'flex', alignItems: 'center', color: tokens.colors.text.secondary, '& .MuiSvgIcon-root': { fontSize: 16 } }}>
        {sortDir === 'desc' ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
      </Box>
    </Box>
  );
};

// ── Custom floating filter — TRIO TextField (small), disabled when not searchable
const TrioFloatingFilter = React.forwardRef((props: IFloatingFilterParams, ref) => {
  const [value, setValue] = React.useState('');
  const colDef = props.column.getColDef();
  const isDisabled = (colDef as any).floatingFilterComponentParams?.disabled === true;

  React.useImperativeHandle(ref, () => ({
    onParentModelChanged(model: any) {
      if (!isDisabled) setValue(model?.filter ?? '');
    },
  }));

  const onChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setValue(val);
    props.parentFilterInstance((instance: any) => {
      instance.onFloatingFilterChanged('contains', val || null);
    });
  };

  return (
    <Box sx={{ px: '4px', py: '2px', width: '100%', display: 'flex', alignItems: 'center' }}>
      <TextField
        size="small"
        placeholder={isDisabled ? '' : 'Search...'}
        value={value}
        onChange={onChanged}
        disabled={isDisabled}
        aria-label={`Filter ${colDef.headerName}`}
      />
    </Box>
  );
});

// AG Grid theme matching TRIO design tokens
const trioGridTheme = themeQuartz.withParams({
  fontFamily: tokens.typography.fontFamily,
  fontSize: tokens.typography.fontSize.sm,
  headerFontSize: tokens.typography.fontSize.sm,
  headerFontWeight: tokens.typography.fontWeight.medium,
  backgroundColor: tokens.colors.background.paper,
  foregroundColor: tokens.colors.text.primary,
  headerBackgroundColor: tokens.colors.background.paper,
  headerTextColor: tokens.colors.text.primary,
  borderColor: tokens.colors.components.border.default,
  rowBorder: true,
  oddRowBackgroundColor: tokens.colors.background.secondary,
  headerColumnResizeHandleColor: tokens.colors.components.border.default,
  accentColor: tokens.colors.primary.main,
  wrapperBorder: false,
  wrapperBorderRadius: 0,
  borderRadius: 0,
  rowHeight: 42,
  headerHeight: 42,
  floatingFilterHeight: 38,
});

// ── AG Grid row data (shared across grid stories) ────────────────────────────
const agGridRowData = [
  { job: '7201', facility: 'Downtown Medical Center', profession: 'RN', specialty: 'Cardiac ICU', positions: 3, filled: '1/3', startDate: 'Apr 1', endDate: 'Jun 24', status: 'Open', shift: '7a – 7p', agency: 'ProStaff Medical', billRate: '$92.00', region: 'Northeast', submittedBy: 'Alex Johnson', submittedDate: 'Mar 5' },
  { job: '7198', facility: 'Sunset Grove Hospital', profession: 'RN', specialty: 'Emergency', positions: 2, filled: '2/2', startDate: 'Mar 28', endDate: 'Jun 20', status: 'Filled', shift: '7p – 7a', agency: 'TravelNurse Inc', billRate: '$88.00', region: 'Southeast', submittedBy: 'Maria Lopez', submittedDate: 'Mar 1' },
  { job: '7195', facility: 'Valley Health System', profession: 'LPN', specialty: 'Med/Surg', positions: 4, filled: '0/4', startDate: 'Apr 15', endDate: 'Jul 8', status: 'Open', shift: '7a – 3p', agency: 'CoreStaff', billRate: '$62.00', region: 'Midwest', submittedBy: 'David Park', submittedDate: 'Mar 10' },
  { job: '7190', facility: 'Metro Regional', profession: 'RN', specialty: 'Labor & Delivery', positions: 1, filled: '1/1', startDate: 'Mar 20', endDate: 'Jun 12', status: 'Filled', shift: '7p – 7a', agency: 'NurseFlex', billRate: '$95.00', region: 'West', submittedBy: 'Sarah Kim', submittedDate: 'Feb 28' },
  { job: '7185', facility: 'Riverside Community', profession: 'CNA', specialty: 'Rehab', positions: 6, filled: '3/6', startDate: 'Apr 8', endDate: 'Jul 1', status: 'Open', shift: '3p – 11p', agency: 'AlliedHealth Pro', billRate: '$38.00', region: 'Southeast', submittedBy: 'James Wright', submittedDate: 'Mar 12' },
  { job: '7180', facility: 'Lakeside General', profession: 'RN', specialty: 'Oncology', positions: 2, filled: '1/2', startDate: 'Apr 22', endDate: 'Jul 15', status: 'Open', shift: '7a – 7p', agency: 'ProStaff Medical', billRate: '$90.00', region: 'Northeast', submittedBy: 'Alex Johnson', submittedDate: 'Mar 15' },
  { job: '7175', facility: 'Mountain View Medical', profession: 'LPN', specialty: 'Pediatrics', positions: 3, filled: '3/3', startDate: 'Mar 15', endDate: 'Jun 7', status: 'Filled', shift: '7a – 3p', agency: 'TravelNurse Inc', billRate: '$65.00', region: 'West', submittedBy: 'Maria Lopez', submittedDate: 'Feb 20' },
  { job: '7170', facility: 'Central County Hospital', profession: 'RN', specialty: 'OR', positions: 1, filled: '0/1', startDate: 'May 1', endDate: 'Jul 24', status: 'Open', shift: '7a – 3p', agency: 'CoreStaff', billRate: '$98.00', region: 'Midwest', submittedBy: 'David Park', submittedDate: 'Mar 18' },
  { job: '7165', facility: 'Bayshore Medical Center', profession: 'RN', specialty: 'Telemetry', positions: 2, filled: '1/2', startDate: 'May 5', endDate: 'Jul 28', status: 'Open', shift: '7p – 7a', agency: 'NurseFlex', billRate: '$86.00', region: 'Southeast', submittedBy: 'Sarah Kim', submittedDate: 'Mar 20' },
  { job: '7160', facility: 'Northside General', profession: 'CNA', specialty: 'Long-Term Care', positions: 5, filled: '2/5', startDate: 'Apr 28', endDate: 'Jul 21', status: 'Open', shift: '3p – 11p', agency: 'AlliedHealth Pro', billRate: '$36.00', region: 'Midwest', submittedBy: 'James Wright', submittedDate: 'Mar 22' },
  { job: '7155', facility: 'St. Mary Regional', profession: 'LPN', specialty: 'Wound Care', positions: 1, filled: '1/1', startDate: 'Mar 10', endDate: 'Jun 2', status: 'Filled', shift: '7a – 3p', agency: 'ProStaff Medical', billRate: '$60.00', region: 'Northeast', submittedBy: 'Alex Johnson', submittedDate: 'Feb 15' },
  { job: '7150', facility: 'Harbor View Hospital', profession: 'RN', specialty: 'NICU', positions: 3, filled: '0/3', startDate: 'May 12', endDate: 'Aug 4', status: 'Open', shift: '7p – 7a', agency: 'TravelNurse Inc', billRate: '$102.00', region: 'West', submittedBy: 'Maria Lopez', submittedDate: 'Mar 25' },
  { job: '7145', facility: 'Pine Valley Health', profession: 'RN', specialty: 'Psych', positions: 2, filled: '2/2', startDate: 'Mar 5', endDate: 'May 28', status: 'Filled', shift: '7a – 7p', agency: 'CoreStaff', billRate: '$84.00', region: 'Southeast', submittedBy: 'David Park', submittedDate: 'Feb 10' },
  { job: '7140', facility: 'Summit Healthcare', profession: 'LPN', specialty: 'Dialysis', positions: 4, filled: '1/4', startDate: 'May 20', endDate: 'Aug 12', status: 'Open', shift: '7a – 3p', agency: 'NurseFlex', billRate: '$58.00', region: 'West', submittedBy: 'Sarah Kim', submittedDate: 'Mar 28' },
  { job: '7135', facility: 'Oakwood Community', profession: 'CNA', specialty: 'Med/Surg', positions: 3, filled: '3/3', startDate: 'Feb 28', endDate: 'May 23', status: 'Filled', shift: '3p – 11p', agency: 'AlliedHealth Pro', billRate: '$35.00', region: 'Midwest', submittedBy: 'James Wright', submittedDate: 'Feb 5' },
  { job: '7130', facility: 'Clearwater Regional', profession: 'RN', specialty: 'Step-Down', positions: 2, filled: '0/2', startDate: 'May 25', endDate: 'Aug 17', status: 'Open', shift: '7p – 7a', agency: 'ProStaff Medical', billRate: '$87.00', region: 'Northeast', submittedBy: 'Alex Johnson', submittedDate: 'Apr 1' },
  { job: '7125', facility: 'Westside Medical', profession: 'RN', specialty: 'Float Pool', positions: 6, filled: '4/6', startDate: 'Apr 1', endDate: 'Jun 24', status: 'Open', shift: '7a – 7p', agency: 'TravelNurse Inc', billRate: '$82.00', region: 'West', submittedBy: 'Maria Lopez', submittedDate: 'Mar 8' },
  { job: '7120', facility: 'Grandview Hospital', profession: 'LPN', specialty: 'Rehab', positions: 2, filled: '2/2', startDate: 'Mar 18', endDate: 'Jun 10', status: 'Filled', shift: '7a – 3p', agency: 'CoreStaff', billRate: '$61.00', region: 'Southeast', submittedBy: 'David Park', submittedDate: 'Feb 22' },
  { job: '7115', facility: 'Desert Springs Medical', profession: 'RN', specialty: 'Cath Lab', positions: 1, filled: '0/1', startDate: 'Jun 1', endDate: 'Aug 24', status: 'Open', shift: '7a – 3p', agency: 'NurseFlex', billRate: '$96.00', region: 'West', submittedBy: 'Sarah Kim', submittedDate: 'Apr 5' },
];

const agGridColDefs = [
  { field: 'job', headerName: 'Job #', width: 100 },
  { field: 'facility', headerName: 'Facility', width: 220, sort: 'asc' as const },
  { field: 'profession', headerName: 'Profession', width: 120 },
  { field: 'specialty', headerName: 'Specialty', width: 150 },
  { field: 'positions', headerName: 'Positions', width: 110, floatingFilterComponentParams: { disabled: true } },
  { field: 'filled', headerName: 'Filled', width: 90, floatingFilterComponentParams: { disabled: true } },
  { field: 'startDate', headerName: 'Start Date', width: 120, floatingFilterComponentParams: { disabled: true } },
  { field: 'endDate', headerName: 'End Date', width: 120, floatingFilterComponentParams: { disabled: true } },
  { field: 'status', headerName: 'Status', width: 100 },
  { field: 'shift', headerName: 'Shift', width: 120 },
  { field: 'agency', headerName: 'Agency', width: 180 },
  { field: 'billRate', headerName: 'Bill Rate', width: 110, floatingFilterComponentParams: { disabled: true } },
  { field: 'region', headerName: 'Region', width: 120 },
  { field: 'submittedBy', headerName: 'Submitted By', width: 150 },
  { field: 'submittedDate', headerName: 'Submitted', width: 120, floatingFilterComponentParams: { disabled: true } },
];

// ── Shared nav items ─────────────────────────────────────────────────────────
const navItems = [
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
];
const user = { name: 'Jesse Szygiel', initials: 'JS' };

// ── Placeholder content helper ───────────────────────────────────────────────
const KeyValueRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <Box sx={{ display: 'flex', justifyContent: 'space-between', py: `${tokens.spacing.sm}px`, borderBottom: `1px solid ${tokens.colors.components.border.default}` }}>
    <Typography variant="caption" sx={{ color: tokens.colors.text.secondary }}>{label}</Typography>
    <Typography variant="body2">{value}</Typography>
  </Box>
);

// ── Full page shell (shared wrapper) ─────────────────────────────────────────
const PageShell: React.FC<{ activeNav?: string; lockViewport?: boolean; children: React.ReactNode }> = ({ activeNav = 'perdiem', lockViewport = false, children }) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', height: lockViewport ? '100vh' : undefined, minHeight: lockViewport ? undefined : '100vh', overflow: lockViewport ? 'hidden' : undefined, backgroundColor: tokens.colors.background.default }}>
    <NavigationHeader
      navItems={navItems}
      activeItemId={activeNav}
      user={user}
      badgeText="TRIO WIP"
    />
    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
      {children}
    </Box>
    <Footer />
  </Box>
);

// ── Content wrapper used on every page ───────────────────────────────────────
const ContentWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Box sx={{
    flex: 1,
    backgroundColor: tokens.colors.background.secondary,
    border: `1px solid ${tokens.colors.components.border.default}`,
    m: `${tokens.spacing.md}px`,
    mt: 0,
    p: `${tokens.spacing.md}px`,
    borderRadius: `${tokens.borderRadius.default}px`,
  }}>
    {children}
  </Box>
);

// ══════════════════════════════════════════════════════════════════════════════
// META
// ══════════════════════════════════════════════════════════════════════════════

const meta: Meta = {
  title: 'Page Patterns',
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'page' },
  },
};

export default meta;

// ══════════════════════════════════════════════════════════════════════════════
// 1. PAGE ANATOMY — the 3-layer system
// ══════════════════════════════════════════════════════════════════════════════

export const PageAnatomy: StoryObj = {
  name: '1. Page Anatomy',
  render: () => (
    <PageShell>
      <Box sx={{ px: `${tokens.spacing.md}px`, py: `${tokens.spacing.md}px` }}>
        <PageHeaderToolbar
          variant="default"
          pageTitleText="Page Anatomy Demo"
          buttonGroup={
            <ButtonGroup
              buttons={['Export', 'Edit']}
              variant="outline"
              size="small"
              color="secondary"
            />
          }
        />
      </Box>

      <ContentWrapper>
        <Box sx={{ display: 'flex', gap: `${tokens.spacing.md}px` }}>
          {/* Left rail */}
          <Box sx={{ width: 240, flexShrink: 0 }}>
            <ContentContainer title="Identity">
              <KeyValueRow label="Name" value="John Smith, RN" />
              <KeyValueRow label="Specialty" value="ICU" />
              <KeyValueRow label="Agency" value="ProStaff Medical" />
              <KeyValueRow label="Status" value="Active" />
            </ContentContainer>
          </Box>

          {/* Center column */}
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: `${tokens.spacing.md}px` }}>
            <ContentContainer title="Main Content">
              <Typography variant="body2" sx={{ color: tokens.colors.text.secondary, mb: `${tokens.spacing.md}px` }}>
                This is the center column — the primary content area. Descriptions, grouped data rows,
                and nested ContentContainers go here.
              </Typography>
              <ContentContainer title="Nested Section">
                <Typography variant="body2">Containers can nest inside containers. Each one gets its own header bar and border.</Typography>
              </ContentContainer>
            </ContentContainer>
            <ContentContainer title="Secondary Section">
              <Typography variant="body2">Additional grouped content stacks below with 16px spacing between siblings.</Typography>
            </ContentContainer>
          </Box>

          {/* Right rail */}
          <Box sx={{ width: 200, flexShrink: 0 }}>
            <ContentContainer title="Context">
              <KeyValueRow label="Bill Rate" value="$85/hr" />
              <KeyValueRow label="OT Rate" value="$127.50/hr" />
              <KeyValueRow label="Start Date" value="Mar 15, 2026" />
            </ContentContainer>
          </Box>
        </Box>
      </ContentWrapper>
    </PageShell>
  ),
};

// ══════════════════════════════════════════════════════════════════════════════
// 2. DETAILS PAGE — Full header w/ breadcrumb + tabs + 3-column layout
//    Generic layout lockup — content is placeholder, not domain-specific.
// ══════════════════════════════════════════════════════════════════════════════

const DetailsPageDemo: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  // ── Generic placeholder rows ─────────────────────────────────────────────
  const placeholderRows = (count: number) =>
    Array.from({ length: count }, (_, i) => (
      <KeyValueRow key={i} label={`Label ${i + 1}`} value={`Value ${i + 1}`} />
    ));

  // ── Tab panels — each shows a different content composition ──────────────
  const tabPanels = [
    // Details — two stacked containers
    <Box key="details" sx={{ display: 'flex', flexDirection: 'column', gap: `${tokens.spacing.md}px` }}>
      <ContentContainer title="Primary Section">
        <Typography variant="body2" sx={{ color: tokens.colors.text.secondary, mb: `${tokens.spacing.sm}px` }}>
          Description text for the primary content area. This section typically holds
          the most important information related to the record.
        </Typography>
        {placeholderRows(4)}
      </ContentContainer>
      <ContentContainer title="Secondary Section">
        {placeholderRows(5)}
      </ContentContainer>
    </Box>,

    // Related — single container
    <Box key="related" sx={{ display: 'flex', flexDirection: 'column', gap: `${tokens.spacing.md}px` }}>
      <ContentContainer title="Related Records">
        {placeholderRows(6)}
      </ContentContainer>
    </Box>,

    // Documents — file-style rows
    <Box key="documents" sx={{ display: 'flex', flexDirection: 'column', gap: `${tokens.spacing.md}px` }}>
      <ContentContainer title="Attachments">
        <KeyValueRow label="Document A" value="filename_a.pdf" />
        <KeyValueRow label="Document B" value="filename_b.pdf" />
        <KeyValueRow label="Document C" value="filename_c.xlsx" />
        <KeyValueRow label="Document D" value="filename_d.pdf" />
      </ContentContainer>
    </Box>,

    // Tasks — open + completed split
    <Box key="tasks" sx={{ display: 'flex', flexDirection: 'column', gap: `${tokens.spacing.md}px` }}>
      <ContentContainer title="Open Items">
        <KeyValueRow label="Task 1" value="Due Apr 20" />
        <KeyValueRow label="Task 2" value="Due Apr 22" />
        <KeyValueRow label="Task 3" value="Due Apr 25" />
      </ContentContainer>
      <ContentContainer title="Completed Items">
        <KeyValueRow label="Task 4" value="Completed Apr 8" />
        <KeyValueRow label="Task 5" value="Completed Apr 9" />
      </ContentContainer>
    </Box>,

    // Notes — simple list
    <Box key="notes" sx={{ display: 'flex', flexDirection: 'column', gap: `${tokens.spacing.md}px` }}>
      <ContentContainer title="Notes">
        <KeyValueRow label="Apr 12" value="Note added by User A" />
        <KeyValueRow label="Apr 11" value="Status changed to Active" />
        <KeyValueRow label="Apr 10" value="Record created by User B" />
        <KeyValueRow label="Apr 9" value="Linked to parent record" />
        <KeyValueRow label="Apr 8" value="Initial import" />
      </ContentContainer>
    </Box>,

    // Activity — timeline-style log
    <Box key="activity" sx={{ display: 'flex', flexDirection: 'column', gap: `${tokens.spacing.md}px` }}>
      <ContentContainer title="Activity Log">
        <KeyValueRow label="Apr 12, 10:34 AM" value="Field updated: Status → Active" />
        <KeyValueRow label="Apr 11, 3:15 PM" value="Comment added by User A" />
        <KeyValueRow label="Apr 10, 9:00 AM" value="Record created" />
        <KeyValueRow label="Apr 9, 4:45 PM" value="Linked record #1234" />
        <KeyValueRow label="Apr 8, 11:20 AM" value="Imported from external system" />
        <KeyValueRow label="Apr 7, 2:00 PM" value="Draft saved" />
      </ContentContainer>
    </Box>,
  ];

  return (
    <PageShell activeNav="nursing">
      {/* Header toolbar — full variant with breadcrumb */}
      <Box sx={{ px: `${tokens.spacing.md}px`, pt: `${tokens.spacing.md}px` }}>
        <PageHeaderToolbar
          variant="full"
          pageTitleText="Record Title"
          eyebrowText="Subtitle or secondary context"
          chips={
            <>
              <TrioChip label="Tag A" color="default" size="small" />
              <TrioChip label="Tag B" color="default" size="small" />
              <TrioChip label="Tag C" color="info" size="small" variant="outline" />
            </>
          }
          indicator="OPEN"
          buttonGroup={
            <ButtonGroup
              buttons={['Secondary', 'Tertiary']}
              variant="outline"
              size="small"
              color="secondary"
            />
          }
          singleButton={
            <Button variant="contained" color="primary" size="small">
              Primary Action
            </Button>
          }
          breadcrumb={
            <Breadcrumb
              state="breadcrumb"
              links={[
                { label: 'Module', href: '#' },
                { label: 'Section', href: '#' },
                { label: 'Parent Record', href: '#' },
                { label: 'Current Record', selected: true },
              ]}
              showNumberIndicator
              recordCount="### records"
            />
          }
        />
      </Box>

      {/* Content wrapper with tabs flush to edges */}
      <Box sx={{
        flex: 1,
        backgroundColor: tokens.colors.background.secondary,
        border: `1px solid ${tokens.colors.components.border.default}`,
        m: `${tokens.spacing.md}px`,
        mt: `${tokens.spacing.md}px`,
        borderRadius: `${tokens.borderRadius.default}px`,
        display: 'flex',
        flexDirection: 'column',
      }}>
        {/* Tabs — flush to wrapper */}
        <Tabs
          tabs={[
            { label: 'Details', leftIcon: <InfoOutlinedIcon sx={{ fontSize: 16 }} /> },
            { label: 'Related', leftIcon: <PeopleOutlinedIcon sx={{ fontSize: 16 }} /> },
            { label: 'Documents', leftIcon: <DescriptionOutlinedIcon sx={{ fontSize: 16 }} /> },
            { label: 'Tasks', leftIcon: <TaskAltOutlinedIcon sx={{ fontSize: 16 }} /> },
            { label: 'Notes', leftIcon: <StickyNote2OutlinedIcon sx={{ fontSize: 16 }} /> },
            { label: 'Activity', leftIcon: <HistoryOutlinedIcon sx={{ fontSize: 16 }} /> },
          ]}
          activeIndex={activeTab}
          onChange={setActiveTab}
          surface="secondary"
        />

        {/* Tab content — padded, 3-column layout */}
        <Box sx={{ p: `${tokens.spacing.md}px`, display: 'flex', gap: `${tokens.spacing.md}px` }}>
          {/* Left rail */}
          <Box sx={{ width: 280, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: `${tokens.spacing.md}px` }}>
            <ContentContainer title="Summary">
              {placeholderRows(6)}
            </ContentContainer>
            <ContentContainer title="Additional Info">
              {placeholderRows(3)}
            </ContentContainer>
          </Box>

          {/* Center column — switches per tab */}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            {tabPanels[activeTab]}
          </Box>

          {/* Right rail */}
          <Box sx={{ width: 260, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: `${tokens.spacing.md}px` }}>
            <ContentContainer title="Context A">
              {placeholderRows(6)}
            </ContentContainer>
            <ContentContainer title="Context B">
              {placeholderRows(4)}
            </ContentContainer>
          </Box>
        </Box>
      </Box>
    </PageShell>
  );
};

export const DetailsPage: StoryObj = {
  name: '2. Details Page',
  render: () => <DetailsPageDemo />,
};

// ══════════════════════════════════════════════════════════════════════════════
// 3. GRID PAGE (STANDALONE) — AG Grid style in page context
// ══════════════════════════════════════════════════════════════════════════════

export const GridPage: StoryObj = {
  name: '3. Grid Page (Standalone)',
  render: () => (
    <PageShell activeNav="nursing" lockViewport>
      {/* Single outer wrapper — 4px radius, flex-fills remaining viewport */}
      <Box sx={{
        m: `${tokens.spacing.md}px`,
        flex: 1,
        minHeight: 0,
        border: `1px solid ${tokens.colors.components.border.default}`,
        borderRadius: `${tokens.borderRadius.default}px`,
        overflow: 'hidden',
        backgroundColor: tokens.colors.background.paper,
        display: 'flex',
        flexDirection: 'column',
      }}>
        {/* Header toolbar — no border/radius, connected to wrapper */}
        <Box sx={{ borderBottom: `1px solid ${tokens.colors.components.border.default}` }}>
          <PageHeaderToolbar
            variant="NewCanvas"
            pageTitleText="Tasks"
            singleButton={
              <Button variant="contained" color="secondary" size="small" startIcon={<AddIcon />}>
                Create Task
              </Button>
            }
          />
        </Box>

        {/* Filter links — Breadcrumb Links state, radius stripped for flush fit */}
        <Box sx={{ '& > div': { borderRadius: 0 }, borderBottom: `1px solid ${tokens.colors.components.border.default}` }}>
          <Breadcrumb
            state="Links"
            links={[
              { label: 'Active', selected: true },
              { label: 'Completed', href: '#' },
              { label: 'Cancelled', href: '#' },
            ]}
            showNumberIndicator
            recordCount="1,284"
          />
        </Box>

        {/* AG Grid — flex:1 fills remaining wrapper height (wrapper has calc height) */}
        <Box sx={{ flex: 1, minHeight: 0 }}>
          <AgGridReact
            theme={trioGridTheme}
            rowData={agGridRowData}
            columnDefs={agGridColDefs}
            defaultColDef={{
              resizable: true,
              sortable: true,
              filter: 'agTextColumnFilter',
              floatingFilter: true,
              floatingFilterComponent: TrioFloatingFilter,
              headerComponent: TrioHeader,
            }}
          />
        </Box>
      </Box>
    </PageShell>
  ),
};

// ══════════════════════════════════════════════════════════════════════════════
// 4. MODALS — 500px confirm + 900px form with scrolling
// ══════════════════════════════════════════════════════════════════════════════

const ModalInContextDemo: React.FC = () => {
  const [smallOpen, setSmallOpen] = useState(false);
  const [largeOpen, setLargeOpen] = useState(false);

  return (
    <PageShell activeNav="nursing">
      <Box sx={{ px: `${tokens.spacing.md}px`, py: `${tokens.spacing.md}px` }}>
        <PageHeaderToolbar
          variant="default"
          pageTitleText="Modal Examples"
          buttonGroup={
            <ButtonGroup
              buttons={['500px Confirm', '900px Form']}
              variant="outline"
              size="small"
              color="secondary"
            />
          }
        />
      </Box>

      <ContentWrapper>
        <Box sx={{ display: 'flex', gap: `${tokens.spacing.md}px` }}>
          {/* Small modal trigger */}
          <ContentContainer title="Small Modal (500px)" sx={{ flex: 1 }}>
            <Typography variant="body2" sx={{ color: tokens.colors.text.secondary, mb: `${tokens.spacing.md}px` }}>
              Confirmation dialogs, simple prompts, and destructive action warnings.
              Fixed height — content does not scroll.
            </Typography>
            <Button variant="contained" color="primary" size="small" onClick={() => setSmallOpen(true)}>
              Open 500px Modal
            </Button>
          </ContentContainer>

          {/* Large modal trigger */}
          <ContentContainer title="Large Modal (900px)" sx={{ flex: 1 }}>
            <Typography variant="body2" sx={{ color: tokens.colors.text.secondary, mb: `${tokens.spacing.md}px` }}>
              Form layouts, multi-section content, and data entry.
              90vh max-height — body scrolls when content overflows.
            </Typography>
            <Button variant="contained" color="primary" size="small" onClick={() => setLargeOpen(true)}>
              Open 900px Form Modal
            </Button>
          </ContentContainer>
        </Box>
      </ContentWrapper>

      {/* ── Small modal — confirmation dialog ── */}
      <Modal
        open={smallOpen}
        onClose={() => setSmallOpen(false)}
        onConfirm={() => setSmallOpen(false)}
        title="Confirm action"
        eyebrowText="This action cannot be undone"
        confirmLabel="Confirm"
        cancelLabel="Cancel"
        size="sm"
      >
        <Typography variant="body2">
          Are you sure you want to proceed? This will update the record status
          and notify all associated parties.
        </Typography>
      </Modal>

      {/* ── Large modal — form layout with scrolling body ── */}
      <Modal
        open={largeOpen}
        onClose={() => setLargeOpen(false)}
        onConfirm={() => setLargeOpen(false)}
        title="Create new record"
        eyebrowText="Fill out the required fields below"
        confirmLabel="Save"
        cancelLabel="Cancel"
        size="lg"
      >
        {/* Form section 1 — two-column text fields */}
        <Typography variant="subtitle2" sx={{ fontWeight: tokens.typography.fontWeight.medium, mb: `${tokens.spacing.sm}px` }}>
          General Information
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: `${tokens.spacing.lg}px ${tokens.spacing.md}px` }}>
          <TextField label="First Name" placeholder="Enter first name" />
          <TextField label="Last Name" placeholder="Enter last name" />
          <TextField label="Email" placeholder="email@example.com" />
          <TextField label="Phone" placeholder="(555) 000-0000" />
        </Box>

        {/* Divider */}
        <Box sx={{ borderBottom: `1px solid ${tokens.colors.components.border.default}`, my: `${tokens.spacing.sm}px` }} />

        {/* Form section 2 — selects */}
        <Typography variant="subtitle2" sx={{ fontWeight: tokens.typography.fontWeight.medium, mb: `${tokens.spacing.sm}px` }}>
          Assignment Details
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: `${tokens.spacing.lg}px ${tokens.spacing.md}px` }}>
          <Select
            label="Profession"
            placeholder="Select profession"
            options={[
              { value: 'rn', label: 'Registered Nurse (RN)' },
              { value: 'lpn', label: 'Licensed Practical Nurse (LPN)' },
              { value: 'cna', label: 'Certified Nursing Assistant (CNA)' },
            ]}
          />
          <Select
            label="Specialty"
            placeholder="Select specialty"
            options={[
              { value: 'icu', label: 'ICU' },
              { value: 'er', label: 'Emergency' },
              { value: 'medsurg', label: 'Med/Surg' },
              { value: 'or', label: 'Operating Room' },
            ]}
          />
          <Select
            label="Shift"
            placeholder="Select shift"
            options={[
              { value: 'day', label: '7a – 7p (Days)' },
              { value: 'night', label: '7p – 7a (Nights)' },
              { value: 'evening', label: '3p – 11p (Evenings)' },
            ]}
          />
          <TextField label="Bill Rate" placeholder="$0.00" />
        </Box>

        {/* Divider */}
        <Box sx={{ borderBottom: `1px solid ${tokens.colors.components.border.default}`, my: `${tokens.spacing.sm}px` }} />

        {/* Form section 3 — full-width textarea */}
        <Typography variant="subtitle2" sx={{ fontWeight: tokens.typography.fontWeight.medium, mb: `${tokens.spacing.sm}px` }}>
          Additional Notes
        </Typography>
        <TextField
          type="multi-line"
          label="Notes"
          placeholder="Enter any additional information..."
        />

        {/* Divider */}
        <Box sx={{ borderBottom: `1px solid ${tokens.colors.components.border.default}`, my: `${tokens.spacing.sm}px` }} />

        {/* Form section 4 — checkboxes, radios, switch */}
        <Typography variant="subtitle2" sx={{ fontWeight: tokens.typography.fontWeight.medium, mb: `${tokens.spacing.sm}px` }}>
          Options
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: `${tokens.spacing.lg}px ${tokens.spacing.md}px` }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: `${tokens.spacing.sm}px` }}>
            <Checkbox label="Requires background check" checked />
            <Checkbox label="Requires drug screening" checked />
            <Checkbox label="Overtime eligible" />
            <Checkbox label="Holiday coverage required" />
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: `${tokens.spacing.md}px` }}>
            <RadioGroup
              label="Priority"
              name="priority"
              value="normal"
              options={[
                { value: 'urgent', label: 'Urgent' },
                { value: 'high', label: 'High' },
                { value: 'normal', label: 'Normal' },
              ]}
            />
            <Switch label="Send notification on save" checked />
          </Box>
        </Box>

        {/* Divider */}
        <Box sx={{ borderBottom: `1px solid ${tokens.colors.components.border.default}`, my: `${tokens.spacing.sm}px` }} />

        {/* Form section 5 — more fields to force scroll */}
        <Typography variant="subtitle2" sx={{ fontWeight: tokens.typography.fontWeight.medium, mb: `${tokens.spacing.sm}px` }}>
          Facility Information
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: `${tokens.spacing.lg}px ${tokens.spacing.md}px` }}>
          <TextField label="Facility Name" placeholder="Enter facility" />
          <TextField label="Unit / Department" placeholder="Enter unit" />
          <TextField label="Address" placeholder="Street address" />
          <TextField label="City" placeholder="City" />
          <Select
            label="State"
            placeholder="Select state"
            options={[
              { value: 'az', label: 'Arizona' },
              { value: 'ca', label: 'California' },
              { value: 'tx', label: 'Texas' },
              { value: 'ny', label: 'New York' },
            ]}
          />
          <TextField label="ZIP Code" placeholder="00000" />
        </Box>
      </Modal>
    </PageShell>
  );
};

export const ModalInContext: StoryObj = {
  name: '4. Modals',
  render: () => <ModalInContextDemo />,
};

// ══════════════════════════════════════════════════════════════════════════════
// 5. NEWCANVAS HEADER — frameless variant
// ══════════════════════════════════════════════════════════════════════════════

const sideNavItems = [
  { id: 'overview', label: 'Overview', icon: <DashboardOutlinedIcon />, expandable: false },
  { id: 'performance', label: 'Performance', icon: <BarChartOutlinedIcon />, expandable: true, subItems: [
    { id: 'fill-rate', label: 'Fill Rate' },
    { id: 'time-to-fill', label: 'Time to Fill' },
    { id: 'spend', label: 'Spend Analysis' },
  ]},
  { id: 'agencies', label: 'Agencies', icon: <GroupOutlinedIcon />, expandable: true, subItems: [
    { id: 'scorecard', label: 'Scorecard' },
    { id: 'rankings', label: 'Rankings' },
  ]},
  { id: 'trends', label: 'Trends', icon: <TrendingUpOutlinedIcon />, expandable: false },
];

const sideNavSettings = [
  { id: 'program-settings', label: 'Program Settings' },
  { id: 'notifications', label: 'Notifications' },
];

export const NewCanvasPage: StoryObj = {
  name: '5. NewCanvas + Side Nav',
  render: () => (
    <PageShell activeNav="dashboards">
      <Box sx={{ display: 'flex', flex: 1, p: `${tokens.spacing.md}px` }}>
        {/* Side navigation */}
        <Box sx={{
          borderRight: `1px solid ${tokens.colors.components.border.default}`,
        }}>
          <NavigationVertical
            title="Locums Program"
            subtitle="Sunset Grove Medical Hospital"
            titleDropdown
            items={sideNavItems}
            state="open"
            activeId="performance"
            activeSubId="fill-rate"
            settings={true}
            settingsItems={sideNavSettings}
          />
        </Box>

        {/* Main content wrapper — border, radius, even 16px padding */}
        <Box sx={{
          flex: 1,
          minWidth: 0,
          backgroundColor: tokens.colors.background.secondary,
          border: `1px solid ${tokens.colors.components.border.default}`,
          borderRadius: `${tokens.borderRadius.default}px`,
          p: `${tokens.spacing.md}px`,
          display: 'flex',
          flexDirection: 'column',
          gap: `${tokens.spacing.md}px`,
        }}>
          <PageHeaderToolbar
            variant="NewCanvas"
            pageTitleText="Agency Performance"
            eyebrowText="Q1 2026 — All Programs"
            buttonGroup={
              <ButtonGroup
                buttons={['Download', 'Filter']}
                variant="outline"
                size="small"
                color="secondary"
              />
            }
          />

          <Box sx={{ display: 'flex', gap: `${tokens.spacing.md}px`, flex: 1 }}>
            <ContentContainer title="Fill Rate by Agency" sx={{ flex: 1 }}>
              <Box sx={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="body2" sx={{ color: tokens.colors.text.secondary }}>Chart placeholder — AG Charts would render here</Typography>
              </Box>
            </ContentContainer>
            <ContentContainer title="Scorecard Summary" sx={{ flex: 1 }}>
              <Box sx={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="body2" sx={{ color: tokens.colors.text.secondary }}>MetricCards would render here</Typography>
              </Box>
            </ContentContainer>
          </Box>
        </Box>
      </Box>
    </PageShell>
  ),
};
