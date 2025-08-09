import React from "react";
import { Card, Row, Col, Button, Statistic, Badge, Typography, Space } from "antd";
import { 
  HeartTwoTone, 
  DashboardOutlined, 
  UserOutlined, 
  BellOutlined,
  MonitorOutlined,
  PlusOutlined,
  ClockCircleOutlined,
  AlertOutlined
} from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;

const Home = () => {
  // Mock data for demonstration
  const quickStats = {
    totalPatients: 156,
    activeDevices: 134,
    pendingReviews: 8,
    urgentAlerts: 3
  };

  const deviceTypes = [
    { type: "Pacemaker", count: 45, status: "active", color: "#52c41a" },
    { type: "ICD", count: 32, status: "active", color: "#1890ff" },
    { type: "CRT-P", count: 28, status: "active", color: "#722ed1" },
    { type: "CRT-D", count: 21, status: "active", color: "#eb2f96" },
    { type: "Loop Recorder", count: 8, status: "active", color: "#fa8c16" }
  ];

  const recentTransmissions = [
    { patient: "Smith, John", device: "ICD", status: "urgent", time: "2 min ago" },
    { patient: "Johnson, Mary", device: "Pacemaker", status: "normal", time: "15 min ago" },
    { patient: "Williams, Bob", device: "CRT-D", status: "review", time: "1 hour ago" }
  ];

  return (
    <div style={{ padding: "24px", background: "#f0f2f5", minHeight: "100vh" }}>
      {/* Hero Section */}
      <div style={{ 
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        borderRadius: "12px",
        padding: "48px 32px",
        marginBottom: "32px",
        color: "white",
        textAlign: "center"
      }}>
        <HeartTwoTone twoToneColor="#ff4d4f" style={{ fontSize: "64px", marginBottom: "16px" }} />
        <Title level={1} style={{ color: "white", marginBottom: "16px" }}>
          CardiaVue Monitoring Platform
        </Title>
        <Title level={3} style={{ color: "white", fontWeight: "300", marginBottom: "24px" }}>
          Advanced Cardiac Rhythm Monitoring & Device Management
        </Title>
        <Paragraph style={{ fontSize: "18px", color: "rgba(255,255,255,0.9)", maxWidth: "600px", margin: "0 auto 32px" }}>
          Empowering healthcare professionals with real-time cardiac device monitoring, 
          comprehensive patient data analysis, and seamless clinical workflow management 
          for optimal patient care.
        </Paragraph>
        <Space size="large">
          <Button type="primary" size="large" icon={<DashboardOutlined />}>
            View Dashboard
          </Button>
          <Button size="large" style={{ background: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.3)", color: "white" }}>
            New Patient
          </Button>
        </Space>
      </div>

      {/* Quick Stats Dashboard */}
      <Row gutter={[24, 24]} style={{ marginBottom: "32px" }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Patients"
              value={quickStats.totalPatients}
              prefix={<UserOutlined style={{ color: "#1890ff" }} />}
              valueStyle={{ color: "#1890ff" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Active Devices"
              value={quickStats.activeDevices}
              prefix={<MonitorOutlined style={{ color: "#52c41a" }} />}
              valueStyle={{ color: "#52c41a" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Pending Reviews"
              value={quickStats.pendingReviews}
              prefix={<ClockCircleOutlined style={{ color: "#faad14" }} />}
              valueStyle={{ color: "#faad14" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Urgent Alerts"
              value={quickStats.urgentAlerts}
              prefix={<AlertOutlined style={{ color: "#ff4d4f" }} />}
              valueStyle={{ color: "#ff4d4f" }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[24, 24]}>
        {/* Device Types Overview */}
        <Col xs={24} lg={12}>
          <Card title={
            <Space>
              <MonitorOutlined />
              <span>Device Type Overview</span>
            </Space>
          } style={{ height: "400px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {deviceTypes.map((device, index) => (
                <div key={index} style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "12px 16px",
                  background: "#fafafa",
                  borderRadius: "8px",
                  border: `2px solid ${device.color}20`
                }}>
                  <div>
                    <Text strong>{device.type}</Text>
                    <br />
                    <Text type="secondary">{device.count} devices</Text>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <Badge color={device.color} text={device.status} />
                    <br />
                    <Text style={{ color: device.color, fontSize: "20px", fontWeight: "bold" }}>
                      {device.count}
                    </Text>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </Col>

        {/* Recent Transmissions */}
        <Col xs={24} lg={12}>
          <Card title={
            <Space>
              <BellOutlined />
              <span>Recent Transmissions</span>
            </Space>
          } style={{ height: "400px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {recentTransmissions.map((transmission, index) => (
                <div key={index} style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "12px",
                  background: "#fafafa",
                  borderRadius: "8px",
                  borderLeft: `4px solid ${
                    transmission.status === "urgent" ? "#ff4d4f" :
                    transmission.status === "review" ? "#faad14" : "#52c41a"
                  }`
                }}>
                  <div>
                    <Text strong>{transmission.patient}</Text>
                    <br />
                    <Text type="secondary">{transmission.device}</Text>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <Badge 
                      status={
                        transmission.status === "urgent" ? "error" :
                        transmission.status === "review" ? "warning" : "success"
                      }
                      text={transmission.status}
                    />
                    <br />
                    <Text type="secondary" style={{ fontSize: "12px" }}>
                      {transmission.time}
                    </Text>
                  </div>
                </div>
              ))}
              <Button type="dashed" block style={{ marginTop: "16px" }}>
                View All Transmissions
              </Button>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Quick Actions */}
      <Card title="Quick Actions" style={{ marginTop: "32px" }}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={6}>
            <Button type="primary" size="large" block icon={<PlusOutlined />}>
              Add New Patient
            </Button>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Button size="large" block icon={<MonitorOutlined />}>
              Device Setup
            </Button>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Button size="large" block icon={<BellOutlined />}>
              Alert Management
            </Button>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Button size="large" block icon={<DashboardOutlined />}>
              Generate Report
            </Button>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default Home; 
