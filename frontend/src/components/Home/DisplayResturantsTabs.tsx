import { Key, useEffect, useState } from "react";
import { ResturantDto } from "../../types/types";
import { Link } from "react-router-dom";

interface tab {
  name: String;
  resturants: ResturantDto[];
}

const DisplayResturantsTabs = () => {
  const [resturants, setResturants] = useState<ResturantDto[]>([]);
  const [currentTab, setCurrentTab] = useState<tab>({
    name: "",
    resturants: [],
  });

  useEffect(() => {
    const fetchResturants = async () => {
      const response = await fetch("/api/resturants");
      const json = await response.json();

      if (response.ok) {
        setResturants(json);
        setCurrentTab({ name: "Trending Kebab", resturants: json });
      }
    };
    fetchResturants();
  }, []);

  let tabs = [
    { name: "Trending Kebab", resturants: resturants },
    { name: "Top Rated Kebab", resturants: resturants },
    { name: "2am Certified", resturants: resturants },
  ];

  return (
    <div>
      <div className="relative flex items-center p-2 m-4 bg-orange-200 rounded-md shadow-sm justify-evenly">
        {tabs.map((tab, index) => (
          <div
            key={"tab-" + index}
            className={`cursor-pointer font-black  text-lg p-2 w-1/5 text-center rounded-md  ${
              currentTab.name === tab.name
                ? "text-orange-200 bg-white shadow-sm"
                : "text-white hover:text-xl transition-all"
            }`}
            onClick={() => {
              setCurrentTab(tab);
            }}
          >
            {tab.name}
          </div>
        ))}
      </div>

      <div className="grid justify-center w-full gap-8 px-6 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 ">
        {currentTab.resturants ? (
          currentTab.resturants.map((resturant) => (
            <Link
              to={`/resturants/${resturant._id}`}
              className="flex flex-col h-full transition-all bg-white cursor-pointer hover:shadow-xl rounded-b-md"
              key={resturant._id as Key}
            >
              <img src={require("../../resources/kebab.png")} alt="kebab" />
              <div className="flex-grow p-1 px-2 shadow-sm rounded-b-md">
                {resturant.name}
              </div>
            </Link>
          ))
        ) : (
          <div> Loading </div>
        )}
      </div>
    </div>
  );
};

export default DisplayResturantsTabs;
