import React, { useState } from "react";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Integrate with backend authentication
    alert(`Email: ${email}\nPassword: ${password}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email:</label>
        <input value={email} onChange={e => setEmail(e.target.value)} type="email" required />
      </div>
      <div>
        <label>Password:</label>
        <input value={password} onChange={e => setPassword(e.target.value)} type="password" required />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;