import { Link, NavLink } from "react-router";
import { AtlasMark } from "./Icons.jsx";

function Header() {
  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link to="/" className="brand" aria-label="Atlas, retour à l'accueil">
          <AtlasMark className="brand__mark" />
          <span className="brand__text">
            <span className="brand__name">ATLAS</span>
            <span className="brand__tagline">World explorer</span>
          </span>
        </Link>

        <nav aria-label="Navigation principale">
          <ul className="nav">
            <li>
              <NavLink to="/" end className={({ isActive }) => `nav__link${isActive ? " is-active" : ""}`}>
                Explorer
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
