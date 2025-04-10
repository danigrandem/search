import React from 'react';
import { TextInput, StyleSheet, View } from 'react-native';

const SearchBar = () => {
    return (
        <View style={styles.container}>
        <TextInput style={styles.input} placeholder="Search..." />
        </View>
);
};

const styles = StyleSheet.create({
    container: { margin: 10 },
    input: { borderWidth: 1, padding: 8 },
});

export default SearchBar;
