import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const BASE_URL = 'http://localhost:8000';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        handlePasswordResetRequest();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, );

  const handlePasswordResetRequest = async () => {
    setIsButtonClicked(true);
    try {
      const response = await fetch(BASE_URL + '/api/password-reset-request/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        alert('Password reset link sent to your email.');
        navigate('/login');
      } else {
        alert('Failed to send password reset link.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to send password reset link due to network error.');
    } finally {
      setIsButtonClicked(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Reset Password</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        style={styles.input}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            handlePasswordResetRequest();
          }
        }}
      />
      <button
        onClick={handlePasswordResetRequest}
        style={{
          ...styles.button,
          ...(isButtonClicked ? styles.buttonActive : {}),
        }}
      >
        Send Reset Link
      </button>
      <p style={styles.linkText}>
        Remembered your password? <Link to="/login"  style={styles.link}>Login</Link>
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
};

export default ForgotPassword;
