import React, { useMemo, useState } from 'react';
import {
  Image,
  type ImageSourcePropType,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { MainTabParamList, RootStackParamList } from '../navigation/types';
import type { NewTransactionInput, Transaction } from '../data/types';
import { useAppData } from '../state/AppStore';
import {
  computeBalance,
  filteredTotal,
  filterTransactions,
  formatDayLabel,
  formatEuro,
  groupTransactionsByDay,
  weeklyTotals,
  type MoneyFilter,
} from '../logic/money';
import { colors, fontFamilies, radii, spacing, typography } from '../theme';

export type MoneyManagementScreenProps = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'MoneyManagement'>,
  NativeStackScreenProps<RootStackParamList>
>;

const HERO_ILLUSTRATION = require('../../design/figma/assets/illustration-525x387.png');
const BACK_CHEVRON = require('../../design/figma/assets/noun-back-1227057.png');
const SHEET_BACK = require('../../design/figma/assets/icon-32x32.png');
const DATE_ICON = require('../../design/figma/assets/icon-15x16.png');

const ROW_ILLUSTRATIONS: ImageSourcePropType[] = [
  require('../../design/figma/assets/illustration-53x53.png'),
  require('../../design/figma/assets/illustration-53x53-2.png'),
  require('../../design/figma/assets/illustration-53x53-3.png'),
  require('../../design/figma/assets/illustration-53x53-4.png'),
];

const FILTERS: { key: MoneyFilter; label: string }[] = [
  { key: 'income', label: 'Income' },
  { key: 'all', label: 'All' },
  { key: 'expense', label: 'Expenses' },
];

const QUICK_CATEGORIES: {
  key: string;
  label: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap | keyof typeof Feather.glyphMap;
  family: 'material' | 'feather';
}[] = [
  { key: 'work', label: 'Work', icon: 'briefcase-outline', family: 'material' },
  { key: 'food', label: 'Food', icon: 'silverware-fork-knife', family: 'material' },
  { key: 'home', label: 'Home', icon: 'home-outline', family: 'material' },
  { key: 'friends', label: 'Friends', icon: 'account-group-outline', family: 'material' },
  { key: 'shopping', label: 'Shopping', icon: 'shopping-outline', family: 'material' },
  { key: 'fuel', label: 'Fuel', icon: 'gas-station-outline', family: 'material' },
];

function todayIso(): string {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${now.getFullYear()}-${month}-${day}`;
}

function parseAmount(value: string): number {
  const normalized = value.trim().replace(',', '.');
  if (normalized === '') {
    return Number.NaN;
  }
  return Number(normalized);
}

type InputFieldProps = {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  onBlur?: () => void;
  testID: string;
  accessibilityLabel: string;
  error?: string;
  keyboardType?: 'default' | 'decimal-pad';
  leading?: React.ReactNode;
  autoFocus?: boolean;
};

function InputField({
  label,
  value,
  onChangeText,
  onBlur,
  testID,
  accessibilityLabel,
  error,
  keyboardType = 'default',
  leading,
  autoFocus,
}: InputFieldProps) {
  return (
    <View style={styles.fieldBlock}>
      <View style={[styles.inputField, error ? styles.inputFieldError : null]}>
        {leading ? <View style={styles.inputLeading}>{leading}</View> : null}
        <TextInput
          style={styles.inputText}
          value={value}
          onChangeText={onChangeText}
          onBlur={onBlur}
          placeholder={label}
          placeholderTextColor={colors.muted2}
          keyboardType={keyboardType}
          autoFocus={autoFocus}
          testID={testID}
          accessibilityLabel={accessibilityLabel}
        />
      </View>
      {error ? (
        <Text style={styles.fieldError} testID={`${testID}-error`}>
          {error}
        </Text>
      ) : null}
    </View>
  );
}

export function MoneyManagementScreen({ navigation }: MoneyManagementScreenProps) {
  const { transactions, addTransaction } = useAppData();

  const [filter, setFilter] = useState<MoneyFilter>('all');
  const [sheetOpen, setSheetOpen] = useState(false);

  const balance = useMemo(() => computeBalance(transactions), [transactions]);
  const filtered = useMemo(
    () => filterTransactions(transactions, filter),
    [transactions, filter],
  );
  const total = useMemo(
    () => filteredTotal(transactions, filter),
    [transactions, filter],
  );
  const groups = useMemo(() => groupTransactionsByDay(filtered), [filtered]);
  const week = useMemo(() => weeklyTotals(transactions), [transactions]);

  const goBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate('Dashboard');
    }
  };

  return (
    <SafeAreaView style={styles.screen} edges={['top']} testID="screen-MoneyManagement">
      <View style={styles.body}>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.hero}>
            <Image source={HERO_ILLUSTRATION} style={styles.heroIllustration} />
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Go back"
              onPress={goBack}
              testID="money-back"
              style={styles.backButton}
            >
              <Image source={BACK_CHEVRON} style={styles.backChevron} />
            </Pressable>
            <View style={styles.avatar} testID="money-avatar">
              <Text style={styles.avatarLetter}>R</Text>
            </View>
            <View style={styles.heroContent}>
              <Text style={styles.heroEyebrow}>MontHly EXPENSES</Text>
              <Text style={styles.heroBalance} testID="money-balance">
                {formatEuro(balance)}
              </Text>
            </View>
          </View>

          <View style={styles.quickCard}>
            <Text style={styles.quickTitle}>Quick Categories</Text>
            <View style={styles.quickGrid}>
              {QUICK_CATEGORIES.map((category, index) => (
                <Pressable
                  key={category.key}
                  accessibilityRole="button"
                  accessibilityState={{ disabled: true }}
                  accessibilityLabel={`${category.label} (coming soon)`}
                  accessibilityHint="Coming soon"
                  disabled
                  testID={`quick-category-${index}`}
                  style={styles.quickTile}
                >
                  {category.family === 'material' ? (
                    <MaterialCommunityIcons
                      name={category.icon as keyof typeof MaterialCommunityIcons.glyphMap}
                      size={28}
                      color={colors.black}
                    />
                  ) : (
                    <Feather
                      name={category.icon as keyof typeof Feather.glyphMap}
                      size={28}
                      color={colors.black}
                    />
                  )}
                </Pressable>
              ))}
            </View>
            <Text style={styles.quickHint}>Coming soon</Text>
          </View>

          <View style={styles.report} testID="weekly-report">
            <Text style={styles.reportTitle}>weekly report</Text>
            <View style={styles.chart}>
              {week.map((day) => {
                const max = Math.max(
                  1,
                  ...week.map((entry) => entry.income + entry.expense),
                );
                const scale = 110 / max;
                const expenseHeight =
                  day.expense > 0 ? Math.max(2, Math.round(day.expense * scale)) : 0;
                const incomeHeight =
                  day.income > 0 ? Math.max(2, Math.round(day.income * scale)) : 0;
                return (
                  <View key={day.weekday} style={styles.chartColumn}>
                    <View style={styles.chartTrack}>
                      <View
                        style={[
                          styles.chartBar,
                          { height: incomeHeight, backgroundColor: colors.deposit },
                        ]}
                      />
                      <View
                        style={[
                          styles.chartBar,
                          { height: expenseHeight, backgroundColor: colors.accent },
                        ]}
                      />
                    </View>
                    <Text style={styles.chartLabel}>{day.weekday.toUpperCase()}</Text>
                  </View>
                );
              })}
            </View>
            <View style={styles.legendRow}>
              <View style={[styles.legendSwatch, { backgroundColor: colors.accent }]} />
              <Text style={styles.legendLabel}>EXPENSES</Text>
              <View style={[styles.legendSwatch, { backgroundColor: colors.deposit }]} />
              <Text style={styles.legendLabel}>DEPOSIT</Text>
            </View>
          </View>

          <View style={styles.filterRow}>
            <View style={styles.filterRail} />
            {FILTERS.map((entry) => {
              const active = entry.key === filter;
              return (
                <Pressable
                  key={entry.key}
                  accessibilityRole="tab"
                  accessibilityState={{ selected: active }}
                  accessibilityLabel={entry.label}
                  onPress={() => setFilter(entry.key)}
                  testID={`money-filter-${entry.key}`}
                  style={styles.filterTab}
                >
                  <Text
                    style={[styles.filterLabel, active ? styles.filterLabelActive : null]}
                  >
                    {entry.label}
                  </Text>
                  <View
                    style={[styles.filterUnderline, active ? styles.filterUnderlineActive : null]}
                  />
                </Pressable>
              );
            })}
          </View>

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>
              {filter === 'all' ? 'Balance' : `Total ${FILTERS.find((f) => f.key === filter)?.label}`}
            </Text>
            <Text style={styles.totalValue} testID="money-filtered-total">
              {formatEuro(total)}
            </Text>
          </View>

          {groups.length === 0 ? (
            <Text style={styles.empty} testID="money-empty">
              No transactions for this filter.
            </Text>
          ) : (
            groups.map((group) => (
              <View key={group.date} style={styles.dayGroup}>
                <Text style={styles.dayLabel} testID={`day-label-${group.date}`}>
                  {group.label}
                </Text>
                {group.transactions.map((transaction, index) => (
                  <TransactionRow key={transaction.id} transaction={transaction} index={index} />
                ))}
              </View>
            ))
          )}
        </ScrollView>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Add expense"
          onPress={() => setSheetOpen(true)}
          testID="money-add-button"
          style={styles.fab}
        >
          <View style={styles.fabPlusH} />
          <View style={styles.fabPlusV} />
        </Pressable>

        {sheetOpen ? (
          <AddExpenseSheet
            onSubmit={(input) => {
              addTransaction(input);
              setSheetOpen(false);
            }}
            onClose={() => setSheetOpen(false)}
          />
        ) : null}
      </View>
    </SafeAreaView>
  );
}

function TransactionRow({ transaction, index }: { transaction: Transaction; index: number }) {
  const illustration = ROW_ILLUSTRATIONS[index % ROW_ILLUSTRATIONS.length];
  return (
    <View style={styles.transactionRow} testID={`transaction-${transaction.id}`}>
      <Image source={illustration} style={styles.transactionIllustration} />
      <View style={styles.transactionText}>
        <Text style={styles.transactionCategory} numberOfLines={1}>
          {transaction.category}
        </Text>
        <Text style={styles.transactionTitle} numberOfLines={1}>
          {transaction.name}
        </Text>
        <Text style={styles.transactionMeta} numberOfLines={1}>
          {formatDayLabel(transaction.date)}
        </Text>
      </View>
      <Text style={styles.transactionAmount}>{formatEuro(transaction.amount)}</Text>
    </View>
  );
}

type AddExpenseSheetProps = {
  onSubmit: (input: NewTransactionInput) => void;
  onClose: () => void;
};

function AddExpenseSheet({ onSubmit, onClose }: AddExpenseSheetProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [amountText, setAmountText] = useState('');
  const [dateText, setDateText] = useState(todayIso());
  const [touched, setTouched] = useState({ name: false, amount: false });
  const [submitted, setSubmitted] = useState(false);

  const nameValid = name.trim().length > 0;
  const amount = parseAmount(amountText);
  const amountValid = Number.isFinite(amount) && amount > 0;
  const formValid = nameValid && amountValid;

  const nameError = (touched.name || submitted) && !nameValid;
  const amountError = (touched.amount || submitted) && !amountValid;

  const submit = () => {
    setSubmitted(true);
    if (!formValid) {
      return;
    }
    const date = /^\d{4}-\d{2}-\d{2}$/.test(dateText.trim()) ? dateText.trim() : todayIso();
    onSubmit({
      name: name.trim(),
      description: description.trim() === '' ? undefined : description.trim(),
      category: 'General',
      type: 'expense',
      amount,
      date,
    });
  };

  return (
    <View style={styles.sheet} testID="add-expense-sheet">
      <View style={styles.sheetHeader}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Go back"
          onPress={onClose}
          testID="add-expense-back"
          style={styles.sheetBack}
        >
          <Image source={SHEET_BACK} style={styles.sheetBackImage} />
        </Pressable>
        <Text style={styles.sheetTitle}>Add ExPense</Text>
      </View>
      <ScrollView
        style={styles.sheetBody}
        contentContainerStyle={styles.sheetBodyContent}
        keyboardShouldPersistTaps="handled"
      >
        <InputField
          label="Name"
          value={name}
          onChangeText={setName}
          onBlur={() => setTouched((prev) => ({ ...prev, name: true }))}
          testID="add-expense-name"
          accessibilityLabel="Name"
          error={nameError ? 'Please enter a name.' : undefined}
          autoFocus
          leading={<Feather name="search" size={16} color={colors.fg} />}
        />
        <InputField
          label="Beschreibung"
          value={description}
          onChangeText={setDescription}
          testID="add-expense-description"
          accessibilityLabel="Beschreibung"
          leading={<Feather name="map-pin" size={15} color={colors.fg} />}
        />
        <InputField
          label="Amount"
          value={amountText}
          onChangeText={setAmountText}
          onBlur={() => setTouched((prev) => ({ ...prev, amount: true }))}
          testID="add-expense-amount"
          accessibilityLabel="Amount"
          keyboardType="decimal-pad"
          error={amountError ? 'Enter a valid amount.' : undefined}
          leading={<Feather name="tag" size={15} color={colors.fg} />}
        />
        <InputField
          label="Select Date"
          value={dateText}
          onChangeText={setDateText}
          testID="add-expense-date"
          accessibilityLabel="Select Date"
          leading={<Image source={DATE_ICON} style={styles.fieldIcon} />}
        />
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Add Expense"
          accessibilityState={{ disabled: !formValid }}
          onPress={submit}
          testID="add-expense-submit"
          style={[styles.submitButton, formValid ? null : styles.submitButtonIdle]}
        >
          <Text style={styles.submitLabel}>Add Expense</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

export default MoneyManagementScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  body: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 120,
  },
  hero: {
    height: 406,
    backgroundColor: colors.surface,
    overflow: 'hidden',
  },
  heroIllustration: {
    position: 'absolute',
    left: -73,
    top: -74,
    width: 525,
    height: 387,
  },
  backButton: {
    position: 'absolute',
    left: 22,
    top: 25,
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backChevron: {
    width: 11,
    height: 18,
    tintColor: colors.backInk,
  },
  avatar: {
    position: 'absolute',
    right: 67,
    top: 77,
    width: 51,
    height: 51,
    borderRadius: radii.pill,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.16,
    shadowRadius: 6,
    elevation: 3,
  },
  avatarLetter: {
    fontFamily: fontFamilies.aleo,
    fontSize: 32,
    lineHeight: 41,
    color: colors.onAccent,
  },
  heroContent: {
    position: 'absolute',
    left: 49,
    bottom: 51,
  },
  heroEyebrow: {
    ...typography.text12,
    color: colors.black,
  },
  heroBalance: {
    ...typography.text45,
    color: colors.black,
    marginTop: spacing.space0,
  },
  quickCard: {
    alignSelf: 'center',
    width: 330,
    marginTop: spacing.space4,
    borderRadius: radii['3xl'],
    backgroundColor: colors.surface,
    paddingTop: spacing.space4,
    paddingBottom: spacing.space3,
    paddingHorizontal: spacing.space5,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 2,
  },
  quickTitle: {
    ...typography.text12,
    color: colors.black,
    textAlign: 'center',
  },
  quickGrid: {
    marginTop: spacing.space4,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: spacing.space5,
  },
  quickTile: {
    width: 55,
    height: 55,
    borderRadius: radii.xl,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: colors.black,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.5,
  },
  quickHint: {
    ...typography.text9,
    color: colors.muted2,
    textAlign: 'center',
    marginTop: spacing.space2,
  },
  report: {
    alignSelf: 'center',
    width: 334,
    marginTop: spacing.space4,
    borderRadius: radii['3xl'],
    backgroundColor: colors.surface,
    paddingVertical: spacing.space4,
    paddingHorizontal: spacing.space4,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 2,
  },
  reportTitle: {
    ...typography.text14Thin,
    color: colors.black,
    textAlign: 'center',
  },
  chart: {
    marginTop: spacing.space5,
    height: 150,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  chartColumn: {
    flex: 1,
    alignItems: 'center',
  },
  chartTrack: {
    height: 110,
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: 13,
  },
  chartBar: {
    width: 13,
    borderRadius: radii.sm,
  },
  chartLabel: {
    ...typography.text9,
    color: colors.black,
    marginTop: spacing.space0,
  },
  legendRow: {
    marginTop: spacing.space3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.space1,
  },
  legendSwatch: {
    width: 13,
    height: 13,
    borderRadius: radii.sm,
  },
  legendLabel: {
    ...typography.text9,
    color: colors.black,
    marginLeft: spacing.space0,
    marginRight: spacing.space3,
  },
  filterRow: {
    flexDirection: 'row',
    marginTop: spacing.space5,
    marginHorizontal: 39,
  },
  filterRail: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 1,
    backgroundColor: colors.ink,
    opacity: 0.2,
  },
  filterTab: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: spacing.space1,
    minHeight: 44,
    justifyContent: 'center',
  },
  filterLabel: {
    fontFamily: fontFamilies.inter,
    fontSize: 16,
    lineHeight: 19,
    color: colors.ink,
  },
  filterLabelActive: {
    fontFamily: fontFamilies.aleo,
    color: colors.fg,
  },
  filterUnderline: {
    height: 2,
    width: 51,
    marginTop: spacing.space1,
    backgroundColor: 'transparent',
  },
  filterUnderlineActive: {
    backgroundColor: colors.fg,
  },
  totalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.space3,
    marginHorizontal: 39,
  },
  totalLabel: {
    ...typography.text12,
    color: colors.black,
  },
  totalValue: {
    fontFamily: fontFamilies.interThin,
    fontSize: 18,
    lineHeight: 22,
    color: colors.black,
  },
  empty: {
    ...typography.text14Alt,
    color: colors.muted2,
    textAlign: 'center',
    marginTop: spacing.space5,
  },
  dayGroup: {
    marginTop: spacing.space4,
    marginHorizontal: 28,
  },
  dayLabel: {
    ...typography.text12,
    color: colors.black,
    marginBottom: spacing.space1,
  },
  transactionRow: {
    minHeight: 73,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.space1,
  },
  transactionIllustration: {
    width: 53,
    height: 53,
    borderRadius: radii.lg,
  },
  transactionText: {
    flex: 1,
    marginLeft: spacing.space4,
  },
  transactionCategory: {
    ...typography.text9,
    color: colors.black,
  },
  transactionTitle: {
    ...typography.text12Alt,
    color: colors.black,
  },
  transactionMeta: {
    ...typography.text9,
    color: colors.black,
  },
  transactionAmount: {
    fontFamily: fontFamilies.interThin,
    fontSize: 14,
    lineHeight: 18,
    color: colors.black,
    marginLeft: spacing.space1,
  },
  fab: {
    position: 'absolute',
    left: '50%',
    marginLeft: -32,
    bottom: spacing.space1,
    width: 64,
    height: 63,
    borderRadius: radii.pill,
    backgroundColor: colors.accent,
    borderWidth: 4,
    borderColor: colors.onAccent,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.16,
    shadowRadius: 40,
    elevation: 8,
  },
  fabPlusH: {
    position: 'absolute',
    width: 20,
    height: 3,
    borderRadius: radii.sm,
    backgroundColor: colors.onAccent,
  },
  fabPlusV: {
    position: 'absolute',
    width: 3,
    height: 20,
    borderRadius: radii.sm,
    backgroundColor: colors.onAccent,
  },
  sheet: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.bg,
  },
  sheetHeader: {
    height: 138,
    backgroundColor: colors.surface,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 4,
  },
  sheetBack: {
    position: 'absolute',
    left: 47,
    top: 55,
    width: 32,
    height: 32,
  },
  sheetBackImage: {
    width: 32,
    height: 32,
  },
  sheetTitle: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 61,
    textAlign: 'center',
    ...typography.text14Thin,
    color: colors.black,
  },
  sheetBody: {
    flex: 1,
  },
  sheetBodyContent: {
    paddingHorizontal: 40,
    paddingTop: 38,
    paddingBottom: spacing.space7,
    gap: spacing.space5,
  },
  fieldBlock: {
    width: '100%',
  },
  inputField: {
    width: '100%',
    height: 43,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: radii.lg,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.space3,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 2,
  },
  inputFieldError: {
    borderWidth: 1,
    borderColor: colors.danger,
  },
  inputLeading: {
    width: 21,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fieldIcon: {
    width: 15,
    height: 16,
    tintColor: colors.fg,
  },
  inputText: {
    flex: 1,
    ...typography.text16Alt,
    color: colors.ink,
    paddingVertical: 0,
  },
  fieldError: {
    ...typography.text10,
    color: colors.danger,
    marginTop: spacing.space0,
    marginLeft: spacing.space0,
  },
  submitButton: {
    width: '100%',
    minHeight: 44,
    height: 43,
    borderRadius: radii.lg,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 2,
  },
  submitButtonIdle: {
    opacity: 0.4,
    shadowOpacity: 0,
    elevation: 0,
  },
  submitLabel: {
    ...typography.text16Alt,
    color: colors.onAccent,
  },
});
