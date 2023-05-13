import { forwardRef, useEffect, useRef, useState } from "react";
import { Item, ResturantDto } from "../../types/types";
import Input from "./Input";

const CreateItemForm = () => {
  const [resturants, setResturants] = useState<ResturantDto[]>([]);
  const nameInput = useRef<HTMLInputElement>(null);
  const priceInput = useRef<HTMLInputElement>(null);
  const meatSelect = useRef<HTMLSelectElement>(null);
  const resturantSelect = useRef<HTMLSelectElement>(null);
  const imgUrlInput = useRef<HTMLInputElement>(null);

  const [error, setError] = useState<string | null>();

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

  const handleItemSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      nameInput.current &&
      priceInput.current &&
      meatSelect.current &&
      resturantSelect.current &&
      imgUrlInput.current
    ) {
      const item: Item = {
        name: nameInput.current.value,
        price: parseInt(priceInput.current.value),
        meat: meatSelect.current.value,
        resturantId: resturantSelect.current.value,
        imgUrl: imgUrlInput.current.value,
        itemRating: 1,
        itemUpvotes: [],
        itemDownvotes: [],
      };

      const response = await fetch(`/api/item`, {
        method: "POST",
        body: JSON.stringify(item),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const json = await response.json();

      if (!response.ok) {
        setError(json.error);
      }

      if (response.ok) {
        setError(null);
        console.log("new item added");
      }
    }
  };

  return (
    <>
      <h1>Create Item</h1>
      {resturants && (
        <form
          onSubmit={handleItemSubmit}
          className="flex flex-col space-y-2 md:"
        >
          <Input type="text" text="Name:" ref={nameInput} />
          <Input type="number" text="Price:" ref={priceInput} />
          <Input type="text" text="Image Url:" ref={imgUrlInput} />

          <label className="flex justify-end">
            Meat:
            <select
              ref={meatSelect}
              className="ml-2 bg-white border-2 border-black w-60"
            >
              <option value="kebab">Kebab Kjøtt</option>
              <option value="biff">Biff</option>
              <option value="kylling">Kylling</option>
              <option value="fallafel">Falaffel</option>
              <option value="vegetar">Vegetar</option>
              <option value="annet">Annet</option>
            </select>
          </label>
          <label className="flex justify-end">
            Resturant:
            <select
              ref={resturantSelect}
              className="ml-2 bg-white border-2 border-black  w-60"
            >
              {resturants.map((resturant) => (
                <option key={resturant._id} value={resturant._id}>
                  {resturant.name}
                </option>
              ))}
            </select>
          </label>

          <input
            className="bg-white border-2 border-black cursor-pointer"
            type="submit"
          />
        </form>
      )}
      <div className="text-4xl">{error}</div>
    </>
  );
};

export default CreateItemForm;
