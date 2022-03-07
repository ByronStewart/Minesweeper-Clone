import React from "react"
import { Outlet } from "react-router-dom"
import { DefaultHeader } from "./DefaultHeader"

interface Props {}

const BaseLayout: React.FC<Props> = () => {
  return (
    <div className="h-full flex flex-col">
      <div className="w-full">
        <DefaultHeader />
      </div>
      <div className="flex-grow relative">
        <Outlet />
      </div>
    </div>
  )
}
export default BaseLayout
