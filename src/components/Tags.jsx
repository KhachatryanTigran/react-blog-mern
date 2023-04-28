import React from "react";
import s from "./Tags.module.scss";
import TagIcon from "@mui/icons-material/Tag";
const Tags = ({ tag }) => {
  return (
    <div className={s.tags}>
      {" "}
      <TagIcon /> <span>{tag}</span>
    </div>
  );
};

export default Tags;
