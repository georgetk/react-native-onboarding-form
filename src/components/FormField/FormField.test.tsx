import React from 'react';
import { render, renderHook, screen } from '@testing-library/react-native';
import { useForm } from 'react-hook-form';
import FormField from './FormField';
import theme from '../../utils/theme';

describe('FormField component', () => {
  const selectedTheme = theme.light;

  test('renders label correctly', () => {
    const { control } = renderHook(() => useForm<{ testField: string }>())
      .result.current;

    render(
      <FormField
        control={control}
        name="testField"
        label="Test Field"
        placeholder="Enter text"
        selectedTheme={selectedTheme}
      />,
    );

    expect(screen.getByLabelText('Test Field')).toBeTruthy();
  });

  test('renders input correctly', () => {
    const { control } = renderHook(() => useForm<{ testField: string }>())
      .result.current;

    render(
      <FormField
        control={control}
        name="testField"
        label="Test Field"
        placeholder="Enter text"
        selectedTheme={selectedTheme}
      />,
    );

    expect(screen.getByPlaceholderText('Enter text')).toBeTruthy();
  });

  test('renders error message when error prop is provided', () => {
    const { control } = renderHook(() => useForm<{ testField: string }>())
      .result.current;

    render(
      <FormField
        control={control}
        name="testField"
        label="Test Field"
        placeholder="Enter text"
        error="This field is required"
        selectedTheme={selectedTheme}
      />,
    );

    expect(screen.getByText('This field is required')).toBeTruthy();
  });
});
