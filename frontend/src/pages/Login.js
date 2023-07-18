import React, { useState } from 'react';
import { useLogin } from "../hooks/useLogin"

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {login, error, isLoading} = useLogin();

  const handleLoginSubmit = async (event) => {
    event.preventDefault();

    await login(email, password)

    }

  return (
    <form className="login" onSubmit={handleLoginSubmit}>
    <h3>Log in</h3>

    <label>Email address:</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <label>Password:</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      
      <button disabled={isLoading}>Log in</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default LoginForm;