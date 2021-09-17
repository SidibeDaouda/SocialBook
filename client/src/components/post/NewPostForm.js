import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { CameraIcon } from "@heroicons/react/solid";
import { useDispatch, useSelector } from "react-redux";
import { addPost, getPosts } from "../../actions/post.actions";
import { isEmpty, timestampParser } from "../Utils";
import PostLoading from "./PostLoading";

function NewPostFrom() {
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [postPicture, setPostPicture] = useState(null);
  const [video, setVideo] = useState("");
  const [file, setFile] = useState();
  const userData = useSelector((state) => state.userReducer);
  const error = useSelector((state) => state.errorReducer.postError);
  const dispatch = useDispatch();

  const handlePost = async () => {
    if (message || postPicture || video) {
      const data = new FormData();
      data.append("posterId", userData._id);
      data.append("message", message);
      if (file) data.append("file", file);
      data.append("video", video);

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
    setVideo("");
  };

  const cancelPost = () => {
    setMessage("");
    setPostPicture("");
    setVideo("");
    setFile("");
  };

  useEffect(() => {
    if (!isEmpty(userData)) setIsLoading(false);

    const handleVideo = () => {
      let findLink = message.split(" ");
      for (let i = 0; i < findLink.length; i++) {
        if (
          findLink[i].includes("https://www.yout") ||
          findLink[i].includes("https://yout")
        ) {
          let embed = findLink[i].replace("watch?v=", "embed/");
          setVideo(embed.split("&")[0]);
          findLink.splice(i, 1);
          setMessage(findLink.join(" "));
          setPostPicture("");
        }
      }
    };
    handleVideo();
  }, [userData, message, video]);

  return (
    <>
      {isLoading ? (
        <PostLoading />
      ) : (
        <div className='bg-white p-2 rounded-2xl shadow-md text-gray-500 font-medium my-6 '>
          <div className='flex space-x-4 p-3 items-center'>
            <NavLink to='/profil'>
              <img
                className='rounded-full object-cover h-10 w-10'
                src={userData.picture}
                alt='user-img'
              />
            </NavLink>
            <input
              className='rounded-full h-12 bg-gray-100 flex-grow px-5 focus:outline-none flex w-full'
              type='text'
              placeholder={`Quoi de neuf, ${userData.pseudo} ?`}
              onChange={(e) => setMessage(e.target.value)}
              value={message}
            />

            {isEmpty(video) && (
              <label
                htmlFor='file-upload'
                className='cursor-pointer bg-gray-100 hover:bg-gray-200 p-2 rounded-lg'
              >
                <CameraIcon className='h-7 text-green-400' />
                <input
                  className='hidden'
                  type='file'
                  id='file-upload'
                  name='file'
                  accept='.jpg, .jpeg, .png'
                  onChange={(e) => handlePicture(e)}
                />
              </label>
            )}

            {video && (
              <button onClick={() => setVideo("")}>Supprimer video</button>
            )}
            {postPicture && <button>supprimer la photo</button>}
          </div>

          {message || postPicture || video.length > 20 ? (
            <div className=' flex flex-col bg-white rounded-xl border border-gray-200'>
              <div className='flex'>
                <img
                  src={userData.picture}
                  alt='user-pic'
                  className='rounded-full h-10 w-10'
                />
                <div className='pl-2'>
                  <h3 className='font-medium'>{userData.pseudo}</h3>
                  <p className='text-xs text-gray-400'>
                    {timestampParser(Date.now())}
                  </p>
                </div>
              </div>

              {postPicture && (
                <div className='bg-white aspect-w-2 aspect-h-1 overflow-hidden'>
                  <img
                    src={postPicture}
                    className='w-full h-full objet-cover object-center'
                    alt=''
                  />
                </div>
              )}

              {video && (
                <iframe
                  className='w-full h-72 md:h-80 mt-2'
                  src={video}
                  frameBorder='0'
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                  allowFullScreen
                  title={video}
                ></iframe>
              )}

              <p className='bg-white px-2 py-3 font-normal'>
                <span className='font-bold'>{userData.pseudo}: </span>
                {message}
              </p>
            </div>
          ) : null}

          {!isEmpty(error.format) && <p className='pl-2'>{error.format}</p>}
          {!isEmpty(error.maxSize) && <p className='pl-2'>{error.maxSize}</p>}

          <div className='flex items-center justify-end'>
            {message || postPicture || video.length > 20 ? (
              <button
                className='bg-gray-100 hover:bg-red-300 hover:text-white font-semibold text-gray-500 mt-2 ml-2 p-2 text-sm rounded-lg transition-colors duration-150 cursor-pointer'
                onClick={cancelPost}
              >
                Annuler message
              </button>
            ) : null}
            <button
              className={`${
                message || postPicture || video.length
                  ? "block bg-blue-200 hover:bg-blue-400 hover:text-white font-semibold text-gray-500 mt-2 ml-2 p-2 text-sm rounded-lg transition-colors duration-150 shadow-sm cursor-pointer"
                  : "hidden"
              }`}
              onClick={handlePost}
            >
              Envoyer
            </button>
          </div>
          {/* </div> */}
        </div>
      )}
    </>
  );
}

export default NewPostFrom;
