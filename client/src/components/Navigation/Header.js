import React, { useState, useCallback, useContext } from "react";

import {
  HomeIcon,
  SearchIcon,
  ChatAltIcon,
  BellIcon,
  GlobeIcon,
} from "@heroicons/react/solid";
import HeaderIcon from "./HeaderIcon";
import SearchBox from "./SearchBox";
import MenuDropDown from "./MenuDropDown";
import { NavLink } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
// import ToggleDarkMode from "./toggleDarkMode";
import logo from "../../img/logo.png";
import { useSelector } from "react-redux";

const Header = () => {
  const [classInputSearch, setClassInputSearch] = useState("searchInput");
  const [suggestion, setSuggestion] = useState(false);
  const [isDropDown, setIsDropDown] = useState(false);
  const userId = useContext(UserContext);
  const userData = useSelector((state) => state.userReducer);

  const activeSearchInput = useCallback(() => {
    setSuggestion(true);
    setClassInputSearch("searchInputActive");
  }, [setSuggestion, setClassInputSearch]);

  const activeDropDown = () => {
    setIsDropDown(true);
  };

  return (
    userId && (
      <nav className="sticky top-0 z-10 bg-white flex items-center p-2 lg:px-5 shadow-md h-14  select-none">
        {/* left */}
        <div className="flex items-center">
          <NavLink to="/home">
            <img
              className=" h-12 w-12 md:h-14 md:w-14 object-cover cursor-pointer -mt-2 space-x-2"
              src={logo}
              alt=""
            />
          </NavLink>

          <div
            className="flex ml-2 items-center rounded-full bg-gray-100 p-2 md:cursor-text"
            onClick={activeSearchInput}
          >
            <SearchIcon className="h-5 w-5 md:h-6 md:w-6 text-gray-600 cursor-pointer md:cursor-text" />
            <input
              className={classInputSearch + " w-48"}
              type="text"
              placeholder="Rechercher sur TraininBook"
            />
          </div>
        </div>

        {/* center */}
        <div className="flex justify-center items-center flex-grow">
          <div className="flex space-x-6 md:space-x-2">
            <NavLink to="/home">
              <HeaderIcon active="home" Icon={HomeIcon} />
            </NavLink>

            <NavLink to="/trends">
              <HeaderIcon active="trends" Icon={GlobeIcon} />
            </NavLink>

            <NavLink to="/message">
              <HeaderIcon active="message" Icon={ChatAltIcon} />
            </NavLink>

            <NavLink to="/notification">
              <HeaderIcon active="notification" Icon={BellIcon} />
            </NavLink>
          </div>
        </div>

        {/* right */}
        <div className="flex items-center sm:space-x-2 justify-end">
          <div
            className="flex items-center hover:bg-gray-100 rounded-full cursor-pointer"
            onClick={activeDropDown}
          >
            <img
              className="rounded-full p-1 h-8 w-8 md:h-9 md:w-9 object-cover"
              src={userData.picture}
              alt=""
            />
            <p className="hidden lg:inline-block font-semibold whitespace-nowrap pr-3 ">
              {userData.pseudo}
            </p>
          </div>
        </div>

        {suggestion && (
          <SearchBox
            classInputSearch={classInputSearch}
            setClassInputSearch={setClassInputSearch}
            suggestion={suggestion}
            setSuggestion={setSuggestion}
          />
        )}

        {isDropDown && (
          <MenuDropDown setIsDropDown={setIsDropDown} userData={userData} />
        )}
      </nav>
    )
  );
};

export default Header;
