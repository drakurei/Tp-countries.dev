// Skeleton cards shown while the API answers
function LoadingState({ count = 8 }) {
  return (
    <div role="status">
      <span className="visually-hidden">Chargement des pays en cours…</span>
      <ul className="country-grid" aria-hidden="true">
        {Array.from({ length: count }, (_, index) => (
          <li key={index} className="skeleton-card">
            <div className="skeleton skeleton--flag" />
            <div className="skeleton skeleton--line skeleton--short" />
            <div className="skeleton skeleton--line" />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LoadingState;
