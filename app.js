const express = require('express');
const app = express();
//const { authenticateToken } = require('./middleware/middleware');
const patientRoute = require('./routes/patients');
const authRoute = require('./routes/auth');
const providerRoute = require('./routes/providers');
const serviceRoute = require('./routes/services');
const appointmentRoute = require('./routes/appointments');
const paymentRoute = require('./routes/payments');

app.use(express.json());

// db connection
const db = require('./models');

//routes
app.use('/patients', patientRoute);
app.use('/user', authRoute);
app.use('/providers', providerRoute);
app.use('/services', serviceRoute);
app.use('/appointments', appointmentRoute);
app.use('/payments', paymentRoute);

db.sequelize.sync({ alter: true }).then(() => {
    console.log('DB connection Successful');

    app.listen(3001, () => {
        console.log('server running on port 3001')
    });
})
.catch((error) => {
    console.error('DB connection failed:', error);
});