import { ArrowLeftIcon } from "@heroicons/react/solid";
import React, { useEffect, useRef } from "react";

function SearchBox({ ...props }) {
  const recherche = true;
  const suggestionWrapperRef = useRef(null);

  const useOutsideAlerter = (ref) => {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          props.setSuggestion(false);
          props.setClassInputSearch("searchInput");
        }
      }

      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  };

  const disabledSearchInput = (e) => {
    props.setSuggestion(false);
    props.setClassInputSearch("searchInput");
    console.log("desactiver search");
  };

  useOutsideAlerter(suggestionWrapperRef);

  return (
    <div
      ref={suggestionWrapperRef}
      className='absolute left-0 top-0 z-50 flex flex-col py-2 shadow-md rounded-md h-auto w-82 bg-white'
    >
      <div className='flex items-center text-gray-600 p-2 justify-start'>
        <ArrowLeftIcon
          className='h-9 hover:bg-gray-100 rounded-full p-2 ml-0 cursor-pointer'
          onClick={disabledSearchInput}
        />
        <div className='ml-2 items-center rounded-full bg-gray-100 p-2 md:cursor-text'>
          <input
            className={props.classInputSearch + " w-56 "}
            type='text'
            placeholder='Rechercher sur mysocialbook'
            autoFocus={true}
          />
        </div>
      </div>
      <div className='flex flex-col text-center'>
        {recherche ? (
          <>
            <p className=' text-gray-500 hover:text-blue-500 hover:bg-gray-100 rounded-xl p-3 m-1 cursor-pointer'>
              voici la recherche 1
            </p>
          </>
        ) : (
          <p className='text-gray-500 rounded-xl p-3 m-1'>
            Aucune recherche récente
          </p>
        )}
      </div>
    </div>
  );
}

export default SearchBox;
