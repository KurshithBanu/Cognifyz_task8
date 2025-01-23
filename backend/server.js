const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const logger = require('./middleware/logger');
const apiRoutes = require('./routes/api');

const app = express();
const PORT = 5000;

// using Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(logger);

// Routes handling
app.use('/api', apiRoutes);


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
