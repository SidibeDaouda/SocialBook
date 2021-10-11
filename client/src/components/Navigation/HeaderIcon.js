import { useLocation } from "react-router";

const HeaderIcon = ({ Icon, active }) => {
  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split("/");

  return (
    <div className="flex items-center cursor-pointer md:px-10 sm:h-14 md:hover:bg-gray-100 rounded-xl active:border-b-2 border-blue-500 group">
      <Icon
        className={`h-5 text-gray-500 group-hover:text-blue-500 sm:h-7 mx-auto ${
          active === splitLocation[1] && "text-blue-500"
        } `}
      />
    </div>
  );
};

export default HeaderIcon;
