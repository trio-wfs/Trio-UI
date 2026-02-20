# Autocomplete Component Specification

**Figma Source:** Node 2381:6441 | File PjAYuPDr8IA1ccwiAjFkSD  
**Design System:** AHTG Healthcare VMS  
**Component Type:** Form Input / Selection Control  
**Status:** Production Ready ✅

---

## Overview

The Autocomplete component is a production-ready form input that allows users to select one or multiple options from a filtered dropdown list. It supports keyboard navigation, accessibility features, and multiple states as defined in the AHTG design system.

---

## Design Specifications

### Dimensions
- **Input Container Height:** 36px
- **Input Container Min Width:** 200px (recommended)
- **Dropdown Max Height:** 237px (scrollable)
- **Chip Height (Multi-select):** 24px
- **Menu Item Height:** ~37px (8px padding top/bottom + 21px line-height)

### Spacing (from spacing.json)
- **xs:** 4px - Internal chip spacing, label gap, vertical spacing between elements
- **sm:** 8px - Input horizontal padding, menu item vertical padding, icon gaps
- **md:** 16px - Menu item horizontal padding

### Typography (from typography.json)
- **Label:** caption (12px / 18px line-height, weight 400)
- **Input Text:** body2 (14px / 21px line-height, weight 400)
- **Chip Label:** button/sm (12px / 12px line-height, weight 400)
- **Helper Text:** caption (12px / 18px line-height, weight 400)
- **Font Family:** Roboto (from design tokens)

### Colors (from palette.json)

#### Text Colors
- **Primary Text:** #212121 (`text.primary`)
- **Secondary Text:** #757575 (`text.secondary`)
- **Disabled Text:** #9E9E9E (`text.disabled`)
- **Error Text:** #DB4537 (`text.error`)

#### Border Colors
- **Default Border:** #E0E0E0 (`components.border.default`)
- **Focus Border:** #64B5F6 (`components.border.focus`)
- **Error Border:** #DB4537 (`error.main`)
- **Disabled Border:** #E0E0E0 (`components.input.disabledBorder`)

#### Background Colors
- **Input Background:** #FFFFFF (`background.paper`)
- **Disabled Background:** #EEEEEE (`action.disabledBackground`)
- **Chip Background:** #F5F5F5 (`secondary.main`)
- **Dropdown Background:** #FFFFFF (`background.paper`)
- **Hover/Selected State:** rgba(33, 150, 243, 0.08) (`primary.states.hover`)

#### Icon Colors
- **Default Icon:** #424242 (`components.icon.default`)
- **Disabled Icon:** #9E9E9E (`components.icon.disabled`)

### Border Radius
- **Input Container:** 4px (md)
- **Chip:** 999px (full)
- **Dropdown Menu:** 4px (md)

### Shadows
- **Focus Shadow:** 0px 0px 1px 0px rgba(66, 165, 245, 0.32)
- **Dropdown Shadow:** 0px 2px 4px 0px rgba(0, 0, 0, 0.08)

---

## Component Variants

### 1. Type Variants
- **Single Select (`type="single"`)**: Allows selection of one option
- **Multi-Select (`type="multi"`)**: Allows selection of multiple options with chip display

### 2. State Variants
- **Default (`state="default"`)**: Normal resting state
- **Focus (`state="focus"`)**: Active input with focus ring
- **Error (`state="error"`)**: Validation error state with red border
- **Disabled (`disabled=true`)**: Non-interactive locked state

### 3. Selection States
- **Empty (`selected=false`)**: No value selected
- **Selected (`selected=true`)**: Has selected value(s)

### 4. Menu States
- **Closed (`menu=false`)**: Dropdown not visible
- **Open (`menu=true`)**: Dropdown visible with options

---

## Component Props

```typescript
interface AutocompleteOption {
  id: string;
  label: string;
  value: string;
  disabled?: boolean;
}

interface AutocompleteProps {
  label?: string;                          // Label text
  required?: boolean;                      // Show asterisk
  placeholder?: string;                    // Placeholder when empty
  options: AutocompleteOption[];           // Available options
  value?: string | string[];               // Current value(s)
  onChange?: (value: string | string[]) => void;  // Selection handler
  multiSelect?: boolean;                   // Enable multi-select
  error?: boolean;                         // Error state
  errorMessage?: string;                   // Error message text
  helperText?: string;                     // Helper text
  disabled?: boolean;                      // Disabled state
  className?: string;                      // Custom class
  onInputChange?: (inputValue: string) => void;  // Input change handler
  clearable?: boolean;                     // Show clear button
  maxMenuHeight?: number;                  // Max dropdown height
  ariaLabel?: string;                      // Accessibility label
}
```

