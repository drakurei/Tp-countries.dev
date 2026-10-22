import { useState } from "react";
import { Route, Routes } from "react-router";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import CountriesPage from "./pages/CountriesPage.jsx";
import CountryDetailPage from "./pages/CountryDetailPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import useCountries from "./hooks/useCountries.js";
import useFavorites from "./hooks/useFavorites.js";
import { DEFAULT_FILTERS } from "./utils/countryUtils.js";

function App() {
  // The list is loaded once here, then shared with the pages through props
  const { countries, status, retry } = useCountries();
  const { favorites, toggleFavorite } = useFavorites();

  // Kept in App (not in the page) so the search survives a visit to a detail page
  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  function showFavorites(onlyFavorites) {
    setFilters((previous) => ({ ...previous, onlyFavorites }));
  }

  return (
    <div className="app">
      <a className="skip-link" href="#contenu">
        Aller au contenu
      </a>
      <Header
        favoritesCount={favorites.length}
        onlyFavorites={filters.onlyFavorites}
        onShowFavorites={showFavorites}
      />
      <main id="contenu" className="app__main">
        <Routes>
          <Route
            path="/"
            element={
              <CountriesPage
                countries={countries}
                status={status}
                onRetry={retry}
                filters={filters}
                onFiltersChange={setFilters}
                favorites={favorites}
                onToggleFavorite={toggleFavorite}
              />
            }
          />
          <Route
            path="/country/:code"
            element={
              <CountryDetailPage countries={countries} favorites={favorites} onToggleFavorite={toggleFavorite} />
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
