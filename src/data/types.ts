export type TransactionType = 'income' | 'expense';

export type Transaction = {
  id: string;
  name: string;
  description?: string;
  category: string;
  type: TransactionType;
  amount: number;
  /** yyyy-mm-dd */
  date: string;
};

export type NewTransactionInput = {
  name: string;
  description?: string;
  category: string;
  type: TransactionType;
  amount: number;
  date: string;
};

export type AppointmentSection = 'upcoming' | 'past';

export type Appointment = {
  id: string;
  title: string;
  doctor: string;
  description?: string;
  date: string;
  time: string;
  section: AppointmentSection;
};

export type NewAppointmentInput = {
  title: string;
  doctor: string;
  description?: string;
  date: string;
  time: string;
};
