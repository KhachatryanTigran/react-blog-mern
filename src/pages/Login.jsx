import React from "react";
import { useForm } from "react-hook-form";
import s from "./Auth.module.scss";
import CloseIcon from "@mui/icons-material/Close";
import { NavLink, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuth } from "../redux/slices/auth";

const Login = () => {
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm();
  const onSubmit = (data) => dispatch(fetchAuth(data));
  const data = useSelector((state) => state.auth);

  if (data.data) {
    return <Navigate to="/" />;
  }

  console.log(data);
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={s.auth_block}>
      <div className={s.close}>
        <NavLink to="/ " className="">
          <CloseIcon />
        </NavLink>
      </div>
      <h1 className={s.title}>Login</h1>
      <label className={s.label} htmlFor="email">
        Email
      </label>
      <input
        placeholder="Email Address"
        className={s.input}
        error={Boolean(errors.email?.message)}
        {...register("email", {
          required: "Email Address is required",
          pattern: /^\S+@\S+$/i,
        })}
        aria-invalid={errors.email ? "true" : "false"}
      />
      {errors.email && (
        <p role="alert" className={s.warning}>
          {errors.email?.message || "must use example@email.asd"}
        </p>
      )}
      <label className={s.label} htmlFor="password">
        Password
      </label>
      <input
        placeholder="Password"
        className={s.input}
        error={Boolean(errors.password?.message)}
        {...register("password", {
          minLength: 5,
          required: "Password is required",
        })}
        aria-invalid={errors.password ? "true" : "false"}
      />
      {errors.password && (
        <p role="alert" className={s.warning}>
          {errors.password?.message ||
            "Password is so short must include minimum 6 character"}
        </p>
      )}{" "}
      <input type="submit" value="Login" className={s.button} />
      <NavLink to="/register" className="">
        {" "}
        Register new account
      </NavLink>{" "}
    </form>
  );
};

export default Login;
