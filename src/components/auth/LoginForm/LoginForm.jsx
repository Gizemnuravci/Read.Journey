import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import { loginSchema } from "../../../schemas/authValidation";
import SpriteIcon from "../../common/SpriteIcon/SpriteIcon";
import styles from "./LoginForm.module.css";

export default function LoginForm({ onSubmit }) {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: "onSubmit",
  });

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className={styles.field}>
        <label htmlFor="email" className={styles.label}>
          Mail:
        </label>
        <input
          id="email"
          type="email"
          placeholder="Your@email.com"
          className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
          {...register("email")}
        />
        {errors.email && (
          <span className={styles.error}>{errors.email.message}</span>
        )}
      </div>

      <div className={styles.field}>
        <label htmlFor="password" className={styles.label}>
          Password:
        </label>
        <div className={styles.passwordWrapper}>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Yourpasswordhere"
            className={`${styles.input} ${errors.password ? styles.inputError : ""}`}
            {...register("password")}
          />
          <button
            type="button"
            className={styles.eyeBtn}
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            <SpriteIcon
              id={showPassword ? "icon-eye-off" : "icon-eye-2"}
              className={styles.eyeIcon}
            />
          </button>
        </div>
        {errors.password && (
          <span className={styles.error}>{errors.password.message}</span>
        )}
      </div>

      <div className={styles.actions}>
        <button type="submit" className={styles.btnSubmit}>
          Log in
        </button>
        <Link to="/register" className={styles.link}>
          Don&apos;t have an account?
        </Link>
      </div>
    </form>
  );
}
