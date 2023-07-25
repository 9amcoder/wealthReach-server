const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  reportId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  transactionIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Transaction',
  }],
  investmentIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Investment',
  }],
  debtIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Debt',
  }],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

}, { timestamps: true });

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;
