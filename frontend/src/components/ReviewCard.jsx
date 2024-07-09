import styles from "./ReviewCard.module.css";
function ReviewCard({ Review }) {
  const stars = [1, 2, 3, 4, 5];
  return Review?.map((review, idx) => (
    <div className={styles.reviews__card} key={idx}>
      <div className={styles.reviews__avatar}>
        <img
          src={`https://tours-travel-api.vercel.app/img/users/${review.user.photo}`}
          alt="Ben Hadley"
          className={styles.reviews__avatar_img}
        />
        <h6 className={styles.reviews__user}>{review.user.name}</h6>
      </div>
      <p className={styles.reviews__text}>{review.review}</p>
      <div className={styles.reviews__rating}>
        {stars.map((star) => (
          <svg
            key={star}
            className={`${styles.reviews__star} ${
              review.rating >= star
                ? styles.reviews__star__active
                : styles.reviews__star__inactive
            }`}
          >
            <use xlinkHref="/public/icons.svg#icon-star"></use>
          </svg>
        ))}
      </div>
    </div>
  ));
}

export default ReviewCard;
