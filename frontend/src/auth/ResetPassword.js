import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const BASE_URL = 'http://localhost:8000';

function ResetPassword() {
  const { uidb64, token } = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isButtonClicked, setIsButtonClicked] = useState(false); // État pour gérer l'effet du bouton
  const navigate = useNavigate();

  const handlePasswordReset = async () => {
    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    setIsButtonClicked(true); // Activer l'effet du bouton

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
    } finally {
      setIsButtonClicked(false); // Désactiver l'effet du bouton
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handlePasswordReset();
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Reset Password</h2>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="New Password"
        style={styles.input}
        onKeyDown={handleKeyDown} // Ajoutez cet événement ici
      />
      <input
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Confirm New Password"
        style={styles.input}
        onKeyDown={handleKeyDown} // Ajoutez cet événement ici
      />
      <button 
        onClick={handlePasswordReset} 
        style={{
          ...styles.button,
          ...(isButtonClicked ? styles.buttonActive : {}),
        }}
      >
        Reset Password
      </button>
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
};

export default ResetPassword;
