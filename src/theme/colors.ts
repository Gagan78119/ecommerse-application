export const colors = {
  primary: '#0A8F08',
  primaryDark: '#087006',
  primaryLight: '#DCFCE7',
  primarySurface: '#F0FDF0',

  success: '#0A8F08',
  error: '#E02424',
  errorSurface: '#FEF2F2',
  warning: '#F59E0B',

  background: '#FFFFFF',
  surface: '#FFFFFF',
  surfaceMuted: '#F3F4F6',
  border: '#D9DDE3',
  borderStrong: '#9CA3AF',
  disabled: '#B5B5B5',

  textPrimary: '#1F2937',
  textSecondary: '#6B7280',
  textInverse: '#FFFFFF',

  overlay: 'rgba(0, 0, 0, 0.45)',
  skeleton: '#E8ECEB',
} as const;

export type ColorToken = keyof typeof colors;
