import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComment, getPosts } from "../../actions/post.actions";
import { isEmpty, timestampParser } from "../Utils";
import EditDeleteCommentForm from "./EditDeleteCommentForm";

const CardComments = ({ post }) => {
  const [text, setText] = useState("");
  const usersData = useSelector((state) => state.usersReducer);
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  //
  const handleComment = (e) => {
    e.preventDefault();
    if (text) {
      dispatch(addComment(post._id, userData._id, text, userData.pseudo))
        .then(() => dispatch(getPosts()))
        .then(() => setText(""));
    }
  };

  return (
    <div className='bg-white rounded-md border border-white p-1 shadow-lg'>
      {post.comments.map((comment) => {
        return (
          <div
            className={`bg-gray-100 rounded-md my-2 p-2 flex
              ${
                comment.commenterId === userData._id &&
                " border-2 border-gray-400"
              }
            `}
            key={comment._id}
          >
            <img
              src={
                !isEmpty(usersData[0]) &&
                usersData
                  .map((user) => {
                    if (user._id === comment.commenterId) return user.picture;
                    else return null;
                  })
                  .join("")
              }
              alt='commenter-pic'
              className='rounded-full h-10 w-10'
            />
            <div className='w-full ml-3'>
              <div className='flex items-center justify-between'>
                <h3 className='font-semibold capitalize'>
                  {comment.commenterPseudo}
                </h3>
                <div className='w-full flex items-center justify-end mt-2'>
                  <span className='italic text-xs'>
                    {timestampParser(comment.timestamp)}
                  </span>
                </div>
              </div>

              <EditDeleteCommentForm comment={comment} postId={post._id} />
            </div>
          </div>
        );
      })}

      {userData._id && (
        <form
          onSubmit={handleComment}
          className='flex items-center justify-end mt-5'
        >
          <input
            type='text'
            name='text'
            onChange={(e) => setText(e.target.value)}
            value={text}
            placeholder='Laisser un commentaire'
            className=' w-full p-3 focus:outline-none rounded-md bg-white ring-1 ring-gray-300 focus:ring-blue-300 '
          />
          <input
            type='submit'
            value='Envoyer'
            className=' bg-blue-300 hover:bg-blue-400 ml-2 text-white p-3 rounded-lg font-semibold transition-colors duration-150 cursor-pointer'
          />
        </form>
      )}
    </div>
  );
};

export default CardComments;
