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
import { colors, tabBar } from '../theme';

const RootStack = createNativeStackNavigator<RootStackParamList>();
const MainTabs = createBottomTabNavigator<MainTabParamList>();

/** Lets callers (e.g. the shell test) reach a root-stack route directly. */
export const navigationRef = createNavigationContainerRef<RootStackParamList>();

type TabItem = {
  /** Token key, also the icon-size key in the theme. */
  key: string;
  /** Stable test id, used by the shell test and the QA specs. */
  testID: string;
  /** The frames' own label, kept verbatim. */
  label: string;
  /** Navigable items carry the route they reach; the disabled one has none. */
  route?: keyof MainTabParamList;
  disabled?: boolean;
  iconName: React.ComponentProps<typeof Ionicons>['name'];
};

/**
 * The bottom bar reproduces the four-item frame: Home → Dashboard,
 * Products → Money Management, Today → Time Management. "Liked" is the frame's
 * fourth item - a disabled VISUAL placeholder with no screen and no navigation
 * call (AC-09: visibly disabled rather than silently inert). A centred
 * notch/reserved space at the top edge holds the screens' FloatingAddButton.
 */
const TAB_ITEMS: TabItem[] = [
  {
    key: 'Dashboard',
    testID: 'tab-Dashboard',
    label: 'Home',
    route: 'Dashboard',
    iconName: 'home-outline',
  },
  {
    key: 'MoneyManagement',
    testID: 'tab-MoneyManagement',
    label: 'Products',
    route: 'MoneyManagement',
    iconName: 'storefront-outline',
  },
  {
    key: 'Liked',
    testID: 'tab-Liked-disabled',
    label: 'Liked',
    disabled: true,
    iconName: 'heart-outline',
  },
  {
    key: 'TimeManagement',
    testID: 'tab-TimeManagement',
    label: 'Today',
    route: 'TimeManagement',
    iconName: 'person-outline',
  },
];

function BottomTabBar({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const activeRoute = state.routes[state.index]?.name;

  const renderItem = (item: TabItem) => {
    const route = item.route;
    const active = route !== undefined && route === activeRoute;
    const color = active ? colors.accent : colors.navInactive;
    const iconSize = tabBar.iconSizes[item.key as keyof typeof tabBar.iconSizes];

    return (
      <Pressable
        key={item.key}
        accessibilityRole="tab"
        accessibilityState={{ selected: active, disabled: item.disabled === true }}
        accessibilityLabel={item.label}
        disabled={item.disabled}
        onPress={route ? () => navigation.navigate(route) : undefined}
        testID={item.testID}
        style={styles.item}
      >
        <View style={[styles.itemContent, item.disabled && styles.itemDisabled]}>
          <View style={styles.iconBox}>
            <Ionicons name={item.iconName} size={iconSize} color={color} />
          </View>
          <Text style={[styles.label, { color }]} numberOfLines={1}>
            {item.label}
          </Text>
        </View>
      </Pressable>
    );
  };

  return (
    <View
      style={[styles.tabBar, { paddingBottom: insets.bottom }]}
      testID="bottom-tab-bar"
    >
      <View style={styles.itemsRow}>
        <View style={styles.sideGroup}>{TAB_ITEMS.slice(0, 2).map(renderItem)}</View>
        <View style={styles.reservedSpace} testID="tab-bar-reserved-space" />
        <View style={styles.sideGroup}>{TAB_ITEMS.slice(2).map(renderItem)}</View>
      </View>

      <View style={styles.notch} pointerEvents="none" testID="tab-bar-notch" />
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
    shadowColor: tabBar.shadowColor,
    shadowOffset: tabBar.shadowOffset,
    shadowOpacity: tabBar.shadowOpacity,
    shadowRadius: tabBar.shadowRadius,
    elevation: tabBar.elevation,
  },
  itemsRow: {
    height: tabBar.height,
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingTop: tabBar.iconRowTop,
    paddingHorizontal: tabBar.sidePadding,
  },
  sideGroup: {
    flexDirection: 'row',
    gap: tabBar.itemGap,
  },
  reservedSpace: {
    flex: 1,
  },
  item: {
    width: tabBar.itemWidth,
    minHeight: tabBar.minTouchTarget,
    alignItems: 'center',
  },
  itemContent: {
    alignItems: 'center',
    gap: tabBar.iconLabelGap,
  },
  itemDisabled: {
    opacity: tabBar.disabledOpacity,
  },
  iconBox: {
    height: tabBar.iconBoxHeight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    ...tabBar.label,
  },
  notch: {
    position: 'absolute',
    top: 0,
    left: '50%',
    marginLeft: -tabBar.notchWidth / 2,
    width: tabBar.notchWidth,
    height: tabBar.notchHeight,
    borderBottomLeftRadius: tabBar.notchRadius,
    borderBottomRightRadius: tabBar.notchRadius,
    backgroundColor: colors.bg,
  },
});