---

## Keyboard Navigation

| Key | Action |
|-----|--------|
| **Arrow Down** | Open menu (if closed) or move focus to next option |
| **Arrow Up** | Move focus to previous option |
| **Enter** | Select focused option and close menu |
| **Escape** | Close menu without selecting |
| **Tab** | Close menu and move to next field |
| **Backspace** | Remove last chip (multi-select, when input empty) |

---

## Accessibility Features

### ARIA Attributes
- `role="combobox"` - Identifies the input as an autocomplete
- `aria-expanded` - Indicates if dropdown is open
- `aria-autocomplete="list"` - Indicates autocomplete behavior
- `aria-controls="autocomplete-menu"` - Links to dropdown menu
- `aria-activedescendant` - Points to focused option
- `role="listbox"` - Identifies the dropdown menu
- `role="option"` - Identifies each menu item
- `aria-selected` - Indicates selected options
- `aria-disabled` - Indicates disabled options
- `aria-label` - Provides accessible name

### Focus Management
- Proper focus ring with 1px shadow on focus state
- Keyboard navigation through options with visual focus indicator
- Focus returns to input after selection
- Tab order maintained throughout interaction

### Screen Reader Support
- Announces selected values
- Announces number of available options
- Announces when menu opens/closes
- Announces focused option changes
- Clear labels for all interactive elements

---

## States Matrix

| State | Type | Selected | Menu | Disabled | Border | Background |
|-------|------|----------|------|----------|--------|------------|
| Default | Single | No | Closed | No | #E0E0E0 | #FFFFFF |
| Default | Single | Yes | Closed | No | #E0E0E0 | #FFFFFF |
| Focus | Single | No | Open | No | #64B5F6 | #FFFFFF |
| Focus | Single | Yes | Open | No | #64B5F6 | #FFFFFF |
| Error | Single | No | Closed | No | #DB4537 | #FFFFFF |
| Disabled | Single | Yes | Closed | Yes | #E0E0E0 | #EEEEEE |
| Default | Multi | No | Closed | No | #E0E0E0 | #FFFFFF |
| Default | Multi | Yes | Closed | No | #E0E0E0 | #FFFFFF |
| Focus | Multi | Yes | Open | No | #64B5F6 | #FFFFFF |
| Error | Multi | No | Closed | No | #DB4537 | #FFFFFF |
| Disabled | Multi | Yes | Closed | Yes | #E0E0E0 | #EEEEEE |

---

## Interaction Specifications

### Single Select Mode
1. Click input → menu opens
2. Type to filter options
3. Click option → value selected, menu closes
4. Value displays in input
5. Click X icon → clears selection

### Multi-Select Mode
1. Click input → menu opens
2. Type to filter options
3. Click option → chip appears, menu stays open
4. Multiple selections create multiple chips
5. Click X on chip → removes that selection
6. Input remains available for additional selections
7. Backspace with empty input → removes last chip

### Focus States
- **Default → Focus:** Click input or Tab into field
- **Focus → Default:** Click outside or press Escape
- **Menu Open:** Automatically on focus (if not disabled)
- **Menu Close:** On selection (single), Escape, or click outside

---

## Design Token Usage

### Direct Token References
```typescript
// Spacing
gap: '4px'        // spacing.xs
gap: '8px'        // spacing.sm  
padding: '16px'   // spacing.md

// Typography
fontSize: '12px'      // typography.size.xs
fontSize: '14px'      // typography.size.sm
lineHeight: '18px'    // typography.style.caption.line-height
lineHeight: '21px'    // typography.style.body2.line-height
fontWeight: 400       // typography.weight.regular
fontFamily: 'Roboto'  // typography.family.body

// Colors
color: '#212121'   // palette.text.primary
color: '#757575'   // palette.text.secondary  
color: '#9E9E9E'   // palette.text.disabled
color: '#DB4537'   // palette.error.main
border: '#E0E0E0'  // palette.components.border.default
border: '#64B5F6'  // palette.components.border.focus
background: '#F5F5F5'  // palette.secondary.main
background: '#FFFFFF'  // palette.background.paper
hover: 'rgba(33, 150, 243, 0.08)'  // palette.primary.states.hover
```

---

## Component Dependencies

### React Hooks Used
- `useState` - Component state management
- `useRef` - DOM element references  
- `useEffect` - Side effects (click outside, scrolling)
- `useCallback` - Memoized callbacks

### No External Dependencies
- Pure React implementation
- No third-party libraries required
- Self-contained styles (inline React styles)

---

## Browser Support

- **Chrome:** 90+
- **Firefox:** 88+
- **Safari:** 14+
- **Edge:** 90+

