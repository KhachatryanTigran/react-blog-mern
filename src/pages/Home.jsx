import React, { useEffect } from "react";
import s from "./Home.module.scss";
import Post from "../components/Post";
import Tags from "../components/Tags";
import Coments from "../components/Coments";
import { fetchPosts, fetchTags, getPosts } from "../redux/slices/posts";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuid } from "uuid";

const Home = () => {
  const userData = useSelector((state) => state.auth.data);
  const { posts, tags } = useSelector((state) => state.posts);
  const isPostLoading = posts.status === "loading";
  const isTagsLoading = tags.status === "loading";
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchTags());
  }, []);

  return (
    <div className={s.home}>
      {" "}
      <div>
        <button>new </button> <button>pop r</button>{" "}
      </div>
      <div className={s.wraper}>
        <div className={s.content}>
          {(isPostLoading ? [] : posts.items).map((post) => {
            return isPostLoading ? (
              <Post isLoading={true} key={uuid()} />
            ) : (
              <Post
                key={uuid()}
                isEditable={userData ? userData._id === post.user._id : false}
                {...post}
              />
            );
          })}
        </div>
        <div className={s.sidebar}>
          <div className={s.tags}>
            {(isTagsLoading ? [] : tags.items).map((tag) => {
              return isTagsLoading ? (
                <Tags isLoading={true} key={uuid()} />
              ) : (
                <Tags key={uuid()} tag={tag} />
              );
            })}
          </div>
          <div className={s.coments}>
            <Coments /> <Coments /> <Coments />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
