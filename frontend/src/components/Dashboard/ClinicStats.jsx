import React, { useState, useEffect } from "react";
import logger from "../../utils/logger";
import api from "../../api/axios";

const ClinicStats = () => {
  const [stats, setStats] = useState({
    totalPatients: 0,
    activeDevices: 0,
    alertsToday: 0,
    transmissionsToday: 0,
    criticalAlerts: 0,
    deviceTypes: {
      pacemaker: 0,
      icd: 0,
      crt: 0,
      loop: 0
    }
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load stats from backend API
    const loadStats = async () => {
      try {
        logger.userAction('Load Clinic Stats');
        
        // Get authentication data from localStorage
        const authData = localStorage.getItem('cardiaVueAuth');
        const token = localStorage.getItem('authToken');
        
        if (!authData || !token) {
          logger.error('No authentication data found');
          // If no auth, use basic fallback data
          setStats({
            totalPatients: 0,
            activeDevices: 0,
            alertsToday: 0,
            transmissionsToday: 0,
            criticalAlerts: 0,
            deviceTypes: {
              pacemaker: 0,
              icd: 0,
              crt: 0,
              loop: 0
            }
          });
          setLoading(false);
          return;
        }

        // Call the real backend API
        const response = await api.get('/transmissions/stats/dashboard');
        
        setStats(response.data);
        logger.info('Clinic stats loaded successfully', response.data);
        
      } catch (error) {
        logger.error('Failed to load clinic stats', {}, error);
        
        // Fall back to empty data on error
        setStats({
          totalPatients: 0,
          activeDevices: 0,
          alertsToday: 0,
          transmissionsToday: 0,
          criticalAlerts: 0,
          deviceTypes: {
            pacemaker: 0,
            icd: 0,
            crt: 0,
            loop: 0
          }
        });
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  const StatCard = ({ title, value, icon, color, subtitle, trend }) => (
    <div style={{
      ...styles.statCard,
      borderLeft: `4px solid ${color}`
    }}>
      <div style={styles.statHeader}>
        <div style={styles.statIcon} title={title}>{icon}</div>
        <div style={styles.statValue}>{loading ? '...' : value}</div>
      </div>
      <div style={styles.statTitle}>{title}</div>
      {subtitle && (
        <div style={styles.statSubtitle}>{subtitle}</div>
      )}
      {trend && (
        <div style={{
          ...styles.statTrend,
          color: trend.direction === 'up' ? '#28a745' : trend.direction === 'down' ? '#dc3545' : '#6c757d'
        }}>
          {trend.direction === 'up' ? '↗️' : trend.direction === 'down' ? '↘️' : '➡️'} {trend.text}
        </div>
      )}
    </div>
  );

  const DeviceChart = () => (
    <div style={styles.chartContainer}>
      <h4 style={styles.chartTitle}>Device Distribution</h4>
      <div style={styles.deviceGrid}>
        {Object.entries(stats.deviceTypes).map(([type, count]) => {
          const deviceInfo = {
            pacemaker: { icon: '🫀', label: 'Pacemaker', color: '#007bff' },
            icd: { icon: '⚡', label: 'ICD', color: '#28a745' },
            crt: { icon: '🔄', label: 'CRT', color: '#ffc107' },
            loop: { icon: '📡', label: 'Loop Recorder', color: '#dc3545' }
          };
          
          const info = deviceInfo[type];
          const percentage = stats.activeDevices > 0 ? Math.round((count / stats.activeDevices) * 100) : 0;
          
          return (
            <div key={type} style={styles.deviceItem}>
              <div style={styles.deviceHeader}>
                <span style={styles.deviceIcon}>{info.icon}</span>
                <span style={styles.deviceLabel}>{info.label}</span>
              </div>
              <div style={styles.deviceCount}>{loading ? '...' : count}</div>
              <div style={styles.devicePercentage}>{loading ? '...' : `${percentage}%`}</div>
              <div style={{
                ...styles.deviceBar,
                backgroundColor: info.color,
                width: loading ? '0%' : `${percentage}%`
              }}></div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const styles = {
    container: {
      marginBottom: "2rem"
    },
    title: {
      fontSize: "1.8rem",
      fontWeight: "600",
      color: "#2c3e50",
      marginBottom: "1.5rem",
      display: "flex",
      alignItems: "center",
      gap: "0.5rem"
    },
    statsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "1.5rem",
      marginBottom: "2rem"
    },
    statCard: {
      backgroundColor: "white",
      padding: "1.5rem",
      borderRadius: "12px",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
      transition: "transform 0.2s ease, box-shadow 0.2s ease",
      cursor: "pointer"
    },
    statHeader: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: "0.75rem"
    },
    statIcon: {
      fontSize: "2rem",
      opacity: 0.8
    },
    statValue: {
      fontSize: "2.2rem",
      fontWeight: "700",
      color: "#2c3e50"
    },
    statTitle: {
      fontSize: "1rem",
      fontWeight: "600",
      color: "#6c757d",
      marginBottom: "0.25rem"
    },
    statSubtitle: {
      fontSize: "0.85rem",
      color: "#adb5bd"
    },
    statTrend: {
      fontSize: "0.8rem",
      fontWeight: "500",
      marginTop: "0.5rem"
    },
    chartContainer: {
      backgroundColor: "white",
      padding: "1.5rem",
      borderRadius: "12px",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)"
    },
    chartTitle: {
      fontSize: "1.3rem",
      fontWeight: "600",
      color: "#2c3e50",
      marginBottom: "1rem",
      borderBottom: "2px solid #e9ecef",
      paddingBottom: "0.5rem"
    },
    deviceGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      gap: "1rem"
    },
    deviceItem: {
      padding: "1rem",
      backgroundColor: "#f8f9fa",
      borderRadius: "8px",
      position: "relative",
      overflow: "hidden"
    },
    deviceHeader: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      marginBottom: "0.5rem"
    },
    deviceIcon: {
      fontSize: "1.5rem"
    },
    deviceLabel: {
      fontWeight: "600",
      color: "#495057"
    },
    deviceCount: {
      fontSize: "1.8rem",
      fontWeight: "700",
      color: "#2c3e50",
      marginBottom: "0.25rem"
    },
    devicePercentage: {
      fontSize: "0.9rem",
      color: "#6c757d",
      marginBottom: "0.5rem"
    },
    deviceBar: {
      height: "4px",
      borderRadius: "2px",
      transition: "width 1s ease-in-out"
    }
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>
        <span>📊</span>
        Clinic Statistics
      </h3>
      
      <div style={styles.statsGrid}>
        <StatCard
          title="Total Patients"
          value={stats.totalPatients}
          icon="👥"
          color="#007bff"
          subtitle="Active in system"
          trend={{ direction: 'up', text: '+12 this month' }}
        />
        
        <StatCard
          title="Active Devices"
          value={stats.activeDevices}
          icon="⚡"
          color="#28a745"
          subtitle="Currently monitored"
          trend={{ direction: 'up', text: '+5 this week' }}
        />
        
        <StatCard
          title="Alerts Today"
          value={stats.alertsToday}
          icon="🚨"
          color="#ffc107"
          subtitle={`${stats.criticalAlerts} critical`}
          trend={{ direction: 'down', text: '-3 from yesterday' }}
        />
        
        <StatCard
          title="Transmissions"
          value={stats.transmissionsToday}
          icon="📡"
          color="#17a2b8"
          subtitle="Received today"
          trend={{ direction: 'up', text: '+8 from yesterday' }}
        />
      </div>
      
      <DeviceChart />
    </div>
  );
};

export default ClinicStats;