import type { Appointment, Transaction } from './types';

/**
 * In-memory sample data for the app. There is no backend and no persistence:
 * every screen reads and writes these collections through `AppStore`.
 */
export const seedTransactions: Transaction[] = [
  {
    id: 'txn-001',
    name: 'Monthly Salary',
    description: 'April salary',
    category: 'Salary',
    type: 'income',
    amount: 2400,
    date: '2020-04-01',
  },
  {
    id: 'txn-002',
    name: 'Spend On Fun Mall Cinema',
    description: 'Movie night',
    category: 'Movie',
    type: 'expense',
    amount: 23,
    date: '2020-04-02',
  },
  {
    id: 'txn-003',
    name: 'Whole Foods Market',
    description: 'Weekly groceries',
    category: 'Groceries',
    type: 'expense',
    amount: 86.5,
    date: '2020-04-05',
  },
  {
    id: 'txn-004',
    name: 'Fuel Station',
    description: 'Car refuel',
    category: 'Transport',
    type: 'expense',
    amount: 54.9,
    date: '2020-04-08',
  },
  {
    id: 'txn-005',
    name: 'Freelance Project',
    description: 'Design retainer',
    category: 'Freelance',
    type: 'income',
    amount: 420,
    date: '2020-04-12',
  },
  {
    id: 'txn-006',
    name: 'Electricity Bill',
    description: 'March statement',
    category: 'Utilities',
    type: 'expense',
    amount: 120,
    date: '2020-04-15',
  },
  {
    id: 'txn-007',
    name: 'Coffee House',
    description: 'Team meeting',
    category: 'Dining',
    type: 'expense',
    amount: 18.4,
    date: '2020-04-18',
  },
  {
    id: 'txn-008',
    name: 'Online Course',
    description: 'Business fundamentals',
    category: 'Education',
    type: 'expense',
    amount: 149,
    date: '2020-04-21',
  },
];

export const seedAppointments: Appointment[] = [
  {
    id: 'apt-001',
    title: 'Dentist',
    doctor: 'Clara Odding',
    description: 'Routine check-up',
    date: '2020-04-09',
    time: '10 AM',
    section: 'upcoming',
  },
  {
    id: 'apt-002',
    title: 'Cardiologist',
    doctor: 'Steven Pauliner',
    description: 'Heart screening',
    date: '2020-04-21',
    time: '12 AM',
    section: 'upcoming',
  },
  {
    id: 'apt-003',
    title: 'Dermatologist',
    doctor: 'Noemi Shinte',
    description: 'Skin consultation',
    date: '2020-06-18',
    time: '15 AM',
    section: 'upcoming',
  },
  {
    id: 'apt-004',
    title: 'General Practitioner',
    doctor: 'Marc Lehmann',
    description: 'Annual physical',
    date: '2020-03-12',
    time: '9 AM',
    section: 'past',
  },
];
