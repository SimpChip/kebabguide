import { forwardRef, useRef, useState } from "react";
import { Resturant } from "../../types/types";
import Input from "./Input";

const CreateResturantForm = () => {
  const nameInput = useRef<HTMLInputElement>(null);
  const addressInput = useRef<HTMLInputElement>(null);
  const imgUrlInput = useRef<HTMLInputElement>(null);

  const [error, setError] = useState<string | null>();

  const handleResturantSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (nameInput.current && addressInput.current && imgUrlInput.current) {
      const resturant: Resturant = {
        name: nameInput.current.value,
        address: addressInput.current.value,
        imgUrl: imgUrlInput.current.value,
        resturantRating: 1,
        resturantUpvotes: [],
        resturantDownvotes: [],
      };

      const response = await fetch(`/api/resturant`, {
        method: "POST",
        body: JSON.stringify(resturant),
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
        console.log("new resturant added");
      }
    }
  };

  return (
    <>
      <h1>Create Resturant</h1>
      <form
        onSubmit={handleResturantSubmit}
        className="flex flex-col space-y-2 md:"
      >
        <Input type="text" text="Name:" ref={nameInput} />
        <Input type="text" text="Address:" ref={addressInput} />
        <Input type="text" text="Image Url:" ref={imgUrlInput} />
        <input
          className="bg-white border-2 border-black cursor-pointer"
          type="submit"
        />
      </form>
      <div className="text-4xl">{error}</div>
    </>
  );
};

export default CreateResturantForm;
