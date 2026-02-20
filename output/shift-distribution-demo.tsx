/**
 * Shift Distribution Modal - Demo/Showcase
 * Full interactive demo with mock data
 * 
 * Run: This is a React component meant for integration in a Next.js or Create React App project
 * Or: Copy into Storybook for component documentation
 */

import React, { useState } from 'react';
import { Box, Container, Paper, Typography, Button } from '@mui/material';
import ShiftDistributionModal, {
  AudienceWithCount,
  AccessScheduleRow,
} from './ShiftDistributionModal';

// Mock Data
const MOCK_AUDIENCES: AudienceWithCount[] = [
  // Resource Pools (Internal)
  {
    id: 'pool-1',
    name: 'Resource Pool 1099',
    type: 'resourcePool',
    providerCount: 12,
  },
  {
    id: 'pool-2',
    name: 'Resource Pool 2050',
    type: 'resourcePool',
    providerCount: 8,
  },
  {
    id: 'pool-3',
    name: 'Resource Pool 3000',
    type: 'resourcePool',
    providerCount: 0, // Zero providers edge case
  },

  // Tiers (External)
  {
    id: 'tier-1',
    name: 'Tier 1 Premium',
    type: 'tier',
    providerCount: 7,
    withProvidersCount: 7,
    totalCount: 10,
  },
  {
    id: 'tier-2',
    name: 'Tier 2 Standard',
    type: 'tier',
    providerCount: 15,
    withProvidersCount: 12,
    totalCount: 20,
  },
  {
    id: 'tier-3',
    name: 'Tier 3 Basic',
    type: 'tier',
    providerCount: 5,
    withProvidersCount: 5,
    totalCount: 18,
  },
];

export const ShiftDistributionDemo: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [schedules, setSchedules] = useState<AccessScheduleRow[]>([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSchedule = (newSchedules: AccessScheduleRow[]) => {
    setSchedules(newSchedules);
    console.log('Scheduled:', newSchedules);
  };

  return (
    <Container maxWidth="sm" sx={{ paddingY: 4 }}>
      <Paper sx={{ padding: 3, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom sx={{ marginBottom: 2 }}>
          Shift Distribution Modal Demo
        </Typography>

        <Typography variant="body2" sx={{ marginBottom: 3, color: '#6B7280' }}>
          Click the button below to open the modal and interact with:
          <ul style={{ textAlign: 'left', marginTop: 8 }}>
            <li>3 Resource Pools (one with 0 providers)</li>
            <li>3 Tiers (showing "N with Providers / M Total")</li>
            <li>Select audiences → Create schedules</li>
            <li>Toggle "Also notify now" per row</li>
            <li>Schedule and see results below</li>
          </ul>
        </Typography>

        <Button
          variant="contained"
          onClick={handleOpen}
          sx={{
            backgroundColor: '#2563EB',
            color: 'white',
            padding: '12px 24px',
            textTransform: 'none',
            fontSize: '1rem',
          }}
        >
          Open Shift Distribution Modal
        </Button>

        {/* Results Section */}
        {schedules.length > 0 && (
          <Box sx={{ marginTop: 4, textAlign: 'left', padding: 2, backgroundColor: '#F9FAFB', borderRadius: 1 }}>
            <Typography variant="h6" sx={{ marginBottom: 2, color: '#111827' }}>
              Scheduled Audiences:
            </Typography>
            {schedules.map((schedule) => (
              <Box
                key={schedule.id}
                sx={{
                  padding: '12px 16px',
                  marginBottom: '8px',
                  backgroundColor: 'white',
                  border: '1px solid #E5E7EB',
                  borderRadius: '4px',
                }}
              >
                <Typography variant="body1" sx={{ color: '#111827', fontWeight: 600 }}>
                  {schedule.audience.name}
                </Typography>
                <Typography variant="body2" sx={{ color: '#6B7280' }}>
                  Providers:{' '}
                  {schedule.audience.type === 'resourcePool'
                    ? `${schedule.audience.providerCount} providers`
                    : `${schedule.audience.withProvidersCount} with Providers / ${schedule.audience.totalCount} Total`}
                </Typography>
                <Typography variant="body2" sx={{ color: '#6B7280' }}>
                  Time: {new Date(schedule.startTime).toLocaleString()}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: schedule.notifyNow ? '#4CAF50' : '#DB4537',
                    fontWeight: 600,
                  }}
                >
                  Notify Now: {schedule.notifyNow ? '✓ Yes' : '✗ No'}
                </Typography>
              </Box>
            ))}
          </Box>
        )}

        {schedules.length === 0 && (
          <Box sx={{ marginTop: 4, padding: 2, backgroundColor: '#F9FAFB', borderRadius: 1 }}>
            <Typography variant="body2" sx={{ color: '#6B7280' }}>
              No schedules created yet. Open the modal and try creating one!
            </Typography>
          </Box>
        )}
      </Paper>

      {/* Modal */}
      <ShiftDistributionModal
        open={open}
        onClose={handleClose}
        audiences={MOCK_AUDIENCES}
        onSchedule={handleSchedule}
      />
    </Container>
  );
};

export default ShiftDistributionDemo;
