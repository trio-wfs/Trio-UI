import React from 'react';
import { styled } from '@mui/material/styles';
import MuiTabs, { TabsProps as MuiTabsProps } from '@mui/material/Tabs';
import MuiTab, { TabProps as MuiTabProps } from '@mui/material/Tab';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

/**
 * Tabs Component
 * Based on Figma component: Document / Tabs / Tabs / Tabs
 * Component ID: 3868:51864
 * Building Block: 3868:51827 (Tabs/BuildingBlocks/Individual Tab)
 * 
 * Design tokens used:
 * - Colors: primary.main (#2196F3), text.primary (#212121), text.secondary (#757575)
 * - Typography: body2 (14px, regular weight)
 * - Spacing: md (16px), sm (8px)
 * - Border: components.border.default (#E0E0E0)
 */

export interface TabItem {
  /** Label text for the tab */
  label: string;
  /** Tab content (optional) */
  content?: React.ReactNode;
  /** Disabled state */
  disabled?: boolean;
  /** Icon element (optional) */
  icon?: React.ReactElement;
  /** Badge count (optional) */
  badgeCount?: number;
}

export interface TabsProps extends Omit<MuiTabsProps, 'onChange'> {
  /** Array of tab items */
  tabs: TabItem[];
  /** Currently selected tab index */
  value?: number;
  /** Default selected tab index */
  defaultValue?: number;
  /** Change handler */
  onChange?: (event: React.SyntheticEvent, newValue: number) => void;
  /** Show scroll buttons */
  scrollable?: boolean;
  /** Variant */
  variant?: 'standard' | 'fullWidth' | 'scrollable';
  /** Show content area */
  showContent?: boolean;
}

const StyledTabs = styled(MuiTabs)(({ theme }) => ({
  borderBottom: '1px solid #E0E0E0', // components.border.default
  minHeight: 48,
  '& .MuiTabs-indicator': {
    backgroundColor: '#2196F3', // primary.main
    height: 2,
  },
  '& .MuiTabs-scrollButtons': {
    color: '#757575', // text.secondary
    '&.Mui-disabled': {
      opacity: 0.3,
    },
  },
}));

const StyledTab = styled(MuiTab)(({ theme }) => ({
  textTransform: 'none',
  minWidth: 0,
  minHeight: 48,
  padding: '12px 16px', // sm (8px+4px) horizontal, md (16px) adjusted
  fontSize: '14px', // body2
  fontWeight: 400, // regular
  color: '#757575', // text.secondary
  transition: 'color 0.2s',
  '&:hover': {
    color: '#212121', // text.primary
    backgroundColor: 'rgba(0, 0, 0, 0.04)', // action.hover
  },
  '&.Mui-selected': {
    color: '#2196F3', // primary.main
    fontWeight: 500, // medium
  },
  '&.Mui-disabled': {
    color: '#9E9E9E', // text.disabled
    opacity: 0.6,
  },
  '&:focus': {
    outline: '2px solid #64B5F6', // components.border.focus
    outlineOffset: '-2px',
  },
  '& .MuiTab-iconWrapper': {
    marginBottom: 0,
    marginRight: '8px', // sm
  },
}));

const BadgeIndicator = styled('span')({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: '20px',
  height: '20px',
  borderRadius: '10px',
  backgroundColor: '#DB4537', // error.main
  color: '#FFFFFF', // base.white
  fontSize: '11px', // xxs
  fontWeight: 500, // medium
  marginLeft: '8px', // sm
  padding: '0 6px',
});

const TabPanel = styled(Box)({
  padding: '24px 16px', // lg (24px) vertical, md (16px) horizontal
  backgroundColor: '#FFFFFF', // background.paper
});

/**
 * Tabs navigation component with optional content panels
 * 
 * Variants (from Figma):
 * - Tabs: Tab Group, Right Scroll, Left and Right Scroll, Left Scroll
 * 
 * Individual Tab States:
 * - State: Selected, Unselected, active, default
 * - containerLeft: Yes, No
 * - containerRight: Yes, No
 * 
 * @example
 * ```tsx
 * <Tabs
 *   tabs={[
 *     { label: 'Overview', content: <OverviewPanel /> },
 *     { label: 'Details', content: <DetailsPanel /> },
 *     { label: 'History', content: <HistoryPanel /> }
 *   ]}
 *   value={activeTab}
 *   onChange={(e, value) => setActiveTab(value)}
 *   showContent
 * />
 * ```
 */
export const Tabs: React.FC<TabsProps> = ({
  tabs,
  value: controlledValue,
  defaultValue = 0,
  onChange,
  scrollable = false,
  variant = 'standard',
  showContent = false,
  ...props
}) => {
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const value = controlledValue !== undefined ? controlledValue : internalValue;

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    if (controlledValue === undefined) {
      setInternalValue(newValue);
    }
    onChange?.(event, newValue);
  };

  const tabsVariant = scrollable ? 'scrollable' : variant;
  const scrollButtons = scrollable ? 'auto' : false;

  return (
    <Box sx={{ width: '100%' }}>
      <StyledTabs
        value={value}
        onChange={handleChange}
        variant={tabsVariant}
        scrollButtons={scrollButtons}
        allowScrollButtonsMobile
        ScrollButtonComponent={(props) => (
          <IconButton {...props} size="small">
            {props.direction === 'left' ? (
              <KeyboardArrowLeftIcon />
            ) : (
              <KeyboardArrowRightIcon />
            )}
          </IconButton>
        )}
        {...props}
      >
        {tabs.map((tab, index) => (
          <StyledTab
            key={index}
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {tab.label}
                {tab.badgeCount !== undefined && tab.badgeCount > 0 && (
                  <BadgeIndicator>{tab.badgeCount}</BadgeIndicator>
                )}
              </Box>
            }
            icon={tab.icon}
            disabled={tab.disabled}
            iconPosition="start"
          />
        ))}
      </StyledTabs>

      {showContent &&
        tabs.map((tab, index) => (
          <div
            key={index}
            role="tabpanel"
            hidden={value !== index}
            id={`tabpanel-${index}`}
            aria-labelledby={`tab-${index}`}
          >
            {value === index && tab.content && <TabPanel>{tab.content}</TabPanel>}
          </div>
        ))}
    </Box>
  );
};

export default Tabs;
