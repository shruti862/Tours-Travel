import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "./Homepage.module.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
function Homepage() {
  const [tours, setTours] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios({
          method: "GET",
          url: "https://tours-travel-api.vercel.app/",
        });

        setTours(response.data.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
  const formatDate = (isoDateString) => {
    const date = new Date(isoDateString);
    return date.toLocaleString("en-US", { month: "long", year: "numeric" });
  };
  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.card_container}>
          {tours.map((tour) => (
            <div className={styles.card} key={tour.id}>
              <div className={styles.card__header}>
                <div className={styles.card__picture}>
                  <div className={styles.card__picture_overlay}>&nbsp;</div>

                  <img
                    src={`http://localhost:3000/img/tours/${tour.imageCover}`}
                    alt={tour.name}
                    className={styles.card__picture_img}
                  />
                </div>

                <h3 className={styles.heading_tertirary}>
                  <span>{tour.name}</span>
                </h3>
              </div>

              <div className={styles.card__details}>
                <h4 className={styles.card__sub_heading}>
                  {tour.difficulty} {tour.duration}-day tour
                </h4>
                <p className={styles.card__text}>{tour.summary}</p>
                <div className={styles.card__data}>
                  <svg className={styles.card__icon}>
                    <use xlinkHref="./icons.svg#icon-map-pin"></use>
                  </svg>
                  <span>{tour.startLocation.description}</span>
                </div>
                <div className={styles.card__data}>
                  <svg className={styles.card__icon}>
                    <use xlinkHref="./icons.svg#icon-calendar"></use>
                  </svg>
                  <span>{formatDate(tour.startDates[0])}</span>
                </div>
                <div className={styles.card__data}>
                  <svg className={styles.card__icon}>
                    <use xlinkHref="./icons.svg#icon-flag"></use>
                  </svg>
                  <span>{tour.locations.length} stops</span>
                </div>
                <div className={styles.card__data}>
                  <svg className={styles.card__icon}>
                    <use xlinkHref="./icons.svg#icon-user"></use>
                  </svg>
                  <span>{tour.maxGroupSize} people</span>
                </div>
              </div>

              <div className={styles.card__footer}>
                <p>
                  <span className={styles.card__footer_value}>
                    ${tour.price}
                  </span>
                  <span
                    className={styles.card__footer_text}
                    style={{ marginLeft: "0.5rem" }}
                  >
                    per person
                  </span>
                </p>
                <p className={styles.card__ratings}>
                  <span className={styles.card__footer_value}>
                    {tour.ratingsAverage}
                  </span>
                  <span
                    className={styles.card__footer_text}
                    style={{ marginLeft: "0.5rem" }}
                  >
                    rating ({tour.ratingsQuantity})
                  </span>
                </p>
                <Link
                  to={`/tour/${tour.slug}`}
                  className={`${styles.btn} ${styles.btn__green} ${styles.btn__small}`}
                >
                  Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Homepage;
