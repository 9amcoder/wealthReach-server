require('dotenv').config();
const mongoose = require('mongoose');

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected')) // eslint-disable-line no-console
  .catch((err) => console.log(err)); // eslint-disable-line no-console