const express = require('express');
// eslint-disable-next-line
const { v4: uuidv4 } = require('uuid');

const router = express.Router();
const Investment = require('../models/investment');

// Get all investments
router.get('/investments', async (req, res) => {
  try {
    const investments = await Investment.find();
    res.json(investments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware function to get a single transaction by ID
async function getInvestment(req, res, next) {
  try {
    const investment = await Investment.findById(req.params.id);
    if (!investment) {
      return res.status(404).json({ message: 'Investment not found' });
    }
    res.investment = investment;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  return null;
}

// Get a single investment
router.get('/investments/:id', getInvestment, (req, res) => {
  res.json(res.investment);
});

// Create an investment
router.post('/investments', async (req, res) => {
  const investment = new Investment({
    investmentId: uuidv4(),
    title: req.body.title,
    amount: req.body.amount,
    date: req.body.date,
    type: req.body.type,
    user: req.body.user,
  });

  try {
    const newInvestment = await investment.save();
    res.status(201).json(newInvestment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update an investment
router.patch('/investments/:id', getInvestment, async (req, res) => {
  const allowedUpdates = ['investmentId', 'title', 'amount', 'date', 'type'];
  const updates = Object.keys(req.body);
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  if (updates.length === 0) {
    return res.status(400).send({ error: 'No updates provided!' });
  }

  try {
    updates.forEach((update) => {
      res.investment[update] = req.body[update];
    });
    const updatedInvestment = await res.investment.save();
    return res.json(updatedInvestment);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

// Delete an investment
router.delete('/investments/:id', getInvestment, async (req, res) => {
  try {
    await Investment.deleteOne({ _id: req.params.id });
    res.json({ message: 'Investment deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
