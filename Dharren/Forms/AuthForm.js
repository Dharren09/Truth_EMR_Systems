
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

//import './AuthForm.css';

const AuthForm = () => {
  const [activeForm, setActiveForm] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [dob, setDob] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');

  const toggleForm = (form) => {
    setActiveForm(form);
  };

  const handleLoginSubmit = (event) => {
    event.preventDefault();

    // Perform login submission logic
    if (!email || !password) {
      setError('All fields must be specified');
      return;
    }

    // Call login API or perform other login actions
    console.log('Login form submitted');
    console.log('Email:', email);
    console.log('Password:', password);
  };

  const handleSignupSubmit = (event) => {
    event.preventDefault();

    // Perform signup submission logic
    if (!name || !username || !email || !password || !gender || !address || !dob || !role) {
      setError('All fields must be specified');
      return;
    }

    // Call signup API or perform other signup actions
    console.log('Signup form submitted');
    console.log('Name:', name);
    console.log('Username:', username);
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Gender:', gender);
    console.log('Address:', address);
    console.log('Date of Birth:', dob);
    console.log('Role:', role);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded shadow-md">
        <div className="flex justify-center mb-4">
          <a
            id="loginLink"
            className={`mr-4 ${
              activeForm === 'login' ? 'underline-clicked' : 'underline'
            }`}
            onClick={() => toggleForm('login')}
          >
            Login
          </a>
          <a
            id="signupLink"
            className={`${
              activeForm === 'signup' ? 'underline-clicked' : 'underline'
            }`}
            onClick={() => toggleForm('signup')}
          >
            Signup
          </a>
        </div>
        {activeForm === 'login' && (
          <div id="loginForm" className="mb-8">
            <h2 className="text-lg text-center font-bold mb-4">Login</h2>
            <form onSubmit={handleLoginSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                  Password
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {error && <p className="text-red-500 mb-4">{error}</p>}
              <div className="flex items-center justify-between">
                <button
                  className="bg-blue-500 hover:bg-white hover:text-green-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Login
                </button>
                <Link
                  to="/forgot-password"
                  className="inline-block align-baseline font-bold text-sm text-blue-500 hover:bg-white hover:text-green-300 underline"
                >
                  Forgot Password?
                </Link>
              </div>
            </form>
          </div>
        )}
        {activeForm === 'signup' && (
          <div id="signupForm" className="hidden">
            <h2 className="text-lg text-center font-bold mb-4">Signup</h2>
            <form onSubmit={handleSignupSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                  Name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-2">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                  Username
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="text"
                  placeholder="Choose a Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  placeholder="Enter a valid email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                  Create Password
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="mb-5">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
                  Confirm Password
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="confirmPassword"
                  type="password"
                  placeholder="Enter your password"
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gender">
                  Gender
                </label>
                <select
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="">Select a gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="not-specified">Prefer not to say</option>
                </select>
              </div>
              <div className="mb-7">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
                  Address
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="address"
                  type="text"
                  placeholder="Enter your address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className="mb-8">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dob">
                  Date of Birth
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="dob"
                  type="date"
                  name="dob"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                />
              </div>
              <div className="mb-9">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role">
                  Role
                </label>
                <select
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="">Select a role</option>
                  <optgroup label="Patient">
                    <option value="patient">Patient</option>
                  </optgroup>
                  <optgroup label="Health Worker">
                    <option value="nurse">Nurse</option>
                    <option value="midwife">Midwife</option>
                    <option value="doctor">Doctor</option>
                    <option value="lab technician">Lab Technician</option>
                    <option value="dentist">Dentist</option>
                    <option value="radiographer">Radiographer</option>
                  </optgroup>
                  <optgroup label="Service Provider">
                    <option value="hospital">Hospital</option>
                    <option value="clinic">Clinic</option>
                    <option value="insurance company">Insurance Company</option>
                  </optgroup>
                  <optgroup label="Sales Point">
                    <option value="receptionist">Receptionist</option>
                    <option value="insurance officer">Insurance Officer</option>
                    <option value="billing officer">Billing Officer</option>
                  </optgroup>
                </select>
              </div>
              {error && <p className="text-red-500 mb-4">{error}</p>}
              <div className="flex items-center justify-between">
                <button
                  className="bg-green-500 hover:bg-white hover:text-green-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthForm;