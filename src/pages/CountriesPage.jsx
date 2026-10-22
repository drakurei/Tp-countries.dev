import { useEffect } from "react";
import { useLocation } from "react-router";
import Hero from "../components/Hero.jsx";
import SearchBar from "../components/SearchBar.jsx";
import SortSelect from "../components/SortSelect.jsx";
import RegionFilter from "../components/RegionFilter.jsx";
import CountryCard from "../components/CountryCard.jsx";
import LoadingState from "../components/LoadingState.jsx";
import StatePanel from "../components/StatePanel.jsx";
import { ResetIcon, StarIcon } from "../components/Icons.jsx";
import {
  DEFAULT_FILTERS,
  filterCountries,
  getRegionLabel,
  getRegions,
  sortCountries,
} from "../utils/countryUtils.js";

function CountriesPage({ countries, status, onRetry, filters, onFiltersChange, favorites, onToggleFavorite }) {
  const { query, region, sort, onlyFavorites } = filters;
  const location = useLocation();

  // Coming back from a detail page: jump straight to the grid instead of the hero
  useEffect(() => {
    if (location.state?.scrollToExplorer) {
      document.getElementById("explorer")?.scrollIntoView({ block: "start", behavior: "instant" });
    }
  }, [location.state]);

  // Derived data: recomputed on each render from the state, never stored separately
  const regions = getRegions(countries);
  const visibleCountries = sortCountries(filterCountries(countries, filters, favorites), sort);

  function updateFilter(name, value) {
    onFiltersChange((previous) => ({ ...previous, [name]: value }));
  }

  function resetFilters() {
    onFiltersChange(DEFAULT_FILTERS);
  }

  let title = region ? getRegionLabel(region) : "Tous les pays";
  if (onlyFavorites) {
    title = region ? `Mes favoris, ${getRegionLabel(region)}` : "Mes favoris";
  }

  let content;
  if (status === "loading") {
    content = <LoadingState />;
  } else if (status === "error") {
    content = (
      <StatePanel
        tone="error"
        title="Les pays n'ont pas pu être chargés"
        action={
          <button type="button" className="button button--primary" onClick={onRetry}>
            Réessayer
          </button>
        }
      >
        L'API countries.dev ne répond pas pour le moment. Vérifiez votre connexion internet, puis relancez le
        chargement.
      </StatePanel>
    );
  } else if (onlyFavorites && favorites.length === 0) {
    content = (
      <StatePanel
        title="Aucun favori pour l'instant"
        action={
          <button type="button" className="button button--ghost" onClick={resetFilters}>
            Afficher tous les pays
          </button>
        }
      >
        Touchez l'étoile d'une carte pour garder un pays ici. Vos favoris restent enregistrés dans ce navigateur.
      </StatePanel>
    );
  } else if (visibleCountries.length === 0) {
    content = (
      <StatePanel
        title="Aucun pays trouvé"
        action={
          <button type="button" className="button button--ghost" onClick={resetFilters}>
            Afficher tous les pays
          </button>
        }
      >
        {query ? `Aucun pays ne correspond à « ${query} »` : "Aucun pays ne correspond à ces critères"}
        {region ? ` dans la région ${getRegionLabel(region)}.` : "."} Vérifiez l'orthographe ou élargissez la
        recherche.
      </StatePanel>
    );
  } else {
    content = (
      <ul className="country-grid">
        {visibleCountries.map((country, index) => (
          <li key={country.code}>
            <CountryCard
              country={country}
              index={index}
              isFavorite={favorites.includes(country.code)}
              onToggleFavorite={onToggleFavorite}
            />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className="page">
      <Hero countryCount={countries.length} regionCount={regions.length} />

      <section className="explorer container" id="explorer" aria-labelledby="explorer-title">
        <div className="explorer__head">
          <h2 id="explorer-title" className="section-title">
            {title}
          </h2>
          {status === "success" && (
            <p className="results-count" aria-live="polite">
              <strong>{visibleCountries.length}</strong>{" "}
              {visibleCountries.length === countries.length ? "pays affichés" : `sur ${countries.length} pays`}
            </p>
          )}
        </div>

        <div className="toolbar">
          <div className="toolbar__row">
            <SearchBar value={query} onChange={(value) => updateFilter("query", value)} />
            <SortSelect value={sort} onChange={(value) => updateFilter("sort", value)} />
            <button type="button" className="button button--ghost" onClick={resetFilters}>
              <ResetIcon />
              Réinitialiser
            </button>
          </div>

          <div className="toolbar__filters">
            <button
              type="button"
              className="chip chip--favorites"
              aria-pressed={onlyFavorites}
              onClick={() => updateFilter("onlyFavorites", !onlyFavorites)}
            >
              <StarIcon className="chip__icon" filled={onlyFavorites} />
              Favoris
              <span className="chip__count">{favorites.length}</span>
            </button>
            <span className="toolbar__divider" aria-hidden="true" />
            <RegionFilter
              regions={regions}
              value={region}
              total={countries.length}
              onChange={(value) => updateFilter("region", value)}
            />
          </div>
        </div>

        {content}
      </section>
    </div>
  );
}

export default CountriesPage;
