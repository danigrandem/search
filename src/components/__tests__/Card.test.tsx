import React from 'react';
import { render, screen } from '@testing-library/react';
import Card from '../Card';
import { Show } from '../../types/apiTypes';
import { MemoryRouter } from 'react-router';

const mockShow: Show = {
    id: 1,
    original_title: 'Test Movie',
    backdrop_path: '/test-path.jpg',
    genre_ids: [1],
    vote_average: 8.5,
    overview: 'Test overview',
    release_date: '2023-01-01',
    poster_path: '/test-poster.jpg',
    adult: false,
    original_language: 'en',
    popularity: 100,
    title: 'Test Movie',
    video: false,
    vote_count: 100,
    genres: [
        { id: 1, name: 'Action' },
        { id: 2, name: 'Drama' },
        { id: 3, name: 'Comedy' }
    ]
};

describe('Card', () => {
    it('renders the movie title', () => {
        render(<MemoryRouter><Card show={mockShow} /></MemoryRouter>);
        expect(screen.getByText('Test Movie')).toBeInTheDocument();
    });

    it('renders the movie image with correct src', () => {
        render(<MemoryRouter><Card show={mockShow} /></MemoryRouter>);
        const image = screen.getByAltText('Test Movie') as HTMLImageElement;
        expect(image.src).toContain('https://image.tmdb.org/t/p/w220_and_h330_face/test-path.jpg');
    });

    it('renders genre names', () => {
        render(<MemoryRouter><Card show={mockShow} /></MemoryRouter>);
        expect(screen.getByText('Action')).toBeInTheDocument();
    });

    it('renders rating', () => {
        render(<MemoryRouter><Card show={mockShow} /></MemoryRouter>);
        expect(screen.getByText('8.5/10')).toBeInTheDocument();
    });

    it('renders "No rating" when vote_average is 0', () => {
        const showWithNoRating: Show = {
            ...mockShow,
            vote_average: 0
        };
        render(<MemoryRouter><Card show={showWithNoRating} /></MemoryRouter>);
        expect(screen.getByText('No rating')).toBeInTheDocument();
    });

    it('creates a link to the show detail page', () => {
        render(<MemoryRouter><Card show={mockShow} /></MemoryRouter>);
        const link = screen.getByTestId('link');
        expect(link).toHaveAttribute('href', '/show/1');
    });

    it('handles missing backdrop_path', () => {
        const showWithoutImage: Show = {
            ...mockShow,
            backdrop_path: ''
        };
        render(<MemoryRouter><Card show={showWithoutImage} /></MemoryRouter>);
        expect(screen.queryByRole('img')).not.toBeInTheDocument();
    });
}); 