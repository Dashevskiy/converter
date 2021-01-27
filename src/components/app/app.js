import React, {Component} from 'react'
import Header from "../header/header";
import Converter from "../converter/converter";
import ExchangeRates from "../exchangeRates/exchangeRates";
import {BrowserRouter as Router, Route} from 'react-router-dom'
import HomePage from "../homePage/homePage";


export default class App extends Component {

    render() {

        return (

            <Router>
                <Header/>
                <Route path='/' component={HomePage} exact/>
                <Route path='/converter' component={Converter}/>
                <Route path='/exchangeRates' component={ExchangeRates}/>
            </Router>

        )
    }
}