// ─── Timecards ───────────────────────────────────────────────────────────────
// Weekly billing records tied to assignments. Each has line items and audit data.

export type TimecardStatus = 'pending-review' | 'approved' | 'flagged' | 'rejected' | 'processing'
export type AuditResult = 'pass' | 'fail' | 'needs-review'

export interface TimecardLineItem {
  type: 'regular' | 'overtime' | 'night-diff' | 'weekend-diff' | 'holiday' | 'on-call' | 'expense'
  description: string
  hours?: number
  rate?: number
  amount: number
  flagged?: boolean
  flagReason?: string
}

export interface Timecard {
  id: string
  providerId: string
  agencyId: string
  facilityId: string
  assignmentId: string
  weekEnding: string
  submittedAt: string
  status: TimecardStatus
  auditResult?: AuditResult
  auditScore?: number
  totalBillAmount: number
  lineItems: TimecardLineItem[]
  exceptions?: string[]
}

export const timecards: Timecard[] = [
  // ── Week ending 4/19 — current week ──
  { id: 'tc-001', providerId: 'prov-009', agencyId: 'agcy-002', facilityId: 'fac-001', assignmentId: 'asgn-003', weekEnding: '2026-04-19', submittedAt: '2026-04-20T08:14:00Z', status: 'approved', auditResult: 'pass', auditScore: 96, totalBillAmount: 6144, lineItems: [{ type: 'regular', description: 'Regular Hours', hours: 36, rate: 128, amount: 4608 }, { type: 'night-diff', description: 'Night Differential', hours: 36, rate: 12.8, amount: 460.80 }, { type: 'weekend-diff', description: 'Weekend Differential (Sat-Sun)', hours: 24, rate: 8, amount: 192 }, { type: 'expense', description: 'Parking', amount: 64 }] },
  { id: 'tc-002', providerId: 'prov-019', agencyId: 'agcy-001', facilityId: 'fac-001', assignmentId: 'asgn-001', weekEnding: '2026-04-19', submittedAt: '2026-04-20T09:33:00Z', status: 'flagged', auditResult: 'needs-review', auditScore: 61, totalBillAmount: 4532, lineItems: [{ type: 'regular', description: 'Regular Hours', hours: 40, rate: 85, amount: 3400 }, { type: 'overtime', description: 'Overtime Hours', hours: 6, rate: 127.50, amount: 765, flagged: true, flagReason: 'OT exceeds pre-approved 4 hours. Prior authorization required.' }, { type: 'expense', description: 'Parking', amount: 52 }], exceptions: ['Overtime hours exceed pre-authorized amount by 2 hours'] },
  { id: 'tc-003', providerId: 'prov-001', agencyId: 'agcy-003', facilityId: 'fac-003', assignmentId: 'asgn-011', weekEnding: '2026-04-19', submittedAt: '2026-04-21T11:05:00Z', status: 'flagged', auditResult: 'needs-review', auditScore: 54, totalBillAmount: 9820, lineItems: [{ type: 'regular', description: 'Regular Hours', hours: 48, rate: 185, amount: 8880, flagged: true, flagReason: 'Regular hours exceed 40. 8 hours should be classified as overtime.' }, { type: 'expense', description: 'Mileage Reimbursement', amount: 720, flagged: true, flagReason: 'Mileage claim (480 miles) exceeds 200-mile facility radius policy.' }, { type: 'expense', description: 'Lodging', amount: 220 }], exceptions: ['Regular hours exceed 40 — overtime not properly classified', 'Mileage claim exceeds policy radius'] },
  { id: 'tc-004', providerId: 'prov-011', agencyId: 'agcy-001', facilityId: 'fac-001', assignmentId: 'asgn-004', weekEnding: '2026-04-19', submittedAt: '2026-04-20T14:22:00Z', status: 'approved', auditResult: 'pass', auditScore: 94, totalBillAmount: 5520, lineItems: [{ type: 'regular', description: 'Regular Hours', hours: 36, rate: 138, amount: 4968 }, { type: 'weekend-diff', description: 'Weekend Differential', hours: 12, rate: 8, amount: 96 }, { type: 'expense', description: 'Parking', amount: 48 }] },
  { id: 'tc-005', providerId: 'prov-003', agencyId: 'agcy-005', facilityId: 'fac-001', assignmentId: 'asgn-012', weekEnding: '2026-04-19', submittedAt: '2026-04-21T07:48:00Z', status: 'rejected', auditResult: 'fail', auditScore: 28, totalBillAmount: 14200, lineItems: [{ type: 'regular', description: 'Regular Hours', hours: 40, rate: 285, amount: 11400, flagged: true, flagReason: 'Bill rate $285/hr exceeds rate card maximum of $265/hr for Anesthesiology.' }, { type: 'holiday', description: 'Holiday Hours (Easter)', hours: 8, rate: 570, amount: 4560, flagged: true, flagReason: 'Holiday rate not on approved rate card for this facility.' }, { type: 'expense', description: 'Hotel', amount: 240 }], exceptions: ['Bill rate exceeds rate card maximum', 'Holiday rate not pre-approved', 'Total exceeds PO amount by $2,400'] },
  { id: 'tc-006', providerId: 'prov-024', agencyId: 'agcy-013', facilityId: 'fac-001', assignmentId: 'asgn-009', weekEnding: '2026-04-19', submittedAt: '2026-04-20T16:55:00Z', status: 'pending-review', totalBillAmount: 1984, lineItems: [{ type: 'regular', description: 'Regular Hours', hours: 16, rate: 128, amount: 2048 }] },
  { id: 'tc-007', providerId: 'prov-012', agencyId: 'agcy-004', facilityId: 'fac-005', assignmentId: 'asgn-005', weekEnding: '2026-04-19', submittedAt: '2026-04-20T10:11:00Z', status: 'processing', totalBillAmount: 3360, lineItems: [{ type: 'regular', description: 'Regular Hours', hours: 40, rate: 85, amount: 3400 }] },

  // ── Week ending 4/12 ──
  { id: 'tc-008', providerId: 'prov-009', agencyId: 'agcy-002', facilityId: 'fac-001', assignmentId: 'asgn-003', weekEnding: '2026-04-12', submittedAt: '2026-04-13T09:00:00Z', status: 'approved', auditResult: 'pass', auditScore: 98, totalBillAmount: 5760, lineItems: [{ type: 'regular', description: 'Regular Hours', hours: 36, rate: 128, amount: 4608 }, { type: 'night-diff', description: 'Night Differential', hours: 36, rate: 12.8, amount: 460.80 }, { type: 'expense', description: 'Parking', amount: 64 }] },
  { id: 'tc-009', providerId: 'prov-019', agencyId: 'agcy-001', facilityId: 'fac-001', assignmentId: 'asgn-001', weekEnding: '2026-04-12', submittedAt: '2026-04-13T08:30:00Z', status: 'approved', auditResult: 'pass', auditScore: 92, totalBillAmount: 3452, lineItems: [{ type: 'regular', description: 'Regular Hours', hours: 40, rate: 85, amount: 3400 }, { type: 'expense', description: 'Parking', amount: 52 }] },
  { id: 'tc-010', providerId: 'prov-001', agencyId: 'agcy-003', facilityId: 'fac-003', assignmentId: 'asgn-011', weekEnding: '2026-04-12', submittedAt: '2026-04-13T10:15:00Z', status: 'approved', auditResult: 'pass', auditScore: 90, totalBillAmount: 7620, lineItems: [{ type: 'regular', description: 'Regular Hours', hours: 36, rate: 185, amount: 6660 }, { type: 'on-call', description: 'On-Call Hours', hours: 12, rate: 80, amount: 960 }] },
  { id: 'tc-011', providerId: 'prov-011', agencyId: 'agcy-001', facilityId: 'fac-001', assignmentId: 'asgn-004', weekEnding: '2026-04-12', submittedAt: '2026-04-13T11:00:00Z', status: 'approved', auditResult: 'pass', auditScore: 95, totalBillAmount: 5016, lineItems: [{ type: 'regular', description: 'Regular Hours', hours: 36, rate: 138, amount: 4968 }, { type: 'expense', description: 'Parking', amount: 48 }] },
  { id: 'tc-012', providerId: 'prov-003', agencyId: 'agcy-005', facilityId: 'fac-001', assignmentId: 'asgn-012', weekEnding: '2026-04-12', submittedAt: '2026-04-13T07:30:00Z', status: 'approved', auditResult: 'pass', auditScore: 88, totalBillAmount: 11640, lineItems: [{ type: 'regular', description: 'Regular Hours', hours: 40, rate: 285, amount: 11400 }, { type: 'expense', description: 'Hotel', amount: 240 }] },

  // ── Week ending 4/5 ──
  { id: 'tc-013', providerId: 'prov-009', agencyId: 'agcy-002', facilityId: 'fac-001', assignmentId: 'asgn-003', weekEnding: '2026-04-05', submittedAt: '2026-04-06T09:15:00Z', status: 'approved', auditResult: 'pass', auditScore: 97, totalBillAmount: 5824, lineItems: [{ type: 'regular', description: 'Regular Hours', hours: 36, rate: 128, amount: 4608 }, { type: 'night-diff', description: 'Night Differential', hours: 36, rate: 12.8, amount: 460.80 }, { type: 'weekend-diff', description: 'Weekend Differential', hours: 12, rate: 8, amount: 96 }, { type: 'expense', description: 'Parking', amount: 64 }] },
  { id: 'tc-014', providerId: 'prov-019', agencyId: 'agcy-001', facilityId: 'fac-001', assignmentId: 'asgn-001', weekEnding: '2026-04-05', submittedAt: '2026-04-06T08:45:00Z', status: 'approved', auditResult: 'pass', auditScore: 91, totalBillAmount: 3452, lineItems: [{ type: 'regular', description: 'Regular Hours', hours: 40, rate: 85, amount: 3400 }, { type: 'expense', description: 'Parking', amount: 52 }] },
  { id: 'tc-015', providerId: 'prov-001', agencyId: 'agcy-003', facilityId: 'fac-003', assignmentId: 'asgn-011', weekEnding: '2026-04-05', submittedAt: '2026-04-06T10:30:00Z', status: 'approved', auditResult: 'pass', auditScore: 93, totalBillAmount: 6660, lineItems: [{ type: 'regular', description: 'Regular Hours', hours: 36, rate: 185, amount: 6660 }] },
  { id: 'tc-016', providerId: 'prov-011', agencyId: 'agcy-001', facilityId: 'fac-001', assignmentId: 'asgn-004', weekEnding: '2026-04-05', submittedAt: '2026-04-06T11:15:00Z', status: 'approved', auditResult: 'pass', auditScore: 94, totalBillAmount: 5016, lineItems: [{ type: 'regular', description: 'Regular Hours', hours: 36, rate: 138, amount: 4968 }, { type: 'expense', description: 'Parking', amount: 48 }] },

  // ── Week ending 3/29 ──
  { id: 'tc-017', providerId: 'prov-009', agencyId: 'agcy-002', facilityId: 'fac-001', assignmentId: 'asgn-003', weekEnding: '2026-03-29', submittedAt: '2026-03-30T09:00:00Z', status: 'approved', auditResult: 'pass', auditScore: 96, totalBillAmount: 5132, lineItems: [{ type: 'regular', description: 'Regular Hours', hours: 36, rate: 128, amount: 4608 }, { type: 'night-diff', description: 'Night Differential', hours: 36, rate: 12.8, amount: 460.80 }, { type: 'expense', description: 'Parking', amount: 64 }] },
  { id: 'tc-018', providerId: 'prov-019', agencyId: 'agcy-001', facilityId: 'fac-001', assignmentId: 'asgn-001', weekEnding: '2026-03-29', submittedAt: '2026-03-30T08:30:00Z', status: 'flagged', auditResult: 'needs-review', auditScore: 65, totalBillAmount: 4217, lineItems: [{ type: 'regular', description: 'Regular Hours', hours: 40, rate: 85, amount: 3400 }, { type: 'overtime', description: 'Overtime Hours', hours: 4, rate: 127.50, amount: 510, flagged: true, flagReason: 'OT requires pre-authorization code.' }, { type: 'expense', description: 'Parking', amount: 52 }], exceptions: ['Missing OT authorization code'] },

  // ── Week ending 3/22 ──
  { id: 'tc-019', providerId: 'prov-009', agencyId: 'agcy-002', facilityId: 'fac-001', assignmentId: 'asgn-003', weekEnding: '2026-03-22', submittedAt: '2026-03-23T09:10:00Z', status: 'approved', auditResult: 'pass', auditScore: 95, totalBillAmount: 5132, lineItems: [{ type: 'regular', description: 'Regular Hours', hours: 36, rate: 128, amount: 4608 }, { type: 'night-diff', description: 'Night Differential', hours: 36, rate: 12.8, amount: 460.80 }, { type: 'expense', description: 'Parking', amount: 64 }] },

  // ── Completed assignment timecards (prov-039 at fac-004) ──
  { id: 'tc-020', providerId: 'prov-039', agencyId: 'agcy-002', facilityId: 'fac-004', assignmentId: 'asgn-007', weekEnding: '2025-12-27', submittedAt: '2025-12-28T10:00:00Z', status: 'approved', auditResult: 'pass', auditScore: 91, totalBillAmount: 4320, lineItems: [{ type: 'regular', description: 'Regular Hours', hours: 36, rate: 108, amount: 3888 }, { type: 'night-diff', description: 'Night Differential', hours: 36, rate: 12, amount: 432 }] },
  { id: 'tc-021', providerId: 'prov-039', agencyId: 'agcy-002', facilityId: 'fac-004', assignmentId: 'asgn-007', weekEnding: '2025-12-20', submittedAt: '2025-12-21T09:45:00Z', status: 'approved', auditResult: 'pass', auditScore: 89, totalBillAmount: 4716, lineItems: [{ type: 'regular', description: 'Regular Hours', hours: 36, rate: 108, amount: 3888 }, { type: 'night-diff', description: 'Night Differential', hours: 36, rate: 12, amount: 432 }, { type: 'holiday', description: 'Holiday Premium (Christmas Week)', hours: 12, rate: 33, amount: 396 }] },
  { id: 'tc-022', providerId: 'prov-039', agencyId: 'agcy-002', facilityId: 'fac-004', assignmentId: 'asgn-007', weekEnding: '2025-12-13', submittedAt: '2025-12-14T10:00:00Z', status: 'approved', auditResult: 'pass', auditScore: 93, totalBillAmount: 4320, lineItems: [{ type: 'regular', description: 'Regular Hours', hours: 36, rate: 108, amount: 3888 }, { type: 'night-diff', description: 'Night Differential', hours: 36, rate: 12, amount: 432 }] },

  // ── Per diem timecards (prov-022 at fac-006) ──
  { id: 'tc-023', providerId: 'prov-022', agencyId: 'agcy-008', facilityId: 'fac-006', assignmentId: 'asgn-008', weekEnding: '2026-01-24', submittedAt: '2026-01-25T08:00:00Z', status: 'approved', auditResult: 'pass', auditScore: 92, totalBillAmount: 736, lineItems: [{ type: 'regular', description: 'Regular Hours', hours: 8, rate: 92, amount: 736 }] },
  { id: 'tc-024', providerId: 'prov-022', agencyId: 'agcy-008', facilityId: 'fac-006', assignmentId: 'asgn-008', weekEnding: '2026-01-17', submittedAt: '2026-01-18T09:15:00Z', status: 'approved', auditResult: 'pass', auditScore: 94, totalBillAmount: 1472, lineItems: [{ type: 'regular', description: 'Regular Hours', hours: 16, rate: 92, amount: 1472 }] },

  // ── More current-week timecards for grid density ──
  { id: 'tc-025', providerId: 'prov-018', agencyId: 'agcy-002', facilityId: 'fac-004', assignmentId: 'asgn-002', weekEnding: '2026-04-19', submittedAt: '2026-04-20T10:00:00Z', status: 'approved', auditResult: 'pass', auditScore: 90, totalBillAmount: 3680, lineItems: [{ type: 'regular', description: 'Regular Hours', hours: 36, rate: 92, amount: 3312 }, { type: 'weekend-diff', description: 'Weekend Differential', hours: 12, rate: 8, amount: 96 }, { type: 'expense', description: 'Parking', amount: 32 }] },

  // ── Locums timecards with expenses ──
  { id: 'tc-026', providerId: 'prov-001', agencyId: 'agcy-003', facilityId: 'fac-003', assignmentId: 'asgn-011', weekEnding: '2026-03-29', submittedAt: '2026-03-30T11:00:00Z', status: 'approved', auditResult: 'pass', auditScore: 87, totalBillAmount: 8160, lineItems: [{ type: 'regular', description: 'Regular Hours', hours: 36, rate: 185, amount: 6660 }, { type: 'expense', description: 'Lodging', amount: 800 }, { type: 'expense', description: 'Mileage', amount: 320 }, { type: 'expense', description: 'Car Rental', amount: 380 }] },
  { id: 'tc-027', providerId: 'prov-003', agencyId: 'agcy-005', facilityId: 'fac-001', assignmentId: 'asgn-012', weekEnding: '2026-03-29', submittedAt: '2026-03-30T07:45:00Z', status: 'approved', auditResult: 'pass', auditScore: 91, totalBillAmount: 12040, lineItems: [{ type: 'regular', description: 'Regular Hours', hours: 40, rate: 285, amount: 11400 }, { type: 'on-call', description: 'On-Call (Weekend)', hours: 8, rate: 80, amount: 640 }] },

  // ── Rejected and pending for variety ──
  { id: 'tc-028', providerId: 'prov-034', agencyId: 'agcy-009', facilityId: 'fac-015', assignmentId: 'asgn-010', weekEnding: '2025-12-06', submittedAt: '2025-12-07T08:30:00Z', status: 'rejected', auditResult: 'fail', auditScore: 32, totalBillAmount: 288, lineItems: [{ type: 'regular', description: 'Regular Hours', hours: 8, rate: 24, amount: 192 }, { type: 'overtime', description: 'Overtime', hours: 4, rate: 36, amount: 144, flagged: true, flagReason: 'OT not authorized for non-clinical per diem.' }], exceptions: ['OT not authorized for non-clinical per diem', 'Submitted after deadline'] },
  { id: 'tc-029', providerId: 'prov-012', agencyId: 'agcy-004', facilityId: 'fac-005', assignmentId: 'asgn-005', weekEnding: '2026-04-12', submittedAt: '2026-04-13T09:20:00Z', status: 'pending-review', totalBillAmount: 3400, lineItems: [{ type: 'regular', description: 'Regular Hours', hours: 40, rate: 85, amount: 3400 }] },
  { id: 'tc-030', providerId: 'prov-018', agencyId: 'agcy-002', facilityId: 'fac-004', assignmentId: 'asgn-002', weekEnding: '2026-04-12', submittedAt: '2026-04-13T10:30:00Z', status: 'approved', auditResult: 'pass', auditScore: 92, totalBillAmount: 3344, lineItems: [{ type: 'regular', description: 'Regular Hours', hours: 36, rate: 92, amount: 3312 }, { type: 'expense', description: 'Parking', amount: 32 }] },
]
