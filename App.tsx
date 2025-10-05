/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Onboarding from './src/screens/Onboarding/Onboarding';
import theme from './src/utils/theme';
import { useEffect } from 'react';
import useThemeStore from './src/hooks/useThemeStore';

function App() {
  const colorScheme = useColorScheme() || 'light';

  const { isDarkMode, toggleThemeMode } = useThemeStore();

  useEffect(() => {
    if (colorScheme === 'dark') {
      toggleThemeMode();
    }
  }, [colorScheme, toggleThemeMode]);

  const selectedTheme = theme[isDarkMode ? 'dark' : 'light'];

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <SafeAreaView style={[styles.container, selectedTheme.containerStyle]}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}
        >
          <Onboarding selectedTheme={selectedTheme} />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
