import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import styles from "./Login.module.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios({
        method: "post",

        url: "https://tours-travel-5ebw.vercel.app/api/v1/users/login",
        withCredentials: true,
        data: {
          email: email,
          password: password,
        },
      });

      if (response.data.status === "success") {
        toast.success("Logged in successfully!");

        Cookies.set("isLoggedIn", "true");
        navigate("/");
      } else {
        toast.error(response.data.message); // Display error message from API
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error("Incorrect email or password. Please try again.");
      } else {
        console.error("Error during login:", error);
        toast.error("Login failed. Please try again.");
      }
    }
  };
  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.login_form}>
          <h2 className={`${styles.heading_secondary}  ${styles.ma_bt_lg}`}>
            Log into your account
          </h2>
          <form
            className={`${styles.form} ${styles.form__login}`}
            onSubmit={handleSubmit}
          >
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
            <div className={styles.form__group}>
              <button
                className={`${styles.btn} ${styles.btn__green}`}
                type="submit"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Login;
