import { render, fireEvent, renderHook } from '@testing-library/react-native';
import Onboarding from '../Onboarding';
import { FIELD_LABEL_MAP } from '../onboardingSchema';
import {
  OnboardingFormData,
  useOnboardingForm,
} from '../hooks/useOnboardingForm';
import { useForm } from 'react-hook-form';

jest.mock('../hooks/useOnboardingForm');

const mockedUseOnboardingForm = jest.mocked(useOnboardingForm);
const mockOnSubmit = jest.fn();
const mockHandleSubmit = jest.fn(cb => () => cb());

beforeEach(() => {
  const { result } = renderHook(() => useForm<OnboardingFormData>());

  // default mock for all tests
  mockedUseOnboardingForm.mockReturnValue({
    control: result.current.control,
    handleSubmit: mockHandleSubmit,
    errors: result.current.formState.errors,
    loading: false,
    onSubmit: mockOnSubmit,
  });
});

describe('Onboarding screen', () => {
  test('renders header text', () => {
    const { getByTestId } = render(<Onboarding />);
    expect(getByTestId('onboarding_header_text')).toBeTruthy();
  });

  test('renders input fields', () => {
    const { getByTestId } = render(<Onboarding />);
    Object.values(FIELD_LABEL_MAP).forEach(label => {
      expect(getByTestId(`${label}_input`)).toBeTruthy();
    });
  });

  test('renders Submit button', () => {
    const { getByTestId } = render(<Onboarding />);
    expect(getByTestId('onboarding_submit_button')).toBeTruthy();
  });

  test('calls handleSubmit(onSubmit) when Submit is pressed', () => {
    const { getByText } = render(<Onboarding />);

    fireEvent.press(getByText('Submit'));

    expect(mockHandleSubmit).toHaveBeenCalledWith(mockOnSubmit);
    expect(mockOnSubmit).toHaveBeenCalled();
  });
});
