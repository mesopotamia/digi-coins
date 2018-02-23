import React from 'react';
import PropTypes from 'prop-types';

import {StyleSheet, Text, View} from 'react-native';

export const Coin = ({cryptoSymbol, fiatSymbol, price}) => (
    <View style={styles.coin}>
        <Text style={styles.column}>{cryptoSymbol}</Text>
        <Text style={styles.column}>{price}</Text>
    </View>
);

const styles = StyleSheet.create({
    coin: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    column: {
        width: '20%'
    }
});