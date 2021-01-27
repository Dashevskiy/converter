import React, {Component} from 'react'
import './converter.css'
import ExchangeRatesService from "../../service/service";


export default class Converter extends Component {

    service = new ExchangeRatesService()

    state = {
        currencyArr: [],
        baseСurrency: "USD",
        sum: null,
        conversionСurrency: "EUR",
        result: null,
        date: ""
    };

    componentDidMount() {
        this.service.getConverter(this.state.baseСurrency)
            .then((item) => {
                this.setState({
                    currencyArr: Object.keys(item.rates),
                    date: item.date
                })
            })
    }

    onChangeSelect = (e) => {
        this.setState({
                [e.target.name]: e.target.value
            },
            this.conversion
        );
    };

    onChangeInput = (e) => {
        this.setState({
                sum: e.target.value
            },
            this.conversion
        );
    };

    conversion = () => {
        const sum = this.state.sum;
        this.service.getConverter(this.state.baseСurrency)
            .then((item) => {
                const result = (item.rates[this.state.conversionСurrency] * sum).toFixed(4);
                this.setState({result});
            });
    };

    swap = () => {
        const baseСurrency = this.state.baseСurrency;
        const conversionСurrency = this.state.conversionСurrency;
        this.setState({
                conversionСurrency: baseСurrency,
                baseСurrency: conversionСurrency
            },
            this.conversion
        );
    };

    renderOptions = (arr) => {
        return (
            arr.map(currency => (
                <option key={currency} value={currency}>
                    {currency}
                </option>
            ))
        )
    }

    render() {
        const {currencyArr, baseСurrency, sum, conversionСurrency, result, date} = this.state;

        const currency = this.renderOptions(currencyArr)
        const res = sum === 0 ? "0" : result === null ? "Calculating..." : result;

        return (
            <React.Fragment>
                <div className='d-flex justify-content-around'>
                    <h1>Currency Converter</h1>
                    <h1>{date}</h1>
                </div>

                <div className='d-flex justify-content-center'>

                    <div>
                        <span>Меняю</span>
                        <form className='d-flex'>
                            <input type='number' placeholder='0.00' onChange={this.onChangeInput}/>
                            <select name='baseСurrency' value={baseСurrency} onChange={this.onChangeSelect}>
                                {currency}
                            </select>
                        </form>
                    </div>

                    <div className='icon-exchange'>
                        <i onClick={this.swap} className='fa fa-exchange'></i>
                    </div>

                    <div>
                        <span>Покупаю</span>
                        <form className='d-flex'>
                            <input disabled type='number'
                                   value={res}
                                   placeholder='0.00'/>
                            <select name="conversionСurrency" value={conversionСurrency} onChange={this.onChangeSelect}>
                                {currency}
                            </select>
                        </form>
                    </div>

                </div>
            </React.Fragment>
        )
    }
}