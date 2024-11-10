import { useState } from "react";
import { useForm } from "react-hook-form";

import Axios from "axios";
import styles from "./Login.module.css";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  /*
 For creating an admin user:-

  async function registerAdmin() {
    const username = "hukum Gupta";
    const password = "Austin@123";

    try {
      setIsLoading(true);

      const { data } = await Axios.post(
        "http://localhost:5000/api/admin/register",
        { username, password },
        { withCredentials: true }
      );
      console.log({ adminData: data });
      toast.success("Admin Registered Successfully!", {
        duration: 3000,
        style: {
          backgroundColor: "green",
          color: "white",
        },
        closeButton: true, // This will add a close button to the toast
      });
    } catch (err) {
      console.log(err.message);
      toast.error("Admin not Registered Successfully. Please try again.", {
        duration: 5000,
        style: {
          backgroundColor: "red",
          color: "white",
        },
        closeButton: true, // This will add a close button to the toast
      });
    } finally {
      setIsLoading(false);
    }
  }
    
*/

  async function onSubmit(formdata) {
    try {
      setIsLoading(true);
      const { data } = await Axios.post(
        "http://localhost:5000/api/admin/login",
        {
          username: formdata.username.trim(),
          password: formdata.password.trim(),
        },
        { withCredentials: true }
      );

      localStorage.setItem("userAdmin", JSON.stringify(data));
      toast.success("Login Successful!", {
        duration: 3000,
        style: {
          backgroundColor: "green",
          color: "white",
        },
        closeButton: true,
      });
      navigate("/app");
      reset();
    } catch (err) {
      console.log(`${err.message}`);
      toast.error("Login Failed. Please try again.", {
        duration: 5000,
        style: {
          backgroundColor: "red",
          color: "white",
        },
        closeButton: true,
      });
    } finally {
      setIsLoading(false);
    }
  }

  function togglePasswordVisibility(e) {
    setShowPassword((sh) => !sh);
    e.stopPropagation();
  }

  return (
    <div className={styles.loginContainer}>
      <h2 className={styles.title}>Admin Login Page</h2>
      <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputGroup}>
          <label htmlFor="username" className={styles.label}>
            User Name
          </label>
          <input
            type="text"
            id="username"
            className={styles.input}
            {...register("username", {
              required: "This field is required",
              validate: (value) =>
                value.trim() !== "" || "Username cannot be empty",
            })}
          />
          {errors?.username && (
            <p className={styles.error}>{errors.username.message}</p>
          )}
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="password" className={styles.label}>
            Password
          </label>
          <div className={styles.passwordContainer}>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className={styles.input}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className={styles.passwordToggleBtn}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          {errors?.password && (
            <p className={styles.error}>{errors.password.message}</p>
          )}
        </div>

        <button type="submit" className={styles.submitBtn}>
          {isLoading ? "Loading..." : "Login"}
        </button>
      </form>
      {/* 
         For creating an admin user:-

        <button className={styles.submitBtn} onClick={registerAdmin}>
          {isLoading ? "Loading..." : "Register as an Admin"}
        </button> 
      */}
    </div>
  );
}

export default Login;
