import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import FlagImage from "../components/FlagImage.jsx";
import StatePanel from "../components/StatePanel.jsx";
import FavoriteButton from "../components/FavoriteButton.jsx";
import { ArrowLeftIcon } from "../components/Icons.jsx";
import { getCountryByCode } from "../services/countriesApi.js";
import { formatNumber, getRegionLabel } from "../utils/countryUtils.js";

function formatCoordinates(latlng) {
  if (!latlng) return null;
  const [lat, lng] = latlng;
  const format = (value) => Math.abs(value).toLocaleString("fr-FR", { maximumFractionDigits: 1 });
  const latText = `${format(lat)}° ${lat >= 0 ? "N" : "S"}`;
  const lngText = `${format(lng)}° ${lng >= 0 ? "E" : "O"}`;
  return `${latText}, ${lngText}`;
}

function BackLink() {
  return (
    <Link to="/" state={{ scrollToExplorer: true }} className="back-link">
      <ArrowLeftIcon />
      Retour à l'exploration
    </Link>
  );
}

function Fact({ label, value }) {
  const isMissing = value == null || value === "";
  return (
    <div className="fact">
      <dt className="fact__label">{label}</dt>
      <dd className={`fact__value${isMissing ? " is-missing" : ""}`}>{isMissing ? "Non renseigné" : value}</dd>
    </div>
  );
}

function CountryDetailPage({ countries, favorites, onToggleFavorite }) {
  const { code } = useParams();
  // `result` remembers which code it belongs to: if it does not match the URL, we are loading
  const [result, setResult] = useState(null);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    window.scrollTo({ top: 0, behavior: "instant" });

    getCountryByCode(code, controller.signal)
      .then((country) => setResult({ code, status: "success", country }))
      .catch((error) => {
        if (error.name === "AbortError") return;
        setResult({ code, status: error.status === 404 ? "not-found" : "error", country: null });
      });

    return () => controller.abort();
  }, [code, attempt]);

  const status = result?.code === code ? result.status : "loading";
  const country = status === "success" ? result.country : null;

  useEffect(() => {
    if (!country) return;
    const previousTitle = document.title;
    document.title = `${country.name}, Atlas`;
    return () => {
      document.title = previousTitle;
    };
  }, [country]);

  if (status === "loading") {
    return (
      <div className="container detail-page">
        <BackLink />
        <div className="detail-hero" role="status">
          <span className="visually-hidden">Chargement de la fiche du pays…</span>
          <div className="skeleton detail-skeleton__flag" />
          <div className="detail-skeleton__text">
            <div className="skeleton skeleton--line skeleton--short" />
            <div className="skeleton detail-skeleton__title" />
            <div className="skeleton skeleton--line" />
          </div>
        </div>
      </div>
    );
  }

  if (status !== "success") {
    const notFound = status === "not-found";
    return (
      <div className="container detail-page">
        <BackLink />
        <StatePanel
          tone={notFound ? "info" : "error"}
          title={notFound ? "Ce pays n'existe pas dans l'atlas" : "La fiche n'a pas pu être chargée"}
          action={
            notFound ? (
              <Link to="/" className="button button--primary">
                Voir tous les pays
              </Link>
            ) : (
              <button
                type="button"
                className="button button--primary"
                onClick={() => {
                  setResult(null);
                  setAttempt((value) => value + 1);
                }}
              >
                Réessayer
              </button>
            )
          }
        >
          {notFound
            ? `Aucun pays ne correspond au code « ${code} ». Le lien est peut-être incorrect.`
            : "L'API countries.dev ne répond pas pour le moment. Vérifiez votre connexion, puis réessayez."}
        </StatePanel>
      </div>
    );
  }

  // Border codes are turned into names thanks to the list already loaded in App
  const borders = country.borders
    .map((borderCode) => ({
      code: borderCode,
      name: countries.find((item) => item.code === borderCode)?.name ?? borderCode,
    }))
    .sort((a, b) => a.name.localeCompare(b.name, "fr"));

  const otherNames = [
    country.nativeName && country.nativeName !== country.name ? `Nom local : ${country.nativeName}` : null,
    country.englishName && country.englishName !== country.name ? `En anglais : ${country.englishName}` : null,
  ].filter(Boolean);

  return (
    <div className="container detail-page page">
      <BackLink />

      <article aria-labelledby="country-name">
        <header className="detail-hero">
          <div className="flag-frame flag-frame--large">
            <FlagImage src={country.flagSvg} name={country.name} code={country.code} loading="eager" />
          </div>

          <div className="detail-hero__text">
            <p className="detail-hero__region">
              {getRegionLabel(country.region)}
              {country.subregion && <span>, {country.subregion}</span>}
            </p>
            <h1 id="country-name" className="detail-hero__name">
              {country.name}
            </h1>
            {otherNames.length > 0 && <p className="detail-hero__names">{otherNames.join(". ")}.</p>}
            <div className="detail-hero__actions">
              <FavoriteButton
                name={country.name}
                isFavorite={favorites.includes(country.code)}
                onToggle={() => onToggleFavorite(country.code)}
                withLabel
              />
            </div>
          </div>
        </header>

        <section className="detail-section" aria-labelledby="facts-title">
          <h2 id="facts-title" className="detail-section__title">
            L'essentiel
          </h2>
          <dl className="facts">
            <Fact label="Capitale" value={country.capital} />
            <Fact
              label="Population"
              value={country.population != null ? `${formatNumber(country.population)} habitants` : null}
            />
            <Fact label="Superficie" value={country.area != null ? `${formatNumber(country.area)} km²` : null} />
            <Fact label="Langues" value={country.languages.join(", ")} />
            <Fact label="Monnaies" value={country.currencies.join(", ")} />
            <Fact label="Fuseaux horaires" value={country.timezones.join(", ")} />
            <Fact label="Coordonnées" value={formatCoordinates(country.latlng)} />
            <Fact label="Code ISO" value={country.code} />
          </dl>
        </section>

        <section className="detail-section" aria-labelledby="borders-title">
          <h2 id="borders-title" className="detail-section__title">
            Pays frontaliers
          </h2>
          {borders.length > 0 ? (
            <ul className="border-list">
              {borders.map((border) => (
                <li key={border.code}>
                  <Link to={`/country/${border.code}`} className="chip">
                    {border.name}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="detail-section__empty">Aucun pays frontalier par voie terrestre.</p>
          )}
        </section>

        {country.mapUrl && (
          <a className="button button--ghost detail-map-link" href={country.mapUrl} target="_blank" rel="noreferrer">
            Voir sur OpenStreetMap
            <span className="visually-hidden"> (nouvel onglet)</span>
          </a>
        )}
      </article>
    </div>
  );
}

export default CountryDetailPage;
