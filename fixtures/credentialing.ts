// ─── Credentialing ───────────────────────────────────────────────────────────
// Per provider per facility. Tracks credential verification progress.
// % Complete broken into 3 tracks: Agency, Trio, Client.

export type PrivilegeStatus = 'in-credentialing' | 'offer-accepted' | 'temp-in-credentialing' | 'privileged' | 'expired'
export type CredentialItemStatus = 'complete' | 'incomplete' | 'pending' | 'waived'

export interface CredentialItem {
  name: string
  note?: string
  timeframe?: string
  expirationDate?: string
  expired?: boolean
  status: CredentialItemStatus
}

export interface CredentialingManager {
  name: string
  email: string
  role: string
}

export interface CredentialingRecord {
  id: string
  providerId: string
  facilityId: string
  jobId: string
  privilegeStatus: PrivilegeStatus
  credentialingStartDate?: string
  credentialingDueDate?: string
  estStartDate?: string
  manager?: CredentialingManager
  percentComplete: { agency: number; trio: number; client: number }
  credentials: CredentialItem[]
}

export const credentialingRecords: CredentialingRecord[] = [
  // ── Fully credentialed / privileged ──
  { id: 'cred-001', providerId: 'prov-001', facilityId: 'fac-003', jobId: 'job-018', privilegeStatus: 'privileged', credentialingStartDate: '2026-02-01', manager: { name: 'Linda Torres', email: 'ltorres@trio.com', role: 'Credentialing Manager' }, percentComplete: { agency: 100, trio: 100, client: 100 }, credentials: [{ name: 'Medical License', status: 'complete', expirationDate: '2028-03-15' }, { name: 'DEA Certificate', status: 'complete', expirationDate: '2027-11-20' }, { name: 'Board Certification', status: 'complete', expirationDate: '2028-06-01' }, { name: 'BLS', status: 'complete', expirationDate: '2027-03-15' }, { name: 'ACLS', status: 'complete', expirationDate: '2027-03-15' }, { name: 'Malpractice Insurance', status: 'complete', expirationDate: '2027-01-01' }, { name: 'Background Check', status: 'complete' }, { name: 'Drug Screen', status: 'complete' }] },
  { id: 'cred-002', providerId: 'prov-003', facilityId: 'fac-001', jobId: 'job-017', privilegeStatus: 'privileged', credentialingStartDate: '2025-12-15', manager: { name: 'Karen Walsh', email: 'kwalsh@trio.com', role: 'Credentialing Manager' }, percentComplete: { agency: 100, trio: 100, client: 100 }, credentials: [{ name: 'Medical License', status: 'complete', expirationDate: '2028-11-20' }, { name: 'DEA Certificate', status: 'complete', expirationDate: '2027-06-30' }, { name: 'Board Certification', status: 'complete', expirationDate: '2029-01-01' }, { name: 'BLS', status: 'complete', expirationDate: '2027-11-20' }, { name: 'ACLS', status: 'complete', expirationDate: '2027-11-20' }, { name: 'Malpractice Insurance', status: 'complete', expirationDate: '2027-03-01' }, { name: 'Background Check', status: 'complete' }, { name: 'Drug Screen', status: 'complete' }] },
  { id: 'cred-003', providerId: 'prov-009', facilityId: 'fac-001', jobId: 'job-002', privilegeStatus: 'privileged', credentialingStartDate: '2025-12-20', manager: { name: 'Karen Walsh', email: 'kwalsh@trio.com', role: 'Credentialing Manager' }, percentComplete: { agency: 100, trio: 100, client: 100 }, credentials: [{ name: 'State License - IL', status: 'complete', expirationDate: '2028-01-10' }, { name: 'BLS', status: 'complete', expirationDate: '2027-01-10' }, { name: 'ACLS', status: 'complete', expirationDate: '2027-01-10' }, { name: 'CCRN', status: 'complete', expirationDate: '2027-08-15' }, { name: 'Background Check', status: 'complete' }, { name: 'Drug Screen', status: 'complete' }, { name: 'TB Test', status: 'complete', expirationDate: '2026-12-20' }] },

  // ── In Credentialing — partial progress ──
  { id: 'cred-004', providerId: 'prov-006', facilityId: 'fac-015', jobId: 'job-014', privilegeStatus: 'in-credentialing', credentialingStartDate: '2026-02-14', credentialingDueDate: '2026-04-14', estStartDate: '2026-04-20', manager: { name: 'Beth Conroy', email: 'bconroy@trio.com', role: 'Credentialing Manager' }, percentComplete: { agency: 60, trio: 40, client: 0 }, credentials: [{ name: 'State License - OH', status: 'complete', expirationDate: '2028-09-08' }, { name: 'NP Certification (FNP-BC)', status: 'complete', expirationDate: '2027-12-01' }, { name: 'NP Certification (ACNP-BC)', status: 'complete', expirationDate: '2027-12-01' }, { name: 'DEA Certificate', status: 'incomplete', note: 'Awaiting agency submission' }, { name: 'BLS', status: 'complete', expirationDate: '2027-01-30' }, { name: 'ACLS', status: 'complete', expirationDate: '2027-01-30' }, { name: 'Background Check', status: 'pending', note: 'Submitted to vendor' }, { name: 'Drug Screen', status: 'incomplete' }, { name: 'Facility Orientation', status: 'incomplete' }] },
  { id: 'cred-005', providerId: 'prov-004', facilityId: 'fac-013', jobId: 'job-013', privilegeStatus: 'in-credentialing', credentialingStartDate: '2026-03-01', credentialingDueDate: '2026-05-01', manager: { name: 'Joanne Price', email: 'jprice@trio.com', role: 'Credentialing Manager' }, percentComplete: { agency: 75, trio: 50, client: 25 }, credentials: [{ name: 'Medical License - PA', status: 'complete', expirationDate: '2028-05-30' }, { name: 'Board Certification', status: 'complete', expirationDate: '2028-10-01' }, { name: 'BLS', status: 'complete', expirationDate: '2027-08-10' }, { name: 'ACLS', status: 'complete', expirationDate: '2027-08-10' }, { name: 'Malpractice Insurance', status: 'pending', note: 'Policy renewal in progress' }, { name: 'DEA Certificate', status: 'complete', expirationDate: '2027-04-15' }, { name: 'Background Check', status: 'complete' }, { name: 'Drug Screen', status: 'pending' }, { name: 'Facility Privileges Application', status: 'incomplete', note: 'Client reviewing application' }] },
  { id: 'cred-006', providerId: 'prov-005', facilityId: 'fac-011', jobId: 'job-015', privilegeStatus: 'in-credentialing', credentialingStartDate: '2026-02-10', credentialingDueDate: '2026-04-10', manager: { name: 'Amy Larsen', email: 'alarsen@trio.com', role: 'Credentialing Manager' }, percentComplete: { agency: 50, trio: 25, client: 0 }, credentials: [{ name: 'NCCAA Certification', status: 'complete', expirationDate: '2028-04-22' }, { name: 'State License - UT', status: 'incomplete', note: 'Application submitted, awaiting state board' }, { name: 'BLS', status: 'complete', expirationDate: '2027-04-22' }, { name: 'ACLS', status: 'complete', expirationDate: '2027-04-22' }, { name: 'Background Check', status: 'incomplete' }, { name: 'Drug Screen', status: 'incomplete' }, { name: 'Facility Privileges Application', status: 'incomplete' }] },

  // ── Offer Accepted — just starting credentialing ──
  { id: 'cred-007', providerId: 'prov-017', facilityId: 'fac-003', jobId: 'job-005', privilegeStatus: 'offer-accepted', manager: { name: 'Linda Torres', email: 'ltorres@trio.com', role: 'Credentialing Manager' }, percentComplete: { agency: 0, trio: 0, client: 0 }, credentials: [{ name: 'State License - WI', status: 'incomplete' }, { name: 'BLS', status: 'incomplete' }, { name: 'ACLS', status: 'incomplete' }, { name: 'CCRN', status: 'incomplete' }, { name: 'Background Check', status: 'incomplete' }, { name: 'Drug Screen', status: 'incomplete' }] },
  { id: 'cred-008', providerId: 'prov-010', facilityId: 'fac-002', jobId: 'job-003', privilegeStatus: 'offer-accepted', percentComplete: { agency: 0, trio: 0, client: 0 }, credentials: [{ name: 'State License - IL', status: 'incomplete' }, { name: 'BLS', status: 'incomplete' }, { name: 'ACLS', status: 'incomplete' }, { name: 'CEN', status: 'incomplete' }, { name: 'Background Check', status: 'incomplete' }, { name: 'Drug Screen', status: 'incomplete' }] },

  // ── Expired credentials — needs renewal ──
  { id: 'cred-009', providerId: 'prov-014', facilityId: 'fac-001', jobId: 'job-002', privilegeStatus: 'in-credentialing', credentialingStartDate: '2026-01-15', credentialingDueDate: '2026-03-15', manager: { name: 'Karen Walsh', email: 'kwalsh@trio.com', role: 'Credentialing Manager' }, percentComplete: { agency: 80, trio: 60, client: 50 }, credentials: [{ name: 'State License - IL', status: 'complete', expirationDate: '2028-08-25' }, { name: 'BLS', status: 'incomplete', expirationDate: '2026-05-28', expired: true, note: 'EXPIRED — renewal required before start' }, { name: 'ACLS', status: 'incomplete', expirationDate: '2026-05-28', expired: true, note: 'EXPIRED — renewal required before start' }, { name: 'CCRN', status: 'complete', expirationDate: '2027-03-15' }, { name: 'Background Check', status: 'complete' }, { name: 'Drug Screen', status: 'complete' }] },
  { id: 'cred-010', providerId: 'prov-002', facilityId: 'fac-005', jobId: 'job-019', privilegeStatus: 'in-credentialing', credentialingStartDate: '2026-03-31', manager: { name: 'Sandra Mejia', email: 'smejia@trio.com', role: 'Credentialing Manager' }, percentComplete: { agency: 30, trio: 10, client: 0 }, credentials: [{ name: 'Medical License - FL', status: 'incomplete', note: 'Awaiting state verification' }, { name: 'Board Certification', status: 'complete', expirationDate: '2028-07-14' }, { name: 'BLS', status: 'incomplete', expirationDate: '2026-06-01', expired: true, note: 'Expiring — must renew before credentialing completes' }, { name: 'ACLS', status: 'incomplete', expirationDate: '2026-06-01', expired: true, note: 'Expiring — must renew' }, { name: 'DEA Certificate', status: 'incomplete' }, { name: 'Malpractice Insurance', status: 'incomplete' }, { name: 'Background Check', status: 'incomplete' }, { name: 'Drug Screen', status: 'incomplete' }] },

  // ── Travel nursing credentialing ──
  { id: 'cred-011', providerId: 'prov-011', facilityId: 'fac-001', jobId: 'job-004', privilegeStatus: 'privileged', credentialingStartDate: '2025-12-10', manager: { name: 'Karen Walsh', email: 'kwalsh@trio.com', role: 'Credentialing Manager' }, percentComplete: { agency: 100, trio: 100, client: 100 }, credentials: [{ name: 'State License - IL', status: 'complete', expirationDate: '2028-06-15' }, { name: 'BLS', status: 'complete', expirationDate: '2026-07-30' }, { name: 'RNC-OB', status: 'complete', expirationDate: '2027-09-01' }, { name: 'NRP', status: 'complete', expirationDate: '2027-05-15' }, { name: 'Background Check', status: 'complete' }, { name: 'Drug Screen', status: 'complete' }, { name: 'TB Test', status: 'complete', expirationDate: '2026-12-10' }] },
  { id: 'cred-012', providerId: 'prov-012', facilityId: 'fac-005', jobId: 'job-008', privilegeStatus: 'privileged', credentialingStartDate: '2025-10-20', manager: { name: 'Sandra Mejia', email: 'smejia@trio.com', role: 'Credentialing Manager' }, percentComplete: { agency: 100, trio: 100, client: 100 }, credentials: [{ name: 'State License - FL', status: 'complete', expirationDate: '2028-02-19' }, { name: 'BLS', status: 'complete', expirationDate: '2027-05-14' }, { name: 'CNOR', status: 'complete', expirationDate: '2027-11-01' }, { name: 'Background Check', status: 'complete' }, { name: 'Drug Screen', status: 'complete' }] },
  { id: 'cred-013', providerId: 'prov-019', facilityId: 'fac-001', jobId: 'job-001', privilegeStatus: 'privileged', credentialingStartDate: '2025-12-05', manager: { name: 'Karen Walsh', email: 'kwalsh@trio.com', role: 'Credentialing Manager' }, percentComplete: { agency: 100, trio: 100, client: 100 }, credentials: [{ name: 'State License - IL', status: 'complete', expirationDate: '2028-07-13' }, { name: 'BLS', status: 'complete', expirationDate: '2027-04-11' }, { name: 'NBSTSA Certification', status: 'complete', expirationDate: '2028-01-01' }, { name: 'Background Check', status: 'complete' }, { name: 'Drug Screen', status: 'complete' }] },

  // ── Temp in credentialing ──
  { id: 'cred-014', providerId: 'prov-008', facilityId: 'fac-005', jobId: 'job-019', privilegeStatus: 'temp-in-credentialing', credentialingStartDate: '2026-04-01', manager: { name: 'Sandra Mejia', email: 'smejia@trio.com', role: 'Credentialing Manager' }, percentComplete: { agency: 20, trio: 0, client: 0 }, credentials: [{ name: 'Medical License - FL', status: 'pending', note: 'Temporary license issued, full pending' }, { name: 'Board Certification', status: 'complete', expirationDate: '2028-07-21' }, { name: 'BLS', status: 'incomplete', expirationDate: '2026-09-15' }, { name: 'ACLS', status: 'incomplete', expirationDate: '2026-09-15' }, { name: 'Background Check', status: 'incomplete' }, { name: 'Drug Screen', status: 'incomplete' }] },
]
