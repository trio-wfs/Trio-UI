// ─── Jobs ────────────────────────────────────────────────────────────────────
// Three segment types with distinct field sets, matching real TRIO patterns.
// Title patterns: "Temp - {Prof} - {Specialty} ({Shift}) {City}, {State}"
//                 "Per Diem - {Prof} - {Specialty} ({Shift}) {City}, {State}"
//                 Locums: "{Prof} - {Specialty}"

export type JobSegment = 'nursing-allied' | 'locums' | 'per-diem'
export type JobType = 'Temp' | 'Temp to Perm' | 'Per Diem'
export type JobStatus = 'posted' | 'pending-approval' | 'in-review' | 'on-hold' | 'closed'
export type JobReason = '' | 'modified' | 'reevaluating' | 'not-approved' | 'no-thank-you' | 'filled'

export interface Job {
  id: string
  number: number
  segment: JobSegment
  type: JobType
  title: string
  status: JobStatus
  reason: JobReason
  facilityId: string
  unitId?: string
  profession: string
  specialty: string
  city: string
  state: string
  startDate: string
  // Per Diem specific
  openPositions?: number
  rate?: number
  // Locums specific
  rm?: string
}

export const jobs: Job[] = [
  // ── Nursing/Allied Jobs ──
  { id: 'job-001', number: 12547, segment: 'nursing-allied', type: 'Temp', title: 'Temp - CST - Cardio Operating Room (Days) Chicago, IL', status: 'posted', reason: 'modified', facilityId: 'fac-001', unitId: 'unit-003', profession: 'CST', specialty: 'Cardio Operating Room', city: 'Chicago', state: 'IL', startDate: '2026-02-23' },
  { id: 'job-002', number: 11007, segment: 'nursing-allied', type: 'Temp', title: 'Temp - RN - ICU (Nights) Chicago, IL', status: 'posted', reason: '', facilityId: 'fac-001', unitId: 'unit-001', profession: 'RN', specialty: 'ICU', city: 'Chicago', state: 'IL', startDate: '2026-01-15' },
  { id: 'job-003', number: 10997, segment: 'nursing-allied', type: 'Temp', title: 'Temp - RN - Emergency Room (Days) Evanston, IL', status: 'posted', reason: '', facilityId: 'fac-002', unitId: 'unit-005', profession: 'RN', specialty: 'Emergency Department', city: 'Evanston', state: 'IL', startDate: '2026-01-10' },
  { id: 'job-004', number: 10888, segment: 'nursing-allied', type: 'Temp', title: 'Temp - RN - Labor & Delivery (Days) Chicago, IL', status: 'posted', reason: '', facilityId: 'fac-001', unitId: 'unit-004', profession: 'RN', specialty: 'Labor & Delivery', city: 'Chicago', state: 'IL', startDate: '2026-01-08' },
  { id: 'job-005', number: 10841, segment: 'nursing-allied', type: 'Temp', title: 'Temp - RN - ICU (Nights) Milwaukee, WI', status: 'posted', reason: '', facilityId: 'fac-003', unitId: 'unit-007', profession: 'RN', specialty: 'ICU', city: 'Milwaukee', state: 'WI', startDate: '2025-12-15' },
  { id: 'job-006', number: 10750, segment: 'nursing-allied', type: 'Temp', title: 'Temp - RN - Med-Surg (Days) Madison, WI', status: 'posted', reason: '', facilityId: 'fac-004', unitId: 'unit-010', profession: 'RN', specialty: 'Med-Surg', city: 'Madison', state: 'WI', startDate: '2025-12-01' },
  { id: 'job-007', number: 10680, segment: 'nursing-allied', type: 'Temp', title: 'Temp - RN - Emergency Room (Nights) Orlando, FL', status: 'posted', reason: '', facilityId: 'fac-005', unitId: 'unit-013', profession: 'RN', specialty: 'Emergency Department', city: 'Orlando', state: 'FL', startDate: '2025-11-20' },
  { id: 'job-008', number: 10590, segment: 'nursing-allied', type: 'Temp', title: 'Temp - CST - General Operating Room (Days) Orlando, FL', status: 'posted', reason: '', facilityId: 'fac-005', unitId: 'unit-014', profession: 'CST', specialty: 'Cardio Operating Room', city: 'Orlando', state: 'FL', startDate: '2025-11-10' },
  { id: 'job-009', number: 10422, segment: 'nursing-allied', type: 'Temp', title: 'Temp - RN - Telemetry (Days) Evanston, IL', status: 'on-hold', reason: 'reevaluating', facilityId: 'fac-002', unitId: 'unit-006', profession: 'RN', specialty: 'Telemetry', city: 'Evanston', state: 'IL', startDate: '2025-10-28' },
  { id: 'job-010', number: 10310, segment: 'nursing-allied', type: 'Temp', title: 'Temp - RN - ICU (Days) Portland, OR', status: 'posted', reason: '', facilityId: 'fac-009', unitId: 'unit-018', profession: 'RN', specialty: 'ICU', city: 'Portland', state: 'OR', startDate: '2025-10-15' },
  { id: 'job-011', number: 10200, segment: 'nursing-allied', type: 'Temp', title: 'Temp - RN - Step Down (Nights) Madison, WI', status: 'closed', reason: 'filled', facilityId: 'fac-004', unitId: 'unit-011', profession: 'RN', specialty: 'Step Down', city: 'Madison', state: 'WI', startDate: '2025-10-01' },
  { id: 'job-012', number: 10105, segment: 'nursing-allied', type: 'Temp', title: 'Temp - Cleaner - Window Wiper (Days) Columbus, OH', status: 'posted', reason: '', facilityId: 'fac-015', unitId: 'unit-025', profession: 'Cleaner', specialty: 'Environmental Services', city: 'Columbus', state: 'OH', startDate: '2025-09-22' },

  // ── Locums Jobs ──
  { id: 'job-013', number: 1069, segment: 'locums', type: 'Temp', title: 'Physician - Critical Care', status: 'posted', reason: '', facilityId: 'fac-013', profession: 'Physician', specialty: 'Critical Care', city: 'Philadelphia', state: 'PA', startDate: '2026-03-01', rm: 'Joanne Price' },
  { id: 'job-014', number: 1137, segment: 'locums', type: 'Temp', title: 'NP - Critical Care', status: 'posted', reason: '', facilityId: 'fac-015', profession: 'NP', specialty: 'Critical Care', city: 'Columbus', state: 'OH', startDate: '2026-02-15', rm: 'Beth Conroy' },
  { id: 'job-015', number: 1188, segment: 'locums', type: 'Temp', title: 'CAA - Anesthesia', status: 'posted', reason: '', facilityId: 'fac-011', unitId: 'unit-022', profession: 'CAA', specialty: 'Anesthesia', city: 'Salt Lake City', state: 'UT', startDate: '2026-02-10', rm: 'Amy Larsen' },
  { id: 'job-016', number: 1205, segment: 'locums', type: 'Temp', title: 'CAA - Anesthesia', status: 'posted', reason: '', facilityId: 'fac-009', unitId: 'unit-020', profession: 'CAA', specialty: 'Anesthesia', city: 'Portland', state: 'OR', startDate: '2026-01-20' },
  { id: 'job-017', number: 1210, segment: 'locums', type: 'Temp', title: 'Physician - Anesthesiology', status: 'posted', reason: '', facilityId: 'fac-001', profession: 'Physician', specialty: 'Anesthesiology', city: 'Chicago', state: 'IL', startDate: '2026-01-15' },
  { id: 'job-018', number: 1364, segment: 'locums', type: 'Temp', title: 'Physician - Hospitalist', status: 'posted', reason: '', facilityId: 'fac-003', profession: 'Physician', specialty: 'Hospitalist', city: 'Milwaukee', state: 'WI', startDate: '2026-03-10' },
  { id: 'job-019', number: 1420, segment: 'locums', type: 'Temp', title: 'Physician - Emergency Medicine', status: 'posted', reason: '', facilityId: 'fac-005', profession: 'Physician', specialty: 'Emergency Medicine', city: 'Orlando', state: 'FL', startDate: '2026-04-01' },

  // ── Per Diem Jobs ──
  { id: 'job-020', number: 8906, segment: 'per-diem', type: 'Per Diem', title: 'Per Diem - RN - ICU (Days) Chicago, IL', status: 'posted', reason: '', facilityId: 'fac-001', unitId: 'unit-001', profession: 'RN', specialty: 'ICU', city: 'Chicago', state: 'IL', startDate: '2026-04-01', openPositions: 100, rate: 258.60 },
  { id: 'job-021', number: 9535, segment: 'per-diem', type: 'Per Diem', title: 'Per Diem - RN - ICU (Days) Portland, OR', status: 'in-review', reason: '', facilityId: 'fac-009', unitId: 'unit-018', profession: 'RN', specialty: 'ICU', city: 'Portland', state: 'OR', startDate: '2026-03-15', openPositions: 100, rate: 253.49 },
  { id: 'job-022', number: 7908, segment: 'per-diem', type: 'Per Diem', title: 'Per Diem - RN - Emergency Room (Days) Salt Lake City, UT', status: 'posted', reason: '', facilityId: 'fac-011', unitId: 'unit-021', profession: 'RN', specialty: 'Emergency Department', city: 'Salt Lake City', state: 'UT', startDate: '2026-02-20', openPositions: 3, rate: 250.53 },
  { id: 'job-023', number: 6016, segment: 'per-diem', type: 'Per Diem', title: 'Per Diem - RN - ICU (Nights) Milwaukee, WI', status: 'posted', reason: 'modified', facilityId: 'fac-003', unitId: 'unit-007', profession: 'RN', specialty: 'ICU', city: 'Milwaukee', state: 'WI', startDate: '2026-01-08', openPositions: 100, rate: 200.21 },
  { id: 'job-024', number: 3591, segment: 'per-diem', type: 'Per Diem', title: 'Per Diem - RN - Med-Surg (Days) Tampa, FL', status: 'posted', reason: '', facilityId: 'fac-006', unitId: 'unit-015', profession: 'RN', specialty: 'Med-Surg', city: 'Tampa', state: 'FL', startDate: '2025-11-01', openPositions: 100, rate: 244.79 },
  { id: 'job-025', number: 2927, segment: 'per-diem', type: 'Per Diem', title: 'Per Diem - RN - ICU (Days) Columbus, OH', status: 'on-hold', reason: 'reevaluating', facilityId: 'fac-015', unitId: 'unit-025', profession: 'RN', specialty: 'ICU', city: 'Columbus', state: 'OH', startDate: '2025-10-15', openPositions: 100, rate: 266.62 },
  { id: 'job-026', number: 1510, segment: 'per-diem', type: 'Per Diem', title: 'Per Diem - RN - ICU (Days) Savannah, GA', status: 'closed', reason: 'no-thank-you', facilityId: 'fac-008', profession: 'RN', specialty: 'ICU', city: 'Savannah', state: 'GA', startDate: '2025-09-01', openPositions: 100, rate: 287.14 },
  { id: 'job-027', number: 3236, segment: 'per-diem', type: 'Per Diem', title: 'Per Diem - CST - General Operating Room (Days) Portland, OR', status: 'posted', reason: '', facilityId: 'fac-009', unitId: 'unit-020', profession: 'CST', specialty: 'General Operating Room', city: 'Portland', state: 'OR', startDate: '2025-12-10', openPositions: 25, rate: 281.99 },
  { id: 'job-028', number: 7975, segment: 'per-diem', type: 'Per Diem', title: 'Per Diem - RN - ICU (Evening) Philadelphia, PA', status: 'posted', reason: '', facilityId: 'fac-013', unitId: 'unit-023', profession: 'RN', specialty: 'ICU', city: 'Philadelphia', state: 'PA', startDate: '2026-03-20', openPositions: 100, rate: 259.92 },
  { id: 'job-029', number: 5800, segment: 'per-diem', type: 'Per Diem', title: 'Per Diem - RN - Med-Surg (Days) Madison, WI', status: 'posted', reason: '', facilityId: 'fac-004', unitId: 'unit-010', profession: 'RN', specialty: 'Med-Surg', city: 'Madison', state: 'WI', startDate: '2026-01-05', openPositions: 100, rate: 247.44 },
  { id: 'job-030', number: 4506, segment: 'per-diem', type: 'Per Diem', title: 'Per Diem - LPN - Med-Surg (Days) Evanston, IL', status: 'on-hold', reason: 'reevaluating', facilityId: 'fac-002', unitId: 'unit-005', profession: 'LPN', specialty: 'Med-Surg', city: 'Evanston', state: 'IL', startDate: '2025-11-15', openPositions: 50, rate: 148.88 },
]
