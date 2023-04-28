import { Avatar } from "@mui/material";
import React from "react";
import s from "./Coments.module.scss";
const Coments = () => {
  return (
    <div className={s.coments}>
      <Avatar />
      <div className={s.text_block}>
        <h4>Tigran</h4>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet
          distinctio veniam ducimus rem a cum voluptatibus, deleniti incidunt
          minus, aliquam iste mollitia nihil? Aut a officia praesentium ratione
          maiores recusandae!
        </p>
      </div>
    </div>
  );
};

export default Coments;
