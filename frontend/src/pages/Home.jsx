import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

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

  const floatingElements = Array.from({ length: 8 }, (_, i) => (
    <div
      key={i}
      className={`floating-element floating-element-${i + 1}`}
      style={{
        '--delay': `${i * 0.5}s`,
        '--duration': `${4 + i}s`
      }}
    >
      {['💙', '🫀', '📊', '⚡', '🔄', '📡', '💊', '🩺'][i]}
    </div>
  ));

  return (
    <div className="home-container">
      {floatingElements}
      
      <div className="hero-section">
        <div className="heart-pulse-container">
          <div className="heart-icon">❤️</div>
          <div className="pulse-line">
            <div className="pulse-wave"></div>
          </div>
        </div>

        <h1 className="main-title">
          <span className="cardia">Cardia</span>
          <span className="vue">Vue</span>
        </h1>
        
        <p className="subtitle">Advanced Cardiac Device Monitoring System</p>
        
        <p className="description">
          Professional healthcare monitoring solution for cardiac devices. Real-time patient data, 
          intelligent alerts, and comprehensive analytics for healthcare professionals.
        </p>

        <button 
          className="access-button"
          onClick={handleAccessDashboard}
        >
          <span className="button-icon">🔐</span>
          Access Monitoring Dashboard
        </button>
      </div>

      <div className="features-section">
        <div className="feature-card">
          <div className="feature-icon realtime">⏱️</div>
          <h3>Real-Time Monitoring</h3>
          <p>Continuous monitoring of cardiac devices with instant data updates</p>
        </div>
        
        <div className="feature-card">
          <div className="feature-icon alerts">⚠️</div>
          <h3>Intelligent Alerts</h3>
          <p>Smart alerting system for critical events and device anomalies</p>
        </div>
        
        <div className="feature-card">
          <div className="feature-icon analytics">📈</div>
          <h3>Advanced Analytics</h3>
          <p>Comprehensive data analysis and trend visualization tools</p>
        </div>
      </div>

      <div className="devices-showcase">
        <h3>Supported Cardiac Devices</h3>
        <div className="devices-grid">
          {deviceIcons.map((device, index) => (
            <div 
              key={device.name}
              className={`device-item ${animationPhase === index ? 'active' : ''}`}
              style={{ '--device-color': device.color }}
            >
              <div className="device-icon">{device.icon}</div>
              <span className="device-name">{device.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
