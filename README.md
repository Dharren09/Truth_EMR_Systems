#TruthMD - Electronic Hospital Records Management System Portfolio Project 

Overview
TruthMD is an Electronic Health Records System (EHRs) that has been developed with the primary goal of streamlining and enhancing healthcare service delivery. This comprehensive system offers a secure, convenient, and user-friendly approach to managing health records in an electronic format. By transitioning from traditional paper-based records to electronic ones, TruthMD empowers healthcare providers to provide more efficient and accurate care to their patients.

Problem Statement
The healthcare industry faces inefficiencies due to traditional paper-based record-keeping systems and limited communication between doctors and patients. This leads to data disorganization, privacy concerns, and reduced patient engagement. The problem is to develop TruthMD, an Electronic Health Records System (EHRs), to streamline healthcare services, enhance doctor-patient communication, ensure data security, and offer convenient patient record management with online bookings. The goal is to save time and resources for healthcare providers while improving patient outcomes and overall healthcare service delivery

Solution
The solution is TruthMD, an advanced Electronic Health Records System (EHRs) designed to overcome the challenges faced by the healthcare industry. TruthMD offers a secure and user-friendly platform for storing and accessing health records electronically. The system facilitates seamless communication between doctors and patients, empowering patients to actively engage in their healthcare. With robust data security measures, TruthMD ensures the privacy of patient information and compliance with industry standards. The platform also includes a convenient online booking system, streamlining administrative tasks and saving valuable time and resources for healthcare providers. By implementing TruthMD, healthcare facilities can improve patient care, enhance operational efficiency, and ultimately achieve better healthcare outcomes.

Key Features:
	.	Secure and Convenient Health Record Storage: TruthMD ensures that all health records are securely stored in an electronic database, protected from unauthorized access. This eliminates the risk of physical record loss and ensures data privacy and confidentiality.
	.	Efficient Access to Health Records: With an electronic system, healthcare providers can easily access patient records anytime, anywhere. This quick access to comprehensive patient information enables faster and more informed decision-making, resulting in improved patient care and outcomes.
	.	Enhanced Doctor-Patient Communication: TruthMD facilitates better communication between doctors and patients. Patients can interact with their healthcare providers, discuss concerns, and receive advice through the platform. This improves patient engagement and fosters a stronger doctor-patient relationship.
	.	Convenient Online Bookings: Patients can schedule appointments and manage their bookings online from the comfort of their homes. This feature reduces the administrative burden on healthcare facilities and allows patients to choose suitable time slots for their appointments.
	.	Improved Accuracy and Efficiency: Electronic health records reduce the chances of errors commonly associated with manual data entry. This, in turn, enhances the overall efficiency of healthcare services, as doctors and medical staff can focus more on patient care rather than dealing with paperwork.
	.	Resource and Time Savings: TruthMD saves time and valuable resources for doctors and healthcare providers. By automating various administrative tasks, the system streamlines workflows and allows medical professionals to allocate more time to patient care.
	.	Data Analytics and Insights: The EHR system may offer data analytics tools to healthcare administrators, providing valuable insights into patient trends, treatment outcomes, and operational efficiencies. These insights can inform decision-making and quality improvement initiatives.
	.	Compliance with Standards: TruthMD adheres to industry standards and regulations for electronic health record management. This ensures that the system meets the necessary legal and security requirements, protecting both patients and healthcare providers.

Technologies
The hospital management system will be developed using the following technologies:
Frameworks:
	.	Backend Framework: Express.js
	.	Frontend Framework: React
Relational Database Management System (RDBMS):
	.	MySQL
Object-Relational Mapping (ORM):
	.	Sequelize
Templating Engine:
	.	Embedded JavaScript (EJS)
	.	Handlebars
Languages:
	.	Backend Language: Node.js
	.	Frontend Languages:
                      • HTML
                      • CSS
                      • JavaScript

Project Timeline
* Week 1: Project setup and database design
* Week 1: Front-end development, back-end development, and integration testing
* Week 2: Web app development and user acceptance testing
* Week 2: Bug fixing, performance optimization, and final deployment

Some code snippets

**Express Application**
```javascript
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
....

And for the React Application

```jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'

//pages & components
import Home from './pages/Home'
import Navbar from './components/Navbar'
import LoginForm from './pages/Login'
import SignupForm from './pages/Signup'
import ServicesPage from './pages/Service'


function App() {
  const { auth_user } = useAuthContext()

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={auth_user ? <Home /> : <Navigate to="/login" />} />
            <Route path="/login" element={!auth_user ? <LoginForm /> : <Navigate to="/" />}  />
            <Route path="/signup" element={!auth_user ? <SignupForm /> : <Navigate to="/" />} />
            <Route path="/services" element={<ServicesPage/>} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
...

**Simple instructions** to use the Electronic Hospital Records Management System via the Command Line Interface (CLI):
Installation:
* Make sure you have Node.js and npm (Node Package Manager) installed on your system.
* Clone the repository of the Electronic Hospital Records Management System to your local machine using **git clone**.
Set Up the Backend:
* Open a terminal or command prompt and navigate to the backend directory of the project.
* Run npm install to install the required backend dependencies.
* Configure the MySQL database connection in the .env file.
* Run database migrations and seed data by executing npx sequelize-cli then db:migrate and npx sequelize-cli then db:seed:**all** commands.
Set Up the Frontend:
* Open another terminal or command prompt and navigate to the frontend directory of the project.
* Run npm install to install the required frontend dependencies.
Start the Application:
* In the backend terminal, run npm start to start the backend server.
* In the frontend terminal, run npm start to start the frontend development server.
Access the Application:
* Once both the backend and frontend servers are running, open your web browser and go to http://localhost:3001 to access the application.
Using the Application:
* The application should now be running, and you can start using it to manage electronic hospital records.
* Register as a new user or login if you already have an account.
* Explore the various features of the application, such as patient registration, medical record management, appointment scheduling, billing, and more.
* Use the user-friendly interface to navigate through different sections and perform necessary actions.
Exit the Application:
* To stop the application, go to the terminal or command prompt where the backend and frontend servers are running.
* Press Ctrl + C to stop the servers, and the application will no longer be accessible.

Resources
Other developers with a similar solution;
Healthbridge by (Mubarak and Renish)

**Future insights**
we envision scaling the Electronic Hospital Records Management System, TruthMD, to an industrial level, optimizing its performance for increased efficiency. We plan to incorporate web3 and blockchain technology, enabling blockchain-based transactions and smart contracts for secure and transparent data transfer. By leveraging cryptography, patient information will be safeguarded with utmost privacy and security. Additionally, integration with the metaverse will enhance patient-health worker relations through innovative communication channels. Moreover, we aim to develop an API, that allows seamless integration with existing hospital management systems. Continuously improving the UX/UI design will ensure the system aligns with the future preferences and expectations of both patients and healthcare providers, making TruthMD a cutting-edge solution in the healthcare industry.

In conclusion
TruthMD is a user-friendly Electronic Hospital Records Management System that aims to enhance healthcare services by providing secure storage of health records, improving doctor-patient communication, and offering convenient online appointment bookings. With Express.js and React as the core frameworks, backed by MySQL and Sequelize, the system ensures efficiency and accuracy in managing electronic health records. TruthMD revolutionizes healthcare delivery, saving time and resources while elevating patient outcomes and overall service quality.


