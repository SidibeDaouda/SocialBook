import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../store/actions/post.actions";
import { isEmpty } from "../utils/utils";
import PostCard from "./post/PostCard";
import NewPostFrom from "./post/NewPostForm";

function Feed() {
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

  return (
    <div className="flex-grow h-screen pb-16 sm:pb-20 pt-6 mx-0 sm:mr-3 xl:mx-0 overflow-y-auto scrollbar-hide md:pr-30 md:pl-4">
      <div className="mx-auto max-w-md md:max-w-lg lg:max-w-2xl ">
        <NewPostFrom />
        {!isEmpty(posts[0]) &&
          posts.map((post) => {
            return <PostCard post={post} key={post._id} />;
          })}
      </div>
    </div>
  );
}

export default Feed;
