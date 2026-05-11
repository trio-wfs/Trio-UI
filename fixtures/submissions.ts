// ─── Submissions ─────────────────────────────────────────────────────────────
// A provider submitted by an agency for a specific job.
// Pipeline: New → In Review → Presented → Interviewed → Offered → Accepted → On Assignment
//           Also: Client Response, Redirected, Withdrawn, Cleared

export type SubmissionStatus = 'new' | 'in-review' | 'presented' | 'interviewed' | 'offered' | 'accepted' | 'on-assignment' | 'client-response' | 'redirected' | 'withdrawn' | 'cleared'

export interface SubmissionQualityScore {
  score: number
  summary: string
  pros: string[]
  cons: string[]
}

export interface Submission {
  id: string
  providerId: string
  jobId: string
  agencyId: string
  status: SubmissionStatus
  submittedAt: string
  submittedBy: string
  rate: number
  qualityScore?: SubmissionQualityScore
}

export const submissions: Submission[] = [
  // ── Active pipeline submissions ──
  { id: 'sub-001', providerId: 'prov-009', jobId: 'job-002', agencyId: 'agcy-002', status: 'accepted', submittedAt: '2026-01-10T09:15:00Z', submittedBy: 'mellis@summitnurse.com', rate: 128, qualityScore: { score: 92, summary: 'Strong ICU candidate with CCRN certification and 7 years experience. Multi-state compact license. All credentials current.', pros: ['CCRN certified', 'Compact license covers assignment state', 'Excellent travel history'], cons: [] } },
  { id: 'sub-002', providerId: 'prov-011', jobId: 'job-004', agencyId: 'agcy-001', status: 'accepted', submittedAt: '2026-01-05T14:30:00Z', submittedBy: 'dreeves@atlasmed.com', rate: 138, qualityScore: { score: 88, summary: 'Experienced L&D nurse with RNC-OB. 11 years experience, 8 in travel. Good fit for high-acuity labor unit.', pros: ['RNC-OB certification', 'NRP certified', 'Extensive L&D experience'], cons: ['BLS expiring in 3 months'] } },
  { id: 'sub-003', providerId: 'prov-012', jobId: 'job-008', agencyId: 'agcy-004', status: 'accepted', submittedAt: '2025-11-05T10:45:00Z', submittedBy: 'swalsh@daybreak.com', rate: 85, qualityScore: { score: 90, summary: 'CNOR-certified surgical tech with cardio OR specialization. 9 years experience.', pros: ['CNOR certified', 'Cardio OR specialty match', 'Compact license'], cons: [] } },
  { id: 'sub-004', providerId: 'prov-019', jobId: 'job-001', agencyId: 'agcy-001', status: 'on-assignment', submittedAt: '2026-02-01T08:00:00Z', submittedBy: 'dreeves@atlasmed.com', rate: 85, qualityScore: { score: 85, summary: 'Certified surgical tech, cardio OR experience. Good match for position requirements.', pros: ['NBSTSA Certified', 'Cardio OR experience'], cons: ['No CNOR'] } },
  { id: 'sub-005', providerId: 'prov-014', jobId: 'job-002', agencyId: 'agcy-001', status: 'offered', submittedAt: '2026-01-12T11:20:00Z', submittedBy: 'dreeves@atlasmed.com', rate: 132, qualityScore: { score: 78, summary: 'ICU nurse with CCRN. Credentials expiring soon — BLS/ACLS due May 28.', pros: ['CCRN certified', 'Multi-state compact'], cons: ['BLS expiring in 30 days', 'ACLS expiring in 30 days'] } },
  { id: 'sub-006', providerId: 'prov-010', jobId: 'job-003', agencyId: 'agcy-002', status: 'presented', submittedAt: '2026-01-08T09:00:00Z', submittedBy: 'mellis@summitnurse.com', rate: 118, qualityScore: { score: 94, summary: 'CEN-certified ED nurse. Strong qualifications and current credentials.', pros: ['CEN certified', 'TNCC certified', 'All certifications current'], cons: [] } },
  { id: 'sub-007', providerId: 'prov-017', jobId: 'job-005', agencyId: 'agcy-001', status: 'interviewed', submittedAt: '2025-12-10T15:00:00Z', submittedBy: 'dreeves@atlasmed.com', rate: 135, qualityScore: { score: 91, summary: 'Experienced ICU travel nurse with CCRN. 10 years experience, 7 in travel.', pros: ['CCRN certified', '4-state compact coverage', 'Strong travel history'], cons: [] } },
  { id: 'sub-008', providerId: 'prov-013', jobId: 'job-007', agencyId: 'agcy-006', status: 'in-review', submittedAt: '2025-11-18T10:30:00Z', submittedBy: 'jfox@foxglove.com', rate: 95, qualityScore: { score: 72, summary: 'Med-Surg RN with 4 years experience. Limited travel history but credentials current.', pros: ['Compact license covers FL', 'BLS current'], cons: ['Only 2 years travel experience', 'No specialty certifications'] } },
  { id: 'sub-009', providerId: 'prov-015', jobId: 'job-007', agencyId: 'agcy-004', status: 'new', submittedAt: '2025-11-19T08:45:00Z', submittedBy: 'swalsh@daybreak.com', rate: 122, qualityScore: { score: 89, summary: 'CEN-certified ED nurse with PALS. Good emergency department fit.', pros: ['CEN certified', 'PALS certified', '4-state compact'], cons: [] } },
  { id: 'sub-010', providerId: 'prov-037', jobId: 'job-010', agencyId: 'agcy-006', status: 'new', submittedAt: '2025-10-12T13:15:00Z', submittedBy: 'jfox@foxglove.com', rate: 130, qualityScore: { score: 86, summary: 'CCRN-certified ICU nurse. 8 years experience with 5 in travel.', pros: ['CCRN certified', 'Good travel history'], cons: ['No OR experience'] } },

  // ── Locums submissions ──
  { id: 'sub-011', providerId: 'prov-001', jobId: 'job-018', agencyId: 'agcy-003', status: 'accepted', submittedAt: '2026-03-05T09:00:00Z', submittedBy: 'cnguyen@corvus.com', rate: 185, qualityScore: { score: 95, summary: 'Board-certified hospitalist with 14 years experience. Multi-state licensed. Excellent locums track record.', pros: ['Board Certified Internal Medicine', 'Multi-state licensed', '10 years locums experience'], cons: [] } },
  { id: 'sub-012', providerId: 'prov-003', jobId: 'job-017', agencyId: 'agcy-005', status: 'accepted', submittedAt: '2026-01-10T10:30:00Z', submittedBy: 'tbrooks@elevate.com', rate: 285, qualityScore: { score: 93, summary: 'Board-certified anesthesiologist with 21 years experience. ABA Diplomate.', pros: ['ABA Diplomate', '15 years locums experience', 'Clean malpractice history'], cons: [] } },
  { id: 'sub-013', providerId: 'prov-004', jobId: 'job-013', agencyId: 'agcy-011', status: 'in-review', submittedAt: '2026-02-28T14:00:00Z', submittedBy: 'jkestrel@kestrel.com', rate: 215, qualityScore: { score: 87, summary: 'Critical care physician with 12 years experience. Board certified.', pros: ['Board Certified Pulmonary/Critical Care', 'Multi-state licensed'], cons: ['Has not worked at this facility before'] } },
  { id: 'sub-014', providerId: 'prov-005', jobId: 'job-015', agencyId: 'agcy-005', status: 'presented', submittedAt: '2026-02-08T11:00:00Z', submittedBy: 'tbrooks@elevate.com', rate: 145, qualityScore: { score: 82, summary: 'NCCAA-certified CAA with 6 years experience. Good anesthesia match.', pros: ['NCCAA Certified', 'Multi-state licensed'], cons: ['Relatively junior — 6 years'] } },
  { id: 'sub-015', providerId: 'prov-002', jobId: 'job-019', agencyId: 'agcy-003', status: 'new', submittedAt: '2026-03-30T08:30:00Z', submittedBy: 'cnguyen@corvus.com', rate: 220, qualityScore: { score: 68, summary: 'Board-certified EM physician. Credentials expiring soon — BLS/ACLS due June 1.', pros: ['Board Certified Emergency Medicine', 'ATLS certified'], cons: ['BLS expiring in 62 days', 'ACLS expiring in 62 days'] } },
  { id: 'sub-016', providerId: 'prov-006', jobId: 'job-014', agencyId: 'agcy-014', status: 'in-review', submittedAt: '2026-02-12T09:45:00Z', submittedBy: 'anorth@northstar.com', rate: 165, qualityScore: { score: 80, summary: 'NP with FNP-BC and ACNP-BC. 15 years experience. Currently in credentialing.', pros: ['Dual NP certification', 'Extensive experience'], cons: ['Currently in credentialing — not yet cleared'] } },
  { id: 'sub-017', providerId: 'prov-008', jobId: 'job-019', agencyId: 'agcy-003', status: 'withdrawn', submittedAt: '2026-03-25T16:00:00Z', submittedBy: 'cnguyen@corvus.com', rate: 210, qualityScore: { score: 64, summary: 'EM physician — withdrew before review. Pending credentials.', pros: ['Board Certified Emergency Medicine'], cons: ['Credentials pending', 'Withdrew application'] } },

  // ── Per Diem submissions ──
  { id: 'sub-018', providerId: 'prov-022', jobId: 'job-024', agencyId: 'agcy-008', status: 'accepted', submittedAt: '2025-10-28T09:00:00Z', submittedBy: 'mhorizon@horizon.com', rate: 92 },
  { id: 'sub-019', providerId: 'prov-024', jobId: 'job-020', agencyId: 'agcy-013', status: 'accepted', submittedAt: '2026-03-28T10:15:00Z', submittedBy: 'bmaple@maplewood.com', rate: 128 },
  { id: 'sub-020', providerId: 'prov-025', jobId: 'job-022', agencyId: 'agcy-012', status: 'new', submittedAt: '2026-02-18T13:30:00Z', submittedBy: 'dlark@larkspur.com', rate: 118 },
  { id: 'sub-021', providerId: 'prov-026', jobId: 'job-030', agencyId: 'agcy-013', status: 'presented', submittedAt: '2025-11-12T11:00:00Z', submittedBy: 'bmaple@maplewood.com', rate: 72 },
  { id: 'sub-022', providerId: 'prov-027', jobId: 'job-021', agencyId: 'agcy-008', status: 'in-review', submittedAt: '2026-03-12T09:30:00Z', submittedBy: 'mhorizon@horizon.com', rate: 105 },
  { id: 'sub-023', providerId: 'prov-028', jobId: 'job-029', agencyId: 'agcy-012', status: 'new', submittedAt: '2026-01-03T08:00:00Z', submittedBy: 'dlark@larkspur.com', rate: 88 },

  // ── More Nursing/Allied for grid density ──
  { id: 'sub-024', providerId: 'prov-036', jobId: 'job-005', agencyId: 'agcy-001', status: 'new', submittedAt: '2025-12-08T10:00:00Z', submittedBy: 'dreeves@atlasmed.com', rate: 95 },
  { id: 'sub-025', providerId: 'prov-018', jobId: 'job-006', agencyId: 'agcy-002', status: 'accepted', submittedAt: '2025-11-28T14:15:00Z', submittedBy: 'mellis@summitnurse.com', rate: 92, qualityScore: { score: 76, summary: 'Early-career travel nurse. Limited experience but credentials current.', pros: ['Compact license', 'All certifications current'], cons: ['Only 1 year travel experience', 'Only 3 years total'] } },
  { id: 'sub-026', providerId: 'prov-039', jobId: 'job-011', agencyId: 'agcy-002', status: 'accepted', submittedAt: '2025-09-25T11:30:00Z', submittedBy: 'mellis@summitnurse.com', rate: 108 },
  { id: 'sub-027', providerId: 'prov-038', jobId: 'job-007', agencyId: 'agcy-009', status: 'presented', submittedAt: '2025-11-17T09:00:00Z', submittedBy: 'jiron@ironwood.com', rate: 115, qualityScore: { score: 58, summary: 'CEN-certified but credentials pending review. Short travel history.', pros: ['CEN certified', 'Multi-state compact'], cons: ['Credentials pending', 'Only 2 years travel'] } },
  { id: 'sub-028', providerId: 'prov-040', jobId: 'job-004', agencyId: 'agcy-004', status: 'in-review', submittedAt: '2026-01-06T16:00:00Z', submittedBy: 'swalsh@daybreak.com', rate: 140, qualityScore: { score: 91, summary: 'Experienced L&D nurse with RNC-OB and NRP. 10 years experience.', pros: ['RNC-OB certified', 'NRP certified', '7 years travel'], cons: [] } },
  { id: 'sub-029', providerId: 'prov-016', jobId: 'job-009', agencyId: 'agcy-006', status: 'new', submittedAt: '2025-10-26T10:30:00Z', submittedBy: 'jfox@foxglove.com', rate: 98 },
  { id: 'sub-030', providerId: 'prov-020', jobId: 'job-008', agencyId: 'agcy-004', status: 'cleared', submittedAt: '2025-11-08T13:00:00Z', submittedBy: 'swalsh@daybreak.com', rate: 78, qualityScore: { score: 84, summary: 'Certified surgical tech. Good general OR match.', pros: ['NBSTSA Certified', 'BLS current'], cons: ['No cardio OR specialty'] } },

  // ── Allied submissions ──
  { id: 'sub-031', providerId: 'prov-029', jobId: 'job-010', agencyId: 'agcy-016', status: 'redirected', submittedAt: '2025-10-10T09:00:00Z', submittedBy: 'mpine@pinecrest.com', rate: 105 },
  { id: 'sub-032', providerId: 'prov-030', jobId: 'job-005', agencyId: 'agcy-010', status: 'new', submittedAt: '2025-12-12T11:00:00Z', submittedBy: 'ajuniper@juniper.com', rate: 95 },
  { id: 'sub-033', providerId: 'prov-031', jobId: 'job-013', agencyId: 'agcy-010', status: 'new', submittedAt: '2026-02-27T08:30:00Z', submittedBy: 'ajuniper@juniper.com', rate: 88 },

  // ── Non-clinical ──
  { id: 'sub-034', providerId: 'prov-034', jobId: 'job-012', agencyId: 'agcy-009', status: 'accepted', submittedAt: '2025-09-20T10:00:00Z', submittedBy: 'jiron@ironwood.com', rate: 24 },
  { id: 'sub-035', providerId: 'prov-035', jobId: 'job-012', agencyId: 'agcy-015', status: 'new', submittedAt: '2025-09-21T11:30:00Z', submittedBy: 'moakridge@oakridge.com', rate: 22 },

  // ── Additional for volume ──
  { id: 'sub-036', providerId: 'prov-021', jobId: 'job-008', agencyId: 'agcy-009', status: 'new', submittedAt: '2025-11-09T14:00:00Z', submittedBy: 'jiron@ironwood.com', rate: 82, qualityScore: { score: 71, summary: 'Certified surgical tech. BLS expiring soon.', pros: ['NBSTSA Certified', 'Cardio OR experience'], cons: ['BLS expiring June 15'] } },
  { id: 'sub-037', providerId: 'prov-007', jobId: 'job-018', agencyId: 'agcy-017', status: 'presented', submittedAt: '2026-03-08T10:00:00Z', submittedBy: 'dridge@ridgewell.com', rate: 195, qualityScore: { score: 74, summary: 'Board-certified hospitalist with 19 years experience. Malpractice history noted.', pros: ['Board Certified Internal Medicine', '14 years locums experience'], cons: ['Malpractice history on record'] } },
  { id: 'sub-038', providerId: 'prov-032', jobId: 'job-010', agencyId: 'agcy-007', status: 'new', submittedAt: '2025-10-13T09:00:00Z', submittedBy: 'jgranite@granite.com', rate: 105 },
  { id: 'sub-039', providerId: 'prov-033', jobId: 'job-005', agencyId: 'agcy-007', status: 'new', submittedAt: '2025-12-13T10:30:00Z', submittedBy: 'jgranite@granite.com', rate: 90 },
  { id: 'sub-040', providerId: 'prov-034', jobId: 'job-009', agencyId: 'agcy-009', status: 'new', submittedAt: '2025-10-27T15:00:00Z', submittedBy: 'jiron@ironwood.com', rate: 20 },
]
