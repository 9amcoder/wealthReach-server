const mongoose = require('mongoose');

const investmentTypeEnum = {
  Stock: 'Stock',
  Bonds: 'Bonds',
  Cryptocurrencies: 'Cryptocurrencies',
  MutualFunds: 'Mutual funds',
  ExchangeTradedFunds: 'Exchange-Traded Funds',
  RealEstate: 'Real Estate',
  CertificatesOfDeposit: 'Certificates of Deposit',
  RRSPSavingsAccount: 'RRSP savings account',
  TFSASavingsAccount: 'TFSA savings account',
  FirstTimeHomeBuyersSavingsAccount: 'First time home buyers savings account',
  GoldAndPreciousMetals: 'Gold and precious metals',
  IndexFunds: 'Index Funds',
  Annuities: 'Annuities',
};

const investmentSchema = new mongoose.Schema({
  investmentId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  type: {
    type: String,
    enum: Object.values(investmentTypeEnum),
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

}, { timestamps: true });

const Investment = mongoose.model('Investment', investmentSchema);

module.exports = Investment;
