import type { Meta, StoryObj } from '@storybook/react';
import { PageHeaderToolbar } from './PageHeaderToolbar';
import { Button } from '../Button/Button';
import { Chip } from '../Chip/Chip';
import { ButtonGroup } from '../ButtonGroup/ButtonGroup';
import { TextField } from '../TextField/TextField';
import { Breadcrumb } from '../Breadcrumb/Breadcrumb';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import StarBorderIcon from '@mui/icons-material/StarBorder';

/**
 * PageHeaderToolbar — the top-of-page toolbar.
 *
 * Slot semantics:
 * - `titleIcons`, `chips`, `singleButton`, `buttonGroup`, `inputTextField`,
 *   `breadcrumb` are CONTENT SLOTS (type `ReactNode`). Pass JSX to "turn on";
 *   omit (undefined) to "turn off."
 * - In Storybook, each slot is exposed as a BOOLEAN toggle for convenience.
 *   Toggling on supplies default placeholder content; toggling off passes
 *   undefined. This matches Figma's designer-side boolean toggle UX.
 */

// ── Default placeholder content for each slot ──
const placeholderTitleIcons = (
  <>
    <InfoOutlinedIcon fontSize="small" />
    <StarBorderIcon fontSize="small" />
  </>
);

const placeholderChips = (
  <>
    <Chip label="Urgent" color="error" size="small" />
    <Chip label="Filled 4/6" color="success" size="small" variant="outline" />
    <Chip label="On hold" color="warning" size="small" variant="outline" />
  </>
);

const placeholderSingleButton = (
  <Button variant="contained" color="primary">Action</Button>
);

const placeholderButtonGroup = (
  <ButtonGroup variant="contained" color="secondary" size="medium" orientation="horizontal" />
);

const placeholderInputTextField = (
  <TextField size="small" placeholder="Search…" />
);

const placeholderBreadcrumb = (
  <Breadcrumb
    state="breadcrumb"
    showNumberIndicator={true}
    recordCount="1,284"
    links={[
      { label: 'Parent', href: '#' },
      { label: 'Selected', selected: true },
    ]}
  />
);

// ── Meta ──
const meta: Meta<typeof PageHeaderToolbar> = {
  title: 'Components/PageHeaderToolbar',
  component: PageHeaderToolbar,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'full', 'NewCanvas'],
      description: 'Toolbar layout variant. `default` = title + buttons; `full` = adds chips/eyebrow/breadcrumb; `NewCanvas` = full without outer border.',
    },
    pageTitleText: {
      control: 'text',
      description: 'The page title (h6 typography).',
    },
    eyebrowText: {
      control: 'text',
      description: 'Optional support text rendered below the title.',
    },
    indicator: {
      control: 'text',
      description: 'Status indicator (left color bar). Pass a string for the label, or `true` for the default "Active" label. Omit to hide.',
    },

    // Slot toggles — Storybook maps boolean → placeholder JSX
    titleIcons: {
      control: 'boolean',
      description: 'Slot for small icons rendered inline next to the title. Toggle ON in Storybook to render placeholder icons.',
      mapping: { true: placeholderTitleIcons, false: undefined },
    },
    chips: {
      control: 'boolean',
      description: 'Slot for chip tags (full variant only). Toggle ON to render placeholder chips.',
      mapping: { true: placeholderChips, false: undefined },
    },
    singleButton: {
      control: 'boolean',
      description: 'Slot for a single primary action button on the right. Toggle ON to render a placeholder Button.',
      mapping: { true: placeholderSingleButton, false: undefined },
    },
    buttonGroup: {
      control: 'boolean',
      description: 'Slot for a ButtonGroup of secondary actions. Toggle ON to render a placeholder ButtonGroup.',
      mapping: { true: placeholderButtonGroup, false: undefined },
    },
    inputTextField: {
      control: 'boolean',
      description: 'Slot for a search/filter input on the right. Toggle ON to render a placeholder TextField.',
      mapping: { true: placeholderInputTextField, false: undefined },
    },
    breadcrumb: {
      control: 'boolean',
      description: 'Slot for the Breadcrumb strip below the title (full / NewCanvas variants only). Toggle ON to render a placeholder Breadcrumb.',
      mapping: { true: placeholderBreadcrumb, false: undefined },
    },
    scrollContainerRef: { table: { disable: true } },
  },
  args: {
    variant: 'default',
    pageTitleText: 'Order details',
    eyebrowText: undefined,
  },
  decorators: [
    (Story) => (
      <div style={{ width: 1040, background: '#F5F5F5', padding: 16 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof PageHeaderToolbar>;

// ── Stories ──

/**
 * Interactive playground — toggle each slot on/off in the Controls panel
 * to see how they combine. Mirrors the Figma designer experience.
 */
export const Playground: Story = {
  args: {
    variant: 'full',
    pageTitleText: 'Active orders',
    eyebrowText: 'Mercy Regional · ICU · Night shift',
    titleIcons: false,
    chips: true,
    singleButton: true,
    buttonGroup: false,
    inputTextField: false,
    breadcrumb: false,
    indicator: undefined,
  },
};

export const Default: Story = {
  args: {
    pageTitleText: 'Active orders',
    singleButton: true,
  },
};

export const WithEyebrow: Story = {
  args: {
    pageTitleText: 'Order #4820 — Mercy Regional ICU',
    eyebrowText: '3 submissions · 2 credentialed · filled 4 of 6',
    singleButton: true,
  },
};

export const Full: Story = {
  args: {
    variant: 'full',
    pageTitleText: 'Order #4820',
    eyebrowText: 'Mercy Regional · ICU · Night shift',
    chips: true,
    singleButton: true,
  },
};

export const WithIndicator: Story = {
  args: {
    pageTitleText: 'Mercy Regional Hospital',
    eyebrowText: 'ICU · Level 1 Trauma',
    indicator: 'LIVE',
    singleButton: true,
  },
};

export const WithBreadcrumb: Story = {
  args: {
    variant: 'full',
    pageTitleText: 'Orders',
    breadcrumb: true,
    singleButton: true,
  },
};
