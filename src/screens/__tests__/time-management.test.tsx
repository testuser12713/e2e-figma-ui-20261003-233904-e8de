import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { AppProvider } from '../../state/AppStore';
import { TimeManagementScreen, type TimeManagementScreenProps } from '../TimeManagementScreen';

jest.mock('react-native-safe-area-context', () =>
  require('react-native-safe-area-context/jest/mock').default,
);

function makeNavigation() {
  return {
    canGoBack: jest.fn(() => false),
    goBack: jest.fn(),
    navigate: jest.fn(),
  };
}

async function renderScreen(navigation = makeNavigation()) {
  const props = { navigation } as unknown as TimeManagementScreenProps;
  const utils = await render(
    <AppProvider>
      <TimeManagementScreen {...props} />
    </AppProvider>,
  );
  return { ...utils, navigation };
}

describe('Time Management screen', () => {
  it('lists the seeded upcoming appointments with a computed progress', async () => {
    await renderScreen();

    expect(screen.getByText('My Appointments')).toBeTruthy();
    expect(screen.getByTestId('time-row-apt-001')).toBeTruthy();
    expect(screen.getByTestId('time-row-apt-002')).toBeTruthy();
    expect(screen.queryByTestId('time-row-apt-004')).toBeNull();

    expect(screen.getByTestId('time-progress').props.accessibilityValue).toMatchObject({
      now: 25,
    });
  });

  it('switches between Upcoming and Past', async () => {
    await renderScreen();

    await fireEvent.press(screen.getByTestId('time-tab-past'));

    expect(screen.getByTestId('time-tab-past').props.accessibilityState).toMatchObject({
      selected: true,
    });
    expect(screen.getByTestId('time-row-apt-004')).toBeTruthy();
    expect(screen.queryByTestId('time-row-apt-001')).toBeNull();

    await fireEvent.press(screen.getByTestId('time-tab-upcoming'));
    expect(screen.getByTestId('time-row-apt-001')).toBeTruthy();
    expect(screen.queryByTestId('time-row-apt-004')).toBeNull();
  });

  it('filters the list through the search field', async () => {
    await renderScreen();

    await fireEvent.changeText(screen.getByTestId('time-search'), 'cardio');
    expect(screen.getByTestId('time-row-apt-002')).toBeTruthy();
    expect(screen.queryByTestId('time-row-apt-001')).toBeNull();
  });

  it('selects a day in the period view and shows the whole period again on a second tap', async () => {
    await renderScreen();

    await fireEvent.press(screen.getByTestId('time-overview'));
    expect(screen.getByTestId('time-period-view')).toBeTruthy();

    await fireEvent.press(screen.getByTestId('time-period-day-2020-04-09'));
    expect(screen.getByTestId('time-row-apt-001')).toBeTruthy();
    expect(screen.queryByTestId('time-row-apt-004')).toBeNull();

    await fireEvent.press(screen.getByTestId('time-period-day-2020-04-09'));
    expect(screen.getByTestId('time-row-apt-004')).toBeTruthy();
  });

  it('keeps an empty, untouched add form neutral', async () => {
    await renderScreen();

    await fireEvent.press(screen.getByTestId('time-add-appointment'));

    expect(screen.getByTestId('time-add-sheet')).toBeTruthy();
    expect(screen.queryByTestId('time-sheet-name-error')).toBeNull();
    expect(screen.queryByTestId('time-sheet-date-error')).toBeNull();
  });

  it('shows field errors after a submit attempt on an empty form', async () => {
    await renderScreen();

    await fireEvent.press(screen.getByTestId('time-add-appointment'));
    await fireEvent.press(screen.getByTestId('time-sheet-submit'));

    expect(screen.getByTestId('time-sheet-name-error')).toBeTruthy();
    expect(screen.getByTestId('time-sheet-date-error')).toBeTruthy();
  });

  it('adds a new appointment through the form and lists it immediately', async () => {
    await renderScreen();

    await fireEvent.press(screen.getByTestId('time-add-appointment'));
    await fireEvent.changeText(screen.getByTestId('time-sheet-name'), 'Eye Check');
    await fireEvent.changeText(screen.getByTestId('time-sheet-date'), '10/05/2020');
    await fireEvent.press(screen.getByTestId('time-sheet-submit'));

    expect(screen.queryByTestId('time-add-sheet')).toBeNull();
    expect(screen.getByText('Eye Check')).toBeTruthy();
  });

  it('prefills the form from a Quick Add row', async () => {
    await renderScreen();

    await fireEvent.press(screen.getByTestId('time-add-appointment'));
    await fireEvent.press(screen.getByTestId('time-quick-add-gym'));

    expect(screen.getByTestId('time-sheet-name').props.value).toBe('Gym');
    expect(screen.getByTestId('time-sheet-description').props.value).toBe('Customize Plan');
  });

  it('opens Modify prefilled and saves through updateAppointment', async () => {
    await renderScreen();

    await fireEvent.press(screen.getByTestId('time-modify-apt-001'));
    expect(screen.getByTestId('time-sheet-name').props.value).toBe('Dentist');

    await fireEvent.changeText(screen.getByTestId('time-sheet-name'), 'Dentist Updated');
    await fireEvent.press(screen.getByTestId('time-sheet-submit'));

    expect(screen.queryByTestId('time-add-sheet')).toBeNull();
    expect(screen.getByText('Dentist Updated - Clara Odding')).toBeTruthy();
  });

  it('leaves the tab through goBack when there is history', async () => {
    const navigation = makeNavigation();
    navigation.canGoBack.mockReturnValue(true);
    await renderScreen(navigation);

    await fireEvent.press(screen.getByTestId('time-back'));
    expect(navigation.goBack).toHaveBeenCalled();
  });

  it('falls back to the Dashboard tab when there is no history', async () => {
    const navigation = makeNavigation();
    await renderScreen(navigation);

    await fireEvent.press(screen.getByTestId('time-back'));
    expect(navigation.navigate).toHaveBeenCalledWith('Dashboard');
  });
});
