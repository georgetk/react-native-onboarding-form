import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import styles from './styles';
import { Theme } from '../../utils/theme';

type Props<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder: string;
  keyboardType?: 'default' | 'numeric' | 'phone-pad';
  maxLength?: number;
  error?: string;
  selectedTheme: Theme;
};

const FormField = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  keyboardType,
  maxLength,
  error,
  selectedTheme,
}: Props<T>) => (
  <>
    <Text
      style={[styles.labelText, selectedTheme.labelStyle]}
      accessibilityLabel={label}
    >
      {label}
    </Text>
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value } }) => (
        <TextInput
          style={[
            styles.input,
            selectedTheme.borderStyle,
            selectedTheme.inputTextStyle,
          ]}
          placeholder={placeholder}
          placeholderTextColor={selectedTheme.placeholderTextColor}
          onBlur={onBlur}
          onChangeText={onChange}
          value={value}
          keyboardType={keyboardType}
          maxLength={maxLength}
          testID={`${label}_input`}
        />
      )}
    />
    <View style={styles.errorContainer}>
      {error ? (
        <Text style={[styles.errorText, selectedTheme.errorTextStyle]}>
          {error}
        </Text>
      ) : null}
    </View>
  </>
);

export default FormField;
