import React, { useState } from 'react';
import { SearchInput } from './search-input-component';
import { Box, Typography, Paper, Divider } from '@mui/material';

/**
 * SearchInput Component Examples
 * 
 * Comprehensive showcase of all SearchInput variants, sizes, and states
 * following AHTG design system specifications.
 */

export const SearchInputExamples: React.FC = () => {
  const [basicSearch, setBasicSearch] = useState('');
  const [physicianSearch, setPhysicianSearch] = useState('');
  const [credentialSearch, setCredentialSearch] = useState('');
  const [facilitySearch, setFacilitySearch] = useState('');
  const [errorSearch, setErrorSearch] = useState('invalid search term');
  const [filledSearch, setFilledSearch] = useState('');

  return (
    <Box sx={{ padding: '40px', backgroundColor: '#F5F5F5', minHeight: '100vh' }}>
      <Typography variant="h4" sx={{ marginBottom: '32px', fontFamily: 'Roboto' }}>
        SearchInput Component Examples
      </Typography>

      {/* Size Variants */}
      <Paper sx={{ padding: '24px', marginBottom: '24px' }}>
        <Typography variant="h6" sx={{ marginBottom: '16px', fontFamily: 'Roboto' }}>
          Size Variants
        </Typography>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Box>
            <Typography variant="body2" sx={{ marginBottom: '8px', color: '#757575' }}>
              Medium (default) - 40px height
            </Typography>
            <SearchInput
              size="md"
              placeholder="Search physicians, facilities, credentials..."
              value={basicSearch}
              onChange={(e) => setBasicSearch(e.target.value)}
            />
          </Box>

          <Box>
            <Typography variant="body2" sx={{ marginBottom: '8px', color: '#757575' }}>
              Small - 32px height
            </Typography>
            <SearchInput
              size="sm"
              placeholder="Quick search..."
              value={basicSearch}
              onChange={(e) => setBasicSearch(e.target.value)}
            />
          </Box>
        </Box>
      </Paper>

      {/* Variant Types */}
      <Paper sx={{ padding: '24px', marginBottom: '24px' }}>
        <Typography variant="h6" sx={{ marginBottom: '16px', fontFamily: 'Roboto' }}>
          Variant Types
        </Typography>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Box>
            <Typography variant="body2" sx={{ marginBottom: '8px', color: '#757575' }}>
              Outlined (default)
            </Typography>
            <SearchInput
              variant="outlined"
              placeholder="Search with outlined variant..."
              value={basicSearch}
              onChange={(e) => setBasicSearch(e.target.value)}
            />
          </Box>

          <Box>
            <Typography variant="body2" sx={{ marginBottom: '8px', color: '#757575' }}>
              Filled
            </Typography>
            <SearchInput
              variant="filled"
              placeholder="Search with filled variant..."
              value={filledSearch}
              onChange={(e) => setFilledSearch(e.target.value)}
            />
          </Box>
        </Box>
      </Paper>

      {/* State Examples */}
      <Paper sx={{ padding: '24px', marginBottom: '24px' }}>
        <Typography variant="h6" sx={{ marginBottom: '16px', fontFamily: 'Roboto' }}>
          States
        </Typography>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Box>
            <Typography variant="body2" sx={{ marginBottom: '8px', color: '#757575' }}>
              Default State
            </Typography>
            <SearchInput
              placeholder="Default state..."
              value={basicSearch}
              onChange={(e) => setBasicSearch(e.target.value)}
            />
          </Box>

          <Box>
            <Typography variant="body2" sx={{ marginBottom: '8px', color: '#757575' }}>
              Error State
            </Typography>
            <SearchInput
              error
              placeholder="Search..."
              value={errorSearch}
              onChange={(e) => setErrorSearch(e.target.value)}
            />
          </Box>

          <Box>
            <Typography variant="body2" sx={{ marginBottom: '8px', color: '#757575' }}>
              Disabled State
            </Typography>
            <SearchInput
              disabled
              placeholder="Search disabled..."
              value="Cannot edit this"
            />
          </Box>

          <Box>
            <Typography variant="body2" sx={{ marginBottom: '8px', color: '#757575' }}>
              Focus State (click to see)
            </Typography>
            <SearchInput
              placeholder="Click to focus..."
              value={basicSearch}
              onChange={(e) => setBasicSearch(e.target.value)}
            />
          </Box>
        </Box>
      </Paper>

      {/* Error State - Filled Variant */}
      <Paper sx={{ padding: '24px', marginBottom: '24px' }}>
        <Typography variant="h6" sx={{ marginBottom: '16px', fontFamily: 'Roboto' }}>
          Error States - Both Variants
        </Typography>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Box>
            <Typography variant="body2" sx={{ marginBottom: '8px', color: '#757575' }}>
              Outlined - Error
            </Typography>
            <SearchInput
              variant="outlined"
              error
              placeholder="Search..."
              value={errorSearch}
              onChange={(e) => setErrorSearch(e.target.value)}
            />
          </Box>

          <Box>
            <Typography variant="body2" sx={{ marginBottom: '8px', color: '#757575' }}>
              Filled - Error
            </Typography>
            <SearchInput
              variant="filled"
              error
              placeholder="Search..."
              value={errorSearch}
              onChange={(e) => setErrorSearch(e.target.value)}
            />
          </Box>
        </Box>
      </Paper>

      {/* Icon Visibility */}
      <Paper sx={{ padding: '24px', marginBottom: '24px' }}>
        <Typography variant="h6" sx={{ marginBottom: '16px', fontFamily: 'Roboto' }}>
          Icon Options
        </Typography>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Box>
            <Typography variant="body2" sx={{ marginBottom: '8px', color: '#757575' }}>
              With Search Icon (default)
            </Typography>
            <SearchInput
              placeholder="Search with icon..."
              value={basicSearch}
              onChange={(e) => setBasicSearch(e.target.value)}
            />
          </Box>

          <Box>
            <Typography variant="body2" sx={{ marginBottom: '8px', color: '#757575' }}>
              Without Icon
            </Typography>
            <SearchInput
              hideIcon
              placeholder="Filter..."
              value={basicSearch}
              onChange={(e) => setBasicSearch(e.target.value)}
            />
          </Box>
        </Box>
      </Paper>

      {/* Real-World Use Cases */}
      <Paper sx={{ padding: '24px', marginBottom: '24px' }}>
        <Typography variant="h6" sx={{ marginBottom: '16px', fontFamily: 'Roboto' }}>
          Healthcare VMS Use Cases
        </Typography>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Box>
            <Typography variant="body2" sx={{ marginBottom: '8px', color: '#757575' }}>
              Physician Search
            </Typography>
            <SearchInput
              size="md"
              variant="outlined"
              placeholder="Search by name, specialty, or license number..."
              value={physicianSearch}
              onChange={(e) => setPhysicianSearch(e.target.value)}
              aria-label="Search physicians"
            />
          </Box>

          <Box>
            <Typography variant="body2" sx={{ marginBottom: '8px', color: '#757575' }}>
              Credential Lookup
            </Typography>
            <SearchInput
              size="md"
              variant="filled"
              placeholder="Search credentials by type, status, or expiration..."
              value={credentialSearch}
              onChange={(e) => setCredentialSearch(e.target.value)}
              aria-label="Search credentials"
            />
          </Box>

          <Box>
            <Typography variant="body2" sx={{ marginBottom: '8px', color: '#757575' }}>
              Facility Quick Filter (Compact)
            </Typography>
            <SearchInput
              size="sm"
              variant="outlined"
              placeholder="Filter facilities..."
              value={facilitySearch}
              onChange={(e) => setFacilitySearch(e.target.value)}
              aria-label="Filter facilities"
            />
          </Box>

          <Box>
            <Typography variant="body2" sx={{ marginBottom: '8px', color: '#757575' }}>
              Global Search (Toolbar)
            </Typography>
            <SearchInput
              size="sm"
              variant="outlined"
              hideIcon={false}
              placeholder="Global search..."
              value={basicSearch}
              onChange={(e) => setBasicSearch(e.target.value)}
              sx={{ width: '300px' }}
              aria-label="Global search"
            />
          </Box>
        </Box>
      </Paper>

      {/* Size x Variant Matrix */}
      <Paper sx={{ padding: '24px', marginBottom: '24px' }}>
        <Typography variant="h6" sx={{ marginBottom: '16px', fontFamily: 'Roboto' }}>
          Size × Variant Matrix
        </Typography>
        
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <Box>
            <Typography variant="body2" sx={{ marginBottom: '8px', color: '#757575' }}>
              Medium + Outlined
            </Typography>
            <SearchInput
              size="md"
              variant="outlined"
              placeholder="Search..."
              value={basicSearch}
              onChange={(e) => setBasicSearch(e.target.value)}
            />
          </Box>

          <Box>
            <Typography variant="body2" sx={{ marginBottom: '8px', color: '#757575' }}>
              Medium + Filled
            </Typography>
            <SearchInput
              size="md"
              variant="filled"
              placeholder="Search..."
              value={filledSearch}
              onChange={(e) => setFilledSearch(e.target.value)}
            />
          </Box>

          <Box>
            <Typography variant="body2" sx={{ marginBottom: '8px', color: '#757575' }}>
              Small + Outlined
            </Typography>
            <SearchInput
              size="sm"
              variant="outlined"
              placeholder="Search..."
              value={basicSearch}
              onChange={(e) => setBasicSearch(e.target.value)}
            />
          </Box>

          <Box>
            <Typography variant="body2" sx={{ marginBottom: '8px', color: '#757575' }}>
              Small + Filled
            </Typography>
            <SearchInput
              size="sm"
              variant="filled"
              placeholder="Search..."
              value={filledSearch}
              onChange={(e) => setFilledSearch(e.target.value)}
            />
          </Box>
        </Box>
      </Paper>

      {/* Edge Cases */}
      <Paper sx={{ padding: '24px', marginBottom: '24px' }}>
        <Typography variant="h6" sx={{ marginBottom: '16px', fontFamily: 'Roboto' }}>
          Edge Cases & Special Scenarios
        </Typography>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Box>
            <Typography variant="body2" sx={{ marginBottom: '8px', color: '#757575' }}>
              Long Placeholder Text
            </Typography>
            <SearchInput
              placeholder="Search by physician name, specialty, facility location, credential type, or license number..."
              value={basicSearch}
              onChange={(e) => setBasicSearch(e.target.value)}
            />
          </Box>

          <Box>
            <Typography variant="body2" sx={{ marginBottom: '8px', color: '#757575' }}>
              Long Input Value
            </Typography>
            <SearchInput
              placeholder="Search..."
              value="This is a very long search query that demonstrates how the input handles extensive text input without breaking the layout"
              onChange={(e) => setBasicSearch(e.target.value)}
            />
          </Box>

          <Box>
            <Typography variant="body2" sx={{ marginBottom: '8px', color: '#757575' }}>
              Custom Width (300px)
            </Typography>
            <SearchInput
              placeholder="Custom width..."
              value={basicSearch}
              onChange={(e) => setBasicSearch(e.target.value)}
              sx={{ width: '300px' }}
            />
          </Box>

          <Box>
            <Typography variant="body2" sx={{ marginBottom: '8px', color: '#757575' }}>
              Custom Width (600px)
            </Typography>
            <SearchInput
              placeholder="Wider search input..."
              value={basicSearch}
              onChange={(e) => setBasicSearch(e.target.value)}
              sx={{ width: '600px' }}
            />
          </Box>
        </Box>
      </Paper>

      {/* Interaction Demo */}
      <Paper sx={{ padding: '24px', marginBottom: '24px' }}>
        <Typography variant="h6" sx={{ marginBottom: '16px', fontFamily: 'Roboto' }}>
          Interactive State Demonstration
        </Typography>
        <Typography variant="body2" sx={{ marginBottom: '16px', color: '#757575' }}>
          Hover, click, and type to see all interaction states
        </Typography>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <Box>
            <Typography variant="subtitle2" sx={{ marginBottom: '8px' }}>
              Outlined Variant
            </Typography>
            <SearchInput
              variant="outlined"
              placeholder="Hover me, focus me, type in me..."
              value={basicSearch}
              onChange={(e) => setBasicSearch(e.target.value)}
            />
            <Typography variant="caption" sx={{ marginTop: '4px', display: 'block', color: '#757575' }}>
              • Default: Grey border
              <br />
              • Hover: Darker grey border
              <br />
              • Focus: Blue border with shadow ring
              <br />
              • Typing: Blue focus remains
            </Typography>
          </Box>

          <Divider />

          <Box>
            <Typography variant="subtitle2" sx={{ marginBottom: '8px' }}>
              Filled Variant
            </Typography>
            <SearchInput
              variant="filled"
              placeholder="Hover me, focus me, type in me..."
              value={filledSearch}
              onChange={(e) => setFilledSearch(e.target.value)}
            />
            <Typography variant="caption" sx={{ marginTop: '4px', display: 'block', color: '#757575' }}>
              • Default: Light blue background, grey bottom border
              <br />
              • Hover: Same background, darker bottom border
              <br />
              • Focus: Blue bottom border (2px)
              <br />
              • Typing: Blue bottom border remains
            </Typography>
          </Box>
        </Box>
      </Paper>

      {/* Design System Compliance Note */}
      <Paper sx={{ padding: '24px', backgroundColor: '#E3F2FD' }}>
        <Typography variant="h6" sx={{ marginBottom: '16px', fontFamily: 'Roboto' }}>
          Design System Compliance
        </Typography>
        <Typography variant="body2" sx={{ marginBottom: '8px' }}>
          ✅ 8px spacing grid (8px gap, padding in 8px increments)
          <br />
          ✅ Material Icons (Search icon)
          <br />
          ✅ Desktop only (no responsive)
          <br />
          ✅ Roboto typography
          <br />
          ✅ Design tokens from palette.json
          <br />
          ✅ Standard heights: 40px (md) / 32px (sm)
          <br />
          ✅ Proper focus states with visible indicators
          <br />
          ✅ Accessible (ARIA labels, keyboard navigation)
        </Typography>
      </Paper>
    </Box>
  );
};

export default SearchInputExamples;
