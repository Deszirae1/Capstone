import React, { useState } from 'react';
import './authForm.css';

const AuthForm = ({ authAction, mode, buttonClassName }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Track loading 
  const [error, setError] = useState(''); // Track error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(''); // Clear prev. errors

    try {
      
      await authAction({ username, password, mode });
    } catch (err) {
      console.error('Authentication failed:', err);
      setError('Authentication failed. Please try again.');
    } finally {
      setLoading(false); // Reset loading  
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>{mode === 'login' ? 'Login' : 'Register'}</h2>

      {/* error message */}
      {error && <div className="error-message">{error}</div>}

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

      <button 
        type="submit" 
        className={buttonClassName} 
        disabled={loading} 
      >
        {loading ? 'Loading...' : mode === 'login' ? 'Login' : 'Register'}
      </button>
    </form>
  );
};

export default AuthForm;



