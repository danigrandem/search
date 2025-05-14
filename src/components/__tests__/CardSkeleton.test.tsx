import React from 'react';
import { render } from '@testing-library/react';
import CardSkeleton from '../CardSkeleton';

describe('CardSkeleton', () => {
    it('renders the skeleton structure', () => {
        const { container } = render(<CardSkeleton />);

        // Check main container
        expect(container.querySelector('.card')).toBeInTheDocument();

        // Check image container and image placeholder
        expect(container.querySelector('.imageContainer')).toBeInTheDocument();
        expect(container.querySelector('.image')).toBeInTheDocument();

        // Check content section
        expect(container.querySelector('.content')).toBeInTheDocument();
        expect(container.querySelector('.title')).toBeInTheDocument();

        // Check description lines
        const description = container.querySelector('.description');
        expect(description).toBeInTheDocument();
        expect(description?.querySelectorAll('.line')).toHaveLength(2);
        expect(description?.querySelector('.shortLine')).toBeInTheDocument();
    });

    it('applies correct CSS classes', () => {
        const { container } = render(<CardSkeleton />);

        const card = container.firstChild;
        expect(card).toHaveClass('card');

        const imageContainer = container.querySelector('.imageContainer');
        expect(imageContainer).toHaveClass('imageContainer');

        const content = container.querySelector('.content');
        expect(content).toHaveClass('content');
    });
}); 