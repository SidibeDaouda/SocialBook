import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { useDispatch } from "react-redux";
import { likePost, unlikePost } from "../../actions/post.actions";
import { HeartIcon } from "@heroicons/react/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/solid";

const LikeButton = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const userId = useContext(UserContext);
  const dispatch = useDispatch();

  const like = () => {
    dispatch(likePost(post._id, userId));
    setLiked(true);
  };

  const unlike = () => {
    dispatch(unlikePost(post._id, userId));
    setLiked(false);
  };

  useEffect(() => {
    if (post.likers.includes(userId)) setLiked(true);
    else setLiked(false);
  }, [userId, post.likers, liked]);

  return (
    <>
      {userId === null && <div>Connectez-vous pour aimer un post !</div>}

      {userId && liked === false && (
        <div className='inputIcon rounded-none rounded-bl-2xl' onClick={like}>
          <HeartIcon className='h-5' />
          <span className='pl-2'>{post.likers.length}</span>
        </div>
      )}
      {userId && liked && (
        <div className='inputIcon rounded-none rounded-bl-2xl' onClick={unlike}>
          <HeartIconSolid className='h-5 text-red-500' />
          <span className='pl-2'>{post.likers.length}</span>
        </div>
      )}
    </>
  );
};

export default LikeButton;
