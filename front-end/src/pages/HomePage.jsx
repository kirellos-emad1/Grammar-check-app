import { Helmet, HelmetProvider } from "react-helmet-async";
import GrammarCheck from "../components/GrammarCheck";
import { Link } from "react-router-dom";
import Typed from "react-typed";
import "../App.css";
export default function HomePage(props) {
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Home</title>
        </Helmet>
        {props.isLoggedIn ? (
          <>
          <Helmet><title>Grammar Check</title></Helmet>
          <GrammarCheck />
          </>
        ) : (
          <div className="w-full h-screen flex flex-row items-center justify-center md:flex-col md:items-center md:justify-start ">
            <div className="w-2/6 h-3/4  pt-20 pb-20 px-10 flex flex-col justify-center md:flex md:justify-start md:w-full md:h-1/2 ">
              <h1 className="text-black text-4xl  mb-5 ">
                Don't worry about spilling any more.
              </h1>
              <div>
                <h1 className="text-black text-xl  mb-5">
                  Write with confidence.
                </h1>
              </div>
              <div className="text-black text-2xl font-normal mb-5">
                <Typed
                  strings={[
                    "<span class='wrong-text'>we well take care of grammer and spilling</span>",
                    "<em>We will take care of grammar and spelling.</em>",
                  ]}
                  typeSpeed={60}
                  backSpeed={20}
                  smartBackspace={false}
                  showCursor={false}
                ></Typed>
              </div>
            </div>
            <div className="w-2/4 h-3/4 pt-20 pb-20 px-14 flex flex-col justify-center md:flex md:justify-start md:items-center md:w-full md:h-full md:p-10">
              <h1 className="text-5xl mb-5">Beyond Grammar and Spelling</h1>
              <p className="text-lg mt-5">
                From grammar and spelling to style and tone, Grammar’s
                suggestions are comprehensive, helping you communicate
                effectively and as you intend.
              </p>
              <div className="mt-5">
                <div className="font-bold	inline-flex w-auto justify-center flex-end rounded-md bg-white px-3 py-2 text-base text-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">
                  <Link to="/register">
                    Sign up
                    <span className="text-xs font-medium ">
                      &nbsp; &nbsp;for Free
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </HelmetProvider>
    </>
  );
}
