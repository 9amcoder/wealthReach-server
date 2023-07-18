const axios = require('axios');

class APIHandler {
  constructor() {
    if (!APIHandler.instance) {
      APIHandler.instance = this;
    }

    // Initialize axios instances for each base URL
    this.getCryptoData = axios.create({ baseURL: 'https://api.kucoin.com/api/v1/market/' });
    this.getCurrencyExchangeData = axios.create({ baseURL: 'https://api.vatcomply.com/' });

    // eslint-disable-next-line no-constructor-return
    return APIHandler.instance;
  }

  async fetchData(endpoint, instance) {
    try {
      const res = await this[instance].get(endpoint);
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async fetchEthereumToUSDollarRate() {
    return this.fetchData('stats?symbol=ETH-USDC', 'getCryptoData');
  }

  async fetchBitcoinToUSDollarRate() {
    return this.fetchData('stats?symbol=BTC-USDC', 'getCryptoData');
  }

  async fetchCanadianDollarExchangeRate() {
    return this.fetchData('rates?base=CAD', 'getCurrencyExchangeData');
  }
}

const apiHandler = new APIHandler();
Object.freeze(apiHandler);

module.exports = apiHandler;
