// ─── Facilities ──────────────────────────────────────────────────────────────
// Each belongs to a healthcare system. Real TRIO has ~64 facilities, ~71 units.

export type FacilityType = 'academic-medical-center' | 'community-hospital' | 'health-system' | 'specialty-hospital'
export type Accreditation = 'TJC' | 'DNV'

export interface Facility {
  id: string
  name: string
  healthcareSystemId: string
  type: FacilityType
  city: string
  state: string
  accreditation: Accreditation[]
  activeOrders: number
  fillRate: number
  nursingRM?: string
  alliedRM?: string
}

export const facilities: Facility[] = [
  // Lakeview Health System (IL)
  { id: 'fac-001', name: 'Lakeview General Hospital', healthcareSystemId: 'hcs-001', type: 'academic-medical-center', city: 'Chicago', state: 'IL', accreditation: ['TJC'], activeOrders: 34, fillRate: 81, nursingRM: 'Karen Walsh', alliedRM: 'Tom Briggs' },
  { id: 'fac-002', name: 'Lakeview Community Hospital', healthcareSystemId: 'hcs-001', type: 'community-hospital', city: 'Evanston', state: 'IL', accreditation: ['TJC'], activeOrders: 12, fillRate: 74 },
  // Prairie Medical Group (WI)
  { id: 'fac-003', name: 'Prairie Memorial Medical Center', healthcareSystemId: 'hcs-002', type: 'academic-medical-center', city: 'Milwaukee', state: 'WI', accreditation: ['TJC', 'DNV'], activeOrders: 28, fillRate: 78, nursingRM: 'Linda Torres' },
  { id: 'fac-004', name: 'Prairie Lakes Hospital', healthcareSystemId: 'hcs-002', type: 'community-hospital', city: 'Madison', state: 'WI', accreditation: ['TJC'], activeOrders: 9, fillRate: 85 },
  // Palmetto Health System (FL)
  { id: 'fac-005', name: 'Palmetto Regional Medical Center', healthcareSystemId: 'hcs-003', type: 'health-system', city: 'Orlando', state: 'FL', accreditation: ['TJC'], activeOrders: 42, fillRate: 72, nursingRM: 'Sandra Mejia', alliedRM: 'David Chen' },
  { id: 'fac-006', name: 'Palmetto Bayshore Hospital', healthcareSystemId: 'hcs-003', type: 'community-hospital', city: 'Tampa', state: 'FL', accreditation: ['DNV'], activeOrders: 15, fillRate: 69 },
  // Magnolia Regional Health (GA)
  { id: 'fac-007', name: "Magnolia Children's Hospital", healthcareSystemId: 'hcs-004', type: 'specialty-hospital', city: 'Atlanta', state: 'GA', accreditation: ['TJC'], activeOrders: 8, fillRate: 91, nursingRM: 'Denise Park' },
  { id: 'fac-008', name: 'Magnolia General Hospital', healthcareSystemId: 'hcs-004', type: 'community-hospital', city: 'Savannah', state: 'GA', accreditation: ['TJC', 'DNV'], activeOrders: 19, fillRate: 76 },
  // Cascade Health Partners (OR)
  { id: 'fac-009', name: 'Cascade Valley Medical Center', healthcareSystemId: 'hcs-005', type: 'academic-medical-center', city: 'Portland', state: 'OR', accreditation: ['TJC'], activeOrders: 31, fillRate: 80, nursingRM: 'Rachel Dunn', alliedRM: 'Mike Sato' },
  { id: 'fac-010', name: 'Cascade Community Hospital', healthcareSystemId: 'hcs-005', type: 'community-hospital', city: 'Eugene', state: 'OR', accreditation: ['DNV'], activeOrders: 7, fillRate: 83 },
  // Sierra Vista Medical (UT)
  { id: 'fac-011', name: 'Sierra Vista Regional Hospital', healthcareSystemId: 'hcs-006', type: 'health-system', city: 'Salt Lake City', state: 'UT', accreditation: ['TJC'], activeOrders: 22, fillRate: 77, nursingRM: 'Amy Larsen' },
  { id: 'fac-012', name: 'Sierra Vista Specialty Center', healthcareSystemId: 'hcs-006', type: 'specialty-hospital', city: 'Provo', state: 'UT', accreditation: ['TJC'], activeOrders: 5, fillRate: 88 },
  // Harborview Health Network (PA)
  { id: 'fac-013', name: 'Harborview University Hospital', healthcareSystemId: 'hcs-007', type: 'academic-medical-center', city: 'Philadelphia', state: 'PA', accreditation: ['TJC', 'DNV'], activeOrders: 38, fillRate: 75, nursingRM: 'Joanne Price', alliedRM: 'Nate Rivera' },
  { id: 'fac-014', name: 'Harborview Community Medical', healthcareSystemId: 'hcs-007', type: 'community-hospital', city: 'Pittsburgh', state: 'PA', accreditation: ['TJC'], activeOrders: 11, fillRate: 82 },
  // Ridgeline Medical System (OH)
  { id: 'fac-015', name: 'Ridgeline Medical Center', healthcareSystemId: 'hcs-008', type: 'health-system', city: 'Columbus', state: 'OH', accreditation: ['TJC', 'DNV'], activeOrders: 26, fillRate: 79, nursingRM: 'Beth Conroy' },
]

