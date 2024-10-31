import React, { useState } from "react";
import InPutForm from "./InPutForm"; 


const PasswordInput = ({
  label,
  name,
  placeholder = "",
  onChange
}) => {
  
  const [error, setError] = useState('');
  const [data, setData] = useState('');

  const validatePassword = (data) => {
    const minLength = 8;
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/g; 

    if (data.length < minLength) {
      return 'Mật khẩu phải có ít nhất 8 ký tự.';
    }
    if (!specialCharRegex.test(data)) {
      return 'Mật khẩu phải chứa ít nhất một ký tự đặc biệt.';
    }
    return '';
  };

  const handleChange = (e) => {
    const {name, value} = e.target;

    setData(value);
  
    const validationError = validatePassword(value);
    if (validationError) {
      setError(validationError); 
    } else {
      setError(''); 
    }
  
    return onChange(e.target); 
  };


  return (
    <div className="relative">
      <InPutForm
        label={label}
        type={"password"} 
        placeholder={placeholder}
        name={name}
        value={data}
        onChange={handleChange}
        error={error}
        required
        showEye={true}
      />
    </div>
  );
};

export default PasswordInput;
