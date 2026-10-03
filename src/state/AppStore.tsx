import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import type {
  Appointment,
  NewAppointmentInput,
  NewTransactionInput,
  Transaction,
} from '../data/types';
import { seedAppointments, seedTransactions } from '../data/seed';

export type AppData = {
  transactions: Transaction[];
  appointments: Appointment[];
  addTransaction(input: NewTransactionInput): void;
  addAppointment(input: NewAppointmentInput): void;
  updateAppointment(id: string, input: NewAppointmentInput): void;
};

const AppContext = createContext<AppData | undefined>(undefined);

let idCounter = 0;
function nextId(prefix: string): string {
  idCounter += 1;
  return `${prefix}-${Date.now().toString(36)}-${idCounter}`;
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>(seedTransactions);
  const [appointments, setAppointments] = useState<Appointment[]>(seedAppointments);

  const addTransaction = useCallback((input: NewTransactionInput) => {
    setTransactions((prev) => [...prev, { ...input, id: nextId('txn') }]);
  }, []);

  const addAppointment = useCallback((input: NewAppointmentInput) => {
    setAppointments((prev) => [
      ...prev,
      { ...input, id: nextId('apt'), section: 'upcoming' },
    ]);
  }, []);

  const updateAppointment = useCallback((id: string, input: NewAppointmentInput) => {
    setAppointments((prev) =>
      prev.map((appointment) =>
        appointment.id === id ? { ...appointment, ...input } : appointment,
      ),
    );
  }, []);

  const value = useMemo<AppData>(
    () => ({
      transactions,
      appointments,
      addTransaction,
      addAppointment,
      updateAppointment,
    }),
    [transactions, appointments, addTransaction, addAppointment, updateAppointment],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppData(): AppData {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppData must be used within an AppProvider');
  }
  return context;
}
