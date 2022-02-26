import React from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"
import { GoHome, GoThreeBars, GoTriangleDown } from "react-icons/go"
import { useToggle } from "../../hooks/useToggle"
import { IconContext } from "react-icons"
import { MainMenuItem } from "../MainMenuItem"

interface Props {}

export const DefaultHeader: React.FC<Props> = () => {
  const auth = useAuth()
  const [isMenuOpen, toggleMenuOpen, setMenuClosed] = useToggle(false)
  return (
    <IconContext.Provider
      value={{
        size: "1.8em",
      }}
    >
      <div className="flex justify-between">
        <Link onClick={setMenuClosed} className="p-6" to="/">
          <GoHome />
        </Link>
        {auth.user && (
          <Link
            onClick={setMenuClosed}
            className="p-6 font-bold text-xl overflow-hidden"
            to="/profile"
          >
            {auth.user}
          </Link>
        )}
        <button className="p-6" onClick={toggleMenuOpen}>
          {isMenuOpen ? <GoTriangleDown /> : <GoThreeBars />}
        </button>
      </div>
      {isMenuOpen && (
        <div className="relative">
          <div className="absolute top-0 left-0 w-full bg-white">
            <MainMenuItem onClick={toggleMenuOpen} to="/instructions">
              How to play
            </MainMenuItem>
            <MainMenuItem onClick={toggleMenuOpen} to="/halloffame">
              Hall of fame
            </MainMenuItem>
            {auth.user ? (
              <MainMenuItem to="/profile">Profile</MainMenuItem>
            ) : (
              <>
                <MainMenuItem onClick={toggleMenuOpen} to="/login">
                  Login
                </MainMenuItem>
                <MainMenuItem onClick={toggleMenuOpen} to="/register">
                  Register
                </MainMenuItem>
              </>
            )}
            <MainMenuItem
              onClick={toggleMenuOpen}
              className="border-b"
              to="/game"
            >
              New Game
            </MainMenuItem>
          </div>
        </div>
      )}
    </IconContext.Provider>
  )
}
