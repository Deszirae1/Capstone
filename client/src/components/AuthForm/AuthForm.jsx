import React, { useState } from 'react';
import './authForm.css';  
const AuthForm = ({ authAction, mode, buttonClassName }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    authAction({ username, password, mode });
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>{mode === 'login' ? 'Login' : 'Register'}</h2>

      <div className="input-group">
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="input-field"
          />
        </label>
      </div>
      
      <div className="input-group">
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input-field"
          />
        </label>
      </div>

      <button type="submit" className={buttonClassName}>
        {mode === 'login' ? 'Login' : 'Register'}
      </button>
    </form>
  );
};

export default AuthForm;


