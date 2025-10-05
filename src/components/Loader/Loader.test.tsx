import Loader from './Loader';
import { render } from '@testing-library/react-native';

describe('Loader component', () => {
  test('renders loader correctly', () => {
    const { getByTestId } = render(<Loader />);
    expect(getByTestId('loader')).toBeTruthy();
  });
});
