import React, { useState } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { RootStackParamList } from '../navigation/types';
import { colors, fontFamilies, radii, spacing, typography } from '../theme';

export type DashboardStatsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'DashboardStats'
>;

const HEADER_BG = require('../../design/figma/assets/gruppe-maskieren-6.png');
const BACK_ICON = require('../../design/figma/assets/noun-back-1227057.png');
const USER_ICON = require('../../design/figma/assets/noun-user-1335326-181461.png');
const GRID_IMAGE = require('../../design/figma/assets/gruppe-maskieren-1.png');

/** The chart is laid out on the 336x336 coordinate space of the Stat card. */
const CARD_SIZE = 336;
const BASELINE_Y = 320;
const PEAK_INDEX = 6;

const HEADER_HEIGHT = 120;

/**
 * Example values taken verbatim from the "Dashboard Stats" frame. They are the
 * frame's own numbers, kept here as typed constants — nothing is derived from
 * the store for this screen.
 */
const MONTH_LABELS = ['M', 'J', 'J', 'A', 'S', 'O', 'N', 'D', 'J', 'M', 'A'];
const MONTH_START_X = 10;
const MONTH_STEP_X = 26.8;
const MONTH_LABEL_TOP = 314;

const Y_AXIS_LABELS: { label: string; top: number }[] = [
  { label: '90', top: 40 },
  { label: '80', top: 123 },
  { label: '70', top: 206 },
  { label: '60', top: 284 },
];

/** Data points of the drawn line, in the card's coordinate space. */
const CHART_POINTS: { x: number; y: number }[] = [
  { x: 12, y: 276 },
  { x: 40, y: 213 },
  { x: 66, y: 199 },
  { x: 92, y: 193 },
  { x: 120, y: 209 },
  { x: 147, y: 193 },
  { x: 173, y: 154 },
  { x: 200, y: 210 },
  { x: 226, y: 224 },
  { x: 255, y: 194 },
];

const PERIODS = ['D', 'W', 'M', 'Y'] as const;
type Period = (typeof PERIODS)[number];

const AREA_SLICES = 56;

function interpolateY(px: number): number {
  const first = CHART_POINTS[0];
  const last = CHART_POINTS[CHART_POINTS.length - 1];
  if (px <= first.x) {
    return first.y;
  }
  if (px >= last.x) {
    return last.y;
  }
  for (let i = 0; i < CHART_POINTS.length - 1; i += 1) {
    const a = CHART_POINTS[i];
    const b = CHART_POINTS[i + 1];
    if (px >= a.x && px <= b.x) {
      const t = (px - a.x) / (b.x - a.x || 1);
      return a.y + t * (b.y - a.y);
    }
  }
  return last.y;
}

