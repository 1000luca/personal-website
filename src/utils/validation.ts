/**
 * Form Validation Utilities
 * Helper functions for form validation
 */

import type { FormData, FormErrors } from '../types';

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validates an email address
 */
export const validateEmail = (email: string): boolean => {
  return EMAIL_REGEX.test(email);
};

/**
 * Validates a required field
 */
export const validateRequired = (value: string, fieldName: string): string | undefined => {
  if (!value.trim()) {
    return `${fieldName} is required`;
  }
  return undefined;
};

/**
 * Validates minimum length
 */
export const validateMinLength = (
  value: string,
  minLength: number,
  fieldName: string
): string | undefined => {
  if (value.trim().length < minLength) {
    return `${fieldName} must be at least ${minLength} characters`;
  }
  return undefined;
};

/**
 * Validates maximum length
 */
export const validateMaxLength = (
  value: string,
  maxLength: number,
  fieldName: string
): string | undefined => {
  if (value.trim().length > maxLength) {
    return `${fieldName} must be no more than ${maxLength} characters`;
  }
  return undefined;
};

/**
 * Validates the entire contact form
 */
export const validateContactForm = (formData: FormData): FormErrors => {
  const errors: FormErrors = {};

  // Validate name
  const nameRequired = validateRequired(formData.name, 'Name');
  if (nameRequired) {
    errors.name = nameRequired;
  } else {
    const nameMinLength = validateMinLength(formData.name, 2, 'Name');
    if (nameMinLength) errors.name = nameMinLength;
  }

  // Validate email
  const emailRequired = validateRequired(formData.email, 'Email');
  if (emailRequired) {
    errors.email = emailRequired;
  } else if (!validateEmail(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }

  // Validate subject
  const subjectRequired = validateRequired(formData.subject, 'Subject');
  if (subjectRequired) {
    errors.subject = subjectRequired;
  } else {
    const subjectMinLength = validateMinLength(formData.subject, 3, 'Subject');
    if (subjectMinLength) errors.subject = subjectMinLength;
  }

  // Validate message
  const messageRequired = validateRequired(formData.message, 'Message');
  if (messageRequired) {
    errors.message = messageRequired;
  } else {
    const messageMinLength = validateMinLength(formData.message, 10, 'Message');
    const messageMaxLength = validateMaxLength(formData.message, 1000, 'Message');
    if (messageMinLength) errors.message = messageMinLength;
    if (messageMaxLength) errors.message = messageMaxLength;
  }

  return errors;
};

/**
 * Checks if the form has any errors
 */
export const hasFormErrors = (errors: FormErrors): boolean => {
  return Object.keys(errors).length > 0;
};
