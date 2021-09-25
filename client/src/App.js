import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { UserContext } from "./context/UserContext";
import { getUser } from "./store/actions/user.actions";
import Routes from "./components/Routes/Routes";

function App() {
  const [userId, setUserId] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchToken = async () => {
      await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}jwtid`,
        withCredentials: true,
      })
        .then((res) => {
          setUserId(res.data);
        })
        .catch((err) => console.log("No token"));
    };
    fetchToken();

    if (userId) dispatch(getUser(userId));
  }, [userId, dispatch]);

  return (
    <UserContext.Provider value={userId}>
      <Routes />
    </UserContext.Provider>
  );
}

export default App;
