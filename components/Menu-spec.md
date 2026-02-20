# Menu Component Specification

## Overview
Production-ready Menu component extracted from Figma design system (nodes 4505-3795, 4505-3890, 5046-11916).

## Figma Sources
- **Menu Container**: Node 4505-3795
- **MenuItem Building Block**: Node 4505-3890
- **MenuList Variants**: Node 5046-11916

## Features
- ✅ Full keyboard navigation (Arrow keys, Home, End, Escape)
- ✅ ARIA accessibility attributes
- ✅ Multiple variants: single, multi, grouped
- ✅ Visual states: default, hover, selected, disabled, title
- ✅ Atomic content slots (left/right content)
- ✅ Optional scroll support with visual indicator
- ✅ Design token-based styling (no hardcoded values)

## Component API

### Menu Props
```typescript
interface MenuProps {
  items: MenuItemData[];           // Array of menu items
  variant?: 'single' | 'multi' | 'grouped';  // Default: 'single'
  showScrollbar?: boolean;          // Default: true
  maxHeight?: number;               // Default: 237px
  onItemClick?: (item: MenuItemData) => void;
  onSelectionChange?: (selectedIds: string[]) => void;
  className?: string;
  multiSelect?: boolean;            // Default: false
}
```

### MenuItemData
```typescript
interface MenuItemData {
  id: string;                       // Unique identifier
  label: string;                    // Display text
  value?: string;                   // Optional value
  disabled?: boolean;               // Disabled state
  selected?: boolean;               // Selected state
  leftContent?: ReactNode;          // Left slot content (icon, checkbox, etc.)
  rightContent?: ReactNode;         // Right slot content (badge, shortcut, etc.)
  divider?: boolean;                // Show divider after item
  isTitle?: boolean;                // Title/group header style (grouped variant only)
  children?: MenuItemData[];        // Nested items (future enhancement)
}
```

## Design Tokens Used

### Spacing
- `--spacing/base/none` (0px)
- `--spacing/base/xs` (4px) - scrollbar padding
- `--spacing/base/sm` (8px) - item padding, gaps
- `--spacing/base/md` (16px) - horizontal padding

