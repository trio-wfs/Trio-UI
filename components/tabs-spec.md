# Tabs Component Specification

## Figma Reference
- **Component ID**: `3868:51864`
- **Path**: `Document / Tabs / Tabs / Tabs`
- **Building Block**: `3868:51827` (Tabs/BuildingBlocks/Individual Tab)
- **File**: Desktop Design System–(Atomic UI Components)

## Overview
Horizontal navigation component organizing content into separate views. Only one tab's content is visible at a time.

## Variants

### Tabs
- `Tab Group`: Standard tab group without scrolling
- `Right Scroll`: Scrollable with right scroll button
- `Left and Right Scroll`: Scrollable with both scroll buttons
- `Left Scroll`: Scrollable with left scroll button

### Individual Tab Properties
- **Tab1-8**: Boolean toggles for showing/hiding specific tabs
- **State**: `Selected` | `Unselected` | `active` | `default`
- **containerLeft**: `Yes` | `No`
- **containerRight**: `Yes` | `No`

## Design Tokens Used

### Colors
- **Primary**: `#2196F3` (primary.main) - Selected tab, indicator
- **Text Primary**: `#212121` (text.primary) - Hover state
- **Text Secondary**: `#757575` (text.secondary) - Unselected tabs
- **Text Disabled**: `#9E9E9E` (text.disabled) - Disabled tabs
- **Border**: `#E0E0E0` (components.border.default) - Bottom border
- **Focus**: `#64B5F6` (components.border.focus) - Focus outline
- **Badge**: `#DB4537` (error.main) - Badge background
- **White**: `#FFFFFF` (base.white) - Badge text, panel background

### Typography
- **Font size**: 14px (body2)
- **Font weight**: 400 (regular), 500 (medium for selected)
- **Font family**: Roboto
- **Badge size**: 11px (xxs)

### Spacing
- **Tab padding**: 12px vertical, 16px horizontal
- **Tab min height**: 48px
- **Icon margin**: 8px (sm) right
- **Badge margin**: 8px (sm) left
- **Panel padding**: 24px (lg) vertical, 16px (md) horizontal

### Border
- **Bottom border**: 1px solid #E0E0E0
- **Indicator**: 2px height, primary color

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `tabs` | `TabItem[]` | required | Array of tab items |
| `value` | `number` | - | Controlled selected tab index |
| `defaultValue` | `number` | `0` | Default selected tab (uncontrolled) |
| `onChange` | `(event, value) => void` | - | Tab change handler |
| `scrollable` | `boolean` | `false` | Enable scroll buttons |
| `variant` | `'standard' \| 'fullWidth' \| 'scrollable'` | `'standard'` | Tab layout variant |
| `showContent` | `boolean` | `false` | Show tab content panels |

### TabItem Interface
```typescript
interface TabItem {
  label: string;              // Tab label text
  content?: ReactNode;        // Tab panel content
  disabled?: boolean;         // Disabled state
  icon?: ReactElement;        // Leading icon
  badgeCount?: number;        // Badge count (optional)
}
```

## Usage Examples

### Basic Tabs
```tsx
<Tabs
  tabs={[
    { label: 'Overview' },
    { label: 'Details' },
    { label: 'History' }
  ]}
  value={activeTab}
  onChange={(e, value) => setActiveTab(value)}
/>
```

### Tabs with Content
```tsx
<Tabs
  tabs={[
    { 
      label: 'Patient Info', 
      content: <PatientInfoPanel /> 
    },
    { 
      label: 'Medical History', 
      content: <MedicalHistoryPanel /> 
    },
    { 
      label: 'Documents', 
      content: <DocumentsPanel /> 
    }
  ]}
  showContent
/>
```

### Tabs with Badges
```tsx
<Tabs
  tabs={[
    { label: 'All Tasks', badgeCount: 12 },
    { label: 'Active', badgeCount: 5 },
    { label: 'Completed', badgeCount: 7 }
  ]}
/>
```

### Tabs with Icons
```tsx
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';

<Tabs
  tabs={[
    { label: 'Profile', icon: <PersonIcon /> },
    { label: 'Settings', icon: <SettingsIcon /> }
  ]}
/>
```

### Scrollable Tabs
```tsx
<Tabs
  tabs={manyTabs}
  scrollable
/>
```

### Disabled Tab
```tsx
<Tabs
  tabs={[
    { label: 'Available' },
    { label: 'Coming Soon', disabled: true },
    { label: 'Active' }
  ]}
/>
```

### Full Width Tabs
```tsx
<Tabs
  tabs={tabs}
  variant="fullWidth"
/>
```

## Accessibility
- Uses semantic ARIA roles (`tab`, `tabpanel`)
- Keyboard navigation (Arrow keys, Home, End)
- Focus indicators on active tab
- Proper ARIA attributes (`aria-selected`, `aria-labelledby`)
- Screen reader announces selected tab
- Disabled tabs not focusable

## Behavior

### Interactive States
1. **Default (Unselected)**: Secondary text color
2. **Hover**: Primary text color, subtle background
3. **Selected**: Primary color, bold weight, bottom indicator
4. **Focus**: Blue outline around tab
5. **Disabled**: Disabled color, reduced opacity, not interactive

### Badge Indicator
- Circular badge for notification counts
- Red background (#DB4537)
- White text
- Positioned to the right of label
- Only shows when `badgeCount > 0`

### Scroll Buttons
- Appear automatically when tabs overflow
- Left/right arrow icons
- Disabled when at scroll limits
- Material Icons: `KeyboardArrowLeft`, `KeyboardArrowRight`

### Content Panels
- Only visible when `showContent={true}`
- One panel shown at a time
- Hidden panels use `hidden` attribute
- Proper `role="tabpanel"` for accessibility

## Component States from Figma
1. `Tabs=Tab Group` (ID: 3868:51865)
2. `Tabs=Right Scroll` (ID: 3868:51877)
3. `Tabs=Left and Right Scroll` (ID: 3868:51890)
4. `Tabs=Left Scroll` (ID: 4156:39241)

## Individual Tab States
1. `State=active, containerLeft=Yes, containerRight=Yes` (ID: 3868:51828)
2. `State=Selected, containerLeft=Yes, containerRight=No` (ID: 3868:51834)
3. `State=Selected, containerLeft=No, containerRight=Yes` (ID: 3868:51839)
4. `State=Selected, containerLeft=No, containerRight=No` (ID: 3868:51844)
5. `State=default, containerLeft=Yes, containerRight=Yes` (ID: 3868:51848)
6. `State=Unselected, containerLeft=Yes, containerRight=No` (ID: 3868:51853)
7. `State=Unselected, containerLeft=No, containerRight=Yes` (ID: 3868:51857)
8. `State=Unselected, containerLeft=No, containerRight=No` (ID: 3868:51861)

## Implementation Notes
- Built on MUI Tabs component
- All visual specs from design tokens
- Supports both controlled and uncontrolled modes
- Scroll buttons auto-hide when not needed
- Optional content panel rendering
- Badge uses error color for visibility
- Icons positioned before labels
- Full keyboard navigation support
