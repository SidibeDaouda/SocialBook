import React, { useEffect, useRef } from "react";
import axios from "axios";
import cookie from "js-cookie";
import { LogoutIcon } from "@heroicons/react/outline";
import { MoonIcon } from "@heroicons/react/solid";
import { useHistory } from "react-router-dom";

function MenuDropDown({ setIsDropDown, userData }) {
  const { push } = useHistory();

  const removeCookie = (key) => {
    if (window !== "undefined") {
      cookie.remove(key, { expires: 1 });
    }
  };

  const logout = async () => {
    await axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}api/user/logout`,
      withCredentials: true,
    })
      .then(() => removeCookie("jwt"))
      .catch((err) => console.log(err));

    window.location = "/";
  };

  const dropDownRef = useRef(null);

  const useOutsideAlerter = (ref) => {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setIsDropDown(false);
        }
      }

      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        // the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  };

  useOutsideAlerter(dropDownRef);

  return (
    <div
      ref={dropDownRef}
      className="absolute right-2 top-14 z-50 flex flex-col py-2 px-2 shadow-lg rounded-md h-auto w-56 bg-white "
    >
      <div className="flex items-center hover:bg-gray-100 cursor-pointer rounded-xl space-x-4 p-2">
        <img
          className=" h-8 w-8 md:h-9 md:w-9 object-cover rounded-full"
          src={userData.picture}
          alt=""
        />
        <div
          onClick={() =>
            push({ pathname: "/profil", state: { userId: userData._id } })
          }
          className="flex flex-col"
        >
          <p className="font-semibold">{userData.pseudo}</p>
          <p className="text-sm">Voir mon profil</p>
        </div>
      </div>

      <div className="flex items-center hover:bg-gray-100 cursor-pointer rounded-xl space-x-4 p-2">
        <MoonIcon className="dropdownIco" />
        <p>Theme</p>
      </div>
      <div
        onClick={logout}
        className="flex items-center hover:bg-gray-100 cursor-pointer rounded-xl space-x-4 p-2"
      >
        <LogoutIcon className="dropdownIco" />
        <p>Se déconnecter</p>
      </div>
      <p className="flex text-sm text-gray-400 justify-center">Daouda © 2021</p>
    </div>
  );
}

export default MenuDropDown;
