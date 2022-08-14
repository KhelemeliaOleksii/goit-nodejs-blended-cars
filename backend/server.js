const express = require('express');
const connectDB = require('../config/db');

require('colors');
require('../config/setEnvVars');

const { PORT } = process.env;

const app = express();
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

app.use('/api/v1', require('./routes/carsRoutes'));
app.use('/', require('./routes/usersRoutes'));
// connectDB();
(async () => { await connectDB() })();

app.use('*', (req, res, _) => {
    res.status(404).json({
        message: "Not Found"
    });
})
app.use(require('./middlewares/errorHandler'));

app.listen(PORT, () => {
    console.log(`Serer is running on port ${PORT}`.cyan.italic.underline);
})

