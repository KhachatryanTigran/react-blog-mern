import { Avatar } from "@mui/material";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Button from "@mui/material/Button";
import s from "./Header.module.scss";
import HomeIcon from "@mui/icons-material/Home";
import { useDispatch } from "react-redux";
import { logout } from "../redux/slices/auth";
const Header = () => {
  const dispatch = useDispatch();
  const [isAuth, setIsAuth] = useState(true);
  const onClickLogout = () => {
    dispatch(logout());
  };
  return (
    <div className={s.header}>
      <div>
        <NavLink to="/ " className="">
          <HomeIcon color="success" />
          <span className={s.blog_name}>REACT BLOG </span>
        </NavLink>
      </div>
      {isAuth ? (
        <div className={s.looged}>
          <Avatar />{" "}
          <NavLink to="/add-post" className={s.post_link}>
            <Button>Make post</Button>
          </NavLink>
          <NavLink to="/login" className={s.post_link}>
            <Button variant="contained" color="error" onClick={onClickLogout}>
              LogOut
            </Button>
          </NavLink>
        </div>
      ) : (
        <div>
          <NavLink to="/register" className={s.auth_link}>
            Register
          </NavLink>
          <NavLink to="/login" className={s.auth_link}>
            Login
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default Header;
