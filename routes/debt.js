const express = require('express');
// eslint-disable-next-line
const { v4: uuidv4 } = require('uuid');

const router = express.Router();
const Debt = require('../models/debt');

// Get all debts
router.get('/debts', async (req, res) => {
  try {
    const debts = await Debt.find();
    res.json(debts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware function to get a single debt by ID
async function getDebt(req, res, next) {
  try {
    const debt = await Debt.findById(req.params.id);
    if (debt == null) {
      return res.status(404).json({ message: 'Debt not found' });
    }
    res.debt = debt;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  return null;
}

// Get a single debt
router.get('/debts/:id', getDebt, (req, res) => {
  res.json(res.debt);
});

// Create a debt
router.post('/debts', async (req, res) => {
  const debt = new Debt({
    debtId: uuidv4(),
    title: req.body.title,
    amount: req.body.amount,
    dueDate: req.body.dueDate,
    type: req.body.type,
    user: req.body.user,
  });

  try {
    const newDebt = await debt.save();
    res.status(201).json(newDebt);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a debt
router.patch('/debts/:id', getDebt, async (req, res) => {
  if (req.body.debtId != null) {
    res.debt.debtId = req.body.debtId;
  }
  if (req.body.title != null) {
    res.debt.title = req.body.title;
  }
  if (req.body.amount != null) {
    res.debt.amount = req.body.amount;
  }
  if (req.body.dueDate != null) {
    res.debt.dueDate = req.body.dueDate;
  }
  if (req.body.type != null) {
    res.debt.type = req.body.type;
  }

  if (req.body.user != null) {
    res.debt.user = req.body.user;
  }

  try {
    const updatedDebt = await res.debt.save();
    res.json(updatedDebt);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a debt
router.delete('/debts/:id', getDebt, async (req, res) => {
  try {
    await res.debt.remove();
    res.json({ message: 'Debt deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
