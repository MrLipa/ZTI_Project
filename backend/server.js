const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const corsOptions = require('./src/config/corsOptions');
const credentials = require('./src/middleware/credentials');
const { logger } = require('./src/middleware/logEvents');
const errorHandler = require('./src/middleware/errorHandler');
const verifyJWT = require('./src/middleware/verifyJWT');
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const app = express();


app.use(logger);
app.use(credentials);
// app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());


app.use('/', express.static(path.join(__dirname, '/public')));
app.use('/register', require('./src/routes/register'));
app.use('/login', require('./src/routes/login'));
app.use('/refresh', require('./src/routes/refresh'));
app.use('/logout', require('./src/routes/logout'));


if (process.env.NODE_ENV === 'build') {
    app.use(express.static(path.join(__dirname, 'client/build')));
    app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}


app.use(errorHandler);
app.use(verifyJWT);
app.use('/flight', require('./src/routes/flight'));
app.use('/user', require('./src/routes/user'));



app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
