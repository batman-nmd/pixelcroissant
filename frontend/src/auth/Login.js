import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const BASE_URL = 'http://localhost:8000';

function Login({ setIsAuthenticated }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch(BASE_URL + '/api/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }), // Assurez-vous d'envoyer l'email ici
      });
  
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        localStorage.setItem('email', email); // Stockez l'email
        setIsAuthenticated(true);
        navigate('/create');
      } else {
        alert('Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Login failed due to network error');
    }
  };
  

  return (
    <div style={styles.container}>
      <h2>Login</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        style={styles.input}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        style={styles.input}
      />
      <button onClick={handleLogin} style={styles.button}>Login</button>
      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
      <p>
      <Link to="/forgot-password">Forgot Password?</Link>
    </p>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  },
  input: {
    margin: '10px 0',
    padding: '10px',
    width: '300px',
  },
  button: {
    padding: '10px 20px',
    margin: '10px 0',
    width: '300px',
  },
};

export default Login;
