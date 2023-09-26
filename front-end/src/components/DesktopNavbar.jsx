import { Link } from "react-router-dom";

export default function DesktopNavbar(props) {
  return (
    <nav className="navigation">
      <div>
        <Link to="/" className="brand-name text-3xl ">
          G
        </Link>
      </div>

      <div className="navigation-menu">
        {props.isLoggedIn ? (
          <ul>
            <li>
              <form method="POST" action="/logout">
                <button className="anchor-btn" type="submit" onClick={()=>console.log('clicked')}>
                  logout
                </button>
              </form>
            </li>
            <li>
              <div>
                <span>Hello {props.username.split(" ")[0]}</span>
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
      </div>
    </nav>
  );
}
