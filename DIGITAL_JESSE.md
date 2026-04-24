# Digital Jesse
> The design mind behind TRIO WFS — encoded for anyone building UI.

This document captures the design philosophy, brand voice, and visual thinking behind TRIO WFS. It exists so that **engineers, product owners, and AI tools** can produce UI that looks and feels like it was designed by Jesse — not like a generic React app with MUI defaults.

Read this first. Then read the token files and rules. This is the *why*. Those are the *what*.

---

## Brand Personality

**Clean. Clinical. Systematic. Evolving.**

TRIO is a healthcare VMS used by people who live in it every day. It handles high-stakes workflows — wrong worker in the wrong role is a patient safety risk. The UI respects that gravity.

But clinical doesn't mean cold. TRIO is evolving from a sterile, utilitarian tool toward something that still feels serious and trustworthy, but also **considered** — where the simplicity itself is the delight, where micro-interactions feel intentional, and where the system pushes information to you instead of making you dig for it.

Think of it this way: TRIO should feel like a well-organized hospital — everything where you expect it, nothing wasted, but someone clearly thought about the people who work here.

---

## Design Philosophy

### Simplicity around complexity

TRIO manages dense, interconnected data — shifts, workers, credentials, timecards, invoices. The job of the design is not to hide that complexity but to **organize it so well that it doesn't feel complex**. Ramp does this for finance. TRIO does this for healthcare staffing.

### Systematic over clever

If something can be explained systematically — with a clear pattern the user can learn once and apply everywhere — do that instead of inventing something novel. Users find a way to do something and stick with it. Respect that. Consistency is more valuable than innovation in individual screens.

### Don't Frankenstein it

Sometimes constraints mean working within existing patterns even when a better approach exists. That's fine — **match the pattern around you**. What's not fine is bolting a new interaction model onto a page that uses a different one. If the page is a grid-and-drilldown page, make your addition a grid-and-drilldown addition. A coherent page with an older pattern is always better than a page with two competing patterns.

### Micro-interactions as delight

TRIO's delight isn't illustrations, animations, or playful copy. It's the **small things done well** — a smooth panel slide, an instant filter response, a well-timed loading state, the satisfaction of a bulk action completing cleanly. The UI gets out of the way and the work itself feels good.

---

## Brand Voice — How TRIO Speaks

### Personality: Courteous but direct

TRIO talks like a competent colleague — not a robot, not a chatbot, not a help desk. It gives you the answer. No fluff, no filler, no exclamation points.

### Tone principles

| Principle | Do | Don't |
|-----------|-----|-------|
| **Direct** | "Shift submitted. Agency notified." | "Great job! Your shift has been successfully submitted!" |
| **Systematic** | "2 credentials missing: RN License, BLS." | "Oops! Something went wrong with your submission." |
| **Courteous** | "This worker's credentials expire in 7 days." | "WARNING: Credential expiration imminent!" |
| **Informative** | "No shifts match your filters. Try adjusting the date range." | "No results found." |
| **Calm** | "Unable to save — connection interrupted. Your changes are preserved." | "ERROR: Save failed! Please try again immediately!" |

### By context

| Context | Voice |
|---------|-------|
| **Confirmations** | State what happened and what comes next. One sentence. |
| **Errors** | Say what went wrong and what to do about it. Be specific. |
| **Empty states** | Explain why it's empty and suggest an action. No sad illustrations. |
| **Tooltips** | One sentence max. Explain what this thing does, not how to use it. |
| **Destructive actions** | Be clear about what will happen. "This will remove 3 workers from the shift. This can't be undone." |
| **Loading / Progress** | If it takes more than 2 seconds, say what's happening. "Loading credentials..." not a spinner alone. |

### What TRIO never sounds like

- **Marketing copy** — no "supercharge your workflow" or "unlock the power of"
- **Overly casual** — no "oops", "uh oh", "hang tight"
- **Vague** — never "something went wrong" without saying what
- **Patronizing** — no "did you know?" tooltips or onboarding hand-holding

---

## The TRIO Layout — How It Works Today

TRIO follows a consistent layout pattern across the platform. Same tokens, same components, same structure.

