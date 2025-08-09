import React from "react";
import Sidebar from "../components/Dashboard/Sidebar";
import ClinicStats from "../components/Dashboard/ClinicStats";
import TransmissionTable from "../components/Dashboard/TransmissionTable";

const ClinicDashboard = () => (
  <div style={{ display: "flex" }}>
    <Sidebar />
    <div style={{ flex: 1, padding: "20px" }}>
      <ClinicStats />
      <TransmissionTable />
    </div>
  </div>
);

export default ClinicDashboard;