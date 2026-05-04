// ─── Assignments / Placements ────────────────────────────────────────────────
// Created after a submission is accepted. Tracks the actual work period.
// Pipeline: Filled → Confirmed → Cleared to Start → Started With Issues →
//           On Assignment → Complete / Incomplete / Terminated / Never Started / Cancelled

export type AssignmentStatus = 'filled' | 'confirmed' | 'cleared-to-start' | 'started-with-issues' | 'on-assignment' | 'complete' | 'incomplete' | 'terminated' | 'never-started' | 'cancelled'
export type PositionType = 'initial' | 'extension'
export type ShiftType = 'Days' | 'Nights' | 'Evening' | 'Rotating'

export interface BillingDetails {
  regularHourly: number
  travelHousing?: string
  mileage?: string
  rebateFeePercent: number
  adminFeePercent: number
}

export interface Assignment {
  id: string
  number: number
  submissionId: string
  providerId: string
  agencyId: string
  jobId: string
  facilityId: string
  unitId?: string
  assignedPosition: string
  positionType: PositionType
  status: AssignmentStatus
  shift: ShiftType
  shiftDescription: string
  startDate: string
  endDate: string
  actualEndDate?: string
  billing: BillingDetails
  requisitionId?: string
  weekendRequirements?: string
  onCallRequirements?: string
  fullTimeGuarantee?: number
  preScheduledTimeOff?: string
}

