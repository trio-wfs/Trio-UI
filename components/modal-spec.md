# Modal Component Specification

## Figma Reference
- **Modal Header ID**: `2385:10564`
- **Modal Tool Bar ID**: `2385:10589`
- **Path**: `Document / Modal / Modal`
- **File**: Desktop Design System–(Atomic UI Components)

## Overview
Modal dialog component for displaying focused content and actions that require user interaction. Includes header with title and close button, optional toolbar, content area, and action buttons.

## Components

### Modal Header
- **Dialog Header**: Modal (default variant)
- **Property 2**: Modal Header (default)
- **Property 3**: Large (900) - size variant

### Modal Tool Bar
- **Tool Bar**: Large (900) - size variant
- **Secondary Primary**: Boolean toggle for showing primary/secondary actions

## Design Tokens Used

### Colors
- **Background Paper**: `#FFFFFF` (background.paper) - Modal background
- **Background Secondary**: `#FAFAFA` (background.secondary) - Toolbar background
- **Text Primary**: `#212121` (text.primary) - Title and content
- **Text Secondary**: `#757575` (text.secondary) - Close button
- **Border**: `#E0E0E0` (components.border.default) - Dividers
- **Backdrop**: `rgba(0, 0, 0, 0.5)` (components.backdrop.fill) - Overlay

### Typography
- **Title**: 20px (h6), weight 500 (medium)
- **Content**: 14px (body2), weight 400 (regular)
- **Buttons**: 14px (body2), weight 400 (regular)

### Spacing
- **Header padding**: 24px (lg)
- **Content padding**: 24px (lg)
- **Actions padding**: 16px (md) vertical, 24px (lg) horizontal
- **Toolbar padding**: 16px (md) vertical, 24px (lg) horizontal
- **Button gap**: 8px (sm)
- **Button padding**: 8px (sm) vertical, 16px (md) horizontal

### Effects
- **Shadow**: 0 8px 16px rgba(0, 0, 0, 0.15)
- **Border radius**: 8px

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | required | Modal open state |
| `onClose` | `() => void` | - | Close handler |
| `title` | `string` | - | Modal header title |
| `children` | `ReactNode` | required | Modal content |
| `primaryAction` | `ModalAction` | - | Primary action button |
| `secondaryAction` | `ModalAction` | - | Secondary action button |
| `toolbarActions` | `ModalAction[]` | - | Toolbar action buttons |
| `showCloseButton` | `boolean` | `true` | Show X button in header |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Modal width |
| `fullWidth` | `boolean` | `true` | Use full available width |
| `disableBackdropClick` | `boolean` | `false` | Prevent close on backdrop click |
| `disableEscapeKeyDown` | `boolean` | `false` | Prevent close on Escape key |

### ModalAction Interface
```typescript
interface ModalAction {
  label: string;                                    // Button text
  onClick: () => void;                              // Click handler
  variant?: 'text' | 'outlined' | 'contained';     // Button style
  color?: 'primary' | 'secondary' | 'error' | 'success'; // Button color
  disabled?: boolean;                               // Disabled state
  loading?: boolean;                                // Loading state
}
```

## Usage Examples

### Basic Modal
```tsx
<Modal
  open={isOpen}
  onClose={handleClose}
  title="Confirm Action"
  primaryAction={{
    label: 'Confirm',
    onClick: handleConfirm,
    variant: 'contained',
    color: 'primary'
  }}
  secondaryAction={{
    label: 'Cancel',
    onClick: handleClose,
    variant: 'outlined'
  }}
>
  <p>Are you sure you want to proceed?</p>
</Modal>
```

### Large Modal with Form
```tsx
<Modal
  open={isOpen}
  onClose={handleClose}
  title="Edit Patient Information"
  size="lg"
  primaryAction={{
    label: 'Save Changes',
    onClick: handleSave,
    variant: 'contained',
    color: 'primary',
    disabled: !isValid
  }}
  secondaryAction={{
    label: 'Cancel',
    onClick: handleClose,
    variant: 'text'
  }}
>
  <PatientForm />
</Modal>
```

### Modal with Toolbar Actions
```tsx
<Modal
  open={isOpen}
  onClose={handleClose}
  title="Document Viewer"
  size="xl"
  toolbarActions={[
    {
      label: 'Download',
      onClick: handleDownload,
      variant: 'outlined'
    },
    {
      label: 'Print',
      onClick: handlePrint,
      variant: 'outlined'
    },
    {
      label: 'Share',
      onClick: handleShare,
      variant: 'outlined'
    }
  ]}
  primaryAction={{
    label: 'Close',
    onClick: handleClose,
    variant: 'contained'
  }}
>
  <DocumentViewer />
</Modal>
```

### Confirmation Modal (No Close on Backdrop)
```tsx
<Modal
  open={isOpen}
  onClose={handleClose}
  title="Delete Patient Record"
  disableBackdropClick
  disableEscapeKeyDown
  primaryAction={{
    label: 'Delete',
    onClick: handleDelete,
    variant: 'contained',
    color: 'error'
  }}
  secondaryAction={{
    label: 'Cancel',
    onClick: handleClose,
    variant: 'outlined'
  }}
>
  <p>This action cannot be undone. Are you sure?</p>
</Modal>
```

### Modal without Header
```tsx
<Modal
  open={isOpen}
  onClose={handleClose}
  showCloseButton={false}
  primaryAction={{
    label: 'OK',
    onClick: handleClose,
    variant: 'contained'
  }}
>
  <Box sx={{ textAlign: 'center', py: 2 }}>
    <SuccessIcon />
    <Typography variant="h6">Operation Successful</Typography>
  </Box>
</Modal>
```

## Accessibility
- Uses semantic ARIA roles (`dialog`, `alertdialog`)
- Traps focus within modal when open
- Focus returns to trigger element on close
- Escape key closes modal (unless disabled)
- Close button has `aria-label="close"`
- Proper heading hierarchy in content
- Backdrop prevents interaction with underlying page

## Behavior

### Modal Sizes
- **sm**: 600px max width - Simple confirmations
- **md**: 900px max width - Standard forms (default)
- **lg**: 1200px max width - Complex forms
- **xl**: 1536px max width - Full-featured interfaces

### Header
- Displays title text
- Close button (X) aligned right
- Fixed at top, scrolls with content if needed
- 1px bottom border separator

### Toolbar (Optional)
- Appears below header if `toolbarActions` provided
- Light gray background to differentiate
- Horizontal button group
- Action buttons use outlined variant by default

### Content Area
- White background
- Scrollable if content exceeds viewport
- Padding on all sides

### Actions Footer
- Fixed at bottom
- Primary action button (right side)
- Secondary action button (left side)
- 1px top border separator
- Buttons right-aligned

### Backdrop
- Semi-transparent black overlay (50% opacity)
- Clicking backdrop closes modal (unless disabled)
- Prevents interaction with page content

## Component States from Figma

### Modal Header
- `Dialog Header=Modal, Property 2=Modal Header, Property 3=Large (900)` (ID: 2385:10581)

### Modal Tool Bar
- `Tool Bar=Large (900)` (ID: 2385:10455)
- **Secondary Primary**: Boolean property for action type

## Implementation Notes
- Built on MUI Dialog component
- All visual specs from design tokens
- Supports controlled open/close state
- Optional toolbar for additional actions
- Flexible action button configuration
- Backdrop click and ESC key can be disabled
- Focus management handled by MUI
- Responsive sizing with predefined breakpoints
- Proper stacking context (z-index)
- Smooth enter/exit animations
