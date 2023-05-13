import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <header>
      <div className="w-full p-4 text-4xl">
        <Link to="/" className="flex items-center">
          <img
            className="transition-all duration-1000 hover:rotate-180"
            width={50}
            height={50}
            src={require("../resources/kebabLogo.png")}
            alt=""
          />
          <h1>KEBAB OSLO</h1>
        </Link>
      </div>
    </header>
  );
};

export default NavBar;
