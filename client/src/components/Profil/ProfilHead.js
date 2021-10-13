import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserContext } from "../../context/UserContext";
import { updateBio, uploadPicture } from "../../store/actions/user.actions";
import Popup from "../Popup";
import Bio from "./Bio";
import FollowHandler from "./FollowHandler";
import UploadImg from "./UploadImg";

const ProfilHead = ({ userId, tabletToMobile }) => {
  const [bio, setBio] = useState("");
  const [updateForm, setUpdateForm] = useState(false);
  const userCtx = useContext(UserContext);
  const userData = useSelector((state) => state.userReducer);
  const usersData = useSelector((state) => state.usersReducer);
  const error = useSelector((state) => state.errorReducer.userError);

  const [file, setFile] = useState();
  const dispatch = useDispatch();

  const handlePicture = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", userData.pseudo);
    data.append("userId", userData._id);
    data.append("file", file);

    dispatch(uploadPicture(data, userData._id));
  };

  const [followersPopup, setFollowersPopup] = useState(false);
  const [followingPopup, setFollowingPopup] = useState(false);

  const handleUpdate = (e) => {
    e.preventDefault();
    if (bio === "" || bio === userData.bio) {
      setUpdateForm(false);
    } else {
      dispatch(updateBio(userData._id, bio));
      setUpdateForm(false);
    }
  };

  return usersData.map((user) => {
    return (
      user._id === userId && (
        <div
          className={`flex flex-col justify-center items-center bg-white shadow-md text-gray-400 font-medium p-4 ${
            !tabletToMobile ? "h-screen w-60" : "-mt-4"
          } `}
          key={user._id}
        >
          {followersPopup && (
            <Popup
              followersPopup={followersPopup}
              setFollowersPopup={setFollowersPopup}
              currUser={user}
            />
          )}
          {followingPopup && (
            <Popup
              setFollowingPopup={setFollowingPopup}
              followingPopup={followingPopup}
              currUser={user}
            />
          )}
          <form
            className="flex flex-col justify-center py-3 relative w-max"
            onSubmit={handlePicture}
          >
            <img
              src={user.picture}
              className="rounded-full object-cover h-32 w-32 "
              alt="user-pic"
            />

            {userCtx === user._id && (
              <>
                <UploadImg setFile={setFile} file={file} />

                <input
                  type="submit"
                  value="Enregistrer"
                  className={`${
                    file
                      ? "block bg-blue-200 hover:bg-blue-400 hover:text-white font-semibold text-gray-500 mt-2 ml-2 p-2 text-sm rounded-lg transition-colors duration-150 shadow-sm cursor-pointer"
                      : "hidden"
                  }`}
                />
              </>
            )}

            <p>{error.maxSize}</p>
            <p>{error.format}</p>
          </form>
          <h2>@{user.pseudo}</h2>
          <p>Role: {user.role}</p>

          {userData._id !== user._id && (
            <FollowHandler idToFollow={user._id} type="suggestion" />
          )}

          <Bio
            setUpdateForm={setUpdateForm}
            updateForm={updateForm}
            user={user}
            handleUpdate={handleUpdate}
            setFollowersPopup={setFollowersPopup}
            setFollowingPopup={setFollowingPopup}
            setBio={setBio}
            userCtx={userCtx}
            userData={userData}
          />
        </div>
      )
    );
  });
};

export default ProfilHead;
