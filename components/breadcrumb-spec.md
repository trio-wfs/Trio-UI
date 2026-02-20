# Breadcrumb Component Specification

## Figma Reference
- **Component ID**: `494:3560`
- **Path**: `Document / Breradcrumbs / Breadcrumb / Breadcrumb`
- **Building Blocks**: `5847:86` (Breadcrumb/buildingblocks/links)
- **File**: Desktop Design System–(Atomic UI Components)

## Overview
Navigation component displaying hierarchical page structure. Shows user's location within the application and allows navigation back through parent pages.

## Variants

### State
- `breadcrumb`: Standard breadcrumb navigation (default)
- `Links`: Alternative link-focused variant

### Show Number Indicator
- `true`: Display numbered indicators before each breadcrumb item
- `false`: Display without numbered indicators (default)

## Building Blocks

### Links
- **type**: `selected` | `default`
- **divider**: `true` | `false` (boolean)
- **label**: Text content (customizable)

## Design Tokens Used

### Colors
- **Text Primary**: `#212121` (text.primary) - Current page
- **Text Secondary**: `#757575` (text.secondary) - Parent links
- **Link Hover**: `#2196F3` (primary.main) - Link hover state
- **Border Default**: `#E0E0E0` (components.border.default) - Number indicator background
- **Focus**: `#64B5F6` (components.border.focus) - Focus outline

### Typography
- **Font size**: 14px (body2)
- **Font weight**: 400 (regular)
- **Font family**: Roboto

### Spacing
- **Item gap**: 4px (xs)
- **Separator margin**: 4px (xs) left/right

### Icons
- **Separator**: Material Icons `NavigateNext` (small size)

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `BreadcrumbItem[]` | required | Array of breadcrumb items |
| `showNumberIndicator` | `boolean` | `false` | Show numbered indicators |
| `separator` | `ReactNode` | `<NavigateNextIcon />` | Custom separator element |
| `maxItems` | `number` | - | Max items before collapsing |
| `ariaLabel` | `string` | `'breadcrumb'` | ARIA label for navigation |

### BreadcrumbItem Interface
```typescript
interface BreadcrumbItem {
  label: string;          // Display text
  href?: string;          // Navigation URL
  onClick?: (e) => void;  // Click handler
}
```

## Usage Examples

### Basic Breadcrumb
```tsx
<Breadcrumb
  items={[
    { label: 'Home', href: '/' },
    { label: 'Patients', href: '/patients' },
    { label: 'John Doe' }
  ]}
/>
```

### With Number Indicators
```tsx
<Breadcrumb
  items={[
    { label: 'Step 1', href: '/step-1' },
    { label: 'Step 2', href: '/step-2' },
    { label: 'Step 3' }
  ]}
  showNumberIndicator
/>
```

### With Click Handlers
```tsx
<Breadcrumb
  items={[
    { label: 'Dashboard', onClick: (e) => {
      e.preventDefault();
      navigate('/dashboard');
    }},
    { label: 'Settings', onClick: (e) => {
      e.preventDefault();
      navigate('/settings');
    }},
    { label: 'Profile' }
  ]}
/>
```

### With Max Items (Collapsed)
```tsx
<Breadcrumb
  items={longItemList}
  maxItems={4}
/>
```

### Custom Separator
```tsx
<Breadcrumb
  items={items}
  separator="/"
/>
```

## Accessibility
- Uses semantic `<nav>` element via MUI Breadcrumbs
- Proper ARIA labels for screen readers
- Keyboard navigable links (Tab, Enter)
- Focus indicators on interactive elements
- Current page is non-interactive text
- ARIA current="page" on last item

## Behavior

### Interactive States
1. **Default**: Links appear in secondary text color
2. **Hover**: Links change to primary color
3. **Focus**: 2px blue outline around link
4. **Current**: Last item is non-interactive, primary text color

### Number Indicators
- Circular badges with sequential numbers (1, 2, 3...)
- Background: `#E0E0E0`
- Text: `#757575`
- Size: 20px × 20px
- Font: 12px, medium weight

## Component States from Figma
1. `state=breadcrumb` (ID: 221:1128)
2. `state=Links` (ID: 3860:5890)

## Building Block States
1. `type=selected` (ID: 5847:85)
2. `type=default` (ID: 5847:87)

## Implementation Notes
- Built on MUI Breadcrumbs component
- All visual specs from design tokens
- Supports both href navigation and onClick handlers
- Number indicators optional per Figma boolean property
- Default separator is Material Icons chevron
- Last item always non-interactive (current page)
- Responsive: can collapse with maxItems prop
