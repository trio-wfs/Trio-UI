# Shift Distribution Modal - Specification

**Status:** Awaiting visual confirmation  
**Node ID:** 122-9891  
**Date:** 2026-02-19  
**Agent:** @designsalwork (subagent)

## Task Brief

Add lightweight enhancements to existing shift distribution modal:
- Add provider count visibility for each audience
- Add "Also notify now" toggle per row
- Maintain existing pattern (no redesign)
- AHTG design system compliance only

## Current Modal Structure (CONFIRMED)

**Existing Layout:**
1. Header: "Access Scheduling" with close button
2. Instructions: Explanatory text about audiences and scheduling
3. **Internal Section:**
   - Resources: Searchable field with chips
   - Resource Pools: Grid checkboxes (3-column layout)
   - Each pool shows: [Checkbox] [Pool Name] with "## Providers" label below
4. **External Section:**
   - Agencies: Searchable field with chip
   - Tier List: Grid checkboxes (3-column layout)
   - Each tier shows: [Checkbox] [Tier Name] with "## Agencies" label below
5. Create Access Schedule button (teal primary)
6. Access Schedules section: Shows selected audiences as rows (currently "No Audiences Selected")
7. Bottom actions: Save Template, Load Template, Cancel, Schedule

**Key Insight:**
- "## Providers" and "## Agencies" placeholders are ALREADY positioned where provider counts should appear
- Just need to replace placeholder text with real counts
- "Also notify now" toggle goes in the Access Schedules rows (below)

## Proposed Additions

### 1. Provider Count Display (CONFIRMED PLACEMENT)

**Purpose:** Replace "## Providers" / "## Agencies" placeholders with real counts

