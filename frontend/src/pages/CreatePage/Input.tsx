import { forwardRef } from "react";

interface InputProps {
  text: string;
  type: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ text, type }, ref) => {
    return (
      <label className="flex justify-end ">
        {text}
        <input
          id="first_name"
          ref={ref}
          className="px-1 ml-2 border-2 border-black w-60"
          type={type}
        />
      </label>
    );
  }
);

export default Input;
