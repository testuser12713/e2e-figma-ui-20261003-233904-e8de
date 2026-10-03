import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { AppProvider } from '../../state/AppStore';
import { MoneyManagementScreen } from '../MoneyManagementScreen';

jest.mock('react-native-safe-area-context', () =>
  require('react-native-safe-area-context/jest/mock').default,
);

const navigation = {
  canGoBack: jest.fn(() => true),
  goBack: jest.fn(),
  navigate: jest.fn(),
} as never;

function renderScreen() {
  return render(
    <AppProvider>
      <MoneyManagementScreen
        navigation={navigation}
        route={{ key: 'money', name: 'MoneyManagement' } as never}
      />
    </AppProvider>,
  );
}

describe('MoneyManagementScreen', () => {
  it('shows the balance computed from the seed transactions and the full list', async () => {
    await renderScreen();

    expect(screen.getByTestId('money-balance')).toHaveTextContent('2,368.20€');
    expect(screen.getByText('Monthly Salary')).toBeTruthy();
    expect(screen.getByText('Spend On Fun Mall Cinema')).toBeTruthy();
    expect(screen.getByText('Online Course')).toBeTruthy();
  });

  it('renders the six quick category tiles of the 3x2 grid', async () => {
    await renderScreen();

    for (let index = 0; index < 6; index += 1) {
      expect(screen.getByTestId(`quick-category-${index}`)).toBeTruthy();
    }
    expect(screen.queryByTestId('quick-category-6')).toBeNull();
  });

  it('filters to income and shows a sum that matches the visible rows', async () => {
    await renderScreen();

    await fireEvent.press(screen.getByTestId('money-filter-income'));

    expect(screen.getByText('Monthly Salary')).toBeTruthy();
    expect(screen.queryByText('Spend On Fun Mall Cinema')).toBeNull();
    expect(screen.getByTestId('money-filtered-total')).toHaveTextContent('2,820.00€');
  });

  it('filters to expenses and shows a sum that matches the visible rows', async () => {
    await renderScreen();

    await fireEvent.press(screen.getByTestId('money-filter-expense'));

    expect(screen.queryByText('Monthly Salary')).toBeNull();
    expect(screen.getByText('Spend On Fun Mall Cinema')).toBeTruthy();
    expect(screen.getByTestId('money-filtered-total')).toHaveTextContent('451.80€');
  });

  it('opens an add sheet that starts neutral', async () => {
    await renderScreen();

    await fireEvent.press(screen.getByTestId('money-add-button'));

    expect(screen.getByTestId('add-expense-sheet')).toBeTruthy();
    expect(screen.queryByTestId('add-expense-name-error')).toBeNull();
    expect(screen.queryByTestId('add-expense-amount-error')).toBeNull();
  });

  it('shows validation errors only after a submit attempt', async () => {
    await renderScreen();

    await fireEvent.press(screen.getByTestId('money-add-button'));
    await fireEvent.press(screen.getByTestId('add-expense-submit'));

    expect(screen.getByTestId('add-expense-name-error')).toBeTruthy();
    expect(screen.getByTestId('add-expense-amount-error')).toBeTruthy();
  });

  it('adds a valid entry immediately to the list and the balance', async () => {
    await renderScreen();

    await fireEvent.press(screen.getByTestId('money-add-button'));
    await fireEvent.changeText(screen.getByTestId('add-expense-name'), 'Test Expense');
    await fireEvent.changeText(screen.getByTestId('add-expense-amount'), '10');
    await fireEvent.press(screen.getByTestId('add-expense-submit'));

    expect(screen.queryByTestId('add-expense-sheet')).toBeNull();
    expect(screen.getByText('Test Expense')).toBeTruthy();
    expect(screen.getByTestId('money-balance')).toHaveTextContent('2,358.20€');
  });
});
