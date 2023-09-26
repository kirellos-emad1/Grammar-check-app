import { useState } from "react";
import { Link } from "react-router-dom";

export default function MobileNavbar(props) {
  const [isClicked, setIsClicked] = useState(false);
  function handleClick() {
    setIsClicked((prevClick) => !prevClick);
  }

  return (
    <nav className="navigation">
      <div>
        <Link to="/" className="brand-name text-3xl ">
          G
        </Link>
      </div>
      <div
        className={isClicked ? "hamburger-clicked" : " hamburger"}
        onClick={handleClick}
      >
        {isClicked ?<div className="navigation-menu-mobile">
        {props.isLoggedIn ? (
          <ul>
            <li>
              <form method="POST" action="/logout">
                <button className="anchor-btn" onClick={handleClick} type="submit">
                  logout
                </button>
              </form>
            </li>
            <li>
              <div>
                <span>Hello's {props.username.split(" ")[0]}</span>
              </div>
            </li>
          </ul>
        ) : (
          <ul>
            <li>
              <div>
                <div>
                  <Link to="/">Home</Link>
                </div>
              </div>
            </li>
            <li>
              <div>
                <div>
                  <Link to="/login">Sign in</Link>
                </div>
              </div>
            </li>
            <li>
              <div>
                <div>
                  <Link to="/register">Register for free</Link>
                </div>
              </div>
            </li>
          </ul>
        )}
      </div>:<></>}
      </div>
    </nav>
  );
}
