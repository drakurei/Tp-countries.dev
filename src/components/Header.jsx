import { Link, useLocation } from "react-router";
import { AtlasMark } from "./Icons.jsx";

function Header({ favoritesCount, onlyFavorites, onShowFavorites }) {
  const { pathname } = useLocation();
  const onHome = pathname === "/";
  const exploreActive = onHome && !onlyFavorites;
  const favoritesActive = onHome && onlyFavorites;

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
              <Link
                to="/"
                state={{ scrollToExplorer: true }}
                className={`nav__link${exploreActive ? " is-active" : ""}`}
                aria-current={exploreActive ? "page" : undefined}
                onClick={() => onShowFavorites(false)}
              >
                Explorer
              </Link>
            </li>
            <li>
              <Link
                to="/"
                state={{ scrollToExplorer: true }}
                className={`nav__link${favoritesActive ? " is-active" : ""}`}
                aria-current={favoritesActive ? "page" : undefined}
                onClick={() => onShowFavorites(true)}
              >
                Favoris
                <span className="nav__badge">
                  {favoritesCount}
                  <span className="visually-hidden"> pays</span>
                </span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
