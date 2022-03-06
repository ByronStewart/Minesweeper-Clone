import { Outlet } from "react-router-dom"

interface Props {}
export const MinesweeperLayout: React.FC<Props> = ({ children }) => {
  return <Outlet />
}
