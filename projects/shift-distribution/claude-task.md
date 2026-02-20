# Task: Shift Distribution Modal Component

## Context
Build a React modal for the Shift Distribution feature in AHTG's Trio Workforce Solutions. This modal is part of the shift management workflow where recruiters/MSPs select which audiences (resource pools, tiers, agencies) should have access to shifts, set when access begins, and decide whether to notify providers immediately. Extends the existing "Access Scheduling" design pattern from the Job Distribution system.

## Requirements & Logic

### User Flow
1. **Audience Selection** — User selects one or more audiences (Resource Pools, Tiers, Agencies)
2. **Create Schedule** — User clicks "Create Access Schedule" to generate schedule rows
3. **Schedule Details** — For each selected audience:
   - Set a start time (datetime picker)
   - Choose whether to notify providers now (toggle, defaults ON)
4. **Submit** — User clicks "Schedule" to finalize and submit all selected audiences with their notification preferences

### Key Logic Rules

**Provider Count Display:**
- Resource Pools: Show total privileged provider count (e.g., "12 providers")
- Tiers/Agencies: Show context (e.g., "7 with Providers / 10 Total") to indicate how many have privileged providers out of total

**Notification Toggle:**
- Applies per audience row (independent controls)
- Defaults to ON (notify immediately when access is granted)
- Disabled when provider count = 0 (can't notify if no providers available)

**Disabled/Empty States:**
- "Create Access Schedule" button: Disabled until user selects at least one audience
- "Schedule" button: Disabled until user creates at least one schedule
- Empty schedules view: Show placeholder text when no schedules created yet

**Data Model:**
```
Audience: {
  id, name, type (resourcePool|tier|agency|program),
  providerCount, totalCount (for tiers), withProvidersCount (for context)
}

AccessScheduleRow: {
  id, audience, startTime, notifyNow (toggle state)
}
```

### Journey
1. Modal opens with audience selection grid
2. User checks audiences they want to schedule
3. User clicks "Create Access Schedule"
4. Selected audiences appear as table rows below
5. User can adjust start time per row
6. User can toggle "notify now" per row (disabled if no providers)
7. User clicks "Schedule" to submit all rows
8. Modal closes, callback fires with final schedule data

## AHTG Design System
Use AHTG tokens (palette.json, spacing.json, typography.json) and MUI components as the source of truth. No hardcoded colors, spacing, or styles — all from tokens.

## Implementation Checklist

- TypeScript interfaces: AudienceWithCount, AccessScheduleRow, ShiftDistributionModalProps
- State: selectedAudiences[], accessSchedules[], notifyToggles (per-row)
- Reusable AudienceGrid component (accepts type, filters by type, renders checkboxes)
- Provider count formatter (pools: "N providers", tiers: "N with Providers / M Total")
- Main modal with Dialog wrapper
- Sections: Internal (Resource Pools), External (Tiers)
- Create Access Schedule button (disabled until audiences selected)
- Access Schedules table/list (shows selected audiences with time + toggle)
- Toggle behavior: defaults ON, disabled when providerCount = 0
- Schedule button (disabled until schedules created, calls onSchedule callback)
- Empty state placeholder when no schedules
- Cancel and Schedule footer buttons
- AHTG design system compliance (tokens only, no hardcoded values)

## Output
Build production-ready React component: ShiftDistributionModal.tsx
- Full TypeScript
- AHTG tokens (no hardcoded values)
- MUI components
- Per claude.md rules
