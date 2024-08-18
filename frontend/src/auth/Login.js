import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const BASE_URL = 'http://localhost:8000';

function Login({ setIsAuthenticated }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        handleLogin();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, );

  const handleLogin = async () => {
    setIsButtonClicked(true);
    try {
      const response = await fetch(BASE_URL + '/api/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        localStorage.setItem('email', email);
        setIsAuthenticated(true);
        navigate('/create');
      } else {
        alert('Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Login failed due to network error');
    } finally {
      setIsButtonClicked(false);
    }
  };

  return (
    <div style={styles.container}>
      <img src="/logo192.png" alt="Pixel Croissant Logo" style={styles.logo} /> {/* Utilisation du logo */}
      <h2 style={styles.title}>Login</h2>
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
      <button
        onClick={handleLogin}
        style={{ 
          ...styles.button, 
          ...(isButtonClicked ? styles.buttonActive : {}) 
        }}
      >
        Login
      </button>
      <p style={styles.linkText}>
        Don't have an account? <Link to="/register" style={styles.link}>Register</Link>
      </p>
      <p style={styles.linkText}>
        <Link to="/forgot-password" style={styles.link}>Forgot Password?</Link>
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
    background: 'linear-gradient(135deg, #f0f0f0, #d4d4d4)',
  },
  logo: {
    width: '100px',  // Vous pouvez ajuster la taille du logo ici
    marginBottom: '20px',
  },
  title: {
    marginBottom: '20px',
    fontSize: '24px',
    color: '#333',
  },
  input: {
    margin: '10px 0',
    padding: '10px',
    width: '300px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
  },
  button: {
    padding: '10px 20px',
    margin: '20px 0',
    width: '300px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.1s ease, background-color 0.1s ease',
  },
  buttonActive: {
    transform: 'scale(0.95)',
    backgroundColor: '#0056b3',
  },
  linkText: {
    margin: '5px 0',
    fontSize: '14px',
    color: '#555',
  },
  link: {
    color: '#007bff',
    textDecoration: 'none',
    transition: 'color 0.2s ease',
  },
  linkHover: {
    color: '#0056b3',
  },
};

export default Login;
