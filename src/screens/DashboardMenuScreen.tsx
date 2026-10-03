import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { RootStackParamList } from '../navigation/types';
import { colors, spacing, typography } from '../theme';

export type DashboardMenuScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'DashboardMenu'
>;

export function DashboardMenuScreen(_props: DashboardMenuScreenProps) {
  return (
    <SafeAreaView style={styles.screen} edges={['top']} testID="screen-DashboardMenu">
      <View style={styles.content}>
        <Text style={styles.title}>Dashboard Menu</Text>
        <Text style={styles.hint}>
          The dashboard menu entries are built in their own ticket.
        </Text>
      </View>
    </SafeAreaView>
  );
}

export default DashboardMenuScreen;

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
