'use strict';

const express       = require('express');
const bodyParser    = require('body-parser');
const helmet 	    = require('helmet');
const cors          = require('cors');
const consign       = require('consign');

const app = express();

app.use(cors());
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

consign()
    .include('src/controllers')
    .into(app);

module.exports = app;
