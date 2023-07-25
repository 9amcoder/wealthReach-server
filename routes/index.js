const express = require('express');

const router = express.Router();
const apiHandler = require('../controllers/apiHandler');

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
router.get('/', async (req, res) => {
  res.send('Welcome to wealthReach api v1');
});
/**
 * @swagger
 * /crypto:
 *  get:
 *   summary: Get crypto json
 *   description: Get crypto json
 *   responses:
 *      200:
 *        description: Get crypto json
 *
 */
router.get('/crypto', async (req, res) => {
  try {
    const etcData = await apiHandler.fetchEthereumToUSDollarRate();
    const btcData = await apiHandler.fetchBitcoinToUSDollarRate();
    res.json({ etcData: etcData.data, btcData: btcData.data });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

/**
 * @swagger
 * /currency:
 * get:
 *  summary: Get currency json
 *  description: Get currency json
 *  responses:
 *    200:
 *      description: Get currency json
 *  */

router.get('/currency', async (req, res) => {
  try {
    const currencyData = await apiHandler.fetchCanadianDollarExchangeRate();
    res.json({ currencyData: currencyData.rates });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

module.exports = router;
