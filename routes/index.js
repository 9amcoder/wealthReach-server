const express = require('express');

const router = express.Router();
const apiHandler = require('../controller/apiHandler');

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
// router.get('/', (req, res) => {
//   res.render('index', { title: 'Express' });
// });
router.get('/', async (req, res) => {
  try {
    const etcData = await apiHandler.fetchEthereumToUSDollarRate();
    const btcData = await apiHandler.fetchBitcoinToUSDollarRate();
    const currencyData = await apiHandler.fetchCanadianDollarExchangeRate();
    res.render('index', { data: etcData.data, btcData: btcData.data, currencyData: currencyData.rates });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

module.exports = router;
