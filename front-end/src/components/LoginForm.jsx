import "./formInput.css";
import { Link } from "react-router-dom";

export default function LoginForm(props) {
  console.log(props.errMsg);
  return (
    <div className="w-full h-screen">
      <div className="w-full h-screen flex flex-row items-center justify-center drop-shadow-2xl md:flex-col md:items-center md:justify-start">
        <div className="bg-black w-2/4 h-3/4 rounded-l-lg flex flex-col  items-center md:items-center md:justify-start md:w-full md:h-1/2">
          <div>
            <h1 className="text-white text-5xl p-28 md:p-14 ">Sign in</h1>
          </div>
          <div className="md:p-10">
            <button className="mt-3 mr-2 inline-flex w-auto justify-center flex-end rounded-md ring-gray-500  bg-gray-400 px-3 py-2 text-base font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-400 sm:mt-0 sm:w-auto">
              <Link>Sign in</Link>
            </button>
            <button className="mt-3 ml-2 inline-flex w-auto justify-center flex-end rounded-md bg-white px-3 py-2 text-base font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">
              <Link to="/register">Register</Link>
            </button>
          </div>
        </div>
        <div className="w-2/6 h-3/4 pt-28 pb-28 px-20 bg-gray-100 rounded-r-lg  md:w-full ">
          <form
            method="POST"
            action="/login"
            className=" flex flex-col items-center pb-10"
          >
            <div className="relative z-0 w-full mb-10 group md:justify-start">
              <input
                autoComplete="off"
                autoFocus
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-black-600 peer"
                name="email_address"
                maxLength={60}
                type="email"
                required
                placeholder=" "
              />
              <label
                htmlFor="email_address"
                className="peer-focus:font-medium absolute text-base text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Email
              </label>
            </div>
            <div className="relative z-0 w-full mb-10 group">
              <input
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-black-600 peer"
                name="password"
                maxLength={60}
                minLength={8}
                type="password"
                required
                placeholder=" "
              />
              <label
                htmlFor="password"
                className="peer-focus:font-medium absolute text-base text-gray-500 duration-300 transform -translate-y-9 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Password
              </label>
            </div>
            {props.errMsg && (
              <span className="text-[10px] text-red-500 font-medium">
                {props.errMsg}
              </span>
            )}
            <button
              className="mt-3 inline-flex w-auto justify-center flex-end rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              type="submit"
            >
              Sign in
            </button>
          </form>
          <form
            className="icon-container mb-10"
            action="/login-google"
            method="POST"
          >
            <span className="text-[13px] text-gray-600 mr-2 font-medium">
              Sign in With Google account
            </span>
            <button
              className="mt-3 inline-flex w-auto justify-center flex-end rounded-md bg-white px-3 py-2 text-base font-semibold text-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              type="submit"
            >
              <i className="fa-brands fa-google"></i>
            </button>
          </form>
          <div className="container-text">
            <div className="text-sm">
              <span className="text-[11px] text-gray-600 font-medium mr-2">
                Not a member?{" "}
              </span>
              <Link
                className="text-gray-600 text-[13px] font-medium"
                to="/register"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
