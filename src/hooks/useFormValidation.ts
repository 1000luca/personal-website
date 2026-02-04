/**
 * useFormValidation Hook
 * Manages form state and validation
 */

import { useState, useCallback } from 'react';
import type { FormData, FormErrors } from '../types';
import { validateContactForm, hasFormErrors } from '../utils/validation';

export const useFormValidation = (initialValues: FormData) => {
  const [values, setValues] = useState<FormData>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input change
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setValues((prev) => ({ ...prev, [name]: value }));

      // Clear error when user starts typing
      if (errors[name as keyof FormErrors]) {
        setErrors((prev) => ({ ...prev, [name]: undefined }));
      }
    },
    [errors]
  );

  // Handle input blur
  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name } = e.target;
      setTouched((prev) => ({ ...prev, [name]: true }));

      // Validate single field on blur
      const fieldErrors = validateContactForm(values);
      if (fieldErrors[name as keyof FormErrors]) {
        setErrors((prev) => ({
          ...prev,
          [name]: fieldErrors[name as keyof FormErrors],
        }));
      }
    },
    [values]
  );

  // Validate all fields
  const validate = useCallback(() => {
    const validationErrors = validateContactForm(values);
    setErrors(validationErrors);
    return !hasFormErrors(validationErrors);
  }, [values]);

  // Reset form
  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);

  // Handle form submission
  const handleSubmit = useCallback(
    async (
      onSubmit: (values: FormData) => Promise<void>,
      e?: React.FormEvent
    ) => {
      if (e) {
        e.preventDefault();
      }

      // Mark all fields as touched
      const allTouched = Object.keys(values).reduce(
        (acc, key) => ({ ...acc, [key]: true }),
        {}
      );
      setTouched(allTouched);

      // Validate
      const isValid = validate();

      if (isValid) {
        setIsSubmitting(true);
        try {
          await onSubmit(values);
          reset();
        } catch (error) {
          console.error('Form submission error:', error);
        } finally {
          setIsSubmitting(false);
        }
      }
    },
    [values, validate, reset]
  );

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    validate,
    reset,
    setIsSubmitting,
  };
};
