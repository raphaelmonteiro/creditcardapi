require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())

app.use(express.json());

require('./routes')(app);

module.exports = app;