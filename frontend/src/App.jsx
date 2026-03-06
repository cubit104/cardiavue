import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ClinicDashboard from "./pages/ClinicDashboard";
import Patients from "./pages/Patients";
import Navbar from "./components/Layout/Navbar";
import ErrorBoundary from "./components/ErrorBoundary";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <ErrorBoundary componentName="App">
      <AuthProvider>
        <Router>
          <Navbar />
          <ErrorBoundary componentName="Routes">
            <Routes>
              <Route path="/" element={
                <ErrorBoundary componentName="Home">
                  <Home />
                </ErrorBoundary>
              } />
              <Route path="/login" element={
                <ErrorBoundary componentName="Login">
                  <Login />
                </ErrorBoundary>
              } />
              <Route path="/dashboard" element={
                <ErrorBoundary componentName="ClinicDashboard">
                  <ClinicDashboard />
                </ErrorBoundary>
              } />
              <Route path="/patients" element={
                <ErrorBoundary componentName="Patients">
                  <Patients />
                </ErrorBoundary>
              } />
            </Routes>
          </ErrorBoundary>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;