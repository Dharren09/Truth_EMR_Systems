const { Patient } = require('../models');

// Helper function for handling errors
const sendError = (res, status, message) => {
  console.error(message);
  res.status(status).json({ error: message });
};

exports.getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.findAll();
    res.json(patients);
  } catch (error) {
    sendError(res, 500, 'Error retrieving Patients');
  }
};

exports.getPatientById = async (req, res) => {
  const { userId } = req;
  try {
    const patient = await Patient.findOne({ where: { userId: userId}});
    if (!patient) { 
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.json(patient);
  } catch (error) {
    sendError(res, 500, 'Error retrieving Patient');
  }
};

exports.updatePatient = async (req, res) => {
    const { userId } = req;
  try {
    const patient = await Patient.findOne({ where: { userId: userId}});
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    Object.assign(patient, req.body);
    const updatedPatient = await patient.save();
    console.log('Patient Updated:', updatedPatient.toJSON());
    res.status(200).json(updatedPatient);
  } catch (error) {
    sendError(res, 500, 'Error updating Patient');
  }
};

exports.deletePatient = async (req, res) => {
  const patientId = req.params.id;
  try {
    const patient = await Patient.findByPk(patientId);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    await Patient.destroy({ where: { id: patientId } });
    res.status(200).json({ message: 'Patient deleted successfully' });
  } catch (error) {
    sendError(res, 500, 'Failed to delete Patient');
  }
};