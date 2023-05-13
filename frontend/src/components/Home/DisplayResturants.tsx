import { Key, FC } from "react";
import { ResturantDto } from "../../types/types";
import { Link } from "react-router-dom";

interface Props {
  resturants: ResturantDto[];
}

const DisplayResturants: FC<Props> = ({ resturants }) => {
  return (
    <div>
      <div className="grid justify-center w-full gap-8 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 ">
        {resturants ? (
          resturants.map((resturant) => (
            <Link
              to={`/resturant/${resturant._id}`}
              className="flex flex-col h-full transition-all bg-white border-2 border-black cursor-pointer hover:shadow-xl rounded-b-md"
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

export default DisplayResturants;
