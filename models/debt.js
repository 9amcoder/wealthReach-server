const mongoose = require('mongoose');

const debtTypeEnum = {
  creditCard: 'Credit Card',
  studentLoan: 'Student Loan',
  carLoan: 'Car Loan',
  lineOfCredit: 'Line of Credit',
  mortgage: 'Mortgage',
  other: 'Other',
};

const debtSchema = new mongoose.Schema({
  debtId: {
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
  dueDate: {
    type: Date,
    required: true,
  },
  type: {
    type: String,
    enum: Object.values(debtTypeEnum),
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

}, { timestamps: true });

const Debt = mongoose.model('Debt', debtSchema);

module.exports = Debt;
