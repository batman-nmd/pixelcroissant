import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const BASE_URL = 'http://localhost:8000';

function ResetPassword() {
  const { uidb64, token } = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handlePasswordReset = async () => {
    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    try {
      const response = await fetch(BASE_URL + `/api/password-reset-confirm/${uidb64}/${token}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        alert('Password reset successfully.');
        navigate('/login');
      } else {
        alert('Failed to reset password.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to reset password due to network error.');
    }
  };

  return (
    <div style={styles.container}>
      <h2>Reset Password</h2>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="New Password"
        style={styles.input}
      />
      <input
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Confirm New Password"
        style={styles.input}
      />
      <button onClick={handlePasswordReset} style={styles.button}>Reset Password</button>
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

export default ResetPassword;
