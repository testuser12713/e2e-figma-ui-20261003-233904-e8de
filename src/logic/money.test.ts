import type { Transaction } from '../data/types';
import {
  computeBalance,
  filteredTotal,
  filterTransactions,
  formatDayLabel,
  formatEuro,
  groupTransactionsByDay,
  sumTransactions,
  weeklyTotals,
} from './money';

const transactions: Transaction[] = [
  {
    id: 'a',
    name: 'Salary',
    category: 'Salary',
    type: 'income',
    amount: 2400,
    date: '2020-04-01',
  },
  {
    id: 'b',
    name: 'Cinema',
    category: 'Movie',
    type: 'expense',
    amount: 23,
    date: '2020-04-02',
  },
  {
    id: 'c',
    name: 'Groceries',
    category: 'Groceries',
    type: 'expense',
    amount: 86.5,
    date: '2020-04-02',
  },
  {
    id: 'd',
    name: 'Freelance',
    category: 'Freelance',
    type: 'income',
    amount: 420,
    date: '2020-04-05',
  },
];

describe('formatEuro', () => {
  it('formats with dot decimals, comma thousands and a trailing euro sign', () => {
    expect(formatEuro(1345)).toBe('1,345.00€');
    expect(formatEuro(23)).toBe('23.00€');
    expect(formatEuro(86.5)).toBe('86.50€');
  });

  it('handles negative and non-finite amounts', () => {
    expect(formatEuro(-12.3)).toBe('-12.30€');
    expect(formatEuro(Number.NaN)).toBe('0.00€');
  });
});

describe('computeBalance', () => {
  it('subtracts expenses from income', () => {
    expect(computeBalance(transactions)).toBeCloseTo(2400 + 420 - 23 - 86.5);
  });

  it('is zero for an empty ledger', () => {
    expect(computeBalance([])).toBe(0);
  });
});

describe('filterTransactions', () => {
  it('returns every row unchanged for all', () => {
    expect(filterTransactions(transactions, 'all')).toHaveLength(4);
  });

  it('keeps only the matching type', () => {
    expect(filterTransactions(transactions, 'income').map((t) => t.id)).toEqual(['a', 'd']);
    expect(filterTransactions(transactions, 'expense').map((t) => t.id)).toEqual(['b', 'c']);
  });
});

describe('sumTransactions and filteredTotal', () => {
  it('sums the amounts of the given list', () => {
    expect(sumTransactions(transactions)).toBeCloseTo(2400 + 23 + 86.5 + 420);
    expect(sumTransactions([])).toBe(0);
  });

  it('makes the total match the filtered list', () => {
    expect(filteredTotal(transactions, 'expense')).toBeCloseTo(109.5);
    expect(filteredTotal(transactions, 'income')).toBeCloseTo(2820);
    expect(filteredTotal(transactions, 'all')).toBeCloseTo(computeBalance(transactions));
  });
});

describe('formatDayLabel', () => {
  it('builds the day-of-month plus weekday the ledger shows', () => {
    expect(formatDayLabel('2020-04-02')).toBe('02- Thursday');
    expect(formatDayLabel('2020-04-05')).toBe('05- Sunday');
  });

  it('falls back to the raw value for a malformed date', () => {
    expect(formatDayLabel('nonsense')).toBe('nonsense');
  });
});

describe('groupTransactionsByDay', () => {
  it('groups by day, newest first, keeping every row', () => {
    const groups = groupTransactionsByDay(transactions);
    expect(groups.map((group) => group.date)).toEqual([
      '2020-04-05',
      '2020-04-02',
      '2020-04-01',
    ]);
    const aprilSecond = groups.find((group) => group.date === '2020-04-02');
    expect(aprilSecond?.transactions.map((t) => t.id)).toEqual(['b', 'c']);
    expect(aprilSecond?.label).toBe('02- Thursday');
  });

  it('returns nothing for an empty list', () => {
    expect(groupTransactionsByDay([])).toEqual([]);
  });
});

describe('weeklyTotals', () => {
  it('reports income and expense per weekday', () => {
    const totals = weeklyTotals(transactions);
    expect(totals.map((total) => total.weekday)).toEqual([
      'Mon',
      'Tue',
      'Wed',
      'Thu',
      'Fri',
      'Sat',
      'Sun',
    ]);
    const thursday = totals.find((total) => total.weekday === 'Thu');
    expect(thursday?.expense).toBeCloseTo(109.5);
    const sunday = totals.find((total) => total.weekday === 'Sun');
    expect(sunday?.income).toBeCloseTo(420);
  });
});
