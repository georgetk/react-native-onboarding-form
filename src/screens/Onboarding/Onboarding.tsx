import {
  Text,
  View,
  TextInput,
  Pressable,
  Alert,
  ActivityIndicator,
} from 'react-native';
import styles from './styles';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import axiosInstance from '../../network/axiosInstance';
import API_ENDPOINTS from '../../constants/apiEndpoints';
import { AxiosError } from 'axios';
import { useState } from 'react';

type FormData = {
  firstName: string;
  lastName: string;
  phone: string;
  corporationNumber: string;
};

const MAX_NAME_LENGTH = 50;
const MAX_PHONE_NUMBER_LENGTH = 12;
const MAX_CORPORATION_NUMBER_LENGTH = 9;

const CANADIAN_PHONE_REGEX = /^\+1\d{10}$/;
const CORPORATION_NUMBER_REGEX = /^\d{9}$/;

const FIELD_LABEL_MAP: Record<keyof FormData, string> = {
  firstName: 'First Name',
  lastName: 'Last Name',
  phone: 'Phone Number',
  corporationNumber: 'Corporation Number',
};

const getRequiredMessage = (field: keyof FormData) => {
  return `${FIELD_LABEL_MAP[field]} is required`;
};

const schema = yup
  .object({
    firstName: yup
      .string()
      .max(MAX_NAME_LENGTH)
      .required(getRequiredMessage('firstName')),
    lastName: yup
      .string()
      .max(MAX_NAME_LENGTH)
      .required(getRequiredMessage('lastName')),
    phone: yup
      .string()
      .matches(
        CANADIAN_PHONE_REGEX,
        `${FIELD_LABEL_MAP.phone} must start with +1 and have 10 digits after it`,
      )
      .required(getRequiredMessage('phone')),
    corporationNumber: yup
      .string()
      .matches(
        CORPORATION_NUMBER_REGEX,
        `${FIELD_LABEL_MAP.corporationNumber} must be exactly 9 digits`,
      )
      .required(getRequiredMessage('corporationNumber'))
      .test(
        'api-validation',
        `Invalid ${FIELD_LABEL_MAP.corporationNumber}`,
        async value => {
          if (!value) return false;
          try {
            const response = await axiosInstance.get(
              API_ENDPOINTS.VALIDATE_CORPORATION_NUMBER(value),
            );
            return response.data?.valid ?? false;
          } catch (err) {
            return false;
          }
        },
      ),
  })
  .required();

const renderError = (fieldError?: { message?: string }) =>
  fieldError ? (
    <Text style={styles.errorText}>{fieldError.message}</Text>
  ) : null;

const Onboarding = () => {
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  });

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      const response = await axiosInstance.post(
        API_ENDPOINTS.SUBMIT_ONBOARDING,
        data,
      );

      if (response.status !== 200) {
        throw new Error('Failed to submit form');
      }
      Alert.alert('Success', 'Form submitted successfully!');
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;

      if (axiosError?.response && axiosError.response.status === 400) {
        Alert.alert(
          'Submission Error',
          ` ${axiosError.response.data?.message || 'Unknown error'}`,
        );
      } else {
        Alert.alert(
          'Submission Error',
          'There was an error submitting the form. Please try again later.',
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <View
          style={{
            justifyContent: 'center',
            position: 'absolute',
            top: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1,
          }}
        >
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : null}

      <Text style={styles.headerText}>Onboarding Form</Text>

      <View style={styles.formContainer}>
        <Text style={styles.labelText}>{FIELD_LABEL_MAP.firstName}</Text>
        <Controller
          control={control}
          name="firstName"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Enter first name"
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              maxLength={MAX_NAME_LENGTH}
            />
          )}
        />
        <View style={styles.errorContainer}>
          {renderError(errors.firstName)}
        </View>

        <Text style={styles.labelText}>{FIELD_LABEL_MAP.lastName}</Text>
        <Controller
          control={control}
          name="lastName"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Enter last name"
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              maxLength={MAX_NAME_LENGTH}
            />
          )}
        />
        <View style={styles.errorContainer}>
          {renderError(errors.lastName)}
        </View>

        <Text style={styles.labelText}>{FIELD_LABEL_MAP.phone}</Text>

        <Controller
          control={control}
          name="phone"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Enter phone number"
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              keyboardType="phone-pad"
              maxLength={MAX_PHONE_NUMBER_LENGTH}
            />
          )}
        />
        <View style={styles.errorContainer}>{renderError(errors.phone)}</View>

        <Text style={styles.labelText}>
          {FIELD_LABEL_MAP.corporationNumber}
        </Text>

        <Controller
          control={control}
          name="corporationNumber"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Enter corporation number"
              style={styles.input}
              onBlur={onBlur}
              onChangeText={text => onChange(Number(text))}
              value={value ? String(value) : ''}
              keyboardType="numeric"
              maxLength={MAX_CORPORATION_NUMBER_LENGTH}
            />
          )}
        />
        <View style={styles.errorContainer}>
          {renderError(errors.corporationNumber)}
        </View>
      </View>

      <Pressable style={styles.button} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}>Submit</Text>
      </Pressable>
    </View>
  );
};

export default Onboarding;
