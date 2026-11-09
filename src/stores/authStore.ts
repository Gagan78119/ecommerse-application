import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { storageKeys } from '@/constants/app';
import type { AuthSession } from '@/types';

type AuthState = {
  session: AuthSession | null;
  /** True once AsyncStorage hydration finishes — prevents login flicker */
  hasHydrated: boolean;
  setSession: (session: AuthSession) => void;
  clearSession: () => void;
  setHasHydrated: (value: boolean) => void;
};

/**
 * Auth session store — the ONLY persisted store.
 * Cart deliberately stays in-memory (resets on relaunch per requirements).
 */
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      session: null,
      hasHydrated: false,
      setSession: (session) => set({ session }),
      clearSession: () => set({ session: null }),
      setHasHydrated: (hasHydrated) => set({ hasHydrated }),
    }),
    {
      name: storageKeys.authSession,
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ session: state.session }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