### Required Features
- CSS Flexbox
- CSS Box Shadow
- SVG support
- ES6+ JavaScript

---

## Usage Examples

### Basic Single Select
```tsx
import { Autocomplete } from './Autocomplete';

const [specialty, setSpecialty] = useState('');

<Autocomplete
  label="Medical Specialty"
  placeholder="Select a specialty"
  options={specialtyOptions}
  value={specialty}
  onChange={setSpecialty}
  required
/>
```

### Multi-Select with Pre-selected
```tsx
const [specialties, setSpecialties] = useState(['cardiology', 'neurology']);

<Autocomplete
  label="Specialties"
  placeholder="Add more specialties"
  options={specialtyOptions}
  value={specialties}
  onChange={setSpecialties}
  multiSelect
  helperText="Select all applicable specialties"
/>
```

### With Error Validation
```tsx
const [state, setState] = useState('');
const [hasError, setHasError] = useState(false);

const handleValidate = () => {
  if (!state) {
    setHasError(true);
  }
};

<Autocomplete
  label="License State"
  options={stateOptions}
  value={state}
  onChange={(value) => {
    setState(value);
    setHasError(false);
  }}
  error={hasError}
  errorMessage="State is required"
  required
/>
```

### Disabled State
```tsx
<Autocomplete
  label="Primary Specialty (Locked)"
  options={specialtyOptions}
  value="cardiology"
  disabled
  helperText="This field cannot be modified"
/>
```

---

## Testing Checklist

### Visual Testing
- ✅ Default state matches Figma
- ✅ Focus state shows blue border + shadow
- ✅ Error state shows red border + error message
- ✅ Disabled state shows gray background
- ✅ Chips display correctly in multi-select
- ✅ Menu dropdown appears below input
- ✅ Selected options show checkmark
- ✅ Hover states work on menu items

### Functional Testing
- ✅ Single select chooses one value
- ✅ Multi-select allows multiple values
- ✅ Filtering works when typing
- ✅ Clear button removes selection
- ✅ Chip X button removes individual selections
- ✅ Menu closes on outside click
- ✅ Menu closes on Escape
- ✅ Required validation works

### Keyboard Testing
- ✅ Tab focuses input
- ✅ Arrow Down opens menu
- ✅ Arrow Up/Down navigates options
- ✅ Enter selects option
- ✅ Escape closes menu
- ✅ Backspace removes last chip

### Accessibility Testing
- ✅ Screen reader announces label
- ✅ Screen reader announces selected value
- ✅ Screen reader announces menu state
- ✅ ARIA attributes present
- ✅ Focus visible at all times
- ✅ Color contrast meets WCAG AA

---

## Performance Considerations

### Optimization Strategies
- **useCallback** for event handlers to prevent re-renders
- **useRef** for DOM access without re-renders  
- Virtualization recommended for 100+ options (not implemented)
- Debouncing recommended for API filtering (not implemented)

### Render Performance
- Minimal re-renders on input change
- Efficient option filtering
- Scroll position maintained during navigation

---

## Known Limitations

1. **Large Option Lists:** No virtualization for 1000+ items (would need react-window)
2. **Custom Option Rendering:** No support for complex option templates
3. **Option Groups:** No grouping/categorization support
4. **Async Loading:** No built-in async option loading
5. **Mobile Touch:** Optimized for desktop, touch targets may need adjustment

---

## Future Enhancements

- [ ] Virtual scrolling for large datasets
- [ ] Option grouping/categories
- [ ] Custom option templates
- [ ] Async option loading
- [ ] Advanced filtering (fuzzy search)
- [ ] Option creation on-the-fly
- [ ] Drag-to-reorder chips (multi-select)
- [ ] Mobile-optimized touch targets

---

## Design System Compliance

✅ **Colors:** All colors from palette.json  
✅ **Spacing:** All spacing from spacing.json (xs, sm, md)  
✅ **Typography:** All typography from typography.json  
✅ **Accessibility:** WCAG 2.1 AA compliant  
✅ **Desktop Only:** No responsive/mobile variants (as required)  
✅ **Material Icons:** Uses inline SVG icons (design system approved)  

---

## Maintenance Notes

### When to Update
- Design token values change in palette/spacing/typography JSON files
- New interaction patterns added to design system
- Accessibility requirements updated
- Browser support requirements change

### How to Update
1. Pull latest design tokens from Figma
2. Update color/spacing/typography values in component
3. Test all variants against updated Figma designs
4. Update this spec document with changes
5. Run full testing checklist

---

## Questions or Issues?

Contact: Jesse (Design System Lead)  
Figma File: PjAYuPDr8IA1ccwiAjFkSD  
Component Node: 2381:6441
