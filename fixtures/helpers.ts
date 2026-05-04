// ─── Fixture Helpers ─────────────────────────────────────────────────────────
// Lookup functions to resolve cross-references between entities.
// Use these instead of writing .find() calls in every prototype.

import { healthcareSystemGroups, healthcareSystems } from './healthcareSystems'
import { facilities, units } from './facilities'
import { agencies } from './agencies'
import { providers } from './providers'
import { jobs } from './jobs'
import { submissions } from './submissions'
import { assignments } from './assignments'
import { timecards } from './timecards'
import { credentialingRecords } from './credentialing'

// ─── Single-entity lookups ───────────────────────────────────────────────────

export const getHealthcareSystemGroup = (id: string) => healthcareSystemGroups.find(g => g.id === id)
export const getHealthcareSystem = (id: string) => healthcareSystems.find(s => s.id === id)
export const getFacility = (id: string) => facilities.find(f => f.id === id)
export const getUnit = (id: string) => units.find(u => u.id === id)
export const getAgency = (id: string) => agencies.find(a => a.id === id)
export const getProvider = (id: string) => providers.find(p => p.id === id)
export const getJob = (id: string) => jobs.find(j => j.id === id)
export const getSubmission = (id: string) => submissions.find(s => s.id === id)
export const getAssignment = (id: string) => assignments.find(a => a.id === id)

// ─── Name resolvers (for grid columns) ──────────────────────────────────────

export const getAgencyName = (id: string) => getAgency(id)?.name ?? 'Unknown Agency'
export const getFacilityName = (id: string) => getFacility(id)?.name ?? 'Unknown Facility'
export const getUnitName = (id: string) => getUnit(id)?.name ?? 'Unknown Unit'
export const getProviderName = (id: string) => {
  const p = getProvider(id)
  return p ? `${p.firstName} ${p.lastName}${p.title ? ', ' + p.title : ''}` : 'Unknown Provider'
}
export const getProviderShortName = (id: string) => {
  const p = getProvider(id)
  return p ? `${p.firstName} ${p.lastName}` : 'Unknown'
}
export const getHealthcareSystemName = (id: string) => getHealthcareSystem(id)?.name ?? 'Unknown System'

// ─── Relationship queries ───────────────────────────────────────────────────

export const getFacilitiesBySystem = (healthcareSystemId: string) =>
  facilities.filter(f => f.healthcareSystemId === healthcareSystemId)

export const getUnitsByFacility = (facilityId: string) =>
  units.filter(u => u.facilityId === facilityId)

export const getSystemsByGroup = (groupId: string) =>
  healthcareSystems.filter(s => s.groupId === groupId)

export const getProvidersByAgency = (agencyId: string) =>
  providers.filter(p => p.agencyId === agencyId)

export const getProvidersByFacility = (facilityId: string) => {
  const facilityAssignments = assignments.filter(a => a.facilityId === facilityId)
  const providerIds = [...new Set(facilityAssignments.map(a => a.providerId))]
  return providerIds.map(id => getProvider(id)).filter(Boolean)
}

export const getSubmissionsByJob = (jobId: string) =>
  submissions.filter(s => s.jobId === jobId)

export const getSubmissionsByProvider = (providerId: string) =>
  submissions.filter(s => s.providerId === providerId)

export const getSubmissionsByAgency = (agencyId: string) =>
  submissions.filter(s => s.agencyId === agencyId)

export const getAssignmentsByProvider = (providerId: string) =>
  assignments.filter(a => a.providerId === providerId)

export const getAssignmentsByFacility = (facilityId: string) =>
  assignments.filter(a => a.facilityId === facilityId)

export const getTimecardsByProvider = (providerId: string) =>
  timecards.filter(t => t.providerId === providerId)

export const getTimecardsByFacility = (facilityId: string) =>
  timecards.filter(t => t.facilityId === facilityId)

export const getTimecardsByAssignment = (assignmentId: string) =>
  timecards.filter(t => t.assignmentId === assignmentId)

export const getCredentialingByProvider = (providerId: string) =>
  credentialingRecords.filter(c => c.providerId === providerId)

export const getCredentialingByFacility = (facilityId: string) =>
  credentialingRecords.filter(c => c.facilityId === facilityId)

export const getJobsByFacility = (facilityId: string) =>
  jobs.filter(j => j.facilityId === facilityId)

// ─── Hierarchy resolver ─────────────────────────────────────────────────────
// Given a facility, return its full hierarchy path.

export const getFacilityHierarchy = (facilityId: string) => {
  const facility = getFacility(facilityId)
  if (!facility) return null
  const system = getHealthcareSystem(facility.healthcareSystemId)
  const group = system ? getHealthcareSystemGroup(system.groupId) : null
  const facilityUnits = getUnitsByFacility(facilityId)
  return { group, system, facility, units: facilityUnits }
}

// ─── Agency stats (useful for scorecard) ────────────────────────────────────

export const getAgencyStats = (agencyId: string) => {
  const agencySubmissions = getSubmissionsByAgency(agencyId)
  const agencyAssignments = assignments.filter(a => a.agencyId === agencyId)
  const agencyTimecards = timecards.filter(t => t.agencyId === agencyId)
  const agencyProviders = getProvidersByAgency(agencyId)

  return {
    totalSubmissions: agencySubmissions.length,
    activeAssignments: agencyAssignments.filter(a => a.status === 'on-assignment').length,
    completedAssignments: agencyAssignments.filter(a => a.status === 'complete').length,
    terminatedAssignments: agencyAssignments.filter(a => a.status === 'terminated').length,
    totalProviders: agencyProviders.length,
    avgQualityScore: agencySubmissions.filter(s => s.qualityScore).reduce((sum, s) => sum + (s.qualityScore?.score ?? 0), 0) / (agencySubmissions.filter(s => s.qualityScore).length || 1),
    totalBilled: agencyTimecards.reduce((sum, t) => sum + t.totalBillAmount, 0),
    flaggedTimecards: agencyTimecards.filter(t => t.status === 'flagged').length,
    rejectedTimecards: agencyTimecards.filter(t => t.status === 'rejected').length,
  }
}
