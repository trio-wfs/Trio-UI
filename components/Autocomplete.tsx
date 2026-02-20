import React, { useState, useRef, useEffect, useCallback, KeyboardEvent } from 'react';

/**
 * Autocomplete Component
 * 
 * A production-ready autocomplete component built to AHTG design system specifications.
 * Extracted from Figma design (Node: 2381:6441, File: PjAYuPDr8IA1ccwiAjFkSD)
 * 
 * FIXES APPLIED:
 * - Added 'type' prop to control single/multi select behavior
 * - Fixed icons to use Material Icons (filled, not stroked)
 * - Fixed dropdown caret to use Material Design arrow_drop_down icon
 * 
 * Features:
 * - Single and multi-select modes via type prop
 * - Full keyboard navigation (Arrow keys, Enter, Escape, Tab)
 * - ARIA accessibility attributes
 * - Error state support
 * - Disabled state support
 * - Design token-based styling
 * 
 * Design Tokens Used:
 * - Spacing: xs (4px), sm (8px), md (16px)
 * - Typography: body2 (14px/21px), caption (12px/18px), button sm (12px/12px)
 * - Colors: From palette.json
 * - Border radius: md (4px), full (999px for chips)
 */

interface AutocompleteOption {
  id: string;
  label: string;
  value: string;
  disabled?: boolean;
}

type AutocompleteType = 'single' | 'multi';

interface AutocompleteProps {
  /** Label displayed above the input */
  label?: string;
  /** Shows asterisk next to label */
  required?: boolean;
  /** Placeholder text when no selection */
  placeholder?: string;
  /** Available options to select from */
  options: AutocompleteOption[];
  /** Currently selected value(s) - single string or array for multi-select */
  value?: string | string[];
  /** Callback when selection changes */
  onChange?: (value: string | string[]) => void;
  /** Type of autocomplete: 'single' or 'multi' (replaces multiSelect prop) */
  type?: AutocompleteType;
  /** @deprecated Use type='multi' instead. Enable multi-select mode */
  multiSelect?: boolean;
  /** Error state */
  error?: boolean;
  /** Error message displayed below input */
  errorMessage?: string;
  /** Helper text displayed below input */
  helperText?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Custom className for container */
  className?: string;
  /** Callback when input value changes (for filtering) */
  onInputChange?: (inputValue: string) => void;
  /** Show clear button when value is selected */
  clearable?: boolean;
  /** Max height for dropdown menu */
  maxMenuHeight?: number;
  /** ARIA label for accessibility */
  ariaLabel?: string;
}

