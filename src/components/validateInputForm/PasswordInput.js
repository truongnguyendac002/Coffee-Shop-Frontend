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

  const handleBlur = () => {
    if(!validatePassword(data)) {
      setError("Mật khẩu phải có ít nhất 8 ký tự , 1 ký tự đặc biệt ")
    }else {
      setError(false);
    }
  }

  const validatePassword = (password) => {
    const regex = /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.{8,})/; 
    return regex.test(password);
  };

  const handleChange = (e) => {
    const {value} = e.target;

    setData(value);
  
    // const validationError = validatePassword(value);
    // if (validationError) {
    //   setError(validationError); 
    // } else {
    //   setError(''); 
    // }
    setError(false);
  
    // return onChange(e.target); 
    return onChange(e); 
  };


  return (
    <div className="relative">
      <InPutForm
        label={label}
        type={"password"} 
        placeholder={placeholder}
        name={name}
        value={data}
        onBlur={handleBlur}
        onChange={handleChange}
        error={error}
        required
        showEye={true}
      />
    </div>
  );
};

export default PasswordInput;
