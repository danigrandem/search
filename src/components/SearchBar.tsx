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
                placeholder="Search..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
};

const styles = {
    container: { margin: '10px' },
    input: { borderWidth: '1px', padding: '8px', borderStyle: 'solid' },
};

export default SearchBar;
