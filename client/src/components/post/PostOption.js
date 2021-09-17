import React, { useEffect, useRef, useState } from "react";
import {
  DotsHorizontalIcon,
  TrashIcon,
  PencilAltIcon,
} from "@heroicons/react/outline";
import { useDispatch } from "react-redux";
import { deletePost } from "../../actions/post.actions";

function PostOption(props) {
  const dropDownRef = useRef(null);
  const [showOption, setShowOption] = useState(false);
  const dispatch = useDispatch();

  const deleteThisPost = () => dispatch(deletePost(props.id));

  const useOutsideAlerter = (ref) => {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setShowOption(false);
        }
      }

      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        // the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  };

  useOutsideAlerter(dropDownRef);

  return (
    <>
      <DotsHorizontalIcon
        onClick={() => setShowOption(true)}
        className='h-10 text-gray-400 absolute right-8 hover:bg-gray-100 rounded-full p-2 cursor-pointer'
      />
      <div className='text-sm'>
        {showOption && (
          <div
            ref={dropDownRef}
            className='absolute top-14 right-0 z-50 flex flex-col py-2 px-2 shadow-lg rounded-md h-auto w-56 bg-white '
          >
            <div
              onClick={() => props.setIsUpdated(!props.isUpdated)}
              className='flex items-center hover:bg-gray-100 cursor-pointer rounded-xl space-x-4 p-2'
            >
              <PencilAltIcon className='dropdownIco' />
              <p>Modifier</p>
            </div>
            <div
              onClick={() => {
                if (window.confirm("Voulez-vous supprimer cet article ?")) {
                  deleteThisPost();
                }
              }}
              className='flex items-center hover:bg-gray-100 cursor-pointer rounded-xl space-x-4 p-2'
            >
              <TrashIcon className='dropdownIco' />
              <p>Supprimer</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default PostOption;
