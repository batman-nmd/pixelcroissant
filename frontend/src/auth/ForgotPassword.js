import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BASE_URL = 'http://localhost:8000';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handlePasswordResetRequest = async () => {
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
    }
  };

  return (
    <div style={styles.container}>
      <h2>Reset Password</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        style={styles.input}
      />
      <button onClick={handlePasswordResetRequest} style={styles.button}>Send Reset Link</button>
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

export default ForgotPassword;
