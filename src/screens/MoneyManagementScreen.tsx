import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { MainTabParamList, RootStackParamList } from '../navigation/types';
import { colors, spacing, typography } from '../theme';

export type MoneyManagementScreenProps = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'MoneyManagement'>,
  NativeStackScreenProps<RootStackParamList>
>;

export function MoneyManagementScreen(_props: MoneyManagementScreenProps) {
  return (
    <SafeAreaView style={styles.screen} edges={['top']} testID="screen-MoneyManagement">
      <View style={styles.content}>
        <Text style={styles.title}>Money Management</Text>
        <Text style={styles.hint}>
          The ledger, filters and add sheet are built in their own ticket.
        </Text>
      </View>
    </SafeAreaView>
  );
}

export default MoneyManagementScreen;

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
