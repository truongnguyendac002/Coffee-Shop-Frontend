import React, { useState } from 'react';
import InPutForm from './InPutForm';

function EmailInput({ onEmailChange }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    
    setEmail(value);

    if (!validateEmail(value)) {
      setError('Email is not in correct format');
    } else {
      setError('');
    }
    return onEmailChange(value)
  };

  return (
    <div >
      <InPutForm
        label="Email"
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={handleChange}
        error={error}
        required
        
      />
    </div>
  );
}

export default EmailInput;
