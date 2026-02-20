# SearchInput Component

A text input component with a search icon prefix, designed for the AHTG Healthcare VMS platform.

## Design System Compliance

### ✅ AHTG Standards Met
- **8px Spacing Grid**: All spacing in 8px increments (8px gap, padding)
- **Material Icons**: Uses Material Icons SearchIcon
- **Desktop Only**: No responsive or mobile considerations
- **Roboto Typography**: 13px (sm) / 14px (md) Roboto font
- **Design Tokens**: All colors from `~/.openclaw/shared-data/design-tokens/palette.json`
- **Interaction States**: Proper hover, focus, disabled, and error states

### Color Tokens Used
```typescript
primary.main: '#2196F3'        // Focus state border
primary.light: '#E3F2FD'       // Filled variant background
text.primary: '#212121'        // Input text
text.secondary: '#757575'      // Placeholder text
text.disabled: '#9E9E9E'       // Disabled state text
text.error: '#DB4537'          // Error state text
components.input.enabledBorder: '#9E9E9E'  // Default border
components.input.hoverBorder: '#616161'    // Hover border
components.input.disabledBorder: '#E0E0E0' // Disabled border
components.border.focus: '#64B5F6'         // Focus border
error.main: '#DB4537'          // Error border
error.light: '#FBEAED'         // Error background (filled)
action.disabledBackground: '#EEEEEE'       // Disabled background
```

## Props

### Size
- `md` (default): 40px height, 14px font
- `sm`: 32px height, 13px font

### Variant
- `outlined` (default): White background with visible border
- `filled`: Light colored background with bottom border

### State
- `default`: Normal appearance
- `focused`: Blue focus ring (outlined) or blue bottom border (filled)
- `disabled`: Greyed out, no interaction
- `error`: Red border/bottom border and error text color

### Props Interface
```typescript
interface SearchInputProps {
  size?: 'md' | 'sm';
  variant?: 'outlined' | 'filled';
  state?: 'default' | 'focused' | 'disabled' | 'error';
  error?: boolean;
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  className?: string;
  sx?: SxProps<Theme>;
  hideIcon?: boolean;
  'aria-label'?: string;
}
```

## Usage Examples

### Basic Usage
```tsx
import { SearchInput } from './search-input-component';

function PhysicianSearch() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <SearchInput
      placeholder="Search physicians..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
}
```

### Small Size
```tsx
<SearchInput
  size="sm"
  placeholder="Quick search..."
  value={query}
  onChange={(e) => setQuery(e.target.value)}
/>
```

### Filled Variant
```tsx
<SearchInput
  variant="filled"
  placeholder="Search credentials..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
/>
```

### Error State
```tsx
<SearchInput
  error
  placeholder="Search..."
  value={invalidSearch}
  onChange={(e) => setInvalidSearch(e.target.value)}
  aria-label="Search with validation error"
/>
```

### Disabled State
```tsx
<SearchInput
  disabled
  placeholder="Search unavailable..."
  value={searchTerm}
/>
```

### Without Icon
```tsx
<SearchInput
  hideIcon
  placeholder="Filter..."
  value={filter}
  onChange={(e) => setFilter(e.target.value)}
/>
```

### With Custom Styling
```tsx
<SearchInput
  placeholder="Search..."
  sx={{ width: '300px', marginBottom: '16px' }}
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
/>
```

## Component Anatomy

```
┌─────────────────────────────────────┐
│ 🔍  [Search text input field]      │ ← StyledInputWrapper
│     ├── SearchIcon (optional)      │
│     └── InputBase                   │
└─────────────────────────────────────┘

Spacing:
- Container padding: 8px 16px (md) / 6px 12px (sm)
- Icon-to-input gap: 8px
- Border: 1px (outlined) / 2px bottom (filled)
- Focus ring: 3px shadow (outlined only)
```

## Accessibility

- Properly labeled with `aria-label` (defaults to placeholder text)
- Keyboard navigable (Tab to focus, type to search)
- Screen reader compatible
- Visible focus states with proper contrast
- Error states announced to assistive technology

## States Reference

### Outlined Variant

