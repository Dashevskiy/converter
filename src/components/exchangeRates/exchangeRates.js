import React, {Component} from 'react'
import ExchangeRatesService from '../../service/service';

import './exchangeRates.css'

export default class ExchangeRates extends Component {

    service = new ExchangeRatesService()

    state = {
        exchangeRates: []

    }

       componentDidMount() {
            this.service
                .getExchangeRates()
                .then((exchangeRates) => {
                    this.setState({
                        exchangeRates
                    })
                })
        }

    renderItems = (arr) => {
        let classNames = '';

        return arr.map((item) => {

            if (item.favoritesIcon) {
                classNames = 'fa fa-bookmark'
            } else {
                classNames = 'far fa-bookmark';
            }
            return (
                <tr key={item.ccy}>
                    <th>{item.ccy}</th>
                    <td>{item.buy}</td>
                    <td>{item.sale}</td>
                    <td onClick={() => this.onToggleFavorites(item.ccy)}>
                        <i className={classNames}></i></td>
                </tr>
            )
        })
    }

    onToggleFavorites = (id) => {
        this.setState(({exchangeRates}) => {

            const idx = exchangeRates.findIndex((item) => item.ccy === id)

            let newItem = {...exchangeRates[idx], favoritesIcon: true}

            let newArr = [
                newItem,
                ...exchangeRates.slice(0, idx),
                ...exchangeRates.slice(idx + 1)
            ]

            return {
                exchangeRates: newArr
            }
        })

    }

    render() {
        const {exchangeRates} = this.state;

        const Item = this.renderItems(exchangeRates).slice(0,9)

        return (
            <table className="table">
                <thead>
                <tr>
                    <td>Валюта</td>
                    <td>Покупка</td>
                    <td>Продажа</td>
                    <td>Избранное</td>
                </tr>
                </thead>
                <tbody>

                {Item}

                </tbody>
            </table>
        )
    }
}