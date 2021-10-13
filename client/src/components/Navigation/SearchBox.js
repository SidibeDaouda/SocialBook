import { ArrowLeftIcon } from "@heroicons/react/solid";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";

function SearchBox({ ...props }) {
  const [openWrapper, setOpenWrapper] = useState(false);
  const { push } = useHistory();
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState(allData);
  const suggestionWrapperRef = useRef(null);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}api/user`)
      .then((response) => {
        console.log(response.data);
        setAllData(response.data);
        setFilteredData(response.data);
      })
      .catch((error) => {
        console.log("Erreur lors de l'obtention de données: " + error);
      });
  }, []);

  const handleSearch = (e) => {
    let value = e.target.value;
    // let value = e.target.value.toLowerCase();
    value !== "" ? setOpenWrapper(true) : setOpenWrapper(false);
    let result = [];
    // console.log(value);
    result = allData.filter((data) => {
      return data.pseudo.search(value) !== -1;
    });
    setFilteredData(result);
  };

  const disabledSearchInput = (e) => {
    props.setSuggestion(false);
    props.setClassInputSearch("searchInput");
    console.log("desactiver search");
  };

  const useOutsideAlerter = (ref) => {
    useEffect(() => {
      function handleClickOutside(e) {
        if (ref.current && !ref.current.contains(e.target)) {
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

  useOutsideAlerter(suggestionWrapperRef);

  return (
    <div
      ref={suggestionWrapperRef}
      className="absolute left-0 top-0 z-50 flex flex-col py-2 shadow-md rounded-md h-auto w-82 bg-white"
    >
      <div className="flex items-center text-gray-600 p-2 justify-start">
        <ArrowLeftIcon
          className="h-9 hover:bg-gray-100 rounded-full p-2 ml-0 cursor-pointer"
          onClick={disabledSearchInput}
        />
        <div className="ml-2 items-center rounded-full bg-gray-100 p-2 md:cursor-text">
          <input
            className={props.classInputSearch + " w-56 "}
            type="text"
            placeholder="Rechercher sur mysocialbook"
            autoFocus={true}
            onChange={(e) => handleSearch(e)}
          />
        </div>
      </div>
      <div className="flex flex-col text-center overflow-y-auto max-h-80">
        {openWrapper && filteredData.length > 0 ? (
          <>
            {filteredData.map((value) => {
              return (
                <div
                  key={value._id}
                  onClick={() => {
                    push({
                      pathname: "/profil",
                      state: { userId: value._id },
                    });
                    props.setSuggestion(false);
                  }}
                  className="flex items-center text-gray-500 hover:text-blue-500 hover:bg-gray-100 rounded-xl p-3 cursor-pointer"
                >
                  <img
                    src={value.picture}
                    alt="profil-pic"
                    className="h-10 w-10 rounded-full"
                  />
                  <p className="p-2">{value.pseudo}</p>
                </div>
              );
            })}
          </>
        ) : (
          <p className="text-gray-500 rounded-xl p-3 m-1">
            Aucune personne trouvée.
          </p>
        )}
      </div>
    </div>
  );
}

export default SearchBox;
