import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ClinicDashboard from "./pages/ClinicDashboard";
import Navbar from "./components/Layout/Navbar";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary componentName="App">
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
          </Routes>
        </ErrorBoundary>
      </Router>
    </ErrorBoundary>
  );
}

export default App;