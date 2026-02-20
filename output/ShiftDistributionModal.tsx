/**
 * ShiftDistributionModal Component
 * Shift distribution with privileged provider counts and per-row notification toggles
 * 
 * Spec: /Users/jesseszygiel/.openclaw/shared-data/concepts/shift-distribution-modal-spec.md
 * Generated: 2026-02-19
 * Design System: AHTG
 */

import React, { useState, useMemo } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Checkbox,
  Grid,
  Typography,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Switch,
  Box,
  TextField,
} from '@mui/material';

// AHTG Design Tokens
const tokens = {
  colors: {
    textPrimary: '#111827',
    textSecondary: '#6B7280',
    actionPrimary: '#2563EB',
    border: '#E5E7EB',
    backgroundHover: '#F9FAFB',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
  },
  typography: {
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
      fontFamily: 'Inter',
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 400,
      fontFamily: 'Inter',
    },
  },
};

// Type Definitions
export interface AudienceWithCount {
  id: string;
  name: string;
  type: 'resourcePool' | 'tier' | 'agency' | 'program';
  providerCount: number;
  totalCount?: number; // For tier/agency context
  withProvidersCount?: number; // "with providers" subset
}

export interface AccessScheduleRow {
  id: string;
  audience: AudienceWithCount;
  startTime: Date;
  notifyNow: boolean;
}

export interface ShiftDistributionModalProps {
  open: boolean;
  onClose: () => void;
  audiences: AudienceWithCount[];
  onSchedule: (schedules: AccessScheduleRow[]) => void;
}

// Helper: Format provider count based on type
const formatProviderCount = (audience: AudienceWithCount): string => {
  if (audience.type === 'resourcePool' || audience.type === 'program') {
    return `(${audience.providerCount} providers)`;
  }
  // Tier or Agency: show context "N with Providers / M Total"
  if (audience.withProvidersCount !== undefined && audience.totalCount !== undefined) {
    return `(${audience.withProvidersCount} with Providers / ${audience.totalCount} Total)`;
  }
  return `(${audience.providerCount} providers)`;
};

// Helper: Reusable audience grid component
interface AudienceGridProps {
  audiences: AudienceWithCount[];
  type: 'resourcePool' | 'tier' | 'agency' | 'program';
  title: string;
  selectedAudiences: string[];
  onToggle: (audienceId: string) => void;
}

