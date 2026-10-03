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

async function pressTab(testID: string) {
  await fireEvent.press(screen.getByTestId(testID));
}

/**
 * Structure-only tests for the app shell: the tab bar, the screens it reaches
 * and the root-stack routes. They never assert a screen's placeholder content -
 * each screen ticket owns its own copy.
 */
describe('app shell', () => {
  it('renders exactly the three contract tabs, in the contract order', async () => {
    await renderShell();

    const tabs = screen.getAllByRole('tab');
    expect(tabs.map((tab) => tab.props.testID)).toEqual([
      'tab-Dashboard',
      'tab-MoneyManagement',
      'tab-TimeManagement',
    ]);
  });

  it('starts on the Dashboard screen with the Dashboard tab active', async () => {
    await renderShell();

    expect(screen.getByTestId('screen-Dashboard')).toBeTruthy();
    expect(screen.getByTestId('tab-Dashboard').props.accessibilityState).toMatchObject({
      selected: true,
    });
    expect(
      screen.getByTestId('tab-MoneyManagement').props.accessibilityState,
    ).toMatchObject({ selected: false });
    expect(
      screen.getByTestId('tab-TimeManagement').props.accessibilityState,
    ).toMatchObject({ selected: false });
  });

  it('switches to each tab, reaches its screen and marks it active', async () => {
    await renderShell();

    await pressTab('tab-MoneyManagement');
    expect(screen.getByTestId('screen-MoneyManagement')).toBeTruthy();
    expect(
      screen.getByTestId('tab-MoneyManagement').props.accessibilityState,
    ).toMatchObject({ selected: true });
    expect(screen.getByTestId('tab-Dashboard').props.accessibilityState).toMatchObject({
      selected: false,
    });

    await pressTab('tab-TimeManagement');
    expect(screen.getByTestId('screen-TimeManagement')).toBeTruthy();
    expect(
      screen.getByTestId('tab-TimeManagement').props.accessibilityState,
    ).toMatchObject({ selected: true });

    await pressTab('tab-Dashboard');
    expect(screen.getByTestId('screen-Dashboard')).toBeTruthy();
    expect(screen.getByTestId('tab-Dashboard').props.accessibilityState).toMatchObject({
      selected: true,
    });
  });

  it('registers the Dashboard Menu and Dashboard Statistics stack screens', async () => {
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
