import React, { useState } from 'react';
import Navbar from './Components/Navbar/Navbar';
import Admin from './Pages/Admin/Admin';
import './App.css';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === 'adminpetpure@gmail.com' && password === 'petpure') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid email or password');
    }
  };

  if (isAuthenticated) {
    return (
      <div className="app-container">
        <Navbar />
        <Admin />
      </div>
    );
  }

  return (
    <div className="app-container">
      <Navbar />
      <div className="login-form-container">
        <form onSubmit={handleLogin} className="login-form">
          <h2>Admin Login</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
          {error && <p className="alert-message">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default App;
