const express = require('express');
// eslint-disable-next-line
const { v4: uuidv4 } = require('uuid');

const router = express.Router();
const Investment = require('../models/investment');
const Transaction = require('../models/transaction');
const Debt = require('../models/debt');
const Report = require('../models/report');

// Get all reports
router.get('/reports', async (req, res) => {
  try {
    const reports = await Report.find();
    res.json(reports);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware function to get a single report by ID
async function getReport(req, res, next) {
  try {
    const report = await Report.findById(req.params.id);
    if (report == null) {
      return res.status(404).json({ message: 'Report not found' });
    }
    res.report = report;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  return null;
}

// Get a single report
router.get('/reports/:id', getReport, (req, res) => {
  res.json(res.report);
});

// Create a report
router.post('/reports', async (req, res) => {
  const report = new Report({
    reportId: uuidv4(),
    title: req.body.title,
    description: req.body.description,
    user: req.body.user,
  });

  // Populate investmentIds
  const investments = await Investment.find();
  // eslint-disable-next-line
  report.investmentIds = investments.map((investment) => investment._id);

  // Populate transactionIds
  const transactions = await Transaction.find();
  // eslint-disable-next-line
  report.transactionIds = transactions.map((transaction) => transaction._id);

  // Populate debtIds
  const debts = await Debt.find();
  // eslint-disable-next-line
  report.debtIds = debts.map((debt) => debt._id);

  try {
    const newReport = await report.save();
    res.status(201).json(newReport);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a report
router.patch('/reports/:id', getReport, async (req, res) => {
  if (req.body.title != null) {
    res.report.title = req.body.title;
  }
  if (req.body.description != null) {
    res.report.description = req.body.description;
  }

  if (req.body.user != null) {
    res.report.user = req.body.user;
  }

  try {
    const updatedReport = await res.report.save();
    res.json(updatedReport);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a report
router.delete('/reports/:id', getReport, async (req, res) => {
  try {
    await res.report.remove();
    res.json({ message: 'Report deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
