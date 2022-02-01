import React from "react";
import { Link, Outlet } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";

function App() {
  const auth = useAuth();
  return (
    <div className="mx-5">
      <div className="bg-slate-100 mb-5">
        {!auth.user && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            <Link to="/about">About</Link>
          </>
        )}

        {auth.user && (
          <>
            <button
              className="px-4 py-2 border bg-slate-400 border-slate-800"
              onClick={() => auth.signOut}
            >
              logout
            </button>
            <Link to="/protected">Protected</Link>
          </>
        )}
      </div>
      <Outlet />
    </div>
  );
}

export default App;