// ─── Units ───────────────────────────────────────────────────────────────────
// Specialty-specific divisions within a facility.

export interface Unit {
  id: string
  name: string
  facilityId: string
  specialty: string
}

export const units: Unit[] = [
  // Lakeview General (fac-001) — large academic center, 4 units
  { id: 'unit-001', name: 'Lakeview General - ICU', facilityId: 'fac-001', specialty: 'ICU' },
  { id: 'unit-002', name: 'Lakeview General - Emergency Room', facilityId: 'fac-001', specialty: 'Emergency Department' },
  { id: 'unit-003', name: 'Lakeview General - Cardio Operating Room', facilityId: 'fac-001', specialty: 'Cardio Operating Room' },
  { id: 'unit-004', name: 'Lakeview General - Labor & Delivery', facilityId: 'fac-001', specialty: 'Labor & Delivery' },
  // Lakeview Community (fac-002)
  { id: 'unit-005', name: 'Lakeview Community - Med-Surg', facilityId: 'fac-002', specialty: 'Med-Surg' },
  { id: 'unit-006', name: 'Lakeview Community - Telemetry', facilityId: 'fac-002', specialty: 'Telemetry' },
  // Prairie Memorial (fac-003)
  { id: 'unit-007', name: 'Prairie Memorial - ICU', facilityId: 'fac-003', specialty: 'ICU' },
  { id: 'unit-008', name: 'Prairie Memorial - Emergency Room', facilityId: 'fac-003', specialty: 'Emergency Department' },
  { id: 'unit-009', name: 'Prairie Memorial - General Operating Room', facilityId: 'fac-003', specialty: 'General Operating Room' },
  // Prairie Lakes (fac-004)
  { id: 'unit-010', name: 'Prairie Lakes - Med-Surg', facilityId: 'fac-004', specialty: 'Med-Surg' },
  { id: 'unit-011', name: 'Prairie Lakes - Step Down', facilityId: 'fac-004', specialty: 'Step Down' },
  // Palmetto Regional (fac-005)
  { id: 'unit-012', name: 'Palmetto Regional - ICU', facilityId: 'fac-005', specialty: 'ICU' },
  { id: 'unit-013', name: 'Palmetto Regional - Emergency Room', facilityId: 'fac-005', specialty: 'Emergency Department' },
  { id: 'unit-014', name: 'Palmetto Regional - Cardio Operating Room', facilityId: 'fac-005', specialty: 'Cardio Operating Room' },
  // Palmetto Bayshore (fac-006)
  { id: 'unit-015', name: 'Palmetto Bayshore - Med-Surg', facilityId: 'fac-006', specialty: 'Med-Surg' },
  // Magnolia Children's (fac-007)
  { id: 'unit-016', name: "Magnolia Children's - Pediatric ICU", facilityId: 'fac-007', specialty: 'Pediatric ICU' },
  { id: 'unit-017', name: "Magnolia Children's - Pediatric Emergency", facilityId: 'fac-007', specialty: 'Pediatric Emergency' },
  // Cascade Valley (fac-009)
  { id: 'unit-018', name: 'Cascade Valley - ICU', facilityId: 'fac-009', specialty: 'ICU' },
  { id: 'unit-019', name: 'Cascade Valley - Emergency Room', facilityId: 'fac-009', specialty: 'Emergency Department' },
  { id: 'unit-020', name: 'Cascade Valley - Anesthesia', facilityId: 'fac-009', specialty: 'Anesthesia' },
  // Sierra Vista Regional (fac-011)
  { id: 'unit-021', name: 'Sierra Vista - Emergency Room', facilityId: 'fac-011', specialty: 'Emergency Department' },
  { id: 'unit-022', name: 'Sierra Vista - General Operating Room', facilityId: 'fac-011', specialty: 'General Operating Room' },
  // Harborview University (fac-013)
  { id: 'unit-023', name: 'Harborview University - ICU', facilityId: 'fac-013', specialty: 'ICU' },
  { id: 'unit-024', name: 'Harborview University - Cardio Operating Room', facilityId: 'fac-013', specialty: 'Cardio Operating Room' },
  // Ridgeline Medical (fac-015)
  { id: 'unit-025', name: 'Ridgeline Medical - Emergency Room', facilityId: 'fac-015', specialty: 'Emergency Department' },
]
