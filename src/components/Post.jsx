import React from "react";
import s from "./Post.module.scss";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import ImageAvatars from "../UI/Avatar";
import { NavLink } from "react-router-dom";
import parse from "html-react-parser";
import draftToHtml from "draftjs-to-html";
import { useDispatch, useSelector } from "react-redux";
import { fetchRemovePost } from "../redux/slices/posts";

const Post = ({
  text,
  title,
  tags,
  createdAt,
  updatedAt,
  viewsCount,
  isLoading,
  _id,
  user,
  imageUrl,
  isEditable,
}) => {
  const isAuth = useSelector((state) => state.auth.data);
  const dispatch = useDispatch();
  const onClickRemove = () => {
    dispatch(fetchRemovePost({ _id, token: isAuth.token }));
  };
  if (isLoading) {
    return <p>loading</p>;
  }

  return (
    <div className={s.post}>
      <div className={s.top_box}>
        {isEditable && (
          <div className={s.icons}>
            <NavLink to={`/posts/${_id}/edit`}>
              {" "}
              <EditIcon
                htmlColor="rgb(184, 94, 206)"
                sx={{ padding: "10px", cursor: "pointer" }}
              />
            </NavLink>
            <CloseIcon
              onClick={() => onClickRemove()}
              htmlColor="#1a23cfc8"
              sx={{ padding: "10px", cursor: "pointer" }}
            />
          </div>
        )}
        <div className={s.title_box}>
          <NavLink to={`/posts/${_id}`}>
            {imageUrl ? (
              <img src={imageUrl} className={s.img} />
            ) : (
              <h1 className={s.header_title}>{title}</h1>
            )}
          </NavLink>
          <h2 className={s.header_title}> {}</h2>
        </div>
      </div>
      <div className={s.buttom_box}>
        <div className={s.logo}>
          <ImageAvatars src={user?.avatarUrl} />
          <h4>{user.fullName}</h4>
        </div>
        <div className={s.info}>
          <span className={s.date}>{updatedAt}</span>
          <h1 className={s.title}> {title}</h1>{" "}
          <p>
            {(() => {
              try {
                return parse(`${draftToHtml(JSON.parse(text))}`);
              } catch (error) {
                return text;
              }
            })()}{" "}
          </p>
          <span className={s.tags}> {tags}</span>
          <div className={s.views}> {viewsCount}</div>
        </div>
      </div>
    </div>
  );
};

export default Post;
