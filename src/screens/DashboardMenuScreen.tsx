import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import type { RootStackParamList } from '../navigation/types';
import { colors, spacing, typography } from '../theme';

export type DashboardMenuScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'DashboardMenu'
>;

type MenuEntry = {
  /** Stable test id suffix and React key. */
  key: string;
  label: string;
  icon: React.ReactNode;
  /** Entries without a screen this sprint stay disabled and say "coming soon". */
  disabled: boolean;
};

/**
 * The Figma frame draws the Dashboard Menu as a drawer over the Dashboard
 * screen: a dimmed backdrop behind a 294px white panel that carries the green
 * header (profile block plus back control) and the four entries.
 *
 * Layout note (AC-07): the back control and the profile block are laid out as
 * SIBLINGS in one flex row inside the header, so neither can ever paint over or
 * intercept the other's touches. The backdrop is a full-screen layer painted
 * BEFORE the drawer, and the drawer paints on top of it - the Figma frame's own
 * back-to-front order. No element between the back control and the screen root
 * overlaps it, so its hit area is never covered by a sibling wrapper.
 *
 * "Statistics" is wired to the DashboardStats route. "Help", "Account Settings"
 * and "Logout" have no screen in this sprint, so they are visibly disabled and
 * carry a "coming soon" marker (AC-09): none of them stays silently inert.
 */
export function DashboardMenuScreen({ navigation }: DashboardMenuScreenProps) {
  const insets = useSafeAreaInsets();

  const entries: MenuEntry[] = [
    {
      key: 'Statistics',
      label: 'Statistics',
      icon: <Ionicons name="stats-chart-outline" size={19} color={colors.fg} />,
      disabled: false,
    },
    {
      key: 'AccountSettings',
      label: 'Account Settings',
      icon: (
        <Image
          source={require('../../design/figma/assets/noun-user-1335326-19x19.png')}
          style={styles.entryIconImage}
        />
      ),
      disabled: true,
    },
    {
      key: 'Help',
      label: 'Help',
      icon: (
        <Image
          source={require('../../design/figma/assets/noun-info-1174604-17x17.png')}
          style={styles.entryIconImage}
        />
      ),
      disabled: true,
    },
  ];

  const logoutEntry: MenuEntry = {
    key: 'Logout',
    label: 'Logout',
    icon: <Ionicons name="log-out-outline" size={20} color={colors.fg} />,
    disabled: true,
  };

  const onEntryPress = (entry: MenuEntry) => {
    if (entry.disabled) {
      return;
    }
    if (entry.key === 'Statistics') {
      navigation.navigate('DashboardStats');
    }
  };

  const renderEntry = (entry: MenuEntry) => (
    <Pressable
      key={entry.key}
      testID={`menu-entry-${entry.key}`}
      accessibilityRole="button"
      accessibilityLabel={entry.label}
      accessibilityState={{ disabled: entry.disabled }}
      disabled={entry.disabled}
      onPress={() => onEntryPress(entry)}
      style={({ pressed }) => [
        styles.entry,
        entry.disabled ? styles.entryDisabled : null,
        pressed && !entry.disabled ? styles.entryPressed : null,
      ]}
    >
      <View style={styles.entryIcon}>{entry.icon}</View>
      <Text style={styles.entryLabel}>{entry.label}</Text>
      {entry.disabled ? <Text style={styles.comingSoon}>coming soon</Text> : null}
    </Pressable>
  );

  return (
    <View style={styles.screen} testID="screen-DashboardMenu" pointerEvents="box-none">
      {/* Painted first (behind): the dimmed backdrop covering the whole screen. */}
      <View style={styles.backdrop} pointerEvents="auto" />

      {/* Painted after (in front): the drawer surface, header included. */}
      <View style={styles.drawer} testID="dashboard-menu-drawer">
        <View style={styles.header}>
          <View style={styles.profileRow}>
            <Image
              source={require('../../design/figma/assets/profile-image.png')}
              style={styles.avatar}
            />
            <View style={styles.profileText}>
              <Text style={styles.profileName}>Sophie Garnier</Text>
              <Text style={styles.profileLocation}>Luxembourg</Text>
            </View>
          </View>

          <Pressable
            testID="menu-back"
            accessibilityRole="button"
            accessibilityLabel="Back"
            onPress={() => navigation.goBack()}
            style={({ pressed }) => [
              styles.backControl,
              pressed ? styles.backControlPressed : null,
            ]}
          >
            <Image
              source={require('../../design/figma/assets/icon-13x13.png')}
              style={styles.backIcon}
            />
          </Pressable>
        </View>

        <View style={[styles.entries, { paddingBottom: spacing.space4 + insets.bottom }]}>
          {entries.map(renderEntry)}
          <View style={styles.spacer} />
          {renderEntry(logoutEntry)}
        </View>
      </View>
    </View>
  );
}

export default DashboardMenuScreen;

const DRAWER_WIDTH = 294;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.panel,
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  drawer: {
    width: DRAWER_WIDTH,
    flex: 1,
    backgroundColor: colors.surface,
  },
  /*
   * One flex row: the profile block (left, flexible) and the back control
   * (right, fixed) are siblings. They sit side by side and cannot overlap, so
   * the back control's hit area is never covered by the profile block.
   */
  header: {
    height: 208,
    backgroundColor: colors.accent,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingTop: 87,
    paddingLeft: 23,
    paddingRight: 21,
  },
  backControl: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backControlPressed: {
    opacity: 0.6,
  },
  backIcon: {
    width: 13,
    height: 13,
    resizeMode: 'contain',
  },
  profileRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: spacing.space1,
  },
  avatar: {
    width: 75,
    height: 75,
    borderRadius: 38,
    resizeMode: 'cover',
  },
  profileText: {
    flexShrink: 1,
    marginLeft: spacing.space1,
    justifyContent: 'center',
  },
  profileName: {
    ...typography.text16,
    color: colors.fg,
  },
  profileLocation: {
    ...typography.text14Alt,
    color: colors.fg,
    marginTop: 2,
  },
  entries: {
    flex: 1,
    paddingTop: spacing.space7,
    paddingLeft: spacing.space4,
    paddingRight: spacing.space4,
  },
  entry: {
    minHeight: 44,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 11,
  },
  entryDisabled: {
    opacity: 0.4,
  },
  entryPressed: {
    opacity: 0.7,
  },
  entryIcon: {
    width: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  entryIconImage: {
    width: 19,
    height: 19,
    resizeMode: 'contain',
  },
  entryLabel: {
    ...typography.text14,
    color: colors.fg,
    opacity: 0.6,
    marginLeft: spacing.space0,
  },
  comingSoon: {
    ...typography.text10,
    color: colors.muted2,
    marginLeft: spacing.space1,
    textTransform: 'uppercase',
  },
  spacer: {
    flex: 1,
  },
});
