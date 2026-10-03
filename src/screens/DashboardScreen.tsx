import React, { useMemo, useState } from 'react';
import {
  Image,
  type ImageSourcePropType,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import type { MainTabParamList, RootStackParamList } from '../navigation/types';
import { colors, radii, spacing, typography } from '../theme';

export type DashboardScreenProps = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'Dashboard'>,
  NativeStackScreenProps<RootStackParamList>
>;

type DashboardTile = {
  key: 'TimeManagement' | 'MoneyManagement' | 'AppManagement' | 'FoodManagement';
  label: string;
  image: ImageSourcePropType;
  imageWidth: number;
  imageHeight: number;
  /** Present only for tiles whose screen exists in this sprint. */
  route?: keyof MainTabParamList;
  /** Tiles without a screen stay visible but do nothing. */
  disabled?: boolean;
};

/**
 * The four entry tiles the Dashboard frame draws, in reading order
 * (top-left, top-right, bottom-left, bottom-right). Food and App Management
 * have no screen in this sprint and are rendered as "coming soon".
 */
const TILES: DashboardTile[] = [
  {
    key: 'TimeManagement',
    label: 'Time Management',
    image: require('../../design/figma/assets/illustration-128x114.png'),
    imageWidth: 128,
    imageHeight: 114,
    route: 'TimeManagement',
  },
  {
    key: 'MoneyManagement',
    label: 'Money Management',
    image: require('../../design/figma/assets/illustration-118x109.png'),
    imageWidth: 118,
    imageHeight: 109,
    route: 'MoneyManagement',
  },
  {
    key: 'AppManagement',
    label: 'App Management',
    image: require('../../design/figma/assets/illustration-120x133.png'),
    imageWidth: 120,
    imageHeight: 133,
    disabled: true,
  },
  {
    key: 'FoodManagement',
    label: 'Food Management',
    image: require('../../design/figma/assets/undraw-personal-site-xyd1.png'),
    imageWidth: 88,
    imageHeight: 130,
    disabled: true,
  },
];

export function DashboardScreen({ navigation }: DashboardScreenProps) {
  const [query, setQuery] = useState('');

  const visibleTiles = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (needle.length === 0) {
      return TILES;
    }
    return TILES.filter((tile) => tile.label.toLowerCase().includes(needle));
  }, [query]);

  const openTile = (tile: DashboardTile) => {
    if (tile.route) {
      navigation.navigate(tile.route);
    }
  };

  return (
    <View style={styles.screen} testID="screen-Dashboard">
      <SafeAreaView edges={['top']} style={styles.headerSafe}>
        <View style={styles.header}>
          <View style={styles.headerRow}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Open dashboard menu"
              onPress={() => navigation.navigate('DashboardMenu')}
              testID="dashboard-menu-button"
              style={styles.headerButton}
            >
              <Ionicons name="menu" size={22} color={colors.onAccent} />
            </Pressable>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Open dashboard statistics"
              onPress={() => navigation.navigate('DashboardStats')}
              testID="dashboard-stats-button"
              style={styles.headerButton}
            >
              <Image
                source={require('../../design/figma/assets/noun-user-1335326-ffffff.png')}
                style={styles.userIcon}
                resizeMode="contain"
              />
            </Pressable>
          </View>
          <Text style={styles.headerTitle}>Dashboard</Text>
        </View>
      </SafeAreaView>

      <ScrollView
        style={styles.body}
        contentContainerStyle={styles.bodyContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.search}>
          <View style={styles.searchInputWrap}>
            {query.length === 0 ? (
              <Text style={styles.searchPlaceholder} pointerEvents="none">
                Search
              </Text>
            ) : null}
            <TextInput
              style={styles.searchInput}
              value={query}
              onChangeText={setQuery}
              testID="dashboard-search"
              accessibilityLabel="Search"
              autoCorrect={false}
              autoCapitalize="none"
              returnKeyType="search"
            />
          </View>
          <Ionicons name="search" size={16} color={colors.ink} />
        </View>

        <View style={styles.grid}>
          {visibleTiles.map((tile) => {
            const disabled = Boolean(tile.disabled);
            return (
              <Pressable
                key={tile.key}
                accessibilityRole="button"
                accessibilityState={{ disabled }}
                accessibilityLabel={
                  disabled ? `${tile.label} (coming soon)` : tile.label
                }
                disabled={disabled}
                onPress={() => openTile(tile)}
                testID={`tile-${tile.key}`}
                style={[styles.tile, disabled ? styles.tileDisabled : null]}
              >
                <Text style={styles.tileTitle}>{tile.label}</Text>
                <View style={styles.illustrationWrap}>
                  <Image
                    source={tile.image}
                    style={{
                      width: tile.imageWidth,
                      height: tile.imageHeight,
                      maxWidth: '100%',
                    }}
                    resizeMode="contain"
                  />
                </View>
                {disabled ? (
                  <Text
                    style={styles.comingSoon}
                    testID={`tile-${tile.key}-coming-soon`}
                  >
                    Coming soon
                  </Text>
                ) : null}
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

export default DashboardScreen;

const cardShadow = Platform.select({
  web: { boxShadow: '0 3px 16px rgba(0, 0, 0, 0.08)' },
  default: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 3,
  },
}) as object;

const headerShadow = Platform.select({
  web: { boxShadow: '0 3px 16px rgba(0, 0, 0, 0.1)' },
  default: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 4,
  },
}) as object;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  headerSafe: {
    backgroundColor: colors.accent,
    ...headerShadow,
  },
  header: {
    paddingHorizontal: spacing.space4,
    paddingTop: spacing.space2,
    paddingBottom: spacing.space5,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerButton: {
    minWidth: 44,
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userIcon: {
    width: 27,
    height: 27,
  },
  headerTitle: {
    ...typography.text24,
    color: colors.onAccent,
  },
  body: {
    flex: 1,
  },
  bodyContent: {
    paddingHorizontal: spacing.space7,
    paddingTop: spacing.space6,
    paddingBottom: spacing.space6,
  },
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 43,
    paddingHorizontal: spacing.space3,
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    ...cardShadow,
  },
  searchInputWrap: {
    flex: 1,
    justifyContent: 'center',
  },
  searchPlaceholder: {
    ...typography.text16Alt,
    position: 'absolute',
    left: 0,
    color: colors.ink,
    opacity: 0.2,
  },
  searchInput: {
    ...typography.text16Alt,
    flex: 1,
    padding: 0,
    color: colors.ink,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: spacing.space4,
    marginTop: spacing.space6,
  },
  tile: {
    width: '47%',
    height: 280,
    padding: spacing.space3,
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    ...cardShadow,
  },
  tileDisabled: {
    opacity: 0.5,
  },
  tileTitle: {
    ...typography.text16,
    color: colors.fg,
  },
  illustrationWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  comingSoon: {
    ...typography.text12Alt,
    color: colors.fg,
    textAlign: 'center',
  },
});
