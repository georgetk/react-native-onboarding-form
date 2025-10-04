const APP_TEXTS = {
  ONBOARDING_HEADER: 'Onboarding Form',
  ONBOARDING_FIRSTNAME_LABEL: 'First Name',
  ONBOARDING_FIRSTNAME_PLACEHOLDER: 'Enter your first name',
  ONBOARDING_LASTNAME_LABEL: 'Last Name',
  ONBOARDING_LASTNAME_PLACEHOLDER: 'Enter your last name',
  ONBOARDING_PHONE_LABEL: 'Phone Number',
  ONBOARDING_PHONE_PLACEHOLDER: 'Enter your phone number',
  ONBOARDING_CORPORATION_LABEL: 'Corporation Number',
  ONBOARDING_CORPORATION_PLACEHOLDER: 'Enter your corporation number',
  ONBOARDING_SUBMIT: 'Submit',
  ONBOARDING_SUCCESS_HEADER: 'Success',
  ONBOARDING_SUCCESS_MESSAGE: 'Onboarding completed successfully!',
  ONBOARDING_FAILURE_HEADER: 'Error',
  ONBOARDING_FAILURE_MESSAGE: 'Onboarding failed. Please try again.',
  ONBOARDING_SUBMISSION_FAILED: 'Submission failed',
  ONBOARDING_UNKNOWN_ERROR: 'Unknown error',
  ONBOARDING_FIELD_REQUIRED: (field: string) => `${field} is required`,
  ONBOARDING_PHONE_INVALID: (field: string) =>
    `${field} must start with +1 and have 10 digits after it`,
  ONBOARDING_CORPORATION_NUMBER_LENGTH: (field: string) =>
    `${field} must be exactly 9 digits`,
  ONBOARDING_CORPORATION_INVALID: (field: string) => `Invalid ${field}`,
};

export default APP_TEXTS;
