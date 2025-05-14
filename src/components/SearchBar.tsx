import React from 'react';

interface SearchBarProps {
    value: string;
    onChange: (newValue: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
    return (
        <div style={styles.container}>
            <input
                type="text"
                style={styles.input}
                placeholder="Search for TV shows..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
};

const styles = {
    container: {
        margin: '0 auto',
        maxWidth: '500px',
        width: '100%'
    },
    input: {
        width: '100%',
        padding: '12px 16px',
        fontSize: '16px',
        border: '2px solid #e2e8f0',
        borderRadius: '8px',
        backgroundColor: 'white',
        transition: 'border-color 0.2s ease',
        outline: 'none'
    }
};

export default SearchBar;
