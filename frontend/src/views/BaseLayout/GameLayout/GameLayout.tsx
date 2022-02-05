import React from "react";
import { Link, Outlet } from "react-router-dom";

type Props = {};

const GameLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex">
      {/* Game menu */}
      <div>
        <Link className="underline text-blue-500" to="minesweeper">
          Minesweeper
        </Link>
      </div>
      <div className="m-10" style={{ backgroundColor: "" }}>
        <Outlet />
      </div>
    </div>
  );
};

export default GameLayout;
