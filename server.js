const express = require('express');
const app = express();
const path = require('path');
//setting middleware
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/public/index.html`);
});
const server = app.listen(5000);