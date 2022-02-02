import React from "react";
import { Outlet } from "react-router-dom";
import { DefaultHeader } from "../../components/layouts/DefaultHeader";

interface Props {}

const BaseLayout: React.FC<Props> = () => {
  return (
    <div>
      <DefaultHeader />
      <Outlet />
    </div>
  );
};
export default BaseLayout;
