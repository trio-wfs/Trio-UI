# Alert Component Specification

**Version:** 1.0.0  
**Status:** Production Ready  
**Last Updated:** 2026-02-16

---

## Overview

The Alert component displays brief, non-intrusive messages to users without interrupting their workflow. It follows Material Design principles and AHTG design system standards for desktop SaaS applications.

---

## Component API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'standard' \| 'contained' \| 'outline'` | `'standard'` | Visual style variant of the alert |
| `severity` | `'success' \| 'error' \| 'warning' \| 'info' \| 'default'` | `'default'` | Severity level determining color theme and icon |
| `title` | `string` | `undefined` | Optional title text displayed above message |
| `children` | `React.ReactNode` | **required** | Main alert message/description content |
| `onClose` | `() => void` | `undefined` | Callback fired when close button is clicked; enables close button |
| `action` | `React.ReactNode` | `undefined` | Custom action button or element |
| `icon` | `React.ReactNode` | `undefined` | Custom icon (overrides default severity icon) |
| `hideIcon` | `boolean` | `false` | Hides the icon when true |
| `className` | `string` | `''` | Additional CSS class names |
| `style` | `React.CSSProperties` | `undefined` | Additional inline styles |
| `ref` | `React.Ref<HTMLDivElement>` | - | Forward ref to the root element |

---

## Design Tokens

### Color Palette

#### Success
- **Main:** `#4CAF50`
- **Light:** `#E8F5E9`
- **Contrast Text:** `#1E4620`

#### Error
- **Main:** `#DB4537`
- **Light:** `#FBEAED`
- **Contrast Text:** `#611A15`

#### Warning
- **Main:** `#E17109`
- **Light:** `#FCF1E0`
- **Contrast Text:** `#663C00`

#### Info
- **Main:** `#5BBFDE`
- **Light:** `#E4F7FD`
- **Contrast Text:** `#014361`

#### Default
- **Main:** `#616161`
- **Light:** `#F5F5F5`
- **Contrast Text:** `#212121`

### Spacing
- **Small:** `8px`
- **Medium:** `12px` (default padding, content gap)
- **Large:** `16px` (horizontal padding)

### Typography
- **Title:** 14px / 20px line-height, 500 weight, 0px letter-spacing
- **Body:** 14px / 20px line-height, 400 weight, 0px letter-spacing
- **Font Family:** Roboto, sans-serif

### Sizing
- **Border Radius:** `4px`
- **Icon Size:** `24px`
- **Close Icon Size:** `20px`

---

## Variants

### 1. Standard (Default)
Light background with colored icon and text.

**Characteristics:**
- Background: Severity light color
- Text: Severity contrast text color
- Icon: Severity main color
- Border: None

**Best for:** General informational messages, typical use cases

---

### 2. Contained
Full-color background with white text and icon.

**Characteristics:**
- Background: Severity main color
- Text: White (`#ffffff`)
- Icon: White (`#ffffff`)
- Border: None

**Best for:** High-priority messages requiring immediate attention

---

### 3. Outline
Transparent background with colored border.

**Characteristics:**
- Background: Transparent
- Text: Severity contrast text color
- Icon: Severity main color
- Border: 1px solid severity main color

**Best for:** Subtle notifications, non-intrusive messages

---

## Severity Levels

### Success
- **Purpose:** Confirm successful operations or positive outcomes
- **Icon:** Check circle
- **Example:** "Operation completed successfully"

### Error
- **Purpose:** Alert users to errors or critical issues
- **Icon:** Error circle
- **Example:** "Failed to save changes. Please try again."

### Warning
- **Purpose:** Caution users about potential issues
- **Icon:** Warning triangle
- **Example:** "This action cannot be undone"

### Info
- **Purpose:** Provide informational or neutral messages
- **Icon:** Info circle
- **Example:** "New features are now available"

### Default
- **Purpose:** General-purpose messages without specific semantic meaning
- **Icon:** Info circle
- **Example:** "Updates are scheduled for tonight"

