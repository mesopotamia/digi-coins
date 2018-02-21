import React from 'react';
import PropTypes from 'prop-types';

import {StyleSheet, Text, View} from 'react-native';

export const Coin = ({cryptoSymbol, fiatSymbol, price}) => (
    <View>
        <Text>{cryptoSymbol} {price}</Text>
        <Text>Price is shown in {fiatSymbol}</Text>
    </View>
);

