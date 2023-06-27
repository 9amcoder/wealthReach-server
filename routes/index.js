const express = require('express');

const router = express.Router();

/**
 * @swagger
 * /:
 *   get:
 *     summary: Get home page
 *     description: Returns home page
 *     responses:
 *       200:
 *        description: Home page
 */
router.get('/', (req, res) => {
  res.render('index', { title: 'Express' });
});

module.exports = router;
