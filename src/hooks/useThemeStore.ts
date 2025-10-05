import { create } from 'zustand';

type ThemeStore = {
  isDarkMode: boolean;
  toggleThemeMode: () => void;
};

const useThemeStore = create<ThemeStore>(set => ({
  isDarkMode: false,
  toggleThemeMode: () => set(state => ({ isDarkMode: !state.isDarkMode })),
}));

export default useThemeStore;
