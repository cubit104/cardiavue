import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logger from '../utils/logger';
import api from '../api/axios';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    rememberMe: false
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    logger.userAction('Login Attempt', { username: formData.username });

    try {
      // Basic validation
      if (!formData.username || !formData.password) {
        const errorMsg = 'Please fill in all fields';
        setError(errorMsg);
        logger.logFormValidation('login', 'username|password', errorMsg);
        return;
      }

      // Call the real authentication API
      const response = await api.post('/auth/login', {
        username: formData.username,
        password: formData.password
      });
      
      const { access_token, token_type } = response.data;
      
      // Store JWT token and user data
      const authData = {
        username: formData.username,
        loginTime: new Date().toISOString(),
        tokenType: token_type
      };
      
      // Use the auth context to manage login state
      login(authData, access_token);
      
      logger.authentication('login', formData.username, true, {
        rememberMe: formData.rememberMe,
        loginTime: authData.loginTime
      });
      
      logger.navigation('/login', '/dashboard', 'authentication_success');
      navigate('/dashboard');
      
    } catch (err) {
      let errorMsg = 'Login failed. Please try again.';
      
      if (err.response?.status === 401) {
        errorMsg = 'Invalid username or password.';
      } else if (err.response?.data?.detail) {
        errorMsg = err.response.data.detail;
      }
      
      setError(errorMsg);
      logger.authentication('login', formData.username, false, {
        reason: errorMsg,
        status: err.response?.status
      });
    } finally {
      setIsLoading(false);
    }
  };

  const styles = {
    container: {
      minHeight: '100vh',
      display: 'flex',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif',
    },
    animationSide: {
      flex: 1,
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      color: 'white',
      position: 'relative',
      overflow: 'hidden',
    },
    logo: {
      textAlign: 'center',
      marginBottom: '3rem',
    },
    logoTitle: {
      fontSize: '3rem',
      fontWeight: '700',
      margin: '1rem 0',
      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
    },
    animation: {
      textAlign: 'center',
    },
    heartbeatAnimation: {
      width: '300px',
      height: '200px',
      marginBottom: '2rem',
      background: 'rgba(255, 255, 255, 0.1)',
      borderRadius: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
    },
    heartIcon: {
      fontSize: '4rem',
      animation: 'heartbeat 1.5s infinite',
    },
    tagline: {
      maxWidth: '400px',
    },
    taglineTitle: {
      fontSize: '1.8rem',
      fontWeight: '600',
      marginBottom: '1rem',
    },
    taglineText: {
      fontSize: '1.1rem',
      opacity: 0.9,
      lineHeight: '1.6',
    },
    loginSide: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      background: '#ffffff',
    },
    loginContainer: {
      width: '100%',
      maxWidth: '400px',
    },
    title: {
      fontSize: '2.2rem',
      fontWeight: '700',
      color: '#2c3e50',
      marginBottom: '0.5rem',
      textAlign: 'center',
    },
    subtitle: {
      color: '#7f8c8d',
      marginBottom: '2rem',
      textAlign: 'center',
    },
    form: {
      width: '100%',
    },
    inputGroup: {
      position: 'relative',
      marginBottom: '1.5rem',
    },
    inputIcon: {
      position: 'absolute',
      left: '1rem',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#bdc3c7',
      fontSize: '1.1rem',
    },
    input: {
      width: '100%',
      padding: '1rem 1rem 1rem 3rem',
      border: '2px solid #ecf0f1',
      borderRadius: '10px',
      fontSize: '1rem',
      transition: 'border-color 0.3s ease',
      outline: 'none',
      boxSizing: 'border-box',
    },
    inputFocus: {
      borderColor: '#4285f4',
    },
    rememberForgot: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '2rem',
      fontSize: '0.9rem',
    },
    checkbox: {
      marginRight: '0.5rem',
    },
    forgotLink: {
      color: '#4285f4',
      textDecoration: 'none',
    },
    loginBtn: {
      width: '100%',
      padding: '1rem',
      background: 'linear-gradient(45deg, #4285f4, #34a853)',
      color: 'white',
      border: 'none',
      borderRadius: '10px',
      fontSize: '1.1rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      marginBottom: '1.5rem',
      disabled: isLoading,
    },
    loginBtnHover: {
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 25px rgba(66, 133, 244, 0.3)',
    },
    error: {
      background: '#fee',
      color: '#c33',
      padding: '0.75rem',
      borderRadius: '8px',
      marginBottom: '1rem',
      textAlign: 'center',
      border: '1px solid #fcc',
    },
    loginFooter: {
      textAlign: 'center',
      color: '#7f8c8d',
    },
    footerLink: {
      color: '#4285f4',
      textDecoration: 'none',
    },
  };

  return (
    <div style={styles.container}>
      <style>
        {`
          @keyframes heartbeat {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
          }
          @media (max-width: 768px) {
            .login-container {
              flex-direction: column;
            }
            .animation-side {
              min-height: 300px;
            }
          }
        `}
      </style>
      
      {/* Animation Side */}
      <div style={styles.animationSide}>
        <div style={styles.logo}>
          <h1 style={styles.logoTitle}>CardiaVue</h1>
        </div>
        <div style={styles.animation}>
          <div style={styles.heartbeatAnimation}>
            <div style={styles.heartIcon}>❤️</div>
          </div>
          <div style={styles.tagline}>
            <h2 style={styles.taglineTitle}>Advanced Cardiac Monitoring</h2>
            <p style={styles.taglineText}>Providing healthcare professionals with real-time insights</p>
          </div>
        </div>
      </div>
      
      {/* Login Side */}
      <div style={styles.loginSide}>
        <div style={styles.loginContainer}>
          <h2 style={styles.title}>Welcome Back</h2>
          <p style={styles.subtitle}>Please login to your account</p>
          
          {error && <div style={styles.error}>{error}</div>}
          
          <form style={styles.form} onSubmit={handleSubmit}>
            <div style={styles.inputGroup}>
              <span style={styles.inputIcon}>👤</span>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleInputChange}
                style={styles.input}
                required
              />
            </div>
            
            <div style={styles.inputGroup}>
              <span style={styles.inputIcon}>🔒</span>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                style={styles.input}
                required
              />
            </div>
            
            <div style={styles.rememberForgot}>
              <label>
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                  style={styles.checkbox}
                />
                Remember me
              </label>
              <a href="#" style={styles.forgotLink}>Forgot password?</a>
            </div>
            
            <button
              type="submit"
              style={styles.loginBtn}
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>
          
          <div style={styles.loginFooter}>
            <p>Don't have an account? <a href="#" style={styles.footerLink}>Contact administrator</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
