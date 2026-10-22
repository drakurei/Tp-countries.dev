import { StarIcon } from "./Icons.jsx";

// Star toggle. `withLabel` shows text next to the icon (used on the detail page).
function FavoriteButton({ name, isFavorite, onToggle, withLabel = false }) {
  const label = isFavorite ? "Dans vos favoris" : "Ajouter aux favoris";

  return (
    <button
      type="button"
      className={withLabel ? "button button--ghost fav-toggle" : "fav-button"}
      aria-pressed={isFavorite}
      aria-label={withLabel ? undefined : `${name} en favori`}
      title={withLabel ? undefined : label}
      onClick={onToggle}
    >
      <StarIcon filled={isFavorite} />
      {withLabel && label}
    </button>
  );
}

export default FavoriteButton;