**Implementation:**
- Position: Below audience name (existing "## Providers" / "## Agencies" location)
- Format: `N Providers` or `N Agencies` (matching existing placeholder pattern)
- Typography: `body2` (0.875rem, 400 weight) from AHTG
- Color: `text.secondary` (#6B7280) — secondary since it's descriptive
- Font: Inter
- Spacing: Keep existing padding below checkbox/name

**Examples:**
- Resource Pool: "12 Providers"
- Tier: "5 Agencies" / "3 Agencies with Privileged Providers" (optional detail)
- Agency: "0 Providers" (if no privileged providers)

**Zero-Provider Handling:**
- Display: "0 Providers" in same style
- Optional: Light grey background or slightly muted if truly no providers
- Behavior: Check if toggle should be disabled when count = 0

### 2. "Also Notify Now" Toggle (CONFIRMED PLACEMENT)

**Purpose:** Enable immediate provider notification per selected audience in Access Schedules

**Location:** Access Schedules section — added to each selected audience row

**Current State:** Access Schedules shows "No Audiences Selected"  
**After Selection:** Rows appear for each checked audience (Resource Pool/Tier/Agency)

**Toggle Implementation:**

**Component:** MUI `Switch` (size=small)  
**Position:** Right-aligned at end of each Access Schedules row  
**Label:** "Also notify now" (right of toggle or tooltip)  
**Default:** ON (checked) — matches requirement for "defaults to ON"

**Row Layout (Access Schedules):**
```
[Audience Name/Icon] [Time Period Selector] ............ [Also notify now] [Switch]
```

**States:**
- ON (checked): Send notification when schedule activates
- OFF (unchecked): Schedule access but don't send notification yet
- Disabled: Only if 0 providers (gray out)
- Active Color: Primary blue (#2563EB)

**Interaction:**
- Independent per row
- Can be toggled on/off at row level
- No master toggle (granular control)

## AHTG Design System Rules

### Spacing
- Row height: 48px (standard AHTG table row)
- Internal padding: 16px horizontal
- Element spacing: 8px between elements
- Exception: 4px for tightly coupled elements (count badges)

### Typography
- Audience name: `body1` (1rem, 400 weight)
- Provider count: `body2` (0.875rem, 400 weight)
- Toggle label: `body2` (0.875rem, 400 weight)
- Font family: Inter (AHTG standard)

### Colors
- Primary action: `#2563EB` (AHTG blue)
- Text primary: `#111827`
- Text secondary: `#6B7280`
- Border: `#E5E7EB`
- Background hover: `#F9FAFB`

### Components
- Toggle: MUI `Switch` with `size="small"`
- Count badge: MUI `Chip` with `size="small"` variant="outlined" OR plain text
- Icons: Material Icons only

## Layout Proposal (CONFIRMED)

### Part 1: Audience Selection Grid (Resource Pools / Tiers)

```
[Checkbox] [Pool/Tier Name]
           [12 Providers / 5 Agencies]
```

**Spacing:**
- Row height: ~64px (checkbox + name + provider count)
- Checkbox: 16px left
- Gap: 8px
- Name: body1, #111827
- Below name: Provider count, body2, #6B7280
- Bottom padding: 8px to next row

### Part 2: Access Schedules Rows (Selected Audiences)

```
[Audience Name (Provider Count)] [Time Selector] .... [Also notify now] [Switch]
```

**Example Row:**
```
Resource Pool 1099 (12 providers)  [Start: Feb 19, 2pm] ... [Also notify now] [Toggle ON]
```

**Provider Count Format:**
- Show context: `(7 with Providers / 10 Total)` for tiers/agencies
- Format: `(N providers)` for resource pools
- Position: Inline after audience name
- Typography: body2, #6B7280 (secondary)

**Spacing:**
- Row height: 56px (accommodate provider count on same line)
- Left: 16px
- Audience name: body1, #111827
- Provider count: body2, #6B7280 (follows name, no line break)
- Time selector: auto-width, centered
- Gap: 16px
- Label "Also notify now": body2, #111827
- Toggle: MUI Switch small (52px)
- Right padding: 16px

**Toggle Behavior:**
- Default: ON (checked) for new rows
- Disabled: If provider count = 0
- Independent: Each row controls its own notification flag

## Questions for Jesse (ANSWERED)

1. ✅ **Provider Count Data Source:** API (assume for now)

2. ✅ **"0 Providers" Behavior:** 
   - Can select with 0 providers
   - Disable "Also notify now" toggle if 0 providers

3. ✅ **Access Schedules Row Structure:** 
   - YES, show provider count in Access Schedules rows
   - Format: "Resource Pool 1099 (12 providers)" or similar

4. ✅ **"Also Notify Now" Default:** 
   - Default ON per row (per-row control, not batch)

5. ✅ **Privilege Filter Display:**
   - Show context: "7 Agencies with Providers / 10 Total"
   - Makes it clear it's out of a larger number
   - Example: "Tier 1: 7 with Providers / 10 Total"

## Implementation Summary

### What Stays the Same
- Audience selection grid layout (checkboxes, 3-column grid)
- Create Access Schedule button position and style
- Access Schedules section structure
- Bottom action buttons (Save, Load, Cancel, Schedule)
- Modal header and instructions

### What Changes
- Replace "## Providers" placeholder with actual count (e.g., "12 Providers")
- Replace "## Agencies" placeholder with context (e.g., "7 with Providers / 10 Total")
- Add provider count display to Access Schedules rows (inline with audience name)
- Add "Also notify now" toggle to each Access Schedules row (right-aligned)
- Add "Also notify now" label next to toggle
- Disable toggle if provider count = 0

### AHTG Design System Compliance
- ✅ Uses AHTG colors only (#111827 text, #6B7280 secondary, #2563EB blue)
- ✅ Uses AHTG spacing (16px, 8px, 4px grid)
- ✅ Uses AHTG typography (body1, body2, Inter)
- ✅ Uses MUI Switch component (standard AHTG component)
- ✅ No invented colors, spacing, or variants

## Implementation Ready

✅ **Spec Finalized** (Jesse approved all 5 decisions)  
✅ **Layout Confirmed** (from screenshot)  
✅ **Design Tokens Locked** (AHTG compliance)  
✅ **Toggle Behavior Defined** (per-row, default ON, disable if 0)  
✅ **Provider Count Format** (context display: "7/10")

## Dev Handoff

**@dev will build:**
1. Provider count display in audience selection grid
   - Resource Pools: "(12 providers)"
   - Tiers/Agencies: "(7 with Providers / 10 Total)"
2. Provider count display in Access Schedules rows
   - Inline after audience name
   - Same context format as above
3. "Also notify now" toggle
   - MUI Switch, small size
   - Right-aligned in Access Schedules row
   - Default ON
   - Disabled if provider count = 0
4. AHTG design system compliance
   - Use palette.json colors (#111827, #6B7280, #2563EB)
   - Use AHTG spacing (16px, 8px, 4px)
   - Use Inter typography
5. Data integration
   - Assume API provides provider counts
   - Handle 0-provider scenarios
   - Per-row toggle state management

---

**Status:** Approved by Jesse — Ready for @dev implementation
