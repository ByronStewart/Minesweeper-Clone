import { FormEvent, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //const location = useLocation();
  //const from = location.state?.from?.pathname || "/";
  const auth = useAuth();
  const login = (e: FormEvent) => {
    e.preventDefault();
    auth.signIn(email, password, () => {
      Navigate({ to: "/", replace: true });
    });
  };
  return (
    <div>
      <h1>This is the login page</h1>
      <hr />
      <form onSubmit={login}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};
