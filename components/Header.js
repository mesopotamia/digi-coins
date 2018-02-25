import React from 'react';

import {StyleSheet, Text, View} from 'react-native';
export default Header = () => (
    <View style={styles.header}>
        <Text style={styles.column}>Coin</Text>
        <Text style={styles.column}>Holdings</Text>
        <Text style={styles.column}>Price</Text>
    </View>
);

const styles = StyleSheet.create({
    header: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#ddd',
        padding: 20
    },
    column: {
        width: '20%'
    }
});