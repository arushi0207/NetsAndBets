import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MessageComponent from './MessageComponent';
import { getMessages, saveMessage } from '../services/apiService';

jest.mock('../services/apiService');

describe('MessageComponent', () => {
    const mockMessages = [
        { id: 1, content: 'First message' },
        { id: 2, content: 'Second message' }
    ];

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders the component with title and form elements', () => {
        getMessages.mockResolvedValueOnce([]);
        render(<MessageComponent />);
        
        expect(screen.getByText('Messages')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Enter new message')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Save Message/i })).toBeInTheDocument();
    });

    test('fetches and displays messages on initial load', async () => {
        getMessages.mockResolvedValueOnce(mockMessages);
        
        render(<MessageComponent />);
        
        await waitFor(() => {
            expect(screen.getByText('First message')).toBeInTheDocument();
            expect(screen.getByText('Second message')).toBeInTheDocument();
        });
        
        expect(getMessages).toHaveBeenCalledTimes(1);
    });

    test('updates input value when user types', async () => {
        getMessages.mockResolvedValueOnce([]);
        
        render(<MessageComponent />);
        
        const inputElement = screen.getByPlaceholderText('Enter new message');
        
        await userEvent.type(inputElement, 'New test message');
        
        expect(inputElement).toHaveValue('New test message');
    });

    test('saves message when button is clicked and refreshes the list', async () => {
        getMessages.mockResolvedValueOnce([]);
        saveMessage.mockResolvedValueOnce({ success: true });
        getMessages.mockResolvedValueOnce(mockMessages);
        
        render(<MessageComponent />);
        
        const inputElement = screen.getByPlaceholderText('Enter new message');
        await userEvent.type(inputElement, 'New test message');
        await userEvent.click(screen.getByRole('button', { name: /Save Message/i }));
        
        expect(saveMessage).toHaveBeenCalledWith('New test message');
        
        await waitFor(() => {
            expect(getMessages).toHaveBeenCalledTimes(2);
        });
        
        await waitFor(() => {
            expect(inputElement).toHaveValue('');
        });
    });

    test('handles error when fetching messages fails', async () => {
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        
        getMessages.mockRejectedValueOnce(new Error('API error'));
        
        render(<MessageComponent />);
        
        await waitFor(() => {
            expect(consoleSpy).toHaveBeenCalledWith('Failed to fetch messages', expect.any(Error));
        });
        
        consoleSpy.mockRestore();
    });

    test('handles error when saving message fails', async () => {
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        
        getMessages.mockResolvedValueOnce([]);
        saveMessage.mockRejectedValueOnce(new Error('Save error'));
        
        render(<MessageComponent />);
        
        await userEvent.type(screen.getByPlaceholderText('Enter new message'), 'Test message');
        await userEvent.click(screen.getByRole('button', { name: /Save Message/i }));
        
        await waitFor(() => {
            expect(consoleSpy).toHaveBeenCalledWith('Failed to save message', expect.any(Error));
        });
        
        consoleSpy.mockRestore();
    });
});