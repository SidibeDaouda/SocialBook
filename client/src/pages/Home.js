import React /*useContext*/ from "react";
import { useSelector } from "react-redux";
import Feed from "../components/Feed";
import Sidebar from "../components/Navigation/Sidebar";
// import Widgets from "../components/Widgets";

function Home() {
  const userData = useSelector((state) => state.userReducer);

  return (
    <div className='flex justify-center w-full'>
      <Sidebar userData={userData} />
      <Feed />
      {/* <Widgets /> */}
    </div>
  );
}

export default Home;
