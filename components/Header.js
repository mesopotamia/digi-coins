import React from 'react';

import {StyleSheet, Text, View} from 'react-native';
export default Header = () => (
    <View style={styles.header}>
        <Text style={styles.column}></Text>
        <Text style={styles.column}>Holdings</Text>
        <Text style={styles.column}>Price</Text>
        <Text style={styles.column}>Amount</Text>
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
        width: '25%'
    }
});