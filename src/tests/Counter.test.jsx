import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import Counter from '../components/Counter';
import { MainContext, MainProvider } from '../context/MainContext';



const mockSetShowAlert = jest.fn();
const mockSetAlertMessage = jest.fn();

jest.mock('../context/MainContext', () => ({
    ...jest.requireActual('../context/MainContext'),
    useMain: () => ({
        setShowAlert: mockSetShowAlert,
        setAlertMessage: mockSetAlertMessage
    })
}));
    
const renderCounter = () => {
    return render(
        <MainProvider>
            <Counter />
        </MainProvider>
    );
};

beforeEach(() => {
    jest.useFakeTimers();
    mockSetShowAlert.mockClear();
    mockSetAlertMessage.mockClear();
});

afterEach(() => {
    jest.useRealTimers();
});

test('renders initial count of 0', () => {
    renderCounter();
    expect(screen.getByText('Count: 0')).toBeInTheDocument();
});

test('increments count when plus button is clicked', () => {
    renderCounter();
    const incrementButton = screen.getByTestId('increment');
    fireEvent.click(incrementButton);
    expect(screen.getByText('Count: 1')).toBeInTheDocument();
});

test('decrements count when minus button is clicked', () => {
    renderCounter();
    const decrementButton = screen.getByTestId('decrement');
    fireEvent.click(decrementButton);
    expect(screen.getByText('Count: -1')).toBeInTheDocument();
});

test('shows alert when clicked too quickly', () => {
    renderCounter();
    act(() => {
        fireEvent.click(screen.getByTestId('increment'));
        fireEvent.click(screen.getByTestId('increment'));
    });
    expect(mockSetShowAlert).toHaveBeenCalledWith(true);
    expect(mockSetAlertMessage).toHaveBeenCalledWith('Please wait at least 3 seconds between clicks.');
});

test('allows clicking after 3 seconds', () => {
    renderCounter();

    fireEvent.click(screen.getByTestId('increment'));
    expect(screen.getByText('Count: 1')).toBeInTheDocument();

    act(() => {
        jest.advanceTimersByTime(3000);
    });

    fireEvent.click(screen.getByTestId('increment'));
    expect(screen.getByText('Count: 2')).toBeInTheDocument();
});

test('allows clicking minus after 3 seconds', () => {
    renderCounter();

    fireEvent.click(screen.getByTestId('decrement'));
    expect(screen.getByText('Count: -1')).toBeInTheDocument();

    act(() => {
        jest.advanceTimersByTime(3000);
    });

    fireEvent.click(screen.getByTestId('decrement'));
    expect(screen.getByText('Count: -2')).toBeInTheDocument();
});
