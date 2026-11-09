/**
 * Central environment access point.
 *
 * Expo inlines `EXPO_PUBLIC_*` variables at bundle time — never read
 * `process.env` directly anywhere else in the app. Secrets must NOT use
 * the EXPO_PUBLIC_ prefix (they would ship inside the app bundle).
 */
const readEnv = (key: string): string | undefined => process.env[key];

export const config = {
  /** Base URL of the backend API, e.g. https://api.nxtmart.example.com */
  apiBaseUrl: readEnv('EXPO_PUBLIC_API_BASE_URL') ?? '',
  /**
   * When true (default), repositories return mock data.
   * Set to "false" and provide EXPO_PUBLIC_API_BASE_URL to hit a real backend.
   */
  useMockApi: readEnv('EXPO_PUBLIC_USE_MOCK_API') !== 'false',
} as const;

export type AppConfig = typeof config;
