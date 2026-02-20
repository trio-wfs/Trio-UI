import React, { useState } from 'react';
import { Autocomplete } from './Autocomplete';

/**
 * Autocomplete Component Demo
 * 
 * Demonstrates all variants and states of the Autocomplete component
 * matching the Figma design specifications.
 * 
 * UPDATED: Now uses 'type' prop instead of 'multiSelect'
 */

// Sample data
const sampleOptions = [
  { id: '1', label: 'Cardiology', value: 'cardiology' },
  { id: '2', label: 'Emergency Medicine', value: 'emergency' },
  { id: '3', label: 'Family Medicine', value: 'family' },
  { id: '4', label: 'Internal Medicine', value: 'internal' },
  { id: '5', label: 'Neurology', value: 'neurology' },
  { id: '6', label: 'Orthopedic Surgery', value: 'orthopedic' },
  { id: '7', label: 'Pediatrics', value: 'pediatrics' },
  { id: '8', label: 'Psychiatry', value: 'psychiatry' },
  { id: '9', label: 'Radiology', value: 'radiology' },
  { id: '10', label: 'Surgery', value: 'surgery' },
];

const stateOptions = [
  { id: '1', label: 'Alabama', value: 'AL' },
  { id: '2', label: 'Alaska', value: 'AK' },
  { id: '3', label: 'Arizona', value: 'AZ' },
  { id: '4', label: 'Arkansas', value: 'AR' },
  { id: '5', label: 'California', value: 'CA' },
  { id: '6', label: 'Colorado', value: 'CO' },
  { id: '7', label: 'Connecticut', value: 'CT' },
  { id: '8', label: 'Delaware', value: 'DE' },
  { id: '9', label: 'Florida', value: 'FL' },
  { id: '10', label: 'Georgia', value: 'GA' },
];

