import DisplayTrending from "../components/Home/DisplayTrending";
import Search from "../components/Home/Search";

const Home = () => {
  return (
    <div className="grid grid-cols-1 gap-2">
      <DisplayTrending />
      <Search />
    </div>
  );
};

export default Home;