| State    | Border Color | Background | Shadow |
|----------|-------------|------------|--------|
| Default  | `#9E9E9E`   | White      | None   |
| Hover    | `#616161`   | White      | None   |
| Focused  | `#2196F3`   | White      | Blue ring |
| Error    | `#DB4537`   | White      | Red ring |
| Disabled | `#E0E0E0`   | `#EEEEEE`  | None   |

### Filled Variant

| State    | Bottom Border | Background | Top Border |
|----------|---------------|------------|------------|
| Default  | `#9E9E9E`     | `#E3F2FD`  | None       |
| Hover    | `#616161`     | `#E3F2FD`  | None       |
| Focused  | `#2196F3`     | `#E3F2FD`  | None       |
| Error    | `#DB4537`     | `#FBEAED`  | None       |
| Disabled | `#E0E0E0`     | `#EEEEEE`  | None       |

## Integration Notes

### AG Grid Integration
Can be used as a custom filter component in AG Grid:
```tsx
const gridOptions = {
  floatingFilter: true,
  floatingFilterComponent: SearchInput,
  floatingFilterComponentParams: {
    size: 'sm',
    variant: 'outlined',
  },
};
```

### Form Integration
Works with standard form handling:
```tsx
<form onSubmit={handleSubmit}>
  <SearchInput
    name="search"
    placeholder="Search..."
    value={formData.search}
    onChange={(e) => setFormData({ ...formData, search: e.target.value })}
  />
</form>
```

### Real-time Search
Typical pattern for search with debouncing:
```tsx
const [searchTerm, setSearchTerm] = useState('');

useEffect(() => {
  const timer = setTimeout(() => {
    performSearch(searchTerm);
  }, 300);
  
  return () => clearTimeout(timer);
}, [searchTerm]);

<SearchInput
  placeholder="Search..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
/>
```

## Component Variations

### Quick Filter (Small, No Icon)
```tsx
<SearchInput
  size="sm"
  hideIcon
  placeholder="Filter..."
/>
```

### Primary Search (Medium, Outlined)
```tsx
<SearchInput
  size="md"
  variant="outlined"
  placeholder="Search physicians, facilities, credentials..."
/>
```

### Embedded Search (Medium, Filled)
```tsx
<SearchInput
  size="md"
  variant="filled"
  placeholder="Search within results..."
/>
```

## Design Rationale

### Why These Sizes?
- **md (40px)**: Standard AHTG component height for primary actions
- **sm (32px)**: Compact variant for dense layouts and toolbars

### Why These Variants?
- **Outlined**: Clear boundary, works on any background color
- **Filled**: Softer appearance, good for embedded or less prominent searches

### Why Search Icon?
- Universal affordance for search functionality
- Material Icons standard across AHTG design system
- Can be hidden when context makes search obvious

## Testing Checklist

- [ ] All size variants render correctly
- [ ] All state transitions work (default → hover → focus → blur)
- [ ] Disabled state prevents interaction
- [ ] Error state displays with proper styling
- [ ] Icon displays correctly or hidden when `hideIcon={true}`
- [ ] Placeholder text visible and styled correctly
- [ ] Value updates on typing
- [ ] onChange callback fires properly
- [ ] onFocus and onBlur callbacks work
- [ ] Keyboard navigation (Tab, Shift+Tab)
- [ ] Screen reader announces label
- [ ] Focus ring visible and properly styled
- [ ] Works in both variants (outlined, filled)

## Known Limitations

- Desktop only (no mobile or touch optimizations)
- Single-line input only (no multiline support)
- No built-in autocomplete UI (can be added externally)
- No built-in clear button (can be added externally)
- No debouncing built-in (implement in parent component)

## Future Enhancements

Potential additions (requires design system review):
- Clear button (X icon to clear input)
- Loading state indicator
- Character counter
- Autocomplete dropdown integration
- Search history
- Voice search button

## Related Components

- **Button**: For search submission buttons
- **AG Grid**: For filtered table data
- **Form Fields**: Other input components in the design system

---

**Component Version**: 1.0  
**Last Updated**: February 2026  
**Design System**: AHTG Healthcare VMS  
**Status**: Ready for design system compliance review
