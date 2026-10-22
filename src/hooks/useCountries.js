import { useEffect, useState } from "react";
import { getAllCountries } from "../services/countriesApi.js";

// Loads the full list once. `retry` lets the user try again after a network error.
function useCountries() {
  const [countries, setCountries] = useState([]);
  const [status, setStatus] = useState("loading"); // "loading" | "success" | "error"
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    getAllCountries(controller.signal)
      .then((data) => {
        // The API sorts by English name; we display French names, so sort again
        setCountries(data.sort((a, b) => a.name.localeCompare(b.name, "fr")));
        setStatus("success");
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          setStatus("error");
        }
      });

    // Cancel the request if the component unmounts before it finishes
    return () => controller.abort();
  }, [attempt]);

  function retry() {
    setStatus("loading");
    setAttempt((value) => value + 1);
  }

  return { countries, status, retry };
}

export default useCountries;
