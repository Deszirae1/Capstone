
import { useState } from "react";
import ReviewForm from "./ReviewForm";
import { useParams, useNavigate } from "react-router-dom";

function CreateReview({ auth, reviewFormAction, businesses }) {
  const { businessId } = useParams();  // Get businessId from the URL
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    rating: 1,
  });

  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the review data
    const reviewData = {
      title: formData.title,
      description: formData.description,
      rating: formData.rating,
      user_id: auth.id,  // User ID from the auth prop
      business_id: businessId,  // Business ID from the URL
    };

    // Call the reviewFormAction to submit the review
    await reviewFormAction(reviewData);

    // Redirect or show success message
    navigate(`/businesses/${businessId}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Review Title"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        required
      />
      <textarea
        placeholder="Review Description"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        required
      />
      <input
        type="number"
        value={formData.rating}
        min="1"
        max="5"
        onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
        required
      />
      <button type="submit">Submit Review</button>
    </form>
  );
}

export default CreateReview;



