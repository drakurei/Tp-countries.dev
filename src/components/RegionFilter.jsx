function RegionFilter({ regions, value, onChange, total }) {
  const options = [{ value: "", label: "Toutes", count: total }, ...regions];

  return (
    <div className="chips" role="group" aria-label="Filtrer par région">
      {options.map((option) => (
        <button
          key={option.value || "all"}
          type="button"
          className="chip"
          aria-pressed={value === option.value}
          onClick={() => onChange(option.value)}
        >
          {option.label}
          <span className="chip__count">{option.count}</span>
        </button>
      ))}
    </div>
  );
}

export default RegionFilter;
