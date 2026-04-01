/**
 * TRIO WFS Design System — Component Library
 *
 * Central export for all React components.
 * Import from here in consuming apps:
 *   import { Button, TextField, tokens } from '@trio-wfs/ui'
 *
 * Built on MUI v5, reskinned with TRIO WFS design tokens.
 * All components extracted from Figma file: PjAYuPDr8IA1ccwiAjFkSD
 */

// ─── Components ──────────────────────────────────────────────────────────────

export { Alert } from './Alert/Alert';
export { Autocomplete } from './Autocomplete/Autocomplete';
export { Breadcrumb } from './Breadcrumb/Breadcrumb';
export { Badge } from './Badge/Badge';
export { Button } from './Button/Button';
export { ButtonGroup } from './ButtonGroup/ButtonGroup';
export { ButtonIcon } from './ButtonIcon/ButtonIcon';
export { Checkbox } from './Checkbox/Checkbox';
export { Chip } from './Chip/Chip';
export { Menu } from './Menu/Menu';
export { NavigationVertical } from './NavigationVertical/NavigationVertical';
export { PageHeaderToolbar } from './PageHeaderToolbar/PageHeaderToolbar';
export { MetricCard } from './MetricCard/MetricCard';
export { Modal } from './Modal/Modal';
export { RadioGroup } from './RadioGroup/RadioGroup';
export { SearchBar } from './SearchBar/SearchBar';
export { Select } from './Select/Select';
export { SplitButton } from './SplitButton/SplitButton';
export { Stepper } from './Stepper/Stepper';
export { Switch } from './Switch/Switch';
export { Tabs } from './Tabs/Tabs';
export { TextField } from './TextField/TextField';
export { ToggleButton } from './ToggleButton/ToggleButton';
export { Tooltip } from './Tooltip/Tooltip';

// ─── Types ───────────────────────────────────────────────────────────────────

export type {
  BreadcrumbState,
  BreadcrumbLink,
  BreadcrumbProps,
} from './Breadcrumb/Breadcrumb.types';

export type {
  AlertVariant,
  AlertSeverity,
  AlertProps,
} from './Alert/Alert.types';

export type {
  AutocompleteState,
  AutocompleteMenu,
  AutocompleteType,
  AutocompleteOption,
  AutocompleteProps,
} from './Autocomplete/Autocomplete.types';

export type {
  ButtonSize,
  ButtonColor,
  ButtonState,
  ButtonVariant,
  ButtonProps,
} from './Button/Button.types';

export type {
  ButtonIconVariant,
  ButtonIconColor,
  ButtonIconSize,
  ButtonIconProps,
} from './ButtonIcon/ButtonIcon.types';

export type {
  ButtonGroupVariant,
  ButtonGroupSize,
  ButtonGroupColor,
  ButtonGroupOrientation,
  ButtonGroupProps,
} from './ButtonGroup/ButtonGroup.types';

export type {
  CheckboxColor,
  CheckboxProps,
} from './Checkbox/Checkbox.types';

export type {
  BadgeColor,
  BadgeType,
  BadgeProps,
} from './Badge/Badge.types';

export type {
  ChipSize,
  ChipColor,
  ChipVariant,
  ChipProps,
} from './Chip/Chip.types';

export type {
  PageHeaderToolbarVariant,
  PageHeaderToolbarProps,
} from './PageHeaderToolbar/PageHeaderToolbar.types';

export type {
  MenuState,
  MenuItemState,
  MenuItem,
  MenuProps,
} from './Menu/Menu.types';

export type {
  NavItem,
  NavSubItem,
  NavSettingsItem,
  NavigationVerticalProps,
} from './NavigationVertical/NavigationVertical.types';

export type {
  SemanticColor,
  MetricItem,
  MetricCardLayout,
  MetricCardFooter,
  MetricCardProps,
} from './MetricCard/MetricCard.types';

export type {
  ModalSize,
  ModalVariant,
  ModalProps,
} from './Modal/Modal.types';

export type {
  RadioGroupColor,
  RadioOption,
  RadioGroupProps,
} from './RadioGroup/RadioGroup.types';

export type {
  SelectState,
  SelectOption,
  SelectProps,
} from './Select/Select.types';

export type {
  SplitButtonColor,
  SplitButtonProps,
} from './SplitButton/SplitButton.types';

export type { StepperProps } from './Stepper/Stepper.types';

export type {
  SwitchState,
  SwitchLabelPlacement,
  SwitchProps,
} from './Switch/Switch.types';

export type {
  ToggleButtonSize,
  ToggleButtonItem,
  ToggleButtonProps,
} from './ToggleButton/ToggleButton.types';

export type {
  SearchBarSize,
  SearchBarType,
  SearchBarProps,
} from './SearchBar/SearchBar.types';

export type {
  TabsVariant,
  TabItem,
  TabsProps,
} from './Tabs/Tabs.types';

export type {
  TextFieldType,
  TextFieldState,
  TextFieldProps,
} from './TextField/TextField.types';

export type {
  TooltipPosition,
  TooltipProps,
} from './Tooltip/Tooltip.types';

// ─── Design Tokens ───────────────────────────────────────────────────────────

export { tokens } from '../design-tokens/tokens';
export type { Tokens } from '../design-tokens/tokens';
