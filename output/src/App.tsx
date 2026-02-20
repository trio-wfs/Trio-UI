import React, { useState } from 'react';
import { Box, Container, Paper, Typography, Button, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import ShiftDistributionModal, {
  AudienceWithCount,
  AccessScheduleRow,
} from './ShiftDistributionModal';

// AHTG Theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#2563EB',
    },
    secondary: {
      main: '#6B7280',
    },
    background: {
      default: '#F9FAFB',
    },
  },
  typography: {
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },
});

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
    providerCount: 0,
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

function App() {
  const [open, setOpen] = useState(false);
  const [schedules, setSchedules] = useState<AccessScheduleRow[]>([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSchedule = (newSchedules: AccessScheduleRow[]) => {
    setSchedules(newSchedules);
    console.log('Scheduled:', newSchedules);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="sm" sx={{ paddingY: 4 }}>
        <Paper sx={{ padding: 3, textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom sx={{ marginBottom: 2 }}>
            🛰️ Shift Distribution Modal
          </Typography>

          <Typography variant="body2" sx={{ marginBottom: 3, color: '#6B7280' }}>
            Click the button below to open the real React component with AHTG tokens and MUI styling.
          </Typography>

          <Button
            variant="contained"
            onClick={handleOpen}
            sx={{
              backgroundColor: '#2563EB',
              color: 'white',
              padding: '14px 32px',
              textTransform: 'none',
              fontSize: '1rem',
              marginBottom: 3,
            }}
          >
            Open Shift Distribution Modal
          </Button>

          {/* Results Section */}
          {schedules.length > 0 && (
            <Box
              sx={{
                marginTop: 3,
                textAlign: 'left',
                padding: 2,
                backgroundColor: '#F9FAFB',
                borderRadius: 1,
              }}
            >
              <Typography
                variant="h6"
                sx={{ marginBottom: 2, color: '#111827', fontWeight: 600 }}
              >
                Scheduled Audiences ({schedules.length}):
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
                  <Typography
                    variant="body1"
                    sx={{ color: '#111827', fontWeight: 600, marginBottom: 1 }}
                  >
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
            <Box
              sx={{
                marginTop: 3,
                padding: 2,
                backgroundColor: '#F9FAFB',
                borderRadius: 1,
              }}
            >
              <Typography variant="body2" sx={{ color: '#6B7280' }}>
                No schedules created yet. Open the modal and create one!
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
    </ThemeProvider>
  );
}

export default App;
