import { useForm } from "react-hook-form";
import s from "./Auth.module.scss";
import CloseIcon from "@mui/icons-material/Close";
import { NavLink, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuth, fetchRegister } from "../redux/slices/auth";
export default function Register() {
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit,
    isValid,
  } = useForm();

  const onSubmit = async (data) => dispatch(fetchRegister(data));
  const data = useSelector((state) => state.auth);
  if (data.data) {
    return <Navigate to="/" />;
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={s.auth_block}>
      {" "}
      <div className={s.close}>
        <NavLink to="/ " className="">
          <CloseIcon />
        </NavLink>
      </div>
      <h1 className={s.title}>Register Account</h1>
      <label htmlFor="fullName" className={s.label}>
        FullName
      </label>
      <input
        className={s.input}
        {...register("fullName", { required: true })}
        aria-invalid={errors.fullName ? "true" : "false"}
      />
      {errors.fullName?.type === "required" && (
        <p role="alert" className={s.warning}>
          Full name is required
        </p>
      )}
      <label htmlFor="email" className={s.label}>
        Email
      </label>
      <input
        className={s.input}
        {...register("email", {
          required: "Email Address is required",
          pattern: /^\S+@\S+$/i,
        })}
        aria-invalid={errors.email ? "true" : "false"}
      />
      {errors.email && (
        <p className={s.warning} role="alert">
          {errors.email?.message}
        </p>
      )}
      <label htmlFor="password" className={s.label}>
        Password
      </label>
      <input
        className={s.input}
        {...register("password", {
          minLength: 5,
          required: "Password is required",
        })}
        aria-invalid={errors.password ? "true" : "false"}
      />
      {errors.password && (
        <p className={s.warning} role="alert">
          {errors.password?.message}
        </p>
      )}
      <input
        {...register("file", {
          required: "Photo is required",
        })}
        hidden
        type="file"
        id="file"
        {...register("file")}
      />
      <label htmlFor="file" className={s.label_avatar}>
        <img
          src={"https://www.w3schools.com/howto/img_avatar.png"}
          alt=""
          style={{ maxWidth: "60px", maxHeight: "60px" }}
        />
        <span className={s.text}>Add an avatar</span>
      </label>
      {errors.file && (
        <p className={s.warning} role="alert">
          {errors.file?.message}
        </p>
      )}
      <input type="submit" value="Register" className={s.button} />
      <NavLink to="/login" className="">
        {" "}
        Already have an account
      </NavLink>{" "}
    </form>
  );
}
