const API_ENDPOINTS = {
  VALIDATE_CORPORATION_NUMBER: (number: string) =>
    `/corporation-number/${number}`,
  SUBMIT_ONBOARDING: '/profile-details',
};

export default API_ENDPOINTS;
