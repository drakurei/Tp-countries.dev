import { ChevronDownIcon } from "./Icons.jsx";
import { SORT_OPTIONS } from "../utils/countryUtils.js";

function SortSelect({ value, onChange }) {
  return (
    <div className="select">
      <label htmlFor="country-sort" className="visually-hidden">
        Trier les pays
      </label>
      <select
        id="country-sort"
        className="select__control"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDownIcon className="select__chevron" />
    </div>
  );
}

export default SortSelect;
