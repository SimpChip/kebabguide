import { useEffect, useState } from "react";
import { ResturantDto } from "../../types/types";

const Carousel = () => {
  const [resturants, setResturants] = useState<ResturantDto[]>();

  useEffect(() => {
    const fetchResturants = async () => {
      const response = await fetch("/api/resturants/new");
      const json = await response.json();

      if (response.ok) {
        setResturants(json);
      }
    };
    fetchResturants();
  }, []);
  return (
    <>
      {resturants && (
        <div className="flex w-full overflow-hidden">
          <img
            className="relative"
            src={require("../resources/kebab.png")}
            alt="hello"
          />
        </div>
      )}
    </>
  );
};

export default Carousel;
