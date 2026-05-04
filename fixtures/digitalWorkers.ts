// ─── Digital Workers ─────────────────────────────────────────────────────────
// AI-powered automation agents. Each is tied to a facility and set of policies.

export type WorkerType = 'timecard-auditor' | 'submission-evaluator-locums' | 'submission-evaluator-nursing-allied'
export type WorkerStatus = 'deployed' | 'draft' | 'paused'

export interface CapabilityToggle {
  action: 'review' | 'approve' | 'reject' | 'move-workflow'
  enabled: boolean
  confidenceThreshold?: number
}

export interface DigitalWorker {
  id: string
  name: string
  type: WorkerType
  status: WorkerStatus
  modelVersion: string
  facilityId?: string
  policyIds: string[]
  capabilities: CapabilityToggle[]
  performance: { totalProcessed: number; passRate: number; flagRate: number; rejectRate: number; avgProcessingTimeMs: number; exceptionRate: number }
  createdAt: string
  lastDeployedAt?: string
  version: number
}

export const digitalWorkers: DigitalWorker[] = [
  // ── Deployed — production ──
  { id: 'dw-001', name: 'Lakeview Timecard Auditor', type: 'timecard-auditor', status: 'deployed', modelVersion: 'trio-audit-v2.1', facilityId: 'fac-001', policyIds: ['pol-001', 'pol-002', 'pol-003', 'pol-004', 'pol-005', 'pol-006', 'pol-007', 'pol-014'], capabilities: [{ action: 'review', enabled: true }, { action: 'approve', enabled: true, confidenceThreshold: 92 }, { action: 'reject', enabled: false }, { action: 'move-workflow', enabled: false }], performance: { totalProcessed: 847, passRate: 71, flagRate: 22, rejectRate: 7, avgProcessingTimeMs: 2340, exceptionRate: 4 }, createdAt: '2026-01-08T10:00:00Z', lastDeployedAt: '2026-03-15T14:22:00Z', version: 4 },
  { id: 'dw-002', name: 'Locums Submission Evaluator', type: 'submission-evaluator-locums', status: 'deployed', modelVersion: 'trio-eval-locums-v1.3', policyIds: ['pol-008', 'pol-009', 'pol-013'], capabilities: [{ action: 'review', enabled: true }, { action: 'approve', enabled: false }, { action: 'reject', enabled: false }, { action: 'move-workflow', enabled: false }], performance: { totalProcessed: 312, passRate: 64, flagRate: 28, rejectRate: 8, avgProcessingTimeMs: 3810, exceptionRate: 6 }, createdAt: '2026-02-14T09:00:00Z', lastDeployedAt: '2026-04-01T11:00:00Z', version: 2 },
  { id: 'dw-003', name: 'Prairie Timecard Auditor', type: 'timecard-auditor', status: 'deployed', modelVersion: 'trio-audit-v2.1', facilityId: 'fac-003', policyIds: ['pol-001', 'pol-002', 'pol-003', 'pol-004', 'pol-005', 'pol-006', 'pol-012', 'pol-014'], capabilities: [{ action: 'review', enabled: true }, { action: 'approve', enabled: true, confidenceThreshold: 90 }, { action: 'reject', enabled: false }, { action: 'move-workflow', enabled: false }], performance: { totalProcessed: 523, passRate: 74, flagRate: 19, rejectRate: 7, avgProcessingTimeMs: 2180, exceptionRate: 3 }, createdAt: '2026-01-15T11:00:00Z', lastDeployedAt: '2026-03-20T09:00:00Z', version: 3 },
  { id: 'dw-004', name: 'Palmetto Timecard Auditor', type: 'timecard-auditor', status: 'deployed', modelVersion: 'trio-audit-v2.0', facilityId: 'fac-005', policyIds: ['pol-001', 'pol-002', 'pol-003', 'pol-005', 'pol-006'], capabilities: [{ action: 'review', enabled: true }, { action: 'approve', enabled: false }, { action: 'reject', enabled: false }, { action: 'move-workflow', enabled: false }], performance: { totalProcessed: 198, passRate: 68, flagRate: 25, rejectRate: 7, avgProcessingTimeMs: 2890, exceptionRate: 5 }, createdAt: '2026-02-01T14:00:00Z', lastDeployedAt: '2026-03-10T16:00:00Z', version: 2 },

  // ── Draft — in development ──
  { id: 'dw-005', name: 'Nursing & Allied Submission Evaluator', type: 'submission-evaluator-nursing-allied', status: 'draft', modelVersion: 'trio-eval-nursing-v0.9', policyIds: ['pol-008', 'pol-009', 'pol-013'], capabilities: [{ action: 'review', enabled: true }, { action: 'approve', enabled: false }, { action: 'reject', enabled: false }, { action: 'move-workflow', enabled: false }], performance: { totalProcessed: 0, passRate: 0, flagRate: 0, rejectRate: 0, avgProcessingTimeMs: 0, exceptionRate: 0 }, createdAt: '2026-04-10T14:00:00Z', version: 1 },
  { id: 'dw-006', name: 'Ridgeline Timecard Auditor', type: 'timecard-auditor', status: 'draft', modelVersion: 'trio-audit-v2.1', facilityId: 'fac-015', policyIds: ['pol-001', 'pol-002', 'pol-003', 'pol-004', 'pol-005', 'pol-006', 'pol-011'], capabilities: [{ action: 'review', enabled: true }, { action: 'approve', enabled: false }, { action: 'reject', enabled: false }, { action: 'move-workflow', enabled: false }], performance: { totalProcessed: 0, passRate: 0, flagRate: 0, rejectRate: 0, avgProcessingTimeMs: 0, exceptionRate: 0 }, createdAt: '2026-04-15T10:00:00Z', version: 1 },

  // ── Paused ──
  { id: 'dw-007', name: 'Cascade Timecard Auditor', type: 'timecard-auditor', status: 'paused', modelVersion: 'trio-audit-v1.8', facilityId: 'fac-009', policyIds: ['pol-001', 'pol-002', 'pol-003', 'pol-005', 'pol-006'], capabilities: [{ action: 'review', enabled: true }, { action: 'approve', enabled: true, confidenceThreshold: 95 }, { action: 'reject', enabled: false }, { action: 'move-workflow', enabled: false }], performance: { totalProcessed: 89, passRate: 66, flagRate: 27, rejectRate: 7, avgProcessingTimeMs: 3200, exceptionRate: 8 }, createdAt: '2025-12-01T09:00:00Z', lastDeployedAt: '2026-02-15T10:00:00Z', version: 2 },
  { id: 'dw-008', name: 'Harborview Timecard Auditor', type: 'timecard-auditor', status: 'paused', modelVersion: 'trio-audit-v2.0', facilityId: 'fac-013', policyIds: ['pol-001', 'pol-003', 'pol-005', 'pol-006', 'pol-007'], capabilities: [{ action: 'review', enabled: true }, { action: 'approve', enabled: false }, { action: 'reject', enabled: false }, { action: 'move-workflow', enabled: false }], performance: { totalProcessed: 145, passRate: 70, flagRate: 23, rejectRate: 7, avgProcessingTimeMs: 2650, exceptionRate: 5 }, createdAt: '2026-01-20T11:00:00Z', lastDeployedAt: '2026-03-01T14:00:00Z', version: 2 },
]
