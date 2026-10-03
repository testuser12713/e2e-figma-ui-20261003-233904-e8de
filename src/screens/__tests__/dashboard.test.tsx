import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { DashboardScreen } from '../DashboardScreen';
import { AppProvider } from '../../state/AppStore';
import { RootNavigator } from '../../navigation/RootNavigator';

jest.mock('react-native-safe-area-context', () =>
  require('react-native-safe-area-context/jest/mock').default,
);

async function renderDashboard() {
  const navigate = jest.fn();
  const utils = await render(
    <DashboardScreen
      {...({
        navigation: { navigate },
        route: { key: 'Dashboard', name: 'Dashboard' },
      } as any)}
    />,
  );
  return { navigate, ...utils };
}

describe('Dashboard screen', () => {
  it('renders the four entry tiles', async () => {
    await renderDashboard();

    expect(screen.getByText('Time Management')).toBeTruthy();
    expect(screen.getByText('Money Management')).toBeTruthy();
    expect(screen.getByText('Food Management')).toBeTruthy();
    expect(screen.getByText('App Management')).toBeTruthy();
  });

  it('filters the tiles by their label as the user types and restores them when empty', async () => {
    await renderDashboard();
    const search = screen.getByTestId('dashboard-search');

    await fireEvent.changeText(search, 'money');
    expect(screen.getByText('Money Management')).toBeTruthy();
    expect(screen.queryByText('Time Management')).toBeNull();
    expect(screen.queryByText('Food Management')).toBeNull();

    await fireEvent.changeText(search, '');
    expect(screen.getByText('Time Management')).toBeTruthy();
    expect(screen.getByText('Food Management')).toBeTruthy();
  });

  it('marks the coming-soon tiles disabled and keeps them from navigating', async () => {
    const { navigate } = await renderDashboard();

    expect(screen.getByTestId('tile-FoodManagement-coming-soon')).toBeTruthy();
    expect(screen.getByTestId('tile-AppManagement-coming-soon')).toBeTruthy();
    expect(screen.getByTestId('tile-FoodManagement').props.accessibilityState).toMatchObject({
      disabled: true,
    });

    await fireEvent.press(screen.getByTestId('tile-FoodManagement'));
    await fireEvent.press(screen.getByTestId('tile-AppManagement'));

    expect(navigate).not.toHaveBeenCalled();
  });

  it('renders both coming-soon captions in the shared text-9 uppercase grey style', async () => {
    await renderDashboard();

    const captions = screen.getAllByText('COMING SOON');
    expect(captions).toHaveLength(2);
    for (const caption of captions) {
      expect(caption).toHaveStyle({
        fontSize: 9,
        lineHeight: 11,
        letterSpacing: 1.8,
        textTransform: 'uppercase',
        color: '#A5A5A5',
        textAlign: 'center',
      });
    }
  });

  it('switches to a built screen when its tile is pressed', async () => {
    const { navigate } = await renderDashboard();

    await fireEvent.press(screen.getByTestId('tile-MoneyManagement'));
    expect(navigate).toHaveBeenCalledWith('MoneyManagement');

    await fireEvent.press(screen.getByTestId('tile-TimeManagement'));
    expect(navigate).toHaveBeenCalledWith('TimeManagement');
  });

  it('opens the menu and statistics routes from the header controls', async () => {
    const { navigate } = await renderDashboard();

    await fireEvent.press(screen.getByTestId('dashboard-menu-button'));
    expect(navigate).toHaveBeenCalledWith('DashboardMenu');

    await fireEvent.press(screen.getByTestId('dashboard-stats-button'));
    expect(navigate).toHaveBeenCalledWith('DashboardStats');
  });

  it('switches to Money Management with its tab active through the real navigator', async () => {
    await render(
      <AppProvider>
        <RootNavigator />
      </AppProvider>,
    );

    await fireEvent.press(screen.getByTestId('tile-MoneyManagement'));

    expect(screen.getByTestId('screen-MoneyManagement')).toBeTruthy();
    expect(
      screen.getByTestId('tab-MoneyManagement').props.accessibilityState,
    ).toMatchObject({ selected: true });
  });
});
