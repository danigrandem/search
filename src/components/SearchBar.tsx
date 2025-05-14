import React from 'react';

interface SearchBarProps {
    value: string;
    onChange: (newValue: string) => void;
    onEnterPress?: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, onEnterPress }) => {
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && onEnterPress) {
            onEnterPress();
        }
    };

    return (
        <div style={styles.container}>
            <input
                type="text"
                style={styles.input}
                placeholder="Search for TV shows..."
                value={value}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
                onKeyPress={handleKeyPress}
            />
        </div>
    );
};

const styles = {
    container: {
        flex: 1,
        minWidth: 0 // This prevents flex item from overflowing
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
