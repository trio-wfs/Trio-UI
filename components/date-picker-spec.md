# Date Picker Component Specification

## Figma Reference
- **Component ID**: `2784:5964`
- **Path**: `Document / Date Picker / Date Picker / Date Picker`
- **Building Block**: `2784:7541` (Building Blocks/Date Selections)
- **File**: Desktop Design System–(Atomic UI Components)

## Overview
Date and time selection component with calendar interface. Supports multiple variants including date-only, date+time, and custom chip-based multi-date selection.

## Variants

### Type
- `Date`: Standard date picker with calendar
- `Time and Date`: Combined date and time picker
- `Date Picker with Chips (custom)`: Date picker with chip display for selected dates

## Building Block States

### Date Selections
- **Default**: Regular unselected date cell
- **Selected**: Currently selected date (blue background, white text)
- **Today Indicator**: Current date with blue border
- **Greyed Out**: Disabled or unavailable dates

## Design Tokens Used

### Colors
- **Primary**: `#2196F3` (primary.main) - Selected date, today border
- **Primary Light**: `#E3F2FD` (primary.light) - Chip background
- **Primary Dark**: `#1976D2` (primary.dark) - Hover states
- **Text Primary**: `#212121` (text.primary) - Date numbers
- **Text Secondary**: `#757575` (text.secondary) - Labels, helper text
- **Text Disabled**: `#9E9E9E` (text.disabled) - Disabled dates
- **White**: `#FFFFFF` (base.white) - Selected date text
- **Border**: `#9E9E9E` (components.input.enabledBorder) - Input border
- **Error**: `#DB4537` (error.main) - Error state

### Typography
- **Date cells**: 14px (body2), weight 400 (regular) / 500 (medium for selected)
- **Input text**: 14px (body2), weight 400 (regular)
- **Labels**: 14px (body2)
- **Helper text**: 12px (caption)
- **Font family**: Roboto

### Spacing
- **Chip gap**: 8px (sm)
- **Chip margin top**: 16px (md)
- **Internal spacing**: 4px (xs), 8px (sm)

### Border
- **Input border**: 1px solid
- **Focus border**: 2px solid
- **Today indicator**: 2px solid border

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `Dayjs \| null` | - | Controlled date value |
| `defaultValue` | `Dayjs \| null` | - | Default date (uncontrolled) |
| `onChange` | `(date: Dayjs \| null) => void` | - | Change handler |
| `type` | `'date' \| 'datetime' \| 'date-with-chips'` | `'date'` | Picker variant |
| `label` | `string` | `'Select Date'` | Input label |
| `disabled` | `boolean` | `false` | Disabled state |
| `required` | `boolean` | `false` | Required field |
| `helperText` | `string` | - | Helper/hint text |
| `error` | `boolean` | `false` | Error state |
| `minDate` | `Dayjs` | - | Minimum selectable date |
| `maxDate` | `Dayjs` | - | Maximum selectable date |
| `showTodayIndicator` | `boolean` | `true` | Highlight today's date |
| `selectedChips` | `Dayjs[]` | `[]` | Selected dates (chips variant) |
| `onChipSelect` | `(date: Dayjs) => void` | - | Chip selection handler |
| `onChipRemove` | `(date: Dayjs) => void` | - | Chip removal handler |

## Usage Examples

### Basic Date Picker
```tsx
import { DatePicker } from '@/components/date-picker';
import dayjs from 'dayjs';

<DatePicker
  label="Select Date"
  value={selectedDate}
  onChange={setSelectedDate}
/>
```

### Date and Time Picker
```tsx
<DatePicker
  type="datetime"
  label="Appointment Date & Time"
  value={appointmentTime}
  onChange={setAppointmentTime}
  minDate={dayjs()}
/>
```

### With Validation
```tsx
<DatePicker
  label="Date of Birth"
  value={dob}
  onChange={setDob}
  required
  error={!isValidDob}
  helperText={!isValidDob ? 'Please enter a valid date of birth' : ''}
  maxDate={dayjs()}
/>
```

### Date Range Restrictions
```tsx
<DatePicker
  label="Effective Date"
  value={effectiveDate}
  onChange={setEffectiveDate}
  minDate={dayjs()}
  maxDate={dayjs().add(1, 'year')}
  helperText="Select a date within the next year"
/>
```

### Date Picker with Chips (Multi-Select)
```tsx
const [selectedDates, setSelectedDates] = useState<Dayjs[]>([]);

<DatePicker
  type="date-with-chips"
  label="Select Multiple Dates"
  selectedChips={selectedDates}
  onChipSelect={(date) => {
    setSelectedDates([...selectedDates, date]);
  }}
  onChipRemove={(date) => {
    setSelectedDates(
      selectedDates.filter(d => !d.isSame(date, 'day'))
    );
  }}
/>
```

### Disabled State
```tsx
<DatePicker
  label="Cannot Change"
  value={fixedDate}
  disabled
/>
```

## Accessibility
- Input field has proper label association
- Keyboard navigation in calendar (arrow keys)
- Escape key closes calendar popover
- Enter key selects date
- Focus indicators on interactive elements
- ARIA labels for calendar navigation
- Screen reader announces selected date
- Required field communicated to assistive tech

## Behavior

### Calendar Interface
- Click input to open calendar popover
- Navigate months with prev/next buttons
- Click date to select
- Today's date highlighted with border
- Selected date has blue background
- Hover state on date cells

### Date States
1. **Default**: Regular unselected date
   - Black text on white background
   - Hover shows light blue background
   
2. **Selected**: Currently selected date
   - Blue background (#2196F3)
   - White text
   - Bold font weight
   
3. **Today Indicator**: Current date
   - 2px blue border
   - Bold font weight
   - Can be combined with selected state
   
4. **Greyed Out/Disabled**: Unavailable dates
   - Grey text (#9E9E9E)
   - Reduced opacity
   - Not clickable
   - Dates outside min/max range

### Input Field
- Standard text field with calendar icon
- Focus shows blue border
- Error state shows red border and helper text
- Disabled state shows grey appearance

### Chips (Multi-Select Variant)
- Display below date picker input
- Show selected dates in readable format
- Click X to remove chip
- Chips use primary light color
- Scrollable if many chips selected

## Component States from Figma

### Date Picker Types
1. `Type=Date` (ID: 2784:5965)
2. `Type=Time and Date` (ID: 2784:7437)
3. `Type=Date Picker with Chips (custom)` (ID: 2784:6032)

### Date Selection States
1. `State=Today Indicator` (ID: 2784:7540)
2. `State=Selected` (ID: 2784:7539)
3. `State=Default` (ID: 2784:7538)
4. `State=Greyed Out` (ID: 2784:7543)

## Implementation Notes
- Built on MUI X Date Pickers (@mui/x-date-pickers)
- Uses Day.js for date handling
- All visual specs from design tokens
- Custom styled day cells for proper theming
- Supports both controlled and uncontrolled modes
- Locale-aware date formatting
- Timezone support through Day.js
- Validation through min/max date props
- Chips variant for multi-date selection
- Fully keyboard accessible
- Mobile-friendly calendar interface
