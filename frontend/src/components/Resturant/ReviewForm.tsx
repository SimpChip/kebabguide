import { useState } from "react";
import { useParams } from "react-router-dom";

const ReviewForm = () => {
  const { resturantId } = useParams<string>();
  const [comment, setComment] = useState<String>("");
  const [reviewRating, setReviewRating] = useState<number>(1);

  const [error, setError] = useState<string | null>();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let userId = "645b452c19cfec369c5c3cf7";
    let itemId = ""; //TODO proble mhere
    let reviewUpvotes: string[] = [];
    let reviewDownvotes: string[] = [];

    const review = {
      userId,
      resturantId,
      itemId,
      reviewRating,
      comment,
      reviewUpvotes,
      reviewDownvotes,
    };

    const response = await fetch(`/api/review`, {
      method: "POST",
      body: JSON.stringify(review),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }

    if (response.ok) {
      setError(null);
      console.log("new review added");
    }
  };
  return (
    <form className="flex flex-col w-2/4 p-2" onSubmit={handleSubmit}>
      <h2 className="pb-2 pl-2">Leave a review</h2>
      <textarea
        className="p-1 border-2 border-black"
        onChange={(e) => setComment(e.target.value)}
        value={comment as string}
      />

      <div className="flex my-2 item-center">
        <div className="flex items-center w-4/5">
          Rating
          <input
            className="w-full mx-2 cursor-pointer"
            onChange={(e) => setReviewRating(parseInt(e.target.value))}
            value={reviewRating}
            type="range"
            min={1}
            max={5}
            step={1}
          />
        </div>
        <input
          className="w-1/5 p-2 bg-white border-2 border-black cursor-pointer hover:shadow-md"
          type="submit"
          value="Submit"
        />
        {error && <div>{error}</div>}
      </div>
    </form>
  );
};

export default ReviewForm;
