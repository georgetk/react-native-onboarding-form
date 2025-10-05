import React from 'react';
import { render, renderHook } from '@testing-library/react-native';
import { useForm } from 'react-hook-form';
import FormField from './FormField';

describe('FormField component', () => {
  test('renders label correctly', () => {
    const { control } = renderHook(() => useForm<{ testField: string }>())
      .result.current;

    const { getByLabelText } = render(
      <FormField
        control={control}
        name="testField"
        label="Test Field"
        placeholder="Enter text"
      />,
    );

    expect(getByLabelText('Test Field')).toBeTruthy();
  });

  test('renders input correctly', () => {
    const { control } = renderHook(() => useForm<{ testField: string }>())
      .result.current;

    const { getByPlaceholderText } = render(
      <FormField
        control={control}
        name="testField"
        label="Test Field"
        placeholder="Enter text"
      />,
    );

    expect(getByPlaceholderText('Enter text')).toBeTruthy();
  });

  test('renders error message when error prop is provided', () => {
    const { control } = renderHook(() => useForm<{ testField: string }>())
      .result.current;

    const { getByText } = render(
      <FormField
        control={control}
        name="testField"
        label="Test Field"
        placeholder="Enter text"
        error="This field is required"
      />,
    );

    expect(getByText('This field is required')).toBeTruthy();
  });
});
