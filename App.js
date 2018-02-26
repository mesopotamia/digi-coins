import React from 'react';
import {StyleSheet, Text, View, ActivityIndicator, ScrollView, RefreshControl} from 'react-native';
import {Coin} from './components/Coin';
import Header from './components/Header';
import FiatSymbol from './components/FiatSymbol';
import TotalNetWorth from './components/TotalNetWorth';
import {getNetworth} from "./Util/common";

const USD_CURRENCY = "USD";
const CANADA_CURRENCY = "CAD";
const BTC = "BTC";

const profile = {
    BTC: 100,
    ETH: 200,
    XRP: 100000
};

export default class App extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            btcPrice: null,
            fiatCurrency: CANADA_CURRENCY,
            cryptoCurrency: "ETH",
            coins: null,
            isLoading: true,
            refreshRate: null,
            netWorth: null
        };
    }
    componentDidMount() {
        // this.fetchInitialCoins();
        this.fetchMultipleCoins();
        if (this.state.refreshRate) {
            window.setInterval(()=> {
                this.fetchMultipleCoins();
            }, this.state.refreshRate)
        }
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
                const netWorth = getNetworth(coins, profile);
                window.setTimeout(() => {
                    this.setState({
                        isLoading: false,
                        coins,
                        netWorth
                    })
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
            (<Coin key={name} cryptoSymbol={name} fiatSymbol={preferredCurrency} price={price} numberOfCoins={profile[name]}/>)
        );
    }
    _onRefresh () {
        this.fetchMultipleCoins();
    }

    render() {
        const currency = this.state.fiatCurrency;
        const crypto = this.state.cryptoCurrency;
        const price = this.state.btcPrice;
        return (
            <View style={styles.container}>
                <View style={styles.banner}>
                    <Text style={styles.logo}>Digi Coins</Text>
                    <FiatSymbol symbol={currency}/>
                </View>
                <Header/>
                <TotalNetWorth netWorth={this.state.netWorth}/>
                <ScrollView contentContainerStyle={styles.coinList}
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.state.isLoading}
                                    onRefresh={this._onRefresh.bind(this)}
                                />
                            }
                >
                    {this.getListOfCoins()}
                </ScrollView>
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
        paddingHorizontal: MAIN_SIDE_PADDING
    },
    logo: {
        color: '#272727',
        fontSize: 16
    }
});
