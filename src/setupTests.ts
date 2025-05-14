import '@testing-library/jest-dom';

import { TextEncoder, TextDecoder } from 'node:util'

if (!global.TextEncoder) {
    global.TextEncoder = TextEncoder
}

if (!global.TextDecoder) {
    global.TextDecoder = TextDecoder
}

// Mock IntersectionObserver
const mockIntersectionObserver = jest.fn();
mockIntersectionObserver.mockImplementation(() => ({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null
}));
global.IntersectionObserver = mockIntersectionObserver;

process.env.REACT_APP_TMDB_API_KEY = 'test-api-key';
