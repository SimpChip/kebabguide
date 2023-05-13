const CarouselItem = () => {
  return (
    <div className="relative w-1/4 p-2 border-2">
      <img
        className="relative rounded-md"
        src={require("../../resources/kebab.png")}
        alt="hello"
      />
    </div>
  );
};

export default CarouselItem;
