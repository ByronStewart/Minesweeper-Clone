import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

interface Props {}

export const DefaultHeader: React.FC<Props> = () => {
  const auth = useAuth();
  return (
    <div className="bg-slate-100">
      {!auth.user && (
        <>
          <Link
            className="px-4 py-2 inline-block border border-slate-500"
            to="/login"
          >
            Login{" "}
          </Link>
          <Link
            className="px-4 py-2 inline-block border border-slate-500"
            to="/register"
          >
            Register{" "}
          </Link>
        </>
      )}
      <Link
        className="px-4 py-2 inline-block border border-slate-500"
        to="/about"
      >
        About{" "}
      </Link>
      <Link
        className="px-4 py-2 inline-block border border-slate-500"
        to="/game"
      >
        Game{" "}
      </Link>

      {auth.user && (
        <>
          <button
            className="px-4 py-2 inline-block border border-slate-500"
            onClick={() => auth.signOut()}
          >
            logout
          </button>
          <Link to="/protected">Protected</Link>
        </>
      )}
    </div>
  );
};
