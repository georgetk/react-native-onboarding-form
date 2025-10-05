import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import styles from './styles';

type Props<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder: string;
  keyboardType?: 'default' | 'numeric' | 'phone-pad';
  maxLength?: number;
  error?: string;
};

const FormField = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  keyboardType,
  maxLength,
  error,
}: Props<T>) => (
  <>
    <Text style={styles.labelText} accessibilityLabel={label}>
      {label}
    </Text>
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value } }) => (
        <TextInput
          style={styles.input}
          placeholder={placeholder}
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
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  </>
);

export default FormField;
