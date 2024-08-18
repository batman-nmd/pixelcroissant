import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const BASE_URL = 'http://localhost:8000';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isButtonClicked, setIsButtonClicked] = useState(false); // État pour gérer l'effet du bouton
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    setIsButtonClicked(true); // Activer l'effet du bouton

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
    } finally {
      setIsButtonClicked(false); // Désactiver l'effet du bouton
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleRegister();
    }
  };

  return (
    <div style={styles.container}>
      <img src="/logo192.png" alt="Pixel Croissant Logo" style={styles.logo} /> {/* Ajout du logo */}
      <h2 style={styles.title}>Register</h2>
      <input
        type="email"  
        value={email}  
        onChange={(e) => setEmail(e.target.value)}  
        placeholder="Email"
        style={styles.input}
        onKeyDown={handleKeyDown} // Ajoutez cet événement ici
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        style={styles.input}
        onKeyDown={handleKeyDown} // Ajoutez cet événement ici
      />
      <input
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Confirm Password"
        style={styles.input}
        onKeyDown={handleKeyDown} // Ajoutez cet événement ici
      />
      <button 
        onClick={handleRegister} 
        style={{
          ...styles.button,
          ...(isButtonClicked ? styles.buttonActive : {}),
        }}
      >
        Register
      </button>
      <p style={styles.linkText}>
        Already have an account? <Link to="/" style={styles.link}>Login</Link>
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
    width: '100px',  // Ajustez la taille du logo ici
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
};

export default Register;
