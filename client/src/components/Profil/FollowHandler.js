import { BadgeCheckIcon } from "@heroicons/react/solid";
import { BadgeCheckIcon as UnfollowBage } from "@heroicons/react/outline";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { followUser, unfollowUser } from "../../store/actions/user.actions";
import { isEmpty } from "../../utils/utils";

const FollowHandler = ({ idToFollow, type }) => {
  const userData = useSelector((state) => state.userReducer);
  const [isFollowed, setIsFollowed] = useState(false);
  const dispatch = useDispatch();

  const handleFollow = () => {
    dispatch(followUser(userData._id, idToFollow));
    setIsFollowed(true);
  };

  const handleUnfollow = () => {
    dispatch(unfollowUser(userData._id, idToFollow));
    setIsFollowed(false);
  };

  useEffect(() => {
    if (!isEmpty(userData.following)) {
      if (userData.following.includes(idToFollow)) {
        setIsFollowed(true);
      } else setIsFollowed(false);
    }
  }, [userData, idToFollow]);

  return (
    <>
      {isFollowed === false && !isEmpty(userData) && (
        <span onClick={handleFollow}>
          {type === "suggestion" && (
            <button className="postCancelbtn ml-0 hover:bg-gray-200 hover:text-gray-600 flex items-center">
              Suivre <UnfollowBage className="h-6 w-6 pt-1 pl-1" />
            </button>
          )}
          {type === "card" && (
            <UnfollowBage className="w-6 h-6 pt-1 pl-1 cursor-pointer" />
          )}
        </span>
      )}
      {isFollowed && !isEmpty(userData) && (
        <span onClick={handleUnfollow}>
          {type === "suggestion" && (
            <button className="postCancelbtn ml-0 hover:bg-gray-200 hover:text-gray-600 flex items-center">
              Abonné <BadgeCheckIcon className="h-6 w-6 pt-1 pl-1" />
            </button>
          )}
          {type === "card" && (
            <BadgeCheckIcon className="w-6 h-6 pt-1 pl-1 cursor-pointer" />
          )}
        </span>
      )}
    </>
  );
};

export default FollowHandler;
