import {
  render,
  fireEvent,
  renderHook,
  screen,
} from '@testing-library/react-native';
import Onboarding from '../Onboarding';
import { FIELD_LABEL_MAP } from '../onboardingSchema';
import {
  OnboardingFormData,
  useOnboardingForm,
} from '../hooks/useOnboardingForm';
import { useForm } from 'react-hook-form';
import theme from '../../../utils/theme';

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
  const selectedTheme = theme.light;

  test('renders header text', () => {
    render(<Onboarding selectedTheme={selectedTheme} />);
    expect(screen.getByTestId('onboarding_header_text')).toBeTruthy();
  });

  test('renders input fields', () => {
    render(<Onboarding selectedTheme={selectedTheme} />);
    Object.values(FIELD_LABEL_MAP).forEach(label => {
      expect(screen.getByTestId(`${label}_input`)).toBeTruthy();
    });
  });

  test('renders Submit button', () => {
    render(<Onboarding selectedTheme={selectedTheme} />);
    expect(screen.getByTestId('onboarding_submit_button')).toBeTruthy();
  });

  test('calls handleSubmit(onSubmit) when Submit is pressed', () => {
    render(<Onboarding selectedTheme={selectedTheme} />);

    fireEvent.press(screen.getByText('Submit'));

    expect(mockHandleSubmit).toHaveBeenCalledWith(mockOnSubmit);
    expect(mockOnSubmit).toHaveBeenCalled();
  });
});
