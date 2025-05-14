import React from 'react';

interface SearchBarProps {
    value: string;
    onChange: (newValue: string) => void;
    loading?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, loading = false }) => {
    return (
        <div style={styles.container}>
            <input
                type="text"
                style={styles.input}
                placeholder="Start typing to search..."
                value={value}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
            />
            {loading && (
                <div style={styles.loadingIndicator} role="status">
                    <div style={styles.spinner} />
                </div>
            )}
        </div>
    );
};

const styles = {
    container: {
        position: 'relative' as const,
        width: '100%'
    },
    input: {
        width: '100%',
        padding: '12px 16px',
        paddingRight: '40px',
        fontSize: '16px',
        border: '2px solid #e2e8f0',
        borderRadius: '8px',
        backgroundColor: 'white',
        transition: 'all 0.2s ease',
        outline: 'none'
    },
    loadingIndicator: {
        position: 'absolute' as const,
        right: '12px',
        top: '50%',
        transform: 'translateY(-50%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    spinner: {
        width: '20px',
        height: '20px',
        border: '2px solid #e2e8f0',
        borderTop: '2px solid #2563eb',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
    }
};

export default SearchBar;
