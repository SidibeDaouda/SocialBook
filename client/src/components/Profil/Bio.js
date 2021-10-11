import { PencilAltIcon } from "@heroicons/react/solid";
import { dateParser2 } from "../../utils/utils";
import React from "react";

function Bio({
  updateForm,
  setUpdateForm,
  user,
  handleUpdate,
  setFollowersPopup,
  setFollowingPopup,
  setBio,
  userCtx,
  userData,
}) {
  return (
    <form className="w-full" onSubmit={handleUpdate}>
      {userCtx === user._id ? (
        <>
          <h3
            className="flex items-center cursor-pointer w-max text-gray-600 pt-3"
            onClick={() => setUpdateForm(!updateForm)}
          >
            <span>Bio</span>
            <PencilAltIcon className="w-5 ml-1 pt-1" />
          </h3>

          {updateForm === false ? (
            <p className="italic h-20 text-sm">{userData.bio}</p>
          ) : (
            <>
              <textarea
                type="text"
                defaultValue={userData.bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full p-2 border-2 rounded-md resize-none border-gray-300 text-sm"
                placeholder="Déscription..."
              ></textarea>
              <button
                type="submit"
                className="postCancelbtn ml-0 mt-0 mb-5  hover:bg-gray-200 hover:text-gray-600"
              >
                Modifier
              </button>
            </>
          )}
        </>
      ) : (
        <>
          <h3 className="flex items-center w-max text-gray-600 pt-3">Bio</h3>
          <p className="italic w-full resize-none h-20 text-sm">
            {userData.bio}
          </p>
        </>
      )}

      <h3 className="pb-3">
        <p className="text-gray-600">Membre dépuis le :</p>
        <span className="italic text-sm">{dateParser2(user.createdAt)}</span>
      </h3>

      <div className="flex flex-col justify-evenly">
        <h5
          onClick={() => setFollowersPopup(true)}
          className="postCancelbtn ml-0 hover:bg-gray-200 hover:text-gray-600"
        >
          Abonnés : {user.followers ? user.followers.length : ""}
        </h5>
        <h5
          onClick={() => setFollowingPopup(true)}
          className="postCancelbtn ml-0 hover:bg-gray-200 hover:text-gray-600"
        >
          Abonnements : {user.following ? user.following.length : ""}
        </h5>
      </div>
    </form>
  );
}

export default Bio;
