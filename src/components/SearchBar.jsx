import { CloseIcon, SearchIcon } from "./Icons.jsx";

function SearchBar({ value, onChange }) {
  return (
    <div className="search" role="search">
      <SearchIcon className="search__icon" />
      <label htmlFor="country-search" className="visually-hidden">
        Rechercher un pays par son nom
      </label>
      <input
        id="country-search"
        className="search__input"
        type="search"
        placeholder="Rechercher un pays, par exemple Japon"
        autoComplete="off"
        spellCheck="false"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Escape") onChange("");
        }}
      />
      {value && (
        <button type="button" className="search__clear" onClick={() => onChange("")} aria-label="Effacer la recherche">
          <CloseIcon />
        </button>
      )}
    </div>
  );
}

export default SearchBar;
