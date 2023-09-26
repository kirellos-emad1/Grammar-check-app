import { useState, useId } from "react";
import { Link } from "react-router-dom";
import FormInput from "./FormInput";

const FORM_ENDPOINT = "http://localhost:3000/register";

const RegisterForm = (props) => {
  const [formData, setFormData] = useState({
    username: "",
    email_address: "",
    password: "",
    confirm_password: "",
  });

  const inputs = [
    {
      id: useId(),
      name: "username",
      type: "text",
      placeholder: " ",
      errorMessage:
        "Username should be 3-16 characters and shouldn't include any special character!",
      label: "Username",
      pattern: "^[A-Za-z0-9 ]{3,16}$",
      required: true,
      autoComplete: "off",
    },
    {
      id: useId(),
      name: "email_address",
      type: "email",
      placeholder: " ",
      errorMessage: "It should be a valid email address!",
      label: "Email",
      required: true,
      autoComplete: "off",
    },
    {
      id: useId(),
      name: "password",
      type: "password",
      placeholder: " ",
      errorMessage:
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      label: "Password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
      autoComplete: "off",
    },
    {
      id: useId(),
      name: "confirm_password",
      type: "password",
      placeholder: " ",
      errorMessage: "Passwords don't match!",
      label: "Confirm Password",
      pattern: formData.password,
      required: true,
      autoComplete: "off",
    },
  ];

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  };
  function handelSubmit(event) {
    if (
      formData.username &&
      formData.email_address &&
      formData.password &&
      formData.confirm_password
    ) {
      fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
    } else {
      event.preventDefault();
    }
  }

  return (
    <div className="w-full h-screen flex flex-row items-center justify-center drop-shadow-2xl md:flex-col md:items-center md:justify-start">
      <div className="bg-black w-2/4 h-3/4 rounded-l-lg flex flex-col  items-center md:items-center md:justify-start md:w-full md:h-1/2">
        <div>
          <h1 className="text-white text-5xl p-28 md:p-14 ">Register</h1>
        </div>
        <div className="md:p-10">
          <button className="mt-3 mr-2 inline-flex w-auto justify-center flex-end rounded-md bg-white px-3 py-2 text-base font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">
            <Link to="/login">Sign in</Link>
          </button>
          <button className="mt-3 ml-2 inline-flex w-auto justify-center flex-end rounded-md ring-gray-500  bg-gray-400 px-3 py-2 text-base font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-400 sm:mt-0 sm:w-auto">
            <Link>Register</Link>
          </button>
        </div>
      </div>
      <div className="w-2/6 h-3/4 pt-20 pb-20 px-14 bg-gray-100 rounded-r-lg md:w-full md:h-1/2  ">
        <form
          action="/register"
          onSubmit={handelSubmit}
          method="POST"
          className="flex flex-col items-center pb-4 md:justify-start "
        >
          {inputs.map((input) => (
            <FormInput
              key={input.id}
              {...input}
              value={formData[input.name]}
              handleChange={handleChange}
            />
          ))}
          {props.errMsg && (
            <span className="text-[10px] text-red-500 font-medium">
              {props.errMsg}
            </span>
          )}
          <div>
            <button
              className="mt-3 inline-flex w-auto justify-center flex-end rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              type="submit"
            >
              Register
            </button>
          </div>
        </form>
        <div className="container-text">
          <div className="text-sm">
            <span className="text-[11px] text-gray-600 font-medium mr-2">
              Already have an account?{" "}
            </span>
            <Link className="text-gray-600 text-[13px] font-medium" to="/login">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RegisterForm;
