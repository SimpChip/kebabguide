import { RefObject, forwardRef, useRef, useState } from "react";
import { User } from "../../types/types";
import Input from "./Input";

const CreateUserForm = () => {
  const firstNameInput = useRef<HTMLInputElement>(null);
  const lastNameInput = useRef<HTMLInputElement>(null);
  const emailInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);
  const idsSelect = useRef<HTMLSelectElement>(null);
  const numberInput = useRef<HTMLInputElement>(null);

  const [error, setError] = useState<string | null>();

  const handleUserSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      firstNameInput.current &&
      emailInput.current &&
      passwordInput.current &&
      idsSelect.current &&
      numberInput.current
    ) {
      const user: User = {
        firstName: firstNameInput.current.value,
        lastName: lastNameInput.current?.value,
        email: emailInput.current.value,
        password: passwordInput.current.value,
        phone: {
          ISD: idsSelect.current.value,
          number: numberInput.current.value,
        },
      };

      console.log(user);
      const response = await fetch(`/api/user`, {
        method: "POST",
        body: JSON.stringify(user),
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
        console.log("new user added");
      }
    }
  };

  return (
    <>
      <h1>Create User</h1>
      <form onSubmit={handleUserSubmit} className="flex flex-col space-y-2 md:">
        <Input type="text" text="First Name:" ref={firstNameInput} />
        <Input type="text" text="Last Name:" ref={lastNameInput} />
        <Input type="text" text="Email:" ref={emailInput} />
        <label className="flex justify-end">
          Number:
          <select
            ref={idsSelect}
            className="w-12 ml-2 bg-white border-2 border-r-0 border-black "
          >
            <option value="+47">+47</option>
          </select>
          <input
            ref={numberInput}
            className="w-48 px-2 border-2 border-l-0 border-black "
            type="tel"
          />
        </label>
        <Input type="text" text="Password:" ref={passwordInput} />
        <input
          className="bg-white border-2 border-black cursor-pointer"
          type="submit"
        />
      </form>
      <div className="text-4xl">{error}</div>
    </>
  );
};

export default CreateUserForm;
