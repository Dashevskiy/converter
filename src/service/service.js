export default class ExchangeRatesService {


    _apiBaseForExchangeRates = 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=4';

    _apiBaseForConverter = 'https://api.exchangeratesapi.io/latest?base=';

    async getExchangeRates() {
        const res = await fetch(`${this._apiBaseForExchangeRates}`);
        return await res.json();
    }

    async getConverter(url) {
        const res = await fetch(`${this._apiBaseForConverter}${url}`);
        return await res.json();
    }


}