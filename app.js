const express = require('express');
const app = express();

const os = require('os');

app.get('/', (req, res) => {
    const { pid } = process;
    res.json({ process: { pid } })
})

module.exports = app;