export const Autocomplete: React.FC<AutocompleteProps> = ({
  label = 'Label',
  required = false,
  placeholder = 'Placeholder',
  options = [],
  value = '',
  onChange,
  type = 'single',
  multiSelect = false,
  error = false,
  errorMessage = '',
  helperText = '',
  disabled = false,
  className = '',
  onInputChange,
  clearable = true,
  maxMenuHeight = 237,
  ariaLabel,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [isFocused, setIsFocused] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<(HTMLLIElement | null)[]>([]);

  // Determine if multi-select based on type prop (preferred) or legacy multiSelect prop
  const isMultiSelect = type === 'multi' || multiSelect;

  // Get selected options
  const selectedValues = Array.isArray(value) ? value : value ? [value] : [];
  const selectedOptions = options.filter(opt => selectedValues.includes(opt.value));

  // Filter options based on input
  const filteredOptions = options.filter(option => {
    if (!inputValue) return true;
    return option.label.toLowerCase().includes(inputValue.toLowerCase());
  });

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Scroll focused option into view
  useEffect(() => {
    if (focusedIndex >= 0 && optionRefs.current[focusedIndex] && menuRef.current) {
      const optionElement = optionRefs.current[focusedIndex];
      const menuElement = menuRef.current;
      
      if (optionElement) {
        const optionTop = optionElement.offsetTop;
        const optionBottom = optionTop + optionElement.offsetHeight;
        const menuScrollTop = menuElement.scrollTop;
        const menuHeight = menuElement.clientHeight;
        
        if (optionBottom > menuScrollTop + menuHeight) {
          menuElement.scrollTop = optionBottom - menuHeight;
        } else if (optionTop < menuScrollTop) {
          menuElement.scrollTop = optionTop;
        }
      }
    }
  }, [focusedIndex]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    setIsOpen(true);
    setFocusedIndex(-1);
    onInputChange?.(newValue);
  };

  const handleInputFocus = () => {
    setIsFocused(true);
    if (!disabled) {
      setIsOpen(true);
    }
  };

  const handleSelect = useCallback((selectedValue: string) => {
    if (isMultiSelect) {
      const currentValues = Array.isArray(value) ? value : [];
      const newValues = currentValues.includes(selectedValue)
        ? currentValues.filter(v => v !== selectedValue)
        : [...currentValues, selectedValue];
      onChange?.(newValues);
      setInputValue('');
    } else {
      onChange?.(selectedValue);
      const selected = options.find(opt => opt.value === selectedValue);
      setInputValue(selected?.label || '');
      setIsOpen(false);
    }
    inputRef.current?.focus();
  }, [isMultiSelect, value, onChange, options]);

  const handleRemoveChip = (valueToRemove: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (isMultiSelect && Array.isArray(value)) {
      const newValues = value.filter(v => v !== valueToRemove);
      onChange?.(newValues);
    }
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange?.(isMultiSelect ? [] : '');
    setInputValue('');
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else {
          setFocusedIndex(prev => 
            prev < filteredOptions.length - 1 ? prev + 1 : prev
          );
        }
        break;
        
      case 'ArrowUp':
        e.preventDefault();
        if (isOpen) {
          setFocusedIndex(prev => prev > 0 ? prev - 1 : -1);
        }
        break;
        
      case 'Enter':
        e.preventDefault();
        if (isOpen && focusedIndex >= 0) {
          const option = filteredOptions[focusedIndex];
          if (option && !option.disabled) {
            handleSelect(option.value);
          }
        }
        break;
        
      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        setIsFocused(false);
        break;
        
      case 'Tab':
        setIsOpen(false);
        setIsFocused(false);
        break;
        
      case 'Backspace':
        if (isMultiSelect && !inputValue && selectedOptions.length > 0) {
          // Remove last chip on backspace when input is empty
          const lastValue = selectedValues[selectedValues.length - 1];
          handleRemoveChip(lastValue, e as any);
        }
        break;
    }
  };

  const isSelected = (optionValue: string) => selectedValues.includes(optionValue);

  const displayValue = () => {
    if (inputValue) return inputValue;
    if (!isMultiSelect && selectedOptions.length === 1) {
      return selectedOptions[0].label;
    }
    return '';
  };

  // Border color based on state
  const getBorderColor = () => {
    if (error) return '#DB4537';
    if (isFocused) return '#64B5F6';
    return '#E0E0E0';
  };

  const getTextColor = () => {
    if (error) return '#DB4537';
    if (disabled) return '#9E9E9E';
    return '#212121';
  };

  return (
    <div 
      ref={containerRef}
      className={`autocomplete-container ${className}`}
      style={{ 
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        position: 'relative',
        fontFamily: 'Roboto, sans-serif',
      }}
    >
      {/* Label */}
      <label
        style={{
          display: 'flex',
          gap: '4px',
          alignItems: 'center',
          fontSize: '12px',
          lineHeight: '18px',
          fontWeight: 400,
          color: error ? '#DB4537' : '#212121',
        }}
      >
        {label}
        {required && (
          <span 
            style={{ 
              fontWeight: 700,
              fontSize: '14px',
              lineHeight: '20px',
            }}
          >
            *
          </span>
        )}
      </label>

      {/* Input Container */}
      <div
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          height: '36px',
          padding: '4px 8px',
          border: `1px solid ${getBorderColor()}`,
          borderRadius: '4px',
          backgroundColor: disabled ? '#EEEEEE' : '#FFFFFF',
          boxShadow: isFocused ? '0px 0px 1px 0px rgba(66, 165, 245, 0.32)' : 'none',
          cursor: disabled ? 'not-allowed' : 'text',
        }}
        onClick={() => !disabled && inputRef.current?.focus()}
      >
        {/* Input Wrapper */}
        <div
          style={{
            display: 'flex',
            flex: 1,
            gap: '4px',
            alignItems: 'center',
            overflow: 'hidden',
            minWidth: 0,
          }}
        >
          {/* Chips for multi-select */}
          {isMultiSelect && selectedOptions.map(option => (
            <div
              key={option.value}
              style={{
                display: 'flex',
                alignItems: 'center',
                height: '24px',
                padding: '4px',
                backgroundColor: '#F5F5F5',
                borderRadius: '999px',
                gap: '4px',
              }}
            >
              <span
                style={{
                  fontSize: '12px',
                  lineHeight: '12px',
                  fontWeight: 400,
                  color: '#212121',
                  whiteSpace: 'nowrap',
                }}
              >
                {option.label}
              </span>
              <button
                type="button"
                onClick={(e) => handleRemoveChip(option.value, e)}
                disabled={disabled}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '16px',
                  height: '16px',
                  padding: 0,
                  border: 'none',
                  background: 'transparent',
                  cursor: disabled ? 'not-allowed' : 'pointer',
                  opacity: disabled ? 0.5 : 1,
                }}
                aria-label={`Remove ${option.label}`}
              >
                {/* Material Icon: close (filled) */}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path 
                    d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" 
                    fill="#424242" 
                  />
                </svg>
              </button>
            </div>
          ))}

          {/* Input */}
          <input
            ref={inputRef}
            type="text"
            value={displayValue()}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            placeholder={selectedOptions.length === 0 ? placeholder : ''}
            aria-label={ariaLabel || label}
            aria-expanded={isOpen}
            aria-autocomplete="list"
            aria-controls="autocomplete-menu"
            aria-activedescendant={focusedIndex >= 0 ? `option-${focusedIndex}` : undefined}
            role="combobox"
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              background: 'transparent',
              fontSize: '14px',
              lineHeight: '21px',
              fontWeight: 400,
              color: getTextColor(),
              minWidth: '20px',
              fontFamily: 'Roboto, sans-serif',
            }}
          />
        </div>

        {/* Action Icons */}
        <div style={{ display: 'flex', gap: '0px', alignItems: 'center' }}>
          {clearable && (selectedOptions.length > 0 || inputValue) && !disabled && (
            <button
              type="button"
              onClick={handleClear}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '24px',
                height: '24px',
                padding: 0,
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
              }}
              aria-label="Clear selection"
            >
              {/* Material Icon: close (filled) */}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path 
                  d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" 
                  fill="#424242" 
                />
              </svg>
            </button>
          )}
          
          <button
            type="button"
            onClick={() => !disabled && setIsOpen(!isOpen)}
            disabled={disabled}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '24px',
              height: '24px',
              padding: 0,
              border: 'none',
              background: 'transparent',
              cursor: disabled ? 'not-allowed' : 'pointer',
              transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s',
            }}
            aria-label="Toggle dropdown"
          >
            {/* Material Icon: arrow_drop_down (filled) - FIXED */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path 
                d="M7 10l5 5 5-5z" 
                fill={disabled ? '#9E9E9E' : '#424242'} 
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Helper/Error Text */}
      {(helperText || errorMessage) && (
        <div
          style={{
            fontSize: '12px',
            lineHeight: '18px',
            color: error ? '#DB4537' : '#757575',
            paddingLeft: '8px',
          }}
        >
          {error ? errorMessage : helperText}
        </div>
      )}

      {/* Dropdown Menu */}
      {isOpen && !disabled && (
        <div
          ref={menuRef}
          id="autocomplete-menu"
          role="listbox"
          style={{
            position: 'absolute',
            top: 'calc(100% + 4px)',
            left: 0,
            right: 0,
            maxHeight: `${maxMenuHeight}px`,
            overflowY: 'auto',
            backgroundColor: '#FFFFFF',
            border: '1px solid #E0E0E0',
            borderRadius: '4px',
            boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.08)',
            zIndex: 1000,
          }}
        >
          {filteredOptions.length === 0 ? (
            <div
              style={{
                padding: '8px 16px',
                fontSize: '14px',
                lineHeight: '21px',
                color: '#757575',
                textAlign: 'center',
              }}
            >
              No options found
            </div>
          ) : (
            filteredOptions.map((option, index) => {
              const selected = isSelected(option.value);
              const focused = index === focusedIndex;
              
              return (
                <li
                  key={option.value}
                  id={`option-${index}`}
                  ref={el => optionRefs.current[index] = el}
                  role="option"
                  aria-selected={selected}
                  aria-disabled={option.disabled}
                  onClick={() => !option.disabled && handleSelect(option.value)}
                  onMouseEnter={() => setFocusedIndex(index)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 16px',
                    cursor: option.disabled ? 'not-allowed' : 'pointer',
                    backgroundColor: focused || selected ? 'rgba(33, 150, 243, 0.08)' : 'transparent',
                    fontSize: '14px',
                    lineHeight: '21px',
                    fontWeight: 400,
                    color: option.disabled ? '#9E9E9E' : '#212121',
                    listStyle: 'none',
                    transition: 'background-color 0.15s',
                  }}
                >
                  {isMultiSelect && (
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '20px',
                        height: '20px',
                      }}
                    >
                      {selected && (
                        /* Material Icon: checkbox selected (filled) */
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                          <path 
                            d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" 
                            fill="#2196F3" 
                          />
                        </svg>
                      )}
                      {!selected && (
                        /* Material Icon: checkbox unchecked (outlined) */
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                          <path 
                            d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" 
                            fill="#9E9E9E" 
                          />
                        </svg>
                      )}
                    </div>
                  )}
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {option.label}
                  </span>
                  {selected && !isMultiSelect && (
                    <div style={{ marginLeft: 'auto' }}>
                      {/* Material Icon: check (filled) */}
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path 
                          d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" 
                          fill="#2196F3" 
                        />
                      </svg>
                    </div>
                  )}
                </li>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

export default Autocomplete;