function Chart() {
  const [scale, setScale] = useState(1);
  const firstX = CHART_POINTS[0].x;
  const lastX = CHART_POINTS[CHART_POINTS.length - 1].x;
  const areaStep = (lastX - firstX) / AREA_SLICES;

  return (
    <View
      style={styles.chartCard}
      onLayout={(event) => {
        const width = event.nativeEvent.layout.width;
        if (width > 0) {
          setScale(width / CARD_SIZE);
        }
      }}
    >
      <Image
        source={GRID_IMAGE}
        style={[styles.gridImage, { left: 3 * scale, top: 2 * scale, width: 293 * scale, height: 333 * scale }]}
        resizeMode="stretch"
      />

      {Y_AXIS_LABELS.map((entry) => (
        <View
          key={`line-${entry.label}`}
          style={[
            styles.horizontalRule,
            {
              left: 3 * scale,
              width: 293 * scale,
              top: (entry.top + 7) * scale,
            },
          ]}
        />
      ))}

      {Array.from({ length: AREA_SLICES }).map((_, index) => {
        const px = firstX + index * areaStep;
        const py = interpolateY(px + areaStep / 2);
        const top = py * scale;
        const height = (BASELINE_Y - py) * scale;
        return (
          <View
            key={`area-${index}`}
            style={[
              styles.areaSlice,
              { left: px * scale, top, width: areaStep * scale + 1, height },
            ]}
          />
        );
      })}

      {CHART_POINTS.slice(0, -1).map((point, index) => {
        const next = CHART_POINTS[index + 1];
        const dx = (next.x - point.x) * scale;
        const dy = (next.y - point.y) * scale;
        const length = Math.sqrt(dx * dx + dy * dy);
        const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
        const midX = ((point.x + next.x) / 2) * scale;
        const midY = ((point.y + next.y) / 2) * scale;
        return (
          <View
            key={`segment-${index}`}
            style={[
              styles.segment,
              {
                left: midX - length / 2,
                top: midY - 1.5,
                width: length,
                transform: [{ rotate: `${angle}deg` }],
              },
            ]}
          />
        );
      })}

      {CHART_POINTS.map((point, index) => {
        const peak = index === PEAK_INDEX;
        const size = peak ? 11 : 9;
        return (
          <View
            key={`point-${index}`}
            testID={`chart-point-${index}`}
            style={[
              styles.point,
              peak ? styles.pointPeak : null,
              {
                left: point.x * scale - size / 2,
                top: point.y * scale - size / 2,
                width: size,
                height: size,
                borderRadius: size / 2,
                borderWidth: peak ? 3 : 2,
              },
            ]}
          />
        );
      })}

      <View
        style={[
          styles.tooltip,
          {
            left: (CHART_POINTS[PEAK_INDEX].x - 36) * scale,
            top: (CHART_POINTS[PEAK_INDEX].y - 39) * scale,
            width: 72 * scale,
          },
        ]}
      >
        <Text style={styles.tooltipText}>20 DAYS</Text>
      </View>

      {Y_AXIS_LABELS.map((entry) => (
        <Text
          key={`y-${entry.label}`}
          testID={`chart-value-${entry.label}`}
          style={[
            styles.axisLabel,
            { left: 309 * scale, top: entry.top * scale, opacity: 0.2 },
          ]}
        >
          {entry.label}
        </Text>
      ))}

      {MONTH_LABELS.map((month, index) => (
        <Text
          key={`month-${index}`}
          testID={`chart-month-${index}`}
          style={[
            styles.axisLabel,
            {
              left: (MONTH_START_X + index * MONTH_STEP_X - 4) * scale,
              top: MONTH_LABEL_TOP * scale,
              opacity: 0.2,
            },
          ]}
        >
          {month}
        </Text>
      ))}
    </View>
  );
}

