import React from 'react';
import { render, screen, } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBar from '../SearchBar';

describe('SearchBar', () => {
    const mockOnChange = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders correctly', () => {
        render(<SearchBar value="" onChange={mockOnChange} />);
        expect(screen.getByPlaceholderText(/start typing to search/i)).toBeInTheDocument();
    });

    it('handles empty input correctly', async () => {
        render(<SearchBar value="" onChange={mockOnChange} />);
        const input = screen.getByPlaceholderText(/start typing to search/i);

        await userEvent.type(input, ' ');
        expect(mockOnChange).toHaveBeenCalledWith(' ');
    });

    it('displays loading indicator when loading prop is true', () => {
        render(<SearchBar value="" onChange={mockOnChange} loading={true} />);
        expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('does not display loading indicator when loading prop is false', () => {
        render(<SearchBar value="" onChange={mockOnChange} loading={false} />);
        expect(screen.queryByRole('status')).not.toBeInTheDocument();
    });

    it('reflects the value prop in the input', () => {
        render(<SearchBar value="test value" onChange={mockOnChange} />);
        expect(screen.getByPlaceholderText(/start typing to search/i)).toHaveValue('test value');
    });
});
