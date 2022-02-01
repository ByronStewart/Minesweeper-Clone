import React from "react";
import { ProtectedComponent } from "./components/ProtectedComponent";
import { useAuth } from "./hooks/useAuth";

function App() {
  const auth = useAuth();
  return (
    <div className="m-5">
      <div>
        <button
          className="px-4 py-2 border bg-slate-400 border-slate-800"
          onClick={() => auth.signIn("bob6@test.com", "bob6")}
        >
          login
        </button>
        <button
          className="px-4 py-2 border bg-slate-400 border-slate-800"
          onClick={() => auth.register("bob10", "bob10@test.com", "bob10")}
        >
          register
        </button>
        <button
          className="px-4 py-2 border bg-slate-400 border-slate-800"
          onClick={auth.signOut}
        >
          logout
        </button>
      </div>
      <div>{auth.user && <ProtectedComponent />}</div>
    </div>
  );
}

export default App;
