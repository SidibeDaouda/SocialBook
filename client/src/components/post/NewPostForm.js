import React, { useEffect, useState } from "react";
import { CameraIcon } from "@heroicons/react/solid";
import { useDispatch, useSelector } from "react-redux";
import { addPost, getPosts } from "../../store/actions/post.actions";
import { isEmpty, timestampParser } from "../../utils/utils";
import PostLoading from "./PostLoading";
import { useHistory } from "react-router";

function NewPostFrom() {
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [postPicture, setPostPicture] = useState(null);
  const [file, setFile] = useState();
  const userData = useSelector((state) => state.userReducer);
  const error = useSelector((state) => state.errorReducer.postError);
  const dispatch = useDispatch();
  const { push } = useHistory();

  const goToUserProfil = () => {
    push({ pathname: "/profil", state: { userId: userData._id } });
  };

  const handlePost = async () => {
    if (message || postPicture) {
      const data = new FormData();
      data.append("posterId", userData._id);
      data.append("message", message);
      if (file) data.append("file", file);

      await dispatch(addPost(data));
      dispatch(getPosts());
      cancelPost();
    } else {
      alert("Veuillez entrer un message");
    }
  };

  const handlePicture = (e) => {
    setPostPicture(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
  };

  const cancelPost = () => {
    setMessage("");
    setPostPicture("");
    setFile("");
  };

  useEffect(() => {
    if (!isEmpty(userData)) setIsLoading(false);
  }, [userData, message]);

  return (
    <>
      {isLoading ? (
        <PostLoading />
      ) : (
        <div className="bg-white rounded-2xl shadow-md text-gray-500 font-medium my-6 ">
          {/* input send post form  */}
          <div className="flex space-x-4 p-3 items-center">
            <div onClick={goToUserProfil} className="cursor-pointer">
              <img
                className="rounded-full object-cover h-10 w-10"
                src={userData.picture}
                alt="user-img"
              />
            </div>

            <div className="flex flex-col flex-grow items-center space-x-4 p-3">
              <input
                className="rounded-full h-12 w-full px-5 bg-gray-100 focus:outline-none "
                type="text"
                placeholder={`Quoi de neuf, ${userData.pseudo} ?`}
                onChange={(e) => setMessage(e.target.value)}
                value={message}
              />
            </div>

            <label
              htmlFor="file-upload"
              className="cursor-pointer bg-gray-100 hover:bg-gray-200 p-2 rounded-lg"
            >
              <CameraIcon className="h-7 text-green-400" />
              <input
                className="hidden"
                type="file"
                id="file-upload"
                name="file"
                accept=".jpg, .jpeg, .png"
                onChange={(e) => handlePicture(e)}
              />
            </label>
          </div>

          {/* post preview  */}
          {message || postPicture ? (
            <div className=" flex flex-col bg-white rounded-xl border border-gray-200">
              <div className="flex">
                <img
                  src={userData.picture}
                  alt="user-pic"
                  className="rounded-full h-10 w-10 m-2"
                />
                <div className="m-2">
                  <h3 className="font-medium">{userData.pseudo}</h3>
                  <p className="text-xs text-gray-400">
                    {timestampParser(Date.now())}
                  </p>
                </div>
              </div>

              {postPicture && (
                <div className="bg-white aspect-w-2 aspect-h-1 overflow-hidden">
                  <img
                    src={postPicture}
                    className="w-full h-full objet-cover object-center"
                    alt=""
                  />
                </div>
              )}

              {message && (
                <p className="bg-white px-2 py-1 font-normal">
                  <span className="font-bold">{userData.pseudo}: </span>
                  {message}
                </p>
              )}
            </div>
          ) : null}

          {!isEmpty(error.format) && <p className="pl-2">{error.format}</p>}
          {!isEmpty(error.maxSize) && <p className="pl-2">{error.maxSize}</p>}

          <div className="flex items-center justify-between">
            <div className="">
              {postPicture && (
                <button
                  className="postCancelbtn"
                  onClick={() => setPostPicture("")}
                >
                  Supprimer la photo
                </button>
              )}
            </div>
            <div className="flex">
              {message || postPicture ? (
                <button className="postCancelbtn" onClick={cancelPost}>
                  Annuler message
                </button>
              ) : null}
              <button
                className={`${
                  message || postPicture
                    ? "block bg-blue-200 hover:bg-blue-400 hover:text-white font-semibold text-gray-500 mt-2 ml-2 p-2 text-sm rounded-lg transition-colors duration-150 shadow-sm cursor-pointer"
                    : "hidden"
                }`}
                onClick={handlePost}
              >
                Envoyer
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default NewPostFrom;