---

## States

### Default State
Normal appearance as defined by variant and severity combination.

### Hover State (Close Button)
- Close button opacity increases from `0.7` to `1.0`
- Smooth transition: `0.2s ease-in-out`

### Focus State (Close Button)
- 2px outline in severity main color
- 2px outline offset for clear visibility
- Keyboard navigation accessible

### With Title
- Title appears above message content
- 8px vertical gap between title and message
- Title has medium font weight (500)

### With Actions
- Actions appear to the right of content
- Custom action buttons can be provided
- Close button appears after custom actions

---

## Accessibility

### ARIA Attributes
- `role="alert"` on root element for screen reader announcements
- `aria-label="Close alert"` on close button

### Keyboard Navigation
- Close button is focusable and keyboard-operable
- Clear focus indicator with 2px outline

### Color Contrast
All text/icon combinations meet WCAG AA standards:
- Standard variant: High contrast between light background and contrast text
- Contained variant: White text on colored backgrounds (tested)
- Outline variant: High contrast with transparent background

### Screen Reader Support
- Alert role ensures immediate announcement
- Semantic HTML structure
- Clear labeling of interactive elements

---

## Usage Examples

### Basic Alert
```tsx
<Alert severity="success">
  Operation completed successfully
</Alert>
```

### Alert with Title
```tsx
<Alert severity="error" title="Error">
  Failed to save changes. Please try again.
</Alert>
```

### Dismissible Alert
```tsx
<Alert 
  severity="warning" 
  onClose={() => handleClose()}
>
  This action cannot be undone
</Alert>
```

### Outlined Info Alert
```tsx
<Alert severity="info" variant="outline">
  New features are now available in the latest release.
</Alert>
```

### Contained High-Priority Alert
```tsx
<Alert severity="error" variant="contained">
  Critical system error detected. Please contact support.
</Alert>
```

### Alert with Custom Action
```tsx
<Alert 
  severity="warning" 
  title="Unsaved Changes"
  action={
    <button onClick={handleSave} style={{...buttonStyles}}>
      Save Now
    </button>
  }
>
  You have unsaved changes that will be lost.
</Alert>
```

### Alert with Custom Icon
```tsx
<Alert 
  severity="info" 
  icon={<CustomNotificationIcon />}
>
  You have 3 new notifications
</Alert>
```

### Alert Without Icon
```tsx
<Alert severity="default" hideIcon>
  This is a plain text message without an icon.
</Alert>
```

---

## Content Guidelines

### Title
- Keep short and descriptive (2-5 words)
- Use sentence case
- Clearly indicate the message type
- Optional but recommended for complex messages

### Message
- Be concise and actionable
- Use clear, direct language
- Avoid jargon and technical terms when possible
- Provide next steps when appropriate

### Actions
- Limit to 1-2 actions maximum
- Use clear action verbs
- Primary action should solve or address the alert
- Dismissal via close button is separate from actions

---

## Design System Compliance

### ✅ Follows AHTG Standards
- Desktop SaaS optimized (no responsive breakpoints)
- Uses Roboto typography
- 8px spacing system (12px = 8 + 4, 16px = 8 × 2)
- Material Icons for severity icons
- 4px border radius standard
- Semantic color system

### Integration
- Works with AG Grid notifications
- Compatible with modal dialogs
- Stackable for multiple alerts
- No conflicts with primary button colors

---

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

---

## Related Components

- **Snackbar:** For temporary, auto-dismissing notifications
- **Toast:** For ephemeral success/error messages
- **Banner:** For persistent page-level announcements
- **Modal Dialog:** For blocking messages requiring user action

---

## Change Log

### v1.0.0 (2026-02-16)
- Initial production release
- Three variants: standard, contained, outline
- Five severity levels: success, error, warning, info, default
- Full accessibility support
- Design token integration
- Comprehensive prop API