export function DashboardStatsScreen({ navigation }: DashboardStatsScreenProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<Period>('Y');

  return (
    <SafeAreaView style={styles.screen} edges={['top']} testID="screen-DashboardStats">
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Image source={HEADER_BG} style={styles.headerBg} resizeMode="cover" />
          <View style={styles.headerRow}>
            <Pressable
              testID="stats-back-button"
              accessibilityRole="button"
              accessibilityLabel="Back"
              onPress={() => navigation.goBack()}
              hitSlop={8}
              style={styles.backButton}
            >
              <Image source={BACK_ICON} style={styles.backIcon} resizeMode="contain" />
            </Pressable>
            <Image source={USER_ICON} style={styles.userIcon} resizeMode="contain" />
          </View>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>Statistics</Text>

          <View style={styles.summary}>
            <Text style={styles.since}>Since 21. Dec</Text>
            <View style={styles.figureRow} testID="stats-figure">
              <Text style={styles.figureNumber}>20</Text>
              <Text style={styles.figureUnit}>DAYS</Text>
            </View>
            <Text style={styles.range}>Dec 2024 - Jan 2024</Text>
          </View>

          <View style={styles.periodSwitch} testID="stats-period-switch">
            {PERIODS.map((period) => {
              const active = period === selectedPeriod;
              return (
                <Pressable
                  key={period}
                  testID={`stats-period-${period}`}
                  accessibilityRole="button"
                  accessibilityLabel={period}
                  accessibilityState={{ selected: active }}
                  onPress={() => setSelectedPeriod(period)}
                  style={styles.periodOption}
                >
                  <View style={[styles.periodPill, active ? styles.periodPillActive : null]}>
                    <Text style={[styles.periodLabel, active ? styles.periodLabelActive : null]}>
                      {period}
                    </Text>
                  </View>
                </Pressable>
              );
            })}
          </View>

          <Chart />

          <Text style={styles.statLine}>Top Run: 20 Days</Text>
          <Text style={styles.statLine}>Restarts: 4</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default DashboardStatsScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  scrollContent: {
    paddingBottom: spacing.space6,
  },
  header: {
    height: HEADER_HEIGHT,
    justifyContent: 'flex-start',
  },
  headerBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: HEADER_HEIGHT,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.space7,
    paddingTop: spacing.space2,
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
  },
  userIcon: {
    width: 27,
    height: 27,
    marginTop: spacing.space1,
  },
  content: {
    paddingHorizontal: spacing.space7,
  },
  title: {
    ...typography.text16,
    color: colors.ink,
    marginTop: spacing.space2,
  },
  summary: {
    marginTop: spacing.space5,
  },
  since: {
    ...typography.text14Alt,
    color: colors.fg,
  },
  figureRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: spacing.space0,
  },
  // The frame draws "20" at Inter 400 24px; the theme has no 24px Inter token.
  figureNumber: {
    fontFamily: fontFamilies.inter,
    fontSize: 24,
    lineHeight: 29,
    color: colors.ink,
  },
  figureUnit: {
    ...typography.text14Alt,
    color: colors.ink,
    marginLeft: spacing.space0,
    marginBottom: spacing.space0,
  },
  range: {
    ...typography.text14Alt,
    color: colors.ink,
    marginTop: spacing.space2,
  },
  periodSwitch: {
    flexDirection: 'row',
    backgroundColor: colors.chip,
    borderRadius: radii.lg,
    height: 34,
    alignItems: 'center',
    marginTop: spacing.space3,
    paddingHorizontal: spacing.space1,
  },
  periodOption: {
    flex: 1,
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  periodPill: {
    paddingHorizontal: spacing.space2,
    paddingVertical: spacing.space0,
    borderRadius: radii.lg,
  },
  periodPillActive: {
    backgroundColor: colors.surface,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.16,
    shadowRadius: 6,
    elevation: 3,
  },
  // The frame's letters: Inter 400 12px, the selected one Aleo 700 12px.
  periodLabel: {
    fontFamily: fontFamilies.inter,
    fontSize: 12,
    lineHeight: 14,
    color: colors.ink,
  },
  periodLabelActive: {
    fontFamily: fontFamilies.aleo,
  },
  chartCard: {
    marginTop: spacing.space3,
    width: '100%',
    aspectRatio: 1,
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 2,
  },
  gridImage: {
    position: 'absolute',
  },
  horizontalRule: {
    position: 'absolute',
    height: 0,
    borderTopWidth: 1,
    borderStyle: 'dashed',
    borderColor: colors.border,
    opacity: 0.35,
  },
  areaSlice: {
    position: 'absolute',
    backgroundColor: colors.accent,
    opacity: 0.1,
  },
  segment: {
    position: 'absolute',
    height: 3,
    backgroundColor: colors.accent,
    borderRadius: 2,
  },
  point: {
    position: 'absolute',
    backgroundColor: colors.surface,
    borderColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pointPeak: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.16,
    shadowRadius: 16,
    elevation: 3,
  },
  tooltip: {
    position: 'absolute',
    height: 26,
    backgroundColor: colors.surface,
    borderRadius: radii.sm,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.accentDeep,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.16,
    shadowRadius: 16,
    elevation: 2,
  },
  tooltipText: {
    ...typography.text12Alt,
    color: colors.ink,
  },
  // The frame's axis/months: Aleo 700 12px/14px at 20% opacity.
  axisLabel: {
    position: 'absolute',
    fontFamily: fontFamilies.aleo,
    fontSize: 12,
    lineHeight: 14,
    color: colors.ink,
  },
  statLine: {
    ...typography.text14Alt,
    color: colors.ink,
    marginTop: spacing.space3,
  },
});
