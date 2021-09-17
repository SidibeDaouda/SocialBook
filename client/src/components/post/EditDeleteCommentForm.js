import { PencilAltIcon, TrashIcon } from "@heroicons/react/outline";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteComment, editComment } from "../../actions/post.actions";
import { UserContext } from "../../context/UserContext";

const EditDeleteCommentForm = ({ comment, postId, children }) => {
  const [isAuthor, setIsAuthor] = useState(false);
  const [edit, setEdit] = useState(false);
  const [text, setText] = useState("");
  const userId = useContext(UserContext);
  const dispatch = useDispatch();

  const handleEdit = (e) => {
    e.preventDefault();

    if (text) {
      dispatch(editComment(postId, comment._id, text));
      setText("");
      setEdit(false);
    } else {
      setText("");
      setEdit(false);
    }
  };

  const handleDelete = () => dispatch(deleteComment(postId, comment._id));

  useEffect(() => {
    const checkAuthor = () => {
      if (userId === comment.commenterId) {
        setIsAuthor(true);
      }
    };
    checkAuthor();
  }, [userId, comment.commenterId]);

  return (
    <div>
      <div
        className={`relative p-2 ${
          edit ? " flex flex-col-reverse" : "flex justify-between"
        }`}
      >
        {edit ? (
          <form
            action=''
            onSubmit={handleEdit}
            className='flex flex-col flex-grow w-full'
          >
            <input
              type='text'
              name='text'
              onChange={(e) => setText(e.target.value)}
              defaultValue={comment.text}
              autoFocus
              className='w-full p-3 focus:outline-none rounded-md bg-white focus:ring-2 focus:ring-blue-300'
            />

            <div className='flex items-center justify-end'>
              <p
                onClick={() => setEdit(!edit)}
                className='bg-white hover:bg-red-300 hover:text-white font-semibold text-gray-500 mt-2 ml-2 p-2 text-sm rounded-lg transition-colors duration-150 shadow-sm cursor-pointer'
              >
                Annuler
              </p>
              <input
                type='submit'
                value='Valider modification'
                className='bg-white hover:bg-blue-300 hover:text-white font-semibold text-gray-500 mt-2 ml-2 p-2 text-sm rounded-lg transition-colors duration-150 shadow-sm cursor-pointer'
              />
            </div>
          </form>
        ) : (
          <p className='overflow-hidden'>{comment.text}</p>
        )}

        {isAuthor && (
          <div className={`flex items-center justify-end ${edit && "mb-2"}`}>
            <PencilAltIcon
              onClick={() => setEdit(!edit)}
              className='mr-1 p-1 h-6 bg-white rounded-full cursor-pointer shadow-sm'
            />
            <TrashIcon
              onClick={() => {
                if (window.confirm("Voulez-vous supprimer ce commentaire ?")) {
                  handleDelete();
                }
              }}
              className='p-1 h-6 bg-white rounded-full cursor-pointer shadow-sm'
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default EditDeleteCommentForm;
