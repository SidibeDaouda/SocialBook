import React, { useState } from "react";
import { useSelector } from "react-redux";
import Popup from "../Popup";

function SidebarRow({ src, Icon, title, email }) {
  const [followersPopup, setFollowersPopup] = useState(false);
  const [followingPopup, setFollowingPopup] = useState(false);
  const userData = useSelector((state) => state.userReducer);

  const handleClick = (e) => {
    if (title === "Abonnés") setFollowersPopup(!followersPopup);
    if (title === "Abonnements") setFollowingPopup(!followingPopup);
  };

  return (
    <div
      className=" flex items-center space-x-2 p-4 hover:bg-gray-200 rounded-xl cursor-pointer"
      onClick={handleClick}
    >
      {src && (
        <img className="rounded-full h-8 w-8 object-cover" src={src} alt="" />
      )}
      {Icon && <Icon className="h-8 w-8 text-blue-500" />}
      <div className="pr-4">
        <p className="hidden sm:inline-block font-medium">{title}</p>
        <p className="text-sm">{email}</p>
      </div>

      {followersPopup && (
        <Popup
          followersPopup={followersPopup}
          setFollowersPopup={setFollowersPopup}
          currUser={userData}
        />
      )}
      {followingPopup && (
        <Popup
          setFollowingPopup={setFollowingPopup}
          followingPopup={followingPopup}
          currUser={userData}
        />
      )}
    </div>
  );
}

export default SidebarRow;
