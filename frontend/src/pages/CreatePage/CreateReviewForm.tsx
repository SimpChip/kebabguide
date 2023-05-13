import { useEffect, useRef, useState } from "react";
import {
  ItemDto,
  ResturantDto,
  Review,
  User,
  UserDto,
} from "../../types/types";

const CreateItemForm = () => {
  const [resturants, setResturants] = useState<ResturantDto[]>([]);
  const [items, setItems] = useState<ItemDto[]>([]);
  const [users, setUsers] = useState<UserDto[]>([]);

  const userSelect = useRef<HTMLSelectElement>(null);
  const ratingInput = useRef<HTMLInputElement>(null);

  const [resturantSelect, setResturantSelect] = useState<string>("");
  const [itemSelect, setItemSelect] = useState<string>("");

  const commentTextarea = useRef<HTMLTextAreaElement>(null);

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

    const fetchItems = async () => {
      const response = await fetch("/api/item");
      console.log(response);
      const json = await response.json();

      if (response.ok) {
        setItems(json);
      }
    };
    fetchItems();

    const fetchUsers = async () => {
      const response = await fetch("/api/user");
      console.log(response);
      const json = await response.json();

      if (response.ok) {
        setUsers(json);
      }
    };
    fetchUsers();
  }, []);

  const handleReviewSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    console.log("User: ", userSelect.current?.value);
    console.log("Resturant: ", resturantSelect);
    console.log("Item: ", itemSelect);
    console.log("Comment: ", commentTextarea.current?.value);

    if (
      userSelect.current &&
      resturantSelect &&
      itemSelect &&
      commentTextarea.current &&
      ratingInput.current
    ) {
      const review: Review = {
        userId: userSelect.current.value,
        resturantId: resturantSelect,
        itemId: itemSelect,
        comment: commentTextarea.current.value,
        reviewRating: parseInt(ratingInput.current.value),
        reviewUpvotes: [],
        reviewDownvotes: [],
      };

      const response = await fetch(`/api/review`, {
        method: "POST",
        body: JSON.stringify(review),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const json = await response.json();

      if (!response.ok) {
        setError(json.error);
        console.log("error");
      }

      if (response.ok) {
        setError(null);
        console.log("new review added");
      }
    } else {
      setError("Some fields is not set");
    }
  };

  return (
    <>
      <h1>Create Review</h1>
      {users && resturants && items && (
        <form
          onSubmit={handleReviewSubmit}
          className="flex flex-col space-y-2 "
        >
          <label className="flex justify-end">
            Users:
            <select
              ref={userSelect}
              className="ml-2 bg-white border-2 border-black w-60"
            >
              {users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.firstName} {user.lastName}
                </option>
              ))}
            </select>
          </label>
          <label className="flex justify-end">
            Resturant:
            <select
              onChange={(e) => {
                setResturantSelect(e.target.value);
                setItemSelect("");
              }}
              className="ml-2 bg-white border-2 border-black w-60"
              defaultValue={resturantSelect}
            >
              <option disabled value="">
                Select Resturant
              </option>
              {resturants.map((resturant) => (
                <option key={resturant._id} value={resturant._id}>
                  {resturant.name}
                </option>
              ))}
            </select>
          </label>
          <label className="flex justify-end">
            Items:
            <select
              onChange={(e) => setItemSelect(e.target.value)}
              className="ml-2 bg-white border-2 border-black w-60"
              defaultValue={itemSelect}
            >
              {resturantSelect ? (
                <option value="">Select Item</option>
              ) : (
                <option disabled value="">
                  Select a resturant first
                </option>
              )}
              {items
                .filter(
                  (item) =>
                    resturantSelect && item.resturantId === resturantSelect
                )
                .map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.name}
                  </option>
                ))}
            </select>
          </label>
          <label className="flex justify-end">
            Rating: 1
            <input
              className="mx-2 w-52"
              type="range"
              min="1"
              max="5"
              step="1"
              ref={ratingInput}
            ></input>
            5
          </label>
          <textarea className="px-1" ref={commentTextarea}></textarea>
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
