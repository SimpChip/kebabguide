import { Link, Outlet } from "react-router-dom";
const CreatePage = () => {
  const links = [
    { to: "user", text: "User" },
    { to: "resturant", text: "Resturant" },
    { to: "item", text: "Item" },
    { to: "review", text: "Review" },
  ];
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <Outlet />
      <nav className="absolute bottom-0 flex w-full p-8 justify-evenly">
        {links.map((link) => (
          <Link
            key={link.text}
            className="p-2 bg-white border-2 border-black"
            to={"/create/" + link.to}
          >
            Create {link.text}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default CreatePage;
