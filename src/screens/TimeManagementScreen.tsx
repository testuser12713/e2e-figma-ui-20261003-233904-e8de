import React, { useMemo, useState } from 'react';
import {
  Image,
  ImageSourcePropType,
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
import { Ionicons, Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { MainTabParamList, RootStackParamList } from '../navigation/types';
import type { Appointment, AppointmentSection, NewAppointmentInput } from '../data/types';
import { useAppData } from '../state/AppStore';
import { colors, fontFamilies, radii, spacing, typography } from '../theme';
import {
  buildWeek,
  filterAppointments,
  formatDate,
  formatLongDate,
  formatPeriodLabel,
  normalizeDateInput,
  progressValue,
  shiftDate,
  splitBySection,
} from '../logic/time';

export type TimeManagementScreenProps = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'TimeManagement'>,
  NativeStackScreenProps<RootStackParamList>
>;

const backIcon = require('../../design/figma/assets/noun-back-1227057.png');
const userIcon = require('../../design/figma/assets/noun-user-1335326.png');
const userIconHeader = require('../../design/figma/assets/noun-user-1335326-181461.png');
const pencilIcon = require('../../design/figma/assets/noun-pencil-2174975.png');
const infoIcon = require('../../design/figma/assets/noun-info-1174604.png');
const selectDateIcon = require('../../design/figma/assets/icon-15x16.png');
const prevIcon = require('../../design/figma/assets/icon-8x14-2.png');
const nextIcon = require('../../design/figma/assets/icon-8x14.png');
const avatarImage = require('../../design/figma/assets/fc8cc65f046eeb0b9efb159aad932e2b.png');

type QuickAdd = {
  key: string;
  title: string;
  subtitle: string;
  image: ImageSourcePropType;
};

/** The four Quick Adds rows of the 'Add an appointment' frame. */
const QUICK_ADDS: QuickAdd[] = [
  {
    key: 'gym',
    title: 'Gym',
    subtitle: 'Customize Plan',
    image: require('../../design/figma/assets/image-69x69.png'),
  },
  {
    key: 'work',
    title: 'Work',
    subtitle: 'Normal Day',
    image: require('../../design/figma/assets/image-69x69-2.png'),
  },
  {
    key: 'birthday',
    title: 'Birthday',
    subtitle: 'Friend',
    image: require('../../design/figma/assets/image-69x69-4.png'),
  },
  {
    key: 'doctor',
    title: 'Dr. Jeff Smiths',
    subtitle: 'Dermatologist',
    image: require('../../design/figma/assets/image-69x69-3.png'),
  },
];

function todayIso(): string {
  const now = new Date();
  const pad = (value: number) => (value < 10 ? `0${value}` : String(value));
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
}

function defaultAnchor(appointments: Appointment[]): string {
  const upcoming = splitBySection(appointments).upcoming;
  return upcoming[0]?.date ?? appointments[0]?.date ?? todayIso();
}

function displayTitle(appointment: Appointment): string {
  return appointment.doctor
    ? `${appointment.title} - ${appointment.doctor}`
    : appointment.title;
}

function ScreenHeader({
  onBack,
  headerUser,
  testID,
}: {
  onBack: () => void;
  headerUser: ImageSourcePropType;
  testID: string;
}) {
  return (
    <View style={styles.header}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Go back"
        hitSlop={10}
        onPress={onBack}
        style={styles.backButton}
        testID={testID}
      >
        <Image source={backIcon} style={styles.backIcon} />
      </Pressable>
      <Image source={headerUser} style={styles.userIcon} />
    </View>
  );
}

function AppointmentRow({
  appointment,
  onEdit,
}: {
  appointment: Appointment;
  onEdit: (appointment: Appointment) => void;
}) {
  return (
    <View style={styles.row} testID={`time-row-${appointment.id}`}>
      <View style={styles.rowText}>
        <Text style={styles.rowDate}>{formatDate(appointment.date)}</Text>
        <View style={styles.rowTitleLine}>
          <Text style={styles.rowTitle} numberOfLines={1}>
            {displayTitle(appointment)}
          </Text>
          <Image source={infoIcon} style={styles.infoIcon} />
        </View>
      </View>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Modify ${appointment.title}`}
        hitSlop={8}
        onPress={() => onEdit(appointment)}
        style={styles.modify}
        testID={`time-modify-${appointment.id}`}
      >
        <Image source={pencilIcon} style={styles.pencilIcon} />
        <Text style={styles.modifyText}>Modify</Text>
      </Pressable>
    </View>
  );
}

function PrimaryButton({
  label,
  onPress,
  background,
  testID,
}: {
  label: string;
  onPress: () => void;
  background: string;
  testID: string;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      style={[styles.primaryButton, { backgroundColor: background }]}
      testID={testID}
    >
      <Text style={styles.primaryButtonLabel}>{label}</Text>
    </Pressable>
  );
}

type AddSheetProps = {
  mode: 'add' | 'edit';
  appointment?: Appointment;
  onClose: () => void;
  onSubmit: (input: NewAppointmentInput) => void;
};

function AddSheet({ mode, appointment, onClose, onSubmit }: AddSheetProps) {
  const [name, setName] = useState(appointment ? appointment.title : '');
  const [description, setDescription] = useState(appointment?.description ?? '');
  const [date, setDate] = useState(appointment ? formatDate(appointment.date) : '');
  const [touched, setTouched] = useState({ name: false, date: false });

  const nameValid = name.trim().length > 0;
  const dateIso = normalizeDateInput(date);
  const showNameError = touched.name && !nameValid;
  const showDateError = touched.date && dateIso === null;

  const handleSubmit = () => {
    setTouched({ name: true, date: true });
    if (!nameValid || !dateIso) return;
    onSubmit({
      title: name.trim(),
      doctor: appointment?.doctor ?? '',
      description: description.trim() ? description.trim() : undefined,
      date: dateIso,
      time: appointment?.time ?? '',
    });
  };

  const applyQuickAdd = (quickAdd: QuickAdd) => {
    setName(quickAdd.title);
    setDescription(quickAdd.subtitle);
    setTouched({ name: false, date: false });
  };

  return (
    <View style={styles.sheet} testID="time-add-sheet">
      <View style={styles.sheetHeader}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Close the appointment form"
          hitSlop={10}
          onPress={onClose}
          style={styles.backButton}
          testID="time-sheet-close"
        >
          <Ionicons name="menu" size={20} color={colors.backInk} />
        </Pressable>
        <Text style={styles.sheetTitle}>
          {mode === 'edit' ? 'Edit an appointment' : 'Add an appointment'}
        </Text>
        <Image source={userIconHeader} style={styles.userIcon} />
      </View>

      <ScrollView style={styles.sheetBody} contentContainerStyle={styles.sheetBodyContent}>
        <View style={styles.field}>
          <Ionicons name="search" size={16} color={colors.secondary} style={styles.fieldIcon} />
          <TextInput
            accessibilityLabel="Appointment name"
            onChangeText={setName}
            onBlur={() => setTouched((prev) => ({ ...prev, name: true }))}
            placeholder="Name"
            placeholderTextColor={colors.ink}
            style={styles.fieldInput}
            testID="time-sheet-name"
            value={name}
          />
        </View>
        {showNameError ? (
          <Text style={styles.fieldError} testID="time-sheet-name-error">
            Please enter a name.
          </Text>
        ) : null}

        <View style={styles.field}>
          <Ionicons name="map-outline" size={16} color={colors.secondary} style={styles.fieldIcon} />
          <TextInput
            accessibilityLabel="Appointment description"
            onChangeText={setDescription}
            placeholder="Beschreibung"
            placeholderTextColor={colors.ink}
            style={styles.fieldInput}
            testID="time-sheet-description"
            value={description}
          />
        </View>

        <View style={styles.field}>
          <Image source={selectDateIcon} style={styles.calendarIcon} />
          <TextInput
            accessibilityLabel="Appointment date"
            autoCapitalize="none"
            onChangeText={setDate}
            onBlur={() => setTouched((prev) => ({ ...prev, date: true }))}
            placeholder="Select Date"
            placeholderTextColor={colors.ink}
            style={styles.fieldInput}
            testID="time-sheet-date"
            value={date}
          />
        </View>
        {showDateError ? (
          <Text style={styles.fieldError} testID="time-sheet-date-error">
            Please enter a valid date (dd/mm/yyyy).
          </Text>
        ) : null}

        <Pressable
          accessibilityRole="button"
          accessibilityLabel={mode === 'edit' ? 'Save Appointment' : 'Add Appointment'}
          onPress={handleSubmit}
          style={[styles.primaryButton, styles.sheetSubmit]}
          testID="time-sheet-submit"
        >
          <Text style={styles.primaryButtonLabel}>
            {mode === 'edit' ? 'Save Appointment' : 'Add Appointment'}
          </Text>
        </Pressable>

        <View style={styles.quickAddsHeader}>
          <Text style={styles.quickAddsTitle}>Quick Adds</Text>
          <Ionicons name="funnel-outline" size={22} color={colors.secondary} />
        </View>

        {QUICK_ADDS.map((quickAdd) => (
          <View key={quickAdd.key}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={`Quick add ${quickAdd.title}`}
              onPress={() => applyQuickAdd(quickAdd)}
              style={styles.quickAddRow}
              testID={`time-quick-add-${quickAdd.key}`}
            >
              <Image source={quickAdd.image} style={styles.quickAddImage} />
              <View style={styles.quickAddText}>
                <Text style={styles.quickAddTitle}>{quickAdd.title}</Text>
                <Text style={styles.quickAddSubtitle}>{quickAdd.subtitle}</Text>
              </View>
              <View style={styles.kebab} testID={`time-quick-add-menu-${quickAdd.key}`}>
                <View style={styles.kebabDot} />
                <View style={styles.kebabDot} />
                <View style={styles.kebabDot} />
              </View>
            </Pressable>
            <View style={styles.rowSeparator} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

function PeriodView({
  anchor,
  selectedDate,
  onBack,
  onShiftWeek,
  onToggleDay,
}: {
  anchor: string;
  selectedDate: string | null;
  onBack: () => void;
  onShiftWeek: (days: number) => void;
  onToggleDay: (date: string) => void;
}) {
  const week = buildWeek(anchor);
  return (
    <View testID="time-period-view">
      <View style={styles.periodHeader}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Back to the appointment list"
          hitSlop={10}
          onPress={onBack}
          style={styles.backButton}
          testID="time-period-back"
        >
          <Image source={backIcon} style={styles.backIcon} />
        </Pressable>
        <Text style={styles.periodTitle}>My Appointments</Text>
        <View style={styles.backButton} />
      </View>

      <View style={styles.calendarStrip}>
        <View style={styles.monthRow}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Previous week"
            hitSlop={10}
            onPress={() => onShiftWeek(-7)}
            style={styles.monthChevron}
            testID="time-period-prev"
          >
            <Image source={prevIcon} style={styles.monthChevronIcon} />
          </Pressable>
          <Text style={styles.monthLabel}>{formatPeriodLabel(anchor)}</Text>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Next week"
            hitSlop={10}
            onPress={() => onShiftWeek(7)}
            style={styles.monthChevron}
            testID="time-period-next"
          >
            <Image source={nextIcon} style={styles.monthChevronIcon} />
          </Pressable>
        </View>

        <View style={styles.weekRow}>
          {week.map((day, index) => (
            <Text key={`letter-${index}`} style={styles.weekdayLetter}>
              {day.weekdayLetter}
            </Text>
          ))}
        </View>

        <View style={styles.weekRow}>
          {week.map((day) => {
            const active = selectedDate === day.date;
            return (
              <Pressable
                key={day.date}
                accessibilityRole="button"
                accessibilityLabel={formatLongDate(day.date)}
                accessibilityState={{ selected: active }}
                onPress={() => onToggleDay(day.date)}
                style={styles.dayCell}
                testID={`time-period-day-${day.date}`}
              >
                <View style={[styles.dayBadge, active ? styles.dayBadgeActive : null]}>
                  <Text style={[styles.dayNumber, active ? styles.dayNumberActive : null]}>
                    {day.day}
                  </Text>
                </View>
              </Pressable>
            );
          })}
        </View>

        <Text style={styles.periodCaption}>{formatLongDate(selectedDate ?? anchor)}</Text>
      </View>
    </View>
  );
}

export function TimeManagementScreen({ navigation }: TimeManagementScreenProps) {
  const { appointments, addAppointment, updateAppointment } = useAppData();

  const [section, setSection] = useState<AppointmentSection>('upcoming');
  const [view, setView] = useState<'list' | 'period'>('list');
  const [sheet, setSheet] = useState<{ mode: 'add' | 'edit'; appointment?: Appointment } | null>(
    null,
  );
  const [query, setQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [anchor, setAnchor] = useState(() => defaultAnchor(appointments));

  const { upcoming, past } = useMemo(() => splitBySection(appointments), [appointments]);
  const percentage = Math.round(progressValue(appointments) * 100);

  const listAppointments = useMemo(
    () => filterAppointments(appointments, { section, query }),
    [appointments, section, query],
  );

  const periodAppointments = useMemo(
    () => filterAppointments(appointments, { query, date: selectedDate }),
    [appointments, query, selectedDate],
  );

  const handleBack = () => {
    if (view === 'period') {
      setView('list');
      return;
    }
    if (navigation.canGoBack()) {
      navigation.goBack();
      return;
    }
    navigation.navigate('Dashboard');
  };

  const openPeriod = () => {
    setAnchor(defaultAnchor(appointments));
    setSelectedDate(null);
    setView('period');
  };

  const openAdd = () => setSheet({ mode: 'add' });
  const openEdit = (appointment: Appointment) => setSheet({ mode: 'edit', appointment });

  const closeSheet = () => setSheet(null);

  const submitSheet = (input: NewAppointmentInput) => {
    if (sheet?.mode === 'edit' && sheet.appointment) {
      updateAppointment(sheet.appointment.id, input);
    } else {
      addAppointment(input);
      setSection('upcoming');
      setView('list');
      setSelectedDate(null);
    }
    setSheet(null);
  };

  if (sheet) {
    return (
      <SafeAreaView style={styles.screen} edges={['top']} testID="screen-TimeManagement">
        <AddSheet
          key={sheet.appointment?.id ?? 'new'}
          mode={sheet.mode}
          appointment={sheet.appointment}
          onClose={closeSheet}
          onSubmit={submitSheet}
        />
      </SafeAreaView>
    );
  }

  if (view === 'period') {
    return (
      <SafeAreaView style={styles.screen} edges={['top']} testID="screen-TimeManagement">
        <PeriodView
          anchor={anchor}
          selectedDate={selectedDate}
          onBack={handleBack}
          onShiftWeek={(days) => setAnchor((current) => shiftDate(current, days))}
          onToggleDay={(date) =>
            setSelectedDate((current) => (current === date ? null : date))}
        />
        <View style={styles.periodListWrapper}>
          <ScrollView
            style={styles.list}
            contentContainerStyle={styles.listContent}
            testID="time-period-list"
          >
            {periodAppointments.length === 0 ? (
              <Text style={styles.emptyText}>No appointments in this period.</Text>
            ) : (
              periodAppointments.map((appointment) => (
                <View key={appointment.id}>
                  <AppointmentRow appointment={appointment} onEdit={openEdit} />
                  <View style={styles.rowSeparator} />
                </View>
              ))
            )}
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.screen} edges={['top']} testID="screen-TimeManagement">
      <ScreenHeader onBack={handleBack} headerUser={userIcon} testID="time-back" />

      <Text style={styles.title}>My Appointments</Text>

      <View style={styles.searchField}>
        <TextInput
          accessibilityLabel="Search appointments"
          autoCapitalize="none"
          onChangeText={setQuery}
          placeholder="Search"
          placeholderTextColor={colors.muted}
          style={styles.searchInput}
          testID="time-search"
          value={query}
        />
        <Ionicons name="search" size={16} color={colors.ink} />
      </View>

      <View style={styles.tabsRow}>
        <View style={styles.tabButtons}>
          <Pressable
            accessibilityRole="tab"
            accessibilityState={{ selected: section === 'upcoming' }}
            accessibilityLabel="Upcoming appointments"
            onPress={() => setSection('upcoming')}
            style={styles.tabButton}
            testID="time-tab-upcoming"
          >
            <Text
              style={[styles.tabLabel, section === 'upcoming' ? styles.tabLabelActive : null]}
            >
              Upcoming
            </Text>
          </Pressable>
          <Pressable
            accessibilityRole="tab"
            accessibilityState={{ selected: section === 'past' }}
            accessibilityLabel="Past appointments"
            onPress={() => setSection('past')}
            style={styles.tabButton}
            testID="time-tab-past"
          >
            <Text style={[styles.tabLabel, section === 'past' ? styles.tabLabelActive : null]}>
              Past
            </Text>
          </Pressable>
        </View>
        <View style={styles.tabRail}>
          <View
            style={[
              styles.tabMarker,
              section === 'past' ? styles.tabMarkerRight : styles.tabMarkerLeft,
            ]}
          />
        </View>
      </View>

      <View
        accessibilityRole="progressbar"
        accessibilityValue={{ min: 0, max: 100, now: percentage }}
        style={styles.progressCard}
        testID="time-progress"
      >
        <View style={styles.progressHeader}>
          <Text style={styles.progressLabel}>Progress</Text>
          <Text style={styles.progressCount}>
            {past.length} of {appointments.length} completed
          </Text>
        </View>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${percentage}%` }]} />
        </View>
        <Text style={styles.progressHint}>
          {upcoming.length} upcoming appointment{upcoming.length === 1 ? '' : 's'}
        </Text>
      </View>

      <ScrollView style={styles.list} contentContainerStyle={styles.listContent} testID="time-list">
        {listAppointments.length === 0 ? (
          <Text style={styles.emptyText}>No appointments found.</Text>
        ) : (
          listAppointments.map((appointment) => (
            <View key={appointment.id}>
              <AppointmentRow appointment={appointment} onEdit={openEdit} />
              <View style={styles.rowSeparator} />
            </View>
          ))
        )}
      </ScrollView>

      <View style={styles.actions}>
        <PrimaryButton
          background={colors.accent}
          label="Add a new appointment"
          onPress={openAdd}
          testID="time-add-appointment"
        />
        <PrimaryButton
          background={colors.accent85}
          label="Overview"
          onPress={openPeriod}
          testID="time-overview"
        />
      </View>
    </SafeAreaView>
  );
}

