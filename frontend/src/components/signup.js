import React, { useState } from 'react';
import './css/signup.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: ""
  });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault(); // Prevent default form submission
    console.log("Signup Function Executed", formData);
    let responseData;
    await fetch('http://localhost:4000/signup', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    }).then((response) => response.json()).then((data) => responseData = data);

    if (responseData.success) {
      localStorage.setItem('auth-token', responseData.token);
      window.location.replace("/");
    } else {
      alert(responseData.errors);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission
    console.log("Login Function Executed", formData);
    let responseData;
    await fetch('http://localhost:4000/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    }).then((response) => response.json()).then((data) => responseData = data);

    if (responseData.success) {
      localStorage.setItem('auth-token', responseData.token);
      window.location.replace("/");
    } else {
      alert(responseData.errors);
    }
  };

  return (
    <div className="main1">
      <input type="checkbox" id="chk" aria-hidden="true" />

      <div className="signup">
        <form onSubmit={handleSignup}>
          <label htmlFor="chk" aria-hidden="true">Sign up</label>
          <input className='input1' type="text" name="username" value={formData.username} onChange={changeHandler} placeholder="User name" required="" />
          <input className='input1' type="email" name="email" value={formData.email} onChange={changeHandler} placeholder="Email" required="" />
          <input className='input1' type="password" name="password" value={formData.password} onChange={changeHandler} placeholder="Password" required="" />
          <button type="submit" className='qw'>Sign up</button> {/* Use type="submit" */}
        </form>
      </div>

      <div className="login">
        <form onSubmit={handleLogin}>
          <label htmlFor="chk" aria-hidden="true">Login</label>
          <input className='input1' type="email" name="email" value={formData.email} onChange={changeHandler} placeholder="Email" required="" />
          <input className='input1' type="password" name="password" value={formData.password} onChange={changeHandler} placeholder="Password" required="" />
          <button type="submit" className='qw'>Login</button> {/* Use type="submit" */}
        </form>
      </div>
    </div>
  );
};

export default Signup;
