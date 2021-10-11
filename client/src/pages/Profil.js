import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useLocation } from "react-router";
import ProfilHead from "../components/Profil/ProfilHead";
import NewPostFrom from "../components/post/NewPostForm";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../store/actions/post.actions";
import { isEmpty } from "../utils/utils";
import PostCard from "../components/post/PostCard";

function Profil() {
  const location = useLocation();
  const userId = location.state.userId;
  const userIdCtx = useContext(UserContext);
  const [loadPost, setLoadPost] = useState(true);
  const [count, setCount] = useState(5);
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.postReducer);

  const loadMore = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >
      document.scrollingElement.scrollHeight
    ) {
      setLoadPost(true);
    }
  };

  useEffect(() => {
    if (loadPost) {
      dispatch(getPosts(count));
      setLoadPost(false);
      setCount(count + 5);
    }

    window.addEventListener("scroll", loadMore);
    return () => window.removeEventListener("scroll", loadMore);
  }, [loadPost, dispatch, count]);

  return userIdCtx ? (
    <div className="w-screen h-screen pb-16 sm:pb-20 flex items-center ">
      <div className="hidden md:block">
        <ProfilHead userId={userId} />
      </div>

      <div className="w-screen h-screen pt-10 pb-16 sm:pb-20 overflow-y-auto scrollbar-hide md:pr-30">
        <div className="block md:hidden">
          <ProfilHead userId={userId} tabletToMobile={true} />
        </div>

        <div className="mx-auto max-w-md md:max-w-lg lg:max-w-2xl">
          {userId === userIdCtx && <NewPostFrom />}
          {!isEmpty(posts[0]) ? (
            posts.map((post) => {
              return (
                userId === post.posterId && (
                  <PostCard post={post} key={post._id} />
                )
              );
            })
          ) : (
            <p>Aucun post</p>
          )}
        </div>
      </div>
    </div>
  ) : (
    //faire une redirection sur la page de connexion
    <div> se connecter</div>
  );
}

export default Profil;
