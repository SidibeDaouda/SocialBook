import {
  UserGroupIcon,
  UsersIcon,
  BookmarkIcon,
  HeartIcon,
} from "@heroicons/react/solid";
import { NavLink } from "react-router-dom";

import SidebarRow from "./SidebarRow";
function Sidebar({ userData }) {
  return (
    <div className="hidden md:flex flex-col justify-center p-2 mt-10 max-w-[600px] xl:min-w-[300] bg-white shadow-md h-96 rounded-md ml-14">
      <NavLink to="/profil">
        <SidebarRow
          src={userData.picture}
          title={userData.pseudo}
          email={userData.email}
        />
      </NavLink>
      <SidebarRow Icon={UserGroupIcon} title="Abonnés" />
      <SidebarRow Icon={UsersIcon} title="Abonnements" />
      <SidebarRow Icon={HeartIcon} title="J'aimes" />
      <SidebarRow Icon={BookmarkIcon} title="Sauvegardés" />
    </div>
  );
}

export default Sidebar;
