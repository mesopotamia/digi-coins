import React from 'react';
import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import {Coin} from './components/Coin';
import Header from './components/Header';
import FiatSymbol from './components/FiatSymbol';

const USD_CURRENCY = "USD";
const CANADA_CURRENCY = "CAD";
const BTC = "BTC";

export default class App extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            btcPrice: null,
            fiatCurrency: CANADA_CURRENCY,
            cryptoCurrency: "ETH",
            coins: null,
            isLoading: true,
            refreshRate: 100000
        };
    }
    componentDidMount() {
        // this.fetchInitialCoins();
        this.fetchMultipleCoins();
        window.setInterval(()=> {
            this.fetchMultipleCoins();
        }, this.state.refreshRate)
    }
    fetchMultipleCoins () {
        const preferredCurrency = this.state.fiatCurrency;
        this.setState({
            isLoading: true
        });
        return fetch(`https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,XRP&tsyms=${preferredCurrency}`)
            .then((response) => response.json())
            .then((responseJSON) => {
                // {"BTC":{"CAD":13843.34},"ETH":{"CAD":1099.59},"XRP":{"CAD":1.27}}
                const coins = Object.keys(responseJSON).map((item) => ({name: item, price: responseJSON[item][preferredCurrency]}));
                this.setState({
                    coins
                });
                window.setTimeout(() => {
                    this.setState({isLoading: false})
                }, 2000);
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
            (<Coin key={name} cryptoSymbol={name} fiatSymbol={preferredCurrency} price={price}/>)
        );
    }

    render() {
        const currency = this.state.fiatCurrency;
        const crypto = this.state.cryptoCurrency;
        const price = this.state.btcPrice;
        const activityIndicator = this.state.isLoading ?  (<View style={styles.activityIndicator}>
                <ActivityIndicator color="#2196F3"/>
            </View>) : null;
        return (
            <View style={styles.container}>
                <View style={styles.banner}>
                    <Text style={styles.logo}>Digi Coins</Text>
                    {activityIndicator}
                    <FiatSymbol symbol={currency}/>
                </View>
                <Header/>
                <View style={styles.coinList}>
                    {this.getListOfCoins()}
                </View>
            </View>
        );
    }
}

const MAIN_SIDE_PADDING = 20;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    banner: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        backgroundColor: '#eee',
        width: '100%',
        height: 80,
        padding: MAIN_SIDE_PADDING
    },
    coinList: {
        flex: 1,
        paddingLeft: MAIN_SIDE_PADDING,
        paddingRight: MAIN_SIDE_PADDING,
        justifyContent: 'space-around'
    },
    logo: {
        color: '#272727',
        fontSize: 16
    }
});
