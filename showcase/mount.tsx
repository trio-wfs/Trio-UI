/**
 * Showcase Mount — renders real React components into static HTML pages.
 *
 * Usage in any showcase HTML page:
 *   <div data-trio-component="Button" data-trio-props='{"variant":"contained","color":"primary","label":"Save"}'></div>
 *
 * Include the built bundle:
 *   <script type="module" src="../../showcase/dist/showcase.js"></script>
 *
 * Components render inside an MUI ThemeProvider with the TRIO theme,
 * so they look identical to Storybook / production.
 */

import React from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from '@mui/material';
import { trioTheme } from '../design-tokens/theme';

// ─── Icon Registry ──────────────────────────────────────────────────────────
// Maps string names (used in data-trio-props) to MUI icon components.
// Add icons here as showcase pages need them.

import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import DownloadIcon from '@mui/icons-material/Download';
import UploadIcon from '@mui/icons-material/Upload';
import RefreshIcon from '@mui/icons-material/Refresh';
import SettingsIcon from '@mui/icons-material/Settings';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckIcon from '@mui/icons-material/Check';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import SendIcon from '@mui/icons-material/Send';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import InfoIcon from '@mui/icons-material/Info';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import TableRowsIcon from '@mui/icons-material/TableRows';
import ViewListIcon from '@mui/icons-material/ViewList';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import BarChartIcon from '@mui/icons-material/BarChart';
import PieChartIcon from '@mui/icons-material/PieChart';
import ShowChartIcon from '@mui/icons-material/ShowChart';
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
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import PersonIcon from '@mui/icons-material/Person';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ScheduleIcon from '@mui/icons-material/Schedule';

const iconRegistry: Record<string, React.ReactElement> = {
  Add: <AddIcon />,
  Edit: <EditIcon />,
  Delete: <DeleteIcon />,
  Save: <SaveIcon />,
  Close: <CloseIcon />,
  Search: <SearchIcon />,
  FilterList: <FilterListIcon />,
  Download: <DownloadIcon />,
  Upload: <UploadIcon />,
  Refresh: <RefreshIcon />,
  Settings: <SettingsIcon />,
  ArrowBack: <ArrowBackIcon />,
  ArrowForward: <ArrowForwardIcon />,
  Check: <CheckIcon />,
  MoreVert: <MoreVertIcon />,
  Visibility: <VisibilityIcon />,
  ContentCopy: <ContentCopyIcon />,
  Send: <SendIcon />,
  Print: <PrintIcon />,
  Share: <ShareIcon />,
  Info: <InfoIcon />,
  FilterAltOff: <FilterAltOffIcon />,
  FileDownload: <FileDownloadIcon />,
  RestartAlt: <RestartAltIcon />,
  TableRows: <TableRowsIcon />,
  ViewList: <ViewListIcon />,
  CalendarToday: <CalendarTodayIcon />,
  BarChart: <BarChartIcon />,
  PieChart: <PieChartIcon />,
  ShowChart: <ShowChartIcon />,
  DashboardOutlined: <DashboardOutlinedIcon />,
  PersonSearchOutlined: <PersonSearchOutlinedIcon />,
  GroupsOutlined: <GroupsOutlinedIcon />,
  AssignmentIndOutlined: <AssignmentIndOutlinedIcon />,
  ChecklistOutlined: <ChecklistOutlinedIcon />,
  BusinessCenterOutlined: <BusinessCenterOutlinedIcon />,
  AssignmentTurnedInOutlined: <AssignmentTurnedInOutlinedIcon />,
  ScheduleOutlined: <ScheduleOutlinedIcon />,
  MonetizationOnOutlined: <MonetizationOnOutlinedIcon />,
  FolderCopyOutlined: <FolderCopyOutlinedIcon />,
  PeopleOutlined: <PeopleOutlinedIcon />,
  AccessTimeOutlined: <AccessTimeOutlinedIcon />,
  ReceiptOutlined: <ReceiptOutlinedIcon />,
  VerifiedUserOutlined: <VerifiedUserOutlinedIcon />,
  SettingsOutlined: <SettingsOutlinedIcon />,
  Person: <PersonIcon />,
  Assignment: <AssignmentIcon />,
  AttachFile: <AttachFileIcon />,
  Schedule: <ScheduleIcon />,
};

