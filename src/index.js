const express = require('express')
const dotenv = require('dotenv');
const cors = require('cors');

const Logger = require('./helpers/logger');
const auth = require('./routes/AuthRoutes');
const product = require('./routes/ProductRoutes');
const upload = require('./routes/UploadRoutes');

const app = express()
const port = 9000

dotenv.config()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/auth', auth);
app.use('/products', product);
app.use('/upload', upload);

app.listen(port, () => {
  Logger.log(['Info'], `Server started on port ${port}`);
})