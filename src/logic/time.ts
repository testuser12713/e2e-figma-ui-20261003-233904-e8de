import type { Appointment, AppointmentSection } from '../data/types';

/**
 * Pure derivation helpers for the Time Management screen: splitting the
 * appointments into the Upcoming/Past sections, computing the progress value,
 * grouping them by day, formatting their dates and filtering them.
 *
 * Everything here is pure so it can be unit tested without a renderer.
 */

export const WEEKDAY_LETTERS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'] as const;

const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export type IsoDateParts = { year: number; month: number; day: number };

/** Parses a `yyyy-mm-dd` string without ever going through a time zone. */
export function parseIsoDate(date: string): IsoDateParts | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date.trim());
  if (!match) return null;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  if (month < 1 || month > 12 || day < 1 || day > 31) return null;
  const probe = new Date(year, month - 1, day);
  if (
    probe.getFullYear() !== year ||
    probe.getMonth() !== month - 1 ||
    probe.getDate() !== day
  ) {
    return null;
  }
  return { year, month, day };
}

export function pad2(value: number): string {
  return value < 10 ? `0${value}` : String(value);
}

/** `09/04/2020` — the date line the appointment list frames show. */
export function formatDate(date: string): string {
  const parts = parseIsoDate(date);
  if (!parts) return date;
  return `${pad2(parts.day)}/${pad2(parts.month)}/${parts.year}`;
}

/** `9 April 2020` — the caption form the period view shows. */
export function formatLongDate(date: string): string {
  const parts = parseIsoDate(date);
  if (!parts) return date;
  return `${parts.day} ${MONTH_NAMES[parts.month - 1]} ${parts.year}`;
}

/** Splits the appointments into the two sections the switch toggles. */
export function splitBySection(appointments: Appointment[]): {
  upcoming: Appointment[];
  past: Appointment[];
} {
  const upcoming: Appointment[] = [];
  const past: Appointment[] = [];
  for (const appointment of appointments) {
    (appointment.section === 'past' ? past : upcoming).push(appointment);
  }
  return { upcoming, past };
}

/** Share of the schedule that is already behind the user, clamped to 0..1. */
export function progressValue(appointments: Appointment[]): number {
  if (appointments.length === 0) return 0;
  const { past } = splitBySection(appointments);
  return past.length / appointments.length;
}

export type DayGroup = { date: string; appointments: Appointment[] };

function timeToMinutes(time: string): number {
  const match = /(\d{1,2})(?::(\d{2}))?\s*(AM|PM)?/i.exec(time);
  if (!match) return Number.MAX_SAFE_INTEGER;
  let hours = Number(match[1]);
  const minutes = Number(match[2] ?? 0);
  const meridiem = match[3]?.toUpperCase();
  if (meridiem === 'PM' && hours < 12) hours += 12;
  if (meridiem === 'AM' && hours === 12) hours = 0;
  return hours * 60 + minutes;
}

export function sortByTime(appointments: Appointment[]): Appointment[] {
  return [...appointments].sort((a, b) => timeToMinutes(a.time) - timeToMinutes(b.time));
}

/** Groups appointments by their date, earliest day first. */
export function groupByDay(appointments: Appointment[]): DayGroup[] {
  const groups = new Map<string, Appointment[]>();
  for (const appointment of appointments) {
    const list = groups.get(appointment.date);
    if (list) list.push(appointment);
    else groups.set(appointment.date, [appointment]);
  }
  return [...groups.entries()]
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([date, list]) => ({ date, appointments: sortByTime(list) }));
}

export type CalendarDay = {
  /** `yyyy-mm-dd` */
  date: string;
  day: number;
  weekdayLetter: string;
};

/** Seven days starting on Sunday, for the week that contains `date`. */
export function buildWeek(date: string): CalendarDay[] {
  const parts = parseIsoDate(date) ?? { year: 2020, month: 1, day: 1 };
  const start = new Date(parts.year, parts.month - 1, parts.day);
  start.setDate(start.getDate() - start.getDay());
  const days: CalendarDay[] = [];
  for (let index = 0; index < 7; index += 1) {
    const current = new Date(start.getFullYear(), start.getMonth(), start.getDate() + index);
    days.push({
      date: `${current.getFullYear()}-${pad2(current.getMonth() + 1)}-${pad2(current.getDate())}`,
      day: current.getDate(),
      weekdayLetter: WEEKDAY_LETTERS[current.getDay()],
    });
  }
  return days;
}

/** Returns the `yyyy-mm-dd` that is `days` away from `date`. */
export function shiftDate(date: string, days: number): string {
  const parts = parseIsoDate(date);
  if (!parts) return date;
  const shifted = new Date(parts.year, parts.month - 1, parts.day + days);
  return `${shifted.getFullYear()}-${pad2(shifted.getMonth() + 1)}-${pad2(shifted.getDate())}`;
}

/** `15-21 April 2020`, or the two-month form when the week straddles a month. */
export function formatPeriodLabel(date: string): string {
  const week = buildWeek(date);
  const first = parseIsoDate(week[0].date);
  const last = parseIsoDate(week[6].date);
  if (!first || !last) return date;
  if (first.month === last.month) {
    return `${first.day}-${last.day} ${MONTH_NAMES[first.month - 1]} ${first.year}`;
  }
  return `${first.day} ${MONTH_NAMES[first.month - 1]} - ${last.day} ${
    MONTH_NAMES[last.month - 1]
  } ${last.year}`;
}

export function matchesQuery(appointment: Appointment, query: string): boolean {
  const needle = query.trim().toLowerCase();
  if (!needle) return true;
  return [appointment.title, appointment.doctor, appointment.description ?? '']
    .join(' ')
    .toLowerCase()
    .includes(needle);
}

export type AppointmentFilter = {
  section?: AppointmentSection;
  query?: string;
  /** `yyyy-mm-dd`; when set only that day's appointments are returned. */
  date?: string | null;
};

export function filterAppointments(
  appointments: Appointment[],
  filter: AppointmentFilter = {},
): Appointment[] {
  let result = filter.section
    ? splitBySection(appointments)[filter.section]
    : appointments;
  if (filter.query) {
    result = result.filter((appointment) => matchesQuery(appointment, filter.query as string));
  }
  if (filter.date) {
    result = result.filter((appointment) => appointment.date === filter.date);
  }
  return result;
}

/**
 * Accepts `yyyy-mm-dd`, `dd/mm/yyyy` or `dd.mm.yyyy` and returns a normalized
 * `yyyy-mm-dd`, or null when the input is not a real calendar date.
 */
export function normalizeDateInput(input: string): string | null {
  const value = input.trim();
  if (!value) return null;
  const iso = parseIsoDate(value);
  if (iso) return `${iso.year}-${pad2(iso.month)}-${pad2(iso.day)}`;
  const match = /^(\d{1,2})[./](\d{1,2})[./](\d{4})$/.exec(value);
  if (!match) return null;
  const candidate = `${match[3]}-${pad2(Number(match[2]))}-${pad2(Number(match[1]))}`;
  return parseIsoDate(candidate) ? candidate : null;
}
