import axios from "axios";
import React, { useEffect, useState } from "react";
const URL = process.env.REACT_APP_API_URL;

function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);

    const getUser = async () => {
      try {
        const res = await axios(`${URL}api/user/${friendId}`);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser._id, conversation]);

  return (
    <div className="flex p-2 hover:bg-gray-100 cursor-pointer">
      <img
        src={user?.picture && user.picture}
        alt="profil-pic"
        className="w-10 h-10 mr-2 rounded-full"
      />
      <span className="">{user?.pseudo}</span>
    </div>
  );
}

export default Conversation;
