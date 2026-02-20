/**
 * ShiftDistributionModal Component - REBUILT
 * Shift distribution with privileged provider counts and per-row notification toggles
 * 
 * Spec: /Users/jesseszygiel/.openclaw/shared-data/concepts/shift-distribution-modal-spec.md
 * Rebuild: 2026-02-19
 * Design System: AHTG (Tokens + Spacing)
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
    actionPrimaryHover: '#1d4ed8',
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
    h6: {
      fontSize: '1.25rem',
      fontWeight: 600,
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
  totalCount?: number;
  withProvidersCount?: number;
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

// Helper: Format provider count
const formatProviderCount = (audience: AudienceWithCount): string => {
  if (audience.type === 'resourcePool' || audience.type === 'program') {
    return `(${audience.providerCount} providers)`;
  }
  if (audience.withProvidersCount !== undefined && audience.totalCount !== undefined) {
    return `(${audience.withProvidersCount} with Providers / ${audience.totalCount} Total)`;
  }
  return `(${audience.providerCount} providers)`;
};

// Audience Grid Component
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
        variant="h6"
        sx={{
          marginBottom: tokens.spacing.sm,
          color: tokens.colors.textPrimary,
          fontWeight: 600,
          fontSize: '0.875rem',
        }}
      >
        {title}
      </Typography>
      <Grid container spacing={2}>
        {filtered.map((audience) => (
          <Grid item xs={12} sm={6} key={audience.id}>
            <Box
              onClick={() => onToggle(audience.id)}
              sx={{
                display: 'flex',
                alignItems: 'flex-start',
                padding: `${tokens.spacing.sm}px ${tokens.spacing.md}px`,
                border: `1px solid ${tokens.colors.border}`,
                borderRadius: '4px',
                cursor: 'pointer',
                transition: 'all 0.2s',
                backgroundColor: selectedAudiences.includes(audience.id)
                  ? tokens.colors.backgroundHover
                  : 'transparent',
                '&:hover': {
                  backgroundColor: tokens.colors.backgroundHover,
                  borderColor: tokens.colors.actionPrimary,
                },
              }}
            >
              <Checkbox
                checked={selectedAudiences.includes(audience.id)}
                onChange={() => onToggle(audience.id)}
                sx={{ marginRight: tokens.spacing.sm, marginTop: '-6px' }}
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
                    maxWidth: 180,
                    fontSize: '1rem',
                    fontWeight: 400,
                  }}
                >
                  {audience.name}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: tokens.colors.textSecondary,
                    fontSize: '0.875rem',
                    marginTop: '4px',
                  }}
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

// Main Component
export const ShiftDistributionModal: React.FC<ShiftDistributionModalProps> = ({
  open,
  onClose,
  audiences,
  onSchedule,
}) => {
  const [selectedAudiences, setSelectedAudiences] = useState<string[]>([]);
  const [accessSchedules, setAccessSchedules] = useState<AccessScheduleRow[]>([]);
  const [notifyToggles, setNotifyToggles] = useState<Record<string, boolean>>({});

  const defaultDateTime = useMemo(
    () => new Date().toISOString().slice(0, 16),
    []
  );

  const handleAudienceToggle = (audienceId: string) => {
    setSelectedAudiences((prev) =>
      prev.includes(audienceId)
        ? prev.filter((id) => id !== audienceId)
        : [...prev, audienceId]
    );
  };

  const handleCreateAccessSchedule = () => {
    const selectedAuds = audiences.filter((a) => selectedAudiences.includes(a.id));
    const schedules = selectedAuds.map((aud) => ({
      id: `schedule-${aud.id}`,
      audience: aud,
      startTime: new Date(),
      notifyNow: notifyToggles[aud.id] !== false,
    }));
    setAccessSchedules(schedules);
  };

  const handleNotifyToggle = (audienceId: string) => {
    setNotifyToggles((prev) => ({
      ...prev,
      [audienceId]: !prev[audienceId],
    }));
  };

  const handleSchedule = () => {
    onSchedule(accessSchedules);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      {/* Header */}
      <DialogTitle
        sx={{
          backgroundColor: tokens.colors.actionPrimary,
          color: 'white',
          padding: `${tokens.spacing.sm}px ${tokens.spacing.md}px`,
          fontSize: '1.25rem',
          fontWeight: 600,
        }}
      >
        Access Scheduling
      </DialogTitle>

      {/* Content */}
      <DialogContent sx={{ padding: tokens.spacing.md }}>
        {/* Instructions */}
        <Typography
          variant="body2"
          sx={{
            marginBottom: tokens.spacing.md,
            color: tokens.colors.textPrimary,
            fontSize: '0.875rem',
            lineHeight: 1.5,
          }}
        >
          Select audience(s) below and then select the "Create Access Schedule" action to
          schedule when access should be given. This action can be taken multiple times.
          Select "Schedule" to save your selections.
        </Typography>

        {/* Internal Section */}
        <Typography
          sx={{
            marginTop: tokens.spacing.lg,
            marginBottom: tokens.spacing.sm,
            color: tokens.colors.textPrimary,
            fontWeight: 600,
            fontSize: '0.875rem',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
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
          sx={{
            marginTop: tokens.spacing.lg,
            marginBottom: tokens.spacing.sm,
            color: tokens.colors.textPrimary,
            fontWeight: 600,
            fontSize: '0.875rem',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
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
            marginTop: tokens.spacing.lg,
            marginBottom: tokens.spacing.lg,
            textTransform: 'none',
            fontSize: '1rem',
            fontWeight: 400,
            borderRadius: '4px',
            '&:hover': {
              backgroundColor: tokens.colors.actionPrimaryHover,
            },
            '&:disabled': {
              backgroundColor: '#D1D5DB',
              color: '#9CA3AF',
            },
          }}
        >
          Create Access Schedule
        </Button>

        {/* Access Schedules Section */}
        <Typography
          sx={{
            marginTop: tokens.spacing.lg,
            marginBottom: tokens.spacing.sm,
            color: tokens.colors.textPrimary,
            fontWeight: 600,
            fontSize: '0.875rem',
          }}
        >
          Access Schedules
        </Typography>

        <Typography
          variant="body2"
          sx={{
            marginBottom: tokens.spacing.md,
            color: tokens.colors.textSecondary,
            fontSize: '0.875rem',
          }}
        >
          Select audience(s) above and establish a timeframe to give access with
          notification.
        </Typography>

        {/* Schedules Table or Empty State */}
        {accessSchedules.length > 0 ? (
          <Table
            sx={{
              marginBottom: tokens.spacing.lg,
              borderCollapse: 'collapse',
            }}
          >
            <TableBody>
              {accessSchedules.map((schedule, index) => (
                <TableRow
                  key={schedule.id}
                  sx={{
                    height: '56px',
                    borderBottom:
                      index < accessSchedules.length - 1
                        ? `1px solid ${tokens.colors.border}`
                        : 'none',
                    '&:hover': {
                      backgroundColor: tokens.colors.backgroundHover,
                    },
                  }}
                >
                  {/* Audience Name + Provider Count */}
                  <TableCell
                    sx={{
                      padding: `${tokens.spacing.sm}px ${tokens.spacing.md}px`,
                      border: 'none',
                      width: '40%',
                      verticalAlign: 'middle',
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        color: tokens.colors.textPrimary,
                        fontSize: '1rem',
                        fontWeight: 400,
                        marginBottom: '4px',
                      }}
                    >
                      {schedule.audience.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: tokens.colors.textSecondary,
                        fontSize: '0.875rem',
                      }}
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
                      verticalAlign: 'middle',
                    }}
                  >
                    <TextField
                      type="datetime-local"
                      defaultValue={defaultDateTime}
                      size="small"
                      variant="outlined"
                      sx={{
                        width: '100%',
                        '& .MuiOutlinedInput-root': {
                          fontSize: '0.875rem',
                          '& fieldset': {
                            borderColor: tokens.colors.border,
                          },
                          '&:hover fieldset': {
                            borderColor: tokens.colors.actionPrimary,
                          },
                        },
                      }}
                    />
                  </TableCell>

                  {/* Also Notify Now Toggle */}
                  <TableCell
                    sx={{
                      padding: `${tokens.spacing.sm}px ${tokens.spacing.md}px`,
                      border: 'none',
                      width: '25%',
                      textAlign: 'right',
                      verticalAlign: 'middle',
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                      <Typography
                        variant="body2"
                        sx={{
                          marginRight: tokens.spacing.sm,
                          color: tokens.colors.textPrimary,
                          fontSize: '0.875rem',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        Also notify now
                      </Typography>
                      <Switch
                        checked={notifyToggles[schedule.audience.id] !== false}
                        onChange={() => handleNotifyToggle(schedule.audience.id)}
                        disabled={schedule.audience.providerCount === 0}
                        size="small"
                        sx={{
                          '& .MuiSwitch-switchBase': {
                            padding: '4px',
                          },
                          '& .MuiSwitch-switchBase.Mui-checked': {
                            color: tokens.colors.actionPrimary,
                          },
                          '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                            backgroundColor: tokens.colors.actionPrimary,
                          },
                          '& .MuiSwitch-switchBase.Mui-disabled': {
                            color: '#D1D5DB',
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
          <Box
            sx={{
              textAlign: 'center',
              padding: tokens.spacing.lg,
              color: tokens.colors.textSecondary,
              backgroundColor: tokens.colors.backgroundHover,
              borderRadius: '4px',
              marginBottom: tokens.spacing.lg,
              fontSize: '0.875rem',
            }}
          >
            No Audiences Selected
          </Box>
        )}
      </DialogContent>

      {/* Footer Actions */}
      <DialogActions
        sx={{
          padding: tokens.spacing.md,
          borderTop: `1px solid ${tokens.colors.border}`,
          gap: tokens.spacing.sm,
        }}
      >
        <Button
          variant="outlined"
          onClick={onClose}
          sx={{
            color: tokens.colors.actionPrimary,
            borderColor: tokens.colors.border,
            textTransform: 'none',
            fontSize: '0.875rem',
            '&:hover': {
              borderColor: tokens.colors.actionPrimary,
              backgroundColor: 'transparent',
            },
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
            fontSize: '0.875rem',
            '&:hover': {
              backgroundColor: tokens.colors.actionPrimaryHover,
            },
            '&:disabled': {
              backgroundColor: '#D1D5DB',
              color: '#9CA3AF',
            },
          }}
        >
          Schedule
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ShiftDistributionModal;
