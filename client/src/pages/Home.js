import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../components/Navigation/Sidebar";
import PostCard from "../components/post/PostCard";
import { getPosts } from "../store/actions/post.actions";
import { isEmpty } from "../utils/utils";
import NewPostForm from "../components/post/NewPostForm";
function Home() {
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.postReducer);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <div className="flex justify-center w-full ">
      <Sidebar userData={userData} />

      <div className="w-4/5 h-screen pb-16 sm:pb-20 overflow-y-auto scrollbar-hide md:pr-30">
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
