import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [animationPhase, setAnimationPhase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationPhase(prev => (prev + 1) % 4);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleAccessDashboard = () => {
    navigate('/login');
  };

  const deviceIcons = [
    { name: 'Pacemaker', icon: '🫀', color: '#1890ff' },
    { name: 'ICD', icon: '⚡', color: '#52c41a' },
    { name: 'CRT-P', icon: '🔄', color: '#fa8c16' },
    { name: 'Loop Recorder', icon: '📡', color: '#eb2f96' }
  ];

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif',
    },
    floatingElement: {
      position: 'absolute',
      fontSize: '2rem',
      opacity: 0.1,
      animation: 'float 4s infinite ease-in-out',
      pointerEvents: 'none',
    },
    heroSection: {
      textAlign: 'center',
      zIndex: 2,
      maxWidth: '800px',
      marginBottom: '3rem',
    },
    heartPulseContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '2rem',
      gap: '1rem',
    },
    heartIcon: {
      fontSize: '3rem',
      animation: 'heartbeat 1.5s infinite',
    },
    mainTitle: {
      fontSize: '4rem',
      fontWeight: '700',
      margin: '1rem 0',
      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
    },
    cardia: {
      color: '#ff4757',
    },
    vue: {
      color: '#ffffff',
    },
    subtitle: {
      fontSize: '1.5rem',
      color: 'rgba(255, 255, 255, 0.9)',
      marginBottom: '1.5rem',
      fontWeight: '300',
    },
    description: {
      fontSize: '1.1rem',
      color: 'rgba(255, 255, 255, 0.8)',
      lineHeight: '1.6',
      marginBottom: '2.5rem',
      maxWidth: '600px',
    },
    accessButton: {
      background: 'linear-gradient(45deg, #1890ff, #52c41a)',
      color: 'white',
      border: 'none',
      padding: '1rem 2.5rem',
      fontSize: '1.1rem',
      fontWeight: '600',
      borderRadius: '50px',
      cursor: 'pointer',
      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.3)',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      margin: '0 auto',
    },
    featuresSection: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '2rem',
      marginBottom: '3rem',
      width: '100%',
      maxWidth: '900px',
    },
    featureCard: {
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      borderRadius: '20px',
      padding: '2rem',
      textAlign: 'center',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      transition: 'transform 0.3s ease',
    },
    featureIcon: {
      fontSize: '3rem',
      marginBottom: '1rem',
      display: 'block',
    },
    featureTitle: {
      color: 'white',
      fontSize: '1.3rem',
      marginBottom: '1rem',
      fontWeight: '600',
    },
    featureText: {
      color: 'rgba(255, 255, 255, 0.8)',
      lineHeight: '1.5',
    },
    devicesShowcase: {
      width: '100%',
      maxWidth: '600px',
      textAlign: 'center',
    },
    devicesTitle: {
      color: 'white',
      fontSize: '1.5rem',
      marginBottom: '2rem',
      fontWeight: '600',
    },
    devicesGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
      gap: '1.5rem',
    },
    deviceItem: {
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      borderRadius: '15px',
      padding: '1.5rem 1rem',
      textAlign: 'center',
      border: '2px solid transparent',
      transition: 'all 0.5s ease',
      cursor: 'pointer',
    },
    deviceItemActive: {
      background: 'rgba(255, 255, 255, 0.2)',
      transform: 'scale(1.05)',
      boxShadow: '0 0 20px rgba(24, 144, 255, 0.5)',
      borderColor: '#1890ff',
    },
    deviceIcon: {
      fontSize: '2.5rem',
      marginBottom: '0.5rem',
      display: 'block',
      transition: 'transform 0.3s ease',
    },
    deviceName: {
      color: 'white',
      fontSize: '0.9rem',
      fontWeight: '500',
    },
  };

  const FloatingElement = ({ children, style }) => (
    <div style={{ ...styles.floatingElement, ...style }}>
      {children}
    </div>
  );

  return (
    <div style={styles.container}>
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(180deg); }
          }
          @keyframes heartbeat {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
          }
          .floating-element-1 { top: 10%; left: 10%; }
          .floating-element-2 { top: 20%; right: 15%; }
          .floating-element-3 { top: 40%; left: 5%; }
          .floating-element-4 { top: 60%; right: 10%; }
          .floating-element-5 { bottom: 30%; left: 15%; }
          .floating-element-6 { bottom: 20%; right: 20%; }
          .floating-element-7 { top: 70%; left: 80%; }
          .floating-element-8 { top: 30%; left: 70%; }
        `}
      </style>

      {/* Floating Elements */}
      {['💙', '🫀', '📊', '⚡', '🔄', '📡', '💊', '🩺'].map((icon, i) => (
        <FloatingElement 
          key={i}
          style={{
            top: i % 2 === 0 ? `${20 + i * 10}%` : 'auto',
            bottom: i % 2 === 1 ? `${20 + i * 5}%` : 'auto',
            left: i % 4 < 2 ? `${10 + i * 15}%` : 'auto',
            right: i % 4 >= 2 ? `${10 + i * 10}%` : 'auto',
          }}
        >
          {icon}
        </FloatingElement>
      ))}
      
      <div style={styles.heroSection}>
        <div style={styles.heartPulseContainer}>
          <div style={styles.heartIcon}>❤️</div>
          <div style={{
            width: '100px',
            height: '2px',
            background: 'rgba(255, 255, 255, 0.3)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute',
              top: 0,
              left: '-100%',
              width: '100%',
              height: '100%',
              background: 'linear-gradient(90deg, transparent, #ff4757, transparent)',
              animation: 'pulse 2s infinite'
            }}></div>
          </div>
        </div>

        <h1 style={styles.mainTitle}>
          <span style={styles.cardia}>Cardia</span>
          <span style={styles.vue}>Vue</span>
        </h1>
        
        <p style={styles.subtitle}>Advanced Cardiac Device Monitoring System</p>
        
        <p style={styles.description}>
          Professional healthcare monitoring solution for cardiac devices. Real-time patient data, 
          intelligent alerts, and comprehensive analytics for healthcare professionals.
        </p>

        <button 
          style={styles.accessButton}
          onClick={handleAccessDashboard}
          onMouseOver={(e) => {
            e.target.style.transform = 'translateY(-3px)';
            e.target.style.boxShadow = '0 12px 35px rgba(0, 0, 0, 0.4)';
          }}
          onMouseOut={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.3)';
          }}
        >
          <span style={{ fontSize: '1.2rem' }}>🔐</span>
          Access Monitoring Dashboard
        </button>
      </div>

      <div style={styles.featuresSection}>
        <div style={styles.featureCard}>
          <div style={styles.featureIcon}>⏱️</div>
          <h3 style={styles.featureTitle}>Real-Time Monitoring</h3>
          <p style={styles.featureText}>Continuous monitoring of cardiac devices with instant data updates</p>
        </div>
        
        <div style={styles.featureCard}>
          <div style={styles.featureIcon}>⚠️</div>
          <h3 style={styles.featureTitle}>Intelligent Alerts</h3>
          <p style={styles.featureText}>Smart alerting system for critical events and device anomalies</p>
        </div>
        
        <div style={styles.featureCard}>
          <div style={styles.featureIcon}>📈</div>
          <h3 style={styles.featureTitle}>Advanced Analytics</h3>
          <p style={styles.featureText}>Comprehensive data analysis and trend visualization tools</p>
        </div>
      </div>

      <div style={styles.devicesShowcase}>
        <h3 style={styles.devicesTitle}>Supported Cardiac Devices</h3>
        <div style={styles.devicesGrid}>
          {deviceIcons.map((device, index) => (
            <div 
              key={device.name}
              style={{
                ...styles.deviceItem,
                ...(animationPhase === index ? styles.deviceItemActive : {})
              }}
            >
              <div style={{
                ...styles.deviceIcon,
                transform: animationPhase === index ? 'scale(1.2)' : 'scale(1)'
              }}>
                {device.icon}
              </div>
              <span style={styles.deviceName}>{device.name}</span>
            </div>
          ))}
        </div>
      </div>

      <style>
        {`
          @keyframes pulse {
            0% { left: -100%; }
            100% { left: 100%; }
          }
        `}
      </style>
    </div>
  );
};

export default Home;