- **Pattern:** AG Grid tables, page-level drilldowns, structured layouts
- **Structure:** Header > content wrapper (#FAFAFA) > cards/panels with borders (#FFFFFF)
- **Spacing:** 16px padding between containers, clear separation between content areas
- **Navigation:** Sidebar + page drilldowns — click a row, go to a detail page
- **Responsive:** Scales to screen width, but layouts are fundamentally fixed columns and grids
- **Feel:** Organized, dense, systematic — everything labeled and in its place

When building in TRIO, **match the patterns around you.** If the module uses grid tables and detail pages, your addition uses grid tables and detail pages. Consistency across the product is more important than any one page being innovative.

### Digital Workers — An Experiment

Digital Workers is exploring a different layout approach within TRIO. It is **not** the new standard — it's a test.

- Application-style layout with collapsible/expandable panels
- Edge-to-edge content, reduced padding, less chrome
- Panels slide and layer — drill-through content stays in context instead of navigating to a new page
- Inspired by modern app shells (Claude Desktop, V0) applied to VMS workflows

Some of these ideas may influence TRIO's future direction. Some may not. Until they're proven and adopted as a pattern, they live only in Digital Workers.

**Default assumption:** Build to Classic TRIO patterns unless Jesse specifically says otherwise.

---

## Page Composition — How Pages Are Assembled

TRIO pages are built from nested components and containers. These are not fixed templates — the building blocks get assembled per use case. But the composition rules are consistent.

### Header + Tabs Relationship

When a page has **both** a breadcrumb header and a tab row, they are separate components with visual separation between them. The breadcrumb/title sits in the header toolbar area. The tabs sit below on the content wrapper. They do not stack directly on top of each other without spacing.

When a page has **only** tabs (no breadcrumb), the tabs sit directly at the top of the content area on the #FAFAFA wrapper.

### Common Detail Page Pattern

Most detail pages use a multi-column layout within the #FAFAFA wrapper:

- **Left rail** — Identity/summary card. Key-value pairs stacked vertically in a paper container. Content varies by entity (person, job, facility).
- **Center column** — Main content. Descriptions, grouped data sections, nested containers. This is where the content density lives.
- **Right rail** — Contextual info. Relationship teams, shift details, background checks, bill rates. Quick-reference data that supports the center content.

This is a common pattern, not a mandatory one. The column arrangement depends on what the entity needs. Some pages are single-column. Some use two columns. Adapt to the use case.

### Center Column — Grouping Content

Within the center column, related data groups into bordered paper containers:
- A container might hold certification + license info together
- Another container holds profession/specialty/experience as a row group
- Sub-groups within a container use internal borders (#E0E0E0) to separate rows — not nested cards

This is the "related components grouped in a container" pattern — the container signals these fields are connected.

### Grid Tab Pages

When a tab shows tabular data:
- Section title (Subtitle1) sits above the grid, directly on the wrapper or inside a paper container
- AG Grid fills the available width
- Filters live in the grid header row
- Multiple grids can stack vertically on one tab (e.g., "Pre Compliance" grid, then "Documents" grid below it)
- Status chips in grid columns use **outlined semantic** variants (multiple statuses visible at once)

### Tab Overflow

When tabs exceed available width, the tab component has a built-in variant with scroll arrows. Use that variant — never wrap tabs to a second line, never truncate tab labels, never hide tabs in a dropdown.

### Loading States

- **Spinners only.** No skeleton loading screens.
- If loading takes more than 2 seconds, pair the spinner with a text label ("Loading credentials...")

### Forms

Most forms live in **modals**, not on their own page. Follow the modal size rules (900px for complex forms, 500px for simple ones). If a form is too complex for a 900px modal, that's a signal to break it into steps — not to make the modal bigger.

### Edit & Delete Affordances

- **Pencil icon** — standard edit trigger. Used on grid rows and inline edit actions.
- **Trashcan icon** — standard remove/delete trigger.
- **Grid row editing** — always opens a modal. Do not inline-edit within the grid.
- **Detail page editing** — typically via modal, but depends on context. Default to modal unless Jesse says otherwise.

### Callout / Alert Containers

When content needs semantic emphasis (critical requirements, compliance warnings, important instructions), wrap it in a container with a **full border using the info color** (`info.main`). This is not a left-accent-only treatment — it's a full border around the container.

Use this sparingly — it's for content the user must not miss, not for general highlighting.

### Long Text Truncation

When a text block needs to be space-constrained, truncate and show a **"Show More" link** styled in primary blue. The number of visible lines depends on the context — there is no fixed line count. Use judgment based on the container size and how much surrounding content needs to share the space.

### Data Display Formatting

| Data type | Format | Example |
|-----------|--------|---------|
| Dates | MM/DD/YYYY | 04/02/2024 |
| Currency | $X,XXX.XX | $800.00 |
| Phone | (XXX) XXX-XXXX | (215) 555-1212 |
| Links/clickable text | Primary blue (#2196F3) | Email addresses, IDs that navigate, any text that triggers an action |

### Key-Value Pair Display

The standard read-only data pattern across detail pages:
- **Label:** Caption (12px), text.secondary — left-aligned
- **Value:** Body2 (14px), text.primary — right-aligned
- Rows separated by horizontal border (#E0E0E0)
- This pattern is the same regardless of context — detail cards, info panels, summary rails all use it

---

## Pattern Rules — Component Usage

These are the component-level decisions that make TRIO look like TRIO. Follow these before making judgment calls.

### Backgrounds & Containers

**The three backgrounds and when to use each:**

| Background | Token | Hex | When to use |
|-----------|-------|-----|-------------|
| Page canvas | `background.default` | `#F5F5F5` | The outermost page background only. Nothing else uses this. |
| Content wrapper | `background.secondary` | `#FAFAFA` | The single wrapper that fills the page below the header. All page content sits inside this. |
| Surfaces | `background.paper` | `#FFFFFF` | Every card, panel, container, and component surface. Always with `1px solid #E0E0E0` border. |

**Container rules:**

- Content sections within the wrapper get their own paper (#FFFFFF) card with a border
- If two subsections are stacked vertically and are peers, a horizontal rule (`<hr>`, `#E0E0E0`) between them is sufficient — no need for separate containers
- If 3+ related components influence each other (e.g., form fields where selecting one changes another's options), wrap them in a bordered paper container to signal the relationship. No label needed on the group — the container itself communicates "these are connected"
- When a user is building a collection or group from selections, that assembled group becomes a container

**Nested paper:**

Paper can nest inside paper. Example: a left-rail panel sits on the #FAFAFA wrapper with a paper background. Inside that panel, individual cards or list items each have their own paper background and border. The nesting is: wrapper (#FAFAFA) > panel (#FFFFFF + border) > cards (#FFFFFF + border).

### Page Header Toolbar

**Two modes:**

| Mode | Background | Border | Padding | When to use |
|------|-----------|--------|---------|-------------|
| **Standard** | Paper (#FFFFFF) | 1px solid #E0E0E0 | 16px | Most existing TRIO pages |
| **Simplified** | Transparent (sits on #FAFAFA wrapper) | None | No 16px padding | Newer pages (Programs, Agency Performance) — header sits directly on the wrapper |

The simplified header still contains buttons, grouped buttons, chips, and other toolbar elements. It just drops the card container. This is the direction for newer pages.

**Header elements that can be toggled on/off:**
- Breadcrumb
- Eyebrow text (caption, text.secondary)
- Page title (H6)
- Tags
- Tab row
- Action buttons / button groups (right-aligned)

Features like filters, chips, and action buttons can live in the header toolbar. Section-specific controls live inside their own paper container within the content area.

### Breadcrumbs

Breadcrumbs are used for navigating back to the place where the user initiated their journey — not as a full site map. A user can reach the same page from multiple paths, so the breadcrumb reflects *their* path, not the page's position in a hierarchy.

- **Depth:** Typically 2-3 levels. Example: `Jobs / Job 32846` or `Programs / Agency Performance / Detail`
- **Format:** `[Origin module] / [Entity or page]` — linked segments except the current page
- **Placement:** Inside the header toolbar, above the page title. When breadcrumbs and tabs are both present, the breadcrumb header and tab row are separate components with spacing between them — they never stack directly against each other.

### Typography Hierarchy

| Level | Style | Weight | Color | Example |
|-------|-------|--------|-------|---------|
| Page title | H6 (20px) | Medium (500) | text.primary | "Shift Management" |
| Page section heading | Subtitle1 (16px) | Medium (500) | text.primary | Major content area within the page |
| Container/subsection heading | Subtitle2 (14px) | Medium (500) | text.primary | Heading inside a paper card |
| Body content, grid cells, lists | Body2 (14px) | Regular (400) | text.primary | Most actual data and content |
| Sub-subheader, eyebrow, labels | Caption (12px) | Regular (400) | text.secondary | Supporting copy below a subtitle, explainer text, instructional text |
| Component labels, tiny callouts | Overline (11px) | Medium (500) | text.secondary | Badge-like labels, similar function to a chip |

**Key rules:**
- Headers and subtitles always use `text.primary` (#212121)
- Supporting copy — eyebrows, labels, instructions, captions — always use `text.secondary` (#757575)
- Caption is the workhorse for secondary information: eyebrow text, explainer text below headers, instructional copy, sub-subheaders within sections
- Overline is reserved for component-level labeling — tiny, structured callouts similar in function to a chip
- Max heading level on any page is H5 (24px). Most pages use H6 (20px) for the page title.
- No font weights above 500 (Medium). Bold (700) is not used in TRIO.
- No uppercase text except overline labels where explicitly called for in Figma

### Chip Usage Rules

Chips serve different functions depending on their variant. The wrong chip in the wrong context is one of the most common mistakes.

**Filled chips:**

| Variant | When to use |
|---------|-------------|
| Filled semantic (success/error/warning) | Single prominent status on a page that needs emphasis — "Failed", "Active", "Warning". Use sparingly. One per view, like a primary CTA. |
| Filled default | Basic chip indicators. Non-interactive labels. |
| Filled default with remove button | The standard removal chip. Use inside multi-select dropdowns and when displaying removable selections on the page. |

**Outlined chips:**

| Variant | When to use |
|---------|-------------|
| Outlined semantic (success/error/warning) | Multiple statuses in a list or grid — where several chips with different states appear together. Less prominent than filled. This is the standard for status columns in AG Grid. |
| Outlined default | Interactive chips. Filter chips use the default variant with primary color for the selected state. |
| Outlined with arrow | Secondary dropdown trigger. Use as a compact alternative to a select. |

**Decision rule:** If there's one status badge and it needs to stand out from content → filled. If there are multiple statuses visible at once (grid column, list of items) → outlined. If it's interactive (filtering, selecting, removing) → default variant with appropriate interaction states.

### AG Grid Rules

Every data table in TRIO uses AG Grid. No exceptions.

| Property | Value |
|----------|-------|
| Row height | 42px — always |
| Zebra striping | Always on |
| Vertical borders | Always on, `#E0E0E0` |
| Horizontal borders | Always on, `#E0E0E0` |
| Header row background | Paper (#FFFFFF) |
| Header row text | Body2 (14px), Regular (400) — same as data rows |
| Horizontal scroll | Enabled when columns exceed container width |
| Shadows | Never on the grid container |

**Empty state:** Display "No rows to display" centered in the empty grid area. No icons, no illustrations, no action buttons — just the message.

**Scrolling:** Infinite scroll / AG Grid load-more. No pagination controls. The grid loads more rows as the user scrolls.

**Column filters:** Search inputs live under each column header in the filter row. Even columns that don't support search still display the filter input — just disabled. This keeps the filter row visually consistent across all columns.

**Responsive behavior:** Grids are built for 1440px minimum viewport. Below 1440px is considered a compromised view — acceptable but not the design target. Columns should be sized to work well at 1440px, with horizontal scroll as the fallback for dense data.

**Grid container:** The grid sits inside a paper (#FFFFFF) container with a border. The grid itself fills the container — no internal padding between the grid edges and the container border.

### Modal & Drawer Rules

| Component | Size | When to use |
|-----------|------|-------------|
| Modal (large) | 900px | Complex forms, multi-step flows, data-heavy content |
| Modal (small) | 500px | Confirmations, simple single-action dialogs |
| Drawer | 400px fixed | Detail panels, secondary information, editing side content |

**Modal vs. drawer decision:** Modals interrupt the workflow — use when the user must complete or dismiss before continuing. Drawers supplement the workflow — use when the user needs to reference or edit side information while keeping the main view visible.

### Button & Action Rules

- **Primary blue (#2196F3):** Save and Update actions only. This is the highest-emphasis action on the page.
- **Secondary buttons:** For cancel, back, and lower-priority actions
- **Error/destructive (#DB4537):** Delete, remove, reject actions
- **Button groups:** Use when multiple related actions exist in the same toolbar area (e.g., Save + Save & Close)
- Right-align action buttons in the header toolbar
- Don't disable buttons without explaining why — use a tooltip on the disabled button if the reason isn't obvious

### Spacing Rules

All spacing follows the 8pt grid. These are the only values allowed:

| Token | Value | Common use |
|-------|-------|-----------|
| xs | 4px | Tight inline gaps (icon to label, badge padding) |
| sm | 8px | Component internal spacing (padding inside chips, between stacked labels) |
| mid | 12px | Mid-tier gaps |
| md | 16px | Standard spacing — container padding, space between sibling components |
| lg | 24px | Section spacing within a page area |
| xl | 32px | Large layout gaps |
| xxl | 40px | Page-level section breaks |

**16px (md) is the default.** When unsure, use 16px. It's the container padding, the gutter width, and the general-purpose spacer.

### Border & Elevation Rules

- **All paper surfaces:** `1px solid #E0E0E0` border. No exceptions for cards, containers, or panels.
- **Dividers between sections:** `#E0E0E0` horizontal rule
- **Border radius:** 4px standard on all containers and inputs. 999px only for pills (chips, badges, step circles).
- **Shadows:** Only on floating/overlay elements — modals, menus, popovers, dropdowns. **Never** on cards, panels, or any surface in the page layout.

### Responsive & Viewport Rules

- **Design target:** 1440px viewport width
- **Optimal experience:** 1724px — designs should hold up here
- **Below 1440px:** Compromised view. Acceptable but not the priority. Horizontal scroll on grids is expected.
- **Mobile:** Not considered unless explicitly asked. TRIO is desktop-first, always.
- **Grid layout:** 12-column, 16px gutters. Use MUI `Grid` or `Box` with flex. No CSS Grid unless there's a specific reason.

---

## Users — Who You're Designing For

### The primary user

A **staffing coordinator or facility manager** who lives in TRIO 8+ hours a day. They're smart, experienced, and have their own way of doing things. They are not tech-savvy or particularly curious about features — they found a workflow that works and they'll use it until someone shows them a better one.

They don't explore the UI. They don't read changelogs. They don't click on things to see what happens. They want to post shifts, review submissions, verify credentials, and approve timecards. Speed and clarity matter more than anything.

### What this means for design

- **Predictability over novelty.** If every list page works the same way, they learn one pattern and apply it everywhere.
- **Density is fine.** These users read data tables all day. Don't over-simplify — just organize well.
- **Status at a glance.** Filled/unfilled, pending/approved/rejected — this must be instantly scannable without reading text.
- **Don't hide things.** Features that are buried don't exist. If it matters, it's visible.
- **Don't block them.** Unnecessary confirmations, extra clicks, and modal interruptions for non-destructive actions are friction in a fast-paced clinical environment.

---

## Visual Reference Points

| Reference | What to take from it |
|-----------|---------------------|
| **Ramp** | The primary reference. Density done well. Complex financial data that feels simple. Clean micro-interactions. The feeling that the people who built it actually use tools like this. |
| **Claude Desktop / V0** | Relevant to Digital Workers specifically — application-shell layouts, responsive panels, content-first. Not a reference for Classic TRIO patterns. |

| Anti-reference | What to avoid |
|----------------|---------------|
| **Generic MUI apps** | Default Material Design with no personality. Blue buttons and card shadows everywhere. |
| **Over-designed dashboards** | Dribbble-style UIs that look good in screenshots but are unusable with real data. |
| **Frankenstein enterprise tools** | Features bolted on over years with no coherent layout strategy. Inconsistent patterns page-to-page. |

---

## The Token & Rules Layer

This document is the philosophy. The rules and tokens are in separate files — always reference them for implementation:

| File | What it contains |
|------|-----------------|
| `design-system.md` | Every color, spacing, radius, and typography token. The definitive values. |
| `PAGE_ARCHITECTURE.md` | Page layer order, elevation rules, header variants, background hierarchy. |
| `COMPONENT_TEMPLATE.md` | How to build a new component end-to-end from Figma to code. |
| `COMPONENT_COVERAGE.md` | Current migration status of all 24 live components. |
| `design-tokens/tokens.ts` | Programmatic token exports for React/TypeScript. |
| `design-tokens/theme.ts` | MUI theme configuration with all overrides. |
| `figma-component-manifest.json` | Component registry with Figma node IDs. |

### The non-negotiables (quick reference)

- **Font:** Roboto. No exceptions.
- **Primary blue (#2196F3):** Save/Update actions only. Not navigation, not decoration.
- **Backgrounds:** #F5F5F5 page / #FAFAFA content wrapper / #FFFFFF surfaces
- **Borders:** 1px solid #E0E0E0. No shadows on cards.
- **Spacing:** 4/8/12/16/24/32/40px only. 8pt grid.
- **Border radius:** 4px standard, 999px pill. Nothing else.
- **Data tables:** AG Grid. Never MUI X DataGrid.
- **Icons:** @mui/icons-material only.
- **Desktop-first.** Always.

---

## How to Use This Document

**If you're an engineer:** Read this before building a new page or feature. It will save Jesse a round of review. Follow the token files for exact values, but use this document to make judgment calls about layout, density, and tone.

**If you're a product owner:** Use this to evaluate whether a design or prototype feels like TRIO. If it doesn't match the philosophy here, it needs revision before engineering begins.

**If you're an AI tool:** Load this document alongside the token files and PAGE_ARCHITECTURE.md. When making visual decisions, this document takes precedence over generic Material Design defaults. When in doubt, choose the simpler, denser, more systematic option.

**If you're unsure about anything:** Ask Jesse. A 2-minute conversation is cheaper than rebuilding a screen.

---

*Last updated: 2026-04-20*
*Source: Jesse Szygiel, Lead UX/Product Designer, AHTG*
