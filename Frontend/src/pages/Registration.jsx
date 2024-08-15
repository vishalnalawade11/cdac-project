import React, { useState } from 'react';
import axios from 'axios';
import './pageCSS/register.css'; // Ensure this path is correct
import { MdAppRegistration } from "react-icons/md";

const Registration = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contactNumber: '',
    role: '',
    aadharNumber: '',
    password: '',
    address: {
      city: '',
      pincode: '',
      state: ''
    }
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in formData.address) {
      setFormData({
        ...formData,
        address: {
          ...formData.address,
          [name]: value
        }
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validateForm = () => {
    let formErrors = {};
    if (!formData.name.trim()) formErrors.name = "Name is required";
    if (!formData.email) formErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) formErrors.email = "Email is invalid";
    if (!formData.contactNumber) formErrors.contactNumber = "Contact number is required";
    else if (!/^\d{10}$/.test(formData.contactNumber)) formErrors.contactNumber = "Contact number must be exactly 10 digits";
    if (!formData.role) formErrors.role = "Role is required";
    if (!formData.aadharNumber) formErrors.aadharNumber = "Aadhar number is required";
    else if (!/^\d{12}$/.test(formData.aadharNumber)) formErrors.aadharNumber = "Aadhar number must be exactly 12 digits";
    if (!formData.password) formErrors.password = "Password is required";
    else if (formData.password.length < 6) formErrors.password = "Password must be at least 6 characters long";
    if (!formData.address.city.trim()) formErrors.city = "City is required";
    if (!formData.address.pincode) formErrors.pincode = "Pincode is required";
    else if (!/^\d{6}$/.test(formData.address.pincode)) formErrors.pincode = "Pincode must be exactly 6 digits";
    if (!formData.address.state.trim()) formErrors.state = "State is required";

    return formErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    try {
      const response = await axios.post('http://localhost:8080/api/user', formData);
      setSuccessMessage('Registration successful!');
      setErrors({});
    } catch (error) {
      if (error.response && error.response.data) {
        setErrors(error.response.data.errors);
      } else {
        setErrors({ submit: 'Registration failed. Please try again.' });
      }
      setSuccessMessage('');
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      contactNumber: '',
      role: '',
      aadharNumber: '',
      password: '',
      address: {
        city: '',
        pincode: '',
        state: ''
      }
    });
    setErrors({});
    setSuccessMessage('');
  };

  return (
    <div className="register-container">
      <h2><MdAppRegistration />Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            placeholder='Enter Name'
            onChange={handleChange}
          />
          {errors.name && <p className="error-message">{errors.name}</p>}
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            placeholder='Enter Email'
            onChange={handleChange}
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>
        <div>
          <label>Contact Number:</label>
          <input
            type="text"
            name="contactNumber"
            value={formData.contactNumber}
            placeholder='Enter Contact Number'
            onChange={handleChange}
          />
          {errors.contactNumber && <p className="error-message">{errors.contactNumber}</p>}
        </div>
        <div>
          <label>Role:</label>
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="">Select Role</option>
            <option value="CUSTOMER">CUSTOMER</option>
            <option value="EMPLOYEE">EMPLOYEE</option>
            <option value="FARMER">FARMER</option>
            <option value="ACCOUNTANT">ACCOUNTANT</option>
          </select>
          {errors.role && <p className="error-message">{errors.role}</p>}
        </div>
        <div>
          <label>Aadhar Number:</label>
          <input
            type="text"
            name="aadharNumber"
            value={formData.aadharNumber}
            placeholder='Enter Aadhar Number'
            onChange={handleChange}
          />
          {errors.aadharNumber && <p className="error-message">{errors.aadharNumber}</p>}
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            placeholder='Enter Password'
            onChange={handleChange}
          />
          {errors.password && <p className="error-message">{errors.password}</p>}
        </div>
        <div>
          <label>City Name:</label>
          <input
            type="text"
            name="city"
            value={formData.address.city}
            placeholder='Enter City Name'
            onChange={handleChange}
          />
          {errors.city && <p className="error-message">{errors.city}</p>}
        </div>
        <div>
          <label>Pincode:</label>
          <input
            type="text"
            name="pincode"
            value={formData.address.pincode}
            placeholder='Enter Pincode'
            onChange={handleChange}
          />
          {errors.pincode && <p className="error-message">{errors.pincode}</p>}
        </div>
        <div>
          <label>State:</label>
          <input
            type="text"
            name="state"
            value={formData.address.state}
            placeholder='Enter State'
            onChange={handleChange}
          />
          {errors.state && <p className="error-message">{errors.state}</p>}
        </div>
        <button type="submit">Submit</button>
        <button type="button" onClick={handleReset}>Reset</button>
      </form>
      {errors.submit && <p className="error-message">{errors.submit}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
};

export default Registration;
