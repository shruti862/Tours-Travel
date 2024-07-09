/* eslint-disable react/prop-types */
import Navbar from "../components/Navbar";
import styles from "./Profile.module.css";
import Footer from "../components/Footer";
import axios from "axios";
import { PostContext } from "../App";
import { useState, useContext, useEffect } from "react";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

const NavItem = ({ link, text, icon, active }) => (
  <li className={active ? styles["side-nav--active"] : ""}>
    <a href={link}>
      <svg>
        <use xlinkHref={`./icons.svg#icon-${icon}`} />
      </svg>
      {text}
    </a>
  </li>
);

function Profile() {
  const { isLoggedIn, setIsLoggedIn } = useContext(PostContext);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [photo, setPhoto] = useState();
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
          url: "https://tours-travel-tawny.vercel.app/api/v1/users/me",
          withCredentials: true,
        });

        setUser(response.data.data.data);
        setEmail(response.data.data.data.email);
        setName(response.data.data.data.name);
        // setPhoto(response.data.data.data.photo);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [isLoggedIn]);

  const handlePhotoChange = (event) => {
    setPhoto(event.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("photo", photo);

    try {
      const response = await axios({
        method: "PATCH",
        url: "https://tours-travel-tawny.vercel.app/api/v1/users/updateMe",
        withCredentials: true,
        data: formData,
      });
      if (response.status === 200) {
        toast.success("Updated successfully!");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios({
        method: "PATCH",
        url: "https://tours-travel-tawny.vercel.app/api/v1/users/updateMyPassword",
        withCredentials: true,
        data: {
          passwordCurrent: password,
          password: newPassword,
          passwordConfirm: confirmPassword,
        },
      });

      if (response.status === 200) {
        toast.success(" Password Updated successfully!");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error(error.response.data.message);
      } else {
        console.error("Error updating password:", error);
        toast.error("Password update failed. Please try again.");
      }
    }
  };

  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <div className={styles["user-view"]}>
          <nav className={styles["user-view__menu"]}>
            <ul className={styles["side-nav"]}>
              <NavItem link="#" text="Settings" icon="settings" active={true} />
              <NavItem link="/my-tours" text="My bookings" icon="briefcase" />
              <NavItem link="#" text="My reviews" icon="star" />
              <NavItem link="#" text="Billing" icon="credit-card" />
            </ul>
            {user?.role === "admin" && (
              <div className={styles["admin-nav"]}>
                <h5 className={styles["admin-nav__heading"]}>Admin</h5>
                <ul className={styles["side-nav"]}>
                  <NavItem link="#" text="Manage tours" icon="map" />
                  <NavItem link="#" text="Manage users" icon="users" />
                  <NavItem link="#" text="Manage reviews" icon="star" />
                  <NavItem link="#" text="Manage bookings" icon="briefcase" />
                </ul>
              </div>
            )}
          </nav>

          <div className={styles["user-view__content"]}>
            <div className={styles["user-view__form-container"]}>
              <h2
                className={`${styles["heading-secondary"]} ${styles["ma-bt-md"]}`}
              >
                Your account settings
              </h2>
              <form
                className={`${styles.form} ${styles["form-user-data"]}`}
                onSubmit={handleSubmit}
              >
                <div className={styles["form__group"]}>
                  <label className={styles["form__label"]} htmlFor="name">
                    Name
                  </label>
                  <input
                    id="name"
                    className={styles["form__input"]}
                    type="text"
                    value={name}
                    required
                    name="name"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div
                  className={`${styles["form__group"]} ${styles["ma-bt-md"]}`}
                >
                  <label className={styles["form__label"]} htmlFor="email">
                    Email address
                  </label>
                  <input
                    id="email"
                    className={styles["form__input"]}
                    type="email"
                    value={email}
                    required
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className={styles["form__group"]}>
                  <div className={styles["form__photo-upload"]}>
                    <img
                      className={styles["form__user-photo"]}
                      src={
                        `https://tours-travel-tawny.vercel.app/img/users/` +
                        user.photo
                      }
                      alt="User photo"
                    />
                    <input
                      className={styles["form__upload"]}
                      type="file"
                      accept="image/*"
                      id="photo"
                      name="photo"
                      onChange={handlePhotoChange}
                    />
                    <label htmlFor="photo">Choose new photo</label>
                  </div>
                </div>
                <div className={`${styles.right} ${styles["form__group"]}`}>
                  <button
                    className={`${styles.btn} ${styles["btn--small"]} ${styles["btn--green"]}`}
                  >
                    Save settings
                  </button>
                </div>
              </form>
            </div>

            <div className={styles.line}>&nbsp;</div>

            <div className={styles["user-view__form-container"]}>
              <h2
                className={`${styles["heading-secondary"]} ${styles["ma-bt-md"]}`}
              >
                Password change
              </h2>
              <form
                className={`${styles.form} ${styles["form-user-password"]}`}
              >
                <div className={styles["form__group"]}>
                  <label
                    className={styles["form__label"]}
                    htmlFor="password-current"
                  >
                    Current password
                  </label>
                  <input
                    id="password-current"
                    className={styles["form__input"]}
                    type="password"
                    placeholder="••••••••"
                    required
                    minLength="8"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className={styles["form__group"]}>
                  <label className={styles["form__label"]} htmlFor="password">
                    New password
                  </label>
                  <input
                    id="password"
                    className={styles["form__input"]}
                    type="password"
                    placeholder="••••••••"
                    required
                    minLength="8"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div
                  className={`${styles["form__group"]} ${styles["ma-bt-lg"]}`}
                >
                  <label
                    className={styles["form__label"]}
                    htmlFor="password-confirm"
                  >
                    Confirm password
                  </label>
                  <input
                    id="password-confirm"
                    className={styles["form__input"]}
                    type="password"
                    placeholder="••••••••"
                    required
                    minLength="8"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <div className={`${styles["form__group"]} ${styles.right}`}>
                  {/* <Link to={"/forgotPassword"}>
                    <div className={styles.form_link}>Forgot Password?</div>
                  </Link> */}
                  <button
                    className={`${styles.btn} ${styles["btn--small"]} ${styles["btn--green"]} ${styles["btn--save-password"]}`}
                    onClick={handlePasswordUpdate}
                  >
                    Save password
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Profile;