export default TimeManagementScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.space7,
    paddingTop: spacing.space1,
    height: 56,
  },
  backButton: {
    width: 44,
    height: 44,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  backIcon: {
    width: 11,
    height: 18,
    resizeMode: 'contain',
  },
  userIcon: {
    width: 27,
    height: 27,
    resizeMode: 'contain',
  },
  title: {
    ...typography.text16,
    color: colors.ink,
    paddingHorizontal: spacing.space7,
    marginTop: spacing.space1,
  },
  searchField: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    height: 43,
    paddingHorizontal: spacing.space3,
    marginHorizontal: spacing.space7,
    marginTop: spacing.space3,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    ...typography.text16Alt,
    color: colors.ink,
    padding: 0,
  },
  tabsRow: {
    marginHorizontal: spacing.space7,
    marginTop: spacing.space7,
  },
  tabButtons: {
    flexDirection: 'row',
  },
  tabButton: {
    flex: 1,
    minHeight: 38,
    justifyContent: 'flex-start',
  },
  tabLabel: {
    ...typography.text16Alt,
    color: colors.ink,
  },
  tabLabelActive: {
    fontFamily: typography.text16.fontFamily,
    fontWeight: '700',
    color: colors.fg,
  },
  tabRail: {
    height: 1,
    backgroundColor: colors.divider,
    opacity: 0.2,
    marginTop: spacing.space0,
  },
  tabMarker: {
    position: 'absolute',
    top: 0,
    width: 51,
    height: 2,
    backgroundColor: colors.fg,
  },
  tabMarkerLeft: {
    left: 0,
  },
  tabMarkerRight: {
    right: 0,
  },
  progressCard: {
    backgroundColor: colors.surface,
    borderRadius: radii.xl,
    marginHorizontal: spacing.space7,
    marginTop: spacing.space5,
    padding: spacing.space3,
    gap: spacing.space1,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 2,
  },
  progressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  progressLabel: {
    ...typography.text12,
    color: colors.ink,
  },
  progressCount: {
    ...typography.text12Alt,
    color: colors.muted2,
  },
  progressTrack: {
    height: spacing.space1,
    borderRadius: radii.pill,
    backgroundColor: colors.track,
    overflow: 'hidden',
  },
  progressFill: {
    height: spacing.space1,
    borderRadius: radii.pill,
    backgroundColor: colors.accent,
  },
  progressHint: {
    ...typography.text10,
    color: colors.muted2,
  },
  list: {
    flex: 1,
    marginTop: spacing.space3,
  },
  listContent: {
    paddingHorizontal: spacing.space7,
    paddingBottom: spacing.space3,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 57,
    paddingVertical: spacing.space1,
  },
  rowText: {
    flex: 1,
    paddingRight: spacing.space2,
  },
  rowDate: {
    ...typography.text12Alt,
    lineHeight: 22,
    color: colors.ink,
    opacity: 0.4,
  },
  rowTitleLine: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.space0,
  },
  rowTitle: {
    ...typography.text14,
    color: colors.ink,
    flexShrink: 1,
  },
  infoIcon: {
    width: 12,
    height: 12,
    resizeMode: 'contain',
  },
  modify: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.space0,
    minHeight: 44,
  },
  pencilIcon: {
    width: 12,
    height: 12,
    resizeMode: 'contain',
  },
  modifyText: {
    ...typography.text14,
    color: colors.fg,
  },
  rowSeparator: {
    height: 1,
    backgroundColor: colors.divider,
    opacity: 0.2,
  },
  emptyText: {
    ...typography.text14Alt,
    color: colors.muted2,
    textAlign: 'center',
    paddingVertical: spacing.space5,
  },
  actions: {
    paddingHorizontal: spacing.space7,
    paddingTop: spacing.space1,
    paddingBottom: spacing.space3,
    gap: spacing.space5,
  },
  primaryButton: {
    height: 43,
    minHeight: 44,
    borderRadius: radii.lg,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.space5,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 3,
  },
  primaryButtonLabel: {
    ...typography.text16Alt,
    color: colors.onAccent,
    textAlign: 'center',
  },
  sheet: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  sheetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.space4,
    paddingVertical: spacing.space3,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 4,
  },
  sheetTitle: {
    ...typography.text24,
    color: colors.fg,
    flex: 1,
    marginLeft: spacing.space2,
  },
  sheetBody: {
    flex: 1,
  },
  sheetBodyContent: {
    paddingHorizontal: spacing.space7,
    paddingTop: spacing.space5,
    paddingBottom: spacing.space6,
  },
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    height: 43,
    paddingHorizontal: spacing.space3,
    marginTop: spacing.space4,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 3,
  },
  fieldIcon: {
    marginRight: spacing.space2,
  },
  calendarIcon: {
    width: 15,
    height: 16,
    resizeMode: 'contain',
    marginRight: spacing.space2,
  },
  fieldInput: {
    flex: 1,
    ...typography.text16Alt,
    color: colors.ink,
    padding: 0,
  },
  fieldError: {
    ...typography.text10,
    color: colors.danger,
    marginTop: spacing.space0,
  },
  sheetSubmit: {
    backgroundColor: colors.accent,
    marginTop: spacing.space5,
  },
  quickAddsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.space6,
    marginBottom: spacing.space2,
  },
  quickAddsTitle: {
    ...typography.text16Alt,
    color: colors.ink,
  },
  quickAddRow: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 90,
    paddingVertical: spacing.space1,
  },
  quickAddImage: {
    width: 69,
    height: 69,
    borderRadius: radii.xl,
    resizeMode: 'cover',
  },
  quickAddText: {
    flex: 1,
    marginLeft: spacing.space3,
  },
  quickAddTitle: {
    ...typography.text14,
    color: colors.ink,
  },
  quickAddSubtitle: {
    ...typography.text12Alt,
    color: colors.ink,
    opacity: 0.4,
    marginTop: spacing.space0,
  },
  kebab: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  kebabDot: {
    width: 3,
    height: 3,
    borderRadius: radii.pill,
    backgroundColor: colors.fg,
  },
  periodHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.space5,
    paddingTop: spacing.space1,
    height: 56,
  },
  periodTitle: {
    ...typography.text17,
    color: colors.black,
  },
  calendarStrip: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: radii['3xl'],
    borderTopRightRadius: radii['3xl'],
    paddingHorizontal: spacing.space5,
    paddingTop: spacing.space5,
    paddingBottom: spacing.space3,
    gap: spacing.space2,
  },
  monthRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.space5,
  },
  monthChevron: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  monthChevronIcon: {
    width: 8,
    height: 14,
    resizeMode: 'contain',
  },
  monthLabel: {
    fontFamily: fontFamilies.ubuntu,
    fontSize: 13,
    lineHeight: 15,
    color: colors.black,
    textAlign: 'center',
  },
  weekRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  weekdayLetter: {
    flex: 1,
    textAlign: 'center',
    fontFamily: fontFamilies.ubuntu,
    fontSize: 15,
    lineHeight: 20,
    color: colors.black,
  },
  dayCell: {
    flex: 1,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayBadge: {
    width: 42,
    height: 42,
    borderRadius: radii.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayBadgeActive: {
    backgroundColor: colors.accent,
  },
  dayNumber: {
    fontFamily: fontFamilies.ubuntu,
    fontSize: 15,
    lineHeight: 20,
    color: colors.black,
  },
  dayNumberActive: {
    color: colors.surface,
  },
  periodCaption: {
    ...typography.text11Ubuntu,
    color: colors.black,
    opacity: 0.44,
  },
  periodListWrapper: {
    flex: 1,
    backgroundColor: colors.bg,
  },
});
