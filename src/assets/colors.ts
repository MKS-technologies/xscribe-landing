// Professional color scheme
export const colors = {
  // Primary colors
  primary: '#2563eb',      // Blue
  primaryDark: '#1d4ed8',  // Darker blue
  primaryLight: '#3b82f6', // Lighter blue
  
  // Secondary colors
  secondary: '#64748b',    // Slate
  secondaryDark: '#475569', // Dark slate
  secondaryLight: '#94a3b8', // Light slate
  
  // Background colors (bright)
  background: '#ffffff',   // White
  backgroundLight: '#f8fafc', // Very light gray
  backgroundGray: '#f1f5f9', // Light gray
  
  // Text colors (darker)
  textPrimary: '#1e293b',  // Dark slate
  textSecondary: '#475569', // Medium slate
  textMuted: '#64748b',    // Light slate
  
  // Button colors (brighter)
  buttonPrimary: '#3b82f6', // Bright blue
  buttonSecondary: '#10b981', // Bright green
  buttonDanger: '#ef4444',  // Bright red
  buttonWarning: '#f59e0b', // Bright orange
  
  // Navigation colors (professional)
  navBackground: '#1e293b', // Dark slate
  navText: '#f8fafc',      // Light text
  navHover: '#334155',     // Hover state
  navActive: '#3b82f6',    // Active state
  
  // Accent colors
  success: '#10b981',      // Green
  successDark: '#059669',  // Darker green
  error: '#ef4444',        // Red
  errorDark: '#dc2626',    // Darker red
  warning: '#f59e0b',      // Orange
  info: '#3b82f6',         // Blue
  
  // Border colors
  border: '#e2e8f0',       // Light border
  borderDark: '#cbd5e1',   // Darker border
} as const

export type ColorKey = keyof typeof colors 