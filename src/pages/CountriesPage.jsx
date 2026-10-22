import { useEffect } from "react";
import { useLocation } from "react-router";
import Hero from "../components/Hero.jsx";
import SearchBar from "../components/SearchBar.jsx";
import RegionFilter from "../components/RegionFilter.jsx";
import CountryCard from "../components/CountryCard.jsx";
import LoadingState from "../components/LoadingState.jsx";
import StatePanel from "../components/StatePanel.jsx";
import { ResetIcon } from "../components/Icons.jsx";
import { DEFAULT_FILTERS, filterCountries, getRegionLabel, getRegions } from "../utils/countryUtils.js";

function CountriesPage({ countries, status, onRetry, filters, onFiltersChange }) {
  const { query, region } = filters;
  const location = useLocation();

  // Coming back from a detail page: jump straight to the grid instead of the hero
  useEffect(() => {
    if (location.state?.scrollToExplorer) {
      document.getElementById("explorer")?.scrollIntoView({ block: "start", behavior: "instant" });
    }
  }, [location.state]);

  const regions = getRegions(countries);
  const visibleCountries = filterCountries(countries, filters);

  function updateFilter(name, value) {
    onFiltersChange((previous) => ({ ...previous, [name]: value }));
  }

  function resetFilters() {
    onFiltersChange(DEFAULT_FILTERS);
  }

  const title = region ? getRegionLabel(region) : "Tous les pays";

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
            <CountryCard country={country} index={index} />
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
            <button type="button" className="button button--ghost" onClick={resetFilters}>
              <ResetIcon />
              Réinitialiser
            </button>
          </div>
          <RegionFilter
            regions={regions}
            value={region}
            total={countries.length}
            onChange={(value) => updateFilter("region", value)}
          />
        </div>

        {content}
      </section>
    </div>
  );
}

export default CountriesPage;
