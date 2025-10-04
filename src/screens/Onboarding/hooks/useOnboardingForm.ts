import { useState } from 'react';
import { Alert } from 'react-native';
import {
  Control,
  FieldErrors,
  useForm,
  UseFormHandleSubmit,
} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axiosInstance from '../../../network/axiosInstance';
import API_ENDPOINTS from '../../../constants/apiEndpoints';
import { AxiosError } from 'axios';
import { onboardingSchema } from '../onboardingSchema';
import APP_TEXTS from '../../../constants/strings';

export type OnboardingFormData = {
  firstName: string;
  lastName: string;
  phone: string;
  corporationNumber: string;
};

type UseOnboardingFormReturn = {
  errors: FieldErrors<OnboardingFormData>;
  control: Control<OnboardingFormData>;
  handleSubmit: UseFormHandleSubmit<OnboardingFormData>;
  loading: boolean;
  onSubmit: (data: OnboardingFormData) => Promise<void>;
};

export const useOnboardingForm = (): UseOnboardingFormReturn => {
  const [loading, setLoading] = useState(false);

  const {
    formState: { errors },
    control,
    handleSubmit,
    reset,
  } = useForm<OnboardingFormData>({
    resolver: yupResolver(onboardingSchema),
    mode: 'onBlur',
  });

  const onSubmit = async (data: OnboardingFormData) => {
    try {
      setLoading(true);
      const res = await axiosInstance.post(
        API_ENDPOINTS.SUBMIT_ONBOARDING,
        data,
      );

      if (res.status !== 200)
        throw new Error(APP_TEXTS.ONBOARDING_SUBMISSION_FAILED);

      Alert.alert(
        APP_TEXTS.ONBOARDING_SUCCESS_HEADER,
        APP_TEXTS.ONBOARDING_SUCCESS_MESSAGE,
      );

      reset(); // Clear the form after successful submission
    } catch (err) {
      const axiosErr = err as AxiosError<{ message?: string }>;

      if (axiosErr.response?.status === 400) {
        Alert.alert(
          APP_TEXTS.ONBOARDING_FAILURE_HEADER,
          axiosErr.response.data?.message || APP_TEXTS.ONBOARDING_UNKNOWN_ERROR,
        );
      } else {
        Alert.alert(
          APP_TEXTS.ONBOARDING_FAILURE_HEADER,
          APP_TEXTS.ONBOARDING_FAILURE_MESSAGE,
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return { errors, control, handleSubmit, loading, onSubmit };
};