export const assignments: Assignment[] = [
  // ── On Assignment ──
  { id: 'asgn-001', number: 2173652, submissionId: 'sub-004', providerId: 'prov-019', agencyId: 'agcy-001', jobId: 'job-001', facilityId: 'fac-001', unitId: 'unit-003', assignedPosition: 'CST', positionType: 'initial', status: 'on-assignment', shift: 'Days', shiftDescription: 'Days: 8:00 am - 5:00 pm (8 hrs)', startDate: '2026-01-04', endDate: '2026-05-02', billing: { regularHourly: 85, travelHousing: 'Travel/Housing', mileage: 'Mileage', rebateFeePercent: 0, adminFeePercent: 0 }, fullTimeGuarantee: 10000, preScheduledTimeOff: 'Weekends' },
  { id: 'asgn-002', number: 2183239, submissionId: 'sub-025', providerId: 'prov-018', agencyId: 'agcy-002', jobId: 'job-006', facilityId: 'fac-004', unitId: 'unit-010', assignedPosition: 'RN', positionType: 'initial', status: 'on-assignment', shift: 'Days', shiftDescription: 'Days: 7:00 am - 7:00 pm (12 hrs)', startDate: '2025-12-15', endDate: '2026-03-14', billing: { regularHourly: 92, travelHousing: 'Travel/Housing', rebateFeePercent: 0, adminFeePercent: 0 } },
  { id: 'asgn-003', number: 2217302, submissionId: 'sub-001', providerId: 'prov-009', agencyId: 'agcy-002', jobId: 'job-002', facilityId: 'fac-001', unitId: 'unit-001', assignedPosition: 'RN', positionType: 'initial', status: 'on-assignment', shift: 'Nights', shiftDescription: 'Nights: 7:00 pm - 7:00 am (12 hrs)', startDate: '2026-01-20', endDate: '2026-04-18', billing: { regularHourly: 128, travelHousing: 'Travel/Housing', rebateFeePercent: 0, adminFeePercent: 0 }, weekendRequirements: 'Every other weekend' },
  { id: 'asgn-004', number: 2191669, submissionId: 'sub-002', providerId: 'prov-011', agencyId: 'agcy-001', jobId: 'job-004', facilityId: 'fac-001', unitId: 'unit-004', assignedPosition: 'RN', positionType: 'initial', status: 'on-assignment', shift: 'Days', shiftDescription: 'Days: 7:00 am - 7:00 pm (12 hrs)', startDate: '2026-01-13', endDate: '2026-04-11', billing: { regularHourly: 138, travelHousing: 'Travel/Housing', rebateFeePercent: 0, adminFeePercent: 0 } },
  { id: 'asgn-005', number: 2019753, submissionId: 'sub-003', providerId: 'prov-012', agencyId: 'agcy-004', jobId: 'job-008', facilityId: 'fac-005', unitId: 'unit-014', assignedPosition: 'CST', positionType: 'initial', status: 'on-assignment', shift: 'Days', shiftDescription: 'Days: 6:30 am - 3:00 pm (8 hrs)', startDate: '2025-11-17', endDate: '2026-02-14', billing: { regularHourly: 85, rebateFeePercent: 0, adminFeePercent: 0 } },

  // ── Extension ──
  { id: 'asgn-006', number: 2217675, submissionId: 'sub-001', providerId: 'prov-009', agencyId: 'agcy-002', jobId: 'job-002', facilityId: 'fac-001', unitId: 'unit-001', assignedPosition: 'RN', positionType: 'extension', status: 'confirmed', shift: 'Nights', shiftDescription: 'Nights: 7:00 pm - 7:00 am (12 hrs)', startDate: '2026-04-19', endDate: '2026-07-17', billing: { regularHourly: 132, travelHousing: 'Travel/Housing', rebateFeePercent: 0, adminFeePercent: 0 }, weekendRequirements: 'Every other weekend' },

  // ── Completed ──
  { id: 'asgn-007', number: 2124845, submissionId: 'sub-026', providerId: 'prov-039', agencyId: 'agcy-002', jobId: 'job-011', facilityId: 'fac-004', unitId: 'unit-011', assignedPosition: 'RN', positionType: 'initial', status: 'complete', shift: 'Nights', shiftDescription: 'Nights: 7:00 pm - 7:00 am (12 hrs)', startDate: '2025-10-06', endDate: '2026-01-03', actualEndDate: '2026-01-03', billing: { regularHourly: 108, travelHousing: 'Travel/Housing', rebateFeePercent: 0, adminFeePercent: 0 } },
  { id: 'asgn-008', number: 2173839, submissionId: 'sub-018', providerId: 'prov-022', agencyId: 'agcy-008', jobId: 'job-024', facilityId: 'fac-006', unitId: 'unit-015', assignedPosition: 'RN', positionType: 'initial', status: 'complete', shift: 'Days', shiftDescription: 'Days: 7:00 am - 3:00 pm (8 hrs)', startDate: '2025-11-03', endDate: '2026-01-31', actualEndDate: '2026-01-31', billing: { regularHourly: 92, rebateFeePercent: 0, adminFeePercent: 0 } },

  // ── Confirmed / Cleared to Start ──
  { id: 'asgn-009', number: 2230001, submissionId: 'sub-019', providerId: 'prov-024', agencyId: 'agcy-013', jobId: 'job-020', facilityId: 'fac-001', unitId: 'unit-001', assignedPosition: 'RN', positionType: 'initial', status: 'cleared-to-start', shift: 'Days', shiftDescription: 'Days: 7:00 am - 7:00 pm (12 hrs)', startDate: '2026-04-14', endDate: '2026-07-12', billing: { regularHourly: 128, rebateFeePercent: 0, adminFeePercent: 0 } },
  { id: 'asgn-010', number: 2230045, submissionId: 'sub-034', providerId: 'prov-034', agencyId: 'agcy-009', jobId: 'job-012', facilityId: 'fac-015', unitId: 'unit-025', assignedPosition: 'Cleaner', positionType: 'initial', status: 'confirmed', shift: 'Days', shiftDescription: 'Days: 6:00 am - 2:00 pm (8 hrs)', startDate: '2025-10-01', endDate: '2025-12-28', billing: { regularHourly: 24, rebateFeePercent: 0, adminFeePercent: 0 } },

  // ── Locums assignments ──
  { id: 'asgn-011', number: 2240001, submissionId: 'sub-011', providerId: 'prov-001', agencyId: 'agcy-003', jobId: 'job-018', facilityId: 'fac-003', assignedPosition: 'Physician', positionType: 'initial', status: 'on-assignment', shift: 'Days', shiftDescription: 'Days: 7:00 am - 7:00 pm (12 hrs)', startDate: '2026-03-15', endDate: '2026-06-12', billing: { regularHourly: 185, mileage: 'Mileage', rebateFeePercent: 0, adminFeePercent: 0 }, fullTimeGuarantee: 15000 },
  { id: 'asgn-012', number: 2240015, submissionId: 'sub-012', providerId: 'prov-003', agencyId: 'agcy-005', jobId: 'job-017', facilityId: 'fac-001', assignedPosition: 'Physician', positionType: 'initial', status: 'on-assignment', shift: 'Rotating', shiftDescription: 'Rotating: variable (10-12 hrs)', startDate: '2026-01-20', endDate: '2026-04-18', billing: { regularHourly: 285, mileage: 'Mileage', rebateFeePercent: 0, adminFeePercent: 0 }, onCallRequirements: 'On-call 1 weekend/month' },

  // ── Terminated / Never Started / Cancelled ──
  { id: 'asgn-013', number: 2100500, submissionId: 'sub-008', providerId: 'prov-013', agencyId: 'agcy-006', jobId: 'job-007', facilityId: 'fac-005', unitId: 'unit-013', assignedPosition: 'RN', positionType: 'initial', status: 'terminated', shift: 'Days', shiftDescription: 'Days: 7:00 am - 7:00 pm (12 hrs)', startDate: '2025-12-01', endDate: '2026-02-28', actualEndDate: '2025-12-22', billing: { regularHourly: 95, travelHousing: 'Travel/Housing', rebateFeePercent: 0, adminFeePercent: 0 } },
  { id: 'asgn-014', number: 2105200, submissionId: 'sub-029', providerId: 'prov-016', agencyId: 'agcy-006', jobId: 'job-009', facilityId: 'fac-002', unitId: 'unit-006', assignedPosition: 'RN', positionType: 'initial', status: 'never-started', shift: 'Days', shiftDescription: 'Days: 7:00 am - 3:00 pm (8 hrs)', startDate: '2025-11-10', endDate: '2026-02-07', billing: { regularHourly: 98, rebateFeePercent: 0, adminFeePercent: 0 } },

  // ── Per Diem specific ──
  { id: 'asgn-015', number: 2250001, submissionId: 'sub-022', providerId: 'prov-027', agencyId: 'agcy-008', jobId: 'job-021', facilityId: 'fac-009', unitId: 'unit-018', assignedPosition: 'RN', positionType: 'initial', status: 'filled', shift: 'Days', shiftDescription: 'Days: 7:00 am - 7:00 pm (12 hrs)', startDate: '2026-04-01', endDate: '2026-04-01', billing: { regularHourly: 105, rebateFeePercent: 0, adminFeePercent: 0 } },
]
