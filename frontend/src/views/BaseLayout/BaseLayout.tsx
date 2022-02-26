import React from "react"
import { Outlet } from "react-router-dom"
import { DefaultHeader } from "../../components/layouts/DefaultHeader"

interface Props {}

const BaseLayout: React.FC<Props> = () => {
  return (
    <div>
      <div className="w-full">
        <DefaultHeader />
      </div>
      <Outlet />
    </div>
  )
}
export default BaseLayout
