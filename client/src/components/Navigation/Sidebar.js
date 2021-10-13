import React from "react";
import { useHistory } from "react-router-dom";
import SidebarRow from "./SidebarRow";
import {
  UserGroupIcon,
  UsersIcon,
  BookmarkIcon,
  HeartIcon,
} from "@heroicons/react/solid";

function Sidebar({ userData }) {
  const { push } = useHistory();

  const goToUserProfil = () => {
    push({ pathname: "/profil", state: { userId: userData._id } });
  };

  return (
    <div className="hidden md:flex flex-col justify-center p-2 mt-10 w-64 text-sm bg-white shadow-md h-96 rounded-md ml-8">
      <div onClick={goToUserProfil}>
        <SidebarRow
          src={userData.picture}
          title={userData.pseudo}
          email={userData.email}
        />
      </div>
      <SidebarRow
        Icon={UserGroupIcon}
        title={`Abonnés : ${userData?.followers?.length}`}
        followersBtn={true}
      />
      <SidebarRow
        Icon={UsersIcon}
        title={`Abonnements : ${userData?.following?.length}`}
        followingBtn={true}
      />
      <SidebarRow Icon={HeartIcon} title="J'aimes" />
      <SidebarRow Icon={BookmarkIcon} title="Sauvegardés" />
    </div>
  );
}

export default Sidebar;
