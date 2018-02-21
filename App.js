import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Coin} from './components/Coin';

const USD_CURRENCY = "USD";
const BTC = "BTC";

export default class App extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            btcPrice: null,
            fiatCurrency: USD_CURRENCY,
            cryptoCurrency: "ETH",
            coins: null
        };
    }
    componentDidMount() {
        // this.fetchInitialCoins();
        this.fetchMultipleCoins();
    }
    fetchInitialCoins () {
        const currency = this.state.fiatCurrency;
        const crypto = this.state.cryptoCurrency;
        return fetch(`https://min-api.cryptocompare.com/data/price?fsym=${crypto}&tsyms=${currency}`)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({btcPrice: responseJson[this.state.fiatCurrency]});
            })
            .catch((error) => {
                console.error(error);
            });
    }
    fetchMultipleCoins () {
        const preferredCurrency = this.state.fiatCurrency;
        return fetch(`https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,XRP&tsyms=${preferredCurrency}`)
            .then((response) => response.json())
            .then((responseJSON) => {
                // {"BTC":{"CAD":13843.34},"ETH":{"CAD":1099.59},"XRP":{"CAD":1.27}}
                const coins = Object.keys(responseJSON).map((item) => ({name: item, price: responseJSON[item][preferredCurrency]}));
                this.setState({
                    coins
                });
                console.log('got coins', coins);
            })
            .catch((error) => {
                console.log('something went wrong', error);
            })
    }
    getListOfCoins () {
        const coins = this.state.coins;
        if (!coins) {
            return null;
        }
        const preferredCurrency = this.state.fiatCurrency;
        return coins.map(({name, price}) =>
            (<Coin cryptoSymbol={name} fiatSymbol={preferredCurrency} price={price}/>)
        );
    }

    render() {
        const currency = this.state.fiatCurrency;
        const crypto = this.state.cryptoCurrency;
        const price = this.state.btcPrice;
        return (
            <View style={styles.container}>
                {this.getListOfCoins()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
