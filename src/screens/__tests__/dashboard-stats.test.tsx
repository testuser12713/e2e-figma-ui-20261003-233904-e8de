import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';
import {
  DashboardStatsScreen,
  type DashboardStatsScreenProps,
} from '../DashboardStatsScreen';

jest.mock('react-native-safe-area-context', () =>
  require('react-native-safe-area-context/jest/mock').default,
);

const goBack = jest.fn();

function renderScreen() {
  const props = { navigation: { goBack } } as unknown as DashboardStatsScreenProps;
  return render(<DashboardStatsScreen {...props} />);
}

describe('Dashboard Stats screen', () => {
  beforeEach(() => {
    goBack.mockClear();
  });

  it('renders the frame labels, the figure and the 60 value', async () => {
    await renderScreen();

    expect(screen.getByText('Statistics')).toBeTruthy();
    expect(screen.getByText('Since 21. Dec')).toBeTruthy();
    expect(screen.getByText('Dec 2024 - Jan 2024')).toBeTruthy();

    expect(screen.getByTestId('stats-figure')).toBeTruthy();
    expect(screen.getByText('20')).toBeTruthy();
    expect(screen.getByText('DAYS')).toBeTruthy();

    expect(screen.getByText('60')).toBeTruthy();
  });

  it('renders the month labels and the chart data points', async () => {
    await renderScreen();

    expect(screen.getAllByTestId(/^chart-month-/)).toHaveLength(11);
    expect(screen.getByTestId('chart-month-0')).toHaveTextContent('M');

    expect(screen.getAllByTestId(/^chart-point-/)).toHaveLength(10);
  });

  it('returns to the previous screen when the back control is pressed', async () => {
    await renderScreen();

    await fireEvent.press(screen.getByTestId('stats-back-button'));

    expect(goBack).toHaveBeenCalledTimes(1);
  });
});
