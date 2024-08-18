import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const BASE_URL = 'http://localhost:8000';

function EmailVerify() {
  const { uidb64, token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await fetch(BASE_URL + `/api/email-verify/${uidb64}/${token}/`, {
          method: 'GET',
        });

        if (response.ok) {
          alert('Email verified successfully!');
          navigate('/login');
        } else {
          alert('Email verification failed. Please try again.');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred during email verification.');
      }
    };

    verifyEmail();
  }, [uidb64, token, navigate]);

  return (
    <div style={styles.container}>
      <h2>Verifying your email...</h2>
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
};

export default EmailVerify;
