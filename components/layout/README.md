# Class Connect Layout Components

This directory contains reusable layout components for the Class Connect application.

## Components

### AppLayout
The main layout wrapper that includes navbar, sidebar, and footer components.

**Props:**
- `children`: React.ReactNode - Content to be rendered in the main area
- `activePage?`: string - Name of the currently active page (for sidebar highlighting)
- `showSidebar?`: boolean - Whether to show the sidebar (default: true)
- `showFooter?`: boolean - Whether to show the footer (default: true)

**Usage:**
```tsx
import { AppLayout } from '../components/layout';

export default function MyPage() {
  return (
    <AppLayout activePage="Study Resources" showFooter={false}>
      <div className="p-6">
        {/* Your page content */}
      </div>
    </AppLayout>
  );
}
```

### Navbar
Top navigation bar with theme toggle and navigation links.

**Props:**
- `isDark`: boolean - Current theme state
- `onToggleTheme`: () => void - Function to toggle theme

### Sidebar
Left navigation sidebar with menu items and user actions.

**Props:**
- `isDark`: boolean - Current theme state
- `activePage?`: string - Currently active page for highlighting

### Footer
Bottom footer with links and company information.

**Props:**
- `isDark`: boolean - Current theme state

## Theme Provider

The `ThemeProvider` component manages the global theme state and persists it to localStorage.

**Usage:**
```tsx
import { ThemeProvider, useTheme } from '../components/providers/ThemeProvider';

// In your app root:
<ThemeProvider>
  <App />
</ThemeProvider>

// In any component:
function MyComponent() {
  const { isDark, toggleTheme } = useTheme();
  // Use theme state...
}
```

## Theme Utilities

Use the `getThemeClasses` helper for consistent theming:

```tsx
import { getThemeClasses } from '../components/layout';
import { useTheme } from '../components/providers/ThemeProvider';

function MyComponent() {
  const { isDark } = useTheme();
  const themeClasses = getThemeClasses(isDark);
  
  return (
    <div className={`${themeClasses.bgSecondary} ${themeClasses.textPrimary}`}>
      {/* Your content */}
    </div>
  );
}
```

## File Structure

```
components/
├── layout/
│   ├── AppLayout.tsx      # Main layout wrapper
│   ├── Navbar.tsx         # Top navigation
│   ├── Sidebar.tsx        # Left sidebar
│   ├── Footer.tsx         # Bottom footer
│   └── index.ts           # Exports and utilities
└── providers/
    └── ThemeProvider.tsx  # Theme state management
```

## Example Page Implementation

```tsx
"use client";
import React from 'react';
import { AppLayout } from '../../components/layout';

export default function MyPage() {
  return (
    <AppLayout 
      activePage="My Page" 
      showSidebar={true} 
      showFooter={true}
    >
      <div className="p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-semibold text-orange-500 mb-8">
            My Page Title
          </h1>
          
          {/* Your page content here */}
        </div>
      </div>
    </AppLayout>
  );
}
```

## Benefits

- **Consistent Design**: All pages use the same layout structure
- **Theme Management**: Centralized dark/light theme handling
- **Responsive**: Components adapt to different screen sizes
- **Reusable**: Easy to implement across different pages
- **Maintainable**: Changes to layout affect all pages
- **TypeScript**: Full type safety and IntelliSense support