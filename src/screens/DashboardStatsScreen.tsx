import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { RootStackParamList } from '../navigation/types';
import { colors, spacing, typography } from '../theme';

export type DashboardStatsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'DashboardStats'
>;

export function DashboardStatsScreen(_props: DashboardStatsScreenProps) {
  return (
    <SafeAreaView style={styles.screen} edges={['top']} testID="screen-DashboardStats">
      <View style={styles.content}>
        <Text style={styles.title}>Dashboard Statistics</Text>
        <Text style={styles.hint}>
          The dashboard statistics view is built in its own ticket.
        </Text>
      </View>
    </SafeAreaView>
  );
}

export default DashboardStatsScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.space5,
    gap: spacing.space2,
  },
  title: {
    ...typography.text24,
    color: colors.fg,
  },
  hint: {
    ...typography.text14Alt,
    color: colors.muted2,
    textAlign: 'center',
  },
});
