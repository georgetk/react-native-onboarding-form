import Loader from './Loader';
import { render, screen } from '@testing-library/react-native';

describe('Loader component', () => {
  test('renders loader correctly', () => {
    render(<Loader />);
    expect(screen.getByTestId('loader')).toBeTruthy();
  });
});