### Colors
- `--color/semantic/surface/background/elevated` (white) - menu background
- `--color/semantic/border/default` (#e0e0e0) - border, divider
- `--color/semantic/text/primary` (#212121) - text color
- `--text/disabled` (#9e9e9e) - disabled text
- `--color/semantic/action/secondary/background/default` (#f5f5f5) - hover background
- `--primary/states/hover` (rgba(33,150,243,0.08)) - selected background
- `--action/hover` (rgba(0,0,0,0.04)) - selected+hover overlay
- `--color/base/neutral/400` (#bdbdbd) - scrollbar thumb
- `--color/semantic/border/input` (#9e9e9e) - checkbox border

### Typography
- `--typography/family/body` ('Roboto:Regular', 'Roboto:Medium')
- `--typography/weight/regular` (400)
- `--typography/weight/medium` (500)
- `--typography/style/body2/size` (14px)
- `--typography/style/body2/line-height` (21px)
- `--typography/style/body1/line-height` (24px) - for titles

### Borders & Shadows
- `--radius/base/md` (4px) - container border radius
- `--xs` (4px) - inner border radius
- `--base/full` (999px) - scrollbar border radius
- Box shadow: `0px 2px 4px 0px rgba(0,0,0,0.08)`

## Variants

### Single Select (default)
- Only one item can be selected at a time
- No checkboxes shown
- Standard padding: 16px horizontal, 8px vertical

### Multi Select
- Multiple items can be selected
- Checkboxes shown on the left
- Supports `multiSelect` prop or `variant="multi"`

### Grouped
- Supports title/header items (styled differently)
- Reduced padding for title items: 8px all around
- Title text uses medium weight font
- Dividers typically shown after groups

## States

### Default
- White background
- Black text (#212121)
- No special styling

### Hover
- Light gray background (#f5f5f5)
- Cursor: pointer

### Selected
- Light blue background (rgba(33,150,243,0.08))
- Checkbox checked (multi variant)

### Selected + Hover
- Selected background
- Additional overlay (rgba(0,0,0,0.04))

### Disabled
- Gray text (#9e9e9e)
- No hover effects
- Cursor: default
- Not focusable (tabIndex: -1)

### Title (grouped variant)
- Medium weight font (500)
- Reduced padding (8px)
- Not interactive
- Can have dividers

## Keyboard Navigation

| Key | Action |
|-----|--------|
| ↓ (Arrow Down) | Move focus to next non-disabled item |
| ↑ (Arrow Up) | Move focus to previous non-disabled item |
| Home | Move focus to first non-disabled item |
| End | Move focus to last non-disabled item |
| Enter/Space | Select/activate focused item |
| Escape | Close menu (blur focus) |

## Accessibility

- `role="menu"` on container
- `role="menuitem"` on each item
- `aria-disabled` for disabled items
- `aria-selected` for selected items
- `tabIndex` management for keyboard navigation
- Focus visible on keyboard navigation

## Layout Specifications

### Menu Container
- Width: 254px
- Border: 1px solid #e0e0e0
- Border radius: 4px
- Box shadow: 0px 2px 4px 0px rgba(0,0,0,0.08)
- Background: white

### Menu Item
- Min height: ~37px (8px + 21px + 8px)
- Padding: 16px horizontal, 8px vertical
- Gap between elements: 8px

### Title Item (grouped)
- Padding: 8px all sides
- Line height: 24px (vs 21px for normal items)

### Scrollbar
- Width: 6px + 8px padding = 14px total
- Height: 39px (thumb)
- Padding: 4px horizontal, 16px vertical
- Border radius: 999px (full round)
- Color: #bdbdbd

### Checkbox (multi variant)
- Size: 16x16px
- Container: 20x20px (centered)
- Border: 1px solid #9e9e9e
- Border radius: 2px
- Checked: blue background (#2196f3), white checkmark

## Usage Examples

### Basic Single Select
```tsx
<Menu
  items={[
    { id: '1', label: 'Action' },
    { id: '2', label: 'Selected', selected: true },
    { id: '3', label: 'Menu Item' },
  ]}
  onItemClick={(item) => console.log('Clicked:', item.label)}
/>
```

### Multi Select with Checkboxes
```tsx
<Menu
  variant="multi"
  items={[
    { id: '1', label: 'Option 1', selected: true },
    { id: '2', label: 'Option 2', selected: true },
    { id: '3', label: 'Option 3' },
  ]}
  onSelectionChange={(ids) => console.log('Selected IDs:', ids)}
/>
```

### Grouped Menu with Titles
```tsx
<Menu
  variant="grouped"
  items={[
    { id: 'header1', label: 'Group 1', isTitle: true, divider: true },
    { id: '1', label: 'Item 1' },
    { id: '2', label: 'Item 2' },
    { id: 'header2', label: 'Group 2', isTitle: true, divider: true },
    { id: '3', label: 'Item 3' },
  ]}
/>
```

### With Custom Content Slots
```tsx
<Menu
  items={[
    {
      id: '1',
      label: 'Settings',
      leftContent: <SettingsIcon />,
      rightContent: <span>⌘,</span>,
    },
    {
      id: '2',
      label: 'New Messages',
      rightContent: <Badge count={5} />,
    },
  ]}
/>
```

### With Disabled Items
```tsx
<Menu
  items={[
    { id: '1', label: 'Active Item' },
    { id: '2', label: 'Disabled Item', disabled: true },
    { id: '3', label: 'Another Active Item' },
  ]}
/>
```

## Implementation Notes

1. **Design Token Compliance**: All colors, spacing, typography uses CSS variables matching Figma design tokens
2. **No Hardcoded Values**: Every measurement references a design token variable
3. **State Management**: Internal state for hover, focus, and selection
4. **Keyboard Navigation**: Full support for keyboard-only users
5. **Accessibility**: Proper ARIA attributes and focus management
6. **Flexible Slots**: Left and right content slots accept any ReactNode
7. **Controlled/Uncontrolled**: Can be used both ways via selected prop and onSelectionChange
8. **Scroll Support**: Optional scrollbar with visual indicator
9. **Performance**: Refs used for efficient focus management

## Browser Support
- Modern browsers with CSS Grid/Flexbox support
- Requires React 16.8+ (hooks)
- TypeScript 4.0+ recommended

## File Location
- Component: `~/.openclaw/shared-data/components/Menu.tsx`
- Spec: `~/.openclaw/shared-data/components/Menu-spec.md`
- Demo: `~/.openclaw/shared-data/components/Menu-showcase.html`
