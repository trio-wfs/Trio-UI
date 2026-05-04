// ─── Healthcare System Groups ────────────────────────────────────────────────
// Top-level organizational grouping. Real TRIO has ~10 of these.

export interface HealthcareSystemGroup {
  id: string
  name: string
  region: string
}

export const healthcareSystemGroups: HealthcareSystemGroup[] = [
  { id: 'hcsg-001', name: 'Meridian Health Partners', region: 'Midwest' },
  { id: 'hcsg-002', name: 'Coastal Care Alliance', region: 'Southeast' },
  { id: 'hcsg-003', name: 'Summit Health Network', region: 'West' },
  { id: 'hcsg-004', name: 'Keystone Medical Group', region: 'Northeast' },
]

// ─── Healthcare Systems ──────────────────────────────────────────────────────
// Each belongs to a group. Real TRIO has ~50 of these.

export interface HealthcareSystem {
  id: string
  name: string
  groupId: string
  state: string
  facilityCount: number
}

export const healthcareSystems: HealthcareSystem[] = [
  { id: 'hcs-001', name: 'Lakeview Health System', groupId: 'hcsg-001', state: 'IL', facilityCount: 2 },
  { id: 'hcs-002', name: 'Prairie Medical Group', groupId: 'hcsg-001', state: 'WI', facilityCount: 2 },
  { id: 'hcs-003', name: 'Palmetto Health System', groupId: 'hcsg-002', state: 'FL', facilityCount: 2 },
  { id: 'hcs-004', name: 'Magnolia Regional Health', groupId: 'hcsg-002', state: 'GA', facilityCount: 2 },
  { id: 'hcs-005', name: 'Cascade Health Partners', groupId: 'hcsg-003', state: 'OR', facilityCount: 2 },
  { id: 'hcs-006', name: 'Sierra Vista Medical', groupId: 'hcsg-003', state: 'UT', facilityCount: 2 },
  { id: 'hcs-007', name: 'Harborview Health Network', groupId: 'hcsg-004', state: 'PA', facilityCount: 2 },
  { id: 'hcs-008', name: 'Ridgeline Medical System', groupId: 'hcsg-004', state: 'OH', facilityCount: 2 },
]
