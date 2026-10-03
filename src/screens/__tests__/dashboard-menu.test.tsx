import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DashboardMenuScreen } from '../DashboardMenuScreen';
import type { RootStackParamList } from '../../navigation/types';

jest.mock('react-native-safe-area-context', () =>
  require('react-native-safe-area-context/jest/mock').default,
);

type MenuNavigation = NativeStackNavigationProp<RootStackParamList, 'DashboardMenu'>;

async function renderMenu() {
  const navigation = {
    navigate: jest.fn(),
    goBack: jest.fn(),
  } as unknown as MenuNavigation;

  await render(
    <DashboardMenuScreen
      navigation={navigation}
      route={{ key: 'DashboardMenu-test', name: 'DashboardMenu' }}
    />,
  );

  return navigation;
}

describe('DashboardMenu screen', () => {
  it('renders the profile block and every menu entry', async () => {
    await renderMenu();

    expect(screen.getByTestId('screen-DashboardMenu')).toBeTruthy();

    expect(screen.getByText('Sophie Garnier')).toBeTruthy();
    expect(screen.getByText('Luxembourg')).toBeTruthy();

    expect(screen.getByText('Statistics')).toBeTruthy();
    expect(screen.getByText('Account Settings')).toBeTruthy();
    expect(screen.getByText('Help')).toBeTruthy();
    expect(screen.getByText('Logout')).toBeTruthy();
  });

  it('navigates to the Dashboard Statistics route when Statistics is pressed', async () => {
    const navigation = await renderMenu();

    expect(
      screen.getByTestId('menu-entry-Statistics').props.accessibilityState,
    ).toMatchObject({ disabled: false });

    await fireEvent.press(screen.getByTestId('menu-entry-Statistics'));

    expect(navigation.navigate).toHaveBeenCalledWith('DashboardStats');
  });

  it('returns to the previous screen when the back control is pressed', async () => {
    const navigation = await renderMenu();

    await fireEvent.press(screen.getByTestId('menu-back'));

    expect(navigation.goBack).toHaveBeenCalledTimes(1);
  });

  it('renders Help, Account Settings and Logout disabled and inert with a coming soon marker', async () => {
    const navigation = await renderMenu();

    for (const key of ['Help', 'AccountSettings', 'Logout']) {
      expect(screen.getByTestId(`menu-entry-${key}`).props.accessibilityState).toMatchObject(
        { disabled: true },
      );
    }

    expect(screen.getAllByText('coming soon')).toHaveLength(3);

    await fireEvent.press(screen.getByTestId('menu-entry-Help'));
    await fireEvent.press(screen.getByTestId('menu-entry-AccountSettings'));
    await fireEvent.press(screen.getByTestId('menu-entry-Logout'));

    expect(navigation.navigate).not.toHaveBeenCalled();
    expect(navigation.goBack).not.toHaveBeenCalled();
  });
});
