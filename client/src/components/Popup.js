import { XIcon } from "@heroicons/react/solid";
import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import FollowHandler from "./Profil/FollowHandler";

function Popup({
  setFollowersPopup,
  setFollowingPopup,
  followersPopup,
  followingPopup,
  currUser,
}) {
  const usersData = useSelector((state) => state.usersReducer);
  const { push } = useHistory();

  const handleClose = () => {
    followersPopup && setFollowersPopup(false);
    followingPopup && setFollowingPopup(false);
  };

  const goToUserProfil = (id) => {
    push({ pathname: "/profil", state: { userId: id } });
    handleClose();
  };
  return (
    <div
      className="fixed z-10 inset-0 h-screen flex items-center w-screen"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-center min-h-screen mx-auto">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        ></div>
        <span className=" align-middle h-screen" aria-hidden="true">
          &#8203;
        </span>

        <div className=" bg-white rounded-lg text-center shadow-xl transform transition-all w-80">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 rounded-2xl">
            <div className="sm:flex sm:items-start ">
              <XIcon
                className="absolute h-6 text-gray-600 top-2 right-2 cursor-pointer"
                onClick={handleClose}
              />
              <div className="w-full mt-4 max-h-96 overflow-y-auto ">
                <ul>
                  {followersPopup && (
                    <>
                      <h4 className="pb-2">
                        Abonnés: {currUser.followers.length}
                      </h4>
                      {usersData.map((user) => {
                        for (let i = 0; i < currUser.followers.length; i++) {
                          if (user._id === currUser.followers[i]) {
                            return (
                              <li
                                key={user._id}
                                onClick={() => goToUserProfil(user._id)}
                                className="flex bg-gray-100 shadow-md mb-1 p-2 items-center w-full rounded-xl cursor-pointer"
                              >
                                <img
                                  src={user.picture}
                                  alt="user-pic"
                                  className="h-10 w-10 rounded-full mr-2"
                                />
                                <h4>{user.pseudo}</h4>
                                <FollowHandler
                                  idToFollow={user._id}
                                  type="card"
                                />
                              </li>
                            );
                          }
                        }
                        return null;
                      })}
                    </>
                  )}

                  {followingPopup && (
                    <>
                      <h4 className="pb-2">
                        Abonnements: {currUser.following.length}
                      </h4>
                      {usersData.map((user) => {
                        for (let i = 0; i < currUser.following.length; i++) {
                          if (user._id === currUser.following[i]) {
                            return (
                              <li
                                key={user._id}
                                onClick={() => goToUserProfil(user._id)}
                                className="flex bg-gray-100 shadow-md mb-1 p-2 items-center w-full rounded-lg cursor-pointer"
                              >
                                <img
                                  src={user.picture}
                                  alt="user-pic"
                                  className="h-10 w-10 rounded-full mr-2"
                                />
                                <h4>{user.pseudo}</h4>
                                <FollowHandler
                                  idToFollow={user._id}
                                  type="card"
                                />
                              </li>
                            );
                          }
                        }
                        return null;
                      })}
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Popup;
