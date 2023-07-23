const express = require('express');
const app = express();
const path = require('path');

const patientRoute = require('./routes/patients');
const authRoute = require('./routes/auth');
const providerRoute = require('./routes/providers');
const serviceRoute = require('./routes/services');
const appointmentRoute = require('./routes/appointments');
const paymentRoute = require('./routes/payments');
const userRoute = require('./routes/users');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// db connection
const db = require('./models');

//set views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//routes
app.get('/', (req, res) => {
    res.render('auth');
});

app.use('/patients', patientRoute);
app.use('/user', authRoute);
app.use('/providers', providerRoute);
app.use('/services', serviceRoute);
app.use('/appointments', appointmentRoute);
app.use('/payments', paymentRoute);
app.use('/users', userRoute);

db.sequelize.sync({ alter: true }).then(() => {
    console.log('DB connection Successful');

    app.listen(3001, () => {
        console.log('server running on port 3001')
    });
})
.catch((error) => {
    console.error('DB connection failed:', error);
});