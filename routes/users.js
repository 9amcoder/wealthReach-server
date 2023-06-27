const express = require('express');

const router = express.Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get a list of users
 *     description: Returns a list of users
 *     responses:
 *       200:
 *         description: A list of users
 */
//  TODO: Add a route to get a list of users
router.get('/users', (req, res) => {
  res.send('respond with a resource');
});

module.exports = router;
