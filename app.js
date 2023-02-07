const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
var cors = require('cors');
const app = express();
const morgan = require('morgan');
const port = process.env.port || 5000;
const sequelize = require('./config/database');
const path = require('path');
app.use(bodyParser.json())
app.use(express.static('public'));
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    res.status(status).json({ message: message });

});
require('./router')(app);
app.get('/', (req, res) => {
    res.json({ message: " Welcome to Construction System ..." })
})

sequelize
    .sync()
    // .sync({ focus: true })
    .then((result) => {
        app.listen(port, () => {
            console.log(`[express] Server App running on port ${port}.`)
        })
    })
    .catch(err => { console.log(err); })