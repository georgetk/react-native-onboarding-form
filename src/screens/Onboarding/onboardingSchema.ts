import * as yup from 'yup';
import axiosInstance from '../../network/axiosInstance';
import API_ENDPOINTS from '../../constants/apiEndpoints';
import APP_TEXTS from '../../constants/strings';

export const MAX_NAME_LENGTH = 50;
export const MAX_PHONE_NUMBER_LENGTH = 12;
export const MAX_CORPORATION_NUMBER_LENGTH = 9;

export const CANADIAN_PHONE_REGEX = /^\+1\d{10}$/;
export const CORPORATION_NUMBER_REGEX = /^\d{9}$/;

export const FIELD_LABEL_MAP = {
  firstName: APP_TEXTS.ONBOARDING_FIRSTNAME_LABEL,
  lastName: APP_TEXTS.ONBOARDING_LASTNAME_LABEL,
  phone: APP_TEXTS.ONBOARDING_PHONE_LABEL,
  corporationNumber: APP_TEXTS.ONBOARDING_CORPORATION_LABEL,
} as const;

export const onboardingSchema = yup.object({
  firstName: yup
    .string()
    .max(MAX_NAME_LENGTH)
    .required(APP_TEXTS.ONBOARDING_FIELD_REQUIRED(FIELD_LABEL_MAP.firstName)),

  lastName: yup
    .string()
    .max(MAX_NAME_LENGTH)
    .required(APP_TEXTS.ONBOARDING_FIELD_REQUIRED(FIELD_LABEL_MAP.lastName)),

  phone: yup
    .string()
    .matches(
      CANADIAN_PHONE_REGEX,
      APP_TEXTS.ONBOARDING_PHONE_INVALID(FIELD_LABEL_MAP.phone),
    )
    .required(APP_TEXTS.ONBOARDING_FIELD_REQUIRED(FIELD_LABEL_MAP.phone)),

  corporationNumber: yup
    .string()
    .matches(
      CORPORATION_NUMBER_REGEX,
      APP_TEXTS.ONBOARDING_CORPORATION_NUMBER_LENGTH(
        FIELD_LABEL_MAP.corporationNumber,
      ),
    )
    .required(
      APP_TEXTS.ONBOARDING_FIELD_REQUIRED(FIELD_LABEL_MAP.corporationNumber),
    )
    .test(
      'api-validation',
      APP_TEXTS.ONBOARDING_CORPORATION_INVALID(
        FIELD_LABEL_MAP.corporationNumber,
      ),
      async value => {
        if (!value) return false;
        try {
          const res = await axiosInstance.get(
            API_ENDPOINTS.VALIDATE_CORPORATION_NUMBER(value),
          );
          return res.data?.valid ?? false;
        } catch {
          return false;
        }
      },
    ),
});
