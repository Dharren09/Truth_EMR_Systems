const { Appointment, Provider, Service, Patient, Payment } = require('../models');

exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.findAll();
    res.json(appointments);
  } catch (error) {
    console.error('Error retrieving Appointments:', error);
    res.status(500).json({ error: 'No Appointments found' });
  }
};

exports.getAppointmentById = async (req, res) => {
  try {
    const appointmentId = req.params.id;
    const appointment = await Appointment.findByPk(appointmentId);
    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }
    res.json(appointment);
  } catch (error) {
    console.error('Error fetching appointment by ID:', error);
    res.status(500).json({ error: 'Failed to fetch appointment by ID' });
  }
};

exports.createAppointment = async (req, res) => {
  try {
    const { userId } = req; // Get the authenticated user ID (patient's ID)
    const currentDate = new Date();
    const { providerId, serviceId, appointmentDate, additionalInfo } = req.body;
    const appointmentDateObj = new Date(appointmentDate);

    // Check if the appointment date is before the current date
    if (appointmentDateObj < currentDate) {
      return res.status(400).json({ error: 'Invalid appointment date' });
    }

    // Check if the selected provider exists
    const provider = await Provider.findByPk(providerId);
    if (!provider) {
      return res.status(404).json({ error: 'Provider not found' });
    }
    
    // Check if the selected service exists
    const service = await Service.findByPk(serviceId, {
      include: [Provider],
    });
    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }

    // Check if the selected provider is associated with the service
    const providerList = service.dataValues.Providers;
    const isValidProvider = providerList.some(p => {
      console.log("Comparing:", p.dataValues.id, providerId);
      return p.dataValues.id === parseInt(providerId);
    });
    if (!isValidProvider) {
      return res.status(400).json({ error: 'Selected provider is not associated with the service' });
    }

    // Check for the patient in the DB
    const patient = await Patient.findOne({ where: { userId: userId } });
    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    // Create the appointment
    const appointment = await Appointment.create({
      patientId: patient.id,
      providerId,
      serviceId,
      appointmentDate: appointmentDateObj,
      additionalInfo,
    });

    // Retrieve the service price
    const servicePrice = service.price;

    // Store the payment in the database
    const payment = await Payment.create({
      appointmentId: appointment.id,
      amount: servicePrice,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    //Retrieve the names of provider, service and patient
    const servicename = service.serviceName;
    const providerName = provider.name;
    const patientName = patient.name;

    // Return the created appointment with payment details
    res.json({
      appointment: {
        ...appointment.toJSON(),
        servicename,
        providerName,
        patientName,
      },
      payment,
    });
  } catch (error) {
    console.error('Error creating appointment:', error);
    res.status(500).json({ error: 'Failed to create appointment' });
  }
};

exports.updateAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByPk(req.params.id);
    if (appointment) {
      Object.assign(appointment, req.body);
      await appointment.save();
      console.log('Appointment Updated:', appointment.toJSON());
      res.status(200).json(appointment);
    } else {
      throw new Error('Appointment not Found');
    }
  } catch (error) {
    console.error('Error updating Appointment:', error);
    res.status(500).json({ error: 'Failed to update Appointment' });
  }
};

exports.deleteAppointment = async (req, res) => {
  const appointmentId = req.params.id;
  try {
    const appointment = await Appointment.findByPk(appointmentId);
      if (!appointment) {
        return res.status(404).json({Note: 'Appointment not found'});
      }
    await Appointment.destroy({ where: { id: appointmentId } });
    res.status(200).json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    console.error('Deletion Error', error);
    res.status(500).json({ message: 'Failed to delete Appointment' });
  }
};

// Controller function to get appointments associated with the logged-in user (patient or provider)
exports.getMyAppointments = async (req, res) => {
  const { userId } = req; // Get the authenticated user ID
  console.log(userId);

  try {
    // Check if the user is a patient
    const patient = await Patient.findOne({ where: { userId: userId } });
    if (patient) {
      // If the user is a patient, retrieve their appointments
      const appointments = await Appointment.findAll({
        where: { patientId: patient.id },
        include: [{ model: Provider }, { model: Service }],
      });
      return res.json(appointments);
    }

    // If the user is not a patient, check if they are a provider
    const provider = await Provider.findOne({ where: { userId: userId } });
    if (provider) {
      // If the user is a provider, retrieve appointments with their providerId
      const appointments = await Appointment.findAll({
        where: { providerId: provider.id },
        include: [{ model: Patient }, { model: Service }],
      });
      return res.json(appointments);
    }

    // If the user is neither a patient nor a provider, return an empty array
    return res.json([]);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ error: 'Failed to fetch appointments' });
  }
};
