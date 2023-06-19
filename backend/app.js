const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const corsOptions = require('./src/config/corsOptions');
const credentials = require('./src/middleware/credentials');
const { logger } = require('./src/middleware/logEvents');
const errorHandler = require('./src/middleware/errorHandler');
const verifyJWT = require('./src/middleware/verifyJWT');
const ROLES_LIST = require('./src/config/roles_list');
const verifyRoles = require('./src/middleware/verifyRoles');
const app = express();


app.use(logger);
app.use(credentials);
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());


app.use('/', express.static(path.join(__dirname, '/public')));
app.get('/', (req, res) => {res.status(200).send('Hello, World!')});
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


// app.use(errorHandler);
// app.use(verifyJWT);
// // app.use(verifyRoles(ROLES_LIST.Admin));
app.use('/flight', require('./src/routes/api/flight'));
app.use('/user', require('./src/routes/api/users'));


module.exports = app;
