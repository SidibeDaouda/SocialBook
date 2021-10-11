import React, { useEffect, useState /*useContext*/ } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../components/Navigation/Sidebar";
import PostCard from "../components/post/PostCard";
import { getPosts } from "../store/actions/post.actions";
import { isEmpty } from "../utils/utils";
import NewPostForm from "../components/post/NewPostForm";
function Home() {
  const userData = useSelector((state) => state.userReducer);
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
    <div className="flex justify-center w-full">
      <Sidebar userData={userData} />

      <div className="w-screen h-screen pb-16 sm:pb-20 overflow-y-auto scrollbar-hide md:pr-30">
        <div className="mx-auto max-w-md md:max-w-lg lg:max-w-2xl ">
          <NewPostForm />
          {!isEmpty(posts[0]) &&
            posts.map((post) => {
              return <PostCard post={post} key={post._id} />;
            })}
        </div>
      </div>

      {/* <Widgets /> */}
    </div>
  );
}

export default Home;
