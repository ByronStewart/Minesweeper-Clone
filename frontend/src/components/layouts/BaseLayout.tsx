import React from "react";
import { Outlet } from "react-router-dom";
import { DefaultHeader } from "./DefaultHeader";

interface Props {}

export const BaseLayout: React.FC<Props> = () => {
  return (
    <div>
      <DefaultHeader />
      <Outlet />
    </div>
  );
};
