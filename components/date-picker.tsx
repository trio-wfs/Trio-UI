import React from 'react';
import { styled } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateTimePicker as MuiDateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import type { Dayjs } from 'dayjs';

/**
 * Date Picker Component
 * Based on Figma component: Document / Date Picker / Date Picker / Date Picker
 * Component ID: 2784:5964
 * Building Block: 2784:7541 (Building Blocks/Date Selections)
 * 
 * Design tokens used:
 * - Colors: primary.main (#2196F3), text.primary (#212121), text.secondary (#757575)
 * - Typography: body2 (14px, regular weight), caption (12px)
 * - Spacing: sm (8px), xs (4px)
 * - Border: components.border.default (#E0E0E0)
 */

export interface DatePickerProps {
  /** Selected date value */
  value?: Dayjs | null;
  /** Default date value */
  defaultValue?: Dayjs | null;
  /** Change handler */
  onChange?: (date: Dayjs | null) => void;
  /** Picker type */
  type?: 'date' | 'datetime' | 'date-with-chips';
  /** Label for the input */
  label?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Required field */
  required?: boolean;
  /** Helper text */
  helperText?: string;
  /** Error state */
  error?: boolean;
  /** Min date */
  minDate?: Dayjs;
  /** Max date */
  maxDate?: Dayjs;
  /** Show today indicator */
  showTodayIndicator?: boolean;
  /** Selected date chips (for date-with-chips type) */
  selectedChips?: Dayjs[];
  /** Chip selection handler */
  onChipSelect?: (date: Dayjs) => void;
  /** Chip removal handler */
  onChipRemove?: (date: Dayjs) => void;
}

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-root': {
    fontSize: '14px', // body2
    fontWeight: 400, // regular
    color: '#212121', // text.primary
  },
  '& .MuiInputLabel-root': {
    fontSize: '14px', // body2
    color: '#757575', // text.secondary
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#9E9E9E', // components.input.enabledBorder
    },
    '&:hover fieldset': {
      borderColor: '#616161', // components.input.hoverBorder
    },
    '&.Mui-focused fieldset': {
      borderColor: '#2196F3', // primary.main
      borderWidth: '2px',
    },
    '&.Mui-error fieldset': {
      borderColor: '#DB4537', // error.main
    },
  },
  '& .MuiFormHelperText-root': {
    fontSize: '12px', // caption
    color: '#757575', // text.secondary
    '&.Mui-error': {
      color: '#DB4537', // error.main
    },
  },
}));

const StyledPickersDay = styled(PickersDay)<PickersDayProps<Dayjs>>(
  ({ theme, selected, today }) => ({
    fontSize: '14px', // body2
    fontWeight: selected ? 500 : 400, // medium if selected, regular otherwise
    color: '#212121', // text.primary
    
    // Default state
    '&:not(.Mui-selected)': {
      backgroundColor: 'transparent',
      color: '#212121', // text.primary
      '&:hover': {
        backgroundColor: 'rgba(33, 150, 243, 0.08)', // primary with opacity
      },
    },
    
    // Selected state
    '&.Mui-selected': {
      backgroundColor: '#2196F3 !important', // primary.main
      color: '#FFFFFF !important', // base.white
      fontWeight: 500, // medium
      '&:hover': {
        backgroundColor: '#1976D2 !important', // primary.dark
      },
      '&:focus': {
        backgroundColor: '#2196F3 !important',
      },
    },
    
    // Today indicator
    ...(today && {
      border: '2px solid #2196F3', // primary.main
      fontWeight: 500, // medium
    }),
    
    // Disabled/greyed out
    '&.Mui-disabled': {
      color: '#9E9E9E', // text.disabled
      opacity: 0.6,
    },
  })
);

const ChipContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px', // sm
  marginTop: '16px', // md
}));

const StyledChip = styled(Chip)(({ theme }) => ({
  fontSize: '14px', // body2
  fontWeight: 400, // regular
  backgroundColor: '#E3F2FD', // primary.light
  color: '#2196F3', // primary.main
  '&:hover': {
    backgroundColor: '#BBDEFB',
  },
  '& .MuiChip-deleteIcon': {
    color: '#2196F3',
    '&:hover': {
      color: '#1976D2', // primary.dark
    },
  },
}));

const CustomDay = (props: PickersDayProps<Dayjs>) => {
  return <StyledPickersDay {...props} />;
};

/**
 * Date Picker component for date and time selection
 * 
 * Variants (from Figma):
 * - Type: Date, Time and Date, Date Picker with Chips (custom)
 * 
 * Date Selection States:
 * - Default: Regular unselected date
 * - Selected: Currently selected date (blue background)
 * - Today Indicator: Current date with border
 * - Greyed Out: Disabled/unavailable dates
 * 
 * @example
 * ```tsx
 * <DatePicker
 *   type="date"
 *   label="Select Date"
 *   value={selectedDate}
 *   onChange={setSelectedDate}
 *   showTodayIndicator
 * />
 * ```
 */
export const DatePicker: React.FC<DatePickerProps> = ({
  value,
  defaultValue,
  onChange,
  type = 'date',
  label = 'Select Date',
  disabled = false,
  required = false,
  helperText,
  error = false,
  minDate,
  maxDate,
  showTodayIndicator = true,
  selectedChips = [],
  onChipSelect,
  onChipRemove,
}) => {
  const [internalValue, setInternalValue] = React.useState<Dayjs | null>(
    defaultValue || null
  );

  const currentValue = value !== undefined ? value : internalValue;

  const handleChange = (newValue: Dayjs | null) => {
    if (value === undefined) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
    
    // For date-with-chips type, add to chips on selection
    if (type === 'date-with-chips' && newValue && onChipSelect) {
      onChipSelect(newValue);
    }
  };

  const handleChipDelete = (chipDate: Dayjs) => {
    onChipRemove?.(chipDate);
  };

  const renderDatePicker = () => {
    const commonProps = {
      value: currentValue,
      onChange: handleChange,
      disabled,
      minDate,
      maxDate,
      slots: {
        day: CustomDay,
      },
      slotProps: {
        textField: {
          required,
          helperText,
          error,
        } as any,
      },
    };

    switch (type) {
      case 'datetime':
        return (
          <MuiDateTimePicker
            {...commonProps}
            label={label}
            renderInput={(params) => <StyledTextField {...params} />}
          />
        );
      
      case 'date-with-chips':
        return (
          <Box>
            <MuiDatePicker
              {...commonProps}
              label={label}
              renderInput={(params) => <StyledTextField {...params} />}
            />
            {selectedChips.length > 0 && (
              <ChipContainer>
                {selectedChips.map((chipDate, index) => (
                  <StyledChip
                    key={index}
                    label={chipDate.format('MMM DD, YYYY')}
                    onDelete={() => handleChipDelete(chipDate)}
                    size="small"
                  />
                ))}
              </ChipContainer>
            )}
          </Box>
        );
      
      case 'date':
      default:
        return (
          <MuiDatePicker
            {...commonProps}
            label={label}
            renderInput={(params) => <StyledTextField {...params} />}
          />
        );
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {renderDatePicker()}
    </LocalizationProvider>
  );
};

export default DatePicker;
