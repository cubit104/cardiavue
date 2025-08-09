import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logger from "../../utils/logger";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path, label) => {
    logger.navigation(location.pathname, path, 'sidebar_click');
    logger.userAction('Sidebar Navigation', { destination: label, path });
    navigate(path);
  };

  const handleLogout = () => {
    logger.userAction('Logout', { from: location.pathname });
    logger.authentication('logout', localStorage.getItem('cardiaVueAuth') ? JSON.parse(localStorage.getItem('cardiaVueAuth')).username : 'unknown', true);
    localStorage.removeItem('cardiaVueAuth');
    navigate('/login');
  };

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/patients', label: 'Patients', icon: '👥' },
    { path: '/devices', label: 'Devices', icon: '⚡' },
    { path: '/alerts', label: 'Alerts', icon: '🚨' },
    { path: '/reports', label: 'Reports', icon: '📈' },
    { path: '/settings', label: 'Settings', icon: '⚙️' }
  ];

  const styles = {
    sidebar: {
      width: "280px",
      height: "100vh",
      background: "linear-gradient(180deg, #2c3e50 0%, #34495e 100%)",
      color: "white",
      display: "flex",
      flexDirection: "column",
      boxShadow: "2px 0 10px rgba(0, 0, 0, 0.1)"
    },
    header: {
      padding: "2rem 1.5rem",
      borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
      textAlign: "center"
    },
    logo: {
      fontSize: "1.8rem",
      fontWeight: "700",
      marginBottom: "0.5rem",
      background: "linear-gradient(45deg, #e74c3c, #f39c12)",
      backgroundClip: "text",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent"
    },
    subtitle: {
      fontSize: "0.9rem",
      opacity: 0.8,
      fontWeight: "300"
    },
    nav: {
      flex: 1,
      padding: "1rem 0"
    },
    menuItem: {
      display: "flex",
      alignItems: "center",
      padding: "1rem 1.5rem",
      cursor: "pointer",
      transition: "all 0.3s ease",
      borderLeft: "4px solid transparent",
      fontSize: "1rem"
    },
    menuItemActive: {
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      borderLeftColor: "#e74c3c"
    },
    menuItemHover: {
      backgroundColor: "rgba(255, 255, 255, 0.05)"
    },
    menuIcon: {
      fontSize: "1.2rem",
      marginRight: "0.75rem",
      width: "1.5rem",
      textAlign: "center"
    },
    footer: {
      padding: "1.5rem",
      borderTop: "1px solid rgba(255, 255, 255, 0.1)"
    },
    userInfo: {
      display: "flex",
      alignItems: "center",
      marginBottom: "1rem",
      padding: "0.75rem",
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      borderRadius: "8px"
    },
    userAvatar: {
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      backgroundColor: "#e74c3c",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginRight: "0.75rem",
      fontSize: "1.2rem"
    },
    userName: {
      fontWeight: "600",
      fontSize: "0.9rem"
    },
    userRole: {
      fontSize: "0.8rem",
      opacity: 0.7
    },
    logoutBtn: {
      width: "100%",
      padding: "0.75rem",
      backgroundColor: "transparent",
      border: "1px solid rgba(255, 255, 255, 0.3)",
      color: "white",
      borderRadius: "6px",
      cursor: "pointer",
      fontSize: "0.9rem",
      transition: "all 0.3s ease",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.5rem"
    },
    logoutBtnHover: {
      backgroundColor: "rgba(231, 76, 60, 0.2)",
      borderColor: "#e74c3c"
    }
  };

  // Get current user info
  const authData = localStorage.getItem('cardiaVueAuth') ? JSON.parse(localStorage.getItem('cardiaVueAuth')) : null;
  const username = authData?.username || 'User';

  return (
    <div style={styles.sidebar}>
      <div style={styles.header}>
        <div style={styles.logo}>CardiaVue</div>
        <div style={styles.subtitle}>Cardiac Monitoring System</div>
      </div>
      
      <nav style={styles.nav}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <div
              key={item.path}
              style={{
                ...styles.menuItem,
                ...(isActive ? styles.menuItemActive : {}),
              }}
              onClick={() => handleNavigation(item.path, item.label)}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.target.style.backgroundColor = styles.menuItemHover.backgroundColor;
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.target.style.backgroundColor = 'transparent';
                }
              }}
            >
              <span style={styles.menuIcon}>{item.icon}</span>
              {item.label}
            </div>
          );
        })}
      </nav>
      
      <div style={styles.footer}>
        <div style={styles.userInfo}>
          <div style={styles.userAvatar}>
            {username.charAt(0).toUpperCase()}
          </div>
          <div>
            <div style={styles.userName}>{username}</div>
            <div style={styles.userRole}>Healthcare Professional</div>
          </div>
        </div>
        
        <button
          style={styles.logoutBtn}
          onClick={handleLogout}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = styles.logoutBtnHover.backgroundColor;
            e.target.style.borderColor = styles.logoutBtnHover.borderColor;
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'transparent';
            e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)';
          }}
        >
          <span>🚪</span>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;