import { Link } from "react-router";
import FlagImage from "./FlagImage.jsx";
import FavoriteButton from "./FavoriteButton.jsx";
import { formatCompact, getRegionLabel } from "../utils/countryUtils.js";

function CountryCard({ country, index, isFavorite, onToggleFavorite }) {
  const population = formatCompact(country.population);

  return (
    // --stagger drives the reveal delay of the first cards (see components.css)
    <article className="country-card" style={{ "--stagger": Math.min(index, 11) }}>
      <Link to={`/country/${country.code}`} className="country-card__link">
        <div className="flag-frame">
          <FlagImage src={country.flagPng} name={country.name} code={country.code} />
        </div>

        <div className="country-card__body">
          <p className="country-card__region">{getRegionLabel(country.region)}</p>
          <h3 className="country-card__name">{country.name}</h3>

          <dl className="country-card__facts">
            <div>
              <dt>Capitale</dt>
              <dd className={country.capital ? "" : "is-missing"}>{country.capital ?? "Aucune"}</dd>
            </div>
            <div>
              <dt>Population</dt>
              <dd className={population ? "" : "is-missing"}>{population ?? "Inconnue"}</dd>
            </div>
          </dl>
        </div>
      </Link>

      {/* Outside the link: a button cannot be nested inside a link */}
      <FavoriteButton
        name={country.name}
        isFavorite={isFavorite}
        onToggle={() => onToggleFavorite(country.code)}
      />
    </article>
  );
}

export default CountryCard;
