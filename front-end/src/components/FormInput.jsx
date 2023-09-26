import { useState } from "react";
import "./formInput.css";

export default function FormInput(props) {
  const [focused, setFocused] = useState(false);
  const { label, errorMessage, handleChange, id, ...inputProps } = props;

  const handleFocus = () => {
    setFocused(true);
  };

  return (
    <div className="relative z-0 w-full mb-10 group">
      <input
        {...inputProps}
        onChange={handleChange}
        onBlur={handleFocus}
        onFocus={() =>
          inputProps.name === "confirm_password" && setFocused(true)
        }
        focused={focused.toString()}
        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-black-600 peer"
      />
      <label
        htmlFor={inputProps.name}
        className="peer-focus:font-medium absolute text-base text-gray-500 duration-300 transform -translate-y-9 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
      >
        {label}
      </label>
      <span className="input-span font-medium">{errorMessage}</span>
    </div>
  );
}
