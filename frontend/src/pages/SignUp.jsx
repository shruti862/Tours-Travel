import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import styles from "./SignUp.module.css";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios({
        method: "post",

        url: "https://tours-travel-5ebw.vercel.app/api/v1/users/signup",
        withCredentials: true,
        data: {
          name: name,
          email: email,
          password: password,
          passwordConfirm: passwordConfirm,
        },
      });

      if (response.data.status === "success") {
        toast.success("Signed up  successfully!. Now Log in your account.   ");

        navigate("/login");
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        // Specific error message from backend
        toast.error(err.response.data.message + "  Please login your account ");
        navigate("/login");
      } else {
        // General error message
        toast.error(err.message);
      }
    }
  };
  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.login_form}>
          <h2 className={`${styles.heading_secondary}  ${styles.ma_bt_lg}`}>
            Sign Up to create a new account
          </h2>
          <form
            className={`${styles.form} ${styles.form__login}`}
            onSubmit={handleSubmit}
          >
            <div className={styles.form__group}>
              <label className={styles.form__label} htmlFor="name">
                Full Name
              </label>
              <input
                id="name"
                className={styles.form__input}
                type="name"
                required
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
            <div className={styles.form__group}>
              <label className={styles.form__label} htmlFor="email">
                Email address
              </label>
              <input
                id="email"
                className={styles.form__input}
                type="email"
                placeholder="you@example.com"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className={`${styles.form__group} ${styles.ma_bt_md}`}>
              <label className={styles.form__label} htmlFor="password">
                Password
              </label>
              <input
                id="password"
                className={styles.form__input}
                type="password"
                placeholder="••••••••"
                required
                minLength="8"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <div className={`${styles.form__group} ${styles.ma_bt_md}`}>
              <label className={styles.form__label} htmlFor="confirm-password">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                className={styles.form__input}
                type="password"
                placeholder="••••••••"
                required
                minLength="8"
                value={passwordConfirm}
                onChange={(e) => {
                  setPasswordConfirm(e.target.value);
                }}
              />
            </div>
            <div className={styles.form__group}>
              <button
                className={`${styles.btn} ${styles.btn__green}`}
                type="submit"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default SignUp;
