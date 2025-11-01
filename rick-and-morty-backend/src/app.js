const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const requestLogger = require('./middleware/requestLogger');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(requestLogger);

app.get('/health', (req, res) => res.json({ ok: true }));

module.exports = app;