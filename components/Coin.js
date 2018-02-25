import React from 'react';
import PropTypes from 'prop-types';

import {StyleSheet, Text, View} from 'react-native';

export const Coin = ({cryptoSymbol, fiatSymbol, price, numberOfCoins = 0}) => (
    <View style={styles.coin}>
        <Text style={styles.column}>{cryptoSymbol}</Text>
        <Text style={styles.column}>${getHoldings(price, numberOfCoins)}</Text>
        <Text style={styles.column}>${price}</Text>
        <Text style={styles.column}>{numberOfCoins}</Text>
    </View>
);

const getHoldings = (price, number) => {
    console.log('mutiplying ', price, number);
    return Number(price) * Number(number);
};
const styles = StyleSheet.create({
    coin: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingVertical: 10
    },
    column: {
        width: '25%'
    }
});