/**
 * Mock failure injection — lets you demo loading/error states without a backend.
 *
 * Usage (dev only):
 *   import { mockControl } from '@/services/mock/mockControl';
 *   mockControl.failProducts = true;   // next getProducts() rejects
 *
 * Wire a hidden debug toggle in the UI if you want this reachable on-device.
 */
export const mockControl = {
  failProducts: false,
  failCategories: false,
  failLogin: false,
  failOrders: false,
};