// Resolve string icon names to React elements
function resolveIcons(props: Record<string, any>): Record<string, any> {
  const resolved = { ...props };
  for (const key of ['startIcon', 'endIcon', 'icon', 'iconLeft', 'iconRight']) {
    if (typeof resolved[key] === 'string' && iconRegistry[resolved[key]]) {
      resolved[key] = iconRegistry[resolved[key]];
    }
  }
  // Resolve icons inside ToggleButton `buttons` array items
  if (Array.isArray(resolved.buttons)) {
    resolved.buttons = resolved.buttons.map((btn: Record<string, any>) => {
      if (typeof btn.icon === 'string' && iconRegistry[btn.icon]) {
        return { ...btn, icon: iconRegistry[btn.icon] };
      }
      return btn;
    });
  }
  // Resolve icons inside NavigationVertical `items` array
  if (Array.isArray(resolved.items)) {
    resolved.items = resolved.items.map((item: Record<string, any>) => {
      if (typeof item.icon === 'string' && iconRegistry[item.icon]) {
        return { ...item, icon: iconRegistry[item.icon] };
      }
      return item;
    });
  }
  // Resolve icons inside Tabs `tabs` array (leftIcon, rightIcon)
  if (Array.isArray(resolved.tabs)) {
    resolved.tabs = resolved.tabs.map((tab: Record<string, any>) => {
      const next = { ...tab };
      if (typeof next.leftIcon === 'string' && iconRegistry[next.leftIcon]) {
        next.leftIcon = iconRegistry[next.leftIcon];
      }
      if (typeof next.rightIcon === 'string' && iconRegistry[next.rightIcon]) {
        next.rightIcon = iconRegistry[next.rightIcon];
      }
      return next;
    });
  }
  return resolved;
}

// ─── Component Registry ─────────────────────────────────────────────────────
// Lazy-loaded so pages only download what they use.

