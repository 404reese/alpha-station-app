export { default as AppLayout } from './AppLayout';
export { default as Navbar } from './Navbar';
export { default as Sidebar } from './Sidebar';
export { default as Footer } from './Footer';

// Theme utilities for consistent theming across components
export const getThemeClasses = (isDark: boolean) => ({
  // Background colors
  bgPrimary: isDark ? 'bg-stone-900' : 'bg-stone-50',
  bgSecondary: isDark ? 'bg-stone-800' : 'bg-white',
  bgTertiary: isDark ? 'bg-stone-700' : 'bg-stone-100',
  bgQuaternary: isDark ? 'bg-stone-600' : 'bg-stone-50',
  
  // Text colors
  textPrimary: isDark ? 'text-stone-100' : 'text-stone-900',
  textSecondary: isDark ? 'text-stone-300' : 'text-stone-700',
  textMuted: isDark ? 'text-stone-400' : 'text-stone-600',
  textSubtle: isDark ? 'text-stone-500' : 'text-stone-500',
  
  // Border colors
  borderPrimary: isDark ? 'border-stone-700' : 'border-stone-200',
  borderSecondary: isDark ? 'border-stone-600' : 'border-stone-100',
  borderHover: isDark ? 'border-stone-600' : 'border-stone-300',
  
  // Hover states
  hoverBg: isDark ? 'hover:bg-stone-700' : 'hover:bg-stone-50',
  hoverBgSecondary: isDark ? 'hover:bg-stone-600' : 'hover:bg-stone-200',
  hoverText: isDark ? 'hover:text-stone-200' : 'hover:text-stone-900',
  hoverBorder: isDark ? 'hover:border-stone-600' : 'hover:border-stone-300'
});