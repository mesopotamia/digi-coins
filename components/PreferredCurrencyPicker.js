import React from 'react';
import {Text, View, Picker, TouchableHighlight, StyleSheet, Dimensions} from 'react-native';
import currencyMap from 'currency-symbol-map/map';

const WINDOW_HEIGHT = Dimensions.get('window').height;
const WINDOW_WIDTH = Dimensions.get('window').width;

export default class PreferredCurrencyPicker extends React.Component {
    constructor({currencyHandler, fiatCurrency}) {
        super(...arguments);
    }

    render() {
        return (
            <View style={styles.picker}>
                <Picker
                    selectedValue={this.props.fiatCurrency}
                    onValueChange={(itemValue, itemIndex) => this.props.currencyHandler(itemValue)}>
                    {this.getItems()}
                </Picker>
            </View>
        )
    }
    selectCurrency () {
        this.setState({
            isEditMode: true
        });
        console.log('clicking');
    }
    getItems = () => {
        return Object.keys(currencyMap).map((symbol) => (
            <Picker.Item key={symbol} label={symbol} value={symbol}/>
        ))
    };
}

const styles = StyleSheet.create({
    picker: {
        position: 'absolute',
        left: 0,
        top: 0,
        backgroundColor: '#fff',
        height: WINDOW_HEIGHT,
        width: WINDOW_WIDTH
    }
});