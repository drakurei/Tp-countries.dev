import { useState } from "react";

// Tries each flag URL in order; if all of them fail, shows a tidy placeholder
function FlagImage({ sources, name, code, loading = "lazy" }) {
  const [failedSources, setFailedSources] = useState([]);
  const src = sources.find((url) => url && !failedSources.includes(url));

  if (!src) {
    return (
      <div className="flag-fallback" role="img" aria-label={`Drapeau indisponible : ${name}`}>
        <span className="flag-fallback__code">{code || "?"}</span>
        <span>Drapeau indisponible</span>
      </div>
    );
  }

  return (
    <img
      className="flag-frame__img"
      src={src}
      alt={`Drapeau : ${name}`}
      width="320"
      height="213"
      loading={loading}
      decoding="async"
      onError={() => setFailedSources((current) => [...current, src])}
    />
  );
}

export default FlagImage;
