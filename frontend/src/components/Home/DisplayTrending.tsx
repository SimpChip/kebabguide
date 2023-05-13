import { Key, useEffect, useState } from "react";
import { ResturantDto } from "../../types/types";

const DisplayTrending = () => {
  const [resturants, setResturants] = useState<ResturantDto[]>([]);

  useEffect(() => {
    const fetchResturants = async () => {
      const response = await fetch("/api/resturant/new");
      const json = await response.json();

      if (response.ok) {
        setResturants(json);
      }
    };
    fetchResturants();
  }, []);

  return (
    <div className="w-full p-4 bg-white border-2">
      <div className="px-2 text-2x">Trending</div>
      <div className="flex w-full border-2">
        {resturants &&
          resturants.map((resturant, index) => {
            return (
              <div className="border-4 border-black" key={resturant._id}>
                {index}
                <img src={require("../../resources/kebab.png")}></img>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default DisplayTrending;
