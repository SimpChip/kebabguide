import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ResturantDto } from "../types/types";
import ShowReviews from "../components/Resturant/ShowReviews";

const Resturant = () => {
  const { id } = useParams();
  const [resturant, setResturant] = useState<ResturantDto>();

  useEffect(() => {
    const fetchResturant = async () => {
      const response = await fetch(`/api/resturant/${id}`);
      const json = await response.json();

      if (response.ok) {
        setResturant(json);
      }
    };
    fetchResturant();
  }, []);

  return (
    <div className="px-4">
      <Link
        className="absolute flex items-center p-1 pr-2 bg-white rounded-md shadow-sm hover:shadow-md top-4 right-4"
        to={"/"}
      >
        Return
      </Link>
      {resturant ? (
        <div className="flex flex-col">
          <div className="flex">
            <img
              className="w-2/4"
              src={require(`../resources/kebab.png`)}
              alt="resturant"
            />
            <div className="w-2/4 px-4">
              <h1 className="text-4xl">{resturant.name}</h1>

              <a
                className="flex items-center p-2 bg-white rounded-md shadow-sm w-fit hover:shadow-md"
                href={`https://www.google.com/maps/search/?api=1&query=${resturant.name}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <p className="pr-2">Find the way on Google Maps</p>
              </a>

              <div>Rating: {resturant.resturantRating}</div>
            </div>
          </div>
          <ShowReviews />
        </div>
      ) : (
        <div> 404 not found bitch</div>
      )}
    </div>
  );
};

export default Resturant;
