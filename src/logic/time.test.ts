import type { Appointment } from '../data/types';
import {
  buildWeek,
  filterAppointments,
  formatDate,
  formatLongDate,
  formatPeriodLabel,
  groupByDay,
  matchesQuery,
  normalizeDateInput,
  progressValue,
  shiftDate,
  splitBySection,
} from './time';

function appointment(overrides: Partial<Appointment> = {}): Appointment {
  return {
    id: 'apt-x',
    title: 'Dentist',
    doctor: 'Clara Odding',
    date: '2020-04-09',
    time: '10 AM',
    section: 'upcoming',
    ...overrides,
  };
}

describe('splitBySection', () => {
  it('routes appointments into upcoming and past by their section', () => {
    const upcoming = appointment({ id: 'u1', section: 'upcoming' });
    const past = appointment({ id: 'p1', section: 'past' });
    const result = splitBySection([upcoming, past]);
    expect(result.upcoming.map((a) => a.id)).toEqual(['u1']);
    expect(result.past.map((a) => a.id)).toEqual(['p1']);
  });

  it('treats everything as upcoming when nothing is past', () => {
    const result = splitBySection([appointment(), appointment({ id: 'u2' })]);
    expect(result.past).toHaveLength(0);
    expect(result.upcoming).toHaveLength(2);
  });
});

describe('progressValue', () => {
  it('is zero for an empty schedule', () => {
    expect(progressValue([])).toBe(0);
  });

  it('is the share of past appointments', () => {
    const value = progressValue([
      appointment({ id: 'u1', section: 'upcoming' }),
      appointment({ id: 'u2', section: 'upcoming' }),
      appointment({ id: 'p1', section: 'past' }),
    ]);
    expect(value).toBeCloseTo(1 / 3, 5);
  });

  it('is one when every appointment is past', () => {
    expect(
      progressValue([appointment({ id: 'p1', section: 'past' }), appointment({ id: 'p2', section: 'past' })]),
    ).toBe(1);
  });
});

describe('date formatting', () => {
  it('formats the list date as dd/mm/yyyy', () => {
    expect(formatDate('2020-04-09')).toBe('09/04/2020');
  });

  it('formats the caption without a leading zero', () => {
    expect(formatLongDate('2019-04-18')).toBe('18 April 2019');
    expect(formatLongDate('2019-04-09')).toBe('9 April 2019');
  });

  it('passes an unparseable value through unchanged', () => {
    expect(formatDate('not-a-date')).toBe('not-a-date');
  });
});

describe('normalizeDateInput', () => {
  it('accepts an iso date', () => {
    expect(normalizeDateInput('2020-04-09')).toBe('2020-04-09');
  });

  it('accepts dd/mm/yyyy and dd.mm.yyyy', () => {
    expect(normalizeDateInput('09/04/2020')).toBe('2020-04-09');
    expect(normalizeDateInput('9.4.2020')).toBe('2020-04-09');
  });

  it('rejects impossible and empty input', () => {
    expect(normalizeDateInput('31/02/2020')).toBeNull();
    expect(normalizeDateInput('')).toBeNull();
    expect(normalizeDateInput('tomorrow')).toBeNull();
  });
});

describe('groupByDay', () => {
  it('groups by day, earliest first, and sorts within a day by time', () => {
    const groups = groupByDay([
      appointment({ id: 'b', date: '2020-04-10', time: '2 PM' }),
      appointment({ id: 'a', date: '2020-04-10', time: '9 AM' }),
      appointment({ id: 'c', date: '2020-04-09', time: '10 AM' }),
    ]);
    expect(groups.map((g) => g.date)).toEqual(['2020-04-09', '2020-04-10']);
    expect(groups[1].appointments.map((a) => a.id)).toEqual(['a', 'b']);
  });

  it('returns an empty list for no appointments', () => {
    expect(groupByDay([])).toEqual([]);
  });
});

describe('buildWeek', () => {
  it('builds seven days starting on Sunday', () => {
    const week = buildWeek('2020-04-18');
    expect(week).toHaveLength(7);
    expect(week[0].date).toBe('2020-04-12');
    expect(week[0].weekdayLetter).toBe('S');
    expect(week[6].date).toBe('2020-04-18');
  });

  it('labels the period from its first to its last day', () => {
    expect(formatPeriodLabel('2020-04-18')).toBe('12-18 April 2020');
  });
});

describe('shiftDate', () => {
  it('moves forward and backward across a month boundary', () => {
    expect(shiftDate('2020-04-30', 7)).toBe('2020-05-07');
    expect(shiftDate('2020-04-01', -7)).toBe('2020-03-25');
  });
});

describe('filterAppointments', () => {
  const all = [
    appointment({ id: 'u1', title: 'Dentist', doctor: 'Clara Odding', date: '2020-04-09' }),
    appointment({ id: 'u2', title: 'Cardiologist', doctor: 'Steven Pauliner', date: '2020-04-21' }),
    appointment({ id: 'p1', title: 'General Practitioner', doctor: 'Marc Lehmann', date: '2020-03-12', section: 'past' }),
  ];

  it('filters by section', () => {
    expect(filterAppointments(all, { section: 'past' }).map((a) => a.id)).toEqual(['p1']);
  });

  it('filters by date', () => {
    expect(filterAppointments(all, { date: '2020-04-21' }).map((a) => a.id)).toEqual(['u2']);
  });

  it('filters by a free-text query over title and doctor', () => {
    expect(filterAppointments(all, { query: 'paulin' }).map((a) => a.id)).toEqual(['u2']);
    expect(filterAppointments(all, { query: 'general' }).map((a) => a.id)).toEqual(['p1']);
  });

  it('returns everything with no filter', () => {
    expect(filterAppointments(all)).toHaveLength(3);
  });
});

describe('matchesQuery', () => {
  it('always matches an empty query', () => {
    expect(matchesQuery(appointment(), '   ')).toBe(true);
  });

  it('matches the description too', () => {
    expect(matchesQuery(appointment({ description: 'Routine check-up' }), 'routine')).toBe(true);
  });
});
