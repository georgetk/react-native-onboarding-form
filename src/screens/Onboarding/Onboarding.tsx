import React from 'react';
import { View, Text, Pressable } from 'react-native';
import styles from './styles';
import Loader from '../../components/Loader/Loader';
import { useOnboardingForm } from './hooks/useOnboardingForm';
import {
  FIELD_LABEL_MAP,
  MAX_NAME_LENGTH,
  MAX_PHONE_NUMBER_LENGTH,
  MAX_CORPORATION_NUMBER_LENGTH,
} from './onboardingSchema';
import FormField from '../../components/FormField/FormField';
import APP_TEXTS from '../../constants/strings';

const Onboarding = () => {
  const { control, handleSubmit, errors, loading, onSubmit } =
    useOnboardingForm();

  return (
    <View style={styles.container}>
      {loading ? <Loader /> : null}

      <Text style={styles.headerText}>{APP_TEXTS.ONBOARDING_HEADER}</Text>

      <View style={styles.formContainer}>
        <FormField
          control={control}
          name="firstName"
          label={FIELD_LABEL_MAP.firstName}
          placeholder={APP_TEXTS.ONBOARDING_FIRSTNAME_PLACEHOLDER}
          maxLength={MAX_NAME_LENGTH}
          error={errors.firstName?.message}
        />

        <FormField
          control={control}
          name="lastName"
          label={FIELD_LABEL_MAP.lastName}
          placeholder={APP_TEXTS.ONBOARDING_LASTNAME_PLACEHOLDER}
          maxLength={MAX_NAME_LENGTH}
          error={errors.lastName?.message}
        />

        <FormField
          control={control}
          name="phone"
          label={FIELD_LABEL_MAP.phone}
          placeholder={APP_TEXTS.ONBOARDING_PHONE_PLACEHOLDER}
          keyboardType="phone-pad"
          maxLength={MAX_PHONE_NUMBER_LENGTH}
          error={errors.phone?.message}
        />

        <FormField
          control={control}
          name="corporationNumber"
          label={FIELD_LABEL_MAP.corporationNumber}
          placeholder={APP_TEXTS.ONBOARDING_CORPORATION_PLACEHOLDER}
          keyboardType="numeric"
          maxLength={MAX_CORPORATION_NUMBER_LENGTH}
          error={errors.corporationNumber?.message}
        />
      </View>

      <Pressable style={styles.button} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}>{APP_TEXTS.ONBOARDING_SUBMIT}</Text>
      </Pressable>
    </View>
  );
};

export default Onboarding;
