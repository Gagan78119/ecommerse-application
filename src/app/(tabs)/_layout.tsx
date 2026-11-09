import { Tabs } from 'expo-router';
import { House, LogOut, ShoppingCart } from 'lucide-react-native';

import { useAuthStore } from '@/stores/authStore';
import { useCartCount } from '@/stores/cartStore';
import { theme } from '@/theme';

export default function TabsLayout() {
  const cartCount = useCartCount();
  const clearSession = useAuthStore((s) => s.clearSession);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
        tabBarStyle: { backgroundColor: theme.colors.surface, borderTopColor: theme.colors.border },
      }}>
      <Tabs.Screen name="index" options={{ tabBarIcon: ({ color, size }) => <House color={color} size={size} /> }} />
      <Tabs.Screen
        name="cart"
        options={{
          tabBarBadge: cartCount > 0 ? cartCount : undefined,
          tabBarBadgeStyle: { backgroundColor: theme.colors.primary, color: theme.colors.textInverse },
          tabBarIcon: ({ color, size }) => <ShoppingCart color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="logout"
        options={{ tabBarIcon: ({ color, size }) => <LogOut color={color} size={size} /> }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            clearSession();
          },
        }}
      />
    </Tabs>
  );
}
