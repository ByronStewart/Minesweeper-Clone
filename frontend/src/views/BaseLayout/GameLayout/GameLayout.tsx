import { Outlet } from "react-router-dom"
import { ProvideMinesweeper } from "../../../hooks/useMinesweeper"

interface Props {}
export const MinesweeperLayout: React.FC<Props> = ({ children }) => {
  return (
    <ProvideMinesweeper>
      <Outlet />
    </ProvideMinesweeper>
  )
}
