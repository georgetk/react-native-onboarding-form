import React, { FC } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
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
import { Theme } from '../../utils/theme';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
import useThemeStore from '../../hooks/useThemeStore';

type OnboardingProps = {
  selectedTheme: Theme;
};

const Onboarding: FC<OnboardingProps> = ({ selectedTheme }) => {
  const { control, handleSubmit, errors, loading, onSubmit } =
    useOnboardingForm();

  const { isDarkMode, toggleThemeMode } = useThemeStore();

  return (
    <View style={styles.container}>
      {loading ? <Loader /> : null}

      <View style={styles.headerContainer}>
        <Text
          style={[styles.headerText, selectedTheme.labelStyle]}
          testID="onboarding_header_text"
        >
          {APP_TEXTS.ONBOARDING_HEADER}
        </Text>

        <Pressable onPress={toggleThemeMode} style={styles.themeModeButton}>
          <MaterialDesignIcons
            name={isDarkMode ? 'white-balance-sunny' : 'moon-waning-crescent'}
            size={28}
            style={selectedTheme.labelStyle}
          />
        </Pressable>
      </View>

      <ScrollView
        style={styles.formContainer}
        showsVerticalScrollIndicator={false}
      >
        <FormField
          control={control}
          name="firstName"
          label={FIELD_LABEL_MAP.firstName}
          placeholder={APP_TEXTS.ONBOARDING_FIRSTNAME_PLACEHOLDER}
          maxLength={MAX_NAME_LENGTH}
          error={errors.firstName?.message}
          selectedTheme={selectedTheme}
        />

        <FormField
          control={control}
          name="lastName"
          label={FIELD_LABEL_MAP.lastName}
          placeholder={APP_TEXTS.ONBOARDING_LASTNAME_PLACEHOLDER}
          maxLength={MAX_NAME_LENGTH}
          error={errors.lastName?.message}
          selectedTheme={selectedTheme}
        />

        <FormField
          control={control}
          name="phone"
          label={FIELD_LABEL_MAP.phone}
          placeholder={APP_TEXTS.ONBOARDING_PHONE_PLACEHOLDER}
          keyboardType="phone-pad"
          maxLength={MAX_PHONE_NUMBER_LENGTH}
          error={errors.phone?.message}
          selectedTheme={selectedTheme}
        />

        <FormField
          control={control}
          name="corporationNumber"
          label={FIELD_LABEL_MAP.corporationNumber}
          placeholder={APP_TEXTS.ONBOARDING_CORPORATION_PLACEHOLDER}
          keyboardType="numeric"
          maxLength={MAX_CORPORATION_NUMBER_LENGTH}
          error={errors.corporationNumber?.message}
          selectedTheme={selectedTheme}
        />
      </ScrollView>

      <Pressable
        style={[styles.button, selectedTheme.buttonStyle]}
        onPress={handleSubmit(onSubmit)}
        testID="onboarding_submit_button"
      >
        <Text style={[styles.buttonText, selectedTheme.buttonTextStyle]}>
          {APP_TEXTS.ONBOARDING_SUBMIT}
        </Text>
        <MaterialDesignIcons
          name={'arrow-right'}
          size={20}
          style={selectedTheme.buttonTextStyle}
        />
      </Pressable>
    </View>
  );
};

export default Onboarding;
