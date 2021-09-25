import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePost } from "../../store/actions/post.actions";
import { dateParser, isEmpty } from "../Utils";
import PostLoading from "./PostLoading";
import { BookmarkIcon, ChatAltIcon } from "@heroicons/react/outline";
import PostOption from "./PostOption";
import LikeButton from "./LikeButton";
import CardComments from "./CardComments";
import { NavLink } from "react-router-dom";

function PostCard({ post }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdated, setIsUpdated] = useState(false);
  const [textUpdate, setTextUpdate] = useState(null);
  const [showComments, setShowComments] = useState(false);
  const usersData = useSelector((state) => state.usersReducer);
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const updateItem = () => {
    if (textUpdate) {
      dispatch(updatePost(post._id, textUpdate));
    }
    setIsUpdated(false);
  };

  useEffect(() => {
    !isEmpty(usersData[0]) && setIsLoading(false);
  }, [usersData]);

  return (
    <div className="flex flex-col" key={post._id}>
      {isLoading ? (
        <PostLoading />
      ) : (
        <>
          <div className="relative p-5 bg-white mt-5 rounded-t-2xl shadow-sm">
            <div className="flex items-center space-x-2">
              <NavLink to="/profil">
                <img
                  className="rounded-full h-10 w-10"
                  src={
                    !isEmpty(usersData[0]) &&
                    usersData
                      .map((user) => {
                        if (user._id === post.posterId) return user.picture;
                        else return null;
                      })
                      .join("")
                  }
                  alt="poster-pic"
                />
              </NavLink>
              <div>
                <h3 className="font-medium ">
                  {!isEmpty(usersData[0]) &&
                    usersData
                      .map((user) => {
                        if (user._id === post.posterId) return user.pseudo;
                        else return null;
                      })
                      .join("")}
                </h3>
                <p className="text-xs text-gray-400">
                  {dateParser(post.createdAt)}
                </p>
              </div>
              {userData._id === post.posterId && (
                <PostOption
                  id={post._id}
                  setIsUpdated={setIsUpdated}
                  isUpdated={isUpdated}
                />
              )}
            </div>
          </div>
          {post.picture && (
            <div className="bg-white aspect-w-2 aspect-h-1 overflow-hidden">
              <img
                src={post.picture}
                className="w-full h-full objet-cover object-center"
                alt="post-pic"
              />
            </div>
          )}

          {post.video && post.picture && <br />}

          {post.video && (
            <iframe
              className="w-full h-72 md:h-80"
              src={post.video}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={post._id}
            ></iframe>
          )}
          {isUpdated === false && post.message !== "" && (
            <p className="bg-white p-2 ">
              <span className="font-semibold">
                {!isEmpty(usersData[0]) &&
                  usersData
                    .map((user) => {
                      if (user._id === post.posterId) return user.pseudo;
                      else return null;
                    })
                    .join("")}
              </span>
              : {post.message}
            </p>
          )}
          {isUpdated && (
            <div className="w-full relative px-2 pt-2 bg-white">
              <textarea
                defaultValue={post.message}
                onChange={(e) => setTextUpdate(e.target.value)}
                className="w-full p-2 h-24 max-h-24 border-2 border-gray-300 outline-none rounded-lg resize-none"
              />

              <button
                className="bg-blue-300 hover:bg-blue-400 ml-2 text-white p-3 rounded-lg font-semibold transition-colors duration-150 cursor-pointer float-right"
                onClick={updateItem}
              >
                Valider modification
              </button>
            </div>
          )}
          {showComments && <CardComments post={post} />}
          {/* Footer of the post */}
          <div className="flex justify-between items-center rounded-b-2xl bg-white shadow-md text-gray-400 border-t">
            <LikeButton post={post} />
            <div
              className="inputIcon rounded-none"
              onClick={() => setShowComments(!showComments)}
            >
              <ChatAltIcon className="h-5" />
              <p className="pl-2"> {post.comments.length}</p>
            </div>
            <div className="inputIcon rounded-none rounded-br-2xl">
              <BookmarkIcon className="h-5" />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default PostCard;
