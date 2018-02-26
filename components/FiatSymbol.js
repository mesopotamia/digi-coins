import React from 'react';

import {StyleSheet, Text, View, TouchableHighlight} from 'react-native';
export default FiatSymbol = ({symbol, clickHandler}) => (
    <View>
        <TouchableHighlight onPress={clickHandler}>
            <Text>{symbol}</Text>
        </TouchableHighlight>
    </View>
);

const styles = StyleSheet.create({
});