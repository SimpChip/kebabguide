import { useEffect, useState } from "react";
import { ResturantDto } from "../../types/types";
import DisplayKebabPlaces from "./DisplayResturants";

const Search = () => {
  const [resturants, setResturants] = useState<ResturantDto[]>([]);

  const [query, setQuery] = useState("");

  const filteredItems = resturants.filter((item) => {
    return item.name.toLowerCase().includes(query.toLowerCase());
  });

  useEffect(() => {
    const fetchResturants = async () => {
      const response = await fetch("/api/resturant");
      console.log(response);
      const json = await response.json();

      if (response.ok) {
        setResturants(json);
      }
    };
    fetchResturants();
  }, []);

  useEffect(() => {
    console.log(query);
  }, [query]);

  return (
    <div className="grid grid-cols-1 gap-4 p-4 bg-white border-2">
      <div className="">
        Search:
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          className="px-1 mx-2 border-2 border-black"
        />
      </div>
      <DisplayKebabPlaces resturants={filteredItems} />
    </div>
  );
};

export default Search;
