import { mockLatency } from '@/constants/app';

/**
 * Simulated network latency so loading states are visible during demos.
 * Replace with real HTTP timing once API repositories are enabled.
 */
export function delay(min: number = mockLatency.min, max: number = mockLatency.max): Promise<void> {
  const ms = min + Math.random() * (max - min);
  return new Promise((resolve) => setTimeout(resolve, ms));
}
