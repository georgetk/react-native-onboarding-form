import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

const lightStyles = StyleSheet.create({
  lightContainer: {
    backgroundColor: '#fff',
  },
  lightLabel: {
    color: '#000',
  },
  lightBorder: {
    borderColor: '#CCCCCC',
  },
  lightButton: {
    backgroundColor: '#000',
  },
  lightButtonText: {
    color: '#fff',
  },
  lightErrorText: { color: '#FF3B30' },
  lightInputText: {
    color: '#000',
  },
});

const darkStyles = StyleSheet.create({
  darkContainer: {
    backgroundColor: '#000',
  },
  darkLabel: {
    color: '#fff',
  },
  darkBorder: {
    borderColor: '#444444',
  },
  darkButton: {
    backgroundColor: '#fff',
  },
  darkButtonText: {
    color: '#000',
  },
  darkErrorText: { color: '#FF453A' },
  darkInputText: {
    color: '#FFF',
  },
});

export type Theme = {
  containerStyle: ViewStyle;
  labelStyle: TextStyle;
  borderStyle: ViewStyle;
  buttonStyle: ViewStyle;
  buttonTextStyle: TextStyle;
  errorTextStyle: TextStyle;
  inputTextStyle: TextStyle;
  placeholderTextColor: string;
};

type ThemeModes = {
  light: Theme;
  dark: Theme;
};

const theme: ThemeModes = {
  light: {
    containerStyle: lightStyles.lightContainer,
    labelStyle: lightStyles.lightLabel,
    borderStyle: lightStyles.lightBorder,
    buttonStyle: lightStyles.lightButton,
    buttonTextStyle: lightStyles.lightButtonText,
    errorTextStyle: lightStyles.lightErrorText,
    inputTextStyle: lightStyles.lightInputText,
    placeholderTextColor: '#8A8A8A',
  },
  dark: {
    containerStyle: darkStyles.darkContainer,
    labelStyle: darkStyles.darkLabel,
    borderStyle: darkStyles.darkBorder,
    buttonStyle: darkStyles.darkButton,
    buttonTextStyle: darkStyles.darkButtonText,
    errorTextStyle: darkStyles.darkErrorText,
    inputTextStyle: darkStyles.darkInputText,
    placeholderTextColor: '#AAA',
  },
};

export default theme;
