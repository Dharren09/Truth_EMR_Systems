const express = require('express');
const app = express();
const patientRoute = require('./routes/patients');
const authRoute = require('./routes/auth');

app.use(express.json());

// db connection
const db = require('./models');

//routes
app.use('/patients', patientRoute);
app.use('/auth', authRoute);

db.sequelize.sync({ alter: true }).then(() => {
    console.log('DB connection Successful');

    app.listen(3001, () => {
        console.log('server running on port 3001')
    });
})
.catch((error) => {
    console.error('DB connection failed:', error);
});