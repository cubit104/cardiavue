import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => (
  <nav style={{ padding: "10px", background: "#ececec" }}>
    <Link to="/">Home</Link> | <Link to="/login">Login</Link> | <Link to="/dashboard">Dashboard</Link>
  </nav>
);

export default Navbar;