const express = require('express');

const router = express.Router();
const User = require('../models/user');

// Create a new user
router.post('/users', (req, res) => {
  const newUser = new User({
    userId: req.body.userId,
    name: req.body.name,
    email: req.body.email,
    country: req.body.country,
  });

  newUser.save()
    .then(() => res.send('User created'))
    .catch((err) => res.status(400).send(err));
});

// Get all users
router.get('/users', (req, res) => {
  User.find()
    .then((users) => res.send(users))
    .catch((err) => res.status(400).send(err));
});

// Get a single user by ID
router.get('/users/:id', (req, res) => {
  User.findById(req.params.id)
    .then((user) => res.send(user))
    .catch((err) => res.status(400).send(err));
});

// Update a user by ID
router.put('/users/:id', (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((user) => res.send(user))
    .catch((err) => res.status(400).send(err));
});

// Delete a user by ID
router.delete('/users/:id', (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => res.send('User deleted'))
    .catch((err) => res.status(400).send(err));
});

module.exports = router;
