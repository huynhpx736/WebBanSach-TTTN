// SignUp.jsx
import React, { useState } from 'react';
import { register as apiRegister } from '../../api';
import './Auth.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();

    apiRegister(username, password, email).then(
      (response) => {
        setMessage("User registered successfully");
      },
      (error) => {
        setMessage("Error: " + (error.response ? error.response.data.desc : error.message));
      }
    );
  };

  return (
    <div className='wrapper'>
      <div className="auth-container">
        <div className="auth-header">
          <h2>Đăng kí</h2>
        </div>
        <form className="auth-form" onSubmit={handleRegister}>
          <div>
            <label>Tài khoản</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Mật khẩu</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit">Đăng kí</button>
        </form>
        {message && <p className="auth-message">{message}</p>}
      </div>
    </div>
  );
};

export default Register;
