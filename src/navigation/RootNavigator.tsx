import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import {
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  createBottomTabNavigator,
  type BottomTabBarProps,
} from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import type { MainTabParamList, RootStackParamList } from './types';
import { DashboardScreen } from '../screens/DashboardScreen';
import { DashboardMenuScreen } from '../screens/DashboardMenuScreen';
import { DashboardStatsScreen } from '../screens/DashboardStatsScreen';
import { MoneyManagementScreen } from '../screens/MoneyManagementScreen';
import { TimeManagementScreen } from '../screens/TimeManagementScreen';
import { colors, fontFamilies } from '../theme';

const RootStack = createNativeStackNavigator<RootStackParamList>();
const MainTabs = createBottomTabNavigator<MainTabParamList>();

/** Lets callers (e.g. the shell test) reach a root-stack route directly. */
export const navigationRef = createNavigationContainerRef<RootStackParamList>();

type TabItem = {
  /** Stable test id suffix, also used to reach a screen. */
  key: string;
  label: string;
  route: keyof MainTabParamList;
  renderIcon: (color: string) => React.ReactNode;
};

/**
 * The bottom bar connects exactly the three screens of this sprint, in the
 * order the shared contract defines: Dashboard, Money Management, Time
 * Management. There is no fourth entry - every item here has a screen behind
 * it. Content without a screen is marked "coming soon" inside a screen, never
 * added as an extra tab.
 */
const TAB_ITEMS: TabItem[] = [
  {
    key: 'Dashboard',
    label: 'Dashboard',
    route: 'Dashboard',
    renderIcon: (color) => <Ionicons name="home-outline" size={22} color={color} />,
  },
  {
    key: 'MoneyManagement',
    label: 'Money Management',
    route: 'MoneyManagement',
    renderIcon: (color) => <Ionicons name="wallet-outline" size={22} color={color} />,
  },
  {
    key: 'TimeManagement',
    label: 'Time Management',
    route: 'TimeManagement',
    renderIcon: (color) => <Ionicons name="calendar-outline" size={22} color={color} />,
  },
];

function BottomTabBar({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const activeRoute = state.routes[state.index]?.name;

  return (
    <View
      style={[styles.tabBar, { paddingBottom: insets.bottom }]}
      testID="bottom-tab-bar"
    >
      <View style={styles.itemsRow}>
        {TAB_ITEMS.map((item) => {
          const active = item.route === activeRoute;
          const color = active ? colors.accent : colors.navInactive;

          return (
            <Pressable
              key={item.key}
              accessibilityRole="tab"
              accessibilityState={{ selected: active }}
              accessibilityLabel={item.label}
              onPress={() => navigation.navigate(item.route)}
              testID={`tab-${item.key}`}
              style={styles.item}
            >
              <View style={styles.iconBox}>{item.renderIcon(color)}</View>
              <Text style={[styles.label, { color }]} numberOfLines={1}>
                {item.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

function MainTabNavigator() {
  return (
    <MainTabs.Navigator
      initialRouteName="Dashboard"
      tabBar={(props) => <BottomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <MainTabs.Screen name="Dashboard" component={DashboardScreen} />
      <MainTabs.Screen name="MoneyManagement" component={MoneyManagementScreen} />
      <MainTabs.Screen name="TimeManagement" component={TimeManagementScreen} />
    </MainTabs.Navigator>
  );
}

export function RootNavigator() {
  return (
    <SafeAreaProvider>
      <NavigationContainer ref={navigationRef}>
        <RootStack.Navigator
          initialRouteName="Tabs"
          screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.bg } }}
        >
          <RootStack.Screen name="Tabs" component={MainTabNavigator} />
          <RootStack.Screen name="DashboardMenu" component={DashboardMenuScreen} />
          <RootStack.Screen name="DashboardStats" component={DashboardStatsScreen} />
        </RootStack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default RootNavigator;

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.surface,
    shadowColor: '#607193',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.16,
    shadowRadius: 20,
    elevation: 12,
  },
  itemsRow: {
    height: 77,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    minHeight: 44,
  },
  iconBox: {
    height: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontFamily: fontFamilies.aleo,
    fontSize: 7,
    lineHeight: 9,
  },
});
