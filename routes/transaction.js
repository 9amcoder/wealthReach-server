const express = require('express');
// eslint-disable-next-line
const { v4: uuidv4 } = require('uuid');

const router = express.Router();
const Transaction = require('../models/transaction');

// Get all transactions
router.get('/transactions', async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware function to get a single transaction by ID
async function getTransaction(req, res, next) {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (transaction == null) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    res.transaction = transaction;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  return null;
}

// Get a single transaction
router.get('/transactions/:id', getTransaction, (req, res) => {
  res.json(res.transaction);
});

// Create a transaction
router.post('/transactions', async (req, res) => {
  const transaction = new Transaction({
    transactionId: uuidv4(),
    title: req.body.title,
    date: req.body.date,
    time: req.body.time,
    amount: req.body.amount,
    type: req.body.type,
    user: req.body.user,
  });

  try {
    const newTransaction = await transaction.save();
    res.status(201).json(newTransaction);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a transaction
router.patch('/transactions/:id', getTransaction, async (req, res) => {
  const allowedUpdates = [
    'title',
    'date',
    'time',
    'amount',
    'type',
  ];
  const updates = Object.keys(req.body);
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    updates.forEach((update) => {
      res.transaction[update] = req.body[update];
    });
    const updatedTransaction = await res.transaction.save();
    res.json(updatedTransaction);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }

  return null;
});

// Delete a transaction
router.delete('/transactions/:id', getTransaction, async (req, res) => {
  try {
    await res.transaction.remove();
    res.json({ message: 'Transaction deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
