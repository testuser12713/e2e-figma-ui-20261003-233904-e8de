import type { Transaction } from '../data/types';

/** The three views the income/expense switch can select. */
export type MoneyFilter = 'all' | 'income' | 'expense';

/** Transactions that share one calendar day, with the label the ledger shows. */
export type TransactionDayGroup = {
  date: string;
  label: string;
  transactions: Transaction[];
};

/** One weekday column of the weekly report. */
export type WeeklyTotal = {
  weekday: string;
  income: number;
  expense: number;
};

const WEEKDAYS = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const WEEKDAY_ORDER = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

/**
 * Parse a `yyyy-mm-dd` string as a LOCAL date so the weekday does not shift
 * by a day the way `new Date('yyyy-mm-dd')` (UTC) does.
 */
function parseIsoDate(value: string): Date | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) {
    return null;
  }
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(year, month - 1, day);
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null;
  }
  return date;
}

/** Format an amount as the design does: `1,345.00€`. */
export function formatEuro(amount: number): string {
  const safe = Number.isFinite(amount) ? amount : 0;
  const sign = safe < 0 ? '-' : '';
  const [whole, decimals] = Math.abs(safe).toFixed(2).split('.');
  const grouped = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return `${sign}${grouped}.${decimals}€`;
}

/** Balance = income minus expenses, computed from the transactions. */
export function computeBalance(transactions: Transaction[]): number {
  return transactions.reduce(
    (sum, transaction) =>
      sum + (transaction.type === 'income' ? transaction.amount : -transaction.amount),
    0,
  );
}

/** The transactions a filter selects, in the order they were given. */
export function filterTransactions(
  transactions: Transaction[],
  filter: MoneyFilter,
): Transaction[] {
  if (filter === 'all') {
    return transactions.slice();
  }
  return transactions.filter((transaction) => transaction.type === filter);
}

/** Sum of the amounts in a list (all amounts are positive as stored). */
export function sumTransactions(transactions: Transaction[]): number {
  return transactions.reduce((sum, transaction) => sum + transaction.amount, 0);
}

/**
 * The figure shown next to the list for the active filter. For `all` it is the
 * net balance so it stays meaningful; for income/expense it is the sum of the
 * visible rows, so the number always matches the filtered list.
 */
export function filteredTotal(
  transactions: Transaction[],
  filter: MoneyFilter,
): number {
  if (filter === 'all') {
    return computeBalance(transactions);
  }
  return sumTransactions(filterTransactions(transactions, filter));
}

/** `2020-04-02` -> `02- Thursday` (the ledger's day label). */
export function formatDayLabel(value: string): string {
  const date = parseIsoDate(value);
  if (!date) {
    return value;
  }
  const day = String(date.getDate()).padStart(2, '0');
  return `${day}- ${WEEKDAYS[date.getDay()]}`;
}

/** Group transactions by day, newest day first, each with its day label. */
export function groupTransactionsByDay(
  transactions: Transaction[],
): TransactionDayGroup[] {
  const byDate = new Map<string, Transaction[]>();
  for (const transaction of transactions) {
    const list = byDate.get(transaction.date);
    if (list) {
      list.push(transaction);
    } else {
      byDate.set(transaction.date, [transaction]);
    }
  }
  return Array.from(byDate.entries())
    .sort((a, b) => (a[0] < b[0] ? 1 : a[0] > b[0] ? -1 : 0))
    .map(([date, list]) => ({
      date,
      label: formatDayLabel(date),
      transactions: list,
    }));
}

/** Income/expense totals per weekday, Mon..Sun, for the weekly report bars. */
export function weeklyTotals(transactions: Transaction[]): WeeklyTotal[] {
  const totals: WeeklyTotal[] = WEEKDAY_ORDER.map((weekday) => ({
    weekday,
    income: 0,
    expense: 0,
  }));
  const byWeekday = new Map(WEEKDAY_ORDER.map((weekday, index) => [weekday, index]));
  for (const transaction of transactions) {
    const date = parseIsoDate(transaction.date);
    if (!date) {
      continue;
    }
    const weekday = WEEKDAYS[date.getDay()].slice(0, 3);
    const index = byWeekday.get(weekday);
    if (index === undefined) {
      continue;
    }
    if (transaction.type === 'income') {
      totals[index].income += transaction.amount;
    } else {
      totals[index].expense += transaction.amount;
    }
  }
  return totals;
}