const AudienceGrid: React.FC<AudienceGridProps> = ({
  audiences,
  type,
  title,
  selectedAudiences,
  onToggle,
}) => {
  const filtered = audiences.filter((a) => a.type === type);

  if (filtered.length === 0) return null;

  return (
    <Box sx={{ marginBottom: tokens.spacing.md }}>
      <Typography
        variant="body2"
        sx={{
          marginBottom: tokens.spacing.sm,
          color: tokens.colors.textPrimary,
          fontWeight: 600,
        }}
      >
        {title}
      </Typography>
      <Grid container spacing={2}>
        {filtered.map((audience) => (
          <Grid item xs={12} sm={6} key={audience.id}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
              <Checkbox
                checked={selectedAudiences.includes(audience.id)}
                onChange={() => onToggle(audience.id)}
                sx={{ marginRight: tokens.spacing.sm }}
              />
              <Box>
                <Typography
                  variant="body1"
                  title={audience.name}
                  sx={{
                    color: tokens.colors.textPrimary,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    maxWidth: 200,
                  }}
                >
                  {audience.name}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: tokens.colors.textSecondary }}
                >
                  {formatProviderCount(audience)}
                </Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

// Component
export const ShiftDistributionModal: React.FC<ShiftDistributionModalProps> = ({
  open,
  onClose,
  audiences,
  onSchedule,
}) => {
  const [selectedAudiences, setSelectedAudiences] = useState<string[]>([]);
  const [accessSchedules, setAccessSchedules] = useState<AccessScheduleRow[]>([]);
  const [notifyToggles, setNotifyToggles] = useState<Record<string, boolean>>({});

  // Memoize default time to prevent re-renders changing the value
  const defaultDateTime = useMemo(
    () => new Date().toISOString().slice(0, 16),
    []
  );

  // Handle audience selection
  const handleAudienceToggle = (audienceId: string) => {
    setSelectedAudiences((prev) =>
      prev.includes(audienceId)
        ? prev.filter((id) => id !== audienceId)
        : [...prev, audienceId]
    );
  };

  // Create access schedules from selected audiences
  const handleCreateAccessSchedule = () => {
    const selectedAuds = audiences.filter((a) => selectedAudiences.includes(a.id));
    const schedules = selectedAuds.map((aud) => ({
      id: `schedule-${aud.id}`,
      audience: aud,
      startTime: new Date(),
      notifyNow: notifyToggles[aud.id] !== false, // Default ON
    }));
    setAccessSchedules(schedules);
  };

  // Handle notify toggle per row
  const handleNotifyToggle = (scheduleId: string, audience: AudienceWithCount) => {
    setNotifyToggles((prev) => ({
      ...prev,
      [audience.id]: !prev[audience.id],
    }));
  };

  // Handle final schedule action
  const handleSchedule = () => {
    onSchedule(accessSchedules);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle
        sx={{
          backgroundColor: tokens.colors.actionPrimary,
          color: 'white',
          fontSize: '1.25rem',
          fontWeight: 600,
        }}
      >
        Access Scheduling
      </DialogTitle>

      <DialogContent sx={{ padding: tokens.spacing.md }}>
        {/* Instructions */}
        <Typography
          variant="body2"
          sx={{
            marginBottom: tokens.spacing.md,
            color: tokens.colors.textPrimary,
          }}
        >
          Select audience(s) below and then select the "Create Access Schedule" action to
          schedule when access should be given. This action can be taken multiple times.
          Select "Schedule" to save your selections.
        </Typography>

        {/* Internal Section */}
        <Typography
          variant="h6"
          sx={{
            marginTop: tokens.spacing.lg,
            marginBottom: tokens.spacing.sm,
            color: tokens.colors.textPrimary,
            fontWeight: 600,
          }}
        >
          Internal
        </Typography>

        <AudienceGrid
          audiences={audiences}
          type="resourcePool"
          title="Resource Pools"
          selectedAudiences={selectedAudiences}
          onToggle={handleAudienceToggle}
        />

        {/* External Section */}
        <Typography
          variant="h6"
          sx={{
            marginTop: tokens.spacing.lg,
            marginBottom: tokens.spacing.sm,
            color: tokens.colors.textPrimary,
            fontWeight: 600,
          }}
        >
          External
        </Typography>

        <AudienceGrid
          audiences={audiences}
          type="tier"
          title="Tier List"
          selectedAudiences={selectedAudiences}
          onToggle={handleAudienceToggle}
        />

        {/* Create Access Schedule Button */}
        <Button
          variant="contained"
          fullWidth
          onClick={handleCreateAccessSchedule}
          disabled={selectedAudiences.length === 0}
          sx={{
            backgroundColor: tokens.colors.actionPrimary,
            color: 'white',
            padding: `${tokens.spacing.sm}px ${tokens.spacing.md}px`,
            marginBottom: tokens.spacing.lg,
            textTransform: 'none',
            fontSize: '1rem',
          }}
        >
          Create Access Schedule
        </Button>

        {/* Access Schedules Section */}
        <Typography
          variant="h6"
          sx={{
            marginTop: tokens.spacing.lg,
            marginBottom: tokens.spacing.sm,
            color: tokens.colors.textPrimary,
            fontWeight: 600,
          }}
        >
          Access Schedules
        </Typography>

        <Typography
          variant="body2"
          sx={{
            marginBottom: tokens.spacing.md,
            color: tokens.colors.textSecondary,
          }}
        >
          Select audience(s) above and establish a timeframe to give access with
          notification.
        </Typography>

        {/* Access Schedules Table */}
        {accessSchedules.length > 0 ? (
          <Table
            sx={{
              marginBottom: tokens.spacing.lg,
              '& tr': {
                height: 56,
                borderBottom: `1px solid ${tokens.colors.border}`,
              },
              '& tr:hover': {
                backgroundColor: tokens.colors.backgroundHover,
              },
            }}
          >
            <TableBody>
              {accessSchedules.map((schedule) => (
                <TableRow key={schedule.id}>
                  {/* Audience Name + Provider Count */}
                  <TableCell
                    sx={{
                      padding: `${tokens.spacing.sm}px ${tokens.spacing.md}px`,
                      border: 'none',
                      width: '40%',
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{ color: tokens.colors.textPrimary }}
                    >
                      {schedule.audience.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: tokens.colors.textSecondary }}
                    >
                      {formatProviderCount(schedule.audience)}
                    </Typography>
                  </TableCell>

                  {/* Time Selector */}
                  <TableCell
                    sx={{
                      padding: `${tokens.spacing.sm}px ${tokens.spacing.md}px`,
                      border: 'none',
                      width: '35%',
                    }}
                  >
                    <TextField
                      type="datetime-local"
                      defaultValue={defaultDateTime}
                      size="small"
                      variant="outlined"
                      sx={{ width: '100%' }}
                    />
                  </TableCell>

                  {/* Also Notify Now Toggle */}
                  <TableCell
                    sx={{
                      padding: `${tokens.spacing.sm}px ${tokens.spacing.md}px`,
                      border: 'none',
                      textAlign: 'right',
                      width: '25%',
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                      <Typography
                        variant="body2"
                        sx={{
                          marginRight: tokens.spacing.sm,
                          color: tokens.colors.textPrimary,
                        }}
                      >
                        Also notify now
                      </Typography>
                      <Switch
                        checked={notifyToggles[schedule.audience.id] !== false}
                        onChange={() =>
                          handleNotifyToggle(schedule.id, schedule.audience)
                        }
                        disabled={schedule.audience.providerCount === 0}
                        size="small"
                        sx={{
                          '& .MuiSwitch-switchBase.Mui-checked': {
                            color: tokens.colors.actionPrimary,
                          },
                          '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                            backgroundColor: tokens.colors.actionPrimary,
                          },
                        }}
                      />
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <Typography
            variant="body2"
            sx={{
              textAlign: 'center',
              padding: tokens.spacing.lg,
              color: tokens.colors.textSecondary,
              marginBottom: tokens.spacing.lg,
            }}
          >
            No Audiences Selected
          </Typography>
        )}
      </DialogContent>

      <DialogActions
        sx={{
          padding: tokens.spacing.md,
          borderTop: `1px solid ${tokens.colors.border}`,
        }}
      >
        <Button
          variant="outlined"
          onClick={onClose}
          sx={{
            color: tokens.colors.actionPrimary,
            borderColor: tokens.colors.border,
            textTransform: 'none',
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSchedule}
          disabled={accessSchedules.length === 0}
          sx={{
            backgroundColor: tokens.colors.actionPrimary,
            color: 'white',
            textTransform: 'none',
          }}
        >
          Schedule
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ShiftDistributionModal;
