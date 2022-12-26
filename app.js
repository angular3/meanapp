const express = require('express');
const mongoose = require("mongoose");
const passport = require('passport');
const path =  require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan'); //logger
const authRoutes = require('./routes/auth');
const analyticsRoutes = require('./routes/analytics');
const categoryRoutes = require('./routes/category');
const orderRoutes = require('./routes/order');
const positionRoutes = require('./routes/position');
const app = express();
const keys = require('./config/keys')

app.use(morgan('dev'));
app.use(cors());

app.use('/uploads', express.static('uploads'));

mongoose.connect(keys.mongoURI)
    .then(() => console.log('connected'))
    .catch(e => console.log(e))

app.use(passport.initialize());
require('./middleware/passport')(passport);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/position', positionRoutes);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/dist/client'));

    app.get('*', (req, res) => {
        res.sendFile(
            path.resolve(
                __dirname,
                'client',
                'dist',
                'client',
                'index.html'
            )
        )
    });
};
module.exports = app;
