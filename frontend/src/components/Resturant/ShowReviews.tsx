import { Link, useParams } from "react-router-dom";
import { FC, useEffect, useState } from "react";

import { ReviewDto, User, UserDto } from "../../types/types";

const ShowReviews = () => {
  const endre = "645b452c19cfec369c5c3cf7";
  const jonas = "645d75066805f1081c5385ae";
  const endrev2 = "645d757adec3139db96d9f1f";
  const lolesen = "645d8869dec3139db96d9f23";
  const fredrik = "645dd2529966846701e76e24";
  const slicky = "645de4619966846701e76f72";
  const frida = "645de4749966846701e76f76";

  const currentUser = frida;

  const { id } = useParams();
  const [reviews, setReviews] = useState<ReviewDto[]>([]);

  const [filter, setFilter] = useState<string>("reviewRating");
  const [toggleOrder, setToggleOrder] = useState<boolean>(false);

  const fetchReviews = async () => {
    const response = await fetch(`/api/review/resturant/${id}`);
    const json = await response.json();

    if (response.ok) {
      setReviews(json);
      console.log(json);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString() + " - " + date.toLocaleTimeString();
  };

  const handleVote = async (
    reviewId: string,
    userId: string,
    vote: boolean
  ) => {
    console.log(userId);
    try {
      const response = await fetch(`/api/review/vote/${reviewId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: userId, vote: vote }),
      });

      const json = await response.json();
      if (response.ok) {
        // Handle successful response
        console.log("Review updated successfully");
        fetchReviews();
      } else {
        // Handle error response
        console.log(json.error);
        console.error("Failed to update review");
      }
    } catch (error) {
      // Handle network or other errors
      console.error("An error occurred while updating the review", error);
    }
  };

  const sortedReviews = [...reviews].sort((a, b) => {
    let valueA;
    let valueB;

    if (filter === "votes") {
      valueA = a.reviewUpvotes.length - a.reviewDownvotes.length;
      valueB = b.reviewUpvotes.length - b.reviewDownvotes.length;
    } else {
      valueA = a[filter];
      valueB = b[filter];
    }

    if (valueA < valueB) {
      return toggleOrder ? -1 : 1;
    } else if (valueA > valueB) {
      return toggleOrder ? 1 : -1;
    } else {
      return 0;
    }
  });

  return (
    <div className="flex flex-col w-3/4 my-4 ">
      <div className="flex justify-between">
        <h1 className="pb-2 text-xl">Reviews:</h1>
        <div className="flex h-6">
          <select
            className="w-20 bg-white border-2 border-black"
            defaultValue="rating"
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="reviewRating">rating</option>
            <option value="createdAt">date</option>
            <option value="votes">upvotes</option>
          </select>
          <b
            className="cursor-pointer"
            onClick={() => setToggleOrder((current) => !current)}
          >
            {toggleOrder ? <>🔼</> : <>🔽</>}
          </b>
        </div>
      </div>
      <div className="space-y-4">
        {reviews ? (
          sortedReviews.map((review) => (
            <div
              className="flex flex-row justify-between p-3 bg-white rounded-lg shadow-xl "
              key={review._id}
            >
              <div className="flex flex-col w-11/12">
                <div className="relative flex justify-start p-1 space-x-2">
                  <div
                    className={`h-6 w-6 border-2 border-black ${
                      review.reviewRating > 0 ? "bg-yellow-300" : "bg-white"
                    } `}
                  ></div>
                  <div
                    className={`h-6 w-6 border-2 border-black ${
                      review.reviewRating > 1 ? "bg-yellow-300" : "bg-white"
                    } `}
                  ></div>
                  <div
                    className={`h-6 w-6 border-2 border-black ${
                      review.reviewRating > 2 ? "bg-yellow-300" : "bg-white"
                    } `}
                  ></div>
                  <div
                    className={`h-6 w-6 border-2 border-black ${
                      review.reviewRating > 3 ? "bg-yellow-300" : "bg-white"
                    } `}
                  ></div>
                  <div
                    className={`h-6 w-6 border-2 border-black ${
                      review.reviewRating > 4 ? "bg-yellow-300" : "bg-white"
                    } `}
                  ></div>
                  <div className="absolute top-0 right-2">
                    {formatTimestamp(review.createdAt)}
                  </div>
                </div>
                <div className="relative w-full p-1 pb-5 pr-24">
                  "{review.comment}"{" "}
                  <div className="absolute bottom-0 flex items-center right-2 ">
                    - {(review.userId as UserDto).firstName}{" "}
                    {(review.userId as UserDto).lastName}
                  </div>
                </div>
              </div>
              <div
                className={`flex flex-col items-center justify-start w-1/12 `}
              >
                <div
                  onClick={() => {
                    handleVote(review._id, currentUser, true);
                  }}
                  className={`text-center border-2 border-black cursor-pointer aspect-square ${
                    review.reviewUpvotes.includes(currentUser) && "bg-red-600"
                  }`}
                >
                  +
                </div>
                <div>
                  {Math.floor(
                    review.reviewUpvotes.length - review.reviewDownvotes.length
                  )}
                </div>
                <div
                  onClick={() => {
                    handleVote(review._id, currentUser, false);
                  }}
                  className={`text-center border-2 border-black cursor-pointer aspect-square ${
                    review.reviewDownvotes.includes(currentUser) && "bg-red-600"
                  }`}
                >
                  -
                </div>
              </div>
            </div>
          ))
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default ShowReviews;
