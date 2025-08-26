import { useState, useCallback, useRef } from 'react';

/**
 * Custom hook for handling uppercase input transformation
 * Provides display value (uppercase) and raw value (original) for submission
 * Maintains smooth caret behavior and respects IME composition
 */
export const useUppercaseInput = (initialValue = '', onChange = null) => {
  const [rawValue, setRawValue] = useState(initialValue);
  const [displayValue, setDisplayValue] = useState(initialValue.toUpperCase());
  const isComposingRef = useRef(false);

  // Transform text to uppercase while preserving non-letter characters
  const transformToUppercase = useCallback((text) => {
    // Use locale-stable uppercase conversion
    return text.toUpperCase();
  }, []);

  // Handle input change with uppercase transformation
  const handleChange = useCallback((event) => {
    const newRawValue = event.target.value;
    
    // Don't transform during IME composition
    if (isComposingRef.current) {
      setRawValue(newRawValue);
      setDisplayValue(newRawValue);
    } else {
      const newDisplayValue = transformToUppercase(newRawValue);
      setRawValue(newRawValue);
      setDisplayValue(newDisplayValue);
    }

    // Call external onChange with the raw value to preserve existing behavior
    if (onChange) {
      onChange(event);
    }
  }, [onChange, transformToUppercase]);

  // Handle composition start (IME input)
  const handleCompositionStart = useCallback(() => {
    isComposingRef.current = true;
  }, []);

  // Handle composition end (IME input complete)
  const handleCompositionEnd = useCallback((event) => {
    isComposingRef.current = false;
    const newRawValue = event.target.value;
    const newDisplayValue = transformToUppercase(newRawValue);
    
    setRawValue(newRawValue);
    setDisplayValue(newDisplayValue);

    // Trigger change event for consistency
    if (onChange) {
      onChange(event);
    }
  }, [onChange, transformToUppercase]);

  // Update values programmatically (for external updates)
  const setValue = useCallback((value) => {
    const newRawValue = value;
    const newDisplayValue = transformToUppercase(value);
    setRawValue(newRawValue);
    setDisplayValue(newDisplayValue);
  }, [transformToUppercase]);

  // Reset to initial state
  const reset = useCallback(() => {
    setRawValue('');
    setDisplayValue('');
  }, []);

  return {
    // Values
    rawValue,        // Original value for submission/backend
    displayValue,    // Uppercase value for display
    
    // Event handlers for the input element
    onChange: handleChange,
    onCompositionStart: handleCompositionStart,
    onCompositionEnd: handleCompositionEnd,
    
    // Utility functions
    setValue,
    reset,
    
    // For compatibility - returns the display value as the main value
    value: displayValue
  };
};
