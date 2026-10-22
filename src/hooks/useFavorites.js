import { useEffect, useState } from "react";

const STORAGE_KEY = "atlas-favorites";

function readFavorites() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(saved) ? saved : [];
  } catch {
    // Storage can be blocked (private mode) or contain invalid JSON
    return [];
  }
}

// Favorite country codes, saved in localStorage so they survive a page refresh
function useFavorites() {
  // Passing the function (not its result) means localStorage is only read on the first render
  const [favorites, setFavorites] = useState(readFavorites);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch {
      // Nothing to do: favorites still work for the current visit
    }
  }, [favorites]);

  function toggleFavorite(code) {
    setFavorites((current) =>
      current.includes(code) ? current.filter((item) => item !== code) : [...current, code],
    );
  }

  return { favorites, toggleFavorite };
}

export default useFavorites;
