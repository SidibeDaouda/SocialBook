import React, { useEffect, useState } from "react";
import { isEmpty } from "../../utils/utils";

import axios from "axios";
const URL = process.env.REACT_APP_API_URL;

function Contact({ currentId, setCurrentChat, currentChat }) {
  const [followingList, setFollowingList] = useState([]);

  useEffect(() => {
    const getFollowingList = async () => {
      const res = await axios.get(`${URL}api/user/followings/${currentId}`);
      setFollowingList(res.data);
    };
    getFollowingList();
  }, [currentId]);

  const handleClick = async (user) => {
    try {
      console.log(user);
      let res;

      res = await axios.get(
        `${URL}api/conversations/find/${currentId}/${user._id}`
      );

      if (res.data === null) {
        res = await axios
          .post(`${URL}api/conversations`, {
            senderId: currentId,
            receiverId: user._id,
          })
          .then((res) => {
            setCurrentChat(res.data);
          });
      } else {
        setCurrentChat(res.data);
      }

      console.log("click curr chat", res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col bg-white shadow-md text-gray-400 h-screen w-60">
      <div
        className={`text-sm h-screen overflow-y-auto ${
          !isEmpty(followingList[0]) && "cursor-pointer"
        }`}
      >
        {!isEmpty(followingList[0]) ? (
          followingList.map((following) => {
            return (
              <div
                key={following._id}
                onClick={() => handleClick(following)}
                className="flex p-2 hover:bg-gray-100"
              >
                <img
                  src={following.picture}
                  alt="profil-pic"
                  className="w-10 h-10 mr-2 rounded-full"
                />
                <p className="pt-2"> {following.pseudo}</p>
              </div>
            );
          })
        ) : (
          <>
            <div className="flex p-2 hover:bg-gray-100">
              <p className="pt-2"> Pas de contact</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Contact;
