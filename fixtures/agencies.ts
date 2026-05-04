// ─── Agencies ────────────────────────────────────────────────────────────────
// Staffing agencies that supply providers. Real TRIO dev has ~35.
// Segments and tiers are multi-value (an agency can serve multiple segments/tiers).

export type Segment = 'Physician' | 'Nursing' | 'Allied' | 'Non-Clinical' | 'Per Diem'
export type AgencyTier = 'Tier 0' | 'Tier 1' | 'Tier 2' | 'Tier 3' | '1099' | 'Internal'

export interface Agency {
  id: string
  number: number
  name: string
  city: string
  state: string
  phone: string
  segments: Segment[]
  tiers: AgencyTier[]
  tags: string[]
  status: 'active' | 'inactive' | 'excluded'
  submissionCount: number
  fillRate: number
  avgQualityScore: number
}

export const agencies: Agency[] = [
  // Tier 1 — high-performing, multi-segment
  { id: 'agcy-001', number: 1, name: 'Atlas Medical Staffing', city: 'Chicago', state: 'IL', phone: '(312) 555-0192', segments: ['Physician', 'Nursing', 'Allied', 'Non-Clinical'], tiers: ['Tier 1'], tags: [], status: 'active', submissionCount: 342, fillRate: 87, avgQualityScore: 91 },
  { id: 'agcy-002', number: 2, name: 'Beacon Nurse Solutions', city: 'Milwaukee', state: 'WI', phone: '(414) 555-0274', segments: ['Nursing', 'Per Diem'], tiers: ['Tier 1'], tags: [], status: 'active', submissionCount: 289, fillRate: 84, avgQualityScore: 89 },
  { id: 'agcy-003', number: 3, name: 'Corvus Locum Group', city: 'Philadelphia', state: 'PA', phone: '(215) 555-0341', segments: ['Physician'], tiers: ['Tier 1'], tags: [], status: 'active', submissionCount: 127, fillRate: 79, avgQualityScore: 86 },
  { id: 'agcy-004', number: 4, name: 'Daybreak Health Staffing', city: 'Orlando', state: 'FL', phone: '(407) 555-0418', segments: ['Nursing', 'Allied', 'Non-Clinical'], tiers: ['Tier 1'], tags: [], status: 'active', submissionCount: 256, fillRate: 82, avgQualityScore: 88 },
  { id: 'agcy-005', number: 5, name: 'Elevate Clinical Partners', city: 'Columbus', state: 'OH', phone: '(614) 555-0523', segments: ['Physician', 'Nursing', 'Allied'], tiers: ['Tier 1'], tags: [], status: 'active', submissionCount: 198, fillRate: 80, avgQualityScore: 85 },

  // Tier 1 + Tier 2
  { id: 'agcy-006', number: 6, name: 'Foxglove Travel Nursing', city: 'Atlanta', state: 'GA', phone: '(404) 555-0637', segments: ['Nursing'], tiers: ['Tier 1', 'Tier 2'], tags: [], status: 'active', submissionCount: 312, fillRate: 76, avgQualityScore: 82 },
  { id: 'agcy-007', number: 7, name: 'Granite Staffing Group', city: 'Salt Lake City', state: 'UT', phone: '(801) 555-0745', segments: ['Nursing', 'Allied', 'Per Diem'], tiers: ['Tier 1', 'Tier 2'], tags: [], status: 'active', submissionCount: 178, fillRate: 73, avgQualityScore: 79 },

  // Tier 2
  { id: 'agcy-008', number: 8, name: 'Horizon Per Diem', city: 'Portland', state: 'OR', phone: '(503) 555-0856', segments: ['Per Diem', 'Nursing'], tiers: ['Tier 2'], tags: [], status: 'active', submissionCount: 445, fillRate: 71, avgQualityScore: 76 },
  { id: 'agcy-009', number: 9, name: 'Ironwood Medical Staffing', city: 'Tampa', state: 'FL', phone: '(813) 555-0963', segments: ['Physician', 'Nursing', 'Allied', 'Non-Clinical'], tiers: ['Tier 2'], tags: [], status: 'active', submissionCount: 201, fillRate: 69, avgQualityScore: 74 },
  { id: 'agcy-010', number: 10, name: 'Juniper Allied Health', city: 'Pittsburgh', state: 'PA', phone: '(412) 555-1074', segments: ['Allied', 'Non-Clinical'], tiers: ['Tier 2'], tags: [], status: 'active', submissionCount: 95, fillRate: 67, avgQualityScore: 72 },
  { id: 'agcy-011', number: 11, name: 'Kestrel Physician Services', city: 'Savannah', state: 'GA', phone: '(912) 555-1185', segments: ['Physician'], tiers: ['Tier 2'], tags: [], status: 'active', submissionCount: 64, fillRate: 71, avgQualityScore: 77 },
  { id: 'agcy-012', number: 12, name: 'Larkspur Clinical Staffing', city: 'Madison', state: 'WI', phone: '(608) 555-1296', segments: ['Nursing', 'Allied', 'Per Diem'], tiers: ['Tier 2'], tags: [], status: 'active', submissionCount: 167, fillRate: 65, avgQualityScore: 70 },

  // Tier 3 — lower performing or niche
  { id: 'agcy-013', number: 13, name: 'Maplewood Nursing Agency', city: 'Evanston', state: 'IL', phone: '(847) 555-1307', segments: ['Nursing', 'Per Diem'], tiers: ['Tier 3'], tags: [], status: 'active', submissionCount: 88, fillRate: 62, avgQualityScore: 66 },
  { id: 'agcy-014', number: 14, name: 'Northstar Locums', city: 'Cleveland', state: 'OH', phone: '(216) 555-1418', segments: ['Physician'], tiers: ['Tier 3'], tags: [], status: 'active', submissionCount: 41, fillRate: 58, avgQualityScore: 63 },
  { id: 'agcy-015', number: 15, name: 'Oakridge Staffing', city: 'Eugene', state: 'OR', phone: '(541) 555-1529', segments: ['Nursing', 'Non-Clinical'], tiers: ['Tier 3'], tags: [], status: 'active', submissionCount: 56, fillRate: 60, avgQualityScore: 64 },
  { id: 'agcy-016', number: 16, name: 'Pinecrest Allied Services', city: 'Provo', state: 'UT', phone: '(385) 555-1630', segments: ['Allied'], tiers: ['Tier 3'], tags: [], status: 'active', submissionCount: 33, fillRate: 55, avgQualityScore: 61 },

  // 1099 — independent contractor model
  { id: 'agcy-017', number: 17, name: 'Ridgewell Independent Physicians', city: 'Chicago', state: 'IL', phone: '(312) 555-1741', segments: ['Physician'], tiers: ['1099'], tags: [], status: 'active', submissionCount: 22, fillRate: 74, avgQualityScore: 80 },
  { id: 'agcy-018', number: 18, name: 'Summerfield 1099 Staffing', city: 'Columbus', state: 'OH', phone: '(614) 555-1852', segments: ['Physician', 'Nursing'], tiers: ['1099'], tags: [], status: 'active', submissionCount: 37, fillRate: 70, avgQualityScore: 75 },

  // Excluded / inactive
  { id: 'agcy-019', number: 19, name: 'Tidewater Health Services', city: 'Orlando', state: 'FL', phone: '(407) 555-1963', segments: ['Nursing', 'Allied', 'Non-Clinical', 'Per Diem'], tiers: ['Tier 2'], tags: ['Do Not Use'], status: 'excluded', submissionCount: 0, fillRate: 0, avgQualityScore: 0 },
  { id: 'agcy-020', number: 20, name: 'Vanguard Medical Temps', city: 'Atlanta', state: 'GA', phone: '(678) 555-2074', segments: ['Nursing', 'Per Diem'], tiers: ['Tier 2'], tags: [], status: 'inactive', submissionCount: 112, fillRate: 54, avgQualityScore: 58 },
]
