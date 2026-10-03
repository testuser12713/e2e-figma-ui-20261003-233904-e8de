import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react-native';
import { AppProvider } from '../state/AppStore';
import { RootNavigator, navigationRef } from '../navigation/RootNavigator';

jest.mock('react-native-safe-area-context', () =>
  require('react-native-safe-area-context/jest/mock').default,
);

function renderShell() {
  return render(
    <AppProvider>
      <RootNavigator />
    </AppProvider>,
  );
}

describe('app shell', () => {
  it('starts on the Dashboard screen with the Dashboard tab active', async () => {
    await renderShell();

    expect(screen.getByTestId('screen-Dashboard')).toBeTruthy();
    expect(screen.getByTestId('tab-Dashboard').props.accessibilityState).toMatchObject({
      selected: true,
      disabled: false,
    });
  });

  it('switches to Money Management when its tab is pressed and marks it active', async () => {
    await renderShell();

    await fireEvent.press(screen.getByTestId('tab-MoneyManagement'));

    expect(screen.getByTestId('screen-MoneyManagement')).toBeTruthy();
    expect(
      screen.getByTestId('tab-MoneyManagement').props.accessibilityState,
    ).toMatchObject({ selected: true });
    expect(screen.getByTestId('tab-Dashboard').props.accessibilityState).toMatchObject({
      selected: false,
    });
  });

  it('switches to Time Management and back to Dashboard', async () => {
    await renderShell();

    await fireEvent.press(screen.getByTestId('tab-TimeManagement'));
    expect(screen.getByTestId('screen-TimeManagement')).toBeTruthy();

    await fireEvent.press(screen.getByTestId('tab-Dashboard'));
    expect(screen.getByTestId('screen-Dashboard')).toBeTruthy();
    expect(screen.getByTestId('tab-Dashboard').props.accessibilityState).toMatchObject({
      selected: true,
    });
  });

  it('keeps the disabled Liked tab unavailable', async () => {
    await renderShell();

    const liked = screen.getByTestId('tab-Liked');
    expect(liked.props.accessibilityState).toMatchObject({
      selected: false,
      disabled: true,
    });
  });

  it('registers the Dashboard Menu and Dashboard Statistics screens', async () => {
    await renderShell();

    await act(async () => {
      navigationRef.navigate('DashboardMenu');
    });
    expect(screen.getByTestId('screen-DashboardMenu')).toBeTruthy();

    await act(async () => {
      navigationRef.navigate('DashboardStats');
    });
    expect(screen.getByTestId('screen-DashboardStats')).toBeTruthy();
  });
});