const AutocompleteDemo: React.FC = () => {
  // Single select state
  const [singleValue, setSingleValue] = useState<string>('');
  
  // Multi-select state
  const [multiValue, setMultiValue] = useState<string[]>([]);
  
  // Error example state
  const [errorValue, setErrorValue] = useState<string>('');
  
  // Disabled example state
  const [disabledValue, setDisabledValue] = useState<string>('cardiology');
  
  // Required with validation
  const [requiredValue, setRequiredValue] = useState<string>('');
  const [showError, setShowError] = useState(false);
  
  // Multi with pre-selected
  const [preselectedMulti, setPreselectedMulti] = useState<string[]>(['cardiology', 'neurology', 'radiology']);
  
  // With filtering
  const [filteredOptions, setFilteredOptions] = useState(sampleOptions);
  const [filterValue, setFilterValue] = useState<string>('');
  
  const handleFilterChange = (inputValue: string) => {
    const filtered = sampleOptions.filter(option =>
      option.label.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredOptions(filtered);
  };
  
  const handleRequiredBlur = () => {
    if (!requiredValue) {
      setShowError(true);
    }
  };
  
  const handleRequiredChange = (value: string | string[]) => {
    setRequiredValue(value as string);
    setShowError(false);
  };

  return (
    <div style={{ 
      padding: '24px',
      maxWidth: '800px',
      margin: '0 auto',
      fontFamily: 'Roboto, sans-serif',
      backgroundColor: '#FAFAFA',
    }}>
      <h1 style={{ 
        fontSize: '34px', 
        fontWeight: 500, 
        marginBottom: '24px',
        color: '#212121',
      }}>
        Autocomplete Component Examples
      </h1>
      
      <p style={{ 
        fontSize: '14px', 
        lineHeight: '21px', 
        color: '#757575',
        marginBottom: '32px',
      }}>
        Production-ready autocomplete component following AHTG design system specifications.
        Supports single/multi-select, keyboard navigation, and full accessibility.
      </p>

      {/* Single Select - Default */}
      <section style={{ 
        marginBottom: '32px', 
        padding: '24px', 
        backgroundColor: '#FFFFFF',
        borderRadius: '4px',
        boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.08)',
      }}>
        <h2 style={{ 
          fontSize: '20px', 
          fontWeight: 500, 
          marginBottom: '16px',
          color: '#212121',
        }}>
          Single Select - Default State
        </h2>
        <Autocomplete
          label="Medical Specialty"
          placeholder="Select a specialty"
          options={sampleOptions}
          value={singleValue}
          onChange={(value) => setSingleValue(value as string)}
          helperText="Choose the primary medical specialty"
        />
        <div style={{ 
          marginTop: '12px', 
          fontSize: '12px', 
          color: '#757575',
          fontFamily: 'monospace',
        }}>
          Selected value: {singleValue || 'none'}
        </div>
      </section>

      {/* Multi-Select */}
      <section style={{ 
        marginBottom: '32px', 
        padding: '24px', 
        backgroundColor: '#FFFFFF',
        borderRadius: '4px',
        boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.08)',
      }}>
        <h2 style={{ 
          fontSize: '20px', 
          fontWeight: 500, 
          marginBottom: '16px',
          color: '#212121',
        }}>
          Multi-Select Mode (type="multi")
        </h2>
        <Autocomplete
          label="Specialties"
          placeholder="Select multiple specialties"
          options={sampleOptions}
          value={multiValue}
          onChange={(value) => setMultiValue(value as string[])}
          type="multi"
          helperText="You can select multiple specialties"
        />
        <div style={{ 
          marginTop: '12px', 
          fontSize: '12px', 
          color: '#757575',
          fontFamily: 'monospace',
        }}>
          Selected values: {multiValue.length > 0 ? multiValue.join(', ') : 'none'}
        </div>
      </section>

      {/* Multi-Select with Pre-selected */}
      <section style={{ 
        marginBottom: '32px', 
        padding: '24px', 
        backgroundColor: '#FFFFFF',
        borderRadius: '4px',
        boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.08)',
      }}>
        <h2 style={{ 
          fontSize: '20px', 
          fontWeight: 500, 
          marginBottom: '16px',
          color: '#212121',
        }}>
          Multi-Select with Pre-selected Items
        </h2>
        <Autocomplete
          label="Primary Specialties"
          placeholder="Add more specialties"
          options={sampleOptions}
          value={preselectedMulti}
          onChange={(value) => setPreselectedMulti(value as string[])}
          type="multi"
          required
          helperText="Multiple specialties already selected"
        />
      </section>

      {/* Required with Validation */}
      <section style={{ 
        marginBottom: '32px', 
        padding: '24px', 
        backgroundColor: '#FFFFFF',
        borderRadius: '4px',
        boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.08)',
      }}>
        <h2 style={{ 
          fontSize: '20px', 
          fontWeight: 500, 
          marginBottom: '16px',
          color: '#212121',
        }}>
          Required Field with Validation
        </h2>
        <Autocomplete
          label="License State"
          placeholder="Select your state"
          options={stateOptions}
          value={requiredValue}
          onChange={handleRequiredChange}
          required
          error={showError}
          errorMessage="State selection is required"
        />
        <button
          onClick={handleRequiredBlur}
          style={{
            marginTop: '12px',
            padding: '8px 16px',
            backgroundColor: '#2196F3',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '4px',
            fontSize: '12px',
            fontWeight: 500,
            cursor: 'pointer',
          }}
        >
          Validate Selection
        </button>
      </section>

      {/* Error State */}
      <section style={{ 
        marginBottom: '32px', 
        padding: '24px', 
        backgroundColor: '#FFFFFF',
        borderRadius: '4px',
        boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.08)',
      }}>
        <h2 style={{ 
          fontSize: '20px', 
          fontWeight: 500, 
          marginBottom: '16px',
          color: '#212121',
        }}>
          Error State
        </h2>
        <Autocomplete
          label="Credentialing Status"
          placeholder="Select a status"
          options={[
            { id: '1', label: 'Active', value: 'active' },
            { id: '2', label: 'Pending', value: 'pending' },
            { id: '3', label: 'Expired', value: 'expired' },
          ]}
          value={errorValue}
          onChange={(value) => setErrorValue(value as string)}
          error
          errorMessage="This field contains an error"
          required
        />
      </section>

      {/* Disabled State */}
      <section style={{ 
        marginBottom: '32px', 
        padding: '24px', 
        backgroundColor: '#FFFFFF',
        borderRadius: '4px',
        boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.08)',
      }}>
        <h2 style={{ 
          fontSize: '20px', 
          fontWeight: 500, 
          marginBottom: '16px',
          color: '#212121',
        }}>
          Disabled State
        </h2>
        <Autocomplete
          label="Primary Specialty (Locked)"
          placeholder="Not editable"
          options={sampleOptions}
          value={disabledValue}
          onChange={(value) => setDisabledValue(value as string)}
          disabled
          helperText="This field is locked and cannot be edited"
        />
      </section>

      {/* With Custom Filtering */}
      <section style={{ 
        marginBottom: '32px', 
        padding: '24px', 
        backgroundColor: '#FFFFFF',
        borderRadius: '4px',
        boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.08)',
      }}>
        <h2 style={{ 
          fontSize: '20px', 
          fontWeight: 500, 
          marginBottom: '16px',
          color: '#212121',
        }}>
          With Dynamic Filtering
        </h2>
        <Autocomplete
          label="Search Specialties"
          placeholder="Type to filter"
          options={filteredOptions}
          value={filterValue}
          onChange={(value) => setFilterValue(value as string)}
          onInputChange={handleFilterChange}
          helperText="Options filter as you type"
        />
        <div style={{ 
          marginTop: '12px', 
          fontSize: '12px', 
          color: '#757575',
        }}>
          Showing {filteredOptions.length} of {sampleOptions.length} options
        </div>
      </section>

      {/* Keyboard Navigation Guide */}
      <section style={{ 
        padding: '24px', 
        backgroundColor: '#E4F7FD',
        borderRadius: '4px',
        border: '1px solid #5BBFDE',
      }}>
        <h2 style={{ 
          fontSize: '16px', 
          fontWeight: 500, 
          marginBottom: '12px',
          color: '#212121',
        }}>
          Keyboard Navigation
        </h2>
        <ul style={{ 
          fontSize: '14px', 
          lineHeight: '21px', 
          color: '#424242',
          paddingLeft: '20px',
          margin: 0,
        }}>
          <li><strong>Arrow Down:</strong> Open menu or move to next option</li>
          <li><strong>Arrow Up:</strong> Move to previous option</li>
          <li><strong>Enter:</strong> Select focused option</li>
          <li><strong>Escape:</strong> Close menu</li>
          <li><strong>Tab:</strong> Close menu and move to next field</li>
          <li><strong>Backspace:</strong> (Multi-select) Remove last chip when input is empty</li>
        </ul>
      </section>

      {/* Code Example */}
      <section style={{ 
        marginTop: '32px',
        padding: '24px', 
        backgroundColor: '#212121',
        borderRadius: '4px',
        color: '#FFFFFF',
      }}>
        <h2 style={{ 
          fontSize: '16px', 
          fontWeight: 500, 
          marginBottom: '12px',
        }}>
          Code Example
        </h2>
        <pre style={{ 
          fontSize: '12px', 
          lineHeight: '18px',
          overflow: 'auto',
          margin: 0,
        }}>
{`import { Autocomplete } from './Autocomplete';

// Single Select (type="single" is default)
<Autocomplete
  label="Medical Specialty"
  placeholder="Select a specialty"
  options={specialtyOptions}
  value={value}
  onChange={setValue}
  required
/>

// Multi-Select (use type="multi")
<Autocomplete
  label="Specialties"
  placeholder="Select multiple"
  options={specialtyOptions}
  value={multiValue}
  onChange={setMultiValue}
  type="multi"
  helperText="Select all that apply"
/>

// With Error
<Autocomplete
  label="Required Field"
  options={options}
  value={value}
  onChange={setValue}
  error
  errorMessage="This field is required"
  required
/>

// Disabled
<Autocomplete
  label="Locked Field"
  options={options}
  value={value}
  disabled
/>`}
        </pre>
      </section>
    </div>
  );
};

export default AutocompleteDemo;
