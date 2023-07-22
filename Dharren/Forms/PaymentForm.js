import React, { useState } from 'react';
import axios from 'axios';

const PaymentForm = () => {
  const [patientId, setPatientId] = useState('');
  const [amountPaid, setAmountPaid] = useState('');
  const [paymentTime, setPaymentTime] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handlePatientIdChange = (event) => {
    setPatientId(event.target.value);
  };

  const handleAmountPaidChange = (event) => {
    setAmountPaid(event.target.value);
  };

  const handlePaymentTimeChange = (event) => {
    setPaymentTime(event.target.value);
  };

  const handlePaymentSubmit = async (event) => {
    event.preventDefault();

    // Validate the form inputs
    if (!patientId || !amountPaid || !paymentTime) {
      setErrorMessage('Please fill in all the required fields');
      return;
    }

    try {
      // Send the payment data to the backend for registration
      const response = await axios.post('/api/payments', {
        patientId,
        amountPaid,
        paymentTime,
      }); // Replace with your API endpoint for registering payments

      // Clear the form inputs and error message
      setPatientId('');
      setAmountPaid('');
      setPaymentTime('');
      setErrorMessage('');

      console.log('Payment registered:', response.data);
      // Show a success message to the user
      alert('Payment registered successfully');
    } catch (error) {
      console.error('Error registering payment:', error);
      setErrorMessage('Failed to register payment. Please try again.');
    }
  };

  return (
    <div>
      <h2>Payment Form</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handlePaymentSubmit}>
        <div>
          <label htmlFor="patientId">Patient ID:</label>
          <input
            id="patientId"
            type="text"
            value={patientId}
            onChange={handlePatientIdChange}
          />
        </div>
        <div>
          <label htmlFor="amountPaid">Amount Paid:</label>
          <input
            id="amountPaid"
            type="text"
            value={amountPaid}
            onChange={handleAmountPaidChange}
          />
        </div>
        <div>
          <label htmlFor="paymentTime">Payment Time:</label>
          <input
            id="paymentTime"
            type="datetime-local"
            value={paymentTime}
            onChange={handlePaymentTimeChange}
          />
        </div>
        <button type="submit">Register Payment</button>
      </form>
      <p>{paymentStatus}</p>
    </div>
  );
};

export default PaymentForm;