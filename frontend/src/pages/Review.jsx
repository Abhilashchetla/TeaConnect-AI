import { useEffect, useState } from "react";
import API from "../services/api";

function Review({ productId }) {
  const [reviews, setReviews] = useState([]);

  const [rating, setRating] = useState(5);

  const [comment, setComment] = useState("");

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    const res = await API.get(`/reviews/product/${productId}/`);

    setReviews(res.data);
  };

  const submit = async () => {
    await API.post("/reviews/add/", {
      user: 1,

      product: productId,

      rating,

      comment,
    });

    loadReviews();
  };

  return (
    <div>
      <h3>Reviews</h3>

      <input
        type="number"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
      />

      <textarea value={comment} onChange={(e) => setComment(e.target.value)} />

      <button onClick={submit}>Submit Review</button>

      {reviews.map((review) => (
        <div key={review.id} className="review-card">
          <h4>{"⭐".repeat(review.rating)}</h4>

          <p>{review.comment}</p>
        </div>
      ))}
    </div>
  );
}

export default Review;
