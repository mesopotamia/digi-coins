import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
export default TotalNetWorth = ({netWorth, currency}) => (
    <View style={styles.netWorth}>
        <Text>Net Worth</Text>
        <Text style={styles.netWorthAmount}>{netWorth}</Text>
    </View>
);

const styles = StyleSheet.create({
    netWorth: {
        padding: 20
    },
    netWorthAmount: {
        fontSize: 20
    }
});