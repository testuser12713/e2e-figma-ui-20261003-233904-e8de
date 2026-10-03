/**
 * Design tokens for the Business Handler app.
 *
 * Every value is derived from DESIGN.md (which was read off the Figma frames).
 * Screens must style from these tokens instead of inventing values.
 */
import type { TextStyle } from 'react-native';

export const colors = {
  bg: '#F4F5FA',
  surface: '#FFFFFF',
  surfaceAlt: '#F4F4F4',
  panel: '#ECF1FA',
  chip: '#DCE5F4',
  fg: '#23233C',
  ink: '#1C1C1C',
  black: '#000000',
  accent: '#6CC57C',
  accentDeep: '#179F2F',
  accentSoft: '#61D27C',
  accent85: '#6CC57CD9',
  accent64: '#6CC57CA3',
  accentTint: '#6CC57C33',
  heroTint: '#6CC57C2E',
  onAccent: '#FFFFFF',
  secondary: '#23233C',
  deposit: '#2B2B2B',
  muted: '#A5A5A5',
  muted2: '#8D8D8D',
  muted3: '#898888',
  muted4: '#B4B4B4',
  navInactive: '#BBC7DB',
  track: '#E3E3E3',
  border: '#707070',
  divider: '#1C1C1C',
  ruleWarm: '#C48B30',
  backInk: '#181461',
  danger: '#D9534F',
} as const;

export const spacing = {
  space0: 4,
  space1: 8,
  space2: 12,
  space3: 16,
  space4: 20,
  space5: 24,
  space6: 32,
  space7: 40,
} as const;

export const radii = {
  sm: 3,
  md: 5,
  lg: 8,
  lg2: 10,
  xl: 12,
  '2xl': 18,
  '3xl': 20,
  pill: 999,
} as const;

/**
 * Stacking order for elements that float above a screen's own layout.
 * The Dashboard Menu's back control overlaps the profile row, so it needs an
 * explicit stacking value instead of relying on DOM/paint order.
 */
export const zIndex = {
  header: 1,
  backControl: 2,
} as const;

/**
 * The font family names loaded at the app root with `useFonts`.
 * Use these names in every `fontFamily` style.
 */
export const fontFamilies = {
  inter: 'Inter_400Regular',
  interThin: 'Inter_100Thin',
  interMedium: 'Inter_500Medium',
  aleo: 'Aleo_700Bold',
  ubuntu: 'Ubuntu_400Regular',
  ubuntuBold: 'Ubuntu_700Bold',
} as const;

export const typography = {
  text45: {
    fontFamily: fontFamilies.interMedium,
    fontSize: 45,
    lineHeight: 57,
    textTransform: 'uppercase',
  },
  text40: {
    fontFamily: fontFamilies.aleo,
    fontSize: 40,
    lineHeight: 51,
  },
  text25: {
    fontFamily: fontFamilies.aleo,
    fontSize: 25,
    lineHeight: 30,
  },
  text25Alt: {
    fontFamily: fontFamilies.aleo,
    fontSize: 25,
    lineHeight: 32,
  },
  text24: {
    fontFamily: fontFamilies.aleo,
    fontSize: 24,
    lineHeight: 29,
  },
  text20: {
    fontFamily: fontFamilies.aleo,
    fontSize: 20,
    lineHeight: 25,
  },
  text17: {
    fontFamily: fontFamilies.ubuntuBold,
    fontSize: 17,
    lineHeight: 20,
  },
  text16: {
    fontFamily: fontFamilies.aleo,
    fontSize: 16,
    lineHeight: 19,
  },
  text16Alt: {
    fontFamily: fontFamilies.inter,
    fontSize: 16,
    lineHeight: 19,
  },
  text15Alt: {
    fontFamily: fontFamilies.interMedium,
    fontSize: 15,
    lineHeight: 19,
  },
  text14: {
    fontFamily: fontFamilies.aleo,
    fontSize: 14,
    lineHeight: 17,
  },
  text14Alt: {
    fontFamily: fontFamilies.inter,
    fontSize: 14,
    lineHeight: 17,
  },
  text14Thin: {
    fontFamily: fontFamilies.interThin,
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: 2.8,
    textTransform: 'uppercase',
  },
  text13Alt: {
    fontFamily: fontFamilies.inter,
    fontSize: 13,
    lineHeight: 17,
  },
  text12: {
    fontFamily: fontFamilies.interThin,
    fontSize: 12,
    lineHeight: 15,
    letterSpacing: 2.4,
    textTransform: 'uppercase',
  },
  text12Alt: {
    fontFamily: fontFamilies.inter,
    fontSize: 12,
    lineHeight: 14,
  },
  text11Ubuntu: {
    fontFamily: fontFamilies.ubuntuBold,
    fontSize: 11,
    lineHeight: 12,
    letterSpacing: 0.3,
  },
  text10Ubuntu: {
    fontFamily: fontFamilies.ubuntu,
    fontSize: 10,
    lineHeight: 12,
  },
  text10: {
    fontFamily: fontFamilies.inter,
    fontSize: 10,
    lineHeight: 13,
  },
  text9: {
    fontFamily: fontFamilies.interThin,
    fontSize: 9,
    lineHeight: 11,
    letterSpacing: 1.8,
    textTransform: 'uppercase',
  },
  text7: {
    fontFamily: fontFamilies.aleo,
    fontSize: 7,
    lineHeight: 9,
  },
} satisfies Record<string, TextStyle>;

/**
 * Bottom tab bar tokens, read from the frames' Navbar group (413×77 at y=819).
 * The bar carries four items whose labels map onto the three screens plus the
 * disabled "Liked" placeholder, and a centred notch/reserved space at the top
 * edge where the screens' FloatingAddButton sits.
 */
export const tabBar = {
  height: 77,
  itemWidth: 44,
  itemGap: 12,
  sidePadding: 24,
  iconRowTop: 17,
  iconBoxHeight: 21,
  iconLabelGap: 5,
  minTouchTarget: 44,
  disabledOpacity: 0.45,
  shadowColor: '#607193',
  shadowOffset: { width: 0, height: 3 },
  shadowOpacity: 0.16,
  shadowRadius: 20,
  elevation: 12,
  notchWidth: 76,
  notchHeight: 38,
  notchRadius: 38,
  label: {
    fontFamily: fontFamilies.aleo,
    fontSize: 7,
    lineHeight: 5,
  } satisfies TextStyle,
  iconSizes: {
    Dashboard: 22,
    MoneyManagement: 19,
    Liked: 20,
    TimeManagement: 15,
  },
} as const;

export const theme = {
  colors,
  spacing,
  radii,
  zIndex,
  fontFamilies,
  typography,
  tabBar,
} as const;

export type Theme = typeof theme;
