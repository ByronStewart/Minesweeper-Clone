import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../auth/useAuth";
import { GoHome, GoThreeBars, GoTriangleDown } from "react-icons/go";
import { useToggle } from "../../hooks/useToggle";
import { IconContext } from "react-icons";
import { MainMenuButton, MainMenuLink } from "../MainMenuItem";

interface Props {}

export const DefaultHeader: React.FC<Props> = () => {
  const auth = useAuth();
  const {
    state: isMenuOpen,
    setStateTrue: toggleMenuOpen,
    setStateFalse: setMenuClosed,
  } = useToggle(false);
  return (
    <IconContext.Provider
      value={{
        size: "1.8em",
      }}
    >
      <div className="flex justify-between bg-gray-100">
        <Link onClick={setMenuClosed} className="p-6" to="/">
          <GoHome />
        </Link>
        {auth.user && (
          <span
            onClick={setMenuClosed}
            className="p-6 font-bold text-xl overflow-hidden cursor-pointer"
          >
            {auth.user.username}
          </span>
        )}
        <button className="p-6" onClick={toggleMenuOpen}>
          {isMenuOpen ? <GoTriangleDown /> : <GoThreeBars />}
        </button>
      </div>
      {isMenuOpen && (
        <div className="relative z-10 bg-black">
          <div className="absolute top-0 left-0 w-full bg-white">
            <MainMenuLink onClick={toggleMenuOpen} to="/instructions">
              How to play
            </MainMenuLink>
            <MainMenuLink onClick={toggleMenuOpen} to="/halloffame">
              Hall of fame
            </MainMenuLink>
            {auth.user ? (
              <MainMenuButton onClick={() => auth.signOut()}>
                Logout
              </MainMenuButton>
            ) : (
              <>
                <MainMenuLink onClick={toggleMenuOpen} to="/login">
                  Login
                </MainMenuLink>
                <MainMenuLink onClick={toggleMenuOpen} to="/register">
                  Register
                </MainMenuLink>
              </>
            )}
            <MainMenuLink
              onClick={toggleMenuOpen}
              className="border-b"
              to="/game"
            >
              New Game
            </MainMenuLink>
          </div>
        </div>
      )}
    </IconContext.Provider>
  );
};
