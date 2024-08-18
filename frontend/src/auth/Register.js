import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const BASE_URL = 'http://localhost:8000';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    try {
      const response = await fetch(BASE_URL + '/api/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }), 
      });

      const data = await response.json();

      if (response.ok) {
        alert('Registration successful. Please check your email to verify your account.');
        navigate('/');
      } else {
        alert(`Registration failed: ${data.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Registration failed due to network error');
    }
  };

  return (
    <div style={styles.container}>
      <h2>Register</h2>
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
      <input
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Confirm Password"
        style={styles.input}
      />
      <button onClick={handleRegister} style={styles.button}>Register</button>
      <p>
        Already have an account? <Link to="/">Login</Link>
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

export default Register;
