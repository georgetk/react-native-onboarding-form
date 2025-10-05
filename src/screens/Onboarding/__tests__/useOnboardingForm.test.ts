import { renderHook, act } from '@testing-library/react-native';
import { useOnboardingForm } from '../hooks/useOnboardingForm';
import { Alert } from 'react-native';
import axiosInstance from '../../../network/axiosInstance';
import API_ENDPOINTS from '../../../constants/apiEndpoints';
import APP_TEXTS from '../../../constants/strings';

jest.mock('../../../network/axiosInstance', () => ({
  post: jest.fn(),
}));

jest.spyOn(Alert, 'alert');

describe('useOnboardingForm hook', () => {
  const payload = {
    firstName: 'Hello',
    lastName: 'World',
    corporationNumber: '826417395',
    phone: '+13062776103',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('calls API with payload and shows success alert', async () => {
    (axiosInstance.post as jest.Mock).mockResolvedValue({ status: 200 });

    const { result } = renderHook(() => useOnboardingForm());

    await act(async () => {
      await result.current.onSubmit(payload);
    });

    expect(axiosInstance.post).toHaveBeenCalledWith(
      API_ENDPOINTS.SUBMIT_ONBOARDING,
      payload,
    );

    expect(Alert.alert).toHaveBeenCalledWith(
      APP_TEXTS.ONBOARDING_SUCCESS_HEADER,
      APP_TEXTS.ONBOARDING_SUCCESS_MESSAGE,
    );
  });

  test('calls API with payload and shows failure alert', async () => {
    (axiosInstance.post as jest.Mock).mockResolvedValue({ status: 400 });

    const { result } = renderHook(() => useOnboardingForm());

    await act(async () => {
      await result.current.onSubmit(payload);
    });

    expect(axiosInstance.post).toHaveBeenCalledWith(
      API_ENDPOINTS.SUBMIT_ONBOARDING,
      payload,
    );

    expect(Alert.alert).toHaveBeenCalledWith(
      APP_TEXTS.ONBOARDING_FAILURE_HEADER,
      APP_TEXTS.ONBOARDING_FAILURE_MESSAGE,
    );
  });
});
