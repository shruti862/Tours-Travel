import styles from "./Navbar.module.css";
import logo from "../../public/logo-white.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { PostContext } from "../App";
import { useState, useContext, useEffect } from "react";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
function Navbar() {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useContext(PostContext);
  const [user, setUser] = useState({});
  useEffect(() => {
    const loggedIn = Cookies.get("isLoggedIn");
    if (loggedIn === "true") {
      setIsLoggedIn(true);
    }
  }, [setIsLoggedIn]);
  useEffect(() => {
    const fetchData = async () => {
      if (!isLoggedIn) return;
      try {
        const response = await axios({
          method: "GET",
          url: "http://localhost:3000/api/v1/users/me",
          withCredentials: true,
        });

        setUser(response.data.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [isLoggedIn]);

  const handleLogout = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/v1/users/logout", {
        withCredentials: true,
      });
      if (res.data.status == "success") {
        Cookies.set("isLoggedIn", "false");
        setIsLoggedIn(false);
        toast.success("Logged out successfully!");
        navigate("/");

        // Refresh the page
        // window.location.reload();
      }
    } catch (err) {
      console.log(err.response);
    }
  };
  const formatName = (name) => {
    return name?.split(" ")[0];
  };
  return (
    <header className={styles.header}>
      <nav className={styles.nav.nav__tours}>
        <Link to={"/"} className={styles.nav__el}>
          All tours
        </Link>
      </nav>
      <div className={styles.header__logo}>
        <img src={logo} alt="Natours logo" />
      </div>
      <nav className={`${styles.nav} ${styles.nav__user}`}>
        {isLoggedIn ? (
          <>
            <button className={styles.nav__el} onClick={handleLogout}>
              Log Out
            </button>

            <Link to={"/me"} className={styles.nav__el}>
              <img
                src={`http://localhost:3000/img/users/` + user.photo}
                alt="User photo"
                className={styles.nav__user_img}
              />
              <span>{formatName(user.name)}</span>
            </Link>
          </>
        ) : (
          <>
            <Link to={"/login"}>
              <button className={styles.nav__el}>Log in</button>
            </Link>
            <Link to={"/signup"}>
              <button className={`${styles.nav__el} ${styles.nav__el__cta}`}>
                Sign up
              </button>
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
