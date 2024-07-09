import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Mapp from "../components/Mapp";
import ReviewCard from "../components/ReviewCard";
import axios from "axios";
import { PostContext } from "../App";
import { useState, useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./Tour.module.css";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51PWBvWCbRb0NQUhQriWEI1fIctn283V9uwRwMq0POoRC3497joCYE2FzEMH9HmeeeEVZrxnjpgZ5UXOdwnEHLbTH00UEVlJAp1"
);
function Tour() {
  const { slug } = useParams();
  const [tourData, setTourData] = useState({});
  const { isLoggedIn } = useContext(PostContext);
  useEffect(() => {
    const fetchTourData = async () => {
      try {
        const response = await axios({
          method: "GET",
          url: `https://tours-travel-backend-one.vercel.app/tour/${slug}`,
        });

        setTourData(response.data.data.tour);
      } catch (error) {
        console.error("Error fetching tour data:", error);
      }
    };

    fetchTourData();
  }, [slug]);

  const handlebookTour = async (e, tourId) => {
    e.preventDefault();
    e.target.textContent = "Processing...";
    try {
      const {
        data: { session },
      } = await axios({
        method: "GET",
        url: `https://tours-travel-backend-one.vercel.app/api/v1/bookings/checkout-session/${tourId}`,
        withCredentials: true,
      });

      const stripe = await stripePromise;
      await stripe.redirectToCheckout({ sessionId: session.id });
    } catch (err) {
      console.error(err);
    }
  };
  const formatDate = (tour) => {
    const date =
      tour.startDates && tour.startDates.length > 0
        ? new Date(tour.startDates[0]).toLocaleString("en-us", {
            month: "long",
            year: "numeric",
          })
        : "No date available";
    return date;
  };

  return (
    <>
      <Navbar />

      <section className={styles.section_header}>
        <div className={styles.header_hero}>
          <div className={styles.header__hero_overlay}></div>
          <img
            className={styles.header__hero_img}
            src={`https://tours-travel-backend-one.vercel.app/img/tours/${tourData.imageCover}`}
            alt={`${tourData.name}`}
          />
        </div>

        <div className={styles.headingBox}>
          <h1 className={styles.headingPrimary}>
            <span>{tourData.name}</span>
          </h1>
          <div className={styles.headingBoxGroup}>
            <div className={styles.headingBoxDetail}>
              <svg className={styles.headingBoxIcon}>
                <use xlinkHref="/icons.svg#icon-clock"></use>
              </svg>
              <span className={styles.headingBoxText}>
                {tourData.duration} days
              </span>
            </div>
            <div className={styles.headingBoxDetail}>
              <svg className={styles.headingBoxIcon}>
                <use xlinkHref="img/icons.svg#icon-map-pin"></use>
              </svg>
              <span className={styles.headingBoxText}>
                {tourData.startLocation?.description}
              </span>
            </div>
          </div>
        </div>
      </section>
      <section className={styles.sectionDescription}>
        <div className={styles.overviewBox}>
          <div>
            <div className={styles.overviewBoxGroup}>
              <h2 className={`${styles.headingSecondary} ${styles.maBtLg}`}>
                Quick facts
              </h2>
              <div className={styles.overviewBoxDetail}>
                <svg className={styles.overviewBoxIcon}>
                  <use xlinkHref="img/icons.svg#icon-calendar"></use>
                </svg>
                <span className={styles.overviewBoxLabel}>Next date</span>
                <span className={styles.overviewBoxText}>
                  {formatDate(tourData)}
                </span>
              </div>
              <div className={styles.overviewBoxDetail}>
                <svg className={styles.overviewBoxIcon}>
                  <use xlinkHref="img/icons.svg#icon-trending-up"></use>
                </svg>
                <span className={styles.overviewBoxLabel}>Difficulty</span>
                <span className={styles.overviewBoxText}>
                  {tourData.difficulty}
                </span>
              </div>
              <div className={styles.overviewBoxDetail}>
                <svg className={styles.overviewBoxIcon}>
                  <use xlinkHref="img/icons.svg#icon-user"></use>
                </svg>
                <span className={styles.overviewBoxLabel}>Participants</span>
                <span className={styles.overviewBoxText}>
                  {tourData.maxGroupSize}
                </span>
              </div>
              <div className={styles.overviewBoxDetail}>
                <svg className={styles.overviewBoxIcon}>
                  <use xlinkHref="img/icons.svg#icon-star"></use>
                </svg>
                <span className={styles.overviewBoxLabel}>Rating</span>
                <span className={styles.overviewBoxText}>
                  {tourData.ratingsAverage} / 5
                </span>
              </div>
            </div>

            <div className={styles.overviewBoxGroup}>
              <h2 className={`${styles.headingSecondary} ${styles.maBtLg}`}>
                Your tour guides
              </h2>

              {tourData.guides?.map((guide, idx) => (
                <div className={styles.overviewBoxDetail} key={idx}>
                  <img
                    src={`https://tours-travel-backend-one.vercel.app/img/users/${guide.photo}`}
                    alt={`${guide.name}`}
                    className={styles.overviewBoxImg}
                  />
                  <span className={styles.overviewBoxLabel}>{guide.role}</span>
                  <span className={styles.overviewBoxText}>{guide.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.descriptionBox}>
          <h2 className={`${styles.headingSecondary} ${styles.maBtLg}`}>
            About the {tourData.name} tour
          </h2>
          {tourData.description?.split("\n").map((paragraph, index) => (
            <p className={styles.descriptionText} key={index}>
              {paragraph}
            </p>
          ))}
        </div>
      </section>
      <section className={styles.sectionPictures}>
        {tourData.images?.map((image, idx) => (
          <div className={styles.pictureBox} key={idx}>
            <img
              src={`https://tours-travel-backend-one.vercel.app/img/tours/${image}`}
              alt={`The Park Camper Tour ${idx + 1}`}
              className={`${styles.pictureBoxImg} ${
                styles[`pictureBoxImg${idx + 1}`]
              }`}
            />
          </div>
        ))}
      </section>
      <section className={styles.sectionMap}>
        {tourData.locations && <Mapp locations={tourData.locations} />}
      </section>

      <section className={styles.sectionReviews}>
        <div className={styles.reviews}>
          <ReviewCard Review={tourData.reviews} />
        </div>
      </section>
      <section className={styles.sectionCta}>
        <div className={styles.cta}>
          <div className={`${styles.ctaImg} ${styles.ctaImgLogo}`}>
            <img src={`/logo-white.png`} alt="Natours logo" className="" />
          </div>
          <img
            src={"/img/tours/tour-5-2.jpg"}
            alt=""
            className={`${styles.ctaImg} ${styles.ctaImg1}`}
          />
          <img
            src={`/img/tours/tour-5-1.jpg`}
            alt=""
            className={`${styles.ctaImg} ${styles.ctaImg2}`}
          />

          <div className={styles.ctaContent}>
            <h2 className={styles.headingSecondary}>
              What are you waiting for?
            </h2>
            <p className={styles.ctaText}>
              {tourData.duration} days. 1 adventure. Infinite memories. Make it
              yours today!
            </p>
            {isLoggedIn ? (
              <button
                className={`${styles.btn} ${styles.btnGreen} ${styles.spanAllRows}`}
                onClick={(e) => handlebookTour(e, tourData.id)}
              >
                Book tour now!
              </button>
            ) : (
              <Link to={"/login"}>
                <div
                  className={`${styles.btn} ${styles.btnGreen} ${styles.spanAllRows}`}
                >
                  Log in to book tour
                </div>
              </Link>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Tour;