const registry: Record<string, () => Promise<{ default: React.ComponentType<any> }>> = {
  Alert:              () => import('../components/Alert/Alert').then(m => ({ default: m.Alert })),
  Autocomplete:       () => import('../components/Autocomplete/Autocomplete').then(m => ({ default: m.Autocomplete })),
  Badge:              () => import('../components/Badge/Badge').then(m => ({ default: m.Badge })),
  Breadcrumb:         () => import('../components/Breadcrumb/Breadcrumb').then(m => ({ default: m.Breadcrumb })),
  Button:             () => import('../components/Button/Button').then(m => ({ default: m.Button })),
  ButtonGroup:        () => import('../components/ButtonGroup/ButtonGroup').then(m => ({ default: m.ButtonGroup })),
  ButtonIcon:         () => import('../components/ButtonIcon/ButtonIcon').then(m => ({ default: m.ButtonIcon })),
  Checkbox:           () => import('../components/Checkbox/Checkbox').then(m => ({ default: m.Checkbox })),
  Chip:               () => import('../components/Chip/Chip').then(m => ({ default: m.Chip })),
  ContentContainer:   () => import('../components/ContentContainer/ContentContainer').then(m => ({ default: m.ContentContainer })),
  Footer:             () => import('../components/Footer/Footer').then(m => ({ default: m.Footer })),
  Menu:               () => import('../components/Menu/Menu').then(m => ({ default: m.Menu })),
  MetricCard:         () => import('../components/MetricCard/MetricCard').then(m => ({ default: m.MetricCard })),
  Modal:              () => import('../components/Modal/Modal').then(m => ({ default: m.Modal })),
  ModalPanel:         () => import('../components/Modal/Modal').then(m => ({ default: m.ModalPanel })),
  NavigationHeader:   () => import('../components/NavigationHeader/NavigationHeader').then(m => ({ default: m.NavigationHeader })),
  NavigationVertical: () => import('../components/NavigationVertical/NavigationVertical').then(m => ({ default: m.NavigationVertical })),
  PageHeaderToolbar:  () => import('../components/PageHeaderToolbar/PageHeaderToolbar').then(m => ({ default: m.PageHeaderToolbar })),
  RadioGroup:         () => import('../components/RadioGroup/RadioGroup').then(m => ({ default: m.RadioGroup })),
  SearchBar:          () => import('../components/SearchBar/SearchBar').then(m => ({ default: m.SearchBar })),
  Select:             () => import('../components/Select/Select').then(m => ({ default: m.Select })),
  SplitButton:        () => import('../components/SplitButton/SplitButton').then(m => ({ default: m.SplitButton })),
  Stepper:            () => import('../components/Stepper/Stepper').then(m => ({ default: m.Stepper })),
  Switch:             () => import('../components/Switch/Switch').then(m => ({ default: m.Switch })),
  Tabs:               () => import('../components/Tabs/Tabs').then(m => ({ default: m.Tabs })),
  TextField:          () => import('../components/TextField/TextField').then(m => ({ default: m.TextField })),
  ToggleButton:       () => import('../components/ToggleButton/ToggleButton').then(m => ({ default: m.ToggleButton })),
  Tooltip:            () => import('../components/Tooltip/Tooltip').then(m => ({ default: m.Tooltip })),
  Chart:              () => import('../components/Chart/Chart').then(m => ({ default: m.Chart })),
  DatePicker:         () => import('../components/DatePicker/DatePicker').then(m => ({ default: m.DatePicker })),
  Handle:             () => import('../components/Handle/Handle').then(m => ({ default: m.Handle })),
  NumberField:        () => import('../components/NumberField/NumberField').then(m => ({ default: m.NumberField })),
  PopOver:            () => import('../components/PopOver/PopOver').then(m => ({ default: m.PopOver })),
  ProductLogos:       () => import('../components/ProductLogos/ProductLogos').then(m => ({ default: m.ProductLogos })),
  Slider:             () => import('../components/Slider/Slider').then(m => ({ default: m.Slider })),
  // Showcase-only wrappers
  ModalDemo:          () => import('./ModalDemo').then(m => ({ default: m.ModalDemo })),
};

// ─── Wrapper that loads + renders a single component ────────────────────────

function LazyComponent({ name, props }: { name: string; props: Record<string, any> }) {
  const [Component, setComponent] = React.useState<React.ComponentType<any> | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const loader = registry[name];
    if (!loader) {
      setError(`Unknown component: "${name}"`);
      return;
    }
    loader()
      .then(mod => setComponent(() => mod.default))
      .catch(err => setError(err.message));
  }, [name]);

  if (error) {
    return <div style={{ color: '#DB4537', fontSize: 12, padding: 8 }}>{error}</div>;
  }
  if (!Component) {
    return null; // silent while loading — avoids flash
  }
  return <Component {...resolveIcons(props)} />;
}

// ─── Mount all [data-trio-component] elements on the page ───────────────────

function mountAll() {
  const targets = document.querySelectorAll<HTMLElement>('[data-trio-component]');
  if (targets.length === 0) return;

  targets.forEach(el => {
    const name = el.dataset.trioComponent!;
    let props: Record<string, any> = {};

    // Parse props from data-trio-props JSON
    if (el.dataset.trioProps) {
      try {
        props = JSON.parse(el.dataset.trioProps);
      } catch (e) {
        console.error(`[TRIO Showcase] Invalid JSON in data-trio-props for ${name}:`, e);
      }
    }

    // Parse children from data-trio-children (simple text content)
    if (el.dataset.trioChildren) {
      props.children = el.dataset.trioChildren;
    }

    // Inline display style to prevent layout shift
    if (!el.style.display) {
      el.style.display = 'inline-block';
    }

    const root = createRoot(el);
    root.render(
      <ThemeProvider theme={trioTheme}>
        <LazyComponent name={name} props={props} />
      </ThemeProvider>
    );
  });
}

// Auto-mount on DOMContentLoaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mountAll);
} else {
  mountAll();
}
