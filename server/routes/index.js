const express = require('express');
const app = express();

app.use(require('./RegisterSedalib/index'));
app.use(require('./FilterSedalib/index'));
app.use(require('./GrillaFilterSedalib/index'));
module.exports = app;